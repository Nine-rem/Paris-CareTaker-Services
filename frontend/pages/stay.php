<?php include "template/header.php";?>

<?php
    $id_stay = $_GET['id'];
    $url = 'http://localhost:5000/bien/' . $id_stay;
    $response = file_get_contents($url);
    
    if ($response === false) {
        header("Location: error.php");
    } else {
        $stay_data = json_decode($response, true);
        if (!empty($stay_data)) {
            foreach ($stay_data as $data) {
?>

<!-- Hero -->
<div id="hero" class="px-4 py-5 d-flex justify-content-start align-items-center hero-primary">
    <div class="py-5 box-margin-left">
        <h1 class="display-5 fw-bold">Location saisonnière et <br>services exclusifs</h1>
        <p class="fs-5 mb-4">Réservez une expérience unique en un clic avec Paris Caretaker Services</p>
        <button class="btn btn-dark btn-hover-brown" type="button" onclick="window.location.href='stay-all.php'">Trouvez un logement</button>
    </div>
</div>



<div class="px-4 py-5 d-flex justify-content-center align-items-center hero-secondary">
    <h1 class="display-5 fw-bold"><?= $data['pcs_bien.nom'];?></h1>            
</div>

<?php
                $icon_pmr = ($data['PMR_ok'] == 1) ? '<img src="../assets/images/pmr.png" alt="Accès PMR" title="Accès PMR" width="15px"> ' : '';
                $icon_pet = ($data['animal_ok'] == 1) ? '<img src="../assets/images/animal.png" alt="Pet friendly" title="Pet friendly" width="17px"> ' : '';
                echo '<br>Type de location : ';
                echo '<br>Adresse : ';
                echo '<br>Tarif : ';
                echo '<br>Capacité : ';
                echo '<br>Surface : ';
                echo '<br>Agence principale : ';
                echo '<br>Nombre de chambre : ';
                echo '<br>Galerie : ';
                

            }
        } else {
            echo '<tr><td colspan="5">Aucune location trouvée.</td></tr>';
        }
    }
?>




<!-- Bloc informations du bien -->
<div id="stay-information" class="box lightgrey-box row vertical-align">
    <div class="col-md-6 align-self-center box-margin-right">
        <img src="../assets/images/equipe-pcs.jpg" class="img-fluid" width="650px">
    </div>
    <div class="col-md-6">
        <h2>À propos de ce logement</h2>
        <p>
            <img class="small-italic-text" src="../assets/images/user.png" alt="Propriétaire du logement" title="Propriétaire du logement" width="15px" style="margin-right:13px;">
            <?= $data['prenom'];?>

            <?=$data['description'];?>
        </p>
        <?php
            $icon_pmr = ($data['PMR_ok'] == 1) ? '<img src="../assets/images/pmr.png" alt="Accès PMR" title="Accès PMR" width="15px" style="margin-right:13px;"> ' : '';
            $icon_pet = ($data['animal_ok'] == 1) ? '<img src="../assets/images/animal.png" alt="Pet friendly" title="Pet friendly" width="18px" style="margin-right:10px;"> ' : '';
            echo $icon_pmr.'<span class="small-italic-text"> Accessible et adapté aux personnes à mobilité réduite</span><br>';
            echo $icon_pet.'<span class="small-italic-text"> Animeaux de compagnie autorisés</span>';
        ?>
    </div>
</div>

<!-- Bloc équipement et service -->
<div id="stay-equipment-service" class="box row">
    <h2 class="centered-text">Votre confort, notre priorité !</h2>
    <p>Paris Caretaker Service vous propose des logements où chaque détail est pensé pour votre confort absolu. Dans ce logement, nous avons pris soin de vous offrir une expérience de vie harmonieuse et pratique, en mettant à votre disposition une panoplie d'équipements soigneusement sélectionnés.
    De plus, notre réseau de partenaire de confiance sont à votre disposition pour faciliter votre séjour en vous proposant une gamme de services visant à rendre votre expérience encore plus agréable.
    </p>
    <div class="col-md-6 box-margin-right mt-4">
        <!-- récup via API tout piece + photo + info bien -+ services souscrit -->
        <h3 class="centered-text">Équipement(s) proposé(s) par ce logement</h3>
        <?php
            $id_stay = $_GET['id'];
            $url = 'http://localhost:5000/bien-equipement/' . $id_stay;
            $response = file_get_contents($url);
            if ($response === false) {
                header("Location: error.php");
            } else {
                $equipments = json_decode($response, true);
                if (!empty($equipments)) {
                    foreach ($equipments as $equipment) {
                        $icon_equipment = '<img src="../assets/images/equipment-service/equipement-'.$equipment['id'].'.png" alt="'.$equipment['nom'].'" title="'.$equipment['nom'].'" width="60px" style="margin-right: 10px;">';
                        echo '<p style="font-weight: 600;">'.$icon_equipment.' '.$equipment['nom'].'</p>';
                    }
                } else {
                    echo 'Aucun équipement';
                }
            }
        ?>
    </div>
    <div class="col-md-6 mt-4">
        <h3 class="centered-text">Service(s) proposé(s) par ce logement</h3>
        <b style="color: red; font-weight: 600;">AFFICHER SERVICE SOUSCRIT</b>
    </div>
</div>

<!-- Bloc des avis -->
<div id="stay-reviews" class="box lightgrey-box centered-text">
    <h2>Ce qu'ils en ont pensé</h2>
    <b style="color: red; font-weight: 600;">AFFICHER AVIS + COMMENTAIRE</b>
</div>

<?php include "template/footer.php";?>