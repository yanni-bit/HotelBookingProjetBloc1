# Rapport d'amélioration - Hôtel Booking

## Introduction

Ce document fait suite à `TESTS.md`, qui rend compte de l'état du site au moment de la
campagne de tests, sans correction. Le présent rapport consigne les corrections apportées
ensuite.

Il reprend une à une les dix anomalies relevées par la campagne, indique la correction
appliquée et le contrôle qui la valide. Il consigne également six défauts qui
n'apparaissaient dans aucun score et qui ont été découverts pendant le travail de
correction.

### Périmètre

| Élément | Valeur |
|---|---|
| Application | Book Your Travel, front-end HTML5 / CSS3 / JavaScript |
| Adresse | https://yanni-bit.github.io/HotelBookingProjetBloc1/ |
| Pages couvertes | index.html, room.html, booking.html, contact.html, documentations.html |
| Date de la campagne de tests | 5 octobre 2026 |
| Date des corrections | 5 et 6 octobre 2026 |

---

## 1. Méthode

Les outils sont ceux de la campagne de tests, afin que les mesures d'avant et d'après
soient comparables : Nu Html Checker, W3C CSS Validator, Google Lighthouse, panneau
Accessibilité de Chrome, ordre de tabulation de Firefox.

Trois points de méthode ont été appliqués.

Les corrections ont été traitées dans l'ordre de priorité fixé en section 5.2 de
`TESTS.md`, une anomalie à la fois, avec une mesure après chaque correction plutôt
qu'une seule mesure à la fin.

Les scores Lighthouse sont relevés sur trois passes, et la médiane est retenue. Une passe
unique varie de plusieurs points en profil mobile.

L'espace de stockage du navigateur est vidé avant chaque passe. GitHub Pages sert ses
fichiers avec un `Cache-Control: max-age=600` : sans cette précaution, une mesure peut
porter sur une version précédente des feuilles de style.

---

## 2. Anomalies de la campagne de tests

Les dix anomalies de la section 5.2 de `TESTS.md`, dans leur ordre de priorité.

| Priorité | Anomalie | État |
|---|---|---|
| 1 | Erreurs de validation HTML, 27 en 6 familles | corrigée |
| 2 | Erreurs de validation CSS, 3 identiques | corrigée |
| 3 | Règle `@import` mal placée, la police n'était pas chargée | corrigée |
| 4 | Flèches du carrousel non atteignables au clavier | corrigée |
| 5 | Contraste insuffisant | corrigée |
| 6 | Débordement horizontal sur documentations.html à 280 pixels | corrigée |
| 7 | Performance de la page d'accueil | corrigée |
| 8 | Champ de formulaire sans `id` ni `name` | corrigée |
| 9 | Hauteur en `vh` sur contact.html | corrigée |
| 10 | Score SEO de la page d'accueil | corrigée |

### 2.1 Validation HTML

Les six familles d'erreurs et le geste appliqué à chacune.

| Famille | Occurrences | Correction |
|---|---|---|
| Élément `h5` ou `div` interdit comme enfant de `label` | 11 | les `h5` imbriqués sont remplacés par des `span`, l'apparence est reportée sur une classe utilitaire |
| Valeur `type="button"` invalide sur un élément `a` | 5 | l'attribut `type` est retiré, l'élément reste un lien |
| Attribut `aria-label` interdit sans rôle explicite | 5 | les éléments concernés sont passés en `button`, qui porte un rôle implicite |
| Saut de niveaux de titre | 4 | les niveaux sont rétablis en séquence, l'apparence est reportée sur une classe utilitaire |
| Attribut `aria-labelledby` interdit sur un `div` sans rôle | 1 | l'attribut est retiré |
| Attribut `src` vide sur un élément `img` | 1 | une image transparente en URI de données remplace la valeur vide |

Les onze premières et les quatre de la quatrième famille portent sur l'apparence autant
que sur le balisage. Remplacer un `h5` par un `span` supprime la mise en forme héritée du
titre. Une classe utilitaire, `h-titre`, déclarée dans `base.css`, reprend la taille, la
graisse et la hauteur de ligne du titre remplacé. Le rendu visuel est inchangé.

Contrôle, Nu Html Checker, moteur vnu 26.10.2, les cinq pages :

