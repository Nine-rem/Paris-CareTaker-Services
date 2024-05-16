-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 21 avr. 2024 à 12:33
-- Version du serveur : 8.0.33
-- Version de PHP : 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pcs`
--

-- --------------------------------------------------------

--
-- Structure de la table `pcs_agence`
--

DROP TABLE IF EXISTS `pcs_agence`;
CREATE TABLE IF NOT EXISTS `pcs_agence` (
  `id_agence` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `responsable_agence` varchar(120) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `adresse_agence` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cp_agence` char(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ville_agence` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `tel_agence` char(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email_agence` varchar(320) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `boite_cle` tinyint(1) NOT NULL,
  PRIMARY KEY (`id_agence`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `pcs_agence`
--

INSERT INTO `pcs_agence` (`id_agence`, `responsable_agence`, `adresse_agence`, `cp_agence`, `ville_agence`, `tel_agence`, `email_agence`, `boite_cle`) VALUES
(1, 'Jean DUPONT', '23 rue Montorgueil', '75002', 'PARIS', '0123456789', 'montorgueil@caretakerservices-paris.fr', 1),
(2, 'Nicolas DUPUIS', '24 rue du Pont Neuf', '75001', 'PARIS', '0123456790', 'pont-neuf@caretakerservices-paris.fr', 0);

-- --------------------------------------------------------

--
-- Structure de la table `pcs_avis`
--

DROP TABLE IF EXISTS `pcs_avis`;
CREATE TABLE IF NOT EXISTS `pcs_avis` (
  `id_avis` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `note_avis` tinyint UNSIGNED NOT NULL,
  `message_avis` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `date_avis` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reservation` smallint UNSIGNED NOT NULL,
  PRIMARY KEY (`id_avis`),
  KEY `reservation` (`reservation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_bien`
--

DROP TABLE IF EXISTS `pcs_bien`;
CREATE TABLE IF NOT EXISTS `pcs_bien` (
  `id_bien` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_bien` varchar(200) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `statut_bien` tinyint NOT NULL,
  `adresse_bien` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cp_bien` char(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ville_bien` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `type_location_bien` varchar(30) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `capacite_bien` smallint UNSIGNED NOT NULL,
  `surface_bien` decimal(10,2) UNSIGNED NOT NULL,
  `animal_ok_bien` tinyint(1) NOT NULL,
  `PMR_ok_bien` tinyint(1) NOT NULL,
  `description_bien` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `tarif_bien` decimal(10,2) UNSIGNED NOT NULL,
  `bailleur` smallint UNSIGNED NOT NULL,
  `agence_principale_bien` smallint UNSIGNED NOT NULL,
  PRIMARY KEY (`id_bien`),
  KEY `utilisateur` (`bailleur`),
  KEY `agence_principale` (`agence_principale_bien`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `pcs_bien`
--

INSERT INTO `pcs_bien` (`id_bien`, `nom_bien`, `statut_bien`, `adresse_bien`, `cp_bien`, `ville_bien`, `type_location_bien`, `capacite_bien`, `surface_bien`, `animal_ok_bien`, `PMR_ok_bien`, `description_bien`, `tarif_bien`, `bailleur`, `agence_principale_bien`) VALUES
(2, 'Villa avec vue sur la mer', 0, '5 rue Goury', '77654', 'Villeneuve la Garenne', 'Logement entier', 9, 150.00, 1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lobortis arcu ultrices ligula sodales porttitor. Vivamus tempor vel risus non fringilla. Donec egestas quam ut neque vulputate placerat. Sed a lorem sollicitudin, vestibulum mi id, aliquet tortor. Mauris mattis risus non mi lobortis facilisis. Morbi lacinia velit elementum, imperdiet est nec, posuere dui. Nam vel dapibus augue. Vestibulum sodales, arcu eget sagittis varius, tortor tellus bibendum velit, vel ornare nisi tellus ac erat.', 130.00, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `pcs_bien_enregistre`
--

DROP TABLE IF EXISTS `pcs_bien_enregistre`;
CREATE TABLE IF NOT EXISTS `pcs_bien_enregistre` (
  `utilisateur_enregistre` smallint UNSIGNED NOT NULL,
  `bien_enregistre` smallint UNSIGNED NOT NULL,
  PRIMARY KEY (`utilisateur_enregistre`,`bien_enregistre`),
  KEY `utilisateur` (`utilisateur_enregistre`),
  KEY `bien` (`bien_enregistre`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_bien_possede`
--

DROP TABLE IF EXISTS `pcs_bien_possede`;
CREATE TABLE IF NOT EXISTS `pcs_bien_possede` (
  `bien_equipe` smallint UNSIGNED NOT NULL,
  `equipement_contenu` smallint UNSIGNED NOT NULL,
  `quantite_equipement` smallint UNSIGNED NOT NULL,
  PRIMARY KEY (`bien_equipe`,`equipement_contenu`),
  KEY `bien` (`bien_equipe`),
  KEY `equipement` (`equipement_contenu`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `pcs_bien_possede`
--

INSERT INTO `pcs_bien_possede` (`bien_equipe`, `equipement_contenu`, `quantite_equipement`) VALUES
(2, 4, 1),
(2, 12, 4);

-- --------------------------------------------------------

--
-- Structure de la table `pcs_commente`
--

DROP TABLE IF EXISTS `pcs_commente`;
CREATE TABLE IF NOT EXISTS `pcs_commente` (
  `message_commentaire` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `date_commentaire` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `avis_commentaire` smallint UNSIGNED NOT NULL,
  `utilisateur_commentaire` smallint UNSIGNED NOT NULL,
  PRIMARY KEY (`avis_commentaire`,`utilisateur_commentaire`),
  KEY `utilisateur` (`utilisateur_commentaire`),
  KEY `avis` (`avis_commentaire`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_contrat`
--

DROP TABLE IF EXISTS `pcs_contrat`;
CREATE TABLE IF NOT EXISTS `pcs_contrat` (
  `id_contrat` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `type_gestion_contrat` tinyint NOT NULL,
  `duree_contrat` tinyint UNSIGNED NOT NULL,
  `statut_contrat` tinyint NOT NULL,
  `devis_contrat` smallint UNSIGNED NOT NULL,
  `bien_contrat` smallint UNSIGNED NOT NULL,
  `service_contrat` smallint UNSIGNED NOT NULL,
  `date_souscription_contrat` date NOT NULL,
  PRIMARY KEY (`id_contrat`),
  UNIQUE KEY `devis_2` (`devis_contrat`),
  KEY `devis` (`devis_contrat`),
  KEY `bien` (`bien_contrat`),
  KEY `service` (`service_contrat`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_devis`
--

DROP TABLE IF EXISTS `pcs_devis`;
CREATE TABLE IF NOT EXISTS `pcs_devis` (
  `id_devis` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `statut_devis` tinyint NOT NULL,
  `date_devis` date NOT NULL,
  `type_gestion_devis` tinyint NOT NULL,
  `type_location_devis` tinyint NOT NULL,
  `adresse_devis` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cp_devis` char(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ville_devis` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `capacite_devis` tinyint UNSIGNED NOT NULL,
  `nb_chambre_devis` tinyint UNSIGNED NOT NULL,
  `surface_devis` decimal(10,2) UNSIGNED NOT NULL,
  `utilisateur_devis` smallint UNSIGNED NOT NULL,
  `disponibilite_utilisateur_devis` tinyint NOT NULL,
  PRIMARY KEY (`id_devis`),
  KEY `utilisateur` (`utilisateur_devis`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_edl`
--

DROP TABLE IF EXISTS `pcs_edl`;
CREATE TABLE IF NOT EXISTS `pcs_edl` (
  `id_edl` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `type_edl` tinyint(1) NOT NULL,
  `observation_edl` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `date_edl` date NOT NULL,
  `réservation_edl` smallint UNSIGNED NOT NULL,
  PRIMARY KEY (`id_edl`),
  KEY `réservation` (`réservation_edl`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_equipement`
--

DROP TABLE IF EXISTS `pcs_equipement`;
CREATE TABLE IF NOT EXISTS `pcs_equipement` (
  `id_equipement` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_equipement` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`id_equipement`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `pcs_equipement`
--

INSERT INTO `pcs_equipement` (`id_equipement`, `nom_equipement`) VALUES
(1, 'Lave-linge'),
(2, 'Lave-vaisselle'),
(3, 'Fer à repasser'),
(4, 'Climatisation'),
(5, 'Barbecue'),
(6, 'Bouilloire'),
(7, 'Four'),
(8, 'Réfrigérateur'),
(9, 'Jacuzzi'),
(10, 'Linge de lit'),
(11, 'Piscine'),
(12, 'Vaisselle et couvert'),
(13, 'Ventilateur'),
(14, 'Wifi');

-- --------------------------------------------------------

--
-- Structure de la table `pcs_est_habilite`
--

DROP TABLE IF EXISTS `pcs_est_habilite`;
CREATE TABLE IF NOT EXISTS `pcs_est_habilite` (
  `utilisateur_habilite` smallint UNSIGNED NOT NULL,
  `habilitation` smallint UNSIGNED NOT NULL,
  `date_obtention_habilitation` date NOT NULL,
  `date_expiration_habilitation` date DEFAULT NULL,
  PRIMARY KEY (`utilisateur_habilite`,`habilitation`),
  KEY `utilisateur` (`utilisateur_habilite`),
  KEY `habilitation` (`habilitation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_facture`
--

DROP TABLE IF EXISTS `pcs_facture`;
CREATE TABLE IF NOT EXISTS `pcs_facture` (
  `id_facture` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `type_facture` tinytext CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `statut_facture` tinyint NOT NULL,
  `date_facture` date NOT NULL,
  PRIMARY KEY (`id_facture`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_habilitation`
--

DROP TABLE IF EXISTS `pcs_habilitation`;
CREATE TABLE IF NOT EXISTS `pcs_habilitation` (
  `id_habilitation` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_habilitation` varchar(120) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`id_habilitation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_habilitation_necessaire`
--

DROP TABLE IF EXISTS `pcs_habilitation_necessaire`;
CREATE TABLE IF NOT EXISTS `pcs_habilitation_necessaire` (
  `service` smallint UNSIGNED NOT NULL,
  `habilitation` smallint UNSIGNED NOT NULL,
  PRIMARY KEY (`service`,`habilitation`),
  KEY `habilitation` (`habilitation`),
  KEY `service` (`service`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_intervient`
--

DROP TABLE IF EXISTS `pcs_intervient`;
CREATE TABLE IF NOT EXISTS `pcs_intervient` (
  `date_debut_intervention` timestamp NOT NULL,
  `date_fin_intervention` timestamp NOT NULL,
  `intervenant` varchar(200) NOT NULL,
  `description_intervention` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `statut_intervention` tinyint NOT NULL,
  `prestataire` smallint UNSIGNED NOT NULL,
  `bien_intervention` smallint UNSIGNED NOT NULL,
  PRIMARY KEY (`prestataire`,`bien_intervention`),
  KEY `prestataire` (`prestataire`),
  KEY `bien` (`bien_intervention`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_langue`
--

DROP TABLE IF EXISTS `pcs_langue`;
CREATE TABLE IF NOT EXISTS `pcs_langue` (
  `id_langue` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_langue` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`id_langue`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `pcs_langue`
--

INSERT INTO `pcs_langue` (`id_langue`, `nom_langue`) VALUES
(1, 'Français'),
(2, 'English');

-- --------------------------------------------------------

--
-- Structure de la table `pcs_message`
--

DROP TABLE IF EXISTS `pcs_message`;
CREATE TABLE IF NOT EXISTS `pcs_message` (
  `id_message` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `texte_message` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `expediteur_message` smallint UNSIGNED NOT NULL,
  `destinataire_message` smallint UNSIGNED NOT NULL,
  `date_envoi_message` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_message`),
  KEY `expediteur` (`expediteur_message`),
  KEY `destinataire` (`destinataire_message`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_paiement`
--

DROP TABLE IF EXISTS `pcs_paiement`;
CREATE TABLE IF NOT EXISTS `pcs_paiement` (
  `id_paiement` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `mode_paiement` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `emetteur_paiement` smallint UNSIGNED NOT NULL,
  `bénéficiaire_paiement` smallint UNSIGNED NOT NULL,
  `date_emission_paiement` date DEFAULT NULL,
  `date_reception_paiement` date DEFAULT NULL,
  `montant_paiement` decimal(10,2) UNSIGNED NOT NULL,
  `reservation_paye` smallint UNSIGNED NOT NULL,
  PRIMARY KEY (`id_paiement`),
  KEY `emetteur` (`emetteur_paiement`),
  KEY `bénéficiaire` (`bénéficiaire_paiement`),
  KEY `reservation` (`reservation_paye`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_photo`
--

DROP TABLE IF EXISTS `pcs_photo`;
CREATE TABLE IF NOT EXISTS `pcs_photo` (
  `id_photo` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_photo` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description_photo` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `chemin_photo` varchar(320) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `piece_photo` smallint UNSIGNED NOT NULL,
  `est_couverture` tinyint NOT NULL,
  PRIMARY KEY (`id_photo`),
  KEY `piece` (`piece_photo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `pcs_photo`
--

INSERT INTO `pcs_photo` (`id_photo`, `nom_photo`, `description_photo`, `chemin_photo`, `piece_photo`, `est_couverture`) VALUES
(1, 'salon1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel ipsum sit amet est consequat laoreet. Mauris tempor elit a ipsum rhoncus, quis malesuada ligula vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum quis nisi eu nibh aliquam commodo ut accumsan ex. ', '/salon1.jpg', 11, 1),
(2, 'chambre1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel ipsum sit amet est consequat laoreet. Mauris tempor elit a ipsum rhoncus, quis malesuada ligula vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum quis nisi eu nibh aliquam commodo ut accumsan ex. ', '/chambre1.jpg', 13, 0),
(3, 'cuisine1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel ipsum sit amet est consequat laoreet. Mauris tempor elit a ipsum rhoncus, quis malesuada ligula vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum quis nisi eu nibh aliquam commodo ut accumsan ex. ', '/cuisine1.jpg', 12, 0),
(4, 'sdb1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel ipsum sit amet est consequat laoreet. Mauris tempor elit a ipsum rhoncus, quis malesuada ligula vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum quis nisi eu nibh aliquam commodo ut accumsan ex. ', '/sdb1.jpg', 14, 0);

-- --------------------------------------------------------

--
-- Structure de la table `pcs_piece`
--

DROP TABLE IF EXISTS `pcs_piece`;
CREATE TABLE IF NOT EXISTS `pcs_piece` (
  `id_piece` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_piece` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description_piece` text CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `est_privatif_piece` tinyint(1) NOT NULL,
  `bien_piece` smallint UNSIGNED NOT NULL,
  `surface_piece` decimal(10,2) UNSIGNED NOT NULL,
  `type_piece` smallint UNSIGNED NOT NULL,
  PRIMARY KEY (`id_piece`),
  KEY `type` (`type_piece`),
  KEY `bien` (`bien_piece`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `pcs_piece`
--

INSERT INTO `pcs_piece` (`id_piece`, `nom_piece`, `description_piece`, `est_privatif_piece`, `bien_piece`, `surface_piece`, `type_piece`) VALUES
(11, 'Salon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel ipsum sit amet est consequat laoreet. Mauris tempor elit a ipsum rhoncus, quis malesuada ligula vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum quis nisi eu nibh aliquam commodo ut accumsan ex. ', 1, 2, 50.00, 1),
(12, 'Cuisine', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel ipsum sit amet est consequat laoreet. Mauris tempor elit a ipsum rhoncus, quis malesuada ligula vehicula.', 1, 2, 20.00, 3),
(13, 'Chambre double', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel ipsum sit amet est consequat laoreet. Mauris tempor elit a ipsum rhoncus, quis malesuada ligula vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum quis nisi eu nibh aliquam commodo ut accumsan ex. ', 1, 2, 15.00, 2),
(14, 'Salle d\'eau avec WC', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vel ipsum sit amet est consequat laoreet. Mauris tempor elit a ipsum rhoncus, quis malesuada ligula vehicula. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum quis nisi eu nibh aliquam commodo ut accumsan ex. ', 1, 2, 15.00, 5);

-- --------------------------------------------------------

--
-- Structure de la table `pcs_reservation`
--

DROP TABLE IF EXISTS `pcs_reservation`;
CREATE TABLE IF NOT EXISTS `pcs_reservation` (
  `id_reservation` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `demande_complementaire` text,
  `utilisateur_reservation` smallint UNSIGNED NOT NULL,
  `date_reservation` date NOT NULL,
  `facture_reservation` smallint UNSIGNED NOT NULL,
  `bien_reserve` smallint UNSIGNED NOT NULL,
  `date_debut_reservation` date NOT NULL,
  `date_fin_reservation` date NOT NULL,
  PRIMARY KEY (`id_reservation`),
  KEY `utilisateur` (`utilisateur_reservation`),
  KEY `facture` (`facture_reservation`),
  KEY `bien` (`bien_reserve`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_service`
--

DROP TABLE IF EXISTS `pcs_service`;
CREATE TABLE IF NOT EXISTS `pcs_service` (
  `id_service` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_service` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `statut_service` tinyint NOT NULL,
  `taux_commission_service` tinyint UNSIGNED NOT NULL,
  `tarif_normal_service` decimal(10,2) UNSIGNED NOT NULL,
  `tarif_VIP_service` decimal(10,2) UNSIGNED NOT NULL,
  `type_service` smallint UNSIGNED NOT NULL,
  `prestataire` smallint UNSIGNED NOT NULL,
  PRIMARY KEY (`id_service`),
  KEY `type` (`type_service`),
  KEY `prestataire` (`prestataire`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_service_reserve`
--

DROP TABLE IF EXISTS `pcs_service_reserve`;
CREATE TABLE IF NOT EXISTS `pcs_service_reserve` (
  `quantite_reservee` smallint NOT NULL,
  `date_service` date NOT NULL,
  `service_reserve` smallint UNSIGNED NOT NULL,
  `reservation` smallint UNSIGNED NOT NULL,
  PRIMARY KEY (`service_reserve`,`reservation`),
  KEY `service` (`service_reserve`),
  KEY `reservation` (`reservation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_service_souscrit`
--

DROP TABLE IF EXISTS `pcs_service_souscrit`;
CREATE TABLE IF NOT EXISTS `pcs_service_souscrit` (
  `statut_souscription` tinyint UNSIGNED NOT NULL,
  `service_souscrit` smallint UNSIGNED NOT NULL,
  `bien_souscripteur` smallint UNSIGNED NOT NULL,
  `duree_souscription` tinyint UNSIGNED NOT NULL,
  PRIMARY KEY (`service_souscrit`,`bien_souscripteur`),
  KEY `service` (`service_souscrit`),
  KEY `bien` (`bien_souscripteur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_type_piece`
--

DROP TABLE IF EXISTS `pcs_type_piece`;
CREATE TABLE IF NOT EXISTS `pcs_type_piece` (
  `id_type_piece` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_type_piece` varchar(20) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`id_type_piece`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `pcs_type_piece`
--

INSERT INTO `pcs_type_piece` (`id_type_piece`, `nom_type_piece`) VALUES
(1, 'Salon'),
(2, 'Chambre'),
(3, 'Cuisine'),
(4, 'Salle à manger'),
(5, 'Salle d\'eau'),
(6, 'Salle de bain'),
(7, 'WC'),
(8, 'Buanderie'),
(9, 'Extérieur');

-- --------------------------------------------------------

--
-- Structure de la table `pcs_type_service`
--

DROP TABLE IF EXISTS `pcs_type_service`;
CREATE TABLE IF NOT EXISTS `pcs_type_service` (
  `id_type_service` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom_type_service` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`id_type_service`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_utilisateur`
--

DROP TABLE IF EXISTS `pcs_utilisateur`;
CREATE TABLE IF NOT EXISTS `pcs_utilisateur` (
  `id_utilisateur` smallint UNSIGNED NOT NULL AUTO_INCREMENT,
  `societe_utilisateur` varchar(120) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `SIRET_utilisateur` char(14) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT NULL,
  `nom_utilisateur` varchar(120) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `prenom_utilisateur` varchar(120) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `naissance_utilisateur` date NOT NULL,
  `adresse_utilisateur` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cp_utilisateur` char(5) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `ville_utilisateur` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `tel_utilisateur` char(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `email_utilisateur` varchar(320) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `pwd` varchar(64) NOT NULL,
  `formule_utilisateur` tinyint NOT NULL,
  `langue_utilisateur` smallint UNSIGNED NOT NULL,
  `date_creation_utilisateur` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_maj_utilisateur` timestamp NOT NULL,
  `derniere_connexion_utilisateur` timestamp NOT NULL,
  `est_admin` tinyint(1) NOT NULL,
  `est_bailleur` tinyint(1) NOT NULL,
  `est_prestataire` tinyint(1) NOT NULL,
  `est_banni` tinyint(1) NOT NULL,
  `token` char(60) DEFAULT NULL,
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `email` (`email_utilisateur`),
  KEY `langue` (`langue_utilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `pcs_utilisateur`
--

INSERT INTO `pcs_utilisateur` (`id_utilisateur`, `societe_utilisateur`, `SIRET_utilisateur`, `nom_utilisateur`, `prenom_utilisateur`, `naissance_utilisateur`, `adresse_utilisateur`, `cp_utilisateur`, `ville_utilisateur`, `tel_utilisateur`, `email_utilisateur`, `pwd`, `formule_utilisateur`, `langue_utilisateur`, `date_creation_utilisateur`, `date_maj_utilisateur`, `derniere_connexion_utilisateur`, `est_admin`, `est_bailleur`, `est_prestataire`, `est_banni`, `token`) VALUES
(1, NULL, NULL, 'SENTHILNATHAN', 'Kirtika', '1996-01-23', '15 avenue Paul Herbé', '92390', 'Villeneuve la Garenne', '0766516073', 'kirtika.sn@gmail.com', 'kirtika', 0, 1, '2024-04-15 12:43:49', '2024-04-15 12:43:49', '2024-04-15 12:43:49', 1, 1, 0, 0, NULL);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `pcs_avis`
--
ALTER TABLE `pcs_avis`
  ADD CONSTRAINT `pcs_avis_ibfk_1` FOREIGN KEY (`reservation`) REFERENCES `pcs_reservation` (`id_reservation`);

--
-- Contraintes pour la table `pcs_bien`
--
ALTER TABLE `pcs_bien`
  ADD CONSTRAINT `pcs_bien_ibfk_1` FOREIGN KEY (`bailleur`) REFERENCES `pcs_utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `pcs_bien_ibfk_2` FOREIGN KEY (`agence_principale_bien`) REFERENCES `pcs_agence` (`id_agence`);

--
-- Contraintes pour la table `pcs_bien_enregistre`
--
ALTER TABLE `pcs_bien_enregistre`
  ADD CONSTRAINT `pcs_bien_enregistre_ibfk_1` FOREIGN KEY (`utilisateur_enregistre`) REFERENCES `pcs_utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `pcs_bien_enregistre_ibfk_2` FOREIGN KEY (`bien_enregistre`) REFERENCES `pcs_bien` (`id_bien`);

--
-- Contraintes pour la table `pcs_bien_possede`
--
ALTER TABLE `pcs_bien_possede`
  ADD CONSTRAINT `pcs_bien_possede_ibfk_1` FOREIGN KEY (`bien_equipe`) REFERENCES `pcs_bien` (`id_bien`),
  ADD CONSTRAINT `pcs_bien_possede_ibfk_2` FOREIGN KEY (`equipement_contenu`) REFERENCES `pcs_equipement` (`id_equipement`);

--
-- Contraintes pour la table `pcs_commente`
--
ALTER TABLE `pcs_commente`
  ADD CONSTRAINT `pcs_commente_ibfk_1` FOREIGN KEY (`avis_commentaire`) REFERENCES `pcs_avis` (`id_avis`),
  ADD CONSTRAINT `pcs_commente_ibfk_2` FOREIGN KEY (`utilisateur_commentaire`) REFERENCES `pcs_utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `pcs_contrat`
--
ALTER TABLE `pcs_contrat`
  ADD CONSTRAINT `pcs_contrat_ibfk_1` FOREIGN KEY (`devis_contrat`) REFERENCES `pcs_devis` (`id_devis`),
  ADD CONSTRAINT `pcs_contrat_ibfk_2` FOREIGN KEY (`bien_contrat`) REFERENCES `pcs_bien` (`id_bien`),
  ADD CONSTRAINT `pcs_contrat_ibfk_3` FOREIGN KEY (`service_contrat`) REFERENCES `pcs_service` (`id_service`);

--
-- Contraintes pour la table `pcs_devis`
--
ALTER TABLE `pcs_devis`
  ADD CONSTRAINT `pcs_devis_ibfk_1` FOREIGN KEY (`utilisateur_devis`) REFERENCES `pcs_utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `pcs_edl`
--
ALTER TABLE `pcs_edl`
  ADD CONSTRAINT `pcs_edl_ibfk_1` FOREIGN KEY (`réservation_edl`) REFERENCES `pcs_reservation` (`id_reservation`);

--
-- Contraintes pour la table `pcs_est_habilite`
--
ALTER TABLE `pcs_est_habilite`
  ADD CONSTRAINT `pcs_est_habilite_ibfk_1` FOREIGN KEY (`utilisateur_habilite`) REFERENCES `pcs_utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `pcs_est_habilite_ibfk_2` FOREIGN KEY (`habilitation`) REFERENCES `pcs_habilitation` (`id_habilitation`);

--
-- Contraintes pour la table `pcs_habilitation_necessaire`
--
ALTER TABLE `pcs_habilitation_necessaire`
  ADD CONSTRAINT `pcs_habilitation_necessaire_ibfk_1` FOREIGN KEY (`habilitation`) REFERENCES `pcs_habilitation` (`id_habilitation`),
  ADD CONSTRAINT `pcs_habilitation_necessaire_ibfk_2` FOREIGN KEY (`service`) REFERENCES `pcs_service` (`id_service`);

--
-- Contraintes pour la table `pcs_intervient`
--
ALTER TABLE `pcs_intervient`
  ADD CONSTRAINT `pcs_intervient_ibfk_1` FOREIGN KEY (`prestataire`) REFERENCES `pcs_utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `pcs_intervient_ibfk_2` FOREIGN KEY (`bien_intervention`) REFERENCES `pcs_bien` (`id_bien`);

--
-- Contraintes pour la table `pcs_message`
--
ALTER TABLE `pcs_message`
  ADD CONSTRAINT `pcs_message_ibfk_1` FOREIGN KEY (`expediteur_message`) REFERENCES `pcs_utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `pcs_message_ibfk_2` FOREIGN KEY (`destinataire_message`) REFERENCES `pcs_utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `pcs_paiement`
--
ALTER TABLE `pcs_paiement`
  ADD CONSTRAINT `pcs_paiement_ibfk_1` FOREIGN KEY (`emetteur_paiement`) REFERENCES `pcs_utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `pcs_paiement_ibfk_2` FOREIGN KEY (`bénéficiaire_paiement`) REFERENCES `pcs_utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `pcs_paiement_ibfk_3` FOREIGN KEY (`reservation_paye`) REFERENCES `pcs_reservation` (`id_reservation`);

--
-- Contraintes pour la table `pcs_photo`
--
ALTER TABLE `pcs_photo`
  ADD CONSTRAINT `pcs_photo_ibfk_1` FOREIGN KEY (`piece_photo`) REFERENCES `pcs_piece` (`id_piece`);

--
-- Contraintes pour la table `pcs_piece`
--
ALTER TABLE `pcs_piece`
  ADD CONSTRAINT `pcs_piece_ibfk_1` FOREIGN KEY (`bien_piece`) REFERENCES `pcs_bien` (`id_bien`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `pcs_piece_ibfk_2` FOREIGN KEY (`type_piece`) REFERENCES `pcs_type_piece` (`id_type_piece`);

--
-- Contraintes pour la table `pcs_reservation`
--
ALTER TABLE `pcs_reservation`
  ADD CONSTRAINT `pcs_reservation_ibfk_1` FOREIGN KEY (`utilisateur_reservation`) REFERENCES `pcs_utilisateur` (`id_utilisateur`),
  ADD CONSTRAINT `pcs_reservation_ibfk_2` FOREIGN KEY (`facture_reservation`) REFERENCES `pcs_facture` (`id_facture`),
  ADD CONSTRAINT `pcs_reservation_ibfk_3` FOREIGN KEY (`bien_reserve`) REFERENCES `pcs_bien` (`id_bien`);

--
-- Contraintes pour la table `pcs_service`
--
ALTER TABLE `pcs_service`
  ADD CONSTRAINT `pcs_service_ibfk_1` FOREIGN KEY (`type_service`) REFERENCES `pcs_type_service` (`id_type_service`),
  ADD CONSTRAINT `pcs_service_ibfk_2` FOREIGN KEY (`prestataire`) REFERENCES `pcs_utilisateur` (`id_utilisateur`);

--
-- Contraintes pour la table `pcs_service_reserve`
--
ALTER TABLE `pcs_service_reserve`
  ADD CONSTRAINT `pcs_service_reserve_ibfk_1` FOREIGN KEY (`reservation`) REFERENCES `pcs_reservation` (`id_reservation`),
  ADD CONSTRAINT `pcs_service_reserve_ibfk_2` FOREIGN KEY (`service_reserve`) REFERENCES `pcs_service` (`id_service`);

--
-- Contraintes pour la table `pcs_service_souscrit`
--
ALTER TABLE `pcs_service_souscrit`
  ADD CONSTRAINT `pcs_service_souscrit_ibfk_1` FOREIGN KEY (`bien_souscripteur`) REFERENCES `pcs_bien` (`id_bien`),
  ADD CONSTRAINT `pcs_service_souscrit_ibfk_2` FOREIGN KEY (`service_souscrit`) REFERENCES `pcs_service` (`id_service`);

--
-- Contraintes pour la table `pcs_utilisateur`
--
ALTER TABLE `pcs_utilisateur`
  ADD CONSTRAINT `pcs_utilisateur_ibfk_1` FOREIGN KEY (`langue_utilisateur`) REFERENCES `pcs_langue` (`id_langue`);
COMMIT;

--
-- Modification des données de la table `pcs_bien`
--
ALTER TABLE pcs_bien
ADD COLUMN nb_max_personnes INT NOT NULL,
ADD COLUMN heure_arrivee TIME NOT NULL,
ADD COLUMN heure_depart TIME NOT NULL,
ADD COLUMN information_supplementaire TEXT;

--
-- Modification des données de la table `pcs_utilisateur` token VARCHAR(255)
--
ALTER TABLE pcs_bien
MODIFY COLUMN token VARCHAR(255);


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
