
/*
----------------------------------------------------------------------
-- Insertion de données de test
----------------------------------------------------------------------


--
-- Insertion des données de la table `pcs_agence`
--
*/

INSERT INTO `pcs_agence` (`id_agence`, `responsable_agence`, `adresse_agence`, `cp_agence`, `ville_agence`, `tel_agence`, `email_agence`, `boite_cle`) VALUES
(1, 'Jean DUPONT', '23 rue Montorgueil', '75002', 'PARIS', '0123456789', 'montorgueil@caretakerservices-paris.fr', 1),
(2, 'Nicolas DUPUIS', '24 rue du Pont Neuf', '75001', 'PARIS', '0123456790', 'pont-neuf@caretakerservices-paris.fr', 0);

/*
--
-- Insertion des données de la table `pcs_utilisateur`
--
-- mdp = a
-- email = k@s.com*/
INSERT INTO `pcs_utilisateur`
(`id_utilisateur`, `societe_utilisateur`, `SIRET_utilisateur`, `nom_utilisateur`, `prenom_utilisateur`, `naissance_utilisateur`, `adresse_utilisateur`, `cp_utilisateur`, `ville_utilisateur`, `tel_utilisateur`, `email_utilisateur`, `pwd`, `formule_utilisateur`, `langue_utilisateur`, `date_creation_utilisateur`, `date_maj_utilisateur`, `derniere_connexion_utilisateur`, `est_admin`, `est_bailleur`, `est_prestataire`, `est_banni`, `token`) VALUES
(2, NULL, NULL, 'SENTHILNATHAN', 'Kirtika', '1996-01-23', '15 avenue Paul Herbé', '92390', 'Villeneuve la Garenne', '0766516073', 'k@s.com', '$2a$10$YYY.pEY4t1ZzG4Q2LMMdHOlyLpiUZ1RnEZzKiPTfxsYME/lT7AJy6', 0, 1, '2024-04-15 12:43:49', '2024-04-15 12:43:49', '2024-04-15 12:43:49', 1, 1, 0, 0, NULL);

/*
--
-- Insertion des données de la table `pcs_type_piece`
--
*/
INSERT INTO `pcs_type_piece` (`id_type_piece`, `nom_type_piece`) VALUES
(1, 'Salon'),
(2, 'Chambre'),
(3, 'Cuisine'),
(4, 'Salle à manger'),
(5, 'Salle d''eau'),
(6, 'Salle de bain'),
(7, 'WC'),
(8, 'Buanderie'),
(9, 'Extérieur');
/*
--
-- Déchargement des données de la table `pcs_equipement`
--
*/
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

/*

--
-- Insertion de biens + photos + pièces
--

-- Biens
-- Insertion de biens
*/
INSERT INTO `pcs_bien` (`id_bien`,`nom_bien`, `statut_bien`, `adresse_bien`, `cp_bien`, `ville_bien`, `type_location_bien`, `capacite_bien`, `surface_bien`, `animal_ok_bien`, `PMR_ok_bien`, `description_bien`, `tarif_bien`, `bailleur`, `agence_principale_bien`,`heure_arrivee`,`heure_depart`) VALUES
(1,'Villa avec vue sur la mer', 1, '5 rue Goury', '77654', 'Villeneuve la Garenne', 'Logement entier', 9, 150.00, 1, 1, 'Villa luxueuse avec vue sur la mer.', 130.00, 2, 1, 0, 0),
(2,'Appartement cosy', 1, '10 rue des Lilas', '75000', 'Paris', 'Appartement', 4, 60.00, 0, 0, 'Appartement confortable au centre-ville.', 80.00, 2, 1, 0, 0),
(3,'Chalet en montagne', 1, '12 chemin des Neiges', '73000', 'Chambéry', 'Chalet', 6, 120.00, 1, 1, 'Chalet chaleureux au cœur des montagnes.', 150.00, 2, 1, 0, 0),
(4,'Maison de campagne', 0, '8 rue de la Forêt', '45000', 'Orléans', 'Maison', 5, 110.00, 1, 0, 'Maison tranquille entourée de nature.', 100.00, 2, 1, 0, 0),
(5,'Studio moderne', 0, '3 avenue des Champs', '06000', 'Nice', 'Studio', 2, 30.00, 0, 0, 'Studio moderne et bien équipé.', 70.00, 2, 1, 0, 0);
/*
-- Pièces pour chaque bien
-- Villa avec vue sur la mer
*/
INSERT INTO `pcs_piece` (`nom_piece`, `description_piece`, `est_privatif_piece`, `bien_piece`, `surface_piece`, `type_piece`) VALUES
('Salon', 'Salon spacieux avec vue sur la mer.', 1, 1, 50.00, 1),
('Cuisine', 'Cuisine entièrement équipée.', 1, 1, 20.00, 3),
('Chambre double', 'Chambre avec lit double et balcon.', 1, 1, 15.00, 2),
('Salle de bain', 'Salle de bain avec baignoire et douche.', 1, 1, 10.00, 5);
/*Appartement cosy*/
INSERT INTO `pcs_piece` (`nom_piece`, `description_piece`, `est_privatif_piece`, `bien_piece`, `surface_piece`, `type_piece`) VALUES
('Salon', 'Salon cosy et lumineux.', 1, 2, 25.00, 1),
('Cuisine', 'Petite cuisine ouverte.', 1, 2, 10.00, 3),
('Chambre double', 'Chambre avec lit double.', 1, 2, 12.00, 2),
('Salle de bain', 'Salle de bain moderne.', 1, 2, 8.00, 5);

