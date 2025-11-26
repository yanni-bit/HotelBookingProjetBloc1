document.addEventListener('DOMContentLoaded', function () {
    const offerModalLightbox = document.getElementById('offerModalLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const roomOfferCarousel = document.getElementById('roomOfferCarousel');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    // Récupérer toutes les images du mini-carrousel
    const carouselImages = Array.from(roomOfferCarousel.querySelectorAll('.carousel-inner img'));
    let currentImageIndex = 0;

    // Événement déclenché lors de l'ouverture de la modale (au clic sur une image)
    offerModalLightbox.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget; // Le bouton qui a déclenché la modale
        const imageSrc = button.querySelector('img').src;
        currentImageIndex = parseInt(button.dataset.slideIndex); // Récupère l'index de la slide

        lightboxImage.src = imageSrc;
        updateLightboxNavigation();
    });

    // Fonction pour mettre à jour l'image de la lightbox
    function updateLightboxImage(index) {
        currentImageIndex = (index + carouselImages.length) % carouselImages.length; // Assure le bouclage
        lightboxImage.src = carouselImages[currentImageIndex].src;
        updateLightboxNavigation();

        // Synchroniser le mini-carrousel principal sur l'image affichée dans la lightbox
        const bsCarousel = bootstrap.Carousel.getInstance(roomOfferCarousel);
        bsCarousel.to(currentImageIndex);
    }

// Note : updateLightboxNavigation() volontairement retirée
// La navigation est gérée nativement par Bootstrap Modal

    // Événement au clic sur le bouton "Précédent" de la modale
    prevBtn.addEventListener('click', function () {
        updateLightboxImage(currentImageIndex - 1);
    });

    // Événement au clic sur le bouton "Suivant" de la modale
    nextBtn.addEventListener('click', function () {
        updateLightboxImage(currentImageIndex + 1);
    });

    // Permettre la navigation par flèches du clavier
    document.addEventListener('keydown', function (event) {
        if (offerModalLightbox.classList.contains('show')) {
            if (event.key === 'ArrowLeft') {
                updateLightboxImage(currentImageIndex - 1);
            } else if (event.key === 'ArrowRight') {
                updateLightboxImage(currentImageIndex + 1);
            }
        }
    });
});
