const connection = require('./db-connection');

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pcs'
});

// Middleware
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');
  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};

// User registration route
app.post('/register-agence', (req, res) => {
  const societe = req.body.societe;
  const SIRET = req.body.SIRET;
  const nom = req.body.nom;
  const prenom = req.body.prenom;
  const naissance = req.body.naissance;
  const adresse = req.body.adresse;
  const cp = req.body.cp;
  const ville = req.body.ville;
  const tel = req.body.tel;
  const email = req.body.email;
  const pwd = req.body.pwd;
  const formule = req.body.formule;
  const langue = req.body.langue;
  const date_maj = new Date().toISOString().slice(0, 19).replace('T', ' '); 
  const derniere_connexion = new Date().toISOString().slice(0, 19).replace('T', ' '); 
  const est_admin = 0; // User not admin
  const est_bailleur = 0; 
  const est_prestataire = 0; 
  const est_banni = 0;
  const token = require('crypto').randomBytes(30).toString('hex'); // Generate token

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  const hashedPwd = bcrypt.hashSync(pwd, salt);

  // Insert user into database
  const query = `INSERT INTO utilisateurs (societe, SIRET, nom, prenom, naissance, adresse, cp, ville, tel, email, pwd, formule, langue, date_maj, derniere_connexion, est_admin, est_bailleur, est_prestataire, est_banni, token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  connection.query(query, [societe, SIRET, nom, prenom, naissance, adresse, cp, ville, tel, email, hashedPwd, formule, langue, date_maj, derniere_connexion, est_admin, est_bailleur, est_prestataire, est_banni, token], (err, result) => {
    if (err) return res.status(500).send('Server error.');
    res.send('User registered successfully.');
  });
});


// User login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Check if email and password
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    // Select user from database
    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql, [email], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      // Check if user exists
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Compare provided password with hashed password in database
      const user = results[0];
      const isPasswordValid = bcrypt.compareSync(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // Send response with token in headers
      res.status(200).json({ message: 'Logged in successfully', token });
    });
  });



// User registration route
app.post('/register-bailleur', (req, res) => {
    const { responsable, adresse, cp, ville, tel, email, boite_cle } = req.body;
  
    // Check if all fields are provided
    if (!responsable || !adresse || !cp || !ville || !tel || !email || !boite_cle) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    // Hash password
    const hashedPassword = bcrypt.hashSync(boite_cle, 10);
  
    // Insert user into database
    const sql = 'INSERT INTO users (responsable, adresse, cp, ville, tel, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [responsable, adresse, cp, ville, tel, email, hashedPassword], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      // Send response with success message
      res.status(201).json({ message: 'Registered successfully' });
    });
  });

  // User registration route
app.post('/register', (req, res) => {
    const { name, firstname, cellphone } = req.body;
  
    // Check if all fields are provided
    if (!name || !firstname || !cellphone) {
      return res.status(400).json({ message: 'Name, firstname, and cellphone number are required' });
    }
  
    // Hash password
    const hashedPassword = bcrypt.hashSync(cellphone, 10);
  
    // Insert user into database
    const sql = 'INSERT INTO users (name, firstname, cellphone, password) VALUES (?, ?, ?, ?)';
    connection.query(sql, [name, firstname, cellphone, hashedPassword], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      // Send response with success message
      res.status(201).json({ message: 'Registered successfully' });
    });
  });