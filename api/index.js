/* ----------------------------------------------------------
Définition des constantes 
---------------------------------------------------------- */


const express = require('express')
const app = express()
const connection = require('./db-connection.js');
const cors = require('cors')
const jwt = require('jsonwebtoken');
const secretKey = "pa2024";
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
//middleware
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}))
app.use(express.json())
 
app.use(cookieParser());
app.use("/uploads",express.static(__dirname + '/uploads'));

/* ----------------------------------------------------------
      Gestion des utilisateurs
---------------------------------------------------------- */

// Chiffrage du mot de passe
const bcrypt = require('bcryptjs');
const { error } = require('console');

//inscription de l'utilisateur
app.post("/register", async (req, res) => {
  let {
    lastName: nom_utilisateur,
    firstName: prenom_utilisateur
  } = req.body;
  const {
    birthdate: naissance_utilisateur,
    address: adresse_utilisateur,
    postalCode: cp_utilisateur,
    city: ville_utilisateur,
    email: email_utilisateur,
    password,
    confirmPassword,
    siret: SIRET_utilisateur,
    phoneNumber: tel_utilisateur,
    role,
    company: societe_utilisateur
  } = req.body;

  let est_bailleur = 0, est_prestataire = 0;
  if (role === 'landlord') {
    est_bailleur = 1;
  } else if (role === 'serviceProvider') {
    est_prestataire = 1;
  }
  
  const saltRounds = 10;
  let errorArray = {};

  if (confirmPassword !== password) {
    errorArray.confirmPassword = 'Les mots de passe ne correspondent pas';
  }

  try {
    const [results] = await connection.promise().query('SELECT email_utilisateur FROM pcs_utilisateur WHERE email_utilisateur = ?', [email_utilisateur]);
    if (results.length > 0) {
      errorArray.email = 'Compte déjà existant';
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email_utilisateur)) {
      errorArray.email = 'Email invalide';
    }
    
    const regexPhone = /^\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    if (!regexPhone.test(tel_utilisateur)) {
      errorArray.phoneNumber = 'Numéro de téléphone invalide';
    }
  
    const regexName = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
    nom_utilisateur = nom_utilisateur.trim().toUpperCase();
    prenom_utilisateur = prenom_utilisateur.trim().toLowerCase();
    prenom_utilisateur = prenom_utilisateur.charAt(0).toUpperCase() + prenom_utilisateur.slice(1);
    if (!regexName.test(nom_utilisateur)) {
      errorArray.lastName = 'Nom invalide';
    }
    if (!regexName.test(prenom_utilisateur)) {
      errorArray.firstName = 'Prénom invalide';
    }
    
    const date = new Date();
    const currentYear = date.getFullYear();
    const birthdate = new Date(naissance_utilisateur);
    const birthYear = birthdate.getFullYear();
    if (currentYear - birthYear > 99 || currentYear - birthYear < 6) {
      errorArray.birthdate = 'Date de naissance invalide';
    }
    
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regexPassword.test(password)) {
      errorArray.password = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre';
    }

    if (Object.keys(errorArray).length > 0) {
      return res.status(400).json({ message: 'Validation errors', errors: errorArray });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const query = `
    INSERT INTO pcs_utilisateur (
      societe_utilisateur,
      SIRET_utilisateur,
      nom_utilisateur,
      prenom_utilisateur,
      naissance_utilisateur,
      adresse_utilisateur,
      cp_utilisateur,
      ville_utilisateur,
      tel_utilisateur,
      email_utilisateur,
      pwd,
      formule_utilisateur,
      langue_utilisateur,
      date_creation_utilisateur,
      date_maj_utilisateur,
      derniere_connexion_utilisateur,
      est_admin,
      est_bailleur,
      est_prestataire,
      est_banni,
      token
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 1, NOW(), NOW(), NOW(), 0, ?, ?, 0, NULL);
    `;
    
    const values = [
      societe_utilisateur,
      SIRET_utilisateur,
      nom_utilisateur,
      prenom_utilisateur,
      naissance_utilisateur,
      adresse_utilisateur,
      cp_utilisateur,
      ville_utilisateur,
      tel_utilisateur,
      email_utilisateur,
      hashedPassword,
      est_bailleur,
      est_prestataire
    ];

    const [insertResult] = await connection.promise().execute(query, values);
    res.json({ message: 'Inscrit!', userId: insertResult.insertId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Un erreur est survenue.', error: error.message });
  }
});


app.get('/mdp', (req, res) => {
  bcrypt.hash('kirtika', 10).then((hash) => {
    res.json({ hash });
  });
});

//connexion de l'utilisateur


app.post('/login', async (req, res) => {
 
  let { email, password } = req.body;


  email = email.trim().toLowerCase();

  const emailRegex = /\S+@\S+\.\S+/;


  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email invalide' });
  }
  
  connection.query('SELECT id_utilisateur, email_utilisateur, pwd, nom_utilisateur, prenom_utilisateur, est_admin, est_bailleur, est_prestataire FROM pcs_utilisateur WHERE email_utilisateur = ?', [email], async (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Erreur de serveur' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    const hashedPassword = results[0].pwd;
    const isMatchingPassword = await bcrypt.compare(password, hashedPassword);

    if (!isMatchingPassword) {
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
    
    const userId = results[0].id_utilisateur;
    const email = results[0].email_utilisateur;
    const firstName = results[0].prenom_utilisateur;
    const lastName = results[0].nom_utilisateur;
    const isAdmin = results[0].est_admin;
    const isBailleur = results[0].est_bailleur;
    const isPrestataire = results[0].est_prestataire;

    const token = jwt.sign({ userId,email,firstName,lastName,isAdmin,isBailleur,isPrestataire }, secretKey, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    connection.query(
      'UPDATE pcs_utilisateur SET token = ? WHERE id_utilisateur = ?',
      [token, userId],
      (updateError) => {
        if (updateError) {
          return res.status(500).json({ message: 'Erreur lors de la mise à jour du token' });
        }
        console.log(email,firstName,lastName, token, userId,isAdmin,isBailleur,isPrestataire);

        res.json({ email,firstName,lastName, token, userId,isAdmin,isBailleur,isPrestataire });
      }
    );
  });
});

//Profil de l'utilisateur

app.get('/profile', (req, res) => {
  const {token} = req.cookies;
  

  if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
              throw err;
          }
          res.json({ userId: decoded.userId, email: decoded.email, firstName: decoded.firstName, lastName: decoded.lastName, isAdmin: decoded.isAdmin, isBailleur: decoded.isBailleur, isPrestataire: decoded.isPrestataire});
      });
  } else {
      res.status(401).json({ message: 'Aucun token fourni' });
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true)
  connection.query('UPDATE pcs_utilisateur SET token = NULL WHERE token = ?',
  [token],
  (error) => {
    if (error) {
      return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }
  });


  res.json({ message: 'Déconnecté' });
});


















