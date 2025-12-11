// ==========================================================
// BOOKING-RESPONSIVE-MATCHMEDIA.JS
// Utilisation de matchMedia pour réorganiser le récapitulatif
// Le récapitulatif doit apparaître avant la section Paiement en mobile
// ==========================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Créer un media query
  const mediaQuery = window.matchMedia('(max-width: 991px)');
  
  // Stockage de la position d'origine du récapitulatif
  const originalPosition = {
    recapitulatif: null
  };
  
  function getElements() {
    const bookingForm = document.querySelector('.booking-form');
    const recapitulatif = document.querySelector('.col-lg-4.ordre');
    const paymentSection = document.querySelector('.form-section:nth-child(4)'); // Section 4 : Paiement
    
    return {
      bookingForm,
      recapitulatif,
      paymentSection
    };
  }
  
  function saveOriginalPosition(elements) {
    if (!originalPosition.recapitulatif && elements.recapitulatif) {
      originalPosition.recapitulatif = {
        parent: elements.recapitulatif.parentElement,
        nextSibling: elements.recapitulatif.nextSibling
      };
    }
  }
  
  function reorganizeForMobile(elements) {
    console.log('Passage en mode mobile - Booking');
    
    const { bookingForm, recapitulatif, paymentSection } = elements;
    
    if (!bookingForm || !recapitulatif || !paymentSection) return;
    
    // Sauvegarder la position avant tout déplacement
    saveOriginalPosition(elements);
    
    // Déplacer le récapitulatif avant la section Paiement
    if (recapitulatif.parentElement !== bookingForm) {
      bookingForm.insertBefore(recapitulatif, paymentSection);
    }
  }
  
  function restoreDesktopLayout(elements) {
    console.log('Passage en mode desktop - Booking');
    
    const { recapitulatif } = elements;
    
    // Fonction helper pour restaurer un élément
    function restoreElement(element, positionKey) {
      if (element && originalPosition[positionKey]) {
        const origPos = originalPosition[positionKey];
        if (element.parentElement !== origPos.parent) {
          if (origPos.nextSibling) {
            origPos.parent.insertBefore(element, origPos.nextSibling);
          } else {
            origPos.parent.appendChild(element);
          }
        }
      }
    }
    
    restoreElement(recapitulatif, 'recapitulatif');
  }
  
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
    mediaQuery.addEventListener('change', handleMediaQueryChange);
  } else {
    // Fallback pour anciens navigateurs
    mediaQuery.addListener(handleMediaQueryChange);
  }
  
});