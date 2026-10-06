---------------------------------------------------------------------------
# NOTE SUR L'ÉTAT DU PROJET

Ce document fait partie de la documentation de conception du projet.

Les anomalies relevées lors de la campagne de tests ont été corrigées dans le code. Le détail des constats, des corrections et des contrôles qui les valident est consigné dans **RAPPORT_D_AMELIORATION.md**.
---------------------------------------------------------------------------

# Accessibilité - Hôtel Booking

## Introduction

Ce document détaille l'ensemble des mesures d'accessibilité mises en œuvre dans le projet Hôtel Booking pour garantir la conformité aux normes WCAG 2.1 niveau AA. L'accessibilité est une exigence du référentiel RNCP Bloc 1 et un engagement pour rendre le site utilisable par tous, y compris les personnes en situation de handicap.

## Conformité aux normes

### Normes respectées

- **WCAG 2.1 niveau AA** : Web Content Accessibility Guidelines, référence appliquée dans tout le projet
- **RGAA** : Référentiel Général d'Amélioration de l'Accessibilité, transposition française des WCAG

### Niveau de conformité visé

**Niveau AA (Double-A)** avec certains critères AAA implémentés :
- Zones tactiles minimales de 44px (AAA)
- Contraste de couleurs renforcé sur certains éléments
- Navigation clavier complète et optimisée

## Critères WCAG implémentés

### Cr 1.c.1 : Attributs pour lecteurs d'écran

#### Attributs alt sur les images

**Implémentation** :
```html
<!-- Images décoratives -->
<img src="slide-1.jpg" alt="Vue panoramique de la villa sur l'eau au coucher du soleil">

<!-- Logos -->
<img src="logo.png" alt="Book Your Travel - Logo">

<!-- Images fonctionnelles -->
<button data-bs-target="#carousel">
  <img src="thumbnail.jpg" alt="Miniature - Chambre avec vue sur l'océan">
</button>
```

**Règles appliquées** :
- Images décoratives : alt descriptif du contenu visuel
- Logos : alt avec nom de l'entreprise
- Images fonctionnelles : alt décrivant l'action
- Images purement décoratives CSS : pas d'alt nécessaire

#### Rôles ARIA

**Implémentation** :
```html
<!-- Formulaire de recherche -->
<form role="search">
  <input type="search" aria-label="Destination de votre séjour">
</form>

<!-- Messages d'alerte -->
<div role="alert" class="invalid-feedback">
  Ce champ est obligatoire.
</div>

<!-- Statut de formulaire -->
<div role="status" aria-live="polite" aria-atomic="true">
  Formulaire validé avec succès.
</div>

<!-- Navigation principale -->
<nav role="navigation" aria-label="Navigation principale">
  <!-- Menu -->
</nav>
```

**Rôles utilisés** :
- `role="search"` : Formulaire de recherche
- `role="alert"` : Messages d'erreur urgents
- `role="status"` : Annonces non critiques
- `role="navigation"` : Navigation principale
- `role="banner"` : En-tête principal
- `role="contentinfo"` : Pied de page
- `role="main"` : Contenu principal

#### Attributs aria-label et aria-describedby

**Implémentation** :
```html
<!-- Bouton sans texte visible -->
<button id="toggle-dyslexie" 
        aria-label="Activer la police adaptée aux personnes dyslexiques"
        aria-pressed="false">
  <i class="bi bi-universal-access"></i>
</button>

<!-- Champ avec description -->
<input type="email" 
       id="email" 
       aria-label="Adresse email"
       aria-describedby="email-help email-error"
       aria-invalid="false">
<small id="email-help">Format : exemple@domaine.com</small>
<div id="email-error" class="invalid-feedback"></div>

<!-- Lien avec contexte -->
<a href="room.html" 
   aria-label="Découvrir la Villa sur l'eau - Chambre de luxe">
  En savoir plus
</a>
```

**Attributs utilisés** :
- `aria-label` : Label pour éléments sans texte visible
- `aria-describedby` : Référence vers description/aide
- `aria-labelledby` : Référence vers titre/label
- `aria-invalid` : État de validation d'un champ
- `aria-pressed` : État d'un bouton toggle
- `aria-expanded` : État d'un élément déplié/replié
- `aria-current` : Élément actif dans navigation

