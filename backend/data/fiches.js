// Tarifs unitaires des frais forfaitisés GSB
const tarifs = { KM: 0.62, EF: 110, NUI: 80, REP: 25 };

// Jeu de données temporaire
let fiches = [
  { id: 1, visiteur: "Bunisset", mois: "mai", etat: "CR", lignes: [
      { type: "REP", quantite: 3 },
      { type: "KM", quantite: 120 }
    ]},
    { id: 2, visiteur: "Cottet", mois: "mai", etat: "CL",lignes: [
      { type: "NUI", quantite: 2 },
      { type: "EF", quantite: 1 },
    ]},
];

// Exportation des données
module.exports = { fiches, tarifs };