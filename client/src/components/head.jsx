import React from "react";
import { Helmet } from 'react-helmet';

function Head() {
    return (
            <>
            <Helmet>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>Paris Caretaker Services | Expérience de location saisonnière exceptionnelle</title>
            <meta name="description" content="Que vous recherchiez un hébergement confortable ou que vous souhaitiez bénéficier de services sur mesure, PCS est là pour simplifier chaque étape de votre séjour. Explorez notre conciergerie pour les bailleurs et découvrez notre réseau de prestataires pour des services en un clic." />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous" />
            <link rel="stylesheet" href="../style.css" />
            <link rel="icon" href="../assets/favicon.ico" type="image/x-icon" />
            </Helmet>
            </>
    );
}

export default Head;