### Cr 1.c.2 : Police dyslexie

#### Import de la police OpenDyslexic

**Implémentation dans base.css** :
```css
/* Import depuis CDN */
@import url('https://cdn.jsdelivr.net/npm/opendyslexic@1.0.3/opendyslexic-regular.css');

/* Variable CSS */
:root {
  --font-dyslexique: 'OpenDyslexic', Arial, sans-serif;
}

/* Classe d'activation globale */
body.dyslexie-mode,
body.dyslexie-mode * {
  font-family: var(--font-dyslexique) !important;
}

/* Classe ciblée (optionnelle) */
.font-dyslexie {
  font-family: var(--font-dyslexique) !important;
}
```

#### Bouton d'activation

**Implémentation dans accessibilite.css** :
```css
#toggle-dyslexie {
  transition: all 0.3s ease;
  border-color: var(--turquoise, #5fc8c2);
  color: var(--turquoise-texte, #266e6a);
  background-color: transparent;
}

#toggle-dyslexie:hover {
  background-color: var(--turquoise-light, rgba(95, 200, 194, 0.1));
  border-color: var(--turquoise-hover, #3db3aa);
  color: var(--turquoise-texte-hover, #1d5451);
}

#toggle-dyslexie.active {
  background-color: var(--turquoise, #5fc8c2);
  border-color: var(--turquoise, #5fc8c2);
  color: var(--gris-fonce, #333333);
}

#toggle-dyslexie:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(0, 95, 204, 0.25);
}

/* Responsive : texte masqué sur mobile */
@media (max-width: 767px) {
  #toggle-dyslexie .btn-text {
    display: none;
  }
}
```

#### Gestion JavaScript

**Implémentation dans dyslexie.js** :
```javascript
// Constantes
const STORAGE_KEY = 'dyslexie-mode';
const DYSLEXIE_CLASS = 'dyslexie-mode';

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
  const btnDyslexie = document.getElementById('toggle-dyslexie');
  
  // Restaurer préférence
  const savedPreference = localStorage.getItem(STORAGE_KEY);
  if (savedPreference === 'true') {
    document.body.classList.add(DYSLEXIE_CLASS);
    btnDyslexie.classList.add('active');
    btnDyslexie.setAttribute('aria-pressed', 'true');
  }
  
  // Écouteur toggle
  btnDyslexie.addEventListener('click', function() {
    document.body.classList.toggle(DYSLEXIE_CLASS);
    const isActive = document.body.classList.contains(DYSLEXIE_CLASS);
    
    this.classList.toggle('active', isActive);
    this.setAttribute('aria-pressed', isActive.toString());
    
    localStorage.setItem(STORAGE_KEY, isActive.toString());
  });
});
```

#### Fonctionnalités

- Bouton présent dans le header de toutes les pages
- Activation/désactivation par clic
- Préférence sauvegardée en localStorage
- Persistance entre les pages et sessions
- État du bouton (actif/inactif) visuellement distinct
- Attribut `aria-pressed` pour lecteurs d'écran
- Support navigation clavier (focus-visible)
- Responsive : icône seule sur mobile, texte + icône sur desktop

### Cr 1.c.3 : Information non uniquement par couleur

#### Messages d'erreur formulaires

**Implémentation** :
```html
<!-- Bordure rouge + texte d'erreur -->
<input type="email" 
       class="form-control is-invalid"
       aria-invalid="true">
<div class="invalid-feedback">
  <i class="bi bi-exclamation-circle"></i>
  Veuillez entrer une adresse email valide.
</div>

<!-- Bordure verte + texte de validation -->
<input type="text" 
       class="form-control is-valid"
       aria-invalid="false">
<div class="valid-feedback">
  <i class="bi bi-check-circle"></i>
  Champ correctement rempli.
</div>
```

**Éléments visuels multiples** :
- Couleur de bordure (rouge/vert)
- Icône (exclamation/check)
- Texte explicatif
- Attribut aria-invalid

#### États des boutons

