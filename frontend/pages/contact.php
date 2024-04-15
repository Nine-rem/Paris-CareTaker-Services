<?php 
//session_start();
//require "conf.inc.php";
//require "core/functions.php";
?>
<?php include "template/header.php";?>

<!-- Hero -->
<div id="hero" class="px-4 py-5 d-flex justify-content-center align-items-center hero-secondary">
    <div class="py-5 box-margin-left">
        <h1 class="display-5 fw-bold">Contactez-nous</h1>
    </div>
</div>

<!-- Bloc nos agences -->
<div id="agencies" class="box lightgrey-box row vertical-align">
    <div class="col-md-6 align-self-center box-margin-right">
        <img src="../assets/images/equipe-pcs.jpg" class="img-fluid" width="650px">
    </div>
    <div class="col-md-6">
        <h2>Nos agences</h2>
            <?php
                $response = file_get_contents('http://localhost:5000/agences');
                if ($response === false) {
                    echo 'Erreur lors de la récupération des agences.';
                } else {
                    $agences = json_decode($response, true);
                    if (!empty($agences)) {
                        foreach ($agences as $agence) {
                            echo '<p>ID: ' . $agence['id'] . ', Adresse: ' . $agence['adresse'] . '</p>';
                        }
                    } else {
                        echo 'Aucune agence trouvée.';
                    }
                }
            ?>
    </div>
</div>

<!-- Formulaire de contact
Chatbot
Simulation de devis -->


<?php include "template/footer.php";?>