import React from 'react';

import equipePcs from '../assets/images/equipe-pcs.jpg';

function AboutUs() {
  return (
    <div id="services" className="box lightgrey-box row vertical-align">
      <div className="col-md-6 align-self-center box-margin-right">
        <img src={equipePcs} className="img-fluid" width="650px" alt="Équipe PCS"/>
      </div>
      <div className="col-md-6">
        <h2>Qui sommes-nous ?</h2>
        <p>Fondée en 2018, Paris Caretaker Services est une société française vous proposant une gamme complète de services de conciergerie immobilière pour simplifier votre expérience de voyage. Des check-ins flexibles et des nettoyages méticuleux aux communications constantes entre le client et le bailleur, nous prenons en charge tous les aspects de la location saisonnière.</p>
        <p>Avec des prestataires de confiance et des agences situées dans plusieurs arrondissements de Paris, à Troyes, Nice et Biarritz, PCS garantit des séjours sans soucis pour les voyageurs, leur permettant de profiter pleinement de leur expérience.</p>
      </div>
    </div>
  );
}

export default AboutUs;
