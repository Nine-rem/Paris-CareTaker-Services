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
  if (confirmPassword !== password) {
    return res.status(400).json({ message: 'Les mots de passes ne correspondent pas' });
  }

  
  
  
  try {
    const [results] = await connection.promise().query('SELECT email_utilisateur FROM pcs_utilisateur WHERE email_utilisateur = ?', [email_utilisateur]);
    if (results.length > 0) {
      return res.status(409).json({ message: 'compte déjà existant' });
    }
    
    let errorArray = [];
    
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email_utilisateur)) {
      errorArray.push('Email invalide');
    }
    
    //clean phone number
    const regexPhone = /^\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    if (!regexPhone.test(tel_utilisateur)) {
      errorArray.push('Numéro de téléphone invalide');
    }
  
    //clean name
    const regexName = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
    nom_utilisateur = nom_utilisateur.trim().toUpperCase();
    prenom_utilisateur = prenom_utilisateur.trim().toLowerCase();
    prenom_utilisateur = prenom_utilisateur.charAt(0).toUpperCase() + prenom_utilisateur.slice(1);
    if (!regexName.test(nom_utilisateur) || !regexName.test(prenom_utilisateur)) {
      
    }
    
    //verify birthdate less than 99 years
    const date = new Date();
    const currentYear = date.getFullYear();
    const birthdate = new Date(naissance_utilisateur);
    const birthYear = birthdate.getFullYear();
    if (currentYear - birthYear > 99 || currentYear - birthYear < 6) {
      return res.status(400).json({ message: 'Date de naissance invalide' });
    }
    //verify password
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regexPassword.test(password)) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre' });
    }

    /* if err > 0 afficher les photo*/
    
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
    res.status(500).json({ message: 'un erreur est survenue.', error: error.message });
  }
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
//ajout d'une photo bien par lien

app.post("/upload-by-link", async(req, res) => {
  const {link} = req.body;
  //vérifier si le lien est valide et se termine par .jpg, .jpeg, .png
  const regex = /\.(jpg|jpeg|png)$/;
  if (!regex.test(link)) {
    return res.status(400).json({ message: 'Lien invalide' });
  }
  const newName = "photo" + Date.now() + '.jpg';
  await imageDownloader.image({
    url:link,
    dest: __dirname + '/uploads/' + newName,
    
  })
  res.json(newName);


})

//ajout d'une photo bien par fichier
const photosMiddleware = multer({dest:"uploads/"});
app.post("/upload",photosMiddleware.array('photos',100) ,async (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const {path, originalname} = req.files[i];
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];

    //vérifier si le fichier est une image
    if (!["jpg","jpeg","png"].includes(extension) && req.files[i].size > 5000000) {
      fs.unlinkSync(path);
      return res.status(400).json({ message: 'Fichier invalide' });
    }

    const newPath = path + "." + extension;
    fs.renameSync(path, newPath)
    uploadedFiles.push(newPath.replace("uploads\\",""));
    
  }  
  
  res.json(uploadedFiles);

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
      return res.status(401).json({ message: 'Token invalide' });
    }

    const id_utilisateur = decoded.userId;

    if (!id_utilisateur) {
      return res.status(401).json({ message: 'Utilisateur non connecté' });
    }
    //ajouter les donnees du formulaire

    const {
      title: nom_bien,
      address: adresse_bien,
      zipcode: cp_bien,
      city: ville_bien,
      description: description_bien,
      maxGuests: nb_max_personnes,
      checkIn: heure_arrivee,
      checkOut: heure_depart,
      equipments: equipements,
      additionalInfo: information_supplementaire,
      addedPhotos: photos,
      // photoDescription: description_photo
      // 

    } = req.body;

    console.log(id_utilisateur);
    const query = `
      INSERT INTO pcs_bien (
        nom_bien,
        adresse_bien,
        cp_bien,
        ville_bien,
        description_bien,
        nb_max_personnes,
        heure_arrivee,
        heure_depart,
        information_supplementaire,
        bailleur,
        agence_principale_bien
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,1);
    `;
    const values = [
      nom_bien,
      adresse_bien,
      cp_bien,
      ville_bien,
      description_bien,
      nb_max_personnes,
      heure_arrivee,
      heure_depart,
      information_supplementaire,
      id_utilisateur 

    ];

    connection.query(query, values, (error, results) => {

      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erreur lors de la création du bien' });
      }
      const id_bien = results.insertId;

      // // Insertion des équipements
      // const insertEquipements = `
      //   INSERT INTO pcs_bien_possede (id_bien, id_equipement) VALUES (?, (SELECT id_equipement FROM pcs_equipement WHERE nom_equipement = ?));
      // `;
      
      // const equipementQueries = equipements.map(equipement => {
      //   return new Promise((resolve, reject) => {
      //     connection.query(insertEquipements, [id_bien, equipement], (err, results) => {
      //       if (err) return reject(err);
      //       resolve(results);
      //     });
      //   });
      // });
      
    





      // Insertion des photos
      const insertPhotos = `
        INSERT INTO pcs_photo (nom_photo, id_bien) VALUES (?, ?);
      `;
      const photoQueries = photos.map(photo => {
        return new Promise((resolve, reject) => {
          connection.query(insertPhotos, [photo, id_bien], (err, results) => {
            if (err) return reject(err);
            resolve(results);
          });
        });
      });

      // Promise.all([...equipementQueries, ...photoQueries])
      Promise.all([...photoQueries])
        .then(() => {
          // Insertion dans la table associative pcs_bien_enregistre
          const insertUserPlace = `
            INSERT INTO pcs_bien_enregistre (utilisateur_enregistre, bien_enregistre) VALUES (?, ?);
          `;
          connection.query(insertUserPlace, [id_utilisateur, id_bien], (err, results) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Erreur lors de l\'enregistrement du bien avec l\'utilisateur' });
            }
            res.json({ message: 'Bien créé', bienId: id_bien });
          });
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ message: 'Erreur lors de la création du bien' });
        });
    });
  });
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
    console.log("Serveur à l'écoute")
})