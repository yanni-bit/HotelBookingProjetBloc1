/**
 * ==========================================================
 * DYSLEXIE.JS - Gestion de la police OpenDyslexic
 * ==========================================================
 * 
 * @file Gère l'activation/désactivation de la police adaptée aux personnes dyslexiques
 * @author Book Your Travel
 * @version 1.0.0
 * @date 2024
 * 
 * @description
 * Ce module implémente le critère d'accessibilité WCAG Cr 1.c.2 en permettant
 * aux utilisateurs dyslexiques d'activer une police spécialement conçue pour
 * faciliter la lecture (OpenDyslexic). La préférence de l'utilisateur est
 * sauvegardée en localStorage pour persister entre les sessions.
 * 
 * Fonctionnalités :
 * - Toggle de la police dyslexie via bouton dans le header
 * - Sauvegarde de la préférence utilisateur (localStorage)
 * - Restauration automatique de la préférence au chargement de la page
 * - Mise à jour visuelle du bouton (état actif/inactif)
 * - Attributs ARIA pour accessibilité (aria-pressed)
 * - Support navigation clavier (focus-visible)
 * 
 * Critère WCAG : Cr 1.c.2 - Police spécifique pour personnes dyslexiques
 * 
 * Dépendances :
 * - base.css : Définit les classes .dyslexie-mode et --font-dyslexique
 * - accessibilite.css : Style du bouton #toggle-dyslexie
 * - HTML : Bouton avec id="toggle-dyslexie" dans le header
 * 
 * @example
 * <!-- HTML requis dans le header -->
 * <button 
 *   id="toggle-dyslexie" 
 *   class="btn btn-outline-secondary btn-sm"
 *   aria-label="Activer la police adaptée aux personnes dyslexiques"
 *   aria-pressed="false"
 * >
 *   <i class="bi bi-universal-access"></i>
 *   <span class="btn-text">Dyslexie</span>
 * </button>
 */


/* ==========================================================
   CONSTANTES DE CONFIGURATION
   ========================================================== */

/**
 * Clé utilisée pour stocker la préférence dyslexie dans localStorage
 * @constant {string}
 */
const STORAGE_KEY = 'dyslexie-mode';

/**
 * Classe CSS appliquée sur le body pour activer la police dyslexie
 * @constant {string}
 */
const DYSLEXIE_CLASS = 'dyslexie-mode';

/**
 * Classe CSS appliquée sur le bouton quand le mode est actif
 * @constant {string}
 */
const BUTTON_ACTIVE_CLASS = 'active';

/**
 * ID du bouton toggle dans le DOM
 * @constant {string}
 */
const BUTTON_ID = 'toggle-dyslexie';


/* ==========================================================
   FONCTION PRINCIPALE D'INITIALISATION
   ========================================================== */

/**
 * Initialise le système de police dyslexie au chargement du DOM
 * 
 * @function initDyslexieMode
 * @description
 * Fonction principale exécutée au chargement complet du DOM.
 * Elle restaure la préférence utilisateur sauvegardée et configure
 * l'écouteur d'événements sur le bouton toggle.
 * 
 * Étapes :
 * 1. Récupération du bouton dans le DOM
 * 2. Vérification de l'existence du bouton
 * 3. Restauration de la préférence sauvegardée (localStorage)
 * 4. Ajout de l'écouteur d'événement click
 * 
 * @fires DOMContentLoaded
 * @listens click - Sur le bouton toggle-dyslexie
 * 
 * @example
 * // Appelé automatiquement au chargement
 * document.addEventListener('DOMContentLoaded', initDyslexieMode);
 */
document.addEventListener('DOMContentLoaded', function initDyslexieMode() {
  
  // Récupération du bouton toggle dyslexie
  const btnDyslexie = document.getElementById(BUTTON_ID);
  
  // Vérification présence du bouton dans le DOM
  if (!btnDyslexie) {
    console.warn(`[Dyslexie] Bouton #${BUTTON_ID} non trouvé dans le DOM`);
    return;
  }
  
  // Restaurer la préférence utilisateur au chargement de la page
  restoreUserPreference(btnDyslexie);
  
  // Configurer l'écouteur d'événement sur le bouton
  btnDyslexie.addEventListener('click', function handleDyslexieToggle() {
    toggleDyslexieMode(this);
  });
  
  console.log('[Dyslexie] Module initialisé avec succès');
});


/* ==========================================================
   FONCTIONS DE GESTION DE L'ÉTAT
   ========================================================== */

/**
 * Active ou désactive le mode dyslexie
 * 
 * @function toggleDyslexieMode
 * @param {HTMLButtonElement} button - Le bouton qui a déclenché l'action
 * 
 * @description
 * Cette fonction bascule entre l'état activé et désactivé du mode dyslexie.
 * Elle met à jour :
 * - La classe CSS sur le body (dyslexie-mode)
 * - L'état visuel du bouton (classe active)
 * - L'attribut ARIA aria-pressed
 * - La sauvegarde localStorage
 * 
 * @example
 * // Appelé automatiquement lors du clic
 * btnDyslexie.addEventListener('click', function() {
 *   toggleDyslexieMode(this);
 * });
 */
