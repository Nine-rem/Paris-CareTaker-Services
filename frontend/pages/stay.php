<?php include "template/header.php";?>

<!-- Hero -->
<?php
    $id_stay = $_GET['id'];
    $url = 'http://localhost:5000/bien-photo/' . $id_stay;
    $response_photo = file_get_contents($url);
    
    if ($response_photo === false) {
        header("Location: error.php");
    } else {
        $stay_photos = json_decode($response_photo, true);
        if (!empty($stay_photos)) {
            foreach ($stay_photos as $photo) {
                if ($photo['est_couverture']) {
                    $cover_path = $photo["chemin_photo"];
                }
            }
        } else {
            echo '<tr><td colspan="5">Aucune photo trouvée.</td></tr>';
        }
    }
    echo "<div class='px-4 py-5 d-flex justify-content-center align-items-center hero-primary hero-position' style=\"background-image: url('../assets/images/stay/".$id_stay.$cover_path."');\">";
?>
    <div class="py-5 px-5 white-75">
        
    
<!-- Bloc informations du bien -->
<?php
    $id_stay = $_GET['id'];
    $url = 'http://localhost:5000/bien/' . $id_stay;
    $response = file_get_contents($url);
    
    if ($response === false) {
        header("Location: error.php");
    } else {
        $stay_data = json_decode($response, true);
        if (!empty($stay_data)) {
            $count_room = 0;
            foreach ($stay_data as $data) {

                // Nom du bien
                echo '<h1 class="display-5 fw-bold">'.$data['nom_bien'].'</h1></div></div>';
?>

<div id="stay-information" class="box lightgrey-box row vertical-align">
    <div class="col-md-6 align-self-center box-margin-right">
    <?php
                echo '<span class="bold-brown-text">'.$data["type_location_bien"].'</span>';
                echo '<div class="mt-4"><img class="mb-2" src="../assets/images/localisation.png" alt="Localisation" title="Localisation" width="35px" style="margin-right:10px;"> '.$data['ville_bien'].' ('.$data['cp_bien'].')<br>';
                echo '<img class="mb-2" src="../assets/images/surface.png" alt="Surface" title="Surface" width="35px" style="margin-right:10px;"> '.$data['surface_bien'].' m²<br>';
                foreach ($stay_photos as $photo) {
                    if ($photo['nom_type_piece'] == 'Chambre') {
                        $count_room++;
                    }
                }
                echo '<img class="mb-2" src="../assets/images/capacite.png" alt="Capacité" title="Capacité" width="35px" style="margin-right:10px;"> '.$data['capacite_bien'].' personne(s) - '.$count_room.' chambre(s)<br>';
                echo '<img class="mb-2" src="../assets/images/price.png" alt="Capacité" title="Capacité" width="35px" style="margin-right:10px;"> '.$data['tarif_bien'].' €/nuit<br></div>';                
            }
        } else {
            echo '<tr><td colspan="5">Aucune location trouvée.</td></tr>';
        }
    }

?>
        <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-dark btn-hover-brown mt-1" type="button" onclick="#">Réserver ce logement</button>
        </div>
    </div>
    <div class="col-md-6">
        <h2>À propos de ce logement</h2>
        <p><?=$data['description_bien'];?></p>
        <p>
        <?php
            $icon_pmr = ($data['PMR_ok_bien'] == 1) ? '<img src="../assets/images/pmr.png" alt="Accès PMR" title="Accès PMR" width="15px" style="margin-right:13px;"> ' : '';
            $icon_pet = ($data['animal_ok_bien'] == 1) ? '<img src="../assets/images/animal.png" alt="Pet friendly" title="Pet friendly" width="18px" style="margin-right:10px;"> ' : '';
            echo $icon_pmr.'<span class="small-italic-text"> Accessible et adapté aux personnes à mobilité réduite</span><br>';
            echo $icon_pet.'<span class="small-italic-text"> Animeaux de compagnie autorisés</span>';
        ?>
        </p>
    </div>
</div>


<!-- Bloc équipement et service -->
<div id="stay-equipment-service" class="box row">
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


<!-- Bloc photos du bien -->
<div id="stay-gallery" class="box centered-text">
    <div id="carouselExampleDark" class="carousel carousel-dark slide">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
        <img src="../assets/images/stay/2/salon1.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
        </div>
        </div>
        <div class="carousel-item" data-bs-interval="2000">
        <img src="../assets/images/stay/2/chambre1.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
        </div>
        </div>
        <div class="carousel-item">
        <img src="../assets/images/stay/2/cuisine1.jpg" class="d-block w-100" alt="...">
        <div class="carousel-caption d-none d-md-block">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
        </div>
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
    </div>
</div>


<!-- PARTIE AVEC NOTE ET BAILLEUR -->
<!-- récup via API tout piece + photo -+ -->


<!-- Bloc des avis -->
<div id="stay-reviews" class="box lightgrey-box centered-text">
    <h2>Ce qu'ils en ont pensé</h2>
    <b style="color: red; font-weight: 600;">AFFICHER AVIS + COMMENTAIRE</b>
</div>

<?php include "template/footer.php";?>