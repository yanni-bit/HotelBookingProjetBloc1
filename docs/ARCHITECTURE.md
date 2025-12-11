---------------------------------------------------------------------------
# ⚠️ NOTE IMPORTANTE SUR L'ÉTAT DU PROJET

Ce document reflète les choix de conception et l'architecture du projet à la fin de la phase de développement initial.

Les optimisations de performance (CSS critique, Lazy Loading, etc.), les corrections de robustesse (Sécurité XSS) et les ajustements finaux d'accessibilité identifiés lors des audits de validation (Lighthouse, WAVE) ne sont **pas encore intégrés** dans le code ou la description détaillée de ce fichier.

Le plan d'actions pour l'amélioration continue est documenté séparément dans le fichier **RAPPORT_D_AMELIORATION.md**.
---------------------------------------------------------------------------

# Architecture - Hôtel Booking

## Introduction

Ce document décrit l'architecture complète du projet Hôtel Booking, incluant la structure des fichiers, l'organisation du code, les conventions de nommage, et les interactions entre les différents modules. L'architecture a été conçue pour être maintenable, évolutive et conforme aux bonnes pratiques du développement web.

## Vue d'ensemble de l'architecture

Le projet suit une architecture **MVC simplifiée côté client** :
- **Model** : Données gérées en localStorage et objets JavaScript
- **View** : Pages HTML avec structure sémantique
- **Controller** : Fichiers JavaScript gérant la logique métier

L'architecture est **modulaire** avec séparation des responsabilités :
- Un fichier CSS par préoccupation (base, style, responsive, accessibilité)
- Un fichier JavaScript par fonctionnalité (calendrier, validation, i18n, etc.)
- Des pages HTML structurées de manière cohérente

## Arborescence du projet

```
HOTELBOOKINGPROJETBLOC1/
│
├── assets/
│   ├── icons/
│   │   └── hotel.png              # Favicon du site
│   │
│   └── images/
│       ├── slide-1.jpg            # Images carrousel index
│       ├── slide-2.jpg
│       ├── slide-3.jpg
│       ├── room-*.jpg             # Images chambres
│       ├── offer-*.jpg            # Images offres
│       └── ...                    # Autres images
│
├── css/
│   ├── base.css                   # Variables, reset, utilitaires
│   ├── style.css                  # Styles principaux
│   ├── responsive.css             # Media queries
│   └── accessibilite.css          # Styles WCAG
│
├── js/
│   ├── main.js                               # Carrousels, menu, recherche
│   ├── i18n.js                               # Système internationalisation
│   ├── translations.js                       # Fichier de traductions
│   ├── accessibilite.js                      # Validation formulaires, ARIA
│   ├── calendrier.js                         # Flatpickr, calcul prix
│   ├── booking.js                            # Logique page réservation
│   ├── booking-responsive-matchmedia.js      # Réorganisation DOM booking mobile
│   ├── contact.js                            # Formulaire contact, modale
│   ├── dyslexie.js                           # Police dyslexie
│   ├── room-gallery.js                       # Lightbox galerie
│   └── room-responsive-matchmedia.js         # Réorganisation DOM room mobile
│
├── documentations/                # Documentation (cahiers des charges, maquettes ...)
│
├── docs/                          # Documentation technique
│
├── index.html                     # Page d'accueil
├── room.html                      # Page détails chambre
├── booking.html                   # Page réservation
├── contact.html                   # Page contact
├── documentations.html            # Page documentation
│
└── README.md                      # Documentation principale
```

## Architecture des fichiers CSS

### base.css (283 lignes)

**Rôle** : Fondations CSS du projet.

**Contenu** :
1. Variables CSS globales (couleurs, typographies, espacements)
2. Police dyslexie OpenDyslexic (import CDN + classes)
3. Reset CSS (Eric Meyer)
4. Styles généraux (body, titres, liens, images)
5. Utilitaires CSS (flexbox, overflow, alignements)

**Variables principales** :
```css
:root {
  /* Couleurs */
  --turquoise: #5fc8c2;
  --turquoise-hover: #3db3aa;
  --gris-clair: #f7f7f7;
  --gris-fonce: #333333;
  
  /* Typographies */
  --font-principale: "Open Sans", Arial, sans-serif;
  --font-secondaire: "Montserrat", sans-serif;
  --font-dyslexique: 'OpenDyslexic', Arial, sans-serif;
  
  /* Espacements */
  --espace-xs: 4px;
  --espace-sm: 8px;
  --espace-md: 16px;
  --espace-lg: 32px;
}
```