function toggleDyslexieMode(button) {
  // Toggle de la classe CSS sur le body
  document.body.classList.toggle(DYSLEXIE_CLASS);
  
  // Vérifier si le mode est maintenant actif
  const isActive = document.body.classList.contains(DYSLEXIE_CLASS);
  
  // Mettre à jour l'état visuel du bouton
  updateButtonState(button, isActive);
  
  // Sauvegarder la préférence utilisateur
  saveUserPreference(isActive);
  
  // Log pour debug (peut être retiré en production)
  console.log(`[Dyslexie] Mode ${isActive ? 'activé' : 'désactivé'}`);
}


/**
 * Met à jour l'état visuel du bouton
 * 
 * @function updateButtonState
 * @param {HTMLButtonElement} button - Le bouton à mettre à jour
 * @param {boolean} isActive - true si le mode dyslexie est actif
 * 
 * @description
 * Met à jour l'apparence et les attributs du bouton pour refléter
 * l'état actuel du mode dyslexie (actif/inactif).
 * 
 * Modifications :
 * - Classe CSS 'active' pour le style visuel
 * - Attribut aria-pressed pour l'accessibilité
 * 
 * @example
 * updateButtonState(btnDyslexie, true);  // Mode activé
 * updateButtonState(btnDyslexie, false); // Mode désactivé
 */
function updateButtonState(button, isActive) {
  // Ajouter/retirer la classe 'active'
  button.classList.toggle(BUTTON_ACTIVE_CLASS, isActive);
  
  // Mettre à jour l'attribut ARIA pour les lecteurs d'écran
  button.setAttribute('aria-pressed', isActive.toString());
}


/* ==========================================================
   FONCTIONS DE PERSISTANCE (localStorage)
   ========================================================== */

/**
 * Sauvegarde la préférence utilisateur dans localStorage
 * 
 * @function saveUserPreference
 * @param {boolean} isActive - État du mode dyslexie à sauvegarder
 * 
 * @description
 * Enregistre la préférence de l'utilisateur dans le localStorage du navigateur
 * pour la restaurer automatiquement lors de la prochaine visite.
 * 
 * @throws {Error} Si localStorage n'est pas disponible (mode privé)
 * 
 * @example
 * saveUserPreference(true);  // Sauvegarder "mode activé"
 * saveUserPreference(false); // Sauvegarder "mode désactivé"
 */
function saveUserPreference(isActive) {
  try {
    localStorage.setItem(STORAGE_KEY, isActive.toString());
  } catch (error) {
    // Gestion d'erreur si localStorage non disponible (mode navigation privée)
    console.warn('[Dyslexie] Impossible de sauvegarder la préférence:', error.message);
  }
}


/**
 * Restaure la préférence utilisateur depuis localStorage
 * 
 * @function restoreUserPreference
 * @param {HTMLButtonElement} button - Le bouton à mettre à jour si préférence trouvée
 * 
 * @description
 * Au chargement de la page, vérifie si l'utilisateur a une préférence sauvegardée
 * pour le mode dyslexie. Si oui, réactive automatiquement ce mode.
 * 
 * Cette fonction assure la persistance de la préférence entre les sessions
 * et les différentes pages du site.
 * 
 * @example
 * // Appelé automatiquement au chargement
 * restoreUserPreference(btnDyslexie);
 */
function restoreUserPreference(button) {
  try {
    // Récupérer la préférence sauvegardée
    const savedPreference = localStorage.getItem(STORAGE_KEY);
    
    // Si une préférence existe et est 'true'
    if (savedPreference === 'true') {
      // Activer le mode dyslexie
      document.body.classList.add(DYSLEXIE_CLASS);
      updateButtonState(button, true);
      
      console.log('[Dyslexie] Préférence utilisateur restaurée : mode activé');
    }
  } catch (error) {
    // Gestion d'erreur si localStorage non disponible
    console.warn('[Dyslexie] Impossible de lire la préférence:', error.message);
  }
}


/* ==========================================================
   EXPORTS (si module ES6)
   ========================================================== */

/**
 * @exports dyslexie
 * @description
 * Si ce fichier est utilisé comme module ES6, exporter les fonctions publiques
 * pour permettre leur utilisation dans d'autres modules ou pour les tests unitaires.
 * 
 * Fonctions exportées :
 * - toggleDyslexieMode : Toggle manuel du mode
 * - saveUserPreference : Sauvegarde manuelle
 * - restoreUserPreference : Restauration manuelle
 * 
 * @example
 * // Import dans un autre module
 * import { toggleDyslexieMode } from './dyslexie.js';
 * 
 * // Utilisation manuelle
 * toggleDyslexieMode(monBouton);
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    toggleDyslexieMode,
    saveUserPreference,
    restoreUserPreference
  };
}