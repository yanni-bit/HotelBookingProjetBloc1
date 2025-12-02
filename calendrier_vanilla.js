// ==========================================================
// CALENDRIER VANILLA JS
// Logique du calendrier et de la sélection de dates
// ==========================================================

document.addEventListener('DOMContentLoaded', function() {
    // --- VARIABLES DE CONFIGURATION ---
    const PRIX_PAR_NUIT = 770; 
    const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    
    // --- ÉLÉMENTS DU DOM ---
    const monthYearDisplay = document.getElementById('current-month-year');
    const calendarGrid = document.getElementById('calendar-grid');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const checkInDisplay = document.getElementById('check-in-display');
    const checkOutDisplay = document.getElementById('check-out-display');
    const nightsDisplay = document.getElementById('nights-display');
    const priceDisplay = document.getElementById('price-display');
    const confirmBtn = document.getElementById('confirm-booking');

    // --- VARIABLES D'ÉTAT ---
    let currentDate = new Date(); // Date de référence pour le mois actuellement affiché
    let selectedCheckIn = null;
    let selectedCheckOut = null;

    // --- FONCTIONS UTILITAIRES ---

    /**
     * Formate une date en JJ/MM/AAAA.
     * @param {Date} date - L'objet Date à formater.
     * @returns {string} La date formatée.
     */
    function formatDate(date) {
        if (!date) return '--/--/----';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    /**
     * Calcule le nombre de jours entre deux dates (en tenant compte des nuits).
     * @param {Date} date1 - Date de début.
     * @param {Date} date2 - Date de fin.
     * @returns {number} Le nombre de nuits.
     */
    function calculateNights(date1, date2) {
        if (!date1 || !date2) return 0;
        // On s'assure que les dates sont à minuit pour un calcul précis des jours complets
        const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

        const diffTime = Math.abs(d2.getTime() - d1.getTime());
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    /**
     * Met à jour l'affichage récapitulatif (dates, nuits, prix).
     */
    function updateSummary() {
        const nights = calculateNights(selectedCheckIn, selectedCheckOut);
        const totalPrice = nights * PRIX_PAR_NUIT;

        checkInDisplay.textContent = formatDate(selectedCheckIn);
        checkOutDisplay.textContent = formatDate(selectedCheckOut);
        nightsDisplay.textContent = nights;
        priceDisplay.textContent = `${totalPrice.toLocaleString('fr-FR')} €`;

        // Activer/Désactiver le bouton Confirmer
        confirmBtn.disabled = !(selectedCheckIn && selectedCheckOut && nights > 0);
    }


    // --- RENDU DU CALENDRIER ---

    /**
     * Dessine la grille des jours pour le mois courant.
     * @param {Date} date - La date de référence (le mois et l'année à afficher).
     */
    function renderCalendar(date) {
        // Nettoyer la grille
        calendarGrid.innerHTML = ''; 

        const year = date.getFullYear();
        const month = date.getMonth(); // 0 à 11

        // Afficher le mois et l'année dans l'en-tête
        monthYearDisplay.textContent = `${MONTHS[month]} ${year}`;

        // 1. Trouver le premier jour du mois (pour connaître son jour de la semaine)
        const firstDayOfMonth = new Date(year, month, 1);
        // Le jour de la semaine (0=dimanche, 6=samedi). On convertit pour commencer le lundi (1=lundi, 7=dimanche)
        let startingDay = firstDayOfMonth.getDay();
        if (startingDay === 0) startingDay = 7; // Dimanche devient 7
        
        // La grille doit commencer au premier jour de la semaine (Lundi=1)
        // On calcule le nombre de cellules vides à laisser au début
        const emptyCells = startingDay - 1; 

        // 2. Trouver le dernier jour du mois
        // Mettre 0 comme jour donne le dernier jour du mois précédent
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate(); 
        
        // Date d'aujourd'hui (pour le style)
        const today = new Date();
        const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
        
        // Date limite pour la sélection (empêcher le passé)
        const minSelectableDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // --- 3. Créer les cellules vides (jours du mois précédent) ---
        for (let i = 0; i < emptyCells; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day', 'disabled');
            calendarGrid.appendChild(dayCell);
        }

        // --- 4. Créer les cellules pour chaque jour du mois ---
        for (let day = 1; day <= lastDayOfMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            dayCell.textContent = day;

            const currentDayDate = new Date(year, month, day);

            // Gérer les styles "aujourd'hui"
            const currentDayKey = `${year}-${month}-${day}`;
            if (currentDayKey === todayKey) {
                dayCell.classList.add('today');
            }

            // Désactiver les jours passés
            if (currentDayDate < minSelectableDate) {
                dayCell.classList.add('disabled');
            } else {
                dayCell.dataset.date = currentDayDate.toISOString(); // Stocker la date complète
                dayCell.addEventListener('click', handleDateClick);
            }
            
            // Appliquer les styles de sélection
            applySelectionStyles(dayCell, currentDayDate);

            calendarGrid.appendChild(dayCell);
        }
        
        // --- 5. Créer les cellules vides restantes (jours du mois suivant) ---
        // Le nombre total de jours affichés doit être 6 * 7 = 42 ou 5 * 7 = 35.
        const totalCells = emptyCells + lastDayOfMonth;
        const remainingCells = 42 - totalCells > 0 ? 42 - totalCells : (35 - totalCells > 0 ? 35 - totalCells : 0);
        
        for (let i = 0; i < remainingCells; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day', 'disabled');
            calendarGrid.appendChild(dayCell);
        }
    }


    // --- GESTION DES CLICS ET SÉLECTION ---

    /**
     * Applique les classes CSS de sélection (start-date, end-date, in-range)
     * @param {HTMLElement} cell - L'élément DOM du jour.
     * @param {Date} date - La date correspondant à l'élément.
     */
    function applySelectionStyles(cell, date) {
        cell.classList.remove('start-date', 'end-date', 'in-range');

        // Normaliser les dates pour la comparaison (minuit)
        const dateMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        const checkInTime = selectedCheckIn ? new Date(selectedCheckIn.getFullYear(), selectedCheckIn.getMonth(), selectedCheckIn.getDate()).getTime() : 0;
        const checkOutTime = selectedCheckOut ? new Date(selectedCheckOut.getFullYear(), selectedCheckOut.getMonth(), selectedCheckOut.getDate()).getTime() : 0;
        
        if (checkInTime && dateMidnight === checkInTime) {
            cell.classList.add('start-date');
        }

        if (checkOutTime && dateMidnight === checkOutTime) {
            cell.classList.add('end-date');
        }

        if (checkInTime && checkOutTime && dateMidnight > checkInTime && dateMidnight < checkOutTime) {
            cell.classList.add('in-range');
        }
        
        // Cas particulier si les dates sont identiques
        if (checkInTime && checkOutTime && checkInTime === checkOutTime) {
             if (dateMidnight === checkInTime) {
                 cell.classList.add('start-date', 'end-date');
             }
        }
    }

    /**
     * Gère le clic sur un jour du calendrier pour la sélection de la plage de dates.
     * @param {Event} event - L'événement de clic.
     */
    function handleDateClick(event) {
        const dateString = event.target.dataset.date;
        // Créer une nouvelle Date à partir du format ISO (dateString)
        const clickedDate = new Date(dateString); 

        if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
            // Premier clic ou les deux dates sont déjà sélectionnées -> Début d'une nouvelle sélection
            selectedCheckIn = clickedDate;
            selectedCheckOut = null;
        } else if (clickedDate.getTime() < selectedCheckIn.getTime()) {
            // Le deuxième clic est avant le premier -> La nouvelle date devient le nouveau check-in
            selectedCheckIn = clickedDate;
            selectedCheckOut = null; 
        } else if (clickedDate.getTime() >= selectedCheckIn.getTime()) {
            // Le deuxième clic est après ou égal au premier -> Fin de la sélection
            selectedCheckOut = clickedDate;
        }

        // Redessiner le calendrier pour appliquer les nouvelles classes CSS
        renderCalendar(currentDate); 
        // Mettre à jour le résumé
        updateSummary();
    }
    
    /**
     * Gère le clic sur le bouton de confirmation.
     */
    function handleConfirmClick() {
        if (selectedCheckIn && selectedCheckOut) {
            const nights = calculateNights(selectedCheckIn, selectedCheckOut);
            const total = nights * PRIX_PAR_NUIT;
            
            alert(`
                Réservation confirmée !
                
                Arrivée: ${formatDate(selectedCheckIn)}
                Départ: ${formatDate(selectedCheckOut)}
                Nuits: ${nights}
                Total: ${total.toLocaleString('fr-FR')} €
            `);
        }
    }


    // --- INITIALISATION ET ÉVÉNEMENTS GLOBALS ---

    /**
     * Navigue au mois précédent/suivant.
     * @param {number} offset - -1 pour précédent, 1 pour suivant.
     */
    function navigateMonth(offset) {
        // Définir la date au premier jour du mois actuel
        currentDate.setDate(1); 
        // Ajouter l'offset au mois pour changer
        currentDate.setMonth(currentDate.getMonth() + offset);
        renderCalendar(currentDate);
    }
    
    // Événements des boutons de navigation
    prevMonthBtn.addEventListener('click', () => navigateMonth(-1));
    nextMonthBtn.addEventListener('click', () => navigateMonth(1));
    
    // Événement du bouton de confirmation
    confirmBtn.addEventListener('click', handleConfirmClick);

    // Démarrer l'affichage du calendrier
    renderCalendar(currentDate);
    updateSummary();

});