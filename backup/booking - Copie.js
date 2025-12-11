/* ==========================================================
   BOOKING.JS - Logique de la page de réservation
   Projet : Hôtel Booking (Bloc 1)
   ========================================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================================
  // DÉCLARATION DES VARIABLES GLOBALES (AVANT UTILISATION)
  // ==========================================================
  
  const serviceCheckboxes = document.querySelectorAll('.service-item input[type="checkbox"]');
  const servicesContainer = document.getElementById('servicesContainer');
  const priceTotal = document.getElementById('priceTotal');
  
  // ==========================================================
  // RÉCUPÉRATION DES DONNÉES DE RÉSERVATION
  // ==========================================================
  
  const bookingData = getBookingDataFromURL();
  
  // Afficher les données dans le récapitulatif
  if (bookingData) {
    displayBookingSummary(bookingData);
  } else {
    // Si pas de données, afficher des valeurs par défaut
    console.warn('Aucune donnée de réservation trouvée');
  }
  
  // ==========================================================
  // GESTION DES SERVICES ADDITIONNELS
  // ==========================================================
  
  serviceCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updatePricing);
  });
  
  // ==========================================================
  // FORMATAGE AUTOMATIQUE DES CHAMPS
  // ==========================================================
  
  // Numéro de carte
  const cardNumber = document.getElementById('cardNumber');
  if (cardNumber) {
    cardNumber.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\s/g, '');
      let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
      e.target.value = formattedValue;
    });
  }
  
  // Date d'expiration
  const cardExpiry = document.getElementById('cardExpiry');
  if (cardExpiry) {
    cardExpiry.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
      }
      e.target.value = value;
    });
  }
  
  // CVV (chiffres uniquement)
  const cardCVV = document.getElementById('cardCVV');
  if (cardCVV) {
    cardCVV.addEventListener('input', function(e) {
      e.target.value = e.target.value.replace(/\D/g, '');
    });
  }
  
  // Téléphone
  const phone = document.getElementById('phone');
  if (phone) {
    phone.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 0 && value[0] === '0') {
        value = value.match(/.{1,2}/g)?.join(' ') || value;
      }
      e.target.value = value;
    });
  }
  
  // ==========================================================
  // GESTION DU NOMBRE DE VOYAGEURS
  // ==========================================================
  
  const adultsInput = document.getElementById('adults');
  const childrenInput = document.getElementById('children');
  const adultsMinBtn = document.getElementById('adultsMin');
  const adultsPlusBtn = document.getElementById('adultsPlus');
  const childrenMinBtn = document.getElementById('childrenMin');
  const childrenPlusBtn = document.getElementById('childrenPlus');
  const totalGuestsSpan = document.getElementById('totalGuests');
  const guestsError = document.getElementById('guestsError');
  const guestsAlert = document.getElementById('guestsAlert');
  
  const MAX_GUESTS = 3;
  
  // Fonction pour mettre à jour le total et les boutons
  function updateGuestsTotal() {
    const adults = parseInt(adultsInput.value);
    const children = parseInt(childrenInput.value);
    const total = adults + children;
    
    // Mettre à jour l'affichage du total
    totalGuestsSpan.textContent = total;
    
    // Gérer l'affichage de l'erreur
    if (total > MAX_GUESTS) {
      guestsError.style.display = 'block';
      guestsAlert.classList.add('border-danger');
    } else {
      guestsError.style.display = 'none';
      guestsAlert.classList.remove('border-danger');
    }
    
    // Désactiver les boutons + si on atteint le max
    adultsPlusBtn.disabled = (total >= MAX_GUESTS);
    childrenPlusBtn.disabled = (total >= MAX_GUESTS);
    
    // Désactiver le bouton - des adultes si on est à 1
    adultsMinBtn.disabled = (adults <= 1);
    
    // Désactiver le bouton - des enfants si on est à 0
    childrenMinBtn.disabled = (children <= 0);
    
    // Mettre à jour le récapitulatif
    updateGuestsSummary(adults, children);
    
    // Mettre à jour le prix du petit-déjeuner si coché
    updatePricing();
  }
  
  // Boutons adultes
  if (adultsMinBtn) {
    adultsMinBtn.addEventListener('click', function() {
      const current = parseInt(adultsInput.value);
      if (current > 1) {
        adultsInput.value = current - 1;
        updateGuestsTotal();
      }
    });
  }
  
  if (adultsPlusBtn) {
    adultsPlusBtn.addEventListener('click', function() {
      const current = parseInt(adultsInput.value);
      const children = parseInt(childrenInput.value);
      if (current + children < MAX_GUESTS) {
        adultsInput.value = current + 1;
        updateGuestsTotal();
      }
    });
  }
  
  // Boutons enfants
  if (childrenMinBtn) {
    childrenMinBtn.addEventListener('click', function() {
      const current = parseInt(childrenInput.value);
      if (current > 0) {
        childrenInput.value = current - 1;
        updateGuestsTotal();
      }
    });
  }
  
  if (childrenPlusBtn) {
    childrenPlusBtn.addEventListener('click', function() {
      const current = parseInt(childrenInput.value);
      const adults = parseInt(adultsInput.value);
      if (current + adults < MAX_GUESTS) {
        childrenInput.value = current + 1;
        updateGuestsTotal();
      }
    });
  }
  
  // Initialiser au chargement
  if (adultsInput && childrenInput) {
    updateGuestsTotal();
  }
  
  // Fonction pour mettre à jour le récapitulatif des voyageurs
  function updateGuestsSummary(adults, children) {
    const summaryText = document.querySelector('.summary-room-info p');
    if (summaryText) {
      let text = '';
      if (adults > 0) {
        text += `${adults} adulte${adults > 1 ? 's' : ''}`;
      }
      if (children > 0) {
        text += (adults > 0 ? ', ' : '') + `${children} enfant${children > 1 ? 's' : ''}`;
      }
      summaryText.innerHTML = `<i class="bi bi-people"></i> ${text}`;
    }
  }

  
  // ==========================================================
  // SOUMISSION DU FORMULAIRE
  // ==========================================================
  
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', handleFormSubmit);
  }
  
  // ==========================================================
  // FONCTIONS
  // ==========================================================
  
  /**
   * Récupère les données de réservation depuis l'URL
   */
  function getBookingDataFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    
    const checkIn = urlParams.get('checkIn');
    const checkOut = urlParams.get('checkOut');
    const checkInTime = urlParams.get('checkInTime') || '15:00';
    const checkOutTime = urlParams.get('checkOutTime') || '11:00';
    const nights = urlParams.get('nights');
    const price = urlParams.get('price') || '770';
    const roomName = urlParams.get('roomName') || 'Villa sur l\'eau';
    const adults = urlParams.get('adults') || '2';
    
    // Vérifier si on a au moins les dates
    if (!checkIn || !checkOut || !nights) {
      return null;
    }
    
    return {
      checkIn,
      checkOut,
      checkInTime,
      checkOutTime,
      nights: parseInt(nights),
      pricePerNight: parseFloat(price),
      roomName,
      adults: parseInt(adults)
    };
  }
  
  /**
   * Affiche le récapitulatif de la réservation
   */
  function displayBookingSummary(data) {
    // Nom de la chambre
    const summaryRoomName = document.getElementById('summaryRoomName');
    if (summaryRoomName) {
      summaryRoomName.textContent = data.roomName;
    }
    
    // Check-in
    const summaryCheckIn = document.getElementById('summaryCheckIn');
    const summaryCheckInTime = document.getElementById('summaryCheckInTime');
    if (summaryCheckIn) {
      summaryCheckIn.textContent = formatDateShort(data.checkIn);
    }
    if (summaryCheckInTime) {
      summaryCheckInTime.textContent = data.checkInTime;
    }
    
    // Check-out
    const summaryCheckOut = document.getElementById('summaryCheckOut');
    const summaryCheckOutTime = document.getElementById('summaryCheckOutTime');
    if (summaryCheckOut) {
      summaryCheckOut.textContent = formatDateShort(data.checkOut);
    }
    if (summaryCheckOutTime) {
      summaryCheckOutTime.textContent = data.checkOutTime;
    }
    
    // Nombre de nuits
    const summaryNights = document.getElementById('summaryNights');
    if (summaryNights) {
      summaryNights.textContent = data.nights + (data.nights > 1 ? ' nuits' : ' nuit');
    }
    
    // Prix de base
    const priceNights = document.getElementById('priceNights');
    const priceRoom = document.getElementById('priceRoom');
    if (priceNights) {
      priceNights.textContent = data.nights;
    }
    if (priceRoom) {
      const totalRoom = data.nights * data.pricePerNight;
      priceRoom.textContent = totalRoom.toFixed(0) + '€';
    }
    
    // Stocker les données pour les calculs
    window.bookingData = data;
    
    // Calculer le total initial
    updatePricing();
  }
  
  /**
   * Formate une date au format "Jeu. 25 nov."
   */
  function formatDateShort(dateStr) {
    const date = new Date(dateStr);
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return date.toLocaleDateString('fr-FR', options);
  }
  
  /**
   * Met à jour le récapitulatif des prix
   */
  function updatePricing() {
    if (!window.bookingData) return;
    
    const data = window.bookingData;
    let totalServices = 0;
    
    // Vider le conteneur des services
    if (servicesContainer) {
      servicesContainer.innerHTML = '';
    }
    
    // Parcourir les services cochés
    serviceCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const serviceName = checkbox.dataset.service;
        const servicePrice = parseFloat(checkbox.value);
        let calculatedPrice = servicePrice;
        
        // Calculer le prix selon le type de service
        if (checkbox.id === 'parking') {
          // Parking : prix par nuit
          calculatedPrice = servicePrice * data.nights;
        } else if (checkbox.id === 'breakfast') {
          // Petit-déjeuner : prix par personne par nuit
          // Récupérer le nombre total de personnes depuis les inputs
          const adultsCount = parseInt(document.getElementById('adults')?.value || data.adults || 2);
          const childrenCount = parseInt(document.getElementById('children')?.value || 0);
          const totalPersons = adultsCount + childrenCount;
          calculatedPrice = servicePrice * totalPersons * data.nights;
        }
        // Les autres services (spa, transfert, late checkout) sont des prix fixes
        
        totalServices += calculatedPrice;
        
        // Ajouter la ligne de service
        if (servicesContainer) {
          const serviceLine = document.createElement('div');
          serviceLine.className = 'price-line service-line';
          serviceLine.innerHTML = `
            <span>${serviceName}</span>
            <span>${calculatedPrice.toFixed(0)}€</span>
          `;
          servicesContainer.appendChild(serviceLine);
        }
      }
    });
    
    // Calculer le total
    const totalRoom = data.nights * data.pricePerNight;
    const grandTotal = totalRoom + totalServices;
    
    // Afficher le total
    if (priceTotal) {
      priceTotal.textContent = grandTotal.toFixed(0) + '€';
    }
  }
  
  /**
   * Gère la soumission du formulaire
   */
  function handleFormSubmit(e) {
    e.preventDefault();
    
    // Vérifier que les conditions sont acceptées
    const acceptTerms = document.getElementById('acceptTerms');
    if (!acceptTerms.checked) {
      alert('Vous devez accepter les conditions générales pour continuer.');
      return;
    }
    
    // Récupérer toutes les données du formulaire
    const formData = collectFormData();
    
    // Afficher un message de confirmation
    displayConfirmation(formData);
  }
  
  /**
   * Collecte toutes les données du formulaire
   */
  function collectFormData() {
    const data = {
      // Informations personnelles
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      postalCode: document.getElementById('postalCode').value,
      country: document.getElementById('country').value,
      
      // Nombre de voyageurs
      adults: parseInt(document.getElementById('adults')?.value || 2),
      children: parseInt(document.getElementById('children')?.value || 0),
      
      // Services
      services: [],
      
      // Demandes spéciales
      specialRequests: document.getElementById('specialRequests').value,
      arrivalTime: document.getElementById('arrivalTime').value,
      
      // Newsletter
      newsletter: document.getElementById('newsletter').checked,
      
      // Données de réservation
      booking: window.bookingData
    };
    
    // Récupérer les services sélectionnés
    serviceCheckboxes.forEach(checkbox => {
      if (checkbox.checked) {
        data.services.push({
          name: checkbox.dataset.service,
          price: checkbox.value
        });
      }
    });
    
    return data;
  }
  
  /**
   * Affiche un message de confirmation
   */
  function displayConfirmation(data) {
    // Calculer le total
    const totalRoom = data.booking.nights * data.booking.pricePerNight;
    let totalServices = 0;
    
    // Calculer le total des personnes
    const totalPersons = data.adults + data.children;
    
    data.services.forEach(service => {
      let price = parseFloat(service.price);
      if (service.name === 'Parking privé') {
        price *= data.booking.nights;
      } else if (service.name === 'Petit-déjeuner') {
        price *= totalPersons * data.booking.nights;
      }
      totalServices += price;
    });
    
    const grandTotal = totalRoom + totalServices;
    
    // Construire le message
    let message = `🎉 RÉSERVATION CONFIRMÉE 🎉\n\n`;
    message += `📋 INFORMATIONS DU CLIENT\n`;
    message += `Nom : ${data.firstName} ${data.lastName}\n`;
    message += `Email : ${data.email}\n`;
    message += `Téléphone : ${data.phone}\n\n`;
    
    message += `🏨 DÉTAILS DE LA RÉSERVATION\n`;
    message += `Chambre : ${data.booking.roomName}\n`;
    message += `Arrivée : ${data.booking.checkIn} à ${data.booking.checkInTime}\n`;
    message += `Départ : ${data.booking.checkOut} à ${data.booking.checkOutTime}\n`;
    message += `Durée : ${data.booking.nights} nuit(s)\n`;
    
    // Afficher le nombre de voyageurs
    let guestsText = `${data.adults} adulte${data.adults > 1 ? 's' : ''}`;
    if (data.children > 0) {
      guestsText += `, ${data.children} enfant${data.children > 1 ? 's' : ''}`;
    }
    message += `Voyageurs : ${guestsText}\n\n`;
    
    if (data.services.length > 0) {
      message += `✨ SERVICES ADDITIONNELS\n`;
      data.services.forEach(service => {
        message += `- ${service.name}\n`;
      });
      message += `\n`;
    }
    
    if (data.specialRequests) {
      message += `📝 DEMANDES SPÉCIALES\n${data.specialRequests}\n\n`;
    }
    
    if (data.arrivalTime) {
      message += `⏰ HEURE D'ARRIVÉE ESTIMÉE\n${data.arrivalTime}\n\n`;
    }
    
    message += `💰 MONTANT TOTAL : ${grandTotal}€\n\n`;
    message += `📧 Un email de confirmation a été envoyé à ${data.email}\n\n`;
    message += `Merci de votre confiance !`;
    
    alert(message);
    
    // Dans un vrai projet, on redirigerait vers une page de confirmation
    // window.location.href = 'confirmation.html?booking=' + bookingId;
  }
  
});