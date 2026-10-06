// ==========================================================
// BOOKING-RESPONSIVE-MATCHMEDIA.JS
// Utilisation de matchMedia pour réorganiser le récapitulatif
// Le récapitulatif doit apparaître avant la section Paiement en mobile
// ==========================================================

/**
 * @file booking-responsive-matchmedia.js
 * @description Utilise matchMedia pour réorganiser le récapitulatif de réservation
 * afin qu'il apparaisse avant la section Paiement sur les écrans mobiles (< 992px).
 */

document.addEventListener("DOMContentLoaded", function () {
  /** @const {MediaQueryList} */
  const mediaQuery = window.matchMedia("(max-width: 991px)");

  /**
   * @typedef {Object} OriginalPosition
   * @property {HTMLElement | null} parent - Parent original de l'élément.
   * @property {Node | null} nextSibling - Voisin suivant original pour la restauration.
   */

  /** @type {{recapitulatif: OriginalPosition | null}} */
  const originalPosition = {
    recapitulatif: null,
  };

  /**
   * Récupère les éléments clés du DOM.
   * @returns {{bookingForm: HTMLElement | null, recapitulatif: HTMLElement | null, paymentSection: HTMLElement | null}}
   */
  function getElements() {
    const bookingForm = document.querySelector(".booking-form");
    // NOTE: L'élément récapitulatif est le col-lg-4 (colonne)
    const recapitulatif =
      document.querySelector(".booking-summary")?.parentElement;
    const paymentSection = document.querySelector(".form-section:nth-child(4)"); // Section 4 : Paiement

    return {
      bookingForm,
      recapitulatif,
      paymentSection,
    };
  }

  /**
   * Sauvegarde la position originale du récapitulatif dans la structure HTML.
   * @param {ReturnType<getElements>} elements - Les éléments du DOM.
   */
  function saveOriginalPosition(elements) {
    if (elements.recapitulatif && !originalPosition.recapitulatif) {
      originalPosition.recapitulatif = {
        parent: elements.recapitulatif.parentElement,
        nextSibling: elements.recapitulatif.nextSibling,
      };
    }
  }

  /**
   * Réorganise le DOM pour le mode mobile (déplace le récapitulatif).
   * @param {ReturnType<getElements>} elements - Les éléments du DOM.
   */
  function reorganizeForMobile(elements) {
    const { bookingForm, recapitulatif, paymentSection } = elements;

    if (!bookingForm || !recapitulatif || !paymentSection) return;

    saveOriginalPosition(elements);

    /* Le recapitulatif doit se placer juste avant la section Paiement.
       insertBefore s'appelle sur le parent reel de cette section, soit le
       formulaire. L'appeler sur .col-lg-8 levait une NotFoundError : la
       section n'en est pas un enfant direct, elle se trouve un niveau plus
       bas, a l'interieur de .booking-form. */
    const conteneurCible = paymentSection.parentElement;

    if (recapitulatif.nextElementSibling !== paymentSection) {
      conteneurCible.insertBefore(recapitulatif, paymentSection);
    }
  }

  /**
   * Restaure la disposition Desktop.
   * @param {ReturnType<getElements>} elements - Les éléments du DOM.
   */
  function restoreDesktopLayout(elements) {
    const { recapitulatif } = elements;

    if (recapitulatif && originalPosition.recapitulatif) {
      const origPos = originalPosition.recapitulatif;
      if (recapitulatif.parentElement !== origPos.parent) {
        // Insérer l'élément à sa position originale (voisin du formulaire)
        if (origPos.nextSibling) {
          origPos.parent.insertBefore(recapitulatif, origPos.nextSibling);
        } else {
          origPos.parent.appendChild(recapitulatif);
        }
      }
    }
  }

  /**
   * Gestionnaire pour les changements de média query.
   * @param {MediaQueryListEvent} e - L'événement de changement de média query.
   */
  function handleMediaQueryChange(e) {
    const elements = getElements();

    // NOTE: La logique du fichier booking-responsive.js (non fourni) est de réorganiser
    // le récapitulatif (col-lg-4) DANS le formulaire (col-lg-8) pour le mobile.
    if (e.matches) {
      reorganizeForMobile(elements);
    } else {
      restoreDesktopLayout(elements);
    }
  }

  // Exécuter au chargement initial
  handleMediaQueryChange(mediaQuery);

  // Écouter les changements de media query
  if (mediaQuery.addEventListener) {
    /**
     * Écoute les changements de breakpoint responsive (mobile ↔ desktop).
     * @listens MediaQueryList#change
     */
    mediaQuery.addEventListener("change", handleMediaQueryChange);
  } else {
    mediaQuery.addListener(handleMediaQueryChange);
  }
});
