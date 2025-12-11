/* ==========================================================
   MAIN.JS - Fonctionnalités principales
   Projet : Hôtel Booking (Bloc 1)
   ----------------------------------------------------------
   Contient :
   - Initialisation du ruban (langue et monnaie)
   - Gestion du menu hamburger
   - Carrousel de la page index
   - Carrousel de la page room avec miniatures
   - Formulaire de recherche
   ========================================================== */

/* ==========================================================
   MENU HAMBURGER (NAVIGATION MOBILE)
   ---------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const hamburgerButton = document.querySelector(".navbar-toggler");
  const menuPrincipal = document.getElementById("menuPrincipal");

  if (hamburgerButton && menuPrincipal) {
    /**
     * Bascule l'affichage du menu mobile (classe 'show').
     */
    hamburgerButton.addEventListener("click", function () {
      menuPrincipal.classList.toggle("show");
    });
  }
});

/* ==========================================================
   CARROUSEL INDEX (PAGE D'ACCUEIL)
   ---------------------------------------------------------- */

/** @type {number} */
let slideIndex = 0;

/** @type {number | null} */
let timer = null;

/* Initialise le carrousel seulement s'il existe sur la page */
const indexCarousel = document.getElementById("hotelCarousel");
if (indexCarousel) {
  showSlides(slideIndex);
  resetTimer();
}

/**
 * Change de slide en fonction de l'incrément.
 * Réinitialise le timer du défilement automatique.
 * @param {number} n - Nombre de slides à avancer ou reculer (ex: 1 ou -1).
 */
function plusSlides(n) {
  slideIndex += n;
  showSlides(slideIndex);
  resetTimer();
}

/**
 * Affiche une slide spécifique en utilisant son index basé sur 1.
 * Réinitialise le timer du défilement automatique.
 * @param {number} n - Index de la slide à afficher (commence à 1).
 */
function currentSlide(n) {
  slideIndex = n - 1;
  showSlides(slideIndex);
  resetTimer();
}

/**
 * Affiche la slide active et met à jour les points indicateurs.
 * Gère le bouclage du carrousel.
 * @param {number} n - Index de la slide à afficher.
 */
function showSlides(n) {
  const slides = document.getElementsByClassName("hotel-slide");
  const dots = document.getElementsByClassName("dot");

  /* Sortie si aucune slide trouvée */
  if (slides.length === 0) return;

  /* Gestion du bouclage */
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  /* Masque toutes les slides */
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].style.opacity = "0";
  }

  /* Retire l'état actif de tous les points */
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("dotActive");
  }

  /* Affiche la slide courante */
  if (slides[slideIndex]) {
    slides[slideIndex].style.display = "block";

    /* Délai pour déclencher la transition opacity */
    setTimeout(function () {
      slides[slideIndex].style.transition = "opacity 0.8s ease";
      slides[slideIndex].style.opacity = "1";
    }, 50);
  }

  /* Active le point correspondant */
  if (dots[slideIndex]) {
    dots[slideIndex].classList.add("dotActive");
  }
}

/**
 * Passe automatiquement à la slide suivante pour le défilement continu.
 */
function autoSlides() {
  slideIndex++;
  showSlides(slideIndex);
}

/**
 * Réinitialise le timer du défilement automatique.
 */
function resetTimer() {
  if (document.getElementById("hotelCarousel")) {
    clearInterval(timer);
    timer = setInterval(autoSlides, 4500);
  }
}

