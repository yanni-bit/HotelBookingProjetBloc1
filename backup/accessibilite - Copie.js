document.addEventListener('DOMContentLoaded', function() {
  
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = form.querySelectorAll('[required], [aria-required="true"]');
      
      requiredFields.forEach(field => {
        if (!validateField(field)) {
          isValid = false;
        }
      });
      
      if (isValid) {
        announceFormStatus('Formulaire valide. Envoi en cours...', 'success');
      } else {
        announceFormStatus('Le formulaire contient des erreurs. Veuillez les corriger.', 'error');
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
      }
    });
    
    const fields = form.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
      field.addEventListener('blur', function() {
        validateField(this);
      });
      
      field.addEventListener('input', function() {
        if (this.classList.contains('is-invalid')) {
          validateField(this);
        }
      });
    });
  });
  
  setupAccessibleDropdowns();
  setupAccessibleNavigation();
});

function validateField(field) {
  const errorId = field.getAttribute('aria-describedby')?.split(' ').find(id => id.includes('error')) || `${field.id}-error`;
  let errorElement = document.getElementById(errorId);
  
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.id = errorId;
    errorElement.className = 'invalid-feedback';
    errorElement.setAttribute('role', 'alert');
    field.parentNode.appendChild(errorElement);
    
    const describedBy = field.getAttribute('aria-describedby') || '';
    field.setAttribute('aria-describedby', `${describedBy} ${errorId}`.trim());
  }
  
  let isValid = true;
  let errorMessage = '';
  
  if (field.hasAttribute('required') || field.getAttribute('aria-required') === 'true') {
    if (!field.value.trim()) {
      isValid = false;
      errorMessage = 'Ce champ est obligatoire.';
    }
  }
  
  if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      isValid = false;
      errorMessage = 'Veuillez entrer une adresse email valide.';
    }
  }
  
  if (field.type === 'tel' && field.value) {
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(field.value)) {
      isValid = false;
      errorMessage = 'Veuillez entrer un numéro de téléphone valide.';
    }
  }
  
  if (isValid) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    field.setAttribute('aria-invalid', 'false');
    errorElement.textContent = '';
  } else {
    field.classList.remove('is-valid');
    field.classList.add('is-invalid');
    field.setAttribute('aria-invalid', 'true');
    errorElement.textContent = errorMessage;
  }
  
  return isValid;
}

function announceFormStatus(message, type) {
  const statusId = 'formStatus';
  let statusElement = document.getElementById(statusId);
  
  if (!statusElement) {
    statusElement = document.createElement('div');
    statusElement.id = statusId;
    statusElement.setAttribute('role', 'status');
    statusElement.setAttribute('aria-live', 'polite');
    statusElement.setAttribute('aria-atomic', 'true');
    
    const form = document.querySelector('form');
    if (form) {
      form.appendChild(statusElement);
    }
  }
  
  statusElement.textContent = message;
  statusElement.className = type === 'error' ? 'alert alert-danger mt-3' : 'alert alert-success mt-3';
}

function setupAccessibleDropdowns() {
  const dropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"]');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('show.bs.dropdown', function() {
      this.setAttribute('aria-expanded', 'true');
    });
    
    toggle.addEventListener('hide.bs.dropdown', function() {
      this.setAttribute('aria-expanded', 'false');
    });
  });
}

function setupAccessibleNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('active');
    } else {
      link.removeAttribute('aria-current');
      link.classList.remove('active');
    }
  });
}