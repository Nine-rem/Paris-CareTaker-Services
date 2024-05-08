import React from 'react';

function Footer() {
  return (
    <footer className="py-3 my-4">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><a href="../pages/" className="nav-link px-2">Accueil</a></li>
        <li className="nav-item"><a href="../pages/stay-all.php" className="nav-link px-2">Logement</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2">Service</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2">Devis</a></li>
        <li className="nav-item"><a href="../pages/legal.php" className="nav-link px-2">Mentions légales</a></li>
        <li className="nav-item"><a href="#" className="nav-link px-2">Cookies</a></li>
        <li className="nav-item"><a href="../pages/service-terms.php" className="nav-link px-2">Conditions générales</a></li>
        <li className="nav-item"><a href="../pages/contact.php" className="nav-link px-2">Contact</a></li>
      </ul>
      <p className="text-center">© 2024 PCS | Tous droits réservés</p>
    </footer>
  );
}

export default Footer;
