/* ==========================================================
   BOOKING.JS - Logique de la page de réservation
   Projet : Hôtel Booking (Bloc 1)
   ----------------------------------------------------------
   Contient :
   - Récupération et affichage des données de réservation (URL)
   - Gestion de la logique des voyageurs (compteurs, maximum 3)
   - Calcul dynamique des prix (chambre + services additionnels)
   - Formatage des champs de paiement (carte, CVV, expiration)
   - Traitement et récapitulatif final de la soumission
   ========================================================== */

/**
 * @file booking.js
 * @description Logique de la page de réservation: gestion des prix dynamiques,
 * validation des voyageurs, formatage des champs et soumission.
 */

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================================
  // DÉCLARATION DES VARIABLES GLOBALES
  // ==========================================================

  const serviceCheckboxes = document.querySelectorAll(
    '.service-item input[type="checkbox"]'
  );
  const servicesContainer = document.getElementById("servicesContainer");
  const priceTotal = document.getElementById("priceTotal");

  /**
   * @typedef {Object} BookingData
   * @property {string} checkIn - Date d'arrivée ISO (ex: '2025-12-10').
   * @property {string} checkOut - Date de départ ISO.
   * @property {string} checkInTime - Heure d'arrivée.
   * @property {string} checkOutTime - Heure de départ.
   * @property {number} nights - Nombre de nuits.
   * @property {number} pricePerNight - Prix unitaire par nuit.
   * @property {string} roomName - Nom de la chambre.
   * @property {number} adults - Nombre d'adultes.
   */

  /** @type {BookingData | null} */
  const bookingData = getBookingDataFromURL();

  // Afficher les données dans le récapitulatif
  if (bookingData) {
    displayBookingSummary(bookingData);
  } else {
    console.warn("Aucune donnée de réservation trouvée dans l'URL.");
  }

  // ==========================================================
  // GESTION DES SERVICES ADDITIONNELS
  // ==========================================================

  serviceCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updatePricing);
  });

  // ==========================================================
  // FORMATAGE AUTOMATIQUE DES CHAMPS
  // ==========================================================

  // Numéro de carte
  const cardNumber = document.getElementById("cardNumber");
  if (cardNumber) {
    cardNumber.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\s/g, "");
      let formattedValue = value.match(/.{1,4}/g)?.join(" ") || value;
      e.target.value = formattedValue;
    });
  }

  // Date d'expiration
  const cardExpiry = document.getElementById("cardExpiry");
  if (cardExpiry) {
    cardExpiry.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4);
      }
      e.target.value = value;
    });
  }

  // CVV (chiffres uniquement)
  const cardCVV = document.getElementById("cardCVV");
  if (cardCVV) {
    cardCVV.addEventListener("input", function (e) {
      e.target.value = e.target.value.replace(/\D/g, "");
    });
  }

  // Téléphone
  const phone = document.getElementById("phone");
  if (phone) {
    phone.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 0 && value[0] === "0") {
        value = value.match(/.{1,2}/g)?.join(" ") || value;
      }
      e.target.value = value;
    });
  }

  // ==========================================================
  // GESTION DU NOMBRE DE VOYAGEURS
  // ==========================================================

  const adultsInput = document.getElementById("adults");
  const childrenInput = document.getElementById("children");
  const adultsMinBtn = document.getElementById("adultsMin");
  const adultsPlusBtn = document.getElementById("adultsPlus");
  const childrenMinBtn = document.getElementById("childrenMin");
  const childrenPlusBtn = document.getElementById("childrenPlus");
  const totalGuestsSpan = document.getElementById("totalGuests");
  const guestsError = document.getElementById("guestsError");
  const guestsAlert = document.getElementById("guestsAlert");

  /** @const {number} */
  const MAX_GUESTS = 3;

  /**
   * Met à jour le total des voyageurs, l'état des compteurs et les messages d'erreur.
   * Met également à jour le prix du petit-déjeuner si coché.
   */
  function updateGuestsTotal() {
    const adults = parseInt(adultsInput.value);
    const children = parseInt(childrenInput.value);
    const total = adults + children;

    totalGuestsSpan.textContent = total;

    if (total > MAX_GUESTS) {
      guestsError.style.display = "block";
      guestsAlert.classList.add("border-danger");
    } else {
      guestsError.style.display = "none";
      guestsAlert.classList.remove("border-danger");
    }

    adultsPlusBtn.disabled = total >= MAX_GUESTS;
    childrenPlusBtn.disabled = total >= MAX_GUESTS;

    adultsMinBtn.disabled = adults <= 1;
    childrenMinBtn.disabled = children <= 0;

    updateGuestsSummary(adults, children);
    updatePricing();
  }

  // Configuration des écouteurs pour les boutons +/-
  if (adultsMinBtn)
    adultsMinBtn.addEventListener("click", () => {
      if (parseInt(adultsInput.value) > 1) {
        adultsInput.value--;
        updateGuestsTotal();
      }
    });
  if (adultsPlusBtn)
    adultsPlusBtn.addEventListener("click", () => {
      const current = parseInt(adultsInput.value);
      const children = parseInt(childrenInput.value);
      if (current + children < MAX_GUESTS) {
        adultsInput.value++;
        updateGuestsTotal();
      }
    });

  if (childrenMinBtn)
    childrenMinBtn.addEventListener("click", () => {
      if (parseInt(childrenInput.value) > 0) {
        childrenInput.value--;
        updateGuestsTotal();
      }
    });
  if (childrenPlusBtn)
    childrenPlusBtn.addEventListener("click", () => {
      const current = parseInt(childrenInput.value);
      const adults = parseInt(adultsInput.value);
      if (current + adults < MAX_GUESTS) {
        childrenInput.value++;
        updateGuestsTotal();
      }
    });

  if (adultsInput && childrenInput) {
    updateGuestsTotal();
  }

  /**
   * Met à jour le récapitulatif du nombre de voyageurs dans la colonne de droite.
   * @param {number} adults - Nombre d'adultes.
   * @param {number} children - Nombre d'enfants.
   */
  function updateGuestsSummary(adults, children) {
    const summaryText = document.querySelector(".summary-room-info p");
    if (summaryText) {
      let text = "";
      if (adults > 0) {
        text += `${adults} adulte${adults > 1 ? "s" : ""}`;
      }
      if (children > 0) {
        text +=
          (adults > 0 ? ", " : "") +
          `${children} enfant${children > 1 ? "s" : ""}`;
      }
      summaryText.innerHTML = `<i class="bi bi-people"></i> ${text}`;
    }
  }

  // ==========================================================
  // SOUMISSION DU FORMULAIRE
  // ==========================================================

  const bookingForm = document.getElementById("bookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", handleFormSubmit);
  }

  // ==========================================================
  // FONCTIONS UTILITAIRES
  // ==========================================================

  /**
   * Récupère les données de réservation passées via les paramètres de l'URL.
   * @returns {BookingData | null} Les données de réservation ou null si incomplètes.
   */
  function getBookingDataFromURL() {
    const urlParams = new URLSearchParams(window.location.search);

    const checkIn = urlParams.get("checkIn");
    const checkOut = urlParams.get("checkOut");
    const checkInTime = urlParams.get("checkInTime") || "15:00";
    const checkOutTime = urlParams.get("checkOutTime") || "11:00";
    const nights = urlParams.get("nights");
    const price = urlParams.get("price") || "770";
    const roomName = urlParams.get("roomName") || "Villa sur l'eau";
    const adults = urlParams.get("adults") || "2";

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
      adults: parseInt(adults),
    };
  }

  /**
   * Affiche le récapitulatif de la réservation dans la sidebar.
   * @param {BookingData} data - Les données de la réservation.
   */
  function displayBookingSummary(data) {
    const summaryRoomName = document.getElementById("summaryRoomName");
    if (summaryRoomName) summaryRoomName.textContent = data.roomName;

    const summaryCheckIn = document.getElementById("summaryCheckIn");
    const summaryCheckInTime = document.getElementById("summaryCheckInTime");
    if (summaryCheckIn)
      summaryCheckIn.textContent = formatDateShort(data.checkIn);
    if (summaryCheckInTime) summaryCheckInTime.textContent = data.checkInTime;

    const summaryCheckOut = document.getElementById("summaryCheckOut");
    const summaryCheckOutTime = document.getElementById("summaryCheckOutTime");
    if (summaryCheckOut)
      summaryCheckOut.textContent = formatDateShort(data.checkOut);
    if (summaryCheckOutTime)
      summaryCheckOutTime.textContent = data.checkOutTime;

    const summaryNights = document.getElementById("summaryNights");
    if (summaryNights) {
      // Utilise l'objet i18n pour la traduction si disponible
      const nightsText = window.i18n
        ? window.i18n.t("booking.summaryNights")
        : data.nights > 1
        ? " nuits"
        : " nuit";
      summaryNights.textContent = data.nights + nightsText;
    }

    const priceNights = document.getElementById("priceNights");
    const priceRoom = document.getElementById("priceRoom");
    if (priceNights) priceNights.textContent = data.nights;
    if (priceRoom) {
      const totalRoom = data.nights * data.pricePerNight;
      priceRoom.textContent = totalRoom.toFixed(0) + "€";
    }

    // Stocker les données pour les calculs (accessible via window.bookingData)
    window.bookingData = data;

    updatePricing();
  }

  /**
   * Formate une date au format court pour le récapitulatif (ex: "Jeu. 25 nov.").
   * @param {string} dateStr - Date au format ISO (AAAA-MM-JJ).
   * @returns {string} La date formatée.
   */
  function formatDateShort(dateStr) {
    const date = new Date(dateStr);
    const options = { weekday: "short", day: "numeric", month: "short" };
    return date.toLocaleDateString("fr-FR", options);
  }

  /**
   * Met à jour le récapitulatif des prix en fonction des services sélectionnés.
   */
  function updatePricing() {
    if (!window.bookingData) return;

    const data = window.bookingData;
    let totalServices = 0;

    if (servicesContainer) {
      servicesContainer.innerHTML = "";
    }

    serviceCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const serviceName = checkbox.dataset.service;
        const servicePrice = parseFloat(checkbox.value);
        let calculatedPrice = servicePrice;

        if (checkbox.id === "parking") {
          calculatedPrice = servicePrice * data.nights;
        } else if (checkbox.id === "breakfast") {
          const adultsCount = parseInt(
            document.getElementById("adults")?.value || data.adults || 2
          );
          const childrenCount = parseInt(
            document.getElementById("children")?.value || 0
          );
          const totalPersons = adultsCount + childrenCount;
          calculatedPrice = servicePrice * totalPersons * data.nights;
        }

        totalServices += calculatedPrice;

        if (servicesContainer) {
          const serviceLine = document.createElement("div");
          serviceLine.className = "price-line service-line";
          serviceLine.innerHTML = `
            <span>${serviceName}</span>
            <span>${calculatedPrice.toFixed(0)}€</span>
          `;
          servicesContainer.appendChild(serviceLine);
        }
      }
    });

    const totalRoom = data.nights * data.pricePerNight;
    const grandTotal = totalRoom + totalServices;

    if (priceTotal) {
      priceTotal.textContent = grandTotal.toFixed(0) + "€";
    }
  }

  /**
   * Gère la soumission du formulaire, vérifie les termes, et affiche la confirmation.
   * @param {Event} e - L'événement de soumission.
   */
  function handleFormSubmit(e) {
    e.preventDefault();

    const acceptTerms = document.getElementById("acceptTerms");
    // NOTE: La validation de formulaire pour les champs requis est gérée par accessibilite.js
    if (!acceptTerms || !acceptTerms.checked) {
      alert("Vous devez accepter les conditions générales pour continuer.");
      return;
    }

    const formData = collectFormData();
    displayConfirmation(formData);
  }

  /**
   * Collecte toutes les données des champs du formulaire.
   * @returns {Object} Les données du formulaire et de la réservation.
   */
  function collectFormData() {
    const data = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      postalCode: document.getElementById("postalCode").value,
      country: document.getElementById("country").value,

      adults: parseInt(document.getElementById("adults")?.value || 2),
      children: parseInt(document.getElementById("children")?.value || 0),

      services: [],

      specialRequests: document.getElementById("specialRequests").value,
      arrivalTime: document.getElementById("arrivalTime").value,

      newsletter: document.getElementById("newsletter").checked,

      booking: window.bookingData,
    };

    serviceCheckboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        data.services.push({
          name: checkbox.dataset.service,
          price: checkbox.value,
        });
      }
    });

    return data;
  }

  /**
   * Affiche un message d'alerte avec le récapitulatif de la réservation.
   * @param {Object} data - Les données du formulaire et de la réservation.
   */
  function displayConfirmation(data) {
    const totalRoom = data.booking.nights * data.booking.pricePerNight;
    let totalServices = 0;
    const totalPersons = data.adults + data.children;

    data.services.forEach((service) => {
      let price = parseFloat(service.price);
      if (service.name === "Parking privé") {
        price *= data.booking.nights;
      } else if (service.name === "Petit-déjeuner") {
        price *= totalPersons * data.booking.nights;
      }
      totalServices += price;
    });

    const grandTotal = totalRoom + totalServices;

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

    let guestsText = `${data.adults} adulte${data.adults > 1 ? "s" : ""}`;
    if (data.children > 0) {
      guestsText += `, ${data.children} enfant${data.children > 1 ? "s" : ""}`;
    }
    message += `Voyageurs : ${guestsText}\n\n`;

    if (data.services.length > 0) {
      message += `✨ SERVICES ADDITIONNELS\n`;
      data.services.forEach((service) => {
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
  }
});
