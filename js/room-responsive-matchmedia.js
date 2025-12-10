// ==========================================================
// ROOM-RESPONSIVE-MATCHMEDIA.JS
// Utilisation de matchMedia au lieu de @media
// (plus propre, plus simple pour organiser les blocs de room.html)
// ==========================================================

/**
 * @file room-responsive-matchmedia.js
 * @description Gère la réorganisation de la colonne latérale (sidebar) de la page Room
 * en déplaçant les widgets AVANT la section des onglets pour le mode mobile (< 992px).
 */

document.addEventListener("DOMContentLoaded", function () {
  /** @const {MediaQueryList} */
  const mediaQuery = window.matchMedia("(max-width: 991px)");

  /**
   * @typedef {Object} OriginalPosition
   * @property {HTMLElement | null} parent - Parent original de l'élément.
   * @property {Node | null} nextSibling - Voisin suivant original pour la restauration.
   */

  /** @type {{[key: string]: OriginalPosition | null}} */
  const originalPositions = {
    hotelHeaderBox: null,
    pourquoiReserver: null,
    hotelsPopulaires: null,
    offreDuJour: null,
    aideContact: null,
  };

  /**
   * Récupère les éléments clés du DOM.
   * @returns {Object} Un objet contenant tous les éléments nécessaires.
   */
  function getElements() {
    const colLg9 = document.querySelector(".container > .row > .col-lg-9");
    const colLg3 = document.querySelector(".container > .row > .col-lg-3");
    const roomDetailsRow = document.querySelector(".col-lg-9 > .row");

    const hotelHeaderBox = document.querySelector(".hotel-header-box");
    const allAsides = document.querySelectorAll("aside.ordre"); // Widgets sidebar

    // Identifier les ASIDES par leur contenu
    let pourquoiReserver = null;
    let hotelsPopulaires = null;
    let offreDuJour = null;
    let aideContact = null;

    allAsides.forEach((aside) => {
      const title = aside.querySelector("h3, h6");
      if (title) {
        const titleText = title.textContent.trim();
        if (titleText.includes("Pourquoi réserver")) pourquoiReserver = aside;
        else if (titleText.includes("populaires")) hotelsPopulaires = aside;
        else if (titleText.includes("Offre du jour")) offreDuJour = aside;
        else if (titleText.includes("Aide & Contact")) aideContact = aside;
      }
    });

    return {
      colLg9,
      colLg3,
      roomDetailsRow,
      hotelHeaderBox,
      pourquoiReserver,
      hotelsPopulaires,
      offreDuJour,
      aideContact,
    };
  }

  /**
   * Sauvegarde la position originale des éléments pour la restauration Desktop.
   * @param {ReturnType<getElements>} elements - Les éléments du DOM.
   */
  function saveOriginalPositions(elements) {
    // NOTE: On ne sauve que si la position n'a pas déjà été sauvée
    if (!originalPositions.hotelHeaderBox && elements.hotelHeaderBox) {
      originalPositions.hotelHeaderBox = {
        parent: elements.hotelHeaderBox.parentElement,
        nextSibling: elements.hotelHeaderBox.nextSibling,
      };
    }
    // Les autres asides sont dans colLg3 et n'ont pas besoin de sauvegarde individuelle car colLg3 est restauré.
    // Sauf si l'aideContact est déplacé dans colLg9 sur desktop, ce qui n'est pas le cas dans le HTML fourni.
  }

  /**
   * Réorganise le DOM pour le mode mobile (< 992px).
   * Déplace les widgets de la sidebar (col-lg-3) dans la colonne principale (col-lg-9)
   * pour qu'ils apparaissent au-dessus des onglets de détails.
   * @param {ReturnType<getElements>} elements - Les éléments du DOM.
   */
  function reorganizeForMobile(elements) {
    const {
      colLg9,
      roomDetailsRow,
      hotelHeaderBox,
      pourquoiReserver,
      hotelsPopulaires,
      offreDuJour,
      aideContact,
    } = elements;

    if (!colLg9 || !roomDetailsRow) return;

    saveOriginalPositions(elements);

    // 1. Déplacer l'en-tête de l'hôtel (hotel-header-box) en haut de col-lg-9
    if (hotelHeaderBox && hotelHeaderBox.parentElement !== colLg9) {
      colLg9.insertBefore(hotelHeaderBox, roomDetailsRow);
    }

    // 2. Déplacer les autres widgets à la fin de col-lg-9
    // NOTE: La logique originale du fichier était de déplacer les ASIDES dans colLg9,
    // ce qui n'est pas nécessaire si les ASIDES sont déjà dans le DOM.
    // L'objectif est de déplacer les éléments qui étaient en col-lg-3.

    // Le HTML fourni met:
    // col-lg-9 : Galerie + Onglets
    // col-lg-3 : hotel-header-box + PourquoiReserver + HotelsPopulaires + OffreDuJour

    // Sur mobile, nous voulons (dans col-lg-9) :
    // - hotel-header-box (Déjà déplacé en 1)
    // - Galerie (reste)
    // - Onglets (reste)
    // - PourquoiReserver, HotelsPopulaires, OffreDuJour (déplacés)

    // Nous devons donc déplacer les éléments de colLg3 (sauf le header box qui est déjà géré):

    if (pourquoiReserver && pourquoiReserver.parentElement !== colLg9) {
      colLg9.appendChild(pourquoiReserver);
    }

    if (hotelsPopulaires && hotelsPopulaires.parentElement !== colLg9) {
      colLg9.appendChild(hotelsPopulaires);
    }

    if (offreDuJour && offreDuJour.parentElement !== colLg9) {
      colLg9.appendChild(offreDuJour);
    }

    // NOTE: L'aideContact reste à sa place d'origine (dans la colonne des onglets)
    // dans la structure HTML fournie.
  }

  /**
   * Restaure la disposition Desktop (widgets reviennent dans col-lg-3).
   * @param {ReturnType<getElements>} elements - Les éléments du DOM.
   */
  function restoreDesktopLayout(elements) {
    const {
      hotelHeaderBox,
      pourquoiReserver,
      hotelsPopulaires,
      offreDuJour,
      aideContact,
    } = elements;

    /**
     * Helper pour restaurer un élément à sa position originale si elle a été sauvegardée.
     * @param {HTMLElement | null} element - L'élément à restaurer.
     * @param {string} positionKey - La clé dans originalPositions.
     */
    function restoreElement(element, positionKey) {
      if (element && originalPositions[positionKey]) {
        const origPos = originalPositions[positionKey];
        if (element.parentElement !== origPos.parent) {
          if (origPos.nextSibling) {
            origPos.parent.insertBefore(element, origPos.nextSibling);
          } else {
            origPos.parent.appendChild(element);
          }
        }
      }
    }

    // Rétablir l'ordre du col-lg-3 (qui est la colonne par défaut pour ces éléments)
    restoreElement(hotelHeaderBox, "hotelHeaderBox");
    restoreElement(pourquoiReserver, "pourquoiReserver");
    restoreElement(hotelsPopulaires, "hotelsPopulaires");
    restoreElement(offreDuJour, "offreDuJour");
    restoreElement(aideContact, "aideContact");
  }

  /**
   * Gestionnaire principal des changements de taille d'écran.
   * @param {MediaQueryListEvent} e - L'événement de changement de média query.
   */
  function handleMediaQueryChange(e) {
    const elements = getElements();

    if (e.matches) {
      // Écran < 992px : mode mobile
      reorganizeForMobile(elements);
    } else {
      // Écran >= 992px : mode desktop
      restoreDesktopLayout(elements);
    }
  }

  // Exécuter au chargement initial
  handleMediaQueryChange(mediaQuery);

  // Écouter les changements de media query
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener("change", handleMediaQueryChange);
  } else {
    // Fallback pour anciens navigateurs
    mediaQuery.addListener(handleMediaQueryChange);
  }
});
