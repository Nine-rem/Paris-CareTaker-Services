import React from 'react';

function Hero() {
  return (
    <>
    <div>
      <div id="hero-principal-image" class="px-4 py-5 d-flex justify-content-start align-items-center hero-primary hero-position">
          <div class="py-5 box-margin-left">
              <h1 class="display-5 fw-bold">Location saisonnière et {"\n"}services exclusifs</h1>
              <p class="fs-5 mb-4">Réservez une expérience unique en un clic avec Paris Caretaker Services</p>
              <button class="btn btn-dark btn-hover-brown" type="button" onclick="window.location.href='stay-all.php'">Trouvez un logement</button>
          </div>
      </div>
    </div>
    </>
  );
}

export default Hero;
