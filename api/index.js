const express = require('express')
const app = express()
const connection = require('./db-connection.js');

app.use(express.json())


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

// Extraction d'un bien
app.get('/bien/:id', (req, res) => {
  const id = req.params.id;
  connection.query('SELECT * FROM pcs_bien WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erreur lors de la récupération du bien' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Supression d'un bien
// A FAIRE : vérifier si admin ou propriétaire
app.delete('/bien/:id', (req, res) => {
  const id = parseInt(req.params.id);
  connection.query('SELECT id FROM pcs_bien WHERE id = ?', [id], (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la recherche du bien');
    } else {
      if (results.length === 0) {
        res.status(404).send('Bien introuvable');
      } else {
        connection.query('DELETE FROM pcs_bien WHERE id = ?', [id], (err) => {
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
  connection.query('SELECT * FROM pcs_agence WHERE id = ?', [id], (err, results) => {
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
  connection.query('DELETE FROM pcs_agence WHERE id = ?', [id], (err) => {
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