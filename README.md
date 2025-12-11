---------------------------------------------------------------------------
# ⚠️ NOTE IMPORTANTE SUR L'ÉTAT DU PROJET

Ce document reflète les choix de conception et l'architecture du projet à la fin de la phase de développement initial.

Les optimisations de performance (CSS critique, Lazy Loading, etc.), les corrections de robustesse (Sécurité XSS) et les ajustements finaux d'accessibilité identifiés lors des audits de validation (Lighthouse, WAVE) ne sont **pas encore intégrés** dans le code ou la description détaillée de ce fichier.

Le plan d'actions pour l'amélioration continue est documenté séparément dans le fichier **RAPPORT_D_AMELIORATION.md**.
---------------------------------------------------------------------------

# Hôtel Booking - Application Web de Réservation

Projet réalisé dans le cadre de la formation Développeur Web - Bloc 1 : Développement Front-End de sites et applications web.

## Informations générales

**Nom du projet** : Hôtel Booking (Bloc 1)  
**Type** : Application web de réservation d'hôtel en ligne  
**Auteur** : Yannick  
**Formation** : Ilaria Academy - Certification RNCP Développeur Web  
**Version** : 1.0.0  
**Déploiement** : [https://yanni-bit.github.io/HotelBookingProjetBloc1/](https://yanni-bit.github.io/HotelBookingProjetBloc1/)

## Description du projet

Application web responsive permettant aux utilisateurs de consulter des offres d'hébergement, visualiser les détails des chambres via une galerie interactive, sélectionner des dates de réservation avec un calendrier dynamique, et finaliser leur réservation via un formulaire complet. Le projet répond aux exigences du référentiel de compétences RNCP pour le Bloc 1 (Front-End) et intègre les standards d'accessibilité WCAG 2.1 AA.

## Fonctionnalités principales

### Pages et navigation
- **Page d'accueil (index.html)** : Présentation de l'hôtel avec carrousel d'images, formulaire de recherche, offres spéciales
- **Page des chambres (room.html)** : Galerie photos interactive, détails de la chambre, calendrier de disponibilité, système d'onglets
- **Page de réservation (booking.html)** : Formulaire multi-sections avec récapitulatif dynamique, validation temps réel
- **Page de contact (contact.html)** : Formulaire de contact avec validation, carte Google Maps, informations pratiques
- **Page de documentation (documentations.html)** : Documentation technique du projet

### Fonctionnalités techniques
- **Calendrier interactif** : Sélection de dates avec Flatpickr, calcul automatique du nombre de nuits et du prix total
- **Galerie lightbox** : Visualisation plein écran des images avec navigation au clavier
- **Système d'internationalisation** : Support de 3 langues (français, anglais, italien) avec sauvegarde de préférence
- **Validation de formulaires** : Contrôle en temps réel avec messages d'erreur contextuels et attributs ARIA
- **Accessibilité** : Police dyslexie OpenDyslexic, navigation clavier complète, rôles ARIA, respect WCAG 2.1 AA
- **Responsive design** : Adaptation aux mobiles, tablettes et desktop avec media queries et matchMedia

## Technologies utilisées

### Langages
- **HTML5** : Structure sémantique, balises ARIA, métadonnées SEO
- **CSS3** : Variables CSS, Flexbox, Grid, animations, media queries
- **JavaScript ES6+** : Modules, classes, arrow functions, async/await, manipulation DOM

### Frameworks et librairies
- **Bootstrap 5.3.8** : Framework CSS pour la grille responsive et composants UI
- **Bootstrap Icons** : Bibliothèque d'icônes
- **Flatpickr** : Calendrier interactif pour la sélection de dates
- **OpenDyslexic** : Police adaptée aux personnes dyslexiques (critère WCAG Cr 1.c.2)

### Outils de développement
- **Visual Studio Code** : Éditeur de code
- **Git / GitHub** : Gestion de versions et hébergement
- **GitHub Pages** : Déploiement et hébergement statique

## Structure du projet

```
HOTELBOOKINGPROJETBLOC1/
├── assets/
│   ├── icons/              # Icônes (favicon, etc.)
│   └── images/             # Images du site
├── css/
│   ├── base.css           # Variables, reset, utilitaires
│   ├── style.css          # Styles principaux (2991 lignes)
│   ├── responsive.css     # Media queries (1042 lignes)
│   └── accessibilite.css  # Styles d'accessibilité WCAG
├── js/
│   ├── main.js                           # Fonctionnalités principales
│   ├── i18n.js                           # Système d'internationalisation
│   ├── translations.js                   # Fichier de traductions
│   ├── accessibilite.js                  # Validation et ARIA
│   ├── calendrier.js                     # Gestion du calendrier Flatpickr
│   ├── booking.js                        # Logique page réservation
│   ├── booking-responsive-matchmedia.js  # Réorganisation DOM mobile
│   ├── contact.js                        # Formulaire de contact
│   ├── dyslexie.js                       # Police dyslexie (WCAG Cr 1.c.2)
│   ├── room-gallery.js                   # Lightbox galerie photos
│   └── room-responsive-matchmedia.js     # Réorganisation DOM mobile
├── documentations/       # Documentation (cahiers des charges, maquettes ...)
├── docs/                 # Documentation technique
├── index.html            # Page d'accueil
├── room.html             # Page détails chambre
├── booking.html          # Page réservation
├── contact.html          # Page contact
├── documentations.html   # Page documentation
└── README.md             # Ce fichier
```

## Installation et utilisation

### Prérequis
Aucun prérequis technique. L'application fonctionne directement dans un navigateur web moderne.

### Installation locale

1. Cloner le dépôt :
```bash
git clone https://github.com/yanni-bit/HotelBookingProjetBloc1.git
cd HotelBookingProjetBloc1
```

2. Ouvrir le fichier `index.html` dans un navigateur web moderne

### Déploiement en ligne
Le projet est déployé sur GitHub Pages : [https://yanni-bit.github.io/HotelBookingProjetBloc1/](https://yanni-bit.github.io/HotelBookingProjetBloc1/)

## Conformité et standards

### Accessibilité WCAG 2.1 AA
Le projet respecte les critères d'accessibilité suivants :

#### Critère Cr 1.c.1 : Attributs pour lecteurs d'écran
- Utilisation systématique des attributs `alt` sur les images
- Attributs `aria-label` et `aria-describedby` sur les éléments interactifs
- Rôles ARIA (`role="search"`, `role="alert"`, `role="status"`)

#### Critère Cr 1.c.2 : Police dyslexie
- Police OpenDyslexic intégrée via CDN
- Bouton d'activation dans le header de chaque page
- Sauvegarde de la préférence utilisateur en localStorage
- Classes CSS `.dyslexie-mode` et `.font-dyslexie`

#### Critère Cr 1.c.3 : Information non uniquement par couleur
- Messages d'erreur textuels en plus des bordures rouges
- Icônes accompagnant les codes couleur
- États visuels multiples (couleur + texte + icône)

#### Critère Cr 1.c.4 : Navigation clavier
- Focus visible sur tous les éléments interactifs (`:focus-visible`)
- Outline de 3px avec offset de 2px
- Navigation au clavier dans les carrousels et modales
- Skip link pour accès direct au contenu principal
- Zones tactiles minimales de 44px (WCAG AAA)

#### Autres fonctionnalités d'accessibilité
- Support de `prefers-reduced-motion` pour animations réduites
- Classes `.visually-hidden` pour contenu accessible uniquement aux lecteurs d'écran
- Validation de formulaires avec messages d'erreur contextuels
- Attributs `aria-invalid`, `aria-pressed`, `aria-expanded`

### SEO et référencement

#### Balises meta uniques par page
- Titles uniques (50-60 caractères)
- Meta descriptions uniques (150-160 caractères)
- Meta keywords ciblés par page
- Balises Open Graph pour réseaux sociaux
- Twitter Cards pour partage optimisé

#### Balises canoniques
- URL canoniques sur toutes les pages
- Prévention du duplicate content

#### Structure sémantique
- Balises HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`)
- Hiérarchie des titres respectée (h1 → h6)
- Attributs `alt` sur toutes les images
- Liens avec attribut `title` descriptif

#### Performance
- Images optimisées
- CSS et JavaScript minifiés
- Favicon intégré
- Navigation entre pages fluide

### Responsive Design

#### Breakpoints utilisés
- Mobile : < 576px
- Petites tablettes : 576px - 767px
- Tablettes : 768px - 991px
- Desktop : ≥ 992px
- Desktop XL : ≥ 1200px

#### Breakpoints custom
- Très petits mobiles : < 360px (Galaxy Fold)
- Petits mobiles : 360px - 390px
- Mobiles moyens : 391px - 575px

#### Techniques responsive
- Media queries CSS standard
- MatchMedia JavaScript pour réorganisation DOM dynamique
- Grille Bootstrap 12 colonnes
- Classes utilitaires Bootstrap (d-none, d-md-block, etc.)
- Images responsive (`max-width: 100%`, `height: auto`)

### Validation W3C
- HTML5 : Validation W3C en cours
- CSS3 : Validation W3C en cours
- Accessibilité : Tests Google Lighthouse en cours

## Organisation du code

### CSS
- **base.css** : 283 lignes - Variables globales, reset CSS, utilitaires
- **style.css** : 2991 lignes - Styles principaux organisés par composants
- **responsive.css** : 1042 lignes - 18 media queries pour adaptation multi-écrans
- **accessibilite.css** : 109 lignes - Styles WCAG (focus, dyslexie, zones tactiles)

### JavaScript
- **Architecture modulaire** : Chaque fichier JS a une responsabilité unique
- **JSDoc complète** : Commentaires détaillés avec types, paramètres, exemples
- **ES6+** : Classes, arrow functions, destructuring, async/await
- **Gestion d'événements** : DOMContentLoaded, event delegation
- **LocalStorage** : Sauvegarde préférences (langue, police dyslexie)

### Conventions de nommage
- **Variables CSS** : `--nom-de-variable` (kebab-case)
- **Classes CSS** : `.nom-classe` (kebab-case)
- **IDs HTML** : `idCamelCase` (camelCase)
- **Fonctions JS** : `nomFonction()` (camelCase)
- **Constantes JS** : `NOM_CONSTANTE` (SCREAMING_SNAKE_CASE)

### Commentaires
- Commentaires de section avec délimiteurs visuels
- Commentaires inline explicatifs
- JSDoc pour toutes les fonctions JavaScript
- Commentaires HTML pour structure des blocs

## Tests et validation

### Tests à réaliser

#### Tests de responsivité
- BrowserStack : Tests multi-navigateurs et multi-appareils
- Chrome DevTools : Tests des breakpoints
- Validation visuelle sur smartphones, tablettes, desktop

#### Tests d'accessibilité
- Google Lighthouse : Audit accessibilité (score cible ≥ 90)
- WAVE : Évaluation des critères WCAG
- Tests navigation clavier
- Tests lecteurs d'écran (NVDA, JAWS)

#### Tests de performance
- Google Lighthouse : Performance (score cible ≥ 85)
- PageSpeed Insights : Optimisation des ressources
- Temps de chargement < 3s

#### Tests de compatibilité navigateurs
- Chrome (dernière version)
- Firefox (dernière version)
- Safari (dernière version)
- Edge (dernière version)

### Tests fonctionnels à valider
- Calendrier : Sélection de dates, calcul du prix, redirection vers booking
- Formulaires : Validation en temps réel, messages d'erreur, soumission
- Navigation : Liens entre pages, ancres internes, skip link
- Internationalisation : Changement de langue, sauvegarde préférence
- Galerie : Lightbox, navigation clavier, synchronisation avec carrousel
- Responsive : Réorganisation DOM mobile (room.html, booking.html)

## Critères d'évaluation RNCP couverts

### Activité 1 : Traduction de la maquette en code

#### C1.a : Langages HTML et CSS
- Cr 1.a.1 : Intégration conforme à la maquette
- Cr 1.a.2 : Code respecte normes W3C et accessibilité
- Cr 1.a.3 : Code passe tests validateur
- Cr 1.a.4 : Code commenté et indenté
- Cr 1.a.5 : Balises sémantiques utilisées

#### C1.b : Responsive design
- Cr 1.b.1 : Adaptation aux différentes résolutions
- Cr 1.b.2 : Compatibilité navigateurs
- Cr 1.b.3 : Alternatives pour incompatibilités

#### C1.c : Accessibilité
- Cr 1.c.1 : Attributs pour lecteurs d'écran
- Cr 1.c.2 : Police dyslexie intégrée
- Cr 1.c.3 : Information non uniquement par couleur
- Cr 1.c.4 : Navigation clavier complète

#### C1.d : Organisation CSS
- Cr 1.d.1 : Nommage pertinent et réutilisable
- Cr 1.d.2 : CSS organisé et commenté
- Cr 1.d.3 : Classes regroupées par thématiques
- Cr 1.d.4 : Code synthétique sans répétitions

#### C1.e : Référencement naturel
- Cr 1.e.1 : Textes hiérarchisés et titrés
- Cr 1.e.2 : Expressions clés mises en exergue
- Cr 1.e.3 : Balisage enrichissement contenu (schema.org)
- Cr 1.e.4 : Sémantique respectée (article, aside, nav)
- Cr 1.e.5 : Balises meta uniques et optimisées
- Cr 1.e.6 : Pages canoniques renseignées
- Cr 1.e.7 : Alt images et titres liens présents
- Cr 1.e.8 : Temps chargement optimisés
- Cr 1.e.9 : Favicon intégré
- Cr 1.e.10 : Navigation entre pages implémentée
- Cr 1.e.11 : Ancres pour navigation interne

### Activité 2 : Développement fonctionnalités front-end

#### C2.a : JavaScript - Interactions et animations
- Cr 2.a.1 : Syntaxes modernes ES6+ acquises
- Cr 2.a.2 : Manipulation DOM maîtrisée
- Cr 2.a.3 : Animations améliorent UX
- Cr 2.a.4 : Animations fonctionnelles multi-navigateurs
- Cr 2.a.5 : Programmation orientée objet et événementielle

#### C2.b : Validation de données
- Cr 2.b.1 : Contrôle temps réel pendant saisie
- Cr 2.b.2 : Méthodes cohérentes (regex)
- Cr 2.b.3 : Messages d'erreur clairs

#### C2.c : Requêtes asynchrones
- Cr 2.c.1 : Requêtes asynchrones fonctionnelles
- Cr 2.c.2 : Pas de données sensibles exposées
- Cr 2.c.3 : Réponses serveur traitées
- Cr 2.c.4 : Gestion erreurs sans interruption

#### C2.d : Librairies JavaScript
- Cr 2.d.1 : Librairies répondent à un besoin (Flatpickr)
- Cr 2.d.2 : Implémentation selon documentation
- Cr 2.d.3 : Explication fonctionnement global

## Documentation complémentaire

La documentation complète du projet comprend :
- README.md (ce fichier) : Vue d'ensemble et guide d'installation
- CHOIX_TECHNIQUES.md : Justification des choix technologiques
- ARCHITECTURE.md : Structure détaillée du code
- ACCESSIBILITE.md : Conformité WCAG et tests
- RESPONSIVE.md : Approche responsive et breakpoints
- ANNEXE_MATCHMEDIA.md : Guide technique window.matchMedia()
- TESTS.md : Résultats des tests et validation
- RAPPORT_D_AMELIORATION.md : Modifications apportées suite aux tests

## Licence

Ce projet est réalisé dans un cadre pédagogique pour la certification RNCP Développeur Web (Ilaria Academy). Tous droits réservés.

## Contact

**Auteur** : Yannick  
**Formation** : Ilaria Academy - Développeur Web  
**Projet** : Bloc 1 - Front-End  
**GitHub** : [https://github.com/yanni-bit/HotelBookingProjetBloc1](https://github.com/yanni-bit/HotelBookingProjetBloc1)

## Remerciements

- Ilaria Academy pour l'encadrement pédagogique
- Flatpickr pour le calendrier interactif
- Bootstrap pour le framework CSS
- OpenDyslexic pour la police d'accessibilité
- La communauté des développeurs web pour les ressources et bonnes pratiques