/* ----------------------------------------------------------
      Gestion des biens
---------------------------------------------------------- */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/');  // Ensure this folder exists
  },
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Endpoint to handle photo uploads
app.post('/upload', upload.array('photos', 10), (req, res) => {  
  const files = req.files;
  const additionalInfo = req.body;

  console.log('Received files: ', files);
  console.log('Additional info: ', additionalInfo);

  // Process each file and its corresponding additional data here
  res.status(200).json({
      message: "Files uploaded successfully!",
      data: files.map(file => ({
          filename: file.filename,
          originalname: file.originalname,
          info: {
              title: additionalInfo[`info[${file.originalname}][title]`],
              room: additionalInfo[`info[${file.originalname}][room]`],
              description: additionalInfo[`info[${file.originalname}][description]`],
              room_size: additionalInfo[`info[${file.originalname}][room_size]`]
          }
      }))
  });
});

//suppression d'une photo
app.delete("/upload/:filename", (req, res) => {
  const {filename} = req.params;
  fs.unlink(__dirname + "/uploads/" + filename, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Erreur lors de la suppression du fichier");
    } else {
      res.sendStatus(200);
    }
  });
});

app.post('/places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({ message: 'Token invalide', error: err });
    }
    const id_utilisateur = decoded.userId;
    if (!id_utilisateur) {
      return res.status(401).json({ message: 'Utilisateur non connecté' });
    }

    const checkUserQuery = 'SELECT id_utilisateur FROM pcs_utilisateur WHERE id_utilisateur = ?';
    connection.query(checkUserQuery, [id_utilisateur], (userErr, userResults) => {
      if (userErr) {
        console.error('User verification error:', userErr);
        return res.status(500).json({ message: 'Erreur lors de la vérification de l\'utilisateur', error: userErr });
      }
      if (userResults.length === 0) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      const {
        title: nom_bien,
        address: adresse_bien,
        zipcode: cp_bien,
        city: ville_bien,
        description: description_bien,
        maxGuests: capacite_bien,
        checkIn: heure_arrivee,
        checkOut: heure_depart,
        equipments = [],
        additionalInfo: information_supplementaire,
        pricePerNight: tarif_bien,
        addedPhotos = [],
        photoInfo = []
      } = req.body;
      let { pmr: pmr_ok_bien, animals: animal_ok_bien } = req.body;
      if (pmr_ok_bien === true) {
        pmr_ok_bien = 1;
      }
      if (animal_ok_bien === true) {
        animal_ok_bien = 1;
      }
      const query = `
        INSERT INTO pcs_bien (
          nom_bien,
          adresse_bien,
          cp_bien,
          ville_bien,
          description_bien,
          capacite_bien,
          heure_arrivee,
          heure_depart,
          animal_ok_bien,
          pmr_ok_bien,
          information_supplementaire,
          tarif_bien,
          bailleur,
          agence_principale_bien
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1);
      `;
      const values = [
        nom_bien,
        adresse_bien,
        cp_bien,
        ville_bien,
        description_bien,
        capacite_bien,
        heure_arrivee,
        heure_depart,
        animal_ok_bien,
        pmr_ok_bien,
        information_supplementaire,
        tarif_bien,
        id_utilisateur
      ];

      connection.query(query, values, (error, results) => {
        if (error) {
          console.error("Erreur lors de l'insertion du bien:", error);
          return res.status(500).json({ message: 'Erreur lors de la création du bien', error: error });
        }
        const id_bien = results.insertId;

        const insertEquipments = `
          INSERT INTO pcs_bien_possede (bien_equipe, equipement_contenu) 
          VALUES (?, (SELECT id_equipement FROM pcs_equipement WHERE nom_equipement = ?));
        `;
        const equipmentQueries = equipments.map(equipement => {
          return new Promise((resolve, reject) => {
            connection.query(insertEquipments, [id_bien, equipement], (err, results) => {
              if (err) {
                console.error("Erreur lors de l'insertion de l'équipement:", err);
                return reject({ message: 'Erreur lors de l\'insertion de l\'équipement', error: err });
              }
              resolve(results);
            });
          });
        });

        const insertPiece = `
          INSERT INTO pcs_piece (nom_piece, bien_piece, type_piece, surface_piece) 
          VALUES (?, ?, (SELECT id_type_piece FROM pcs_type_piece WHERE nom_type_piece = ?), ?);
        `;
        const insertPhoto = `
          INSERT INTO pcs_photo (nom_photo, piece_photo, description_photo, chemin_photo) 
          VALUES (?, ?, ?, ?);
        `;

        const photoQueries = addedPhotos.map((photo, index) => {
          const info = photoInfo[index] || {};
          console.log('Photo info:', info);
          return new Promise((resolve, reject) => {
            connection.query(insertPiece, [info.title, id_bien, "Autre", info.room_size || 0], (err, results) => {
              if (err) {
                console.error("Erreur lors de l'insertion de la pièce:", err);
                return reject({ message: 'Erreur lors de l\'insertion de la pièce', error: err });
              }
              const id_piece = results.insertId;

              connection.query(insertPhoto, [info.title || "Photo", id_piece, info.description || "", photo], (err, results) => {
                if (err) {
                  console.error("Erreur lors de l'insertion de la photo:", err);
                  return reject({ message: 'Erreur lors de l\'insertion de la photo', error: err });
                }
                resolve(results);
              });
            });
          });
        });

        Promise.all([...equipmentQueries, ...photoQueries])
          .then(() => {
            const insertUserPlace = `
              INSERT INTO pcs_bien_enregistre (utilisateur_enregistre, bien_enregistre) 
              VALUES (?, ?);
            `;
            connection.query(insertUserPlace, [id_utilisateur, id_bien], (err, results) => {
              if (err) {
                console.error("Erreur lors de l'enregistrement du bien avec l'utilisateur:", err);
                return res.status(500).json({ message: "Erreur lors de l'enregistrement du bien avec l'utilisateur", error: err });
              }
              res.json({ message: 'Bien créé', bienId: id_bien });
            });
          })
          .catch(error => {
            console.error("Erreur lors de la création du bien:", error);
            res.status(500).json({ message: 'Erreur lors de la création du bien', error: error });
          });
      });
    });
  });
});