| Page | Erreurs avant | Erreurs après |
|---|---|---|
| index.html | 8 | 0 |
| room.html | 10 | 0 |
| booking.html | 8 | 0 |
| contact.html | 1 | 0 |
| documentations.html | 0 | 0 |
| **Total** | **27** | **0** |

Le validateur ne remonte plus que des messages de niveau information, qui signalent des
redondances sans conséquence : le rôle `banner` sur un `header`, le rôle `main` sur un
`main`, l'attribut `aria-required` sur un champ qui porte déjà `required`. Ces attributs
sont conservés volontairement, pour la compatibilité avec les lecteurs d'écran anciens.

### 2.2 Validation CSS

Les trois erreurs de `style.css` étaient la même erreur répétée : une propriété
`border-color` déclarée en forme raccourcie avec une variable CSS parmi ses quatre
valeurs, que le validateur refuse d'analyser.

La forme raccourcie est remplacée par les quatre propriétés détaillées, aux lignes 392,
412 et 1555 de `style.css` :

```css
border-top-color: var(--turquoise);
border-right-color: transparent;
border-bottom-color: transparent;
border-left-color: transparent;
```

Le rendu est identique, la variable n'apparaît plus que seule dans sa valeur.

Contrôle : W3C CSS Validation Service, profil CSS niveau 3 avec SVG, sur les quatre
feuilles déployées. Zéro erreur. Les avertissements restants portent sur les variables
CSS, que le validateur n'analyse pas statiquement, et sur deux préfixes propriétaires
employés volontairement.

### 2.3 Règle `@import` mal placée

La police OpenDyslexic était chargée par un `@import` placé après le bloc `:root` de
`base.css`. Une règle `@import` située après une autre règle est ignorée par le
navigateur : la police n'était jamais chargée, et le bouton Dyslexie n'avait aucun effet
visible.

Deux corrections :

- la police est déclarée par deux règles `@font-face`, en tête de feuille, lignes 49 et
  58 de `base.css` ;
- les fichiers de police sont hébergés dans le projet, `assets/fonts/`, et non chargés
  depuis un CDN. L'adresse employée auparavant pointait vers un paquet npm inexistant.

Contrôle : le bouton Dyslexie change la police des cinq pages, et le panneau Réseau des
outils de développement montre le chargement des fichiers `woff2`.

### 2.4 Flèches du carrousel non atteignables au clavier

Les deux flèches du carrousel de la page d'accueil étaient des éléments `<a>` sans
attribut `href`, donc exclus de l'ordre de tabulation.

Elles sont passées en `<button type="button">`, lignes 261 et 263 de `index.html`. Un
bouton est atteignable au clavier sans attribut supplémentaire.

Contrôle : l'ordre de tabulation de Firefox numérote désormais les deux flèches, et
l'arborescence d'accessibilité de Chrome les donne avec `focusable: true`.

### 2.5 Contraste insuffisant

Les couleurs de texte ont été assombries, dans les variables de `base.css` et dans les
déclarations locales. Les couleurs de fond, pastel, n'ont pas été touchées : seul le texte
posé dessus a été repris.

Trois variables de `base.css` ont été ajoutées pour recevoir les versions sombres :

| Variable | Valeur | Emploi |
|---|---|---|
| `--turquoise-texte` | `#266e6a` | texte et liens sur fond clair |
| `--turquoise-texte-hover` | `#1d5451` | survol des mêmes |
| `--marron-texte` | `#726156` | titres sur fond marron clair |

La variable `--gris-moyen` est passée de `#858585` à `#646464`.

Vingt-quatre déclarations de texte blanc posé sur un fond clair sont passées à
`var(--gris-fonce)`. Les deux couleurs d'icône d'état sont assombries, `#4CAF50` vers
`#2e7d32` et `#f44336` vers `#c62828`.

Cinq déclarations de texte blanc sont conservées, parce qu'elles ne sont pas en cause.
Elles posent toutes le texte sur un fond sombre que la mesure automatisée ne lit pas.