**Utilité** :
- Centralisation des variables pour maintenance facile
- Reset CSS pour uniformiser les navigateurs
- Utilitaires réutilisables dans tout le projet

### style.css (2991 lignes)

**Rôle** : Styles spécifiques de tous les composants et pages.

**Organisation par sections** :
1. Ruban supérieur (header-ribbon)
2. Header principal (logo, recherche, contact, dyslexie)
3. Navigation principale (navbar)
4. Carrousel index (hotelCarousel)
5. Formulaire de recherche (search-section)
6. Sections index (offres, why-choose, discover)
7. Footer
8. Page Room (galerie, détails, onglets, sidebar)
9. Page Booking (formulaire, récapitulatif)
10. Page Contact (formulaire, carte, sections)

**Structure type d'un composant** :
```css
/* ==========================================================
   COMPOSANT - Description
   ========================================================== */

.composant {
  /* Styles de base */
}

.composant__element {
  /* Sous-élément */
}

.composant--modifier {
  /* Variante */
}
```

**Conventions BEM partielles** :
- `.block` : Composant principal
- `.block__element` : Élément du composant
- `.block--modifier` : Variante du composant

### responsive.css (1042 lignes)

**Rôle** : Adaptations responsive pour tous les breakpoints.

**Organisation** :
- 18 media queries organisées de la plus large à la plus petite
- Adaptations par composant dans chaque media query
- Commentaires clairs indiquant les breakpoints

**Breakpoints principaux** :
```css
/* Desktop XL (≥1400px) */
@media (min-width: 1400px) { }

/* Desktop (≥1200px) */
@media (min-width: 1200px) { }

/* Desktop (≥992px) */
@media (min-width: 992px) { }

/* Tablettes (768px - 991px) */
@media (min-width: 768px) and (max-width: 991px) { }

/* Mobile large (576px - 767px) */
@media (min-width: 576px) and (max-width: 767px) { }

/* Mobile (< 576px) */
@media (max-width: 575px) { }

/* Mobile small (< 400px) */
@media (max-width: 399px) { }
```

**Approche** :
- Mobile-first pour les styles de base
- Media queries progressives pour enrichir sur desktop
- Réorganisation DOM via JavaScript (matchMedia) quand nécessaire

### accessibilite.css (169 lignes)

**Rôle** : Styles dédiés à l'accessibilité WCAG 2.1 AA.

