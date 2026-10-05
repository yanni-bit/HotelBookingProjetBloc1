# Preuves de la campagne de tests - Bloc 1

Artefacts produits lors de la campagne du 5 octobre 2026.
Le document de référence est `docs/TESTS.md`, qui renvoie à chacun de ces dossiers.

Toutes les mesures portent sur la version déployée du site,
https://yanni-bit.github.io/HotelBookingProjetBloc1/, et non sur une copie locale.

## Organisation

| Dossier          | Contenu                                                     | Outil                                                                |
| ---------------- | ----------------------------------------------------------- | -------------------------------------------------------------------- |
| `responsive/`    | 40 captures, 8 paliers sur chacune des 5 pages              | Responsively App 1.18.0                                              |
| `w3c-html/`      | 5 pages de résultats                                        | Nu Html Checker, moteur vnu 26.10.2                                  |
| `w3c-css/`       | 4 pages de résultats                                        | W3C CSS Validation Service, CSS niveau 3 + SVG                       |
| `lighthouse/`    | 10 rapports, une passe mobile et une passe desktop par page | Google Lighthouse                                                    |
| `accessibilite/` | 4 rapports d'audit, 2 exports CSV, 3 captures d'inspection  | audit Lighthouse 7.0.0 multi-pages et outils de développement Chrome |
| `clavier/`       | 11 captures de l'ordre de tabulation, 5 pages               | panneau Accessibilité de Firefox                                     |

## Convention de nommage des captures responsive

`responsive/<page>/<profil>-<largeur>.jpg`

Exemple : `responsive/index/P8-280.jpg` est la page d'accueil au profil P8,
largeur 280 pixels, palier CSS `max-width: 280px`.

La largeur en pixels de chaque image correspond exactement à la largeur du palier testé.
Le rapport de pixels a été fixé à 1 lors de la capture précisément pour cela : l'image
porte sa propre preuve, sans mesure ni légende supplémentaire.

Les images ont été recompressées pour tenir dans le dépôt. **Les dimensions sont
inchangées**, seule la qualité de compression a été réduite. Un redimensionnement aurait
détruit la valeur probante des captures.

## Rapports W3C

Les pages de résultats sont enregistrées avec leurs ressources, dans un dossier `_files`
voisin portant le même nom. Les deux doivent rester ensemble pour que la page s'affiche.
