const express = require("express")
const port = process.env.PORT || 5000

const app = express();

app.get("/", (req,res) => {
    res.status(200).send("Page non trouvé");
})

app.listen(port, () => {
    console.log("Serveur en ligne");
})


// home / ou vide : get
// user : get / get 1 / post 1/ delete 1 / patch 1
// bien : get / get 1 /post 1/ delete 1 / patch 1
// service : get / get 1 / post 1/ delete 1 / patch 1
// agence : get / get 1 / post 1/ delete 1 / patch 1
// avis : get / get 1 / post 1/ delete 1 / patch 1
// commentaire: : get / get 1 / post 1/ delete 1 / patch 1
// contrat: : get / get 1 / post 1/ delete 1 / patch 1
// devis: : get / get 1 / post 1/ delete 1 / patch 1
// edl: : get / get 1 / post 1/ delete 1 / patch 1
// equipement: : get / get 1 / post 1/ delete 1 / patch 1
// habilitation; : get / get 1 / post 1/ delete 1 / patch 1
// facture: : get / get 1 / post 1/ delete 1 / patch 1
// langue:get / get 1 / post 1/ delete 1 / patch 1
// photo ;get / get 1 / post 1/ delete 1 / patch 1
// Piece:get / get 1 / post 1/ delete 1 / patch 1
// reservation:get / get 1 / post 1/ delete 1 / patch 1
// typesrv:get / get 1 / post 1/ delete 1 / patch 1
// all :


// code :
// 200 : succès de la requête ;
// 301 et 302 : redirection, respectivement permanente et temporaire ;
// 401 : utilisateur non authentifié ;
// 403 : accès refusé ;
// 404 : ressource non trouvée ;
// 500, 502 et 503 : erreurs serveur ;
// 504 : le serveur n'a pas répondu.
