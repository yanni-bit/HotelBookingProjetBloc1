/* ==========================================================
   CONTACT.JS - Logique de la page de contact
   Projet : Hôtel Booking (Bloc 1)
   ----------------------------------------------------------
   Contient :
   - Gestion de la soumission du formulaire de contact
   - Validation des données côté client (email, longueur message)
   - Formatage automatique du champ Téléphone (ajout d'espaces)
   - Affichage d'une modale de confirmation détaillée (récapitulatif)
   - Gestion des erreurs de chargement de la carte Google Maps
   ========================================================== */

/**
 * @file contact.js
 * @description Gère la soumission du formulaire de contact, la validation des données,
 * le formatage du téléphone, et l'affichage de la modale de succès.
 */

document.addEventListener("DOMContentLoaded", function () {
  // ==========================================================
  // GESTION DU FORMULAIRE DE CONTACT
  // ==========================================================

  const contactForm = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  /** @type {HTMLInputElement | null} */
  const phoneInput = document.getElementById("phone");

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }

  // Formatage automatique du téléphone (ajout d'espaces)
  if (phoneInput) {
    /**
     * Formate automatiquement le numéro de téléphone (ajoute des espaces).
     * @param {Event} e - L'événement input.
     */
    phoneInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length > 0 && value[0] === "0") {
        value = value.match(/.{1,2}/g)?.join(" ") || value;
      }
      e.target.value = value;
    });
  }

  /**
   * Gère la soumission du formulaire, valide et affiche la confirmation.
   * @param {Event} e - L'événement de soumission du formulaire.
   */
  function handleFormSubmit(e) {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: phoneInput ? phoneInput.value : "",
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    // NOTE: La validation des champs requis est principalement gérée par accessibilite.js
    if (!validateForm(formData)) {
      return;
    }

    displaySuccessMessage(formData);
    contactForm.reset();
  }

  /**
   * Effectue une validation secondaire des données (longueur du message, etc.).
   * @param {Object} data - Les données collectées du formulaire.
   * @returns {boolean} Vrai si le formulaire est valide.
   */
  function validateForm(data) {
    if (!data.name || !data.email || !data.subject || !data.message) {
      // NOTE: Dans un environnement réel, on utiliserait la validation de accessibilite.js
      // pour afficher des messages près des champs.
      alert("Veuillez remplir tous les champs obligatoires.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert("Veuillez entrer une adresse email valide.");
      return false;
    }

    if (data.message.length < 10) {
      alert("Votre message doit contenir au moins 10 caractères.");
      return false;
    }

    return true;
  }

  /**
   * Affiche le message de succès dans une modale Bootstrap.
   * @param {Object} data - Les données du formulaire soumises.
   */
  function displaySuccessMessage(data) {
    const subjectText = getSubjectText(data.subject);

    const modalHTML = `
      <div class="modal fade" id="confirmationModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header bg-success text-white">
              <h5 class="modal-title">
                <i class="bi bi-check-circle-fill me-2"></i>
                Message envoyé avec succès !
              </h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="confirmation-details">
                <p class="lead mb-4">Merci <strong>${data.name}</strong> !</p>
                
                <div class="info-row">
                  <i class="bi bi-person-fill text-primary"></i>
                  <div>
                    <small class="text-muted">Nom</small>
                    <p class="mb-0"><strong>${data.name}</strong></p>
                  </div>
                </div>
                
                <div class="info-row">
                  <i class="bi bi-envelope-fill text-primary"></i>
                  <div>
                    <small class="text-muted">Email</small>
                    <p class="mb-0"><strong>${data.email}</strong></p>
                  </div>
                </div>
                
                ${
                  data.phone
                    ? `
                <div class="info-row">
                  <i class="bi bi-telephone-fill text-primary"></i>
                  <div>
                    <small class="text-muted">Téléphone</small>
                    <p class="mb-0"><strong>${data.phone}</strong></p>
                  </div>
                </div>
                `
                    : ""
                }
                
                <div class="info-row">
                  <i class="bi bi-tag-fill text-primary"></i>
                  <div>
                    <small class="text-muted">Sujet</small>
                    <p class="mb-0"><strong>${subjectText}</strong></p>
                  </div>
                </div>
                
                <div class="info-row">
                  <i class="bi bi-chat-left-text-fill text-primary"></i>
                  <div>
                    <small class="text-muted">Message</small>
                    <p class="mb-0">${data.message}</p>
                  </div>
                </div>
                
                <div class="alert alert-info mt-4 mb-0">
                  <i class="bi bi-info-circle-fill me-2"></i>
                  <strong>Un email de confirmation a été envoyé à ${
                    data.email
                  }</strong>
                  <p class="mb-0 mt-2">Notre équipe vous répondra dans les plus brefs délais (généralement sous 24h).</p>
                </div>
                
                <div class="alert alert-warning mt-3 mb-0">
                  <i class="bi bi-exclamation-triangle-fill me-2"></i>
                  <strong>Pour toute urgence :</strong>
                  <p class="mb-0">Contactez-nous au <a href="tel:1-555-555-5555">1-555-555-5555</a></p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
                <i class="bi bi-check-lg me-2"></i>
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Supprimer l'ancienne modal si elle existe
    const oldModal = document.getElementById("confirmationModal");
    if (oldModal) {
      oldModal.remove();
    }

    // Ajouter la modal au body et l'afficher
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    const modalElement = document.getElementById("confirmationModal");
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();

      // Nettoyer après fermeture
      modalElement.addEventListener("hidden.bs.modal", function () {
        this.remove();
      });
    }

    // Afficher le message de succès dans la page
    if (successMessage) {
      successMessage.style.display = "block";

      setTimeout(function () {
        successMessage.style.display = "none";
      }, 5000);

      successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  /**
   * Retourne le texte complet correspondant à la valeur du sujet sélectionné.
   * @param {string} subjectValue - La valeur technique (ex: 'reservation').
   * @returns {string} Le texte descriptif (ex: 'Réservation').
   */
  function getSubjectText(subjectValue) {
    const subjects = {
      reservation: "Réservation",
      information: "Demande d'information",
      reclamation: "Réclamation",
      autre: "Autre",
    };

    return subjects[subjectValue] || "Votre demande";
  }

  // ==========================================================
  // GESTION DE LA CARTE GOOGLE MAPS (Gestion des erreurs)
  // ==========================================================

  window.addEventListener("load", function () {
    const iframe = document.querySelector(".map-container iframe");

    if (iframe) {
      /**
       * Gère l'événement d'erreur de chargement de l'iframe Google Maps.
       */
      iframe.addEventListener("error", function () {
        console.error("Erreur de chargement de Google Maps");

        const mapContainer = document.querySelector(".map-container");
        if (mapContainer) {
          // Utilisation d'un template string pour le HTML alternatif
          mapContainer.innerHTML = `
            <div class="map-error" style="
              height: 400px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: #f5f5f5;
              border-radius: 12px;
              flex-direction: column;
              gap: 1rem;
            ">
              <i class="bi bi-geo-alt-fill" style="font-size: 3rem; color: var(--turquoise);"></i>
              <p style="color: var(--gris-fonce); font-weight: 600;">
                Book Your Travel
              </p>
              <p style="color: var(--gris-moyen);">
                1400 PennsylSUVia Ave. Washington, DC
              </p>
              <a href="https://www.google.com/maps" target="_blank" class="btn btn-primary">
                Voir sur Google Maps
              </a>
            </div>
          `;
        }
      });
    }
  });

  // ==========================================================
  // SMOOTH SCROLL POUR LES ANCRES (Déjà présent dans main.js, mais conservé ici)
  // ==========================================================

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    /**
     * Gère le scroll fluide vers l'ancre cliquée.
     * @param {Event} e - L'événement de clic.
     */
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