**Contenu** :
1. Classes utilitaires (.visually-hidden, .skip-link)
2. Styles de focus (:focus-visible)
3. Validation de formulaires (is-invalid, is-valid)
4. Support prefers-reduced-motion
5. Zones tactiles minimales (44px)
6. Styles bouton dyslexie (#toggle-dyslexie)

**Exemples** :
```css
/* Focus visible pour navigation clavier */
*:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
}

.skip-link:focus {
  top: 0;
}

/* Support reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Architecture des fichiers JavaScript

### Principes d'organisation

**Architecture modulaire** :
- Un fichier = Une responsabilité
- Pas de dépendances circulaires
- Fonctions réutilisables et documentées
- JSDoc complète sur toutes les fonctions

**Chargement des scripts** :
```html
<!-- Ordre de chargement dans toutes les pages -->
<script src="js/main.js"></script>
<script src="js/i18n.js"></script>
<script src="js/accessibilite.js"></script>
<script src="js/dyslexie.js"></script>

<!-- Scripts spécifiques aux pages -->
<script src="js/calendrier.js"></script>      <!-- room.html -->
<script src="js/room-gallery.js"></script>    <!-- room.html -->
<script src="js/booking.js"></script>         <!-- booking.html -->
<script src="js/contact.js"></script>         <!-- contact.html -->
```

### Fichiers JavaScript détaillés

#### main.js

**Responsabilité** : Fonctionnalités générales partagées.

**Fonctions principales** :
- `plusSlides(n)` : Navigation carrousel index
- `currentSlide(n)` : Sélection slide spécifique
- `showSlides(n)` : Affichage slide active
- `autoSlides()` : Défilement automatique
- `resetTimer()` : Réinitialisation timer

**Fonctionnalités** :
1. Menu hamburger (navigation mobile)
2. Carrousel page index (4.5s auto-scroll)
3. Carrousel page room avec miniatures
4. Formulaire de recherche (alerte données)

**Variables globales** :
```javascript
let slideIndex = 0;           // Index slide courante
let timer = null;             // Timer auto-scroll
```

#### i18n.js

**Responsabilité** : Système d'internationalisation.

**Architecture** :
```javascript
class I18n {
  constructor() {
    this.currentLang = localStorage.getItem("language") || "fr";
    this.init();
  }
  
  init() { }
  setupEventListeners() { }
  changeLanguage(lang) { }
  updateLanguageButton() { }
  applyTranslations() { }
  getTranslation(key) { }
  t(key) { }
}

// Instance globale
let i18n = new I18n();
```

**Fonctionnement** :
1. Détection de la langue sauvegardée ou français par défaut
2. Configuration des écouteurs sur les liens de langue
3. Application des traductions via attributs `data-i18n`
4. Sauvegarde de la préférence en localStorage

**Traductions supportées** :
- Français (fr) : Langue par défaut
- Anglais (en)
- Italien (it)

#### translations.js

**Responsabilité** : Contient tous les textes traduits.

**Structure** :
```javascript
const translations = {
  fr: {
    nav: {
      home: "Accueil",
      rooms: "Nos chambres",
      // ...
    },
    search: {
      title: "Trouvez votre séjour idéal",
      // ...
    },
    // ...
  },
  en: { /* ... */ },
  it: { /* ... */ }
};
```

**Organisation** :
- Objets imbriqués par section (nav, search, booking, etc.)
- Clés cohérentes entre les langues
- Support HTML dans les traductions (data-i18n-html)

#### accessibilite.js

**Responsabilité** : Validation de formulaires et gestion ARIA.

**Fonctions principales** :
- `validateField(field)` : Valide un champ (requis, email, tel)
- `announceFormStatus(message, type)` : Annonce statut aux lecteurs d'écran
- `setupAccessibleDropdowns()` : Gestion ARIA dropdowns Bootstrap
- `setupAccessibleNavigation()` : Attribut aria-current sur lien actif

**Validation** :
```javascript
// Types de validation
1. Champs requis (required, aria-required)
2. Format email (regex)
3. Format téléphone (regex)

// Attributs ARIA mis à jour
- aria-invalid (true/false)
- aria-describedby (id message erreur)
- Classes Bootstrap (is-valid, is-invalid)
```

**Écouteurs** :
- `submit` : Validation complète avant envoi
- `blur` : Validation à la perte de focus
- `input` : Re-validation si champ invalide

#### calendrier.js

**Responsabilité** : Gestion du calendrier Flatpickr et calculs.

**Architecture** :
```javascript
const PRIX_PAR_NUIT = 770;

let checkInDate = null;
let checkOutDate = null;
let flatpickrInstance = null;

function initializeFlatpickr() { }
function updateInfo() { }
function formatDateLong(date) { }
function updateDisplay(checkIn, checkOut, nights) { }
function resetDisplay() { }
function handleReset() { }
function handleConfirm() { }
function calculateMobileBooking() { }
```

**Fonctionnalités** :
1. Initialisation Flatpickr (mode range, locale fr, inline)
2. Calcul du nombre de nuits entre deux dates
3. Calcul du prix total (nuits × 770€)
4. Affichage des informations de réservation
5. Support formulaire mobile alternatif (< 400px)
6. Redirection vers booking.html avec paramètres URL

**Configuration Flatpickr** :
```javascript
flatpickr("#flatpickr-calendar", {
  mode: "range",
  minDate: "today",
  dateFormat: "Y-m-d",
  locale: "fr",
  inline: true,
  showMonths: 1,
  onChange: function(selectedDates) { /* ... */ }
});
```

#### dyslexie.js

**Responsabilité** : Gestion de la police dyslexie OpenDyslexic.

**Architecture** :
```javascript
// Constantes
const STORAGE_KEY = 'dyslexie-mode';
const DYSLEXIE_CLASS = 'dyslexie-mode';
const BUTTON_ACTIVE_CLASS = 'active';
const BUTTON_ID = 'toggle-dyslexie';

// Fonctions
function initDyslexieMode() { }
function toggleDyslexieMode(button) { }
function updateButtonState(button, isActive) { }
function saveUserPreference(isActive) { }
function restoreUserPreference(button) { }
```

**Fonctionnement** :
1. Au chargement : restauration préférence localStorage
2. Au clic : toggle classe `dyslexie-mode` sur body
3. Sauvegarde : localStorage pour persistance entre pages
4. Attributs ARIA : `aria-pressed` pour état du bouton

**Critère WCAG** : Cr 1.c.2 (Police spécifique dyslexie)

#### room-gallery.js

**Responsabilité** : Gestion de la lightbox galerie photos.

**Fonctionnalités** :
1. Ouverture lightbox au clic sur image carrousel
2. Navigation lightbox (précédent/suivant)
3. Synchronisation avec carrousel principal
4. Navigation clavier (flèches gauche/droite)

**Architecture** :
```javascript
const carouselImages = Array.from(/* images */);
let currentImageIndex = 0;

function updateLightboxImage(index) {
  // Met à jour l'image affichée
  // Synchronise le carrousel principal
}

// Écouteurs
- show.bs.modal : Initialisation index
- click (boutons prev/next)
- keydown (ArrowLeft, ArrowRight)
```

#### room-responsive-matchmedia.js

**Responsabilité** : Réorganisation DOM mobile pour room.html.

**Problématique** :
- Desktop : Sidebar (col-lg-3) à droite du contenu
- Mobile : Widgets sidebar doivent apparaître entre galerie et onglets

**Solution matchMedia** :
```javascript
const mediaQuery = window.matchMedia("(max-width: 991px)");

function reorganizeForMobile(elements) {
  // Déplace widgets sidebar dans col-lg-9
  // Insère AVANT la section onglets
}

function restoreDesktopLayout(elements) {
  // Remet widgets dans col-lg-3
  // Restaure positions originales
}

mediaQuery.addEventListener('change', handleMediaQueryChange);
```

**Avantages matchMedia** :
- Callback uniquement au franchissement de breakpoint
- Performance meilleure que resize events
- Sauvegarde positions originales pour restauration

#### booking-responsive-matchmedia.js

**Responsabilité** : Réorganisation DOM mobile pour booking.html.

**Problématique** :
- Desktop : Récapitulatif (col-lg-4) à droite du formulaire
- Mobile : Récapitulatif doit apparaître AVANT section paiement

**Même principe** que room-responsive-matchmedia.js.

#### booking.js

**Responsabilité** : Logique spécifique page réservation.

**Fonctionnalités** :
1. Récupération paramètres URL (dates, prix, chambre)
2. Pré-remplissage du formulaire
3. Calcul du prix total avec options
4. Validation spécifique réservation
5. Soumission et affichage confirmation

#### contact.js

**Responsabilité** : Formulaire de contact et carte Google Maps.

**Fonctionnalités** :
1. Validation formulaire contact
2. Formatage automatique numéro téléphone
3. Affichage modale de confirmation détaillée
4. Gestion erreurs chargement carte Google Maps
5. Smooth scroll vers ancres

**Modale de confirmation** :
- Récapitulatif complet des données saisies
- Design professionnel avec icônes
- Alertes (confirmation envoi, urgence téléphone)
- Nettoyage automatique après fermeture

## Architecture des pages HTML

### Structure commune à toutes les pages

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <!-- Meta charset et viewport -->
  <!-- Title unique par page -->
  <!-- Meta description unique -->
  <!-- Meta keywords -->
  <!-- Canonical URL -->
  <!-- Open Graph -->
  <!-- Twitter Card -->
  <!-- Favicon -->
  <!-- CSS Bootstrap -->
  <!-- CSS customs -->
</head>
<body>
  <!-- Skip link -->
  
  <!-- Header Ribbon (langue, monnaie) -->
  
  <!-- Header Principal -->
  <header>
    <!-- Logo, Dyslexie, Contact, Recherche -->
  </header>
  
  <!-- Navigation -->
  <nav>
    <!-- Menu principal -->
  </nav>
  
  <!-- Main Content -->
  <main id="main-content">
    <!-- Contenu spécifique de la page -->
  </main>
  
  <!-- Footer -->
  <footer>
    <!-- Footer content -->
  </footer>
  
  <!-- Scripts Bootstrap -->
  <!-- Scripts customs -->
</body>
</html>
```

### Ordre de chargement CSS

```html
<!-- Bootstrap (framework) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">

<!-- Bootstrap Icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<!-- Flatpickr (si page avec calendrier) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">

<!-- CSS customs (ordre important) -->
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/responsive.css">
<link rel="stylesheet" href="css/accessibilite.css">
```

### Ordre de chargement JavaScript

**Note importante** : Tous les scripts customs sont chargés avec l'attribut `defer` pour optimiser le chargement de la page.

```html
<!-- Bootstrap Bundle (Popper inclus) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

<!-- Flatpickr (si page avec calendrier) -->
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<script src="https://cdn.jsdelivr.net/npm/flatpickr/dist/l10n/fr.js"></script>

<!-- Scripts customs (ordre important, chargement avec defer) -->
<script src="js/main.js" defer></script>
<script src="js/translations.js" defer></script>
<script src="js/i18n.js" defer></script>
<script src="js/accessibilite.js" defer></script>
<script src="js/dyslexie.js" defer></script>

<!-- Scripts spécifiques pages (avec defer) -->
<script src="js/calendrier.js" defer></script>        <!-- room.html uniquement -->
<script src="js/room-gallery.js" defer></script>      <!-- room.html uniquement -->
<script src="js/room-responsive-matchmedia.js" defer> <!-- room.html uniquement -->
<script src="js/booking.js" defer></script>           <!-- booking.html uniquement -->
<script src="js/booking-responsive-matchmedia.js" defer> <!-- booking.html uniquement -->
<script src="js/contact.js" defer></script>           <!-- contact.html uniquement -->
```

**Avantages de l'attribut defer** :
- Scripts téléchargés en parallèle sans bloquer le parsing HTML
- Exécution dans l'ordre d'apparition dans le HTML
- Exécution après le parsing complet du DOM
- Amélioration des performances de chargement initial

## Conventions de nommage

### HTML

**IDs** : camelCase
```html
<div id="hotelCarousel">
<input id="checkInDate">
<button id="toggleDyslexie">
```

**Classes** : kebab-case
```html
<div class="hotel-header">
<section class="search-section">
<button class="btn-custom">
```

**Attributs data** : kebab-case
```html
<span data-i18n="nav.home">
<button data-slide-index="2">
```

### CSS

**Classes** : kebab-case
```css
.hotel-carousel { }
.search-form { }
.footer-links { }
```

**Variables** : kebab-case avec double tiret
```css
--turquoise: #5fc8c2;
--font-principale: "Open Sans";
--espace-md: 16px;
```

**Modificateurs BEM** : double tiret
```css
.btn { }
.btn--primary { }
.btn--large { }
```

### JavaScript

**Variables** : camelCase
```javascript
let slideIndex = 0;
const checkInDate = null;
let flatpickrInstance = null;
```

**Constantes** : SCREAMING_SNAKE_CASE
```javascript
const STORAGE_KEY = 'dyslexie-mode';
const PRIX_PAR_NUIT = 770;
const BUTTON_ID = 'toggle-dyslexie';
```

**Fonctions** : camelCase
```javascript
function initializeFlatpickr() { }
function toggleDyslexieMode() { }
function handleFormSubmit() { }
```

**Classes** : PascalCase
```javascript
class I18n { }
class FormValidator { }
```

## Flux de données

### LocalStorage

**Données persistées** :
```javascript
// Langue sélectionnée
localStorage.setItem('language', 'fr');
localStorage.getItem('language');

// Mode dyslexie
localStorage.setItem('dyslexie-mode', 'true');
localStorage.getItem('dyslexie-mode');
```

**Avantages** :
- Persistance entre sessions
- Persistance entre pages
- Aucune configuration serveur nécessaire

**Limitations** :
- Données stockées côté client uniquement
- Limite de 5-10MB par domaine
- Pas de synchronisation multi-appareils

### Paramètres URL

**Transmission de données entre pages** :

Exemple room.html → booking.html :
```javascript
// Création des paramètres
const params = new URLSearchParams({
  checkIn: '2025-12-15',
  checkOut: '2025-12-17',
  checkInTime: '15:00',
  checkOutTime: '11:00',
  nights: 2,
  price: 770,
  roomName: 'Villa sur l\'eau',
  adults: 2
});

// Redirection
window.location.href = `booking.html?${params.toString()}`;
```

Récupération dans booking.html :
```javascript
const urlParams = new URLSearchParams(window.location.search);
const checkIn = urlParams.get('checkIn');
const nights = urlParams.get('nights');
// ...
```

## Interactions entre modules

### Diagramme de dépendances

```
main.js
  ↓
i18n.js → translations.js
  ↓
accessibilite.js
  ↓
dyslexie.js

Pages spécifiques :
  room.html → calendrier.js → Flatpickr
           → room-gallery.js → Bootstrap Carousel
           → room-responsive-matchmedia.js → matchMedia API
           
  booking.html → booking.js → URLSearchParams
              → booking-responsive-matchmedia.js
              
  contact.html → contact.js → Google Maps API
```

### Événements et écouteurs

**DOMContentLoaded** :
- Tous les fichiers JS s'initialisent sur cet événement
- Garantit que le DOM est complètement chargé
- Évite les erreurs de sélection d'éléments inexistants

**Événements formulaires** :
- `submit` : Validation avant envoi
- `blur` : Validation à la perte de focus
- `input` : Re-validation temps réel

**Événements Bootstrap** :
- `show.bs.modal` : Avant ouverture modale
- `hidden.bs.modal` : Après fermeture modale
- `shown.bs.tab` : Après affichage onglet
- `slide.bs.carousel` : Changement de slide

**Événements customs** :
- `change` (matchMedia) : Changement de breakpoint
- `click` : Actions utilisateur
- `keydown` : Navigation clavier

## Performance et optimisation

### Stratégies d'optimisation

**CSS** :
1. Regroupement des sélecteurs similaires
2. Éviter les sélecteurs trop profonds (max 3 niveaux)
3. Utilisation de classes réutilisables
4. Variables CSS pour éviter répétitions

**JavaScript** :
1. Event delegation quand possible
2. Debouncing sur événements fréquents (resize, scroll)
3. LocalStorage pour éviter calculs répétés
4. Lazy initialization (Flatpickr au clic onglet)

**Images** :
1. Compression JPEG pour photos
2. PNG pour logos et icônes
3. Attributs width/height pour éviter CLS
4. Chargement progressif possible (à implémenter)

### Gestion de la mémoire

**Nettoyage des écouteurs** :
```javascript
// Modale de confirmation contact.js
modalElement.addEventListener('hidden.bs.modal', function () {
  this.remove(); // Nettoyage DOM
});
```

**Variables globales limitées** :
- Encapsulation dans fonctions ou classes
- Variables locales privilégiées
- Pas de pollution du scope global

## Extensibilité

### Ajout d'une nouvelle page

1. Créer le fichier HTML avec structure commune
2. Créer le fichier JS spécifique si nécessaire
3. Ajouter les styles spécifiques dans style.css
4. Ajouter les traductions dans translations.js
5. Mettre à jour la navigation (navbar)

### Ajout d'une nouvelle langue

1. Ajouter l'objet langue dans translations.js :
```javascript
const translations = {
  fr: { /* ... */ },
  en: { /* ... */ },
  it: { /* ... */ },
  es: { /* nouveau */ }
};
```

2. Ajouter le lien dans le dropdown :
```html
<a href="#" data-lang="es">ESPAÑOL (ES)</a>
```

3. Mettre à jour i18n.js (langNames) si nécessaire

### Ajout d'une nouvelle fonctionnalité

1. Créer un nouveau fichier JS dédié
2. Documenter avec JSDoc
3. Charger le script dans les pages concernées
4. Ajouter les styles nécessaires
5. Ajouter les traductions

## Sécurité

### Validation côté client

**Principe** : Ne jamais faire confiance aux données utilisateur.

**Implémentation** :
```javascript
// Validation format email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation format téléphone
const phoneRegex = /^[\d\s\+\-\(\)]+$/;

// Échappement HTML (à implémenter si backend)
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
```

**Limitations** :
- Validation client facilement contournable
- Backend nécessaire pour sécurité réelle
- Bloc 1 : pas de backend, validation client uniquement

### Protection des données

**LocalStorage** :
- Données non sensibles uniquement (langue, préférences UI)
- Jamais de mots de passe, tokens, données personnelles
- Pas de cookies (Bloc 1)

## Maintenance et évolutivité

### Bonnes pratiques respectées

**Code propre** :
- Indentation cohérente (2 espaces)
- Nommage explicite et cohérent
- Commentaires pertinents
- JSDoc complète
- Séparation des responsabilités

**Modularité** :
- Fichiers petits et ciblés
- Couplage faible entre modules
- Haute cohésion interne
- Réutilisabilité des composants

**Documentation** :
- README.md complet
- Documentation technique (ce fichier)
- Commentaires dans le code
- JSDoc pour les fonctions

### Points d'amélioration futurs

Documentation en cours de rédaction (tests et optimisations à définir après validation).

## Conclusion

L'architecture du projet Hôtel Booking a été conçue pour être :
- **Maintenable** : Code clair, organisé, documenté
- **Modulaire** : Séparation des responsabilités
- **Performante** : Optimisations appliquées
- **Accessible** : Conformité WCAG 2.1 AA
- **Responsive** : Adaptation multi-devices

Cette architecture respecte les bonnes pratiques du développement web moderne tout en restant simple et adaptée aux contraintes du Bloc 1 (vanilla JavaScript, pas de framework).