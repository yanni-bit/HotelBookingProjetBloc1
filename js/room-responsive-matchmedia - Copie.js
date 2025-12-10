// ==========================================================
// ROOM-RESPONSIVE-MATCHMEDIA.JS
// Utilisation de matchMedia au lieu de @media
// (plus propre, plus simple pour organiser les blocs de room.html)
// ==========================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Créer un media query
  const mediaQuery = window.matchMedia('(max-width: 991px)');
  
  // Stockage des positions d'origine
  const originalPositions = {
    hotelHeaderBox: null,
    pourquoiReserver: null,
    hotelsPopulaires: null,
    offreDuJour: null,
    aideContact: null
  };
  
  function getElements() {
    const roomGallery = document.querySelector('.room-gallery');
    const colLg9 = document.querySelector('.container > .row > .col-lg-9');
    const colLg3 = document.querySelector('.container > .row > .col-lg-3');
    const roomDetailsRow = document.querySelector('.col-lg-9 > .row');
    
    const allAsides = document.querySelectorAll('aside.ordre');
    const hotelHeaderBox = document.querySelector('.hotel-header-box');
    let pourquoiReserver = null;
    let hotelsPopulaires = null;
    let offreDuJour = null;
    let aideContact = null;
    
    allAsides.forEach(aside => {
      const title = aside.querySelector('h3, h6');
      if (title) {
        const titleText = title.textContent.trim();
        if (titleText.includes('Pourquoi réserver')) pourquoiReserver = aside;
        else if (titleText.includes('populaires')) hotelsPopulaires = aside;
        else if (titleText.includes('Offre du jour')) offreDuJour = aside;
        else if (titleText.includes('Aide & Contact')) aideContact = aside;
      }
    });
    
    return {
      roomGallery,
      colLg9,
      colLg3,
      roomDetailsRow,
      hotelHeaderBox,
      pourquoiReserver,
      hotelsPopulaires,
      offreDuJour,
      aideContact
    };
  }
  
  function saveOriginalPositions(elements) {
    if (!originalPositions.hotelHeaderBox && elements.hotelHeaderBox) {
      originalPositions.hotelHeaderBox = {
        parent: elements.hotelHeaderBox.parentElement,
        nextSibling: elements.hotelHeaderBox.nextSibling
      };
    }
    if (!originalPositions.pourquoiReserver && elements.pourquoiReserver) {
      originalPositions.pourquoiReserver = {
        parent: elements.pourquoiReserver.parentElement,
        nextSibling: elements.pourquoiReserver.nextSibling
      };
    }
    if (!originalPositions.hotelsPopulaires && elements.hotelsPopulaires) {
      originalPositions.hotelsPopulaires = {
        parent: elements.hotelsPopulaires.parentElement,
        nextSibling: elements.hotelsPopulaires.nextSibling
      };
    }
    if (!originalPositions.offreDuJour && elements.offreDuJour) {
      originalPositions.offreDuJour = {
        parent: elements.offreDuJour.parentElement,
        nextSibling: elements.offreDuJour.nextSibling
      };
    }
    if (!originalPositions.aideContact && elements.aideContact) {
      originalPositions.aideContact = {
        parent: elements.aideContact.parentElement,
        nextSibling: elements.aideContact.nextSibling
      };
    }
  }
  
  function reorganizeForMobile(elements) {
    console.log('Passage en mode mobile');
    
    const { colLg9, roomDetailsRow, hotelHeaderBox, pourquoiReserver, 
            hotelsPopulaires, offreDuJour, aideContact } = elements;
    
    if (!colLg9 || !roomDetailsRow) return;
    
    // Sauvegarder les positions avant tout déplacement
    saveOriginalPositions(elements);
    
    // Déplacer dans l'ordre souhaité
    if (hotelHeaderBox && hotelHeaderBox.parentElement !== colLg9) {
      colLg9.insertBefore(hotelHeaderBox, roomDetailsRow);
    }
    
    if (pourquoiReserver && pourquoiReserver.parentElement !== colLg9) {
      colLg9.appendChild(pourquoiReserver);
    }
    
    if (hotelsPopulaires && hotelsPopulaires.parentElement !== colLg9) {
      colLg9.appendChild(hotelsPopulaires);
    }
    
    if (offreDuJour && offreDuJour.parentElement !== colLg9) {
      colLg9.appendChild(offreDuJour);
    }
    
    if (aideContact && aideContact.parentElement !== colLg9) {
      colLg9.appendChild(aideContact);
    }
  }
  
  function restoreDesktopLayout(elements) {
    console.log('Passage en mode desktop');
    
    const { hotelHeaderBox, pourquoiReserver, hotelsPopulaires, 
            offreDuJour, aideContact } = elements;
    
    // Fonction helper pour restaurer un élément
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
    
    restoreElement(hotelHeaderBox, 'hotelHeaderBox');
    restoreElement(pourquoiReserver, 'pourquoiReserver');
    restoreElement(hotelsPopulaires, 'hotelsPopulaires');
    restoreElement(offreDuJour, 'offreDuJour');
    restoreElement(aideContact, 'aideContact');
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