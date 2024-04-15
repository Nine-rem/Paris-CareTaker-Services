<?php 
//session_start();
//require "conf.inc.php";
//require "core/functions.php";
?>
<?php include "template/header.php";?>

<!-- Hero -->
<div id="hero" class="px-4 py-5 d-flex justify-content-center align-items-center hero-secondary">
    <div class="py-5 box-margin-left">
        <h1 class="display-5 fw-bold">Demandes en attente</h1>
    </div>
</div>

<!-- Bloc biens en attente de validation -->
<div id="search-stay" class="box centered-text">
    <h2>Biens en attente de validation</h2>
    <div class="table-responsive">
        <table class="table table-striped table-hover">
            <thead class="thead-dark">
                <tr>
                    <th>Location</th>
                    <th>Type de location</th>
                    <th>Capacité</th>
                    <th>Surface (m2)</th>
                    <th>Localisation</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    $response = file_get_contents('http://localhost:5000/biens');
                    if ($response === false) {
                        header("Location: error.php");
                    } else {
                        $biens = json_decode($response, true);
                        if (!empty($biens)) {
                            foreach ($biens as $bien) {
                                if($bien['statut'] == 0) {
                                    $icone_pmr = ($bien['PMR_ok'] == 1) ? '<img src="../assets/images/pmr.png" alt="Accès PMR" title="Accès PMR" width="15px"> ' : '';
                                    $icone_animal = ($bien['animal_ok'] == 1) ? '<img src="../assets/images/animal.png" alt="Pet friendly" title="Pet friendly" width="17px"> ' : '';
                                    echo '<tr>';
                                    echo '<td class="align-middle">'.$bien['nom'].' '.$icone_pmr.$icone_animal.'</td>';
                                    echo '<td class="align-middle">'.$bien['type_location'].'</td>';
                                    echo '<td class="align-middle">'.$bien['capacite'].'</td>';
                                    echo '<td class="align-middle">'.$bien['surface'].'</td>';
                                    echo '<td class="align-middle">'.$bien['ville'].' ('.$bien['cp'].')</td>';
                                    echo '<td class="align-middle"><button class="btn btn-dark btn-hover-brown" type="button">Consulter</button>';
                                }
                            }
                        } else {
                            echo '<tr><td colspan="5">Aucune location trouvée.</td></tr>';
                        }
                    }
                ?>
            </tbody>
        </table>
    </div>
</div>

<?php include "template/footer.php";?>