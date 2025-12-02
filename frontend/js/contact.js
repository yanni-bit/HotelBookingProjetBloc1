/* ==========================================================
   CONTACT.JS - Gestion du formulaire de contact
   Projet : Hôtel Booking (Bloc 1)
   ========================================================== */

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================================
  // GESTION DU FORMULAIRE DE CONTACT
  // ==========================================================
  
  const contactForm = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
  
  // Formatage automatique du téléphone
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 0 && value[0] === '0') {
        value = value.match(/.{1,2}/g)?.join(' ') || value;
      }
      e.target.value = value;
    });
  }
  
  /**
   * Gère la soumission du formulaire
   */
  function handleFormSubmit(e) {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };
    
    // Valider les champs
    if (!validateForm(formData)) {
      return;
    }
    
    // Afficher le message de confirmation
    displaySuccessMessage(formData);
    
    // Réinitialiser le formulaire
    contactForm.reset();
  }
  
  /**
   * Valide les données du formulaire
   */
  function validateForm(data) {
    // Vérifier que les champs obligatoires sont remplis
    if (!data.name || !data.email || !data.subject || !data.message) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return false;
    }
    
    // Vérifier le format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Veuillez entrer une adresse email valide.');
      return false;
    }
    
    // Vérifier la longueur du message
    if (data.message.length < 10) {
      alert('Votre message doit contenir au moins 10 caractères.');
      return false;
    }
    
    return true;
  }
  
  /**
   * Affiche le message de succès
   */
  function displaySuccessMessage(data) {
    // Construire le message de confirmation
    const subjectText = getSubjectText(data.subject);
    
    // Créer une modal Bootstrap pour afficher le message
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
                
                ${data.phone ? `
                <div class="info-row">
                  <i class="bi bi-telephone-fill text-primary"></i>
                  <div>
                    <small class="text-muted">Téléphone</small>
                    <p class="mb-0"><strong>${data.phone}</strong></p>
                  </div>
                </div>
                ` : ''}
                
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
                  <strong>Un email de confirmation a été envoyé à ${data.email}</strong>
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
    const oldModal = document.getElementById('confirmationModal');
    if (oldModal) {
      oldModal.remove();
    }
    
    // Ajouter la modal au body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Afficher la modal
    const modal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    modal.show();
    
    // Nettoyer après fermeture
    document.getElementById('confirmationModal').addEventListener('hidden.bs.modal', function() {
      this.remove();
    });
    
    // Afficher aussi le message de succès dans la page
    if (successMessage) {
      successMessage.style.display = 'block';
      
      // Masquer après 5 secondes
      setTimeout(function() {
        successMessage.style.display = 'none';
      }, 5000);
      
      // Scroll vers le message
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  
  /**
   * Retourne le texte correspondant au sujet
   */
  function getSubjectText(subjectValue) {
    const subjects = {
      'reservation': 'Réservation',
      'information': 'Demande d\'information',
      'reclamation': 'Réclamation',
      'autre': 'Autre'
    };
    
    return subjects[subjectValue] || 'Votre demande';
  }
  
  // ==========================================================
  // GESTION DE LA CARTE GOOGLE MAPS
  // ==========================================================
  
  // Gestion de l'erreur de chargement de Google Maps
  window.addEventListener('load', function() {
    const iframe = document.querySelector('.map-container iframe');
    
    if (iframe) {
      iframe.addEventListener('error', function() {
        console.error('Erreur de chargement de Google Maps');
        
        // Afficher un message d'erreur alternatif
        const mapContainer = document.querySelector('.map-container');
        if (mapContainer) {
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
  // SMOOTH SCROLL POUR LES ANCRES
  // ==========================================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
});