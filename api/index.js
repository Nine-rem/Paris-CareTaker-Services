const express = require('express')
const app = express()
const connection = require('./connection.js');


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

// Démarrage serveur
app.listen(5000, () => {    
    console.log("Serveur à l'écoute")
})