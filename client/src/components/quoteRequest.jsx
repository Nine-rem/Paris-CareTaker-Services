import React from 'react';
import bailleur from '../assets/images/bailleur.jpg';
function QuoteRequest() {
  return (
    <>
    <div>
      <div id="quote" className="box lightgrey-box row">
          <div className="col-md-6 align-self-center box-margin-right">
              <h2>Bailleur ? Simplifiez-vous la vie !</h2>
              <p>Découvrez une façon simple et efficace de mettre votre bien en location saisonnière en vous inscrivant sur notre site dès aujourd'hui. Nous proposons plusieurs formules de gestion adaptées à vos besoins, vous permettant de maximiser vos revenus tout en minimisant les tracas.</p>
              <p>Il vous suffit de cliquer sur un bouton pour démarrer : nous nous occupons de tout le reste, de la gestion des réservations à l'accueil des voyageurs. Laissez-nous prendre en charge la gestion de votre bien pour que vous puissiez profiter pleinement de vos revenus locatifs, sans effort supplémentaire de votre part</p>
              <div className="d-grid gap-2 col-6 mx-auto btn-margin">
                  <button className="btn btn-dark btn-hover-brown" type="button">Votre devis en ligne</button>
              </div>
          </div>
          <div className="col-md-6 justify-content-end d-flex align-items-center">
              <img src={bailleur} className="img-fluid" width="650px"></img>
          </div>
      </div>
    </div>
    </>
  );
}

export default QuoteRequest;
