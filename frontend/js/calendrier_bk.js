/* ============================================================
   CALENDRIER — LOGIQUE PRINCIPALE
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
    
    const daysGrid = document.getElementById("daysGrid");
    const currentMonthEl = document.getElementById("currentMonth");

    const checkInDateEl = document.getElementById("checkInDate");
    const checkOutDateEl = document.getElementById("checkOutDate");

    const checkInTime = document.getElementById("checkInTime");
    const checkOutTime = document.getElementById("checkOutTime");

    const timeInfo = document.getElementById("timeInfo");
    const timeInfoText = document.getElementById("timeInfoText");

    const nightsBanner = document.getElementById("nightsCount");
    const nightsNumber = document.getElementById("nightsNumber");
    const totalPrice = document.getElementById("totalPrice");

    const confirmBtn = document.getElementById("confirmBtn");
    const resetBtn = document.getElementById("resetBtn");

    /* Prix fictif / nuit */
    const pricePerNight = 150;

    /* Date courante */
    let today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();

    /* Sélections */
    let selectedCheckIn = null;
    let selectedCheckOut = null;

    /* ============================================================
       FONCTIONS D'AFFICHAGE
       ============================================================ */

    function renderCalendar() {

        daysGrid.innerHTML = "";

        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);

        currentMonthEl.textContent = firstDay.toLocaleString("fr-FR", {
            month: "long",
            year: "numeric"
        });

        const startDay = firstDay.getDay();  
        const totalDays = lastDay.getDate();

        /* Padding */
        for (let i = 0; i < startDay; i++) {
            const empty = document.createElement("div");
            empty.classList.add("day", "other-month");
            daysGrid.appendChild(empty);
        }

        /* Jours du mois */
        for (let day = 1; day <= totalDays; day++) {

            const dateObj = new Date(currentYear, currentMonth, day);
            const dateISO = dateObj.toISOString().split("T")[0];

            const dayEl = document.createElement("div");
            dayEl.classList.add("day");
            dayEl.textContent = day;
            dayEl.dataset.date = dateISO;

            if (dateObj.toDateString() === today.toDateString()) {
                dayEl.classList.add("today");
            }

            /* Gestion des clics */
            dayEl.addEventListener("click", function () {
                handleDateSelection(dateObj, dayEl);
            });

            daysGrid.appendChild(dayEl);
        }
    }

    /* ============================================================
       GESTION DE LA SELECTION DES DATES
       ============================================================ */

    function handleDateSelection(dateObj, element) {

        if (!selectedCheckIn) {
            /* Première sélection */
            selectedCheckIn = dateObj;
            checkInDateEl.textContent = formatDate(dateObj);
            checkInTime.disabled = false;

            highlightSelected();
            return;
        }

        if (selectedCheckIn && !selectedCheckOut) {

            /* Deuxième sélection (check-out) */
            if (dateObj <= selectedCheckIn) {
                alert("La date de départ doit être après la date d'arrivée.");
                return;
            }

            selectedCheckOut = dateObj;
            checkOutDateEl.textContent = formatDate(dateObj);
            checkOutTime.disabled = false;

            highlightSelected();
            updateRecap();
            return;
        }

        /* Réinitialisation si nouvelle sélection */
        resetSelection();
        handleDateSelection(dateObj, element);
    }

    /* ============================================================
       MISE EN ÉVIDENCE VISUELLE
       ============================================================ */

    function highlightSelected() {

        const allDays = document.querySelectorAll(".day");
        allDays.forEach(day => day.classList.remove("selected", "in-range"));

        if (!selectedCheckIn) return;

        /* Check-in */
        document.querySelector(`.day[data-date="${toISO(selectedCheckIn)}"]`)
            ?.classList.add("selected");

        /* Check-out + range */
        if (selectedCheckOut) {
            document.querySelector(`.day[data-date="${toISO(selectedCheckOut)}"]`)
                ?.classList.add("selected");

            const all = document.querySelectorAll(".day");

            all.forEach(el => {
                const d = el.dataset.date;
                if (!d) return;

                const dateObj = new Date(d);

                if (dateObj > selectedCheckIn && dateObj < selectedCheckOut) {
                    el.classList.add("in-range");
                }
            });
        }
    }

    /* ============================================================
       RECAP (nuits + total)
       ============================================================ */

    function updateRecap() {

        const diff = (selectedCheckOut - selectedCheckIn) / (1000 * 3600 * 24);
        nightsNumber.textContent = diff;

        const total = diff * pricePerNight;
        totalPrice.textContent = total + "€";

        nightsBanner.style.display = "block";
        confirmBtn.disabled = false;

        updateTimeInfo();
    }

    /* ============================================================
       INFOS ARRIVÉE / DÉPART (heures)
       ============================================================ */

    function updateTimeInfo() {
        if (!selectedCheckIn || !selectedCheckOut) return;

        timeInfo.style.display = "block";
        timeInfoText.textContent =
            "Arrivée le " + formatDate(selectedCheckIn) +
            " à " + checkInTime.value + " · Départ le " +
            formatDate(selectedCheckOut) +
            " à " + checkOutTime.value;
    }

    /* ============================================================
       RESET
       ============================================================ */

    function resetSelection() {
        selectedCheckIn = null;
        selectedCheckOut = null;

        checkInDateEl.textContent = "--/--/----";
        checkOutDateEl.textContent = "--/--/----";

        checkInTime.disabled = true;
        checkOutTime.disabled = true;

        confirmBtn.disabled = true;

        timeInfo.style.display = "none";
        nightsBanner.style.display = "none";

        highlightSelected();
    }

    resetBtn.addEventListener("click", resetSelection);

    /* ============================================================
       FONCTIONS UTILITAIRES
       ============================================================ */

    function formatDate(date) {
        return date.toLocaleDateString("fr-FR");
    }

    function toISO(date) {
        return date.toISOString().split("T")[0];
    }

    /* ============================================================
       NAVIGATION MOIS SUIVANT / PRECEDENT
       ============================================================ */

    document.getElementById("prevMonth").addEventListener("click", () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
        highlightSelected();
    });

    document.getElementById("nextMonth").addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
        highlightSelected();
    });

    /* ============================================================
       INITIALISATION
       ============================================================ */

    renderCalendar();
});
