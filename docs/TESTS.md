# Tests et validation - Hôtel Booking

## Introduction

Ce document consigne la campagne de tests menée sur l'application web de réservation
Book Your Travel, dans le cadre du Bloc 1 du référentiel RNCP Développeur Web.

Il décrit ce qui a été testé, avec quel outil, selon quelle méthode, et quels résultats
ont été obtenus. Il rend compte de l'état du site **au moment des tests**, sans correction.
Les corrections apportées ensuite et leurs preuves font l'objet d'un document distinct,
`RAPPORT_D_AMELIORATION.md`.

### Périmètre

| Élément | Valeur |
|---|---|
| Application testée | Book Your Travel, front-end HTML5 / CSS3 / JavaScript |
| Adresse testée | https://yanni-bit.github.io/HotelBookingProjetBloc1/ |
| Environnement | version déployée sur GitHub Pages, et non copie locale |
| Pages couvertes | index.html, room.html, booking.html, contact.html, documentations.html |
| Date de la campagne | 5 octobre 2026 |

Le choix de tester la version déployée plutôt qu'une copie locale est délibéré : les
rapports produits portent l'adresse publique, ce qui les rend vérifiables par un tiers.

### Exigences couvertes

Le cahier des charges du projet définit trois familles de tests pour le Bloc 1 :

| Exigence du cahier des charges | Section de ce document |
|---|---|
| Tests de responsivité, affichage sur différentes tailles d'écran et navigateurs | 1 |
| Tests d'accessibilité, Lighthouse et d'autres outils, normes WCAG et RGAA | 2 |
| Tests de performance, vitesse de chargement et optimisation des ressources | 3 |

La section 4, validation du code par les validateurs W3C, dépasse ce que le cahier des
charges demande. Elle a été menée parce que le référentiel exige que le code respecte
les normes du W3C et que le validateur s'exécute avec succès.

---

## Méthodologie

### Outils retenus

| Outil | Version | Axe testé | Production |
|---|---|---|---|
| Google Lighthouse | intégré à Chrome | performance, accessibilité, bonnes pratiques, SEO | rapport HTML par page et par profil |
| Responsively App | 1.18.0 | tailles d'écran, paliers CSS | captures d'écran par profil |
| Outils de développement Chrome | Chrome 141 | arborescence d'accessibilité, contrastes, problèmes de page | captures d'écran |
| Outils de développement Firefox | Firefox 143 | ordre de tabulation | captures d'écran |
| Samsung Galaxy S24+ | Chrome Android | rendu sur appareil mobile réel | navigation directe |
| Audit Lighthouse multi-pages en ligne | moteur Lighthouse 7.0.0, exécution Node | accessibilité seule, sur 12 URL | rapport HTML par page et export CSV |
| Nu Html Checker, validator.w3.org/nu | moteur vnu 26.10.2 | conformité HTML5 | page de résultats par page |
| W3C CSS Validation Service, jigsaw.w3.org | profil CSS niveau 3 + SVG | conformité CSS | page de résultats par feuille |

Chaque outil couvre un axe que les autres ne couvrent pas. Les sections qui suivent
indiquent, pour chacun, ce qu'il mesure et ce qu'il a donné.

### Conservation des preuves

Chaque test a produit un artefact conservé : rapport HTML, export CSV ou capture d'écran.
L'ensemble est rangé dans `docs/tests/`, organisé par axe puis par page.

| Dossier | Contenu | Volume |
|---|---|---|
| `docs/tests/responsive/` | captures Responsively, un sous-dossier par page | 40 fichiers |
| `docs/tests/w3c-html/` | pages de résultats du Nu Html Checker et leurs ressources | 5 rapports |
| `docs/tests/w3c-css/` | pages de résultats du validateur CSS et leurs ressources | 4 rapports |
| `docs/tests/lighthouse/` | rapports Lighthouse, mobile et desktop | 10 fichiers |
| `docs/tests/accessibilite/` | rapports de l'audit multi-pages, exports CSV, captures d'inspection Chrome | 4 rapports, 2 CSV, 3 captures |
| `docs/tests/clavier/` | captures de l'ordre de tabulation, 5 pages | 11 fichiers |

Les captures responsive suivent la convention `responsive/<page>/<profil>-<largeur>.jpg`.
La largeur du nom correspond à la largeur réelle de l'image, elle-même égale à la largeur
du palier testé. Les images ont été recompressées pour tenir dans le dépôt, sans aucun
redimensionnement : réduire les dimensions aurait détruit leur valeur probante.

