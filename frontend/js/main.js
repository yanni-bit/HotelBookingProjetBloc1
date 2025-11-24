// Variable Ruban choix de la langue
//-------------------------------------

let choixLangue = "FRANCAIS (Fr)";
document.getElementById("langue").textContent = choixLangue;

// Variable Ruban choix de la monnaie
//-------------------------------------

let choixMonnaie = "EURO €";
document.getElementById("monnaie").textContent = choixMonnaie;

// Gestion du menu hamburger
//-------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerButton = document.querySelector(".navbar-toggler");
  const menuPrincipal = document.getElementById("menuPrincipal");

  if (hamburgerButton && menuPrincipal) {
    hamburgerButton.addEventListener("click", function () {
      // affiche/masque le menu
      menuPrincipal.classList.toggle("show");
    });
  }
});

// Gestion du carrousel Index
//-------------------------------------
let slideIndex = 0;
let timer = null;

// Initialiser seulement si le carousel index existe
const indexCarousel = document.getElementById('hotelCarousel');
if (indexCarousel) {
  showSlides(slideIndex);
  resetTimer();
}

function plusSlides(n) {
  slideIndex += n;
  showSlides(slideIndex);
  resetTimer();
}

function currentSlide(n) {
  slideIndex = n - 1;
  showSlides(slideIndex);
  resetTimer();
}

function showSlides(n) {
  const slides = document.getElementsByClassName("hotel-slide");
  const dots = document.getElementsByClassName("dot");

  // Si pas de slides, on sort
  if (slides.length === 0) return;

  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;

  // Masquer toutes les slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].style.opacity = "0";
  }

  // Retirer l'état actif des points
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("dotActive");
  }

  // Afficher la slide courante immédiatement
  if (slides[slideIndex]) {
    slides[slideIndex].style.display = "block";

    // Ajouter un petit délai pour que la transition opacity démarre sans flash
    setTimeout(function () {
      slides[slideIndex].style.transition = "opacity 0.8s ease";
      slides[slideIndex].style.opacity = "1";
    }, 50);
  }

  if (dots[slideIndex]) {
    dots[slideIndex].className += " dotActive";
  }
}

function autoSlides() {
  slideIndex++;
  showSlides(slideIndex);
}

function resetTimer() {
  if (document.getElementById('hotelCarousel')) {
    clearInterval(timer);
    timer = setInterval(autoSlides, 4500);
  }
}

// ==========================================================
// GESTION CAROUSEL ROOM avec miniatures scrollables
// ==========================================================
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById('roomCarousel');
  
  if (!carousel) {
    console.log('Carousel non trouvé');
    return;
  }
  
  console.log('Carousel trouvé');
  
  const thumbnails = document.querySelectorAll('.carousel-thumbnail');
  const thumbnailsScroll = document.getElementById('thumbnailsScroll');
  const scrollLeftBtn = document.getElementById('scrollLeft');
  const scrollRightBtn = document.getElementById('scrollRight');
  
  console.log('Nombre de miniatures:', thumbnails.length);
  
  // Attendre que Bootstrap soit prêt
  setTimeout(function() {
    // Récupérer l'instance Bootstrap du carousel
    let bsCarousel = bootstrap.Carousel.getInstance(carousel);
    
    // Si pas d'instance, en créer une
    if (!bsCarousel) {
      console.log('Création du carousel Bootstrap');
      bsCarousel = new bootstrap.Carousel(carousel, {
        interval: 5000,
        wrap: true
      });
    }
    
    // Gestion du clic sur les miniatures
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Clic sur miniature', index);
        if (bsCarousel) {
          bsCarousel.to(index);
        }
      });
    });
    
    // Mettre à jour la miniature active quand le carousel change
    carousel.addEventListener('slide.bs.carousel', function (e) {
      console.log('Carousel change vers slide', e.to);
      
      // Retirer la classe active de toutes les miniatures
      thumbnails.forEach(thumb => thumb.classList.remove('active'));
      
      // Ajouter la classe active à la miniature correspondante
      if (thumbnails[e.to]) {
        thumbnails[e.to].classList.add('active');
        
        // Scroll automatique vers la miniature active
        if (thumbnailsScroll) {
          const activeThumbnail = thumbnails[e.to];
          const scrollLeft = activeThumbnail.offsetLeft - (thumbnailsScroll.offsetWidth / 2) + (activeThumbnail.offsetWidth / 2);
          thumbnailsScroll.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
      }
    });
    
  }, 100);
  
  // Gestion du scroll des miniatures avec les boutons
  if (scrollLeftBtn && thumbnailsScroll) {
    console.log('Bouton scroll gauche trouvé');
    scrollLeftBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Scroll gauche');
      thumbnailsScroll.scrollBy({
        left: -250,
        behavior: 'smooth'
      });
    });
  }
  
  if (scrollRightBtn && thumbnailsScroll) {
    console.log('Bouton scroll droit trouvé');
    scrollRightBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Scroll droit');
      thumbnailsScroll.scrollBy({
        left: 250,
        behavior: 'smooth'
      });
    });
  }
});

// Gestion du formulaire de recherche
//-------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  let btnProceed = document.querySelector(".btn-custom");

  if (btnProceed) {
    btnProceed.addEventListener("click", function (e) {
      e.preventDefault();

      // Récupérer le type de réservation sélectionné
      let radioChecked = document.querySelector(
        'input[name="radioDefault"]:checked'
      );
      let type = radioChecked
        ? radioChecked.nextElementSibling.textContent
        : "Non sélectionné";

      // Récupérer les valeurs des champs
      let destination =
        document.getElementById("hotelDestination").value || "Non renseignée";
      let checkin =
        document.getElementById("checkin").value || "Non renseignée";
      let checkout =
        document.getElementById("checkout").value || "Non renseignée";
      let rooms = document.getElementById("rooms").value || "Non renseignée";
      let adults =
        document.getElementById("adults").value || "Non renseignée";
      let children =
        document.getElementById("children").value || "Non renseignée";

      // Construire le message
      let message = `
Project Ilaria Boc 1 Frontend
Ce bloc doit être présenter pour valider l'utilisation du HTML CSS et JavaScript, donc aucune de ses données ne peuvent être traitées dans le backend
Pour valider le bon fonctionnement du formulaire de recherche les données renseignées s'afficheront ci-dessous :

Données renseignées :

Type : ${type}
Destination : ${destination}
Check-in : ${checkin}
Check-out : ${checkout}
Chambres : ${rooms}
Adultes : ${adults}
Enfants : ${children}
      `;

      // Afficher l'alert
      alert(message);
    });
  }
});