| Déclaration | Fond réel |
|---|---|
| `.prev` et `.next`, `style.css` l.504 | photographie du carrousel |
| `.destination-info`, `style.css` l.919 | dégradé noir de la carte |
| `.destination-name`, `style.css` l.926 | dégradé noir de la carte |
| `.icon-positive` et `.icon-negative`, `style.css` l.2077 | `#2e7d32` et `#c62828`, assombris pour l'occasion |
| `.skip-link`, `accessibilite.css` l.53 | `#000` |

Un sixième cas est conservé pour une autre raison. Le bouton désactivé de la section
voyageurs affiche `#999` sur `#f5f5f5`, couple qui ne passe pas le seuil AA. Le critère
WCAG 1.4.3 exclut explicitement les contrôles désactivés de son périmètre.

Méthode de choix des couleurs : l'indicateur de contraste du sélecteur de couleur des
outils de développement Chrome, qui signale directement si un couple texte et fond passe
le seuil AA.

Contrôle : le panneau Présentation du CSS de Chrome ne remonte plus de problème de
contraste, et le score d'accessibilité Lighthouse passe à 100 sur les cinq pages.

### 2.6 Débordement horizontal sur documentations.html

Les chaînes longues sans espace, `ANNEXE_TESTS_VALIDATION` et `RAPPORT_D_AMELIORATION`,
formaient un mot unique que le navigateur ne pouvait pas couper.

Deux propriétés sont ajoutées dans le bloc `<style>` de la page, lignes 62 et 104 :
`overflow-wrap: break-word` sur le titre et sur les libellés, et `min-width: 0` sur
l'élément flex qui les contient, sans quoi celui-ci refuse de se réduire sous la largeur
de son contenu.

Contrôle : au palier 280 pixels, le titre se répartit sur plusieurs lignes et les libellés
tiennent dans leurs cartes. Aucun défilement horizontal.

### 2.7 Performance de la page d'accueil

C'est la correction la plus longue. Quatre causes distinctes, traitées séparément.

**Images du carrousel.** Les trois diapositives étaient servies en pleine résolution,
quelle que soit la largeur de l'écran. Neuf variantes ont été produites, en 480, 768 et
1200 pixels de large, et déclarées en `srcset` avec `sizes="100vw"`. La première
diapositive porte `fetchpriority="high"`, les autres `loading="lazy"`. Cinquante images
du site reçoivent `loading="lazy"`.

**Dimensions des images.** Les attributs `width` et `height` sont renseignés sur les
diapositives et sur les cinq logos. Le navigateur réserve ainsi la place avant le
chargement, ce qui supprime le décalage de mise en page correspondant.

**Rapport de forme du carrousel.** Le conteneur `.hotel-carousel` reçoit
`aspect-ratio: 3 / 2`, `max-height: 640px` et `width: 100%`. Les trois déclarations vont
ensemble : sans `width`, le navigateur recalcule la largeur pour conserver le rapport une
fois la hauteur plafonnée, et l'image s'arrête au milieu de la page.

**Bibliothèques tierces.** Bootstrap, Bootstrap Icons et Flatpickr étaient chargés depuis
un CDN. Lighthouse facture près d'une seconde en profil mobile pour l'ouverture de
connexion vers une seconde origine, poignée de main TLS comprise, alors que le
téléchargement lui-même prend quelques dizaines de millisecondes. Les huit fichiers sont
désormais hébergés dans `assets/vendor/`, soit 800 Ko, et la seconde origine disparaît.
La feuille de Bootstrap Icons est passée de `font-display: block` à `swap`, pour que le
texte s'affiche sans attendre la police d'icônes.

Mesures sur index.html, profil mobile :

| Indicateur | Avant | Après |
|---|---|---|
| Score performance | 71 | 95 |
| Plus grande image affichée (LCP) | 10,9 s | 2,7 s |
| Premier affichage (FCP) | 2,5 s | 1,8 s |
| Décalage cumulé (CLS) | 0,057 | 0 |

### 2.8 Champ de formulaire sans `id` ni `name`

Le champ de recherche de l'en-tête n'avait ni `id` ni `name`. Il reçoit
`id="recherche-site"` et `name="q"`, et son icône décorative reçoit `aria-hidden="true"`
pour ne pas être annoncée.

### 2.9 Hauteur en `vh` sur contact.html

