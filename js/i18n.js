/* ==========================================================
   I18N.JS - Système de gestion des traductions
   Projet : Hôtel Booking (Bloc 1)
   
   Fonctionnalités :
   - Changement de langue via dropdown
   - Sauvegarde de la langue dans localStorage
   - Application automatique des traductions
   - Support des placeholders et contenus
   ========================================================== */

/**
 * @file i18n.js
 * @description Système de gestion des traductions (Internationalisation).
 * Gère le changement de langue, la sauvegarde, et l'application des traductions.
 */

class I18n {
  /**
   * @constructor
   */
  constructor() {
    // Langue par défaut : français, ou récupérée depuis localStorage
    /** @type {string} */
    this.currentLang = localStorage.getItem("language") || "fr";

    // Initialiser le système
    this.init();
  }

  /**
   * Initialise le système de traduction et attend que le DOM soit chargé.
   */
  init() {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        this.setupEventListeners();
        this.applyTranslations();
      });
    } else {
      this.setupEventListeners();
      this.applyTranslations();
    }
  }

  /**
   * Configure les écouteurs d'événements pour le changement de langue.
   */
  setupEventListeners() {
    // Récupérer tous les liens de langue dans le dropdown
    const languageLinks = document.querySelectorAll(
      ".dropdown-menu a[data-lang]"
    );

    languageLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const lang = link.dataset.lang;
        this.changeLanguage(lang);
      });
    });

    // Mettre à jour le bouton du dropdown avec la langue actuelle
    this.updateLanguageButton();
  }

  /**
   * Change la langue de l'application, sauvegarde dans localStorage, et applique les traductions.
   * @param {string} lang - Code de langue (fr, en, it).
   */
  changeLanguage(lang) {
    if (!translations[lang]) {
      console.error(`Langue non supportée : ${lang}`);
      return;
    }

    this.currentLang = lang;
    localStorage.setItem("language", lang);

    this.applyTranslations();
    this.updateLanguageButton();

    // Mettre à jour l'attribut lang du document
    document.documentElement.lang = lang;
  }

  /**
   * Met à jour le texte du bouton de sélection de langue (dans le ruban).
   */
  updateLanguageButton() {
    const langButton = document.getElementById("langue");
    if (!langButton) return;

    const langNames = {
      fr: "FRANÇAIS (FR)",
      en: "ENGLISH (US)",
      it: "ITALIANO (IT)",
    };

    langButton.textContent = langNames[this.currentLang] || "PAYS";
  }

  /**
   * Applique toutes les traductions sur la page en utilisant les attributs data-i18n.
   */
  applyTranslations() {
    // Traduire tous les éléments avec data-i18n
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      const translation = this.getTranslation(key);

      if (translation) {
        // Gérer les placeholders
        if (element.placeholder !== undefined) {
          element.placeholder = translation;
        }
        // Gérer les aria-label
        else if (
          element.hasAttribute("aria-label") &&
          !element.hasAttribute("data-i18n-aria-label")
        ) {
          element.setAttribute("aria-label", translation);
        }
        // Gérer le contenu HTML (pour <br> par exemple)
        else if (
          element.dataset.i18nHtml ||
          translation.includes("<br>") ||
          translation.includes("<")
        ) {
          element.innerHTML = translation;
        }
        // Gérer le contenu texte normal
        else {
          element.textContent = translation;
        }
      }
    });

    // Traduire les éléments avec data-i18n-html (pour innerHTML - Redondance conservée pour rétrocompatibilité)
    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const key = element.dataset.i18nHtml;
      const translation = this.getTranslation(key);

      if (translation) {
        element.innerHTML = translation;
      }
    });

    // Traduire les aria-label spécifiques
    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const key = element.dataset.i18nAreaLabel;
      const translation = this.getTranslation(key);
      if (translation) {
        element.setAttribute("aria-label", translation);
      }
    });
  }

  /**
   * Récupère une traduction par sa clé (supporte la notation pointée : "nav.home").
   * @param {string} key - Clé de traduction (ex: "nav.home").
   * @returns {string|null} - Traduction ou null si non trouvée.
   */
  getTranslation(key) {
    const keys = key.split(".");
    let translation = translations[this.currentLang];

    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        console.warn(
          `Traduction manquante : ${key} pour la langue ${this.currentLang}`
        );
        return null;
      }
    }

    return translation;
  }

  /**
   * Récupère la langue courante.
   * @returns {string} - Code de langue actuel.
   */
  getCurrentLanguage() {
    return this.currentLang;
  }

  /**
   * Traduit dynamiquement un texte (utile pour JS dans d'autres scripts).
   * @param {string} key - Clé de traduction.
   * @returns {string} - Texte traduit ou la clé si non trouvée.
   */
  t(key) {
    return this.getTranslation(key) || key;
  }
}

// Créer une instance globale
/**
 * Instance globale du système de traduction.
 * Accessible depuis tous les scripts pour traduire dynamiquement.
 * @type {I18n | null}
 * @example
 * // Utilisation dans un autre script
 * const translatedText = i18n.t('nav.home');
 */
let i18n;

// Initialiser dès que possible
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    i18n = new I18n();
  });
} else {
  i18n = new I18n();
}

// Exporter pour utilisation dans d'autres scripts
if (typeof module !== "undefined" && module.exports) {
  module.exports = I18n;
}
