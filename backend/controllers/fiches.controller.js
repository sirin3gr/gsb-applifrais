// --- CRUD ---

const { fiches, tarifs } = require("../data/fiches");

const totalFiche = (f) =>
  f.lignes.reduce((somme, ligne) => somme + ligne.quantite * tarifs[ligne.type], 0);

const SUIVANT = { CR: "CL", CL: "VA", VA: "MP", MP: "RB" };

const avancerEtat = (req, res, etatVoulu) => {
  const f = fiches.find(f => f.id === Number(req.params.id));
  if (!f) return res.status(404).json({ erreur: "Fiche introuvable" });
  if (SUIVANT[f.etat] !== etatVoulu)
    return res.status(400).json({ erreur: `Transition ${f.etat} → ${etatVoulu} interdite` });
  f.etat = etatVoulu;
  res.json(f);
};

exports.cloturer = (req, res) => avancerEtat(req, res, "CL");
exports.valider = (req, res) => avancerEtat(req, res, "VA");
exports.payer =(req, res) => avancerEtat(req, res, "MP");

// R - LISTER (READ ALL)
// Renvoie toutes les fiches
exports.lister = (req, res) => {
  let resultat = fiches;  //on part de toutes les fiches 
  
  if (req.query.etat) {
    resultat = resultat.filter(f => f.etat === req.query.etat);
  }
  if (req.query.visiteur) {
    resultat = resultat.filter(f => f.visiteur === req.query.visiteur);
  }

  res.json(resultat.map((f) => ({ ...f, total: totalFiche(f) })));
};

// STATS : un résumé de toutes les fiches 
exports.stats = (req, res) => {
  const totalCumule = fiches.reduce((s, f) => s + totalFiche(f), 0);
  res.json({ nombre: fiches.length, totalCumule });
};

// R - LIRE UNE FICHE (READ ONE)
// Renvoie une fiche précise grâce à son id, ou une erreur 404 si elle n'existe pas
exports.lire = (req, res) => {
  const f = fiches.find((f) => f.id === Number(req.params.id));
  
  if (!f) { 
    return res.status(404).json({ erreur: "Fiche introuvable" });
  }

  res.json({ ...f, total: totalFiche(f) });
};

// C - CRÉER (CREATE)
exports.creer = (req, res) => {
  const { visiteur, mois } = req.body;

  if (!visiteur || !mois) {
    return res.status(400).json({ erreur: "visiteur et mois sont obligatoires" });
  }

  const id = fiches.length
    ? Math.max(...fiches.map((f) => f.id)) + 1
    : 1;

  // On prépare l'objet de la nouvelle fiche
  const f = {
    id,
    visiteur,
    mois,
    etat: "CR",
    lignes: []
  };

  // On ajoute la fiche au tableau des fiches
  fiches.push(f);

  // On renvoie au client la fiche créée
  res.status(201).json(f);
};

// AJOUTER UNE LIGNE DE FRAIS
exports.ajouterLigne = (req, res) => {
  const f = fiches.find((f) => f.id === Number(req.params.id));
  if (!f) {
    return res.status(404).json({ erreur: "Fiche introuvable" });
  }

  const { type, quantite } = req.body;

  if (!tarifs[type]) {
    return res.status(400).json({ erreur: "Type de frais inconnu (KM, EF, NUI, REP)" });
  }

  if (typeof quantite !== "number" || quantite <= 0) {
    return res.status(400).json({ erreur: "Quantité invalide" });
  }

  f.lignes.push({ type, quantite });
  res.status(201).json({ ...f, total: totalFiche(f) });
};

// U - MODIFIER (UPDATE)
exports.modifier = (req, res) => {
  // Recherche la fiche à modifier avec l'id présent dans l'URL
  const f = fiches.find((f) => f.id === Number(req.params.id));

  // Si aucune fiche ne correspond, on répond avec une erreur 404
  if (!f) {
    return res.status(404).json({ erreur: "Fiche introuvable" });
  }

  // Si la fiche existe, on recopie les données envoyées par le client
  Object.assign(f, req.body);

  // On renvoie la fiche après sa modification
  res.json(f);
};

// D - SUPPRIMER (DELETE)
exports.supprimer = (req, res) => {
  // findIndex cherche la position de la fiche dans le tableau
  const i = fiches.findIndex((f) => f.id === Number(req.params.id));

  if (i === -1) {
    return res.status(404).json({ erreur: "Fiche introuvable" });
  }

  // Supprime une fiche directement du tableau
  fiches.splice(i, 1);

  // Indique que la suppression a réussi, sans corps de réponse
  res.status(204).end();
};

// SUPPRIMER UNE LIGNE DE FRAIS
// BONUS E : retire une seule ligne d'une fiche, repérée par sa position (index)
exports.supprimerLigne = (req, res) => {
  // la fiche est retrouvée avec son id dans l'URL
  const f = fiches.find((f) => f.id === Number(req.params.id));
  if (!f) {
    return res.status(404).json({ erreur: "Fiche introuvable" });
  }

  // req.params.index est la 2ème partie dynamique de l'URL
  // on la convertit en nombre pour pouvoir comparer des positions 
  const index = Number(req.params.index);

  // on vérifie que cette position existe vraiment dans le tableau lignes. 
  // un tableau de 2 lignes a les positions valides 0 et 1, un index négatif ou trop grand n'existe pas 
  if (index < 0 || index >= f.lignes.length) {
    return res.status(404).json({ erreur: "Ligne introuvable" });
  }

  // splice retire 1 élément à la position "index", en modifiant le tableau en place
  f.lignes.splice(index, 1);

  // on renvoie la fiche à jour, avec son total recalculé puisqu'une ligne a disparu
  res.json({ ...f, total: totalFiche(f) });
};