La règle `.contact-main` reposait sur `min-height: calc(100vh - 200px)`. L'unité `vh`
suit la hauteur de fenêtre, que la barre d'adresse des navigateurs mobiles modifie pendant
le défilement.

La règle déclare désormais les deux unités, dans cet ordre :

```css
min-height: calc(100vh - 200px);
min-height: calc(100dvh - 200px);
```

La seconde déclaration remplace la première sur les navigateurs qui connaissent `dvh`,
unité stable pendant le défilement. Les autres conservent `vh`. Aucune requête de
fonctionnalité n'est nécessaire.

### 2.10 Score SEO de la page d'accueil

Le score de 92 venait du contrôle « les liens ne sont pas explorables », qui portait sur
les deux flèches du carrousel, éléments `<a>` sans `href`. Leur passage en `<button>`,
décrit en 2.4, retire ces éléments du périmètre du contrôle.

---

## 3. Défauts découverts pendant la correction

Six défauts qui n'apparaissaient dans aucun score et qui ne figuraient pas dans la
campagne de tests. Ils ont été mis en évidence par la console du navigateur et par la
vérification manuelle menée après chaque correction.

### 3.1 Exception JavaScript sur booking.html

`reorganizeForMobile` appelait `insertBefore` sur l'élément `.col-lg-8` pour y déplacer le
récapitulatif avant la section Paiement. La section n'est pas un enfant direct de
`.col-lg-8`, elle se trouve un niveau plus bas, dans `.booking-form`. L'appel levait une
`NotFoundError`, et la réorganisation mobile ne s'effectuait pas.

L'appel porte désormais sur le parent réel de la section, lu dynamiquement :

```js
const conteneurCible = paymentSection.parentElement;
```

### 3.2 Exception JavaScript dans la traduction

`getTranslation` ne vérifiait pas son argument. Une clé absente ou mal orthographiée
levait une exception qui interrompait `applyTranslations`, donc la traduction de tout ce
qui suivait sur la page. Une seule clé fautive suffisait à laisser la moitié d'une page
non traduite.

La fonction sort désormais proprement sur un argument invalide, avec un message dans la
console, et la traduction du reste de la page se poursuit.

Un second défaut a été trouvé au même endroit : la lecture de l'attribut
`data-i18n-aria-label` était écrite `element.dataset.i18nAreaLabel`, avec `Area` au lieu
de `Aria`. La propriété valait toujours `undefined`, et aucun attribut `aria-label` n'a
jamais été traduit.

### 3.3 Repère `<main>` absent de la page d'accueil

Les quatre autres pages portaient un élément `<main>`. index.html n'en avait pas, alors
que son lien d'évitement pointait vers `#main-content`. Le lien ne menait nulle part.

L'élément est ajouté ligne 215, avec son identifiant.

### 3.4 Noms accessibles divergents

Trois boutons portaient un `aria-label` qui ne reprenait pas leur texte visible. Un
`aria-label` remplace le texte de l'élément dans le nom accessible : un utilisateur de
commande vocale qui prononce le mot affiché n'atteint pas le bouton. C'est le critère
WCAG 2.5.3, « étiquette dans le nom ».

| Bouton | Texte visible | Correction |
|---|---|---|
| Langue | FRANÇAIS (FR) | `aria-label` retiré, le nom accessible devient le texte visible |
| Monnaie | EURO (EUR) | `aria-label` retiré |
| Dyslexie | Dyslexie | `aria-label` réécrit, il commence par le texte visible |

Le bouton Dyslexie conserve un `aria-label` parce que son texte seul ne dit pas ce que le
bouton fait. Le libellé commence désormais par le mot affiché : « Dyslexie, activer la
police adaptée aux personnes dyslexiques ».

Le retrait de l'`aria-label` du bouton Langue a révélé une régression, corrigée dans la
même passe. Le bouton portait aussi un attribut `data-i18n`. Tant que l'`aria-label`
existait, le module de traduction traduisait l'attribut et laissait le texte tranquille.
Sans `aria-label`, il traduisait le texte, et écrasait le libellé que
`updateLanguageButton` venait d'écrire : le ruban affichait « PAYS » au lieu de
« FRANÇAIS (FR) ». L'attribut `data-i18n` a été retiré de ce bouton.

