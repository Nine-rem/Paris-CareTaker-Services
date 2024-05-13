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

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}))
app.use(express.json())
 
app.use(cookieParser());
//a mettre dans le chemin nécessitant une authentification
const auth = require('./auth.js');

/* ----------------------------------------------------------
      Gestion des utilisateurs
---------------------------------------------------------- */

// Chiffrage du mot de passe
const bcrypt = require('bcryptjs');

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
    
    //clean the email and verify if it is an email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email_utilisateur)) {
      return res.status(400).json({ message: 'Email invalide' });
    }
    
    //clean phone number
    const regexPhone = /^\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    if (!regexPhone.test(tel_utilisateur)) {
      return res.status(400).json({ message: 'Numéro de téléphone invalide' });
    }
  
    //clean name
    const regexName = /^[a-zA-ZÀ-ÿ\s]{2,40}$/;
    nom_utilisateur = nom_utilisateur.trim().toUpperCase();
    prenom_utilisateur = prenom_utilisateur.trim().toLowerCase();
    prenom_utilisateur = prenom_utilisateur.charAt(0).toUpperCase() + prenom_utilisateur.slice(1);
    if (!regexName.test(nom_utilisateur) || !regexName.test(prenom_utilisateur)) {
      return res.status(400).json({ message: 'Nom ou prénom invalide' });
    }
  
    //verify password
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!regexPassword.test(password)) {
      return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre' });
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
  
  connection.query('SELECT id_utilisateur, email_utilisateur, pwd, nom_utilisateur, prenom_utilisateur FROM pcs_utilisateur WHERE email_utilisateur = ?', [email], async (error, results) => {
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
    const token = jwt.sign({ userId,email,firstName,lastName }, secretKey, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });

    connection.query(
      'UPDATE pcs_utilisateur SET token = ? WHERE id_utilisateur = ?',
      [token, userId],
      (updateError) => {
        if (updateError) {
          return res.status(500).json({ message: 'Erreur lors de la mise à jour du token' });
        }
        console.log(email,firstName,lastName, token, userId);

        res.json({ email,firstName,lastName, token, userId });
      }
    );
  });
});

//Profil de l'utilisateur

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
      jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
              throw err;
          }
          res.json({ userId: decoded.userId, email: decoded.email, firstName: decoded.firstName, lastName: decoded.lastName });
      });
  } else {
      res.status(401).json({ message: 'Aucun token fourni' });
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true)
  res.json({ message: 'Déconnecté' });
});
























/* ----------------------------------------------------------
      Gestion des biens
---------------------------------------------------------- */

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