L'audit multi-pages a parcouru douze adresses mais produit quatre rapports distincts,
la page d'accueil étant atteinte par deux URL qui renvoient le même document.

---

## 1. Tests de responsivité

### 1.1 Deux axes

La responsivité se vérifie sur deux axes distincts : la taille d'écran, traitée en 1.2
et 1.3, et le moteur de rendu, traité en 1.4.

### 1.2 Méthode pour les tailles d'écran

Les tailles ont été couvertes avec Responsively App, en créant huit profils
d'appareils sur mesure, chacun calé sur un palier réel du CSS du projet. Cette méthode
a un avantage que les profils génériques n'ont pas : **chaque capture correspond à une
media query identifiable dans le code**, et non à un appareil choisi au hasard.

Le rapport de pixels est fixé à 1 sur les huit profils. La largeur en pixels de chaque
image correspond donc exactement à la largeur du palier testé, ce qui rend la preuve
lisible sans mesure supplémentaire.

| Profil | Largeur | Hauteur | Type déclaré | Palier CSS couvert |
|---|---|---|---|---|
| P1 Desktop XL | 1440 | 900 | ordinateur | `min-width: 1200px` |
| P2 Desktop | 1100 | 800 | ordinateur | 992 à 1199px |
| P3 Tablette | 900 | 1000 | tablette tactile | 768 à 991px |
| P4 Grand mobile | 650 | 900 | tablette tactile | 576 à 767px |
| P5 Mobile moyen | 480 | 850 | mobile tactile | 391 à 575px |
| P6 Petit mobile | 375 | 812 | mobile tactile | 360 à 390px |
| P7 Très petit mobile | 320 | 568 | mobile tactile | `max-width: 359px` |
| P8 Minimum | 280 | 600 | mobile tactile | `max-width: 280px` |

Les profils P3 à P8 sont déclarés tactiles, ce qui active la media query
`(hover: none) and (pointer: coarse)` et permet de vérifier que les zones tactiles
respectent le minimum de 44 pixels. Les profils P1 et P2 ne le sont pas, ce qui vérifie
par contraste que cette règle reste inactive sur écran de bureau.

Chacune des cinq pages a été chargée successivement dans les huit profils, avec capture
simultanée. Quarante captures au total.

Le dépouillement privilégie le palier le plus contraint. Une mise en page qui tient à 280
pixels tient au-dessus : les débordements horizontaux, les textes tronqués et les
chevauchements apparaissent d'abord à la largeur la plus faible. L'examen a donc porté sur
les huit captures du profil P8 pour les cinq pages, complété par un contrôle du seuil au
profil P7 sur la page en défaut, et par un contrôle de cohérence au profil P3 sur la page
la plus dense.

### 1.3 Résultats par page

| Page | Verdict | Observation |
|---|---|---|
| index.html | conforme | mise en page en colonne unique à partir du profil P4, aucun débordement jusqu'à 280 pixels |
| room.html | conforme | galerie, onglets et barre latérale s'empilent correctement, aucun débordement |
| booking.html | conforme | le formulaire en cinq étapes et le récapitulatif s'empilent, aucun débordement |
| contact.html | conforme | voir la réserve technique ci-dessous |
| documentations.html | **anomalie à 280 pixels** | titre principal tronqué et libellés de fichiers débordant de leurs cartes |

### 1.3.1 Anomalie sur documentations.html

Au profil P8, largeur 280 pixels, deux débordements horizontaux apparaissent :

| Élément | Comportement constaté |
|---|---|
| Titre `Documentation Technique du Projet` | le mot « Documentation » dépasse la largeur disponible et se trouve amputé de sa dernière lettre |
| Libellés `ANNEXE_TESTS_VALIDATION` et `RAPPORT_D_AMELIORATION` | le texte sort de sa carte et pousse l'icône de lien externe hors du cadre |

La cause est la même dans les deux cas : des chaînes longues sans espace, que le navigateur
ne peut pas couper. Les noms de fichiers en majuscules reliés par des tirets bas forment un
mot unique du point de vue du moteur de rendu.

Le seuil a été vérifié : au profil P7, largeur 320 pixels, la page s'affiche correctement.
Le titre se répartit sur trois lignes et les libellés tiennent dans leurs cartes.
L'anomalie ne concerne donc que le palier `max-width: 280px`.

### 1.3.2 Réserve technique sur contact.html

