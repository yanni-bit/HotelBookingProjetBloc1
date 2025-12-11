/* ==========================================================
   CALENDRIER.JS - Gestion du Calendrier et Calcul de Séjour
   Projet : Hôtel Booking (Bloc 1)
   ----------------------------------------------------------
   Contient :
   - Initialisation et configuration de la librairie Flatpickr
   - Gestion des sélections de dates (Check-in/Check-out)
   - Calcul du nombre de nuits et du prix total du séjour
   - Mise à jour dynamique de l'affichage du récapitulatif
   - Logique pour les formulaires de dates mobiles alternatifs
   ========================================================== */

/**
 * @file calendrier.js
 * @description Intégration de Flatpickr pour la sélection des dates de réservation et calcul du prix.
 */

document.addEventListener("DOMContentLoaded", function () {
  /** @const {number} */
  const PRIX_PAR_NUIT = 770;

  // Éléments DOM
/** @type {HTMLElement | null} */
const checkInInfo = document.getElementById("checkInInfo");
/** @type {HTMLElement | null} */
const checkOutInfo = document.getElementById("checkOutInfo");
/** @type {HTMLElement | null} */
const checkInText = document.getElementById("checkInText");
/** @type {HTMLElement | null} */
const checkOutText = document.getElementById("checkOutText");
/** @type {HTMLInputElement | null} */
const checkInTimeInput = document.getElementById("checkInTime");
/** @type {HTMLInputElement | null} */
const checkOutTimeInput = document.getElementById("checkOutTime");
/** @type {HTMLElement | null} */
const nightsCount = document.getElementById("nightsCount");
/** @type {HTMLElement | null} */
const nightsNumber = document.getElementById("nightsNumber");
/** @type {HTMLElement | null} */
const totalPrice = document.getElementById("totalPrice");
/** @type {HTMLButtonElement | null} */
const confirmBtn = document.getElementById("confirmBtn");
/** @type {HTMLButtonElement | null} */
const resetBtn = document.getElementById("resetBtn");

  // Variables pour stocker les dates et l'instance Flatpickr
  /** @type {Date | null} */
  let checkInDate = null;
  /** @type {Date | null} */
  let checkOutDate = null;
  /** @type {import('flatpickr/dist/types/instance').Instance | null} */
  let flatpickrInstance = null;

  /**
   * Initialise l'instance Flatpickr sur l'élément #flatpickr-calendar.
   */
  function initializeFlatpickr() {
    if (flatpickrInstance) return;

    flatpickrInstance = flatpickr("#flatpickr-calendar", {
      mode: "range",
      minDate: "today",
      dateFormat: "Y-m-d", // Format interne pour le JS
      locale: "fr",
      inline: true,
      showMonths: 1,

      /**
       * Callback déclenché au changement de sélection de date.
       * @param {Date[]} selectedDates - Tableau des dates sélectionnées.
       */
      onChange: function (selectedDates, dateStr, instance) {
        if (selectedDates.length === 2) {
          checkInDate = selectedDates[0];
          checkOutDate = selectedDates[1];

          const diffTime = Math.abs(checkOutDate - checkInDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          updateDisplay(checkInDate, checkOutDate, diffDays);
          confirmBtn.disabled = false;
        } else if (selectedDates.length === 1) {
          checkInDate = selectedDates[0];
          checkOutDate = null;

          updateInfo(); // Affiche seulement la date d'arrivée

          if (checkOutInfo) checkOutInfo.style.display = "none";
          if (nightsCount) nightsCount.style.display = "none";
          confirmBtn.disabled = true;
        } else {
          resetDisplay();
        }
      },

      /**
       * Callback Flatpickr pour personnaliser l'apparence des jours.
       * @param {Date[]} datesObj - Tableau des dates affichées.
       * @param {string} dStr - Date formatée en string.
       * @param {Object} fp - Instance Flatpickr.
       * @param {HTMLElement} dayElem - Élément DOM du jour.
       */
      onDayCreate: function (datesObj, dStr, fp, dayElem) {
        // Personnalisation des jours (actuellement vide)
      },
    });

    // Écouteurs pour les changements d'heures après initialisation
    if (checkInTimeInput) {
      checkInTimeInput.addEventListener("change", updateInfo);
    }
    if (checkOutTimeInput) {
      checkOutTimeInput.addEventListener("change", updateInfo);
    }
    if (resetBtn) {
      resetBtn.addEventListener("click", handleReset);
    }
    if (confirmBtn) {
      confirmBtn.addEventListener("click", handleConfirm);
    }
  }

  // Événement pour initialiser Flatpickr lors de l'affichage de l'onglet Disponibilité
  const availabilityTab = document.getElementById("availability-tab");
  if (availabilityTab) {
    availabilityTab.addEventListener("shown.bs.tab", initializeFlatpickr);
  }

  /**
   * Met à jour les informations affichées après un changement d'heure ou de date unique.
   */
  function updateInfo() {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      updateDisplay(checkInDate, checkOutDate, diffDays);
    } else if (checkInDate) {
      const checkInTime = checkInTimeInput ? checkInTimeInput.value : "15:00";
      const checkInDateLong = formatDateLong(checkInDate);
      if (checkInInfo && checkInText) {
        checkInText.textContent = `Arrivée : ${checkInDateLong} à ${checkInTime}`;
        checkInInfo.style.display = "block";
      }
    }
  }

  /**
   * Formate une date au format long (ex: "Mardi 25 novembre 2025").
   * @param {Date} date - L'objet Date à formater.
   * @returns {string} La date formatée et capitalisée.
   */
  function formatDateLong(date) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formatted = date.toLocaleDateString("fr-FR", options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }

  /**
   * Met à jour l'affichage des dates, heures, nuits et prix total.
   * @param {Date} checkIn - Date d'arrivée.
   * @param {Date} checkOut - Date de départ.
   * @param {number} nights - Nombre de nuits.
   */
  function updateDisplay(checkIn, checkOut, nights) {
    const checkInTime = checkInTimeInput ? checkInTimeInput.value : "15:00";
    const checkOutTime = checkOutTimeInput ? checkOutTimeInput.value : "11:00";

    const checkInDateLong = formatDateLong(checkIn);
    const checkOutDateLong = formatDateLong(checkOut);

    if (checkInInfo && checkInText) {
      checkInText.textContent = `Arrivée : ${checkInDateLong} à ${checkInTime}`;
      checkInInfo.style.display = "block";
    }

    if (checkOutInfo && checkOutText) {
      checkOutText.textContent = `Départ : ${checkOutDateLong} à ${checkOutTime}`;
      checkOutInfo.style.display = "block";
    }

    if (nightsCount && nightsNumber && totalPrice) {
      nightsNumber.textContent = nights;
      const total = nights * PRIX_PAR_NUIT;
      totalPrice.textContent = `${total}€`;
      nightsCount.style.display = "block";
    }
  }

  /**
   * Masque l'affichage des informations de réservation.
   */
  function resetDisplay() {
    if (checkInInfo) checkInInfo.style.display = "none";
    if (checkOutInfo) checkOutInfo.style.display = "none";
    if (nightsCount) nightsCount.style.display = "none";
    if (confirmBtn) confirmBtn.disabled = true;
  }

  /**
   * Gère le clic sur le bouton Réinitialiser (Flatpickr et affichage).
   */
  function handleReset() {
    if (flatpickrInstance) {
      flatpickrInstance.clear();
    }
    checkInDate = null;
    checkOutDate = null;
    resetDisplay();

    // Réinitialiser les inputs mobiles
    const mobileCheckInInput = document.getElementById("mobileCheckIn");
    const mobileCheckOutInput = document.getElementById("mobileCheckOut");
    if (mobileCheckInInput) mobileCheckInInput.value = "";
    if (mobileCheckOutInput) mobileCheckOutInput.value = "";
  }

  /**
   * Gère le clic sur le bouton Confirmer (Redirection vers booking.html).
   */
  function handleConfirm() {
    if (checkInDate && checkOutDate) {
      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const checkInTime = checkInTimeInput ? checkInTimeInput.value : "15:00";
      const checkOutTime = checkOutTimeInput
        ? checkOutTimeInput.value
        : "11:00";

      // Formater les dates pour l'URL (format ISO)
      const checkInISO = checkInDate.toISOString().split("T")[0];
      const checkOutISO = checkOutDate.toISOString().split("T")[0];

      const roomName =
        document.querySelector(".hotel-header-box h2")?.textContent ||
        "Villa sur l'eau";

      const params = new URLSearchParams({
        checkIn: checkInISO,
        checkOut: checkOutISO,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        nights: diffDays,
        price: PRIX_PAR_NUIT,
        roomName: roomName,
        adults: 2,
      });

      window.location.href = `booking.html?${params.toString()}`;
    }
  }

  // Initialisation de l'affichage au chargement
  resetDisplay();

  // ==========================================================
  // GESTION DU FORMULAIRE MOBILE (< 400px)
  // ==========================================================

  /** @type {HTMLInputElement | null} */
  const mobileCheckInInput = document.getElementById("mobileCheckIn");
  /** @type {HTMLInputElement | null} */
  const mobileCheckOutInput = document.getElementById("mobileCheckOut");

  if (mobileCheckInInput && mobileCheckOutInput) {
    const today = new Date().toISOString().split("T")[0];
    mobileCheckInInput.min = today;
    mobileCheckOutInput.min = today;

    mobileCheckInInput.addEventListener("change", function () {
      const checkIn = new Date(this.value);
      checkInDate = checkIn;

      mobileCheckOutInput.min = this.value;

      const checkInTime = checkInTimeInput ? checkInTimeInput.value : "15:00";
      const checkInDateLong = formatDateLong(checkIn);

      if (checkInInfo && checkInText) {
        checkInText.textContent = `Arrivée : ${checkInDateLong} à ${checkInTime}`;
        checkInInfo.style.display = "block";
      }

      if (!mobileCheckOutInput.value) {
        if (checkOutInfo) checkOutInfo.style.display = "none";
        if (nightsCount) nightsCount.style.display = "none";
      }

      if (mobileCheckOutInput.value) {
        calculateMobileBooking();
      }
    });

    mobileCheckOutInput.addEventListener("change", function () {
      if (mobileCheckInInput.value) {
        calculateMobileBooking();
      }
    });

    // Écouter les changements d'heures aussi pour mettre à jour l'affichage mobile
    if (checkInTimeInput) {
      checkInTimeInput.addEventListener("change", function () {
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
      checkOutTimeInput.addEventListener("change", function () {
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

  /**
   * Calcule et affiche les détails de la réservation basés sur les inputs mobiles.
   */
  function calculateMobileBooking() {
    if (!mobileCheckInInput.value || !mobileCheckOutInput.value) return;

    checkInDate = new Date(mobileCheckInInput.value);
    checkOutDate = new Date(mobileCheckOutInput.value);

    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      updateDisplay(checkInDate, checkOutDate, diffDays);
      confirmBtn.disabled = false;
    }
  }
});