app.get('/rooms', (req, res) => {
  connection.query('SELECT * FROM pcs_type_piece', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des pièces' });
    } else {
      res.status(200).json(results);
    }
  });
});






// app.post('/places', (req, res) => {
//   const { token } = req.cookies;
//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Token invalide' });
//     }

//     const id_utilisateur = decoded.userId;

//     if (!id_utilisateur) {
//       return res.status(401).json({ message: 'Utilisateur non connecté' });
//     }

//     const {
//       title: nom_bien,
//       address: adresse_bien,
//       zipcode: cp_bien,
//       city: ville_bien,
//       description: description_bien,
//       maxGuests: capacite_bien,
//       checkIn: heure_arrivee,
//       checkOut: heure_depart,
//       equipments = [],
//       additionalInfo: information_supplementaire,
//       photos = []
//     } = req.body;

//     const query = `
//       INSERT INTO pcs_bien (
//         nom_bien,
//         adresse_bien,
//         cp_bien,
//         ville_bien,
//         description_bien,
//         capacite_bien,
//         heure_arrivee,
//         heure_depart,
//         information_supplementaire,
//         bailleur,
//         agence_principale_bien
//       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1);
//     `;
//     const values = [
//       nom_bien,
//       adresse_bien,
//       cp_bien,
//       ville_bien,
//       description_bien,
//       capacite_bien,
//       heure_arrivee,
//       heure_depart,
//       information_supplementaire,
//       id_utilisateur 
//     ];

