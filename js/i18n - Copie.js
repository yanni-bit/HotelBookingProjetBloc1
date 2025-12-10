/* ==========================================================
   I18N.JS - Système de gestion des traductions
   Projet : Hôtel Booking (Bloc 1)
   
   Fonctionnalités :
   - Changement de langue via dropdown
   - Sauvegarde de la langue dans localStorage
   - Application automatique des traductions
   - Support des placeholders et contenus
   ========================================================== */

class I18n {
  constructor() {
    // Langue par défaut : français
    this.currentLang = localStorage.getItem('language') || 'fr';
    
    // Initialiser le système
    this.init();
  }
  
  /**
   * Initialise le système de traduction
   */
  init() {
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupEventListeners();
        this.applyTranslations();
      });
    } else {
      this.setupEventListeners();
      this.applyTranslations();
    }
  }
  
  /**
   * Configure les écouteurs d'événements
   */
  setupEventListeners() {
    // Récupérer tous les liens de langue dans le dropdown
    const languageLinks = document.querySelectorAll('.dropdown-menu a[data-lang]');
    
    languageLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = link.dataset.lang;
        this.changeLanguage(lang);
      });
    });
    
    // Mettre à jour le bouton du dropdown avec la langue actuelle
    this.updateLanguageButton();
  }
  
  /**
   * Change la langue de l'application
   * @param {string} lang - Code de langue (fr, en, it)
   */
  changeLanguage(lang) {
    if (!translations[lang]) {
      console.error(`Langue non supportée : ${lang}`);
      return;
    }
    
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    
    // Appliquer les traductions
    this.applyTranslations();
    
    // Mettre à jour le bouton
    this.updateLanguageButton();
    
    // Mettre à jour l'attribut lang du document
    document.documentElement.lang = lang;
  }
  
  /**
   * Met à jour le texte du bouton de sélection de langue
   */
  updateLanguageButton() {
    const langButton = document.getElementById('langue');
    if (!langButton) return;
    
    const langNames = {
      fr: 'FRANÇAIS (FR)',
      en: 'ENGLISH (US)',
      it: 'ITALIANO (IT)'
    };
    
    langButton.textContent = langNames[this.currentLang] || 'PAYS';
  }
  
  /**
   * Applique toutes les traductions sur la page
   */
  applyTranslations() {
    // Traduire tous les éléments avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      const translation = this.getTranslation(key);
      
      if (translation) {
        // Gérer les placeholders
        if (element.placeholder !== undefined) {
          element.placeholder = translation;
        }
        // Gérer les aria-label
        else if (element.hasAttribute('aria-label')) {
          element.setAttribute('aria-label', translation);
        }
        // Gérer le contenu HTML (pour <br> par exemple)
        else if (translation.includes('<br>') || translation.includes('<')) {
          element.innerHTML = translation;
        }
        // Gérer le contenu texte normal
        else {
          element.textContent = translation;
        }
      }
    });
    
    // Traduire les éléments avec data-i18n-html (pour innerHTML)
    document.querySelectorAll('[data-i18n-html]').forEach(element => {
      const key = element.dataset.i18nHtml;
      const translation = this.getTranslation(key);
      
      if (translation) {
        element.innerHTML = translation;
      }
    });
  }
  
  /**
   * Récupère une traduction par sa clé
   * @param {string} key - Clé de traduction (ex: "nav.home")
   * @returns {string|null} - Traduction ou null si non trouvée
   */
  getTranslation(key) {
    const keys = key.split('.');
    let translation = translations[this.currentLang];
    
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        console.warn(`Traduction manquante : ${key} pour la langue ${this.currentLang}`);
        return null;
      }
    }
    
    return translation;
  }
  
  /**
   * Récupère la langue courante
   * @returns {string} - Code de langue actuel
   */
  getCurrentLanguage() {
    return this.currentLang;
  }
  
  /**
   * Traduit dynamiquement un texte (utile pour JS)
   * @param {string} key - Clé de traduction
   * @returns {string} - Texte traduit
   */
  t(key) {
    return this.getTranslation(key) || key;
  }
}

// Créer une instance globale
let i18n;

// Initialiser dès que possible
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    i18n = new I18n();
  });
} else {
  i18n = new I18n();
}

// Exporter pour utilisation dans d'autres scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = I18n;
}