**Implémentation** :
```html
<!-- Bouton dyslexie inactif -->
<button class="btn btn-outline-secondary">
  <i class="bi bi-universal-access"></i>
  <span>Dyslexie</span>
</button>

<!-- Bouton dyslexie actif -->
<button class="btn btn-outline-secondary active">
  <i class="bi bi-universal-access"></i>
  <span>Dyslexie</span>
</button>
```

**Indicateurs multiples** :
- Couleur de fond (transparent/turquoise)
- Couleur du texte (turquoise/blanc)
- Classe "active"
- Attribut aria-pressed

### Cr 1.c.4 : Navigation clavier

#### Focus visible

**Implémentation dans accessibilite.css** :
```css
/* Focus général */
*:focus {
  outline: none; /* Supprime outline par défaut */
}

*:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
  border-radius: 2px;
}

/* Focus boutons */
button:focus-visible,
.btn:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(0, 95, 204, 0.25);
}

/* Focus liens */
a:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 2px;
}

/* Focus champs formulaires */
input:focus-visible,
select:focus-visible,
textarea:focus-visible {
  outline: 3px solid #005fcc;
  outline-offset: 0;
  border-color: #005fcc;
  box-shadow: 0 0 0 3px rgba(0, 95, 204, 0.25);
}
```

