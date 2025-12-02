// ===============================================
//   CONFIGURATION WEGLOT (clé + langues)
// ===============================================
Weglot.initialize({
  api_key: "LA_CLE_ICI",        // <-- Mettre la clé
  originalLanguage: "fr",
  destinationLanguages: ["en", "it"]
});

// ===============================================
//   FONCTION POUR CHANGER DE LANGUE VIA LE RUBAN
// ===============================================
function changeLang(lang) {
  Weglot.switchTo(lang);
}
