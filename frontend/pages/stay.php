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

<div class="px-4 py-5 d-flex justify-content-center align-items-center hero-secondary">
    <h1 class="display-5 fw-bold"><?= $data['nom'];?></h1>            
</div>

<?php
                $icon_pmr = ($data['PMR_ok'] == 1) ? '<img src="../assets/images/pmr.png" alt="Accès PMR" title="Accès PMR" width="15px"> ' : '';
                $icon_pet = ($data['animal_ok'] == 1) ? '<img src="../assets/images/animal.png" alt="Pet friendly" title="Pet friendly" width="17px"> ' : '';
                echo '<br>Type de location : ';
                echo '<br>Propriétaire : ';
                echo '<br>Adresse : ';
                echo '<br>Tarif : ';
                echo '<br>Capacité : ';
                echo '<br>Surface : ';
                echo '<br>Pet friendly : ';
                echo '<br>Accès PMR : ';
                echo '<br>Description : ';
                echo '<br>Agence principale : ';
                // nb piece
                // photo
                // equipement
                // avis
                // service compris
            }
        } else {
            echo '<tr><td colspan="5">Aucune location trouvée.</td></tr>';
        }
    }
?>

<?php include "template/footer.php";?>