Les captures de contact.html se terminent par une zone vide suivie d'aucun pied de page,
alors que celui-ci est bien présent et accessible au clavier, comme le montre le relevé
de la section 2.6 qui y numérote vingt éléments.

L'explication tient à une règle de `style.css` :

```css
.contact-main {
  min-height: calc(100vh - 200px);
}
```

L'outil de capture pleine page porte temporairement la hauteur de la fenêtre à celle du
document entier pour photographier la page d'un seul tenant. L'unité `vh` suit cette
hauteur, `.contact-main` s'étire d'autant, et le pied de page se retrouve repoussé hors
du cadre photographié.

Il s'agit donc d'un effet de l'instrument de mesure, et non d'un défaut d'affichage pour
l'utilisateur. La règle elle-même mérite cependant d'être réexaminée : l'unité `vh` est
connue pour être instable sur mobile, où la barre d'adresse des navigateurs modifie la
hauteur de fenêtre pendant le défilement.


### 1.4 Compatibilité entre navigateurs

Chaque environnement testé représente un moteur de rendu différent.

| Environnement | Moteur de rendu | Méthode | Résultat |
|---|---|---|---|
| Google Chrome 141, Windows | Blink | navigation et inspection des outils de développement | rendu conforme |
| Mozilla Firefox 143, Windows | Gecko | navigation et relevé de l'ordre de tabulation | rendu conforme |
| Samsung Galaxy S24+, Chrome Android | Blink mobile | navigation réelle sur appareil personnel | rendu conforme |

Les relevés des sections 2.4 et 2.6 constituent une vérification croisée sur les mêmes
pages : l'arborescence d'accessibilité est inspectée sous Chrome, l'ordre de tabulation
sous Firefox, et les deux moteurs exposent la même structure.

---

## 2. Tests d'accessibilité

Le cahier des charges demande « Google Lighthouse **et d'autres outils** d'accessibilité ».
Quatre outils ont donc été employés, chacun pour ce que les autres ne voient pas.

### 2.1 Pourquoi quatre outils

| Outil | Ce qu'il voit | Ce qu'il ne voit pas |
|---|---|---|
| Lighthouse | un sous-ensemble automatisable des critères WCAG | tout ce qui demande un jugement humain |
| Audit multi-pages | les mêmes critères, mais sur tout le site d'un coup | idem |
| Arborescence d'accessibilité Chrome | ce qu'un lecteur d'écran reçoit réellement | la qualité de l'expérience |
| Ordre de tabulation Firefox | le parcours clavier réel et son ordre | le reste |

Un audit automatisé ne couvre qu'une partie des critères WCAG. Les deux derniers outils
sont une vérification manuelle, c'est ce qui fait la différence entre un score et une
véritable vérification d'accessibilité.

### 2.2 Lighthouse, par page

| Page | Score accessibilité |
|---|---|
| index.html | 95 |
| room.html | 93 |
| booking.html | 95 |
| contact.html | 92 |
| documentations.html | 96 |

### 2.3 Audit multi-pages

Outil : service en ligne exécutant le moteur Lighthouse 7.0.0 en mode Node, restreint à la
seule catégorie accessibilité, avec export CSV des scores et des défauts.

L'intérêt par rapport au Lighthouse de la section 2.2 n'est pas le moteur, qui est le même,
mais le périmètre : l'audit parcourt le site entier d'un seul lancement, pages de
documentation publiées comprises, soit douze adresses au lieu de cinq.

| Page | Score | Critères réussis | Critères échoués |
|---|---|---|---|
| index.html | 98 | 23 | 1 |
| room.html | 98 | 24 | 1 |
| booking.html | 97 | 22 | 2 |
| contact.html | 95 | 22 | 3 |
| documentations.html | 98 | 23 | 1 |
| docs/README.html | 93 | 10 | 1 |
| docs/CHOIX_TECHNIQUES.html | 93 | 8 | 1 |
| docs/RESPONSIVE.html | 94 | 12 | 1 |
| docs/ACCESSIBILITE.html | 93 | 10 | 1 |
| docs/ANNEXE_MATCHMEDIA.html | 93 | 10 | 1 |
| docs/ARCHITECTURE.html | mesure incohérente | 8 | 0 |

Sur l'ensemble du périmètre, deux défauts seulement sont remontés :

| Défaut | Pages concernées |
|---|---|
| Contraste insuffisant entre le texte et son fond | index, room, documentations et les cinq pages de documentation |
| Titres non ordonnés séquentiellement | contact, booking |

