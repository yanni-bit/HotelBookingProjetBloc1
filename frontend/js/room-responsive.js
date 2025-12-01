// ==========================================================
// ROOM-RESPONSIVE.JS - Réorganisation responsive de la page room
// ==========================================================

document.addEventListener('DOMContentLoaded', function() {
  
  function reorganizeRoomLayout() {
    const windowWidth = window.innerWidth;
    
    // Récupérer les éléments
    const roomGallery = document.querySelector('.room-gallery');
    const hotelHeaderBox = document.querySelector('.col-lg-3'); // Colonne contenant hotel-header-box
    const roomDetailsRow = document.querySelector('.col-lg-9 > .row'); // Row avec onglets
    const colLg9 = document.querySelector('.col-lg-9');
    
    // Vérifier que tous les éléments existent
    if (!roomGallery || !hotelHeaderBox || !roomDetailsRow || !colLg9) {
      return;
    }
    
    // Si écran < 992px : réorganiser
    if (windowWidth < 992) {
      // Ordre souhaité dans col-lg-9 :
      // 1. roomGallery (déjà en place normalement)
      // 2. hotelHeaderBox (à déplacer)
      // 3. roomDetailsRow (déjà en place)
      
      // Vérifier si hotelHeaderBox n'est pas déjà dans col-lg-9
      if (hotelHeaderBox.parentElement !== colLg9) {
        // Insérer hotelHeaderBox après roomGallery mais avant roomDetailsRow
        colLg9.insertBefore(hotelHeaderBox, roomDetailsRow);
      }
    } 
    // Si écran >= 992px : remettre dans l'ordre original
    else {
      // Remettre hotelHeaderBox à sa place d'origine (après col-lg-9)
      const mainRow = document.querySelector('.container > .row');
      
      if (mainRow && hotelHeaderBox.parentElement === colLg9) {
        // Remettre après col-lg-9
        mainRow.appendChild(hotelHeaderBox);
      }
    }
  }
  
  // Exécuter au chargement
  reorganizeRoomLayout();
  
  // Exécuter lors du redimensionnement (avec debounce)
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      reorganizeRoomLayout();
    }, 250);
  });
  
});