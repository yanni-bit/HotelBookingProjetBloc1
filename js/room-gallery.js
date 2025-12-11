/* ==========================================================
   ROOM-GALLERY.JS - Gestion de la galerie lightbox
   Projet : Hôtel Booking (Bloc 1)
   ----------------------------------------------------------
   Contient :
   - Ouverture de la lightbox pour les images
   - Synchronisation avec le carrousel Bootstrap
   - Navigation par clavier (flèches gauche/droite)
   ========================================================== */

/**
 * @file room-gallery.js
 * @description Gère l'ouverture de la lightbox pour les images de la chambre
 * et synchronise la navigation avec le mini-carrousel Bootstrap.
 */

document.addEventListener("DOMContentLoaded", function () {
  const offerModalLightbox = document.getElementById("offerModalLightbox");
  /** @type {HTMLImageElement} */
  const lightboxImage = document.getElementById("lightboxImage");
  const roomOfferCarousel = document.getElementById("roomOfferCarousel");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  // Récupérer toutes les images du mini-carrousel
  /** @type {HTMLImageElement[]} */
  const carouselImages = Array.from(
    roomOfferCarousel.querySelectorAll(".carousel-inner img")
  );
  let currentImageIndex = 0;

  /**
   * Met à jour l'image affichée dans la lightbox et synchronise le carrousel principal.
   * @param {number} index - Index de la nouvelle image.
   */
  function updateLightboxImage(index) {
    currentImageIndex = (index + carouselImages.length) % carouselImages.length; // Assure le bouclage
    lightboxImage.src = carouselImages[currentImageIndex].src;

    // Synchroniser le mini-carrousel principal sur l'image affichée dans la lightbox
    const bsCarousel = bootstrap.Carousel.getInstance(roomOfferCarousel);
    if (bsCarousel) {
      bsCarousel.to(currentImageIndex);
    }
  }

  // Événement déclenché lors de l'ouverture de la modale (au clic sur une image)
  offerModalLightbox.addEventListener("show.bs.modal", function (event) {
    /** @type {HTMLElement} */
    const button = event.relatedTarget; // Le bouton qui a déclenché la modale

    // Récupère l'index de la slide cliquée et initialise la lightbox
    const slideIndex = parseInt(button.dataset.slideIndex);
    updateLightboxImage(slideIndex);
  });

  // Événement au clic sur le bouton "Précédent" de la modale
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      updateLightboxImage(currentImageIndex - 1);
    });
  }

  // Événement au clic sur le bouton "Suivant" de la modale
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      updateLightboxImage(currentImageIndex + 1);
    });
  }

  // Permettre la navigation par flèches du clavier
  document.addEventListener("keydown", function (event) {
    if (offerModalLightbox.classList.contains("show")) {
      if (event.key === "ArrowLeft") {
        updateLightboxImage(currentImageIndex - 1);
      } else if (event.key === "ArrowRight") {
        updateLightboxImage(currentImageIndex + 1);
      }
    }
  });
});