/* ==========================================================
   CARROUSEL ROOM (PAGE DÉTAILS AVEC MINIATURES)
   ---------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("roomCarousel");

  /* Sortie si le carrousel n'existe pas sur la page */
  if (!carousel) {
    return;
  }

  /* Récupération des éléments DOM */
  const thumbnails = document.querySelectorAll(".carousel-thumbnail");
  const thumbnailsScroll = document.getElementById("thumbnailsScroll");
  const scrollLeftBtn = document.getElementById("scrollLeft");
  const scrollRightBtn = document.getElementById("scrollRight");

  /* Attente de l'initialisation complète de Bootstrap */
  /**
   * Initialise le carrousel Bootstrap après un court délai.
   */
  setTimeout(function () {
    /** @type {bootstrap.Carousel} */
    let bsCarousel = bootstrap.Carousel.getInstance(carousel);

    if (!bsCarousel) {
      bsCarousel = new bootstrap.Carousel(carousel, {
        interval: 5000,
        wrap: true,
      });
    }

    /* === Gestion des miniatures === */

    /* Clic sur une miniature pour changer de slide */
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", function (e) {
        e.preventDefault();
        if (bsCarousel) {
          bsCarousel.to(index);
        }
      });
    });

    /* Mise à jour de la miniature active lors du changement de slide */
    carousel.addEventListener("slide.bs.carousel", function (e) {
      /** @type {number} */
      const targetIndex = e.to;

      /* Retire la classe active de toutes les miniatures */
      thumbnails.forEach((thumb) => thumb.classList.remove("active"));

      /* Ajoute la classe active à la miniature correspondante */
      if (thumbnails[targetIndex]) {
        thumbnails[targetIndex].classList.add("active");

        /* Scroll automatique vers la miniature active */
        if (thumbnailsScroll) {
          const activeThumbnail = thumbnails[targetIndex];
          const scrollLeft =
            activeThumbnail.offsetLeft -
            thumbnailsScroll.offsetWidth / 2 +
            activeThumbnail.offsetWidth / 2;

          thumbnailsScroll.scrollTo({
            left: scrollLeft,
            behavior: "smooth",
          });
        }
      }
    });
  }, 100);

  /* === Boutons de navigation des miniatures === */

  /**
   * Fait défiler les miniatures vers la gauche de 250px.
   * @param {Event} e - L'événement de clic sur le bouton.
   */
  if (scrollLeftBtn && thumbnailsScroll) {
    scrollLeftBtn.addEventListener("click", function (e) {
      e.preventDefault();
      thumbnailsScroll.scrollBy({
        left: -250,
        behavior: "smooth",
      });
    });
  }

  /**
   * Fait défiler les miniatures vers la droite de 250px.
   * @param {Event} e - L'événement de clic sur le bouton.
   */
  if (scrollRightBtn && thumbnailsScroll) {
    scrollRightBtn.addEventListener("click", function (e) {
      e.preventDefault();
      thumbnailsScroll.scrollBy({
        left: 250,
        behavior: "smooth",
      });
    });
  }
});

/* ==========================================================
   FORMULAIRE DE RECHERCHE
   ---------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  const btnProceed = document.querySelector(".btn-custom");

  if (btnProceed) {
    btnProceed.addEventListener("click", function (e) {
      e.preventDefault();

      /* Récupération du type de réservation sélectionné */
      const radioChecked = document.querySelector(
        'input[name="radioDefault"]:checked'
      );
      const type = radioChecked
        ? radioChecked.nextElementSibling.textContent
        : "Non sélectionné";

      /* Récupération des valeurs des champs */
      const destination =
        document.getElementById("hotelDestination")?.value || "Non renseignée";
      const checkin =
        document.getElementById("checkin")?.value || "Non renseignée";
      const checkout =
        document.getElementById("checkout")?.value || "Non renseignée";
      const rooms = document.getElementById("rooms")?.value || "Non renseignée";
      const adults =
        document.getElementById("adults")?.value || "Non renseignée";
      const children =
        document.getElementById("children")?.value || "Non renseignée";

      /* Construction du message récapitulatif */
      const message = `
Project Ilaria Bloc 1 Frontend
Ce bloc doit être présenté pour valider l'utilisation du HTML CSS et JavaScript.
Aucune de ces données ne peuvent être traitées dans le backend.
Pour valider le bon fonctionnement du formulaire de recherche, les données renseignées s'afficheront ci-dessous :

Données renseignées :

Type : ${type}
Destination : ${destination}
Check-in : ${checkin}
Check-out : ${checkout}
Chambres : ${rooms}
Adultes : ${adults}
Enfants : ${children}
      `;

      /* Affichage du message */
      alert(message);
    });
  }
});
