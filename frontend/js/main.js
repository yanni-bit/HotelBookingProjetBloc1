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

// Gestion du carrousel
//-------------------------------------
let slideIndex = 0;
let timer = null;

showSlides(slideIndex);
resetTimer();

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
  slides[slideIndex].style.display = "block";

  // Ajouter un petit délai pour que la transition opacity démarre sans flash
  setTimeout(function () {
    slides[slideIndex].style.transition = "opacity 0.8s ease";
    slides[slideIndex].style.opacity = "1";
  }, 50);

  dots[slideIndex].className += " dotActive";
}

function autoSlides() {
  slideIndex++;
  showSlides(slideIndex);
}

function resetTimer() {
  clearInterval(timer);
  timer = setInterval(autoSlides, 4500);
}

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
