-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3307
-- Généré le : ven. 12 avr. 2024 à 12:33
-- Version du serveur : 11.2.2-MariaDB
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
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `responsable` varchar(120) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `cp` char(5) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `tel` char(10) NOT NULL,
  `email` varchar(320) NOT NULL,
  `boite_cle` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Déchargement des données de la table `pcs_agence`
--

INSERT INTO `pcs_agence` (`id`, `responsable`, `adresse`, `cp`, `ville`, `tel`, `email`, `boite_cle`) VALUES
(1, 'Jean DUPONT', '23 rue Montorgueil', '75002', 'PARIS', '0123456789', 'montorgueil@caretakerservices-paris.fr', 1),
(2, 'Nicolas DUPUIS', '24 rue du Pont Neuf', '75001', 'PARIS', '0123456790', 'pont-neuf@caretakerservices-paris.fr', 1);

-- --------------------------------------------------------

--
-- Structure de la table `pcs_avis`
--

DROP TABLE IF EXISTS `pcs_avis`;
CREATE TABLE IF NOT EXISTS `pcs_avis` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `note` tinyint(4) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `reservation` smallint(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reservation` (`reservation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_bien`
--

DROP TABLE IF EXISTS `pcs_bien`;
CREATE TABLE IF NOT EXISTS `pcs_bien` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(200) NOT NULL,
  `statut` tinyint(3) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `cp` char(5) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `type_location` varchar(30) NOT NULL,
  `capacite` smallint(5) UNSIGNED NOT NULL,
  `surface` decimal(10,2) UNSIGNED NOT NULL,
  `animal_ok` tinyint(1) NOT NULL,
  `PMR_ok` tinyint(1) NOT NULL,
  `description` text NOT NULL,
  `tarif` decimal(10,2) UNSIGNED NOT NULL,
  `utilisateur` smallint(10) UNSIGNED NOT NULL,
  `agence_principale` smallint(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `utilisateur` (`utilisateur`),
  KEY `agence_principale` (`agence_principale`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_bien_enregistre`
--

DROP TABLE IF EXISTS `pcs_bien_enregistre`;
CREATE TABLE IF NOT EXISTS `pcs_bien_enregistre` (
  `utilisateur` smallint(10) UNSIGNED NOT NULL,
  `bien` smallint(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`utilisateur`,`bien`),
  KEY `utilisateur` (`utilisateur`),
  KEY `bien` (`bien`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_bien_possede`
--

DROP TABLE IF EXISTS `pcs_bien_possede`;
CREATE TABLE IF NOT EXISTS `pcs_bien_possede` (
  `bien` smallint(10) UNSIGNED NOT NULL,
  `equipement` smallint(10) UNSIGNED NOT NULL,
  `quantite` smallint(5) UNSIGNED NOT NULL,
  PRIMARY KEY (`bien`,`equipement`),
  KEY `bien` (`bien`),
  KEY `equipement` (`equipement`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_commente`
--

DROP TABLE IF EXISTS `pcs_commente`;
CREATE TABLE IF NOT EXISTS `pcs_commente` (
  `message` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `avis` smallint(10) UNSIGNED NOT NULL,
  `utilisateur` smallint(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`avis`,`utilisateur`),
  KEY `utilisateur` (`utilisateur`),
  KEY `avis` (`avis`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_contrat`
--

DROP TABLE IF EXISTS `pcs_contrat`;
CREATE TABLE IF NOT EXISTS `pcs_contrat` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type_gestion` tinyint(4) NOT NULL,
  `duree` tinyint(4) UNSIGNED NOT NULL,
  `statut` tinyint(4) NOT NULL,
  `devis` smallint(10) UNSIGNED NOT NULL,
  `bien` smallint(10) UNSIGNED NOT NULL,
  `service` smallint(10) UNSIGNED NOT NULL,
  `date_souscription` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `devis_2` (`devis`),
  KEY `devis` (`devis`),
  KEY `bien` (`bien`),
  KEY `service` (`service`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_devis`
--

DROP TABLE IF EXISTS `pcs_devis`;
CREATE TABLE IF NOT EXISTS `pcs_devis` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `statut` tinyint(3) NOT NULL,
  `date` date NOT NULL,
  `type_gestion` tinyint(4) NOT NULL,
  `type_location` tinyint(4) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `cp` char(5) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `capacite` tinyint(8) UNSIGNED NOT NULL,
  `nb_chambre` tinyint(8) UNSIGNED NOT NULL,
  `surface` decimal(10,2) UNSIGNED NOT NULL,
  `utilisateur` smallint(10) UNSIGNED NOT NULL,
  `disponibilite_utilisateur` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `utilisateur` (`utilisateur`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_edl`
--

DROP TABLE IF EXISTS `pcs_edl`;
CREATE TABLE IF NOT EXISTS `pcs_edl` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` tinyint(1) NOT NULL,
  `observation` text NOT NULL,
  `date` date NOT NULL,
  `réservation` smallint(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `réservation` (`réservation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_equipement`
--

DROP TABLE IF EXISTS `pcs_equipement`;
CREATE TABLE IF NOT EXISTS `pcs_equipement` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_est_habilite`
--

DROP TABLE IF EXISTS `pcs_est_habilite`;
CREATE TABLE IF NOT EXISTS `pcs_est_habilite` (
  `utilisateur` smallint(10) UNSIGNED NOT NULL,
  `habilitation` smallint(10) UNSIGNED NOT NULL,
  `date_obtention` date NOT NULL,
  `date_expiration` date DEFAULT NULL,
  PRIMARY KEY (`utilisateur`,`habilitation`),
  KEY `utilisateur` (`utilisateur`),
  KEY `habilitation` (`habilitation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_facture`
--

DROP TABLE IF EXISTS `pcs_facture`;
CREATE TABLE IF NOT EXISTS `pcs_facture` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` tinytext NOT NULL,
  `statut` tinyint(3) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_habilitation`
--

DROP TABLE IF EXISTS `pcs_habilitation`;
CREATE TABLE IF NOT EXISTS `pcs_habilitation` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(120) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_habilitation_necessaire`
--

DROP TABLE IF EXISTS `pcs_habilitation_necessaire`;
CREATE TABLE IF NOT EXISTS `pcs_habilitation_necessaire` (
  `service` smallint(10) UNSIGNED NOT NULL,
  `habilitation` smallint(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`service`,`habilitation`),
  KEY `habilitation` (`habilitation`),
  KEY `service` (`service`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_intervient`
--

DROP TABLE IF EXISTS `pcs_intervient`;
CREATE TABLE IF NOT EXISTS `pcs_intervient` (
  `date_debut` timestamp NOT NULL,
  `date_fin` timestamp NOT NULL,
  `intervenant` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `statut` tinyint(3) NOT NULL,
  `prestataire` smallint(10) UNSIGNED NOT NULL,
  `bien` smallint(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`prestataire`,`bien`),
  KEY `prestataire` (`prestataire`),
  KEY `bien` (`bien`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_langue`
--

DROP TABLE IF EXISTS `pcs_langue`;
CREATE TABLE IF NOT EXISTS `pcs_langue` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_message`
--

DROP TABLE IF EXISTS `pcs_message`;
CREATE TABLE IF NOT EXISTS `pcs_message` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `texte` text NOT NULL,
  `expediteur` smallint(10) UNSIGNED NOT NULL,
  `destinataire` smallint(10) UNSIGNED NOT NULL,
  `date_envoi` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `expediteur` (`expediteur`),
  KEY `destinataire` (`destinataire`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_paiement`
--

DROP TABLE IF EXISTS `pcs_paiement`;
CREATE TABLE IF NOT EXISTS `pcs_paiement` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `mode` varchar(10) NOT NULL,
  `emetteur` smallint(10) UNSIGNED NOT NULL,
  `bénéficiaire` smallint(10) UNSIGNED NOT NULL,
  `date_emission` date DEFAULT NULL,
  `date_reception` date DEFAULT NULL,
  `montant` decimal(10,2) UNSIGNED NOT NULL,
  `reservation` smallint(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `emetteur` (`emetteur`),
  KEY `bénéficiaire` (`bénéficiaire`),
  KEY `reservation` (`reservation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_photo`
--

DROP TABLE IF EXISTS `pcs_photo`;
CREATE TABLE IF NOT EXISTS `pcs_photo` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `chemin` varchar(320) NOT NULL,
  `piece` smallint(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `piece` (`piece`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_piece`
--

DROP TABLE IF EXISTS `pcs_piece`;
CREATE TABLE IF NOT EXISTS `pcs_piece` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `est_privatif` tinyint(1) NOT NULL,
  `bien` smallint(10) UNSIGNED NOT NULL,
  `surface` decimal(10,2) UNSIGNED NOT NULL,
  `type` smallint(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bien` (`bien`),
  KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_reservation`
--

DROP TABLE IF EXISTS `pcs_reservation`;
CREATE TABLE IF NOT EXISTS `pcs_reservation` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `demande_complementaire` text DEFAULT NULL,
  `utilisateur` smallint(10) UNSIGNED NOT NULL,
  `date_reservation` date NOT NULL,
  `facture` smallint(10) UNSIGNED NOT NULL,
  `bien` smallint(10) UNSIGNED NOT NULL,
  `date_debut` date NOT NULL,
  `date_fin` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `utilisateur` (`utilisateur`),
  KEY `facture` (`facture`),
  KEY `bien` (`bien`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_service`
--

DROP TABLE IF EXISTS `pcs_service`;
CREATE TABLE IF NOT EXISTS `pcs_service` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `statut` tinyint(4) NOT NULL,
  `taux_commission` tinyint(8) UNSIGNED NOT NULL,
  `tarif_normal` decimal(10,2) UNSIGNED NOT NULL,
  `tarif_VIP` decimal(10,2) UNSIGNED NOT NULL,
  `type` smallint(10) UNSIGNED NOT NULL,
  `prestataire` smallint(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type` (`type`),
  KEY `prestataire` (`prestataire`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_service_reserve`
--

DROP TABLE IF EXISTS `pcs_service_reserve`;
CREATE TABLE IF NOT EXISTS `pcs_service_reserve` (
  `quantite` smallint(6) NOT NULL,
  `date` date NOT NULL,
  `service` smallint(10) UNSIGNED NOT NULL,
  `reservation` smallint(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`service`,`reservation`),
  KEY `service` (`service`),
  KEY `reservation` (`reservation`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_service_souscrit`
--

DROP TABLE IF EXISTS `pcs_service_souscrit`;
CREATE TABLE IF NOT EXISTS `pcs_service_souscrit` (
  `service` smallint(10) UNSIGNED NOT NULL,
  `bien` smallint(10) UNSIGNED NOT NULL,
  `duree` tinyint(4) UNSIGNED NOT NULL,
  PRIMARY KEY (`service`,`bien`),
  KEY `service` (`service`),
  KEY `bien` (`bien`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_type_piece`
--

DROP TABLE IF EXISTS `pcs_type_piece`;
CREATE TABLE IF NOT EXISTS `pcs_type_piece` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_type_service`
--

DROP TABLE IF EXISTS `pcs_type_service`;
CREATE TABLE IF NOT EXISTS `pcs_type_service` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pcs_utilisateur`
--

DROP TABLE IF EXISTS `pcs_utilisateur`;
CREATE TABLE IF NOT EXISTS `pcs_utilisateur` (
  `id` smallint(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `societe` varchar(120) DEFAULT NULL,
  `SIRET` char(14) DEFAULT NULL,
  `nom` varchar(120) NOT NULL,
  `prenom` varchar(120) NOT NULL,
  `naissance` date NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `cp` char(5) NOT NULL,
  `ville` varchar(100) NOT NULL,
  `tel` char(10) NOT NULL,
  `email` varchar(320) NOT NULL,
  `pwd` varchar(64) NOT NULL,
  `formule` tinyint(2) NOT NULL,
  `langue` smallint(10) UNSIGNED NOT NULL,
  `date_creation` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_maj` timestamp NOT NULL,
  `derniere_connexion` timestamp NOT NULL,
  `est_admin` tinyint(1) NOT NULL,
  `est_bailleur` tinyint(1) NOT NULL,
  `est_prestataire` tinyint(1) NOT NULL,
  `est_banni` tinyint(1) NOT NULL,
  `token` char(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `langue` (`langue`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `pcs_avis`
--
ALTER TABLE `pcs_avis`
  ADD CONSTRAINT `pcs_avis_ibfk_1` FOREIGN KEY (`reservation`) REFERENCES `pcs_reservation` (`id`);

--
-- Contraintes pour la table `pcs_bien`
--
ALTER TABLE `pcs_bien`
  ADD CONSTRAINT `pcs_bien_ibfk_1` FOREIGN KEY (`utilisateur`) REFERENCES `pcs_utilisateur` (`id`),
  ADD CONSTRAINT `pcs_bien_ibfk_2` FOREIGN KEY (`agence_principale`) REFERENCES `pcs_agence` (`id`);

--
-- Contraintes pour la table `pcs_bien_enregistre`
--
ALTER TABLE `pcs_bien_enregistre`
  ADD CONSTRAINT `pcs_bien_enregistre_ibfk_1` FOREIGN KEY (`utilisateur`) REFERENCES `pcs_utilisateur` (`id`),
  ADD CONSTRAINT `pcs_bien_enregistre_ibfk_2` FOREIGN KEY (`bien`) REFERENCES `pcs_bien` (`id`);

--
-- Contraintes pour la table `pcs_bien_possede`
--
ALTER TABLE `pcs_bien_possede`
  ADD CONSTRAINT `pcs_bien_possede_ibfk_1` FOREIGN KEY (`bien`) REFERENCES `pcs_bien` (`id`),
  ADD CONSTRAINT `pcs_bien_possede_ibfk_2` FOREIGN KEY (`equipement`) REFERENCES `pcs_equipement` (`id`);

--
-- Contraintes pour la table `pcs_commente`
--
ALTER TABLE `pcs_commente`
  ADD CONSTRAINT `pcs_commente_ibfk_1` FOREIGN KEY (`avis`) REFERENCES `pcs_avis` (`id`),
  ADD CONSTRAINT `pcs_commente_ibfk_2` FOREIGN KEY (`utilisateur`) REFERENCES `pcs_utilisateur` (`id`);

--
-- Contraintes pour la table `pcs_contrat`
--
ALTER TABLE `pcs_contrat`
  ADD CONSTRAINT `pcs_contrat_ibfk_1` FOREIGN KEY (`devis`) REFERENCES `pcs_devis` (`id`),
  ADD CONSTRAINT `pcs_contrat_ibfk_2` FOREIGN KEY (`bien`) REFERENCES `pcs_bien` (`id`),
  ADD CONSTRAINT `pcs_contrat_ibfk_3` FOREIGN KEY (`service`) REFERENCES `pcs_service` (`id`);

--
-- Contraintes pour la table `pcs_devis`
--
ALTER TABLE `pcs_devis`
  ADD CONSTRAINT `pcs_devis_ibfk_1` FOREIGN KEY (`utilisateur`) REFERENCES `pcs_utilisateur` (`id`);

--
-- Contraintes pour la table `pcs_edl`
--
ALTER TABLE `pcs_edl`
  ADD CONSTRAINT `pcs_edl_ibfk_1` FOREIGN KEY (`réservation`) REFERENCES `pcs_reservation` (`id`);

--
-- Contraintes pour la table `pcs_est_habilite`
--
ALTER TABLE `pcs_est_habilite`
  ADD CONSTRAINT `pcs_est_habilite_ibfk_1` FOREIGN KEY (`utilisateur`) REFERENCES `pcs_utilisateur` (`id`),
  ADD CONSTRAINT `pcs_est_habilite_ibfk_2` FOREIGN KEY (`habilitation`) REFERENCES `pcs_habilitation` (`id`);

--
-- Contraintes pour la table `pcs_habilitation_necessaire`
--
ALTER TABLE `pcs_habilitation_necessaire`
  ADD CONSTRAINT `pcs_habilitation_necessaire_ibfk_1` FOREIGN KEY (`habilitation`) REFERENCES `pcs_habilitation` (`id`),
  ADD CONSTRAINT `pcs_habilitation_necessaire_ibfk_2` FOREIGN KEY (`service`) REFERENCES `pcs_service` (`id`);

--
-- Contraintes pour la table `pcs_intervient`
--
ALTER TABLE `pcs_intervient`
  ADD CONSTRAINT `pcs_intervient_ibfk_1` FOREIGN KEY (`prestataire`) REFERENCES `pcs_utilisateur` (`id`),
  ADD CONSTRAINT `pcs_intervient_ibfk_2` FOREIGN KEY (`bien`) REFERENCES `pcs_bien` (`id`);

--
-- Contraintes pour la table `pcs_message`
--
ALTER TABLE `pcs_message`
  ADD CONSTRAINT `pcs_message_ibfk_1` FOREIGN KEY (`expediteur`) REFERENCES `pcs_utilisateur` (`id`),
  ADD CONSTRAINT `pcs_message_ibfk_2` FOREIGN KEY (`destinataire`) REFERENCES `pcs_utilisateur` (`id`);

--
-- Contraintes pour la table `pcs_paiement`
--
ALTER TABLE `pcs_paiement`
  ADD CONSTRAINT `pcs_paiement_ibfk_1` FOREIGN KEY (`emetteur`) REFERENCES `pcs_utilisateur` (`id`),
  ADD CONSTRAINT `pcs_paiement_ibfk_2` FOREIGN KEY (`bénéficiaire`) REFERENCES `pcs_utilisateur` (`id`),
  ADD CONSTRAINT `pcs_paiement_ibfk_3` FOREIGN KEY (`reservation`) REFERENCES `pcs_reservation` (`id`);

--
-- Contraintes pour la table `pcs_photo`
--
ALTER TABLE `pcs_photo`
  ADD CONSTRAINT `pcs_photo_ibfk_1` FOREIGN KEY (`piece`) REFERENCES `pcs_piece` (`id`);

--
-- Contraintes pour la table `pcs_piece`
--
ALTER TABLE `pcs_piece`
  ADD CONSTRAINT `pcs_piece_ibfk_1` FOREIGN KEY (`bien`) REFERENCES `pcs_bien` (`id`),
  ADD CONSTRAINT `pcs_piece_ibfk_2` FOREIGN KEY (`type`) REFERENCES `pcs_type_piece` (`id`);

--
-- Contraintes pour la table `pcs_reservation`
--
ALTER TABLE `pcs_reservation`
  ADD CONSTRAINT `pcs_reservation_ibfk_1` FOREIGN KEY (`utilisateur`) REFERENCES `pcs_utilisateur` (`id`),
  ADD CONSTRAINT `pcs_reservation_ibfk_2` FOREIGN KEY (`facture`) REFERENCES `pcs_facture` (`id`),
  ADD CONSTRAINT `pcs_reservation_ibfk_3` FOREIGN KEY (`bien`) REFERENCES `pcs_bien` (`id`);

--
-- Contraintes pour la table `pcs_service`
--
ALTER TABLE `pcs_service`
  ADD CONSTRAINT `pcs_service_ibfk_1` FOREIGN KEY (`type`) REFERENCES `pcs_type_service` (`id`),
  ADD CONSTRAINT `pcs_service_ibfk_2` FOREIGN KEY (`prestataire`) REFERENCES `pcs_utilisateur` (`id`);

--
-- Contraintes pour la table `pcs_service_reserve`
--
ALTER TABLE `pcs_service_reserve`
  ADD CONSTRAINT `pcs_service_reserve_ibfk_1` FOREIGN KEY (`reservation`) REFERENCES `pcs_reservation` (`id`),
  ADD CONSTRAINT `pcs_service_reserve_ibfk_2` FOREIGN KEY (`service`) REFERENCES `pcs_service` (`id`);

--
-- Contraintes pour la table `pcs_service_souscrit`
--
ALTER TABLE `pcs_service_souscrit`
  ADD CONSTRAINT `pcs_service_souscrit_ibfk_1` FOREIGN KEY (`bien`) REFERENCES `pcs_bien` (`id`),
  ADD CONSTRAINT `pcs_service_souscrit_ibfk_2` FOREIGN KEY (`service`) REFERENCES `pcs_service` (`id`);

--
-- Contraintes pour la table `pcs_utilisateur`
--
ALTER TABLE `pcs_utilisateur`
  ADD CONSTRAINT `pcs_utilisateur_ibfk_1` FOREIGN KEY (`langue`) REFERENCES `pcs_langue` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