//     connection.query(query, values, (error, results) => {
//       if (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Erreur lors de la création du bien' });
//       }
//       const id_bien = results.insertId;

//       // Insertion des équipements
//       const insertEquipments = `
//         INSERT INTO pcs_bien_possede (id_bien, id_equipement) VALUES (?, (SELECT id_equipement FROM pcs_equipement WHERE nom_equipement = ?));
//       `;
      
//       const equipmentQueries = equipments.map(equipement => {
//         return new Promise((resolve, reject) => {
//           connection.query(insertEquipments, [id_bien, equipement], (err, results) => {
//             if (err) return reject(err);
//             resolve(results);
//           });
//         });
//       });

//       // Insertion des photos avec informations supplémentaires
//       const insertPhotos = `
//         INSERT INTO pcs_photo (nom_photo, id_bien, titre_photo, piece_photo, description_photo) VALUES (?, ?, ?, ?, ?);
//       `;
//       const photoQueries = photos.map(photo => {
//         const { filename, title, room, description } = photo;
//         return new Promise((resolve, reject) => {
//           connection.query(insertPhotos, [filename, id_bien, title, room, description], (err, results) => {
//             if (err) return reject(err);
//             resolve(results);
//           });
//         });
//       });

//       // Exécuter toutes les requêtes d'insertion
//       Promise.all([...equipmentQueries, ...photoQueries])
//         .then(() => {
//           const insertUserPlace = `
//             INSERT INTO pcs_bien_enregistre (utilisateur_enregistre, bien_enregistre) VALUES (?, ?);
//           `;
//           connection.query(insertUserPlace, [id_utilisateur, id_bien], (err, results) => {
//             if (err) {
//               console.error(err);
//               return res.status(500).json({ message: "Erreur lors de l'enregistrement du bien avec l'utilisateur" });
//             }
//             res.json({ message: 'Bien créé', bienId: id_bien });
//           });
//         })
//         .catch(error => {
//           console.error(error);
//           res.status(500).json({ message: 'Erreur lors de la création du bien' });
//         });
//     });
//   });
// });