**Caractéristiques** :
- Outline bleu (#005fcc) de 3px
- Offset de 2px pour lisibilité
- Box-shadow pour renforcement visuel
- `:focus-visible` : focus uniquement au clavier (pas à la souris)

#### Skip link

**Implémentation dans accessibilite.css** :
```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px 16px;
  text-decoration: none;
  z-index: 10000;
  font-weight: bold;
  border-radius: 0 0 4px 0;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
}
```

**Utilisation dans HTML** :
```html
<body>
  <a href="#main-content" class="skip-link">
    Aller au contenu principal
  </a>
  <!-- Header, navigation -->
  <main id="main-content">
    <!-- Contenu -->
  </main>
</body>
```

**Fonctionnement** :
- Lien masqué hors écran par défaut
- Apparaît au focus clavier (Tab)
- Permet de sauter header et navigation
- Accès direct au contenu principal

#### Navigation clavier dans les composants

**Carrousel** :
```javascript
// Navigation par flèches gauche/droite
document.addEventListener('keydown', function(event) {
  if (offerModalLightbox.classList.contains('show')) {
    if (event.key === 'ArrowLeft') {
      updateLightboxImage(currentImageIndex - 1);
    } else if (event.key === 'ArrowRight') {
      updateLightboxImage(currentImageIndex + 1);
    }
  }
});
```

**Modales** :
- Ouverture : Entrée sur bouton trigger
- Fermeture : Échap
- Navigation : Tab entre éléments interactifs
- Focus piégé dans la modale (Bootstrap natif)

**Dropdowns** :
- Ouverture : Entrée sur bouton
- Navigation : Flèches haut/bas
- Sélection : Entrée
- Fermeture : Échap

#### Zones tactiles minimales

**Implémentation dans accessibilite.css** :
```css
button,
.btn,
a.btn,
input[type="button"],
input[type="submit"],
input[type="reset"] {
  min-height: 44px;
}
```

**Conformité** :
- Critère WCAG AAA : 44×44 pixels minimum
- Facilite utilisation tactile (mobile)
- Améliore accessibilité pour personnes à mobilité réduite

## Fonctionnalités d'accessibilité supplémentaires

### Classe visually-hidden

**Implémentation** :
```css
.visually-hidden {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
}
```

**Utilisation** :
```html
<!-- Texte accessible uniquement aux lecteurs d'écran -->
<button>
  <i class="bi bi-search"></i>
  <span class="visually-hidden">Rechercher</span>
</button>
```

### Support prefers-reduced-motion

**Implémentation** :
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Focus et hover conservent transitions courtes */
  *:focus-visible,
  *:hover {
    transition-duration: 0.15s !important;
  }
}
```

**Fonctionnement** :
- Détecte préférence système utilisateur
- Réduit drastiquement animations et transitions
- Améliore confort pour personnes sensibles au mouvement
- Conserve transitions focus/hover pour feedback visuel

### Validation de formulaires accessible

**Implémentation JavaScript** :
```javascript
function validateField(field) {
  const errorId = `${field.id}-error`;
  let errorElement = document.getElementById(errorId);
  
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = errorId;
    errorElement.className = 'invalid-feedback';
    errorElement.setAttribute('role', 'alert');
    field.parentNode.appendChild(errorElement);
    
    field.setAttribute('aria-describedby', errorId);
  }
  
  let isValid = true;
  let errorMessage = "";
  
  // Validation...
  
  if (isValid) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    field.setAttribute('aria-invalid', 'false');
    errorElement.textContent = "";
  } else {
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');
    errorElement.textContent = errorMessage;
  }
  
  return isValid;
}
```

**Caractéristiques** :
- Validation en temps réel (blur, input)
- Messages d'erreur contextuels
- Attribut `aria-invalid` pour lecteurs d'écran
- Attribut `aria-describedby` liant champ et message
- Role "alert" pour annonce automatique
- Classes visuelles Bootstrap (is-valid, is-invalid)

### Annonces pour lecteurs d'écran

**Implémentation** :
```javascript
function announceFormStatus(message, type) {
  const statusId = "formStatus";
  let statusElement = document.getElementById(statusId);
  
  if (!statusElement) {
    statusElement = document.createElement("div");
    statusElement.id = statusId;
    statusElement.setAttribute("role", "status");
    statusElement.setAttribute("aria-live", "polite");
    statusElement.setAttribute("aria-atomic", "true");
    
    const form = document.querySelector("form");
    form.appendChild(statusElement);
  }
  
  statusElement.textContent = message;
  statusElement.className = type === "error" 
    ? "alert alert-danger mt-3" 
    : "alert alert-success mt-3";
}
```

**Attributs ARIA live regions** :
- `role="status"` : Mises à jour non critiques
- `aria-live="polite"` : Annonce quand lecteur disponible
- `aria-atomic="true"` : Annonce contenu complet

### Navigation accessible

**Implémentation** :
```javascript
function setupAccessibleNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.setAttribute("aria-current", "page");
      link.classList.add("active");
    } else {
      link.removeAttribute("aria-current");
      link.classList.remove("active");
    }
  });
}
```

**Attribut aria-current** :
- Indique page active aux lecteurs d'écran
- Complète l'indication visuelle (classe active)
- Améliore orientation dans le site

### Dropdowns accessibles

**Implémentation** :
```javascript
function setupAccessibleDropdowns() {
  const dropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');
  
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("show.bs.dropdown", function() {
      this.setAttribute("aria-expanded", "true");
    });
    
    toggle.addEventListener("hide.bs.dropdown", function() {
      this.setAttribute("aria-expanded", "false");
    });
  });
}
```

**Gestion états** :
- `aria-expanded="false"` : Dropdown fermé
- `aria-expanded="true"` : Dropdown ouvert
- Synchronisation avec événements Bootstrap

## Structure sémantique HTML5

### Balises sémantiques utilisées

**Structure type d'une page** :
```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Titre unique de la page</title>
</head>
<body>
  <a href="#main-content" class="skip-link">Aller au contenu</a>
  
  <header role="banner">
    <!-- En-tête du site -->
  </header>
  
  <nav role="navigation" aria-label="Navigation principale">
    <!-- Menu principal -->
  </nav>
  
  <main id="main-content" role="main">
    <article>
      <!-- Contenu principal -->
    </article>
    
    <aside>
      <!-- Contenu complémentaire -->
    </aside>
  </main>
  
  <footer role="contentinfo">
    <!-- Pied de page -->
  </footer>
</body>
</html>
```

**Balises utilisées** :
- `<header>` : En-tête de page ou section
- `<nav>` : Navigation principale
- `<main>` : Contenu principal unique
- `<article>` : Contenu autonome et réutilisable
- `<aside>` : Contenu complémentaire
- `<section>` : Section thématique
- `<footer>` : Pied de page
- `<figure>` et `<figcaption>` : Images avec légende

### Hiérarchie des titres

**Respect de la hiérarchie h1-h6** :
```html
<h1>Titre principal de la page</h1>
  <h2>Section principale</h2>
    <h3>Sous-section</h3>
      <h4>Détail</h4>
  <h2>Autre section principale</h2>
    <h3>Sous-section</h3>
