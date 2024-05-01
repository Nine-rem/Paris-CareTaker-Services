import React from 'react';

function Hero() {
  return (
    <div id="hero-principal-image" className="px-4 py-5 d-flex justify-content-start align-items-center hero-primary hero-position">
      <div className="py-5 box-margin-left">
        <h1 className="display-5 fw-bold">Location saisonnière et <br />services exclusifs</h1>
        <p className="fs-5 mb-4">Réservez une expérience unique en un clic avec Paris Caretaker Services</p>
        <button className="btn btn-dark btn-hover-brown" type="button" onClick={() => window.location.href='stay-all.php'}>Trouvez un logement</button>
      </div>
    </div>
  );
}

export default Hero;
