/* ==========================================================
   ACCESSIBILITE.JS - Améliorations WCAG et ARIA
   Projet : Hôtel Booking (Bloc 1)
   ----------------------------------------------------------
   Contient :
   - Validation de formulaire côté client (requis, email, tel)
   - Gestion des classes .is-invalid/is-valid et attributs ARIA
   - Annonce de statut de formulaire pour les lecteurs d'écran
   - Amélioration de l'accessibilité des Dropdowns Bootstrap
   - Gestion de l'état 'aria-current' des liens de navigation
   ========================================================== */

/**
 * @file accessibilite.js
 * @description Fonctions d'accessibilité: validation de formulaire,
 * gestion du focus, gestion des rôles ARIA.
 */

document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;
      const requiredFields = form.querySelectorAll(
        '[required], [aria-required="true"]'
      );

      requiredFields.forEach((field) => {
        if (!validateField(field)) {
          isValid = false;
        }
      });

      if (isValid) {
        announceFormStatus("Formulaire valide. Envoi en cours...", "success");
      } else {
        announceFormStatus(
          "Le formulaire contient des erreurs. Veuillez les corriger.",
          "error"
        );
        const firstInvalid = form.querySelector(".is-invalid");
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });

    const fields = form.querySelectorAll("input, select, textarea");
    fields.forEach((field) => {
      // Validation au 'blur' (quand le champ perd le focus)
      field.addEventListener("blur", function () {
        validateField(this);
      });

      // Re-validation pendant la saisie si le champ est déjà invalide
      field.addEventListener("input", function () {
        if (this.classList.contains("is-invalid")) {
          validateField(this);
        }
      });
    });
  });

  setupAccessibleDropdowns();
  setupAccessibleNavigation();
});

/**
 * Valide un champ de formulaire (requis, email, téléphone) et met à jour les attributs ARIA.
 * @param {HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement} field - L'élément de formulaire à valider.
 * @returns {boolean} Vrai si le champ est valide.
 */
function validateField(field) {
  const errorId =
    field
      .getAttribute("aria-describedby")
      ?.split(" ")
      .find((id) => id.includes("error")) || `${field.id}-error`;
  let errorElement = document.getElementById(errorId);

  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.id = errorId;
    errorElement.className = "invalid-feedback";
    errorElement.setAttribute("role", "alert");
    field.parentNode.appendChild(errorElement);

    const describedBy = field.getAttribute("aria-describedby") || "";
    field.setAttribute("aria-describedby", `${describedBy} ${errorId}`.trim());
  }

  let isValid = true;
  let errorMessage = "";

  // 1. Validation requis
  if (
    field.hasAttribute("required") ||
    field.getAttribute("aria-required") === "true"
  ) {
    if (!field.value.trim()) {
      isValid = false;
      errorMessage = "Ce champ est obligatoire.";
    }
  }

  // 2. Validation Email
  if (field.type === "email" && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      errorMessage = "Veuillez entrer une adresse email valide.";
    }
  }

  // 3. Validation Téléphone
  if (field.type === "tel" && field.value) {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(field.value)) {
      isValid = false;
      errorMessage = "Veuillez entrer un numéro de téléphone valide.";
    }
  }

  // Mise à jour de l'état visuel et ARIA
  if (isValid) {
    field.classList.remove("is-invalid");
    field.classList.add("is-valid");
    field.setAttribute("aria-invalid", "false");
    errorElement.textContent = "";
  } else {
    field.classList.remove("is-valid");
    field.classList.add("is-invalid");
    field.setAttribute("aria-invalid", "true");
    errorElement.textContent = errorMessage;
  }

  return isValid;
}

/**
 * Annonce le statut du formulaire (succès ou erreur) aux technologies d'assistance.
 * @param {string} message - Le message à annoncer.
 * @param {'success' | 'error'} type - Le type de statut pour le style visuel.
 */
function announceFormStatus(message, type) {
  const statusId = "formStatus";
  let statusElement = document.getElementById(statusId);

  if (!statusElement) {
    statusElement = document.createElement("div");
    statusElement.id = statusId;
    statusElement.setAttribute("role", "status"); // Rôle pour les mises à jour non critiques
    statusElement.setAttribute("aria-live", "polite"); // Annonce les changements lorsque le lecteur est libre
    statusElement.setAttribute("aria-atomic", "true"); // Annonce le contenu complet du changement

    const form = document.querySelector("form");
    if (form) {
      form.appendChild(statusElement);
    }
  }

  statusElement.textContent = message;
  statusElement.className =
    type === "error" ? "alert alert-danger mt-3" : "alert alert-success mt-3";
}

/**
 * Ajoute la gestion ARIA (aria-expanded) aux dropdowns Bootstrap.
 */
function setupAccessibleDropdowns() {
  const dropdownToggles = document.querySelectorAll(
    '[data-bs-toggle="dropdown"]'
  );

  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("show.bs.dropdown", function () {
      this.setAttribute("aria-expanded", "true");
    });

    toggle.addEventListener("hide.bs.dropdown", function () {
      this.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * Met à jour l'attribut ARIA 'aria-current' pour le lien de navigation actif.
 */
function setupAccessibleNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.setAttribute("aria-current", "page");
      link.classList.add("active");
    } else {
      link.removeAttribute("aria-current");
      link.classList.remove("active");
    }
  });
}
