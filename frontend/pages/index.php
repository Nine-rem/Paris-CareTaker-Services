<?php 
//session_start();
//require "conf.inc.php";
//require "core/functions.php";
?>
<?php include "template/header.php";?>

<!-- Hero -->
<div id="hero-home" class="px-4 py-5 d-flex justify-content-start align-items-center">
    <div class="py-5 box-margin-left">
        <h1 class="display-5 fw-bold">Location saisonnière et <br>services exclusifs</h1>
        <p class="fs-5 mb-4">Réservez une expérience unique en un clic avec Paris Caretaker Services</p>
        <button class="btn btn-dark btn-hover-brown" type="button">Trouvez un logement</button>
    </div>
</div>

<!-- Bloc des nouveautés -->
<div id="new-stays" class="box centered-text">
    <h2>Nos nouveautés</h2>
</div>

<!-- Bloc à propos -->
<div id="services" class="box lightgrey-box row vertical-align">
    <div class="col-md-6 align-self-start box-margin-right">
        <img src="../assets/images/equipe-pcs.jpg" class="img-fluid" width="650px">
    </div>
    <div class="col-md-6">
        <h2>Qui sommes-nous ?</h2>
        <p>Fondée en 2018, Paris Caretaker Services est une société française vous proposant une gamme complète de services de conciergerie immobilière pour simplifier votre expérience de voyage. Des check-ins flexibles et des nettoyages méticuleux aux communications constantes entre le client et le bailleur, nous prenons en charge tous les aspects de la location saisonnière.</p>
        <p>Avec des prestataires de confiance et des agences situées dans plusieurs arrondissements de Paris, à Troyes, Nice et Biarritz, PCS garantit des séjours sans soucis pour les voyageurs, leur permettant de profiter pleinement de leur expérience.</p>
    </div>
</div>

<!-- Bloc des avis -->
<div id="reviews" class="box centered-text">
    <h2>Ce qu'ils pensent de nous</h2>
</div>

<!-- Bloc demande de devis -->
<div id="quote" class="box lightgrey-box row vertical-align">
    <div class="col-md-6 align-self-start box-margin-right">
        <h2>Bailleur ? Simplifiez-vous la vie !</h2>
        <p>Découvrez une façon simple et efficace de mettre votre bien en location saisonnière en vous inscrivant sur notre site dès aujourd'hui. Nous proposons plusieurs formules de gestion adaptées à vos besoins, vous permettant de maximiser vos revenus tout en minimisant les tracas.</p>
        <p>Il vous suffit de cliquer sur un bouton pour démarrer : nous nous occupons de tout le reste, de la gestion des réservations à l'accueil des voyageurs. Laissez-nous prendre en charge la gestion de votre bien pour que vous puissiez profiter pleinement de vos revenus locatifs, sans effort supplémentaire de votre part</p>
        <div class="d-grid gap-2 col-6 mx-auto btn-margin">
            <button class="btn btn-dark btn-hover-brown" type="button">Votre devis en ligne</button>
        </div>
    </div>
    <div class="col-md-6 justify-content-end d-flex align-items-center">
        <img src="../assets/images/bailleur.jpg" class="img-fluid" width="650px">
    </div>
</div>

<!-- Bloc prestataire -->
<div id="services" class="box row vertical-align">
    <div class="col-md-6 align-self-start box-margin-right">
        <img src="../assets/images/blanchisserie.jpg" class="img-fluid" width="650px">
    </div>
    <div class="col-md-6">
        <h2>Rejoignez notre réseau de prestataire</h2>
        <p>Découvrez de nouvelles opportunités en collaborant avec nous en tant que prestataire de services. Que vous soyez un chauffeur de taxi, une blanchisserie, un service de ménage ou de bricolage, nous vous invitons à rejoindre notre réseau.</p>
        <p>Nous prenons en charge toute la gestion, vous permettant de vous concentrer sur votre intervention en toute tranquillité d'esprit.</p>
        <div class="d-grid gap-2 col-6 mx-auto btn-margin">
            <button class="btn btn-dark btn-hover-brown" type="button">Nous rejoindre</button>
        </div>
    </div>
</div>

<?php include "template/footer.php";?>