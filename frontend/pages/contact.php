<?php 
//session_start();
//require "conf.inc.php";
require "../core/functions.php";
?>
<?php include "template/header.php";?>

<!-- Hero -->
<div id="hero-principal-image" class="px-4 py-5 d-flex justify-content-center align-items-center hero-secondary hero-position">
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
                $response = file_get_contents('http://localhost:5000/agence');
                if ($response === false) {
                    header("Location: error.php");
                } else {
                    $agencies = json_decode($response, true);
                    if (!empty($agencies)) {

                        // Affichage dans l'ordre alphabétique
                        usort($agencies, 'compareCity');
                        
                        foreach ($agencies as $agencie) {
                            $icon_key = ($agencie['boite_cle'] == 1) ? '<img src="../assets/images/cle.png" alt="Boite à clé disponible" title="Boite à clé disponible" width="20px"> ' : '';
                            echo '<h3>'.$agencie['ville_agence'].' ('.$agencie['cp_agence'].') '.$icon_key.'</h3>';
                            echo $agencie['adresse_agence'];
                            echo '<br>Téléphone : (+33) '.$agencie['tel_agence'];
                            echo '<br>Email : '.$agencie['email_agence'].'<br><br>';
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