La ligne `docs/ARCHITECTURE.html` affiche un score nul pour huit critères réussis et
aucun critère échoué. Un score nul sans critère en échec n'est pas cohérent : il s'agit
d'un défaut de mesure de l'outil sur cette page, et non d'un résultat exploitable.

### 2.4 Inspection de l'arborescence d'accessibilité

Outil : panneau Accessibilité des outils de développement Chrome, sur index.html.

L'arborescence expose correctement la structure attendue par un lecteur d'écran :
le lien d'évitement vers le contenu principal, la bannière, la navigation principale,
les libellés de champs et les noms accessibles des contrôles.

Vérification ponctuelle, bouton d'activation de la police dyslexie :

| Propriété | Valeur exposée |
|---|---|
| Rôle | `button` |
| Nom accessible | « Activer la police adaptée aux personnes dyslexiques » |
| État `aria-pressed` | `false` |

Le nom accessible est complet et explicite, et non le simple texte visible « Dyslexie ».
C'est le comportement recherché pour le critère Cr 1.c.1.

Le panneau Problèmes de la même page remonte par ailleurs :

| Type | Message | Source |
|---|---|---|
| Erreur | une règle `@import` a été ignorée car elle n'est pas déclarée en tête de feuille de style | `css/base.css:71` |
| Amélioration | un champ de formulaire n'a ni attribut `id` ni attribut `name` | index.html |

La règle `@import` ignorée est un défaut réel et non un avertissement de confort :
la feuille concernée n'est pas chargée du tout.

### 2.5 Contrastes de couleurs

Outil : panneau Présentation du CSS des outils de développement Chrome, sur index.html.

| Mesure | Valeur |
|---|---|
| Couleurs d'arrière-plan distinctes | 7 |
| Couleurs de texte distinctes | 7 |
| Couleurs de bordure distinctes | 11 |
| Problèmes de contraste détectés | 5 |

Ces cinq problèmes sont la contrepartie chiffrée du défaut de contraste remonté par
l'audit automatisé en 2.3. Deux outils indépendants pointent le même défaut.

### 2.6 Navigation au clavier

Outil : option « Afficher l'ordre de tabulation » du panneau Accessibilité de Firefox.
Cette option numérote directement sur la page chaque élément atteignable au clavier,
dans son ordre de tabulation réel.

| Page | Éléments atteignables au clavier | Ordre conforme à la lecture visuelle |
|---|---|---|
| index.html | 62 | oui |
| room.html | 53 | oui |
| booking.html | 64 | oui |
| contact.html | 50 | oui |
| documentations.html | 40 | oui |

Les cinq pages sont relevées. Sur chacune, le parcours suit l'ordre visuel de lecture :
en-tête, navigation principale, fil d'Ariane, contenu principal, pied de page. Aucun saut
d'ordre n'est constaté, et aucun piège au clavier n'a été rencontré.

Le volume varie de 40 à 64 éléments selon la densité de la page, ce qui est cohérent :
documentations.html n'offre que des liens, booking.html ajoute un formulaire de cinq étapes.

### 2.6.1 Éléments non atteignables au clavier

Le relevé met en évidence une absence sur index.html. Les deux flèches du carrousel
principal, visibles de part et d'autre de la bannière, ne portent **aucun numéro**. Elles
sont donc hors du parcours clavier.

L'arborescence d'accessibilité confirme le diagnostic. Les deux éléments y apparaissent
ainsi :

```
link "Précédent"
  StaticText "<"
link "Suivant"
  StaticText ">"
```

Aucun des deux ne porte la mention `focusable: true`, contrairement à tous les autres liens
de la page. Ce sont des éléments `<a>` dépourvus d'attribut `href`, ce qui les exclut de
l'ordre de tabulation naturel.

Trois sources convergent sur ce même point : le validateur W3C le signale comme erreur de
balisage en section 4.1, le relevé clavier montre l'absence de numéro, et l'arborescence
d'accessibilité montre l'absence de focalisation. Un utilisateur au clavier ne peut pas
faire défiler le carrousel.

### 2.7 Défaut confirmé par recoupement

Les sauts de niveaux de titre sur booking.html et contact.html sont remontés à la fois
par l'audit d'accessibilité en 2.3 et par le validateur HTML du W3C en 4.1. Deux outils
sans rapport entre eux signalent le même défaut au même endroit : il est confirmé.

---

## 3. Tests de performance

Outil : Google Lighthouse. Une passe en profil mobile et une passe en profil desktop
par page, soit dix mesures.