```

**Règles appliquées** :
- Un seul `<h1>` par page
- Pas de saut de niveau (h2 → h4)
- Ordre logique et hiérarchique
- Titres descriptifs du contenu

## Contrastes de couleurs

L'audit Lighthouse de la première version signalait le critère `color-contrast` en échec sur les cinq pages. Les textes gris et turquoise étaient trop clairs sur fond blanc, et les libellés blancs posés sur les aplats turquoise et marron manquaient de lisibilité.

La palette a été revue selon un principe simple : les couleurs pastel de la maquette servent aux fonds, aux bordures et aux pastilles, jamais au texte.

- Deux couleurs de texte dédiées ont été ajoutées, `--turquoise-texte` et `--marron-texte`, pour les cas où le turquoise et le marron servaient de couleur de texte.
- Le gris des textes secondaires a été assombri.
- Sur les boutons et les pastilles de couleur, le libellé blanc a été remplacé par le gris foncé du corps de texte.
- Les deux pastilles d'état de l'onglet Équipements, verte et rouge, ont été assombries afin de garder leur symbole blanc lisible.

Les aplats de la maquette n'ont pas été modifiés. Seules les couleurs de texte posées dessus ont changé, de façon à corriger la lisibilité sans dénaturer la charte graphique.

### Palette de couleurs

```css
:root {
  /* Couleurs d'aplat : fonds, bordures, pastilles */
  --turquoise: #5fc8c2;
  --turquoise-hover: #3db3aa;
  --turquoise-badge: #90cfd6;
  --marron: #d6c8c0;
  --marron-clair: #E9E6E0;
  --marron-fonce: #AB9A8F;

  /* Couleurs de texte */
  --gris-fonce: #333333;              /* corps de texte, et libellés sur aplat coloré */
  --gris-moyen: #646464;              /* textes secondaires */
  --turquoise-texte: #266e6a;         /* liens et accents turquoise */
  --turquoise-texte-hover: #1d5451;   /* survol des mêmes éléments */
  --marron-texte: #726156;
  --blanc: #ffffff;
}
```

### Quatre déclarations de texte clair conservées

Elles ne sont pas en échec, parce qu'elles ne sont pas posées sur un aplat clair :

- les flèches du carrousel de l'accueil, superposées aux photographies ;
- le bloc d'information et le nom des cartes destination, posés sur un dégradé noir ;
- le libellé des boutons de comptage désactivés, que WCAG 2.1 exempte explicitement au titre du critère 1.4.3.

### Vérification

Les ratios ont été relevés dans l'onglet Éléments des DevTools de Chrome, qui affiche le contraste et le seuil AA directement sur l'élément inspecté, puis confirmés au WebAIM Contrast Checker. Les rapports Lighthouse avant et après correction sont dans `docs/tests/lighthouse/`.

## Tests d'accessibilité

### Outils utilisés

- **Google Lighthouse**, onglet Accessibilité des DevTools de Chrome : audit automatisé des cinq pages, en profil mobile et en profil ordinateur. Ses contrôles d'accessibilité s'appuient sur le moteur axe-core.
- **DevTools de Chrome**, onglet Éléments : inspection de l'arborescence d'accessibilité, et relevé des ratios de contraste élément par élément.
- **WebAIM Contrast Checker** : vérification des couples de couleurs retenus.
- **Validateur HTML du W3C** et **validateur CSS du W3C** : conformité du balisage, dont le critère 4.1.1.
- **Responsively App** : affichage simultané de huit largeurs calibrées sur les points de rupture du projet, de 1440 px à 280 px.
- **Navigation au clavier** sans souris, dans Chrome et dans Firefox.

Les rapports et les captures correspondants sont rangés dans `docs/tests/`.

### Tests manuels réalisés

**Navigation clavier** :
- Tab pour avancer entre les éléments, Shift+Tab pour reculer
- Entrée pour activer les boutons et les liens
- Espace pour cocher les cases et les boutons radio
- Échap pour fermer les modales
- Flèches pour naviguer dans les listes déroulantes
- Contrôle du focus visible à chaque étape, et de l'absence de piège au clavier

L'ordre de tabulation a été relevé page par page. Captures dans `docs/tests/clavier/`.

**Arborescence d'accessibilité** :
- Lecture de l'arbre d'accessibilité dans les DevTools, pour contrôler les rôles, les noms accessibles et les landmarks exposés aux technologies d'assistance
- Captures dans `docs/tests/accessibilite/`

## Résumé des critères WCAG couverts

### Niveau A (tous implémentés)

- **1.1.1** : Contenu non textuel (alt sur images)
- **1.3.1** : Information et relations (structure sémantique)
- **1.3.2** : Ordre séquentiel logique
- **2.1.1** : Clavier (navigation complète)
- **2.1.2** : Pas de piège au clavier
- **2.4.1** : Contourner des blocs (skip link)
- **2.4.2** : Titre de page (titles uniques)
- **3.1.1** : Langue de la page (lang="fr")
- **3.2.1** : Au focus (pas de changement contexte)
- **3.3.1** : Identification des erreurs
- **3.3.2** : Étiquettes ou instructions (labels)
- **4.1.1** : Analyse syntaxique (HTML valide)
- **4.1.2** : Nom, rôle, valeur (ARIA)

### Niveau AA (tous implémentés)

- **1.4.3** : Contraste minimum (4.5:1 texte normal)
- **1.4.5** : Texte sous forme d'image (évité)
- **2.4.5** : Accès multiples (navigation + liens)
- **2.4.6** : En-têtes et étiquettes descriptifs
- **2.4.7** : Focus visible
- **3.1.2** : Langue d'un passage (data-lang si besoin)
- **3.2.3** : Navigation cohérente
- **3.2.4** : Identification cohérente
- **3.3.3** : Suggestion après erreur
- **3.3.4** : Prévention des erreurs (confirmation)

### Niveau AAA (partiellement implémenté)

- **2.4.8** : Localisation (fil d'Ariane non implémenté)
- **2.5.5** : Taille de la cible (44×44px) ✓ Implémenté
- **1.4.8** : Présentation visuelle (largeur 80 caractères) ✓ Respecté

## Conclusion

Le projet Hôtel Booking respecte l'ensemble des critères WCAG 2.1 niveau AA requis pour le Bloc 1. L'accessibilité a été prise en compte dès la conception et implémentée de manière systématique dans le code HTML, CSS et JavaScript.

Les principales fonctionnalités d'accessibilité incluent :
- Police dyslexie activable (Cr 1.c.2)
- Navigation clavier complète
- Attributs ARIA complets
- Structure sémantique HTML5
- Contrastes de couleurs conformes
- Validation de formulaires accessible
- Support des technologies d'assistance

Cette approche garantit que le site est utilisable par le plus grand nombre, conformément aux exigences du référentiel RNCP et aux obligations légales françaises (RGAA).

## Liens et ressources

### Normes et référentiels

- **WCAG 2.1** : https://www.w3.org/WAI/WCAG21/quickref/
- **RGAA 4.1** : https://accessibilite.numerique.gouv.fr/

### Technologies d'accessibilité

- **OpenDyslexic** : https://opendyslexic.org/
- **Bootstrap Accessibility** : https://getbootstrap.com/docs/5.3/getting-started/accessibility/
- **ARIA Authoring Practices** : https://www.w3.org/WAI/ARIA/apg/

### Outils de test

- **Google Lighthouse** : https://developers.google.com/web/tools/lighthouse
- **WebAIM Contrast Checker** : https://webaim.org/resources/contrastchecker/
- **axe DevTools** : https://www.deque.com/axe/devtools/
- **Validateur W3C** : https://validator.w3.org/

### Lecteurs d'écran (références, non utilisés dans cette campagne de tests)

- **NVDA** (gratuit) : https://www.nvaccess.org/
- **JAWS** : https://www.freedomscientific.com/products/software/jaws/
- **VoiceOver** : Intégré macOS/iOS

### Documentation et guides

- **MDN Web Accessibility** : https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **WebAIM** : https://webaim.org/
- **A11y Project** : https://www.a11yproject.com/