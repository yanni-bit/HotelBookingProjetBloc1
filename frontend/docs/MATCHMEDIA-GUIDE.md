# Window.matchMedia() - Guide complet

## 📋 Table des matières

1. [Introduction](#introduction)
2. [Qu'est-ce que matchMedia ?](#quest-ce-que-matchmedia)
3. [Syntaxe et utilisation](#syntaxe-et-utilisation)
4. [Avantages vs resize](#avantages-vs-resize)
5. [Exemples pratiques](#exemples-pratiques)
6. [Compatibilité navigateurs](#compatibilité-navigateurs)
7. [Ressources](#ressources)

---

## Introduction

`window.matchMedia()` est une **API JavaScript native** qui permet d'écouter les changements de media queries CSS directement en JavaScript. C'est la méthode moderne et performante pour exécuter du code en fonction de la taille d'écran.

---

## Qu'est-ce que matchMedia ?

### Définition officielle (MDN)

> La méthode `Window.matchMedia()` retourne un objet `MediaQueryList` qui peut être utilisé pour déterminer si le document correspond à une media query donnée, et pour surveiller un document afin de détecter quand il correspond (ou cesse de correspondre) à cette media query.

### En termes simples

Au lieu de vérifier continuellement la largeur de la fenêtre avec `window.innerWidth`, `matchMedia` te permet de **demander au navigateur de te prévenir** quand une media query change d'état (devient vraie ou fausse).

---

## Syntaxe et utilisation

### Syntaxe de base

```javascript
const mediaQuery = window.matchMedia('(max-width: 768px)');
```

### Vérifier l'état actuel

```javascript
if (mediaQuery.matches) {
  console.log('Écran mobile (≤ 768px)');
} else {
  console.log('Écran desktop (> 768px)');
}
```

### Écouter les changements

```javascript
// Fonction callback
function handleMediaChange(e) {
  if (e.matches) {
    console.log('Passage en mode mobile');
  } else {
    console.log('Passage en mode desktop');
  }
}

// Méthode moderne (recommandée)
mediaQuery.addEventListener('change', handleMediaChange);

// Méthode ancienne (pour compatibilité IE)
mediaQuery.addListener(handleMediaChange);
```

### Pattern complet

```javascript
document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Créer le media query
  const mediaQuery = window.matchMedia('(max-width: 991px)');
  
  // 2. Fonction de gestion
  function handleChange(e) {
    if (e.matches) {
      // Code pour mobile/tablette
      console.log('Mode mobile');
    } else {
      // Code pour desktop
      console.log('Mode desktop');
    }
  }
  
  // 3. Exécuter au chargement
  handleChange(mediaQuery);
  
  // 4. Écouter les changements
  mediaQuery.addEventListener('change', handleChange);
  
});
```

---

## Avantages vs resize

### ❌ Ancienne méthode (resize)

```javascript
window.addEventListener('resize', function() {
  const width = window.innerWidth;
  
  if (width < 992) {
    // Code mobile
  } else {
    // Code desktop
  }
});
```

**Problèmes :**
- ⚠️ Événement déclenché **plusieurs fois par seconde** pendant le redimensionnement
- ⚠️ Nécessite un **debouncing** pour éviter trop d'exécutions
- ⚠️ Vérifie la largeur même si on ne change pas de breakpoint
- ⚠️ Moins performant

### ✅ Nouvelle méthode (matchMedia)

```javascript
const mediaQuery = window.matchMedia('(max-width: 991px)');

mediaQuery.addEventListener('change', function(e) {
  if (e.matches) {
    // Code mobile
  } else {
    // Code desktop
  }
});
```

**Avantages :**
- ✅ Événement déclenché **seulement au changement de breakpoint**
- ✅ **Pas besoin de debouncing**
- ✅ Plus performant (géré nativement par le navigateur)
- ✅ Syntaxe plus claire et moderne
- ✅ Cohérent avec les media queries CSS

### 📊 Comparaison visuelle

```
RESIZE EVENT (sans debounce)
Redimensionnement de 1200px → 800px
|||||||||||||||||||||||||||||||||||||||||||||||||
↑ Événements déclenchés à chaque pixel

MATCHMEDIA
Redimensionnement de 1200px → 800px
                    |
                    ↑ Événement déclenché 1 seule fois au passage de 992px
```

---

## Exemples pratiques

### Exemple 1 : Afficher/masquer des éléments

```javascript
const mediaQuery = window.matchMedia('(max-width: 768px)');

function toggleMobileMenu(e) {
  const mobileMenu = document.querySelector('.mobile-menu');
  const desktopMenu = document.querySelector('.desktop-menu');
  
  if (e.matches) {
    mobileMenu.style.display = 'block';
    desktopMenu.style.display = 'none';
  } else {
    mobileMenu.style.display = 'none';
    desktopMenu.style.display = 'block';
  }
}

toggleMobileMenu(mediaQuery);
mediaQuery.addEventListener('change', toggleMobileMenu);
```

### Exemple 2 : Plusieurs breakpoints

```javascript
const mobile = window.matchMedia('(max-width: 767px)');
const tablet = window.matchMedia('(min-width: 768px) and (max-width: 991px)');
const desktop = window.matchMedia('(min-width: 992px)');

function handleLayout() {
  if (mobile.matches) {
    console.log('Mode mobile');
    // Code spécifique mobile
  } else if (tablet.matches) {
    console.log('Mode tablette');
    // Code spécifique tablette
  } else if (desktop.matches) {
    console.log('Mode desktop');
    // Code spécifique desktop
  }
}

handleLayout();
mobile.addEventListener('change', handleLayout);
tablet.addEventListener('change', handleLayout);
desktop.addEventListener('change', handleLayout);
```

### Exemple 3 : Orientation de l'appareil

```javascript
const portrait = window.matchMedia('(orientation: portrait)');

function handleOrientation(e) {
  if (e.matches) {
    console.log('Appareil en mode portrait');
  } else {
    console.log('Appareil en mode paysage');
  }
}

handleOrientation(portrait);
portrait.addEventListener('change', handleOrientation);
```

### Exemple 4 : Mode sombre

```javascript
const darkMode = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(e) {
  if (e.matches) {
    document.body.classList.add('dark-theme');
  } else {
    document.body.classList.remove('dark-theme');
  }
}

applyTheme(darkMode);
darkMode.addEventListener('change', applyTheme);
```

### Exemple 5 : Résolution d'écran

```javascript
const highRes = window.matchMedia('(min-resolution: 2dppx)');

function loadImages(e) {
  const images = document.querySelectorAll('img[data-src-2x]');
  
  images.forEach(img => {
    if (e.matches) {
      img.src = img.getAttribute('data-src-2x'); // Image haute résolution
    } else {
      img.src = img.getAttribute('data-src'); // Image normale
    }
  });
}

loadImages(highRes);
highRes.addEventListener('change', loadImages);
```

---

## Compatibilité navigateurs

### Support

✅ **Excellente compatibilité** :
- Chrome 9+
- Firefox 6+
- Safari 5.1+
- Edge (toutes versions)
- Opera 12.1+
- iOS Safari 5+
- Android Browser 3+
- Internet Explorer 10+

### Gestion de la compatibilité

```javascript
// Vérifier la disponibilité
if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  
  // addEventListener vs addListener
  if (mediaQuery.addEventListener) {
    // Navigateurs modernes
    mediaQuery.addEventListener('change', handleChange);
  } else {
    // IE10, anciens navigateurs
    mediaQuery.addListener(handleChange);
  }
} else {
  // Fallback pour navigateurs très anciens
  window.addEventListener('resize', handleChangeWithDebounce);
}
```

### Polyfill

Pour les très vieux navigateurs (< IE10), tu peux utiliser :
```html
<script src="https://cdn.jsdelivr.net/npm/matchmedia-polyfill@0.3.2/matchMedia.min.js"></script>
```

---

## Propriétés de MediaQueryList

### `.matches` (boolean)

Indique si la media query correspond actuellement.

```javascript
const mediaQuery = window.matchMedia('(max-width: 768px)');
console.log(mediaQuery.matches); // true ou false
```

### `.media` (string)

Retourne la chaîne de la media query.

```javascript
const mediaQuery = window.matchMedia('(max-width: 768px)');
console.log(mediaQuery.media); // "(max-width: 768px)"
```

### Événement `change`

Déclenché quand l'état de `.matches` change.

```javascript
mediaQuery.addEventListener('change', function(event) {
  console.log(event.matches); // Nouvel état
  console.log(event.media);   // Media query
});
```

---

## Media Queries supportées

Tu peux utiliser **toutes les media queries CSS** :

### Largeur
```javascript
'(max-width: 768px)'
'(min-width: 992px)'
'(min-width: 768px) and (max-width: 991px)'
```

### Hauteur
```javascript
'(max-height: 600px)'
'(min-height: 800px)'
```

### Orientation
```javascript
'(orientation: portrait)'
'(orientation: landscape)'
```

### Résolution
```javascript
'(min-resolution: 2dppx)'
'(-webkit-min-device-pixel-ratio: 2)'
```

### Préférences système
```javascript
'(prefers-color-scheme: dark)'
'(prefers-reduced-motion: reduce)'
'(prefers-contrast: high)'
```

### Type de média
```javascript
'print'
'screen'
'screen and (max-width: 768px)'
```

---

## Bonnes pratiques

### ✅ À faire

1. **Utiliser les mêmes breakpoints que CSS**
```javascript
// CSS
@media (max-width: 991px) { ... }

// JavaScript
const mediaQuery = window.matchMedia('(max-width: 991px)');
```

2. **Exécuter la fonction au chargement**
```javascript
const mediaQuery = window.matchMedia('(max-width: 991px)');

function handleChange(e) {
  // Code...
}

// Important : exécuter une première fois
handleChange(mediaQuery);

// Puis écouter les changements
mediaQuery.addEventListener('change', handleChange);
```

3. **Nettoyer les listeners si nécessaire**
```javascript
// Si tu supprimes des éléments du DOM
mediaQuery.removeEventListener('change', handleChange);
```

### ❌ À éviter

1. **Ne pas vérifier la largeur manuellement**
```javascript
// ❌ Mauvais
const mediaQuery = window.matchMedia('(max-width: 768px)');
if (window.innerWidth < 768) { ... }

// ✅ Bon
if (mediaQuery.matches) { ... }
```

2. **Ne pas créer plusieurs fois le même media query**
```javascript
// ❌ Mauvais
function myFunction() {
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  // ...
}

// ✅ Bon
const mediaQuery = window.matchMedia('(max-width: 768px)');
function myFunction() {
  if (mediaQuery.matches) { ... }
}
```

3. **Ne pas oublier le cas initial**
```javascript
// ❌ Mauvais - ne gère pas l'état au chargement
mediaQuery.addEventListener('change', handleChange);

// ✅ Bon
handleChange(mediaQuery); // État initial
mediaQuery.addEventListener('change', handleChange);
```

---

## Performance

### Benchmark comparatif

```javascript
// Test resize (100 redimensionnements)
console.time('resize');
let resizeCount = 0;
window.addEventListener('resize', () => resizeCount++);
// Résultat : ~500-1000 événements déclenchés

// Test matchMedia (100 redimensionnements)
console.time('matchMedia');
let matchMediaCount = 0;
const mq = window.matchMedia('(max-width: 768px)');
mq.addEventListener('change', () => matchMediaCount++);
// Résultat : 1-2 événements déclenchés (au changement de breakpoint)
```

### Optimisation mémoire

`matchMedia` utilise moins de mémoire car :
- Pas de debouncing nécessaire
- Événements déclenchés seulement quand nécessaire
- Géré nativement par le moteur du navigateur

---

## Cas d'usage avancés

### Charger des scripts conditionnellement

```javascript
const mobile = window.matchMedia('(max-width: 767px)');

function loadMobileScripts(e) {
  if (e.matches && !window.mobileScriptsLoaded) {
    const script = document.createElement('script');
    script.src = 'mobile-features.js';
    document.body.appendChild(script);
    window.mobileScriptsLoaded = true;
  }
}

loadMobileScripts(mobile);
mobile.addEventListener('change', loadMobileScripts);
```

### Lazy loading d'images responsive

```javascript
const queries = {
  mobile: window.matchMedia('(max-width: 767px)'),
  tablet: window.matchMedia('(min-width: 768px) and (max-width: 991px)'),
  desktop: window.matchMedia('(min-width: 992px)')
};

function loadResponsiveImages() {
  document.querySelectorAll('img[data-sizes]').forEach(img => {
    if (queries.mobile.matches) {
      img.src = img.getAttribute('data-src-mobile');
    } else if (queries.tablet.matches) {
      img.src = img.getAttribute('data-src-tablet');
    } else if (queries.desktop.matches) {
      img.src = img.getAttribute('data-src-desktop');
    }
  });
}

loadResponsiveImages();
Object.values(queries).forEach(mq => {
  mq.addEventListener('change', loadResponsiveImages);
});
```

### Gestion de layout complexe

```javascript
const breakpoints = {
  xs: window.matchMedia('(max-width: 575px)'),
  sm: window.matchMedia('(min-width: 576px) and (max-width: 767px)'),
  md: window.matchMedia('(min-width: 768px) and (max-width: 991px)'),
  lg: window.matchMedia('(min-width: 992px) and (max-width: 1199px)'),
  xl: window.matchMedia('(min-width: 1200px)')
};

function getCurrentBreakpoint() {
  for (const [name, mq] of Object.entries(breakpoints)) {
    if (mq.matches) return name;
  }
  return 'unknown';
}

function updateLayout() {
  const breakpoint = getCurrentBreakpoint();
  document.body.setAttribute('data-breakpoint', breakpoint);
  console.log(`Current breakpoint: ${breakpoint}`);
}

updateLayout();
Object.values(breakpoints).forEach(mq => {
  mq.addEventListener('change', updateLayout);
});
```

---

## Ressources

### Documentation officielle

- **MDN Web Docs** : https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
- **W3C Specification** : https://www.w3.org/TR/cssom-view/#dom-window-matchmedia
- **Can I Use** : https://caniuse.com/matchmedia

### Articles et tutoriels

- **CSS-Tricks** : https://css-tricks.com/working-with-javascript-media-queries/
- **Web.dev** : https://web.dev/responsive-web-design-basics/
- **Smashing Magazine** : https://www.smashingmagazine.com/2018/02/media-queries-responsive-design-2018/

### Alternatives et compléments

- **ResizeObserver API** : Pour observer les changements de taille d'éléments spécifiques
  - https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
  
- **IntersectionObserver API** : Pour détecter la visibilité d'éléments
  - https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

### Outils de développement

- **Chrome DevTools** : Pour tester les media queries
  - Device Mode (Ctrl+Shift+M)
  - Responsive Design Mode
  
- **Firefox DevTools** : Responsive Design Mode (Ctrl+Shift+M)

---

## Conclusion

`window.matchMedia()` est la méthode **moderne, performante et recommandée** pour gérer le responsive en JavaScript. Elle offre :

✅ Meilleure performance que `resize`  
✅ Code plus propre et maintenable  
✅ Cohérence avec les media queries CSS  
✅ Excellente compatibilité navigateurs  
✅ API native (pas de dépendance)  

**Utilise-la dans tous tes projets responsive !** 🚀

---

*Dernière mise à jour : Décembre 2024*