Le double profil est nécessaire : Lighthouse simule en mobile un réseau et un processeur
volontairement dégradés. Un écart important entre les deux colonnes désigne le poids des
ressources, un score bas dans les deux désigne autre chose.

### 3.1 Résultats

| Page | Performance mobile | Performance desktop | Bonnes pratiques mobile | Bonnes pratiques desktop | SEO |
|---|---|---|---|---|---|
| index.html | 71 | 76 | 96 | 100 | 92 |
| room.html | 75 | 97 | 92 | 96 | 100 |
| booking.html | 88 | 100 | 92 | 100 | 100 |
| contact.html | 92 | 100 | 92 | 96 | 100 |
| documentations.html | 93 | 100 | 96 | 100 | 100 |

### 3.2 Lecture des résultats

Quatre pages sur cinq atteignent ou approchent 100 en desktop et restent au-dessus de 75
en mobile.

La page d'accueil se distingue sur deux points :

- elle est la plus basse des deux côtés, 71 en mobile et 76 en desktop
- elle est la seule dont le score desktop ne décolle pas

Ce second point est le plus parlant. Sur room.html, l'écart de 75 à 97 entre mobile et
desktop indique un poids de ressources que le réseau simulé pénalise. Sur index.html,
l'absence d'écart indique que le frein ne vient pas du réseau simulé mais de la page
elle-même.

La page d'accueil est également la seule à ne pas atteindre 100 en SEO, avec 92.

---

## 4. Validation du code

Cette section dépasse les tests demandés par le cahier des charges. Elle est menée parce
que le référentiel exige le respect des normes du W3C et l'exécution du validateur
avec succès.

### 4.1 Validation HTML

Outil : Nu Html Checker, validator.w3.org/nu, moteur vnu 26.10.2.
C'est le moteur officiel du W3C, invoqué en validation par adresse sur les pages déployées.

| Page | Erreurs |
|---|---|
| index.html | 8 |
| room.html | 10 |
| booking.html | 8 |
| contact.html | 1 |
| documentations.html | 0 |
| **Total** | **27** |

Les vingt-sept erreurs se répartissent en six familles seulement. Le nombre d'erreurs
est élevé, mais le nombre de causes est faible : chaque famille se corrige par un seul
geste répété.

| Famille | Occurrences | Pages et lignes |
|---|---|---|
| Élément `h5` ou `div` interdit comme enfant de `label` | 11 | index l.305, 324, 332, 353, 361, 369 et booking l.440, 460, 479, 499, 519 |
| Valeur `type="button"` invalide sur un élément `a` | 5 | room l.459, 466, 473, 479, 485 |
| Attribut `aria-label` interdit sans rôle explicite | 5 | index l.233, 234 et room l.692, 693, 694 |
| Saut de niveaux de titre | 4 | booking l.358, 651, 715 et contact l.301 |
| Attribut `aria-labelledby` interdit sur un `div` sans rôle | 1 | room l.1506 |
| Attribut `src` vide sur un élément `img` | 1 | room l.1519 |

Deux observations méritent d'être relevées.

Les deux occurrences de la troisième famille sur index.html concernent les flèches du
carrousel. Ces éléments sont des `<a>` sans attribut `href` : ils ne sont donc pas
atteignables au clavier. Une erreur de validation et un défaut d'accessibilité réel se
superposent au même endroit.

La quatrième famille, les sauts de niveaux de titre, est le défaut déjà remonté par
l'audit d'accessibilité en 2.3.

### 4.2 Validation CSS

Outil : W3C CSS Validation Service, jigsaw.w3.org, profil CSS niveau 3 avec SVG.
Les quatre feuilles de style du projet ont été validées séparément.

| Feuille | Erreurs | Avertissements | Verdict |
|---|---|---|---|
| base.css | 0 | 0 | conforme |
| accessibilite.css | 0 | 2 | conforme |
| responsive.css | 0 | 1 | conforme |
| style.css | 3 | 28 | non conforme au moment des tests |

Les trois erreurs sont une seule et même erreur répétée : la propriété `border-color`
déclarée avec une variable CSS, que le validateur n'analyse pas statiquement.

| Ligne | Sélecteur | Valeur déclarée |
|---|---|---|
| 374 | `.ribbon::before` | `var(--turquoise) transparent transparent transparent` |
| 388 | `.ribbon::after` | `var(--turquoise) transparent transparent transparent` |
| 1490 | `.sidebar-nav a.nav-link.active::after` | `transparent transparent transparent var(--turquoise)` |