/*-- Chalet en montagne*/
INSERT INTO `pcs_piece` (`nom_piece`, `description_piece`, `est_privatif_piece`, `bien_piece`, `surface_piece`, `type_piece`) VALUES
('Salon', 'Salon avec cheminée.', 1, 3, 40.00, 1),
('Cuisine', 'Cuisine rustique.', 1, 3, 15.00, 3),
('Chambre double', 'Chambre avec vue sur les montagnes.', 1, 3, 20.00, 2),
('Salle de bain', 'Salle de bain avec douche.', 1, 3, 10.00, 5);

/*-- Maison de campagne*/
INSERT INTO `pcs_piece` (`nom_piece`, `description_piece`, `est_privatif_piece`, `bien_piece`, `surface_piece`, `type_piece`) VALUES
('Salon', 'Salon confortable avec cheminée.', 1, 4, 35.00, 1),
('Cuisine', 'Cuisine équipée et spacieuse.', 1, 4, 20.00, 3),
('Chambre double', 'Chambre avec lit double.', 1, 4, 18.00, 2),
('Salle de bain', 'Salle de bain moderne.', 1, 4, 12.00, 5);

/*-- Studio moderne*/
INSERT INTO `pcs_piece` (`nom_piece`, `description_piece`, `est_privatif_piece`, `bien_piece`, `surface_piece`, `type_piece`) VALUES
('Salon', 'Espace salon moderne.', 1, 5, 15.00, 1),
('Cuisine', 'Cuisine ouverte et fonctionnelle.', 1, 5, 8.00, 3),
('Salle de bain', 'Salle de bain avec douche.', 1, 5, 7.00, 5);

/*-- Photos pour chaque pièce*/
/*-- Villa avec vue sur la mer*/
INSERT INTO `pcs_photo` (`nom_photo`, `description_photo`, `chemin_photo`, `piece_photo`, `est_couverture`, `photo_bien_id`) VALUES
('salon1', 'Photo du salon avec vue sur la mer.', '/salon1.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Salon' AND bien_piece = 1), 1, 1),
('cuisine1', 'Photo de la cuisine moderne.', '/cuisine1.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Cuisine' AND bien_piece = 1), 0, 1),
('chambre1', 'Photo de la chambre avec balcon.', '/chambre1.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Chambre double' AND bien_piece = 1), 0, 1),
('sdb1', 'Photo de la salle de bain.', '/sdb1.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Salle de bain' AND bien_piece = 1), 0, 1);

/*-- Appartement cosy*/
INSERT INTO `pcs_photo` (`nom_photo`, `description_photo`, `chemin_photo`, `piece_photo`, `est_couverture`, `photo_bien_id`) VALUES
('salon2', 'Salon cosy et lumineux.', '/salon2.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Salon' AND bien_piece = 2), 1, 2),
('cuisine2', 'Petite cuisine ouverte.', '/cuisine2.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Cuisine' AND bien_piece = 2), 0, 2),
('chambre2', 'Chambre avec lit double.', '/chambre2.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Chambre double' AND bien_piece = 2), 0, 2),
('sdb2', 'Salle de bain moderne.', '/sdb2.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Salle de bain' AND bien_piece = 2), 0, 2);

/*-- Chalet en montagne*/
INSERT INTO `pcs_photo` (`nom_photo`, `description_photo`, `chemin_photo`, `piece_photo`, `est_couverture`, `photo_bien_id`) VALUES
('salon3', 'Salon avec cheminée.', '/salon3.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Salon' AND bien_piece = 3), 1, 3),
('cuisine3', 'Cuisine rustique.', '/cuisine3.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Cuisine' AND bien_piece = 3), 0, 3),
('chambre3', 'Chambre avec vue sur les montagnes.', '/chambre3.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Chambre double' AND bien_piece = 3), 0, 3),
('sdb3', 'Salle de bain avec douche.', '/sdb3.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Salle de bain' AND bien_piece = 3), 0, 3);

/*-- Maison de campagne*/
INSERT INTO `pcs_photo` (`nom_photo`, `description_photo`, `chemin_photo`, `piece_photo`, `est_couverture`, `photo_bien_id`) VALUES
('salon4', 'Salon confortable avec cheminée.', '/salon4.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Salon' AND bien_piece = 4), 1, 4),
('cuisine4', 'Cuisine équipée et spacieuse.', '/cuisine4.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Cuisine' AND bien_piece = 4), 0, 4),
('chambre4', 'Chambre avec lit double.', '/chambre4.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Chambre double' AND bien_piece = 4), 0, 4),
('sdb4', 'Salle de bain moderne.', '/sdb4.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Salle de bain' AND bien_piece = 4), 0, 4);

/*-- Studio moderne*/
INSERT INTO `pcs_photo` (`nom_photo`, `description_photo`, `chemin_photo`, `piece_photo`, `est_couverture`, `photo_bien_id`) VALUES
('salon5', 'Espace salon moderne.', '/salon5.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Salon' AND bien_piece = 5), 1, 5),
('cuisine5', 'Cuisine ouverte et fonctionnelle.', '/cuisine5.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Cuisine' AND bien_piece = 5), 0, 5),
('sdb5', 'Salle de bain avec douche.', '/sdb5.jpg', (SELECT id_piece FROM pcs_piece WHERE nom_piece = 'Salle de bain' AND bien_piece = 5), 0, 5);
--
-- Déchargement des données de la table `pcs_langue`
--

INSERT INTO `pcs_langue` (`id_langue`, `nom_langue`) VALUES
(1, 'Français'),
(2, 'English');
/*
-- 
-- Facture test
-- */
INSERT INTO `pcs_facture` (`id_facture`, `type_facture`, `statut_facture`, `date_facture`) VALUES ('1', 'test', '1', '2024-06-11');
