const express = require('express')
const app = express()
const connection = require('./db-connection.js');

const cors = require('cors')
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}))
app.use(express.json())


/* ----------------------------------------------------------
      Gestion des utilisateurs
---------------------------------------------------------- */
// Chiffrage du mot de passe
const bcrypt = require('bcryptjs');

//inscription de l'utilisateur
app.post("/register", async (req, res) => {
  const {
    lastName: nom_utilisateur,
    firstName: prenom_utilisateur,
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
  
  console.log(password, confirmPassword)
  const saltRounds = 10;
  if(confirmPassword !== password) {
    return res.status(400).json({ confirmPassword, password, message: 'Passwords do not match'});
  }


  try {
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
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0 ,1, NOW(), NOW(), NOW(), 0, ?, ?, 0, NULL);
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
    connection.execute(query, values, (error, results) => {
      if (error) {
        throw error;
      }
      res.json({ message: 'User successfully registered!', userId: results.insertId });
    });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'An error occurred during user registration.', error: error.message });
  }
});



//connexion de l'utilisateur

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  connection.query('SELECT id_utilisateur, email_utilisateur,pwd FROM pcs_utilisateur WHERE email_utilisateur = ?', [email], async (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const hashedPassword = results[0].pwd;
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.json({ message: 'User successfully logged in!', userId: results[0].id_utilisateur });
  }
  );
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