// ==========================================================
// CALENDRIER.JS - Intégration Flatpickr
// Projet : Hôtel Booking (Bloc 1)
// ==========================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Prix par nuit (à adapter selon tes besoins)
  const PRIX_PAR_NUIT = 770;

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

  // Variables pour stocker les dates et l'instance Flatpickr
  let checkInDate = null;
  let checkOutDate = null;
  let flatpickrInstance = null; // L'instance est initialisée à null

  // Fonction d'initialisation de Flatpickr
  function initializeFlatpickr() {
    if (flatpickrInstance) return; // Évite la double initialisation

    flatpickrInstance = flatpickr("#flatpickr-calendar", {
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
        // On peut ajouter des classes personnalisées ici
        // Par exemple : marquer certains jours comme complets
        // dayElem.classList.add('unavailable');
      }
    });

    // Écouter les changements d'heures après initialisation
    if (checkInTimeInput) {
      checkInTimeInput.addEventListener('change', updateInfo);
    }
    if (checkOutTimeInput) {
      checkOutTimeInput.addEventListener('change', updateInfo);
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', handleReset);
    }
    if (confirmBtn) {
      confirmBtn.addEventListener('click', handleConfirm);
    }
  }

  // Événement pour initialiser Flatpickr lors de l'affichage de l'onglet Disponibilité
  const availabilityTab = document.getElementById('availability-tab');
  if (availabilityTab) {
    availabilityTab.addEventListener('shown.bs.tab', initializeFlatpickr);
  }
  
  // Fonction de mise à jour des infos (dates + heures)
  function updateInfo() {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      updateDisplay(checkInDate, checkOutDate, diffDays);
    } else if (checkInDate) {
       // Cas où seule la date d'arrivée est sélectionnée mais on change l'heure
       const checkInTime = checkInTimeInput ? checkInTimeInput.value : '15:00';
       const checkInDateLong = formatDateLong(checkInDate);
       if (checkInInfo && checkInText) {
         checkInText.textContent = `Arrivée : ${checkInDateLong} à ${checkInTime}`;
         checkInInfo.style.display = 'block';
       }
    }
  }


  // Fonction pour formater les dates (format court)
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

  // Fonction pour formater l'heure (inutile si on prend l'input time)
  // function formatTime(date) {
  //   return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  // }

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
    if (confirmBtn) confirmBtn.disabled = true;
  }
  
  // Gestionnaire de réinitialisation
  function handleReset() {
      if (flatpickrInstance) {
          flatpickrInstance.clear();
      }
      checkInDate = null;
      checkOutDate = null;
      resetDisplay();
  }

  // Gestionnaire de confirmation
  function handleConfirm() {
      if (checkInDate && checkOutDate) {
          // Calculer le nombre de nuits
          const diffTime = Math.abs(checkOutDate - checkInDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          const total = diffDays * PRIX_PAR_NUIT;
          
          alert(`Réservation confirmée!\n\nArrivée: ${formatDate(checkInDate)}\nDépart: ${formatDate(checkOutDate)}\nNuits: ${diffDays}\nTotal: ${total}€`);
          
          // Ici on peut rediriger vers la page de réservation
          // window.location.href = 'booking.html';
      }
  }

  // Les écouteurs pour les boutons et heures sont déplacés dans initializeFlatpickr pour s'assurer
  // que l'instance existe, mais vous pouvez les laisser ici s'ils n'en dépendent pas.

  // Initialiser l'affichage au chargement
  resetDisplay();
  
  // Pour le cas où l'utilisateur arrive sur la page et clique directement sur l'onglet availability
  // (si vous voulez que la description soit active par défaut, cette partie n'est pas nécessaire)
  // Si l'onglet disponibilité est déjà actif (cas du chargement initial SANS modification du HTML)
  // if (document.getElementById('availability').classList.contains('active')) {
  //     initializeFlatpickr();
  // }
  
  // Dans votre cas, après modification du HTML, l'onglet availability NE sera PLUS actif par défaut.


  // ==========================================================
  // GESTION DU FORMULAIRE MOBILE (< 400px)
  // ==========================================================

  // Éléments du formulaire mobile
  const mobileCheckInInput = document.getElementById('mobileCheckIn');
  const mobileCheckOutInput = document.getElementById('mobileCheckOut');

  // Définir la date minimum (aujourd'hui)
  if (mobileCheckInInput && mobileCheckOutInput) {
    const today = new Date().toISOString().split('T')[0];
    mobileCheckInInput.min = today;
    mobileCheckOutInput.min = today;

    // Gestionnaire pour la date d'arrivée mobile
    mobileCheckInInput.addEventListener('change', function() {
      const checkIn = new Date(this.value);
      checkInDate = checkIn;
      
      // Mettre à jour le minimum de la date de départ
      mobileCheckOutInput.min = this.value;
      
      // Afficher l'info d'arrivée
      const checkInTime = checkInTimeInput ? checkInTimeInput.value : '15:00';
      const checkInDateLong = formatDateLong(checkIn);
      
      if (checkInInfo && checkInText) {
        checkInText.textContent = `Arrivée : ${checkInDateLong} à ${checkInTime}`;
        checkInInfo.style.display = 'block';
      }
      
      // Cacher l'info de départ si pas encore sélectionnée
      if (!mobileCheckOutInput.value) {
        if (checkOutInfo) checkOutInfo.style.display = 'none';
        if (nightsCount) nightsCount.style.display = 'none';
      }
      
      // Vérifier si on peut calculer les nuits
      if (mobileCheckOutInput.value) {
        calculateMobileBooking();
      }
    });

    // Gestionnaire pour la date de départ mobile
    mobileCheckOutInput.addEventListener('change', function() {
      if (mobileCheckInInput.value) {
        calculateMobileBooking();
      }
    });

    // Écouter les changements d'heures aussi pour mettre à jour l'affichage mobile
    if (checkInTimeInput) {
      checkInTimeInput.addEventListener('change', function() {
        if (mobileCheckInInput.value) {
          const checkIn = new Date(mobileCheckInInput.value);
          const checkInTime = this.value;
          const checkInDateLong = formatDateLong(checkIn);
          
          if (checkInInfo && checkInText) {
            checkInText.textContent = `Arrivée : ${checkInDateLong} à ${checkInTime}`;
          }
        }
      });
    }

    if (checkOutTimeInput) {
      checkOutTimeInput.addEventListener('change', function() {
        if (mobileCheckOutInput.value) {
          const checkOut = new Date(mobileCheckOutInput.value);
          const checkOutTime = this.value;
          const checkOutDateLong = formatDateLong(checkOut);
          
          if (checkOutInfo && checkOutText) {
            checkOutText.textContent = `Départ : ${checkOutDateLong} à ${checkOutTime}`;
          }
        }
      });
    }
  }

  // Fonction pour calculer la réservation depuis le formulaire mobile
  function calculateMobileBooking() {
    if (!mobileCheckInInput.value || !mobileCheckOutInput.value) return;
    
    checkInDate = new Date(mobileCheckInInput.value);
    checkOutDate = new Date(mobileCheckOutInput.value);
    
    // Calculer le nombre de nuits
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Mise à jour de l'affichage
    if (diffDays > 0) {
      updateDisplay(checkInDate, checkOutDate, diffDays);
      confirmBtn.disabled = false;
    }
  }

});