// ==========================================================
// ROOM-RESPONSIVE.JS - Réorganisation complète responsive
// Version DEBUG avec console.log
// ==========================================================

document.addEventListener('DOMContentLoaded', function() {
  
  console.log('🔍 Script room-responsive V2 chargé');
  
  // Stockage des positions d'origine
  const originalPositions = {
    hotelHeaderBox: null,
    pourquoiReserver: null,
    hotelsPopulaires: null,
    offreDuJour: null,
    aideContact: null
  };
  
  function reorganizeRoomLayout() {
    const windowWidth = window.innerWidth;
    console.log('📏 Largeur fenêtre:', windowWidth);
    
    // === Récupérer tous les éléments ===
    const roomGallery = document.querySelector('.room-gallery');
    const colLg9 = document.querySelector('.container > .row > .col-lg-9');
    const colLg3 = document.querySelector('.container > .row > .col-lg-3');
    const roomDetailsRow = document.querySelector('.col-lg-9 > .row');
    
    // Identifier chaque sidebar par son titre
    const allAsides = document.querySelectorAll('aside.sidebar');
    let hotelHeaderBox = document.querySelector('.hotel-header-box');
    let pourquoiReserver = null;
    let hotelsPopulaires = null;
    let offreDuJour = null;
    let aideContact = null;
    
    // Parcourir les asides pour les identifier
    allAsides.forEach(aside => {
      const title = aside.querySelector('h3, h6');
      if (title) {
        const titleText = title.textContent.trim();
        if (titleText.includes('Pourquoi réserver')) {
          pourquoiReserver = aside;
        } else if (titleText.includes('populaires')) {
          hotelsPopulaires = aside;
        } else if (titleText.includes('Offre du jour')) {
          offreDuJour = aside;
        } else if (titleText.includes('Aide & Contact')) {
          aideContact = aside;
        }
      }
    });
    
    console.log('🎯 Éléments trouvés:');
    console.log('  - roomGallery:', roomGallery ? '✅' : '❌');
    console.log('  - hotelHeaderBox:', hotelHeaderBox ? '✅' : '❌');
    console.log('  - roomDetailsRow:', roomDetailsRow ? '✅' : '❌');
    console.log('  - pourquoiReserver:', pourquoiReserver ? '✅' : '❌');
    console.log('  - hotelsPopulaires:', hotelsPopulaires ? '✅' : '❌');
    console.log('  - offreDuJour:', offreDuJour ? '✅' : '❌');
    console.log('  - aideContact:', aideContact ? '✅' : '❌');
    
    // Vérifier que tous les éléments existent
    if (!roomGallery || !colLg9 || !colLg3 || !roomDetailsRow) {
      console.error('❌ Éléments principaux manquants');
      return;
    }
    
    // === MODE MOBILE/TABLETTE (< 992px) ===
    if (windowWidth < 992) {
      console.log('📱 Mode mobile/tablette - Réorganisation complète');
      
      // Sauvegarder les positions d'origine si pas encore fait
      if (!originalPositions.hotelHeaderBox && hotelHeaderBox) {
        originalPositions.hotelHeaderBox = {
          parent: hotelHeaderBox.parentElement,
          nextSibling: hotelHeaderBox.nextSibling
        };
      }
      if (!originalPositions.pourquoiReserver && pourquoiReserver) {
        originalPositions.pourquoiReserver = {
          parent: pourquoiReserver.parentElement,
          nextSibling: pourquoiReserver.nextSibling
        };
      }
      if (!originalPositions.hotelsPopulaires && hotelsPopulaires) {
        originalPositions.hotelsPopulaires = {
          parent: hotelsPopulaires.parentElement,
          nextSibling: hotelsPopulaires.nextSibling
        };
      }
      if (!originalPositions.offreDuJour && offreDuJour) {
        originalPositions.offreDuJour = {
          parent: offreDuJour.parentElement,
          nextSibling: offreDuJour.nextSibling
        };
      }
      if (!originalPositions.aideContact && aideContact) {
        originalPositions.aideContact = {
          parent: aideContact.parentElement,
          nextSibling: aideContact.nextSibling
        };
      }
      
      console.log('💾 Positions d\'origine sauvegardées');
      
      // Ordre souhaité dans col-lg-9 :
      // 1. roomGallery (déjà en place)
      // 2. hotelHeaderBox (tout le .hotel-header-box)
      // 3. roomDetailsRow (onglets + détails)
      // 4. pourquoiReserver
      // 5. hotelsPopulaires
      // 6. offreDuJour
      // 7. aideContact
      
      console.log('🔄 Début du déplacement des blocs');
      
      // Déplacer hotel-header-box (juste le bloc, pas toute la colonne)
      if (hotelHeaderBox && hotelHeaderBox.parentElement !== colLg9) {
        console.log('  → Déplacement hotel-header-box');
        colLg9.insertBefore(hotelHeaderBox, roomDetailsRow);
      }
      
      // Déplacer les sidebars après roomDetailsRow
      if (pourquoiReserver && pourquoiReserver.parentElement !== colLg9) {
        console.log('  → Déplacement pourquoiReserver');
        colLg9.appendChild(pourquoiReserver);
      }
      
      if (hotelsPopulaires && hotelsPopulaires.parentElement !== colLg9) {
        console.log('  → Déplacement hotelsPopulaires');
        colLg9.appendChild(hotelsPopulaires);
      }
      
      if (offreDuJour && offreDuJour.parentElement !== colLg9) {
        console.log('  → Déplacement offreDuJour');
        colLg9.appendChild(offreDuJour);
      }
      
      if (aideContact && aideContact.parentElement !== colLg9) {
        console.log('  → Déplacement aideContact');
        colLg9.appendChild(aideContact);
      }
      
      console.log('✅ Réorganisation terminée');
      
    } 
    // === MODE DESKTOP (>= 992px) ===
    else {
      console.log('🖥️ Mode desktop - Remise en ordre original');
      
      // Remettre tous les éléments à leur place d'origine
      
      if (hotelHeaderBox && originalPositions.hotelHeaderBox) {
        const origPos = originalPositions.hotelHeaderBox;
        if (hotelHeaderBox.parentElement !== origPos.parent) {
          console.log('  → Remise en place hotel-header-box');
          if (origPos.nextSibling) {
            origPos.parent.insertBefore(hotelHeaderBox, origPos.nextSibling);
          } else {
            origPos.parent.appendChild(hotelHeaderBox);
          }
        }
      }
      
      if (pourquoiReserver && originalPositions.pourquoiReserver) {
        const origPos = originalPositions.pourquoiReserver;
        if (pourquoiReserver.parentElement !== origPos.parent) {
          console.log('  → Remise en place pourquoiReserver');
          if (origPos.nextSibling) {
            origPos.parent.insertBefore(pourquoiReserver, origPos.nextSibling);
          } else {
            origPos.parent.appendChild(pourquoiReserver);
          }
        }
      }
      
      if (hotelsPopulaires && originalPositions.hotelsPopulaires) {
        const origPos = originalPositions.hotelsPopulaires;
        if (hotelsPopulaires.parentElement !== origPos.parent) {
          console.log('  → Remise en place hotelsPopulaires');
          if (origPos.nextSibling) {
            origPos.parent.insertBefore(hotelsPopulaires, origPos.nextSibling);
          } else {
            origPos.parent.appendChild(hotelsPopulaires);
          }
        }
      }
      
      if (offreDuJour && originalPositions.offreDuJour) {
        const origPos = originalPositions.offreDuJour;
        if (offreDuJour.parentElement !== origPos.parent) {
          console.log('  → Remise en place offreDuJour');
          if (origPos.nextSibling) {
            origPos.parent.insertBefore(offreDuJour, origPos.nextSibling);
          } else {
            origPos.parent.appendChild(offreDuJour);
          }
        }
      }
      
      if (aideContact && originalPositions.aideContact) {
        const origPos = originalPositions.aideContact;
        if (aideContact.parentElement !== origPos.parent) {
          console.log('  → Remise en place aideContact');
          if (origPos.nextSibling) {
            origPos.parent.insertBefore(aideContact, origPos.nextSibling);
          } else {
            origPos.parent.appendChild(aideContact);
          }
        }
      }
      
      console.log('✅ Remise en ordre terminée');
    }
  }
  
  // Exécuter au chargement
  console.log('🚀 Exécution initiale');
  reorganizeRoomLayout();
  
  // Exécuter lors du redimensionnement (avec debounce)
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      console.log('↔️ Redimensionnement détecté');
      reorganizeRoomLayout();
    }, 250);
  });
  
});