### 3.5 Zone tactile des points indicateurs

Les points indicateurs du carrousel mesuraient moins de 24 pixels de côté, en dessous du
seuil du critère WCAG 2.5.8.

La zone est portée à 24 pixels par 44 sans grossir le point visible, au moyen d'une
marge intérieure et de `background-clip` :

```css
box-sizing: border-box;
width: 24px;
height: 24px;
padding: 7px;
background-clip: content-box;
```

Le fond est dessiné dans la seule boîte de contenu, soit un point visible de 10 pixels,
tandis que la boîte cliquable en fait 24.

### 3.6 Décalage de mise en page du carrousel

Le score de performance de la page d'accueil oscillait entre deux valeurs d'une passe à
l'autre, avec un décalage cumulé soit nul, soit égal à 0,218.

La cause n'est pas la variabilité de la mesure. La valeur 0,218 se répétait identique
jusqu'à la seizième décimale, ce qui désigne une transition déterministe entre deux états
et non du bruit. Les trois diapositives étaient déclarées `display: none` dans la feuille
de style, et c'est `main.js`, chargé en `defer`, qui affichait la première. Entre le
premier affichage et l'exécution du script, le carrousel occupait une hauteur nulle, puis
sa hauteur réelle.

Une règle affiche la première diapositive dès le rendu initial, sans attendre le script :

```css
#hotelCarousel .hotel-slide:first-of-type {
  display: block;
  opacity: 1;
}
```

Le décalage cumulé est désormais nul et stable sur trois passes.

---

## 4. Mesures avant et après

Google Lighthouse, médiane de trois passes, espace de stockage vidé avant chaque passe.

| Page | Performance mobile | Performance desktop | Accessibilité |
|---|---|---|---|
| index.html | 71 vers 95 | 76 vers 98 | 95 vers 100 |
| room.html | 75 vers 90 | 97 vers 100 | 93 vers 100 |
| booking.html | 88 vers 97 | 100 vers 100 | 95 vers 100 |
| contact.html | 92 vers 97 | 100 vers 100 | 92 vers 100 |
| documentations.html | 93 vers 98 | 100 vers 100 | 96 vers 100 |

Validation du code :

| Contrôle | Avant | Après |
|---|---|---|
| Erreurs HTML, cinq pages | 27 | 0 |
| Erreurs CSS, quatre feuilles | 3 | 0 |

Accessibilité manuelle :

| Contrôle | Avant | Après |
|---|---|---|
| Éléments hors du parcours clavier sur index.html | 2 | 0 |
| Problèmes de contraste remontés sur index.html | 5 | 0 |

---

## 5. Points non corrigés

Un seul point reste ouvert, et il est connu.

Les liens de navigation secondaire portent `href="#"` et ne mènent à aucune page. Ils
sont au nombre de 142 sur les cinq pages, dont 23 appartiennent au bandeau et au pied de
page communs, répétés sur chaque page : sélecteurs de langue et de monnaie, liens
institutionnels, liens d'aide.

Ces liens correspondent à des pages hors du périmètre du projet, qui ne comporte que cinq
pages. Les supprimer appauvrirait la maquette, qui reproduit un site complet. Ils sont
donc conservés en l'état.

Ce choix n'affecte ni la validation du code, ni les scores d'accessibilité, ni les scores
de performance.

---

## 6. Synthèse

Les dix anomalies de la campagne de tests sont closes. Les six défauts découverts pendant
la correction le sont également.

Deux résultats méritent d'être relevés.

Les six défauts de la section 3 n'apparaissaient dans aucun score. Deux étaient des
exceptions JavaScript visibles seulement dans la console, trois relevaient de critères
d'accessibilité que l'audit automatisé ne contrôle pas, et le dernier était masqué par ce
qui ressemblait à de la variabilité de mesure. Ils confirment ce que la campagne de tests
avançait déjà en section 2.7 : un score n'est pas une vérification.

La correction du décalage de mise en page du carrousel est le cas le plus net. Le défaut
se présentait comme une instabilité de l'outil. Ce qui l'a démasqué n'est pas une mesure
supplémentaire, mais la lecture de la valeur elle-même : un nombre identique à la
seizième décimale d'une passe à l'autre ne peut pas être du bruit.