//extraction des biens d'un utilisateur
app.get('/places/:id', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }
    const id_utilisateur = decoded.userId;
    if (!id_utilisateur) {
      return res.status(401).json({ message: 'Utilisateur non connecté' });
    }
    const id_bien = req.params.id;

    // Première requête pour récupérer les informations du bien
    connection.query('SELECT * FROM pcs_bien WHERE id_bien = ? AND bailleur = ?', [id_bien, id_utilisateur], (error, bienResults) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la récupération du bien' });
      }
      if (bienResults.length === 0) {
        return res.status(404).json({ message: 'Bien introuvable' });
      }

      const bien = bienResults[0];

      // Deuxième requête pour récupérer les équipements associés au bien
      connection.query('SELECT nom_equipement, id_equipement FROM pcs_bien_possede, pcs_equipement WHERE bien_equipe = ? AND equipement_contenu = id_equipement', [id_bien], (err, equipementResults) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Erreur lors de la récupération des équipements du bien' });
        }

        // Ajouter les équipements aux résultats du bien
        bien.equipements = equipementResults;

        // Envoyer la réponse avec les détails du bien et ses équipements
        res.json(bien);
      });
    });
  });
});
app.get("/places", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }
    const id_utilisateur = decoded.userId;
    if (!id_utilisateur) {
      return res.status(401).json({ message: 'Utilisateur non connecté' });
    }
    connection.query('SELECT * FROM pcs_bien WHERE bailleur = ?', [id_utilisateur], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la récupération des biens' });
      }
      res.json(results);
    });
  }
  );
});
app.put('/places/:id', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }
    const id_utilisateur = decoded.userId;
    if (!id_utilisateur) {
      return res.status(401).json({ message: 'Utilisateur non connecté' });
    }
    const id_bien = req.params.id;
    const {
      title: nom_bien,
      address: adresse_bien,
      zipcode: cp_bien,
      city: ville_bien,
      description: description_bien,
      maxGuests: capacite_bien,
      checkIn: heure_arrivee,
      checkOut: heure_depart,
      equipments = [],
      additionalInfo: information_supplementaire,
      photos = []
    } = req.body;
    let { pmr: pmr_ok_bien, animals: animal_ok_bien } = req.body;

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Aucune donnée fournie' });
    }

    pmr_ok_bien = pmr_ok_bien === true ? 1 : 0;
    animal_ok_bien = animal_ok_bien === true ? 1 : 0;

    const query = `
      UPDATE pcs_bien SET
        nom_bien = ?,
        adresse_bien = ?,
        cp_bien = ?,
        ville_bien = ?,
        description_bien = ?,
        capacite_bien = ?,
        heure_arrivee = ?,
        heure_depart = ?,
        information_supplementaire = ?,
        pmr_ok_bien = ?,
        animal_ok_bien = ?
      WHERE id_bien = ? AND bailleur = ?
    `;

    const values = [
      nom_bien,
      adresse_bien,
      cp_bien,
      ville_bien,
      description_bien,
      capacite_bien,
      heure_arrivee,
      heure_depart,
      information_supplementaire,
      pmr_ok_bien,
      animal_ok_bien,
      id_bien,
      id_utilisateur
    ];

    connection.query(query, values, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la mise à jour du bien' });
      }

      // Suppression des équipements actuels
      connection.query('DELETE FROM pcs_bien_possede WHERE bien_equipe = ?', [id_bien], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Erreur lors de la suppression des équipements' });
        }

        // Insertion des nouveaux équipements
        const insertEquipments = `
          INSERT INTO pcs_bien_possede (bien_equipe, equipement_contenu)
          VALUES (?, (SELECT id_equipement FROM pcs_equipement WHERE nom_equipement = ?))
        `;
        const equipmentQueries = equipments.map(equipement => {
          return new Promise((resolve, reject) => {
            connection.query(insertEquipments, [id_bien, equipement], (err, results) => {
              if (err) return reject(err);
              resolve(results);
            });
          });
        });

        // Suppression des photos actuelles (si nécessaire)
        connection.query('DELETE FROM pcs_photo WHERE piece_photo = ?', [id_bien], (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur lors de la suppression des photos' });
          }

          // Insertion des nouvelles photos
          const insertPhotos = `
            INSERT INTO pcs_photo (nom_photo, piece_photo, titre_photo, description_photo)
            VALUES (?, ?, ?, ?)
          `;
          const photoQueries = photos.map(photo => {
            const { filename, title, description } = photo;
            return new Promise((resolve, reject) => {
              connection.query(insertPhotos, [filename, id_bien, title, description], (err, results) => {
                if (err) return reject(err);
                resolve(results);
              });
            });
          });

          // Exécuter toutes les requêtes d'insertion
          Promise.all([...equipmentQueries, ...photoQueries])
            .then(() => {
              res.json({ message: 'Bien mis à jour' });
            })
            .catch(error => {
              console.error(error);
              res.status(500).json({ message: 'Erreur lors de la mise à jour du bien' });
            });
        });
      });
    });
  });
});



app.get('/bien-validated', (req, res) => {
  connection.query('SELECT * FROM pcs_bien WHERE statut_bien = 1', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des biens' });
    } else {
      res.status(200).json(results);
    }
  });
}
);

