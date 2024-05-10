const connection = require('./../db-connection');
const bcrypt = require('bcryptjs');

// Fonction pour créer un utilisateur avec hachage bcrypt
async function createUser(userData) {
    const {
        lastName: nom_utilisateur,
        firstName: prenom_utilisateur,
        birthdate: naissance_utilisateur,
        address: adresse_utilisateur,
        postalCode: cp_utilisateur,
        city: ville_utilisateur,
        email: email_utilisateur,
        password,
        siret: SIRET_utilisateur,
        phoneNumber: tel_utilisateur,
        role,
        company: societe_utilisateur
    } = userData;


    let est_bailleur = 0, est_prestataire = 0;

    if (role === 'landlord') {
        est_bailleur = 1;
    } else if (role === 'serviceProvider') {
        est_prestataire = 1;
    }


    const saltRounds = 10;

    try {

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const query = `
            INSERT INTO pcs_utilisateur (
                societe_utilisateur,
                SIRET_utilisateur,
                nom_utilisateur,
                prenom_utilisateur,
                naissance_utilisateur,
                adresse_utilisateur,
                cp_utilisateur,
                ville_utilisateur,
                tel_utilisateur,
                email_utilisateur,
                pwd,
                formule_utilisateur,
                langue_utilisateur,
                date_creation_utilisateur,
                date_maj_utilisateur,
                derniere_connexion_utilisateur,
                est_admin,
                est_bailleur,
                est_prestataire,
                est_banni,
                token
            ) VALUES (societe_utilisateur, SIRET_utilisateur, nom_utilisateur, prenom_utilisateur, naissance_utilisateur, adresse_utilisateur, cp_utilisateur, ville_utilisateur, tel_utilisateur, email_utilisateur, pwd, '1', 'Français', NOW(), NOW(), NOW(), '0', est_bailleur, est_prestataire, '0', NULL;
        `;
        const values = [
            societe_utilisateur,
            SIRET_utilisateur,
            nom_utilisateur,
            prenom_utilisateur,
            naissance_utilisateur,
            adresse_utilisateur,
            cp_utilisateur,
            ville_utilisateur,
            tel_utilisateur,
            email_utilisateur,
            hashedPassword,
            est_bailleur,
            est_prestataire
        ];

        // Exécuter la requête
        const [result] = await connection.execute(query, values);
        return result;
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        throw error;
    }
}

module.exports = { createUser };