La grande majorité des avertissements de style.css porte la mention « En raison de leur
nature dynamique, les variables CSS ne sont pas vérifiées statiquement ». C'est une limite
du validateur face aux variables CSS, et non un défaut du code.

Les avertissements qui relèvent effectivement du code :

| Feuille | Ligne | Message |
|---|---|---|
| accessibilite.css | 13 | la propriété `clip` est déconseillée |
| accessibilite.css | 138 | `#toggle-dyslexie.active` : `background-color` et `border-color` identiques |
| style.css | 1245 | `.flatpickr-day.endRange` : `background-color` et `border-color` identiques |
| style.css | 1738 | `-ms-overflow-style` est une extension propriétaire |
| style.css | 1741 | le pseudo-élément `::-webkit-scrollbar` est une extension propriétaire |

Les deux dernières lignes sont des préfixes propriétaires employés volontairement pour
styliser les barres de défilement. Elles sont signalées pour information et ne constituent
pas des erreurs.

---

## 5. Synthèse

### 5.1 Verdict par axe

| Axe | Outil principal | Verdict |
|---|---|---|
| Responsivité, tailles d'écran | Responsively App | 8 paliers sur 5 pages, 1 anomalie à 280 pixels |
| Responsivité, navigateurs | Chrome, Firefox, appareil mobile réel | rendu conforme sur Blink et Gecko |
| Accessibilité automatisée | Lighthouse et audit multi-pages | 92 à 98 selon les pages |
| Accessibilité manuelle | outils de développement Chrome et Firefox | structure conforme, 2 éléments hors du parcours clavier |
| Performance | Lighthouse | conforme, sauf la page d'accueil |
| Validation HTML | Nu Html Checker | 27 erreurs, non conforme au moment des tests |
| Validation CSS | W3C CSS Validator | 3 erreurs sur une feuille, non conforme au moment des tests |

### 5.2 Anomalies relevées

Liste complète des défauts constatés, classés par priorité de correction.

| Priorité | Anomalie | Volume | Section |
|---|---|---|---|
| 1 | Erreurs de validation HTML | 27, en 6 familles | 4.1 |
| 2 | Erreurs de validation CSS | 3, toutes identiques | 4.2 |
| 3 | Règle `@import` mal placée, la feuille n'est pas chargée | 1 | 2.4 |
| 4 | Flèches du carrousel non atteignables au clavier | 2 | 2.6.1 et 4.1 |
| 5 | Contraste insuffisant | 5 occurrences sur index.html | 2.5 |
| 6 | Débordement horizontal sur documentations.html à 280 pixels | 3 éléments | 1.3.1 |
| 7 | Performance de la page d'accueil | mobile 71, desktop 76 | 3.2 |
| 8 | Champ de formulaire sans `id` ni `name` | 1 | 2.4 |
| 9 | Hauteur en `vh` sur contact.html, unité instable sur mobile | 1 règle | 1.3.2 |
| 10 | Score SEO de la page d'accueil | 92 | 3.1 |

Les anomalies 1, 2 et 4 conditionnent directement la conformité attendue par le
référentiel. Elles sont traitées en priorité.

### 5.3 Conclusion de la campagne

La campagne couvre les trois familles de tests demandées par le cahier des charges et y
ajoute la validation du code par les validateurs officiels du W3C.

Les tests d'accessibilité, de responsivité et de performance donnent des résultats
satisfaisants dans l'ensemble. Trois réserves : la performance de la page d'accueil,
un débordement horizontal sur documentations.html au palier le plus étroit, et deux
éléments du carrousel hors du parcours clavier.

Ce dernier point est le plus instructif de la campagne. Il n'apparaît dans aucun score :
Lighthouse donne 95 à index.html et l'audit multi-pages 98. Il n'a été mis en évidence que
par la vérification manuelle du parcours clavier, recoupée avec l'arborescence
d'accessibilité et le validateur W3C. C'est la justification concrète du choix d'employer
quatre outils d'accessibilité plutôt qu'un seul.

La validation du code révèle en revanche des non-conformités qui doivent être corrigées :
vingt-sept erreurs HTML et trois erreurs CSS. Ces erreurs n'affectent pas le rendu visuel
du site, ce qui explique qu'elles n'aient pas été détectées pendant le développement,
mais elles empêchent le validateur de s'exécuter avec succès.

Les corrections apportées à la suite de cette campagne, et les contrôles qui les valident,
sont consignés dans `RAPPORT_D_AMELIORATION.md`.