app.get('/bien-owner', (req, res) => { 
  const { token } = req.cookies;
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }
    const id_utilisateur = decoded.userId;
    if (!id_utilisateur) {
      return res.status(401).json({ message: 'Utilisateur non connecté' });
    }
    connection.query('SELECT * FROM pcs_bien WHERE bailleur = ?', [id_utilisateur], (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la récupération des biens' });
      }
      res.json(results);
    });
  }
  );
});

// Extraction de tous les biens
app.get('/bien', (req, res) => {
    connection.query('SELECT * FROM pcs_bien', (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Erreur lors de la récupération des biens' });
      } else {
        res.status(200).json(results);
      }
  });
});

//photo de couverture
app.get('/photo-cover/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  const query = `
  SELECT chemin_photo 
  FROM pcs_photo
  JOIN pcs_piece ON pcs_photo.piece_photo = pcs_piece.id_piece
  JOIN pcs_bien ON pcs_piece.bien_piece = pcs_bien.id_bien
  WHERE pcs_photo.est_couverture = 1
  AND pcs_bien.id_bien = 2;
  
  `;
  values = [id]; 

  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de la récupération de la photo de couverture' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Aucune photo de couverture trouvée' });
    }
    const photo = results[0];
    res.status(200).json({ url: `http://localhost/client/src/assets/images/stay/${id}${photo.chemin_photo}`, alt: `Photo de couverture pour le bien ${id}` });
  });
});

// Extraction des informations d'un bien
app.get('/bien/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM pcs_bien, pcs_utilisateur WHERE id_utilisateur = bailleur AND id_bien = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération du bien' });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/equipements', (req, res) => {
  connection.query('SELECT * FROM pcs_equipement', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des équipements' });
    } else {
      res.status(200).json(results);
    }
  });
}); 
// Extraction des équipements d'un bien
app.get('/bien-equipement/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT nom_equipement, id_equipement FROM pcs_bien_possede, pcs_equipement WHERE bien_equipe = ? AND equipement_contenu = id_equipement', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des équipements du bien' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Extraction des services souscrit pour un bien
app.get('/bien-service/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT nom_service, id_service FROM pcs_service_souscrit, pcs_service WHERE bien_souscripteur = ? AND service_souscrit = id_service AND statut_souscription = 1', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des services souscrits pour le bien' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Extraction des pièces d'un bien
app.get('/bien-photo/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM pcs_piece, pcs_photo, pcs_type_piece WHERE bien_piece = ? AND piece_photo = id_piece AND id_type_piece = type_piece', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des pièces du bien' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Supression d'un bien
// A FAIRE : vérifier si admin ou propriétaire
app.delete('/bien/:id', (req, res) => {
  const id = parseInt(req.params.id);
  connection.query('SELECT id FROM pcs_bien WHERE id_bien = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la recherche du bien');
    } else {
      if (results.length === 0) {
        res.status(404).send('Bien introuvable');
      } else {
        connection.query('DELETE FROM pcs_bien WHERE id_bien = ?', [id], (err) => {
          if (err) {
            res.status(500).send('Erreur lors de la suppression du bien');
          } else {
            res.sendStatus(200);
          }
        });
      }
    }
  });
});


/* ----------------------------------------------------------
      Gestion des agences
---------------------------------------------------------- */

// Extraction de toutes les agences
app.get('/agence', (req, res) => {
  connection.query('SELECT * FROM pcs_agence', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération des biens' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Extraction d'une agence
app.get('/agence/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM pcs_agence WHERE id_agence = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'agence' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Création d'une agence

// Vérifier si connecter et admin, vérifier si toutes les datas sont bien saisies et si le bien n'existe pas déjà dans la bdd

app.post('/agences', (req, res) => {
  const data = req.body;
  connection.query('INSERT INTO pcs_agence SET ?', data, (err) => {
    if (err) {
      res.status(500).send("Erreur lors de la création de l\'agence");
    } else {
      res.sendStatus(200);
    }
  });
});

// Modification d'une agence

// Suppression d'une agence

// vérifier si cooneccté et admin et agence existe en bdd 

app.delete('/agences/:id', (req, res) => {
  const id = parseInt(req.params.id);
  connection.query('DELETE FROM pcs_agence WHERE id_agence = ?', [id], (err) => {
    if (err) {
      res.status(500).send('Erreur lors de la suppression de l\'agence');
    } else {
      res.sendStatus(200);
    }
  });
});


/* ----------------------------------------------------------
      Démarrage du serveur
---------------------------------------------------------- */

app.listen(5000, () => {    
    console.log("Serveur à l'écoute sur le port 5000")
})