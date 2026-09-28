const express = require ("express"); // permet d'utiliser Express dans le fichier 
const router = express.Router(); // crée un mini routeur indépendant
const ctrl = require("../controllers/fiches.controller"); //importer le contrôleur

// relier les routes aux fonctions 
router.get("/stats", ctrl.stats); 
router.get("/", ctrl.lister); 
router.get("/:id", ctrl.lire); 
router.post("/", ctrl.creer);
router.put("/:id", ctrl.modifier);
router.delete("/:id", ctrl.supprimer);
router.put("/:id/cloturer", ctrl.cloturer);
router.put("/:id/valider", ctrl.valider);
router.put("/:id/payer", ctrl.payer);
router.post("/:id/lignes", ctrl.ajouterLigne);
router.delete("/:id/lignes/:index", ctrl.supprimerLigne);

module.exports = router; // exporter le routeur, permet à server.js de récupérer ce routeur