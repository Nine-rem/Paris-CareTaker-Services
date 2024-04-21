<?php include "template/header.php";?>

<!-- Bloc information du bien -->
<div id="stay-information" class="box lightgrey-box row vertical-align">
    <?php
        $id_stay = $_GET['id'];
        $url_photo = 'http://localhost:5000/bien-photo/' . $id_stay;
        $response_photo = file_get_contents($url_photo);
        if ($response_photo === false) {
            header("Location: error.php");
        } else {
            $stay_photos = json_decode($response_photo, true);
        }
        
        $url = 'http://localhost:5000/bien/' . $id_stay;
        $response = file_get_contents($url);
        if ($response === false) {
            header("Location: error.php");
        } else {
            $stay_data = json_decode($response, true);
            if (!empty($stay_data)) {
                $count_room = 0;
                foreach ($stay_data as $data) {
    ?>
    <h1 class="centered-text display-5 fw-bold"><?= $data['nom_bien']?></h1>
    <span class="bold-brown-text centered-text mb-5"><?= $data["type_location_bien"]?></span>
    <p><?=$data['description_bien'];?></p>
    <p>
        <?php
            $icon_pmr = ($data['PMR_ok_bien'] == 1) ? '<img src="../assets/images/pmr.png" alt="Accès PMR" title="Accès PMR" width="15px" style="margin-right:13px;"> ' : '';
            $icon_pet = ($data['animal_ok_bien'] == 1) ? '<img src="../assets/images/animal.png" alt="Pet friendly" title="Pet friendly" width="18px" style="margin-right:10px;"> ' : '';
            echo $icon_pmr.'<span class="small-italic-text"> Accessible et adapté aux personnes à mobilité réduite</span><br>';
            echo $icon_pet.'<span class="small-italic-text"> Animeaux de compagnie autorisés</span>';
        ?>
    </p>
    <div class="d-flex justify-content-center align-items-center">
        <?php
            echo '<div class="mt-4"><img class="mb-2" src="../assets/images/localisation.png" alt="Localisation" title="Localisation" width="35px" style="margin-right:10px; margin-left:40px;"> '.$data['ville_bien'].' ('.$data['cp_bien'].')';
            echo '<img class="mb-2" src="../assets/images/surface.png" alt="Surface" title="Surface" width="35px" style="margin-right:10px; margin-left:40px;"> '.$data['surface_bien'].' m²';
            if (!empty($stay_photos)) {
                foreach ($stay_photos as $photo) {
                    if ($photo['nom_type_piece'] == 'Chambre') {
                        $count_room++;
                    }
                }
            }
            echo '<img class="mb-2" src="../assets/images/capacite.png" alt="Capacité" title="Capacité" width="35px" style="margin-right:10px; margin-left:40px;"> '.$data['capacite_bien'].' personne(s) - '.$count_room.' chambre(s)';
            echo '<img class="mb-2" src="../assets/images/price.png" alt="Capacité" title="Capacité" width="35px" style="margin-right:10px; margin-left:40px;"> '.$data['tarif_bien'].' €/nuit<br></div>';                
        }
            } else {
                echo '<tr><td colspan="5">Aucune location trouvée.</td></tr>';
            }
        }
    ?>
    </div>
        <div class="d-flex justify-content-center align-items-center">
        <button class="btn btn-dark btn-hover-brown mt-5 mx-3" type="button" onclick="#">Réserver ce logement</button>
        <button class="btn btn-success mt-5 mx-3" type="button" onclick="#">Valider</button>
        <button class="btn btn-danger mt-5 mx-3" type="button" onclick="#">Supprimer</button>
        <button class="btn btn-dark btn-hover-brown mt-5 mx-3" type="button" onclick="#">Modifier</button>
    </div>
</div>


<!-- Bloc photos du bien -->
<div id="stay-gallery" class="box row vertical-align">
    <?php
        if (!empty($stay_photos)) {
            foreach ($stay_photos as $photo) {
                echo '<div class="col-md-8 align-self-center box-margin-right mb-3">'; // Ajout de mb-3 pour la marge en bas
                echo '<img src="../assets/images/stay/'.$id_stay.$photo['chemin_photo'].'" width="100%">';
                echo '</div>';
                echo '<div class="col-md-4">';
                echo '<h3 class="black-h3">'.$photo['nom_piece'].'</h3>';
                echo '<p>'.$photo['description_piece'].'</p>';
                echo '</div>';
            }
        } else {
            echo '<tr><td colspan="5">Aucune photo trouvée.</td></tr>';
        }
    ?>
</div>


<!-- surface
privatif -->


<!-- Bloc équipement et service -->
<div id="stay-equipment-service" class="box lightgrey-box row">
    <h2 class="centered-text">Votre confort, notre priorité !</h2>
    <p>Paris Caretaker Service vous propose des logements où chaque détail est pensé pour votre confort absolu. Dans ce logement, nous avons pris soin de vous offrir une expérience de vie harmonieuse et pratique, en mettant à votre disposition une panoplie d'équipements soigneusement sélectionnés.
    De plus, notre réseau de partenaire de confiance sont à votre disposition pour faciliter votre séjour en vous proposant une gamme de services visant à rendre votre expérience encore plus agréable.
    </p>
    <div class="col-md-6 box-margin-right mt-4">
        <h3 class="centered-text">Équipement(s) proposé(s) par ce logement</h3>
        <?php
            $id_stay = $_GET['id'];
            $url = 'http://localhost:5000/bien-equipement/' . $id_stay;
            $response_equipment = file_get_contents($url);
            if ($response_equipment === false) {
                header("Location: error.php");
            } else {
                $equipments = json_decode($response_equipment, true);
                if (!empty($equipments)) {
                    foreach ($equipments as $equipment) {
                        $icon_equipment = '<img src="../assets/images/equipment-service/equipement-'.$equipment['id_equipement'].'.png" alt="'.$equipment['nom_equipement'].'" title="'.$equipment['nom_equipement'].'" width="60px" style="margin-right: 10px;">';
                        echo '<p style="font-weight: 600;">'.$icon_equipment.' '.$equipment['nom_equipement'].'</p>';
                    }
                } else {
                    echo '<span style="display: block; text-align: center;" class="small-italic-text">Aucun équipement</span>';
                }
            }
        ?>
    </div>
    <div class="col-md-6 mt-4">
        <h3 class="centered-text">Service(s) proposé(s) par ce logement</h3>
        <?php
            $id_stay = $_GET['id'];
            $url = 'http://localhost:5000/bien-service/' . $id_stay;
            $response_service = file_get_contents($url);
            if ($response_service === false) {
                header("Location: error.php");
            } else {
                $services = json_decode($response_service, true);
                if (!empty($services)) {
                    foreach ($services as $service) {
                        $icon_service = '<img src="../assets/images/equipment-service/service-'.$service['id_service'].'.png" alt="'.$service['nom_service'].'" title="'.$service['nom_service'].'" width="60px" style="margin-right: 10px;">';
                        echo '<p style="font-weight: 600;">'.$icon_service.' '.$service['nom_equipement'].'</p>';
                    }
                } else {
                    echo '<span style="display: block; text-align: center;" class="small-italic-text">Aucun service souscrit</span>';
                }
            }
        ?>
    </div>
</div>


<!-- Bloc des avis -->
<div id="stay-reviews" class="box centered-text">
    <h2>Ce qu'ils en ont pensé</h2>
    <b style="color: red; font-weight: 600;">AFFICHER AVIS + COMMENTAIRE</b>
</div>

<?php include "template/footer.php";?>