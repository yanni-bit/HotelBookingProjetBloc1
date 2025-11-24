// ==========================================================
// CALENDRIER.JS - Intégration Flatpickr
// ==========================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Prix par nuit (à adapter selon tes besoins)
  const PRIX_PAR_NUIT = 120;

  // Éléments DOM
  const checkInInfo = document.getElementById('checkInInfo');
  const checkOutInfo = document.getElementById('checkOutInfo');
  const checkInText = document.getElementById('checkInText');
  const checkOutText = document.getElementById('checkOutText');
  const checkInTimeInput = document.getElementById('checkInTime');
  const checkOutTimeInput = document.getElementById('checkOutTime');
  const nightsCount = document.getElementById('nightsCount');
  const nightsNumber = document.getElementById('nightsNumber');
  const totalPrice = document.getElementById('totalPrice');
  const confirmBtn = document.getElementById('confirmBtn');
  const resetBtn = document.getElementById('resetBtn');

  // Variables pour stocker les dates
  let checkInDate = null;
  let checkOutDate = null;

  // Initialisation de Flatpickr
  const flatpickrInstance = flatpickr("#flatpickr-calendar", {
    mode: "range",              // Mode plage de dates
    minDate: "today",           // Empêche de sélectionner des dates passées
    dateFormat: "d/m/Y",        // Format d'affichage
    locale: "fr",               // Langue française
    inline: true,               // Affichage inline (toujours visible)
    showMonths: 1,              // Nombre de mois affichés
    
    // Callback quand on sélectionne des dates
    onChange: function(selectedDates, dateStr, instance) {
      if (selectedDates.length === 2) {
        checkInDate = selectedDates[0];
        checkOutDate = selectedDates[1];
        
        // Calculer le nombre de nuits
        const diffTime = Math.abs(checkOutDate - checkInDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        // Mise à jour de l'affichage
        updateDisplay(checkInDate, checkOutDate, diffDays);
        
        // Activer le bouton de réservation
        confirmBtn.disabled = false;
      } else if (selectedDates.length === 1) {
        // Seulement check-in sélectionné
        checkInDate = selectedDates[0];
        checkOutDate = null;
        
        // Afficher seulement le check-in
        const checkInTime = checkInTimeInput ? checkInTimeInput.value : '15:00';
        const checkInDateLong = formatDateLong(checkInDate);
        
        if (checkInInfo && checkInText) {
          checkInText.textContent = `Arrivée : ${checkInDateLong} à ${checkInTime}`;
          checkInInfo.style.display = 'block';
        }
        
        if (checkOutInfo) checkOutInfo.style.display = 'none';
        
        // Cacher les infos et désactiver le bouton
        if (nightsCount) nightsCount.style.display = 'none';
        confirmBtn.disabled = true;
      } else {
        // Réinitialiser si aucune date
        resetDisplay();
      }
    },

    // Personnalisation des jours
    onDayCreate: function(datesObj, dStr, fp, dayElem) {
      // Vous pouvez ajouter des classes personnalisées ici
      // Par exemple : marquer certains jours comme complets
      // dayElem.classList.add('unavailable');
    }
  });

  // Fonction pour formater les dates
  function formatDate(date) {
    const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  }

  // Fonction pour formater la date complète (Mardi 25 novembre 2025)
  function formatDateLong(date) {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const formatted = date.toLocaleDateString('fr-FR', options);
    // Capitaliser la première lettre
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  // Fonction pour formater l'heure
  function formatTime(date) {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }

  // Mise à jour de l'affichage
  function updateDisplay(checkIn, checkOut, nights) {
    // Récupérer les heures
    const checkInTime = checkInTimeInput ? checkInTimeInput.value : '15:00';
    const checkOutTime = checkOutTimeInput ? checkOutTimeInput.value : '11:00';
    
    // Formater les dates complètes
    const checkInDateLong = formatDateLong(checkIn);
    const checkOutDateLong = formatDateLong(checkOut);
    
    // Afficher les infos d'arrivée
    if (checkInInfo && checkInText) {
      checkInText.textContent = `Arrivée : ${checkInDateLong} à ${checkInTime}`;
      checkInInfo.style.display = 'block';
    }

    // Afficher les infos de départ
    if (checkOutInfo && checkOutText) {
      checkOutText.textContent = `Départ : ${checkOutDateLong} à ${checkOutTime}`;
      checkOutInfo.style.display = 'block';
    }

    // Nombre de nuits et prix total
    if (nightsCount && nightsNumber && totalPrice) {
      nightsNumber.textContent = nights;
      const total = nights * PRIX_PAR_NUIT;
      totalPrice.textContent = `${total}€`;
      nightsCount.style.display = 'block';
    }
  }

  // Réinitialiser l'affichage
  function resetDisplay() {
    if (checkInInfo) checkInInfo.style.display = 'none';
    if (checkOutInfo) checkOutInfo.style.display = 'none';
    if (nightsCount) nightsCount.style.display = 'none';
    confirmBtn.disabled = true;
  }

  // Bouton Réinitialiser
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      flatpickrInstance.clear();
      checkInDate = null;
      checkOutDate = null;
      resetDisplay();
    });
  }

  // Bouton Réserver
  if (confirmBtn) {
    confirmBtn.addEventListener('click', function() {
      if (checkInDate && checkOutDate) {
        // Calculer le nombre de nuits
        const diffTime = Math.abs(checkOutDate - checkInDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const total = diffDays * PRIX_PAR_NUIT;
        
        alert(`Réservation confirmée!\n\nArrivée: ${formatDate(checkInDate)}\nDépart: ${formatDate(checkOutDate)}\nNuits: ${diffDays}\nTotal: ${total}€`);
        
        // Ici tu peux rediriger vers la page de paiement
        // window.location.href = 'booking.html';
      }
    });
  }

  // Initialiser l'affichage au chargement
  resetDisplay();

  // Écouter les changements d'heures
  if (checkInTimeInput) {
    checkInTimeInput.addEventListener('change', function() {
      if (checkInDate && checkOutDate) {
        const diffTime = Math.abs(checkOutDate - checkInDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        updateDisplay(checkInDate, checkOutDate, diffDays);
      }
    });
  }

  if (checkOutTimeInput) {
    checkOutTimeInput.addEventListener('change', function() {
      if (checkInDate && checkOutDate) {
        const diffTime = Math.abs(checkOutDate - checkInDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        updateDisplay(checkInDate, checkOutDate, diffDays);
      }
    });
  }
});