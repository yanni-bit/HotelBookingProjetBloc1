/* ==========================================================
   TRANSLATIONS.JS - Fichier de traductions multilingue
   Projet : Hôtel Booking (Bloc 1)
   Langues : Français (FR), English (EN), Italiano (IT)
   ========================================================== */

const translations = {
  
  // ==========================================================
  // FRANÇAIS (FR)
  // ==========================================================
  fr: {
    // Metadata 
    metadata: {
        roomTitle: "Nos Chambres - Book Your Travel",
        roomDescription: "Découvrez nos chambres d'hôtel luxueuses avec équipements haut de gamme. Wi-Fi gratuit, climatisation, TV écran plat. Réservation en ligne sécurisée.",
        roomKeywords: "chambre hôtel, suite luxe, équipements hôtel, réservation chambre",
        roomOGDescription: "Découvrez nos chambres luxueuses avec équipements haut de gamme et services premium.",
        roomTwitterDescription: "Chambres luxueuses avec équipements premium."
    },

    // Navigation principale
    nav: {
      home: "Accueil",
      templateHotel: "Template Hotel",
      templateBooking: "Template Réservation",
      contact: "Contact",
      documentations: "Documentations",
      menu: "Menu"
    },
    
    // Header
    header: {
      supportNumber: "24/7 Support number",
      myAccount: "MON COMPTE",
      country: "PAYS",
      currency: "MONNAIE",
      searchPlaceholder: "Rechercher",
      skipLink: "Aller au contenu principal"
    },
    
    // Sélecteurs de langue
    languages: {
      french: "Français (Fr)",
      english: "English (US)",
      italian: "Italiano (It)"
    },
    
    // Sélecteurs de monnaie
    currencies: {
      euro: "€ Euro",
      dollar: "$ US Dollar",
      pound: "£ Pound"
    },
    
    // Page d'accueil - Hero & Recherche
    home: {
      // Formulaires
      hotelRadio: "Hotel",
      flightRadio: "Vol", 
      flightHotelRadio: "Vol & Hotel",
      studioRadio: "Studio", 
      cruiseRadio: "Croisière", 
      carRentalRadio: "Location voiture", 
      whatTitle: "Quoi?",
      whereTitle: "Où?", 
      whenTitle: "Quand?", 
      whoTitle: "Qui?", 
      destination: "Votre destination",
      destinationPlaceholder: "Ville, région, district ou hôtel spécifique",
      checkin: "Check-in",
      checkout: "Check-out",
      rooms: "Chambres",
      adults: "Adultes",
      children: "Enfants",
      searchButton: "Voir les résultats",
      // Section Offres
      offersTitle: "Découvrez nos dernières offres", 
      offersSubtitle: "Découvrez des offres incroyables pour votre prochaine aventure", 
      offer1Title: "Escapades Hivernales à la Plage", 
      offer1Text: "Profitez de plages ensoleillées avec des réductions hivernales exclusives", 
      offer2Title: "Passez le Réveillon à Paris", 
      offer2Text: "Vivez la magie de Paris pendant les fêtes", 
      offer3Title: "Une Nuit de Noces Paradisiaque", 
      offer3Text: "Nuit de Noces aux Maldives, luxe total face à l'océan", 
      offer4Title: "Notre Meilleure Offre de la Semaine : Tahiti", 
      offer4Text: "Découvrez le paradis à des prix imbattables", 
      bookNowButton: "Réserver Maintenant", 
      // Badges
      badge30off: "30% OFF", 
      badgePromo: "PROMO",
      badgeHotDeal: "HOT DEAL",
      badgeNew: "NOUVEAU",
      // Section Destinations 
      exploreTitle: "Meilleures Destinations Autour du Monde",
      exploreSubtitle: "Découvrez les destinations de voyage les plus populaires",
      viewHotelsButton: "Voir les Hôtels",
      hotels: "Hotels", 
      startingFrom: "À partir de", 
    },
    
    // Page Room 
    room: {
        // Carrousel & Miniatures
        breadcrumbHotel: "Hotel",
        slideLabel: "Slide", 
        thumbnailAlt: "Miniature", 
        altHotelView1: "Vue du Conrad Maldives Rangali Island 1",
        altHotelView2: "Vue du Conrad Maldives Rangali Island 2",
        altHotelView3: "Vue du Conrad Maldives Rangali Island 3",
        altHotelView4: "Vue du Conrad Maldives Rangali Island 4",
        altHotelView5: "Vue du Conrad Maldives Rangali Island 5",
        altHotelView6: "Vue du Conrad Maldives Rangali Island 6",
        altHotelView7: "Vue du Conrad Maldives Rangali Island 7",
        altHotelView8: "Vue du Conrad Maldives Rangali Island 8",
        altHotelView9: "Vue du Conrad Maldives Rangali Island 9",
        previous: "Précédent",
        next: "Suivant",
        scrollLeft: "Défiler les miniatures vers la gauche",
        scrollRight: "Défiler les miniatures vers la droite",

        // Navigation secondaire (Onglets)
        tabDescription: "Description",
        tabAvailability: "Disponibilité",
        tabAmenities: "Équipements",
        tabReviews: "Avis",
        tabLocation: "Localisation",
        helpTitle: "Aide & Contact",
        helpText: "Appelez notre service client au numéro ci-dessous pour parler à l’un de nos conseillers, qui vous aidera pour tous vos besoins liés à vos vacances.",
        helpPhone: "<i class='bi bi-telephone-fill me-1'></i>24/7 Support<br>1-555-555-5555",
        
        // Contenu - Description
        descriptionHotelTitle: "Description de l'hotel",
        descP1: "Profitez des services haut de gamme de l'établissement Conrad Maldives Rangali Island",
        descP2: "Situé sur 2 îles reliées par un pont, le luxueux Conrad Maldives Rangali Island propose des villas privées spacieuses. L'établissement abrite le restaurant sous-marin Ithaa tout en verre et 2 spas primés.",
        descP3: "S'avançant jusqu'à 500 mètres dans l'océan Indien, les villas du Conrad Rangali Island disposent de tout le confort nécessaire, notamment d'une connexion Wi-Fi gratuite, d'une télévision à écran plat et d'un lecteur DVD. Les baies vitrées en bois offrent des vues magnifiques sur la mer ou la plage.",
        descP4: "Lors de votre séjour, vous pourrez profiter de moments de relaxation au spa Retreat sur le lagon, ou au spa Over-Water, qui surplombe la mer. Pour un séjour encore plus enrichissant, vous pourrez vous rendre à la boutique italienne sur place ou découvrir la culture locale lors d'une excursion d'une journée sur l'une des îles environnantes.",
        descP5: "Bénéficiant d'une renommée mondiale, les 12 bars et restaurants du Conrad Maldives servent une variété de spécialités internationales, de plats méditerranéens et de grillades. Le Wine Cellar propose plus de 600 bouteilles de vin de qualité.",
        descP6: "Ce complexe hôtelier vous propose des expériences sur deux îles voisines. L'île familiale, Rangali-Finolhu, accueille les enfants de tous âges. Les enfants de moins de 16 ans ne peuvent pas séjourner dans les villas sur pilotis, ni accéder à la piscine de la zone paisible située sur l'île isolée de Rangali réservée aux adultes. Le pavillon Rangali de 2 chambres avec piscine et vue sur l'océan peut cependant accueillir une famille de 6 personnes, enfants compris.",
        descP7: "Le Conrad Maldives Rangali Island est accessible en hydravion, un vol pittoresque d'une durée de 30 minutes, depuis l'aéroport international de Malé.",
        descP8: "Les couples apprécient particulièrement l'emplacement de cet établissement. Ils lui donnent la note de 10,0 pour un séjour à deux.",

        // Contenu - Offre de chambre (Availability)
        altRoomView1: "Chambre vue 1",
        altRoomView2: "Chambre vue 2",
        altRoomView3: "Chambre vue 3",
        altRoomView4: "Chambre vue 4",
        altRoomView5: "Chambre vue 5",
        altRoomView6: "Chambre vue 6",
        altRoomView7: "Chambre vue 7",
        roomOfferTitle: "Villa sur l'eau",
        pricePerNight: "Prix par nuit",
        vatBadge: "TVA 20%",
        includedInPrice: "Inclue dans le prix",
        maxCapacity: "Max :",
        priceValue: "Prix: 770 €",
        nonRefundable: "Non remboursable",
        breakfastPrice: "Petit-déjeuner complet 24,80 €",
        bookNowButton: "BOOK NOW",
        offerDesc: "Reconstruites en 2011, les villas sont installées sur pilotis et réparties sur les eaux des Maldives. Elles comprennent des baignoires donnant sur l'océan et une terrasse privative bien exposée avec un accès direct au lagon. Les hébergements disposent également d'une petite piscine privée avec des jets d'eau. Les villas sont meublées avec des panneaux de sol en verre et un éclairage encastré.",
        roomTypeTitle: "Type de chambre",
        roomTypeValue: "Villa entière de 86 m<sup class='expo'>2</sup> avec terrasse privée, jacuzzi et deux lits king-size.",
        roomAmenitiesTitle: "Équipements de la chambre :",
        roomAmenitiesList: "Balcon, Vue sur la mer, Salle de bains privative dans l'hébergement avec douche et baignoire spa, Télévision à écran plat, Minibar, Wi-Fi Gratuit, Sèche-linge, Toilettes, Coffre-fort, Telephone.",

        // Contenu - Calendrier
        availabilityTitle: "Vérifier la disponibilité",
        availabilitySubtitle: "Sélectionnez vos dates et heures d'arrivée et de départ",
        calendarPlaceholder: "Sélectionnez vos dates",
        checkInDateLabel: "Date d'arrivée",
        checkOutDateLabel: "Date de départ",
        checkInTimeLabel: "Heure d'arrivée",
        checkOutTimeLabel: "Heure de départ",
        nightsPlural: "nuit(s)",
        totalPrice: "Prix total: <span id='totalPrice'>0€</span>",
        reserveButton: "Réserver maintenant",
        resetButton: "Réinitialiser",
        
        // Contenu - Équipements
        amenitiesTitle: "Services et équipements de l'hotel",
        amenitiesOutdoorsTitle: "En extérieur :",
        amenityPools: "✓ 3 piscines",
        amenityTerrace: "✓ Terrasse",
        amenityGarden: "✓ Jardin",
        amenityRestaurant: "✓ Restaurant",
        amenitySnack: "✓ Snack-bar",
        amenityLoungers: "✓ Chaises longues ou de plage",
        amenityParasols: "✓ Parasols",
        amenityPlayground: "✓ Aire de jeux plein air",
        amenityPingPong: "✓ Tennis de table",
        amenityWaterFacilities: "✓ Installations nautiques",
        amenityNightclub: "✓ Discothèque",
        amenityParking: "✓ Parking",
        amenitiesWellnessTitle: "Bien-être :",
        amenitySpa: "✓ Spa et centre de bien-être",
        amenitySauna: "✓ Sauna",
        amenityFitness: "✓ Centre de remise en forme",
        amenityFitnessClasses: "✓ Cours de fitness",
        amenityYogaClasses: "✓ Cours de yoga",
        amenityHairdressing: "✓ Coiffure",
        amenitiesFoodTitle: "Restauration :",
        amenityWine: "✓ Vin/champagne",
        amenityKidsBuffet: "✓ Buffet avec options enfants",
        amenityKidsMenus: "✓ Menus enfants",
        amenitySpecialDiets: "✓ Menus pour régimes spéciaux",
        amenityTraditionalFood: "✓ Restauration traditionnelle",
        amenityVegetarianFood: "✓ Restauration végétarienne",
        amenitySnacks24h: "✓ Snaking 24/24",
        amenityRoomBreakfast: "✓ Petit-déjeuner en chambre",
        amenityBar: "✓ Bar",

        // Contenu - Avis
        reviewsTitle: "Avis clients",
        reviewAuthorAnonymous: "Anonyme",
        reviewDetails1: "Solo•Italie",
        reviewPositive1: "L'hôtel était chaleureux et accueillant. Très bien situé avec un accès facile aux commerces et aux transports. Personnel très agréable et serviable.",
        reviewNegative1: "Le bruit des voisins a gâché l'atmosphère plutôt calme de l'établissement. Isolation sonore insuffisante entre les chambres.",
        reviewDetails2: "Couple•France",
        reviewPositive2: "Magnifique établissement avec une vue exceptionnelle sur la mer. Les chambres sont spacieuses et très bien équipées. Le personnel était aux petits soins.",
        reviewNegative2: "Le rapport qualité-prix n'est pas optimal. Les prestations ne correspondent pas tout à fait au tarif pratiqué. Déçu par certains services payants en supplément.",
        reviewDetails3: "Couple•Suisse",
        reviewPositive3: "Séjour absolument parfait ! La piscine privée était un vrai plus. Le petit-déjeuner était délicieux avec un large choix. Nous avons adoré notre expérience.",
        reviewNegative3: "Wifi très instable dans la chambre. Problèmes de connexion récurrents. Dommage pour un établissement de ce standing.",
        reviewDetails4: "Famille•Espagne",
        reviewPositive4: "Emplacement idéal pour profiter de la plage. Les équipements sont modernes et de qualité. Le spa était très relaxant. Service impeccable du début à la fin.",
        reviewNegative4: "L'entretien de la piscine laissait à désirer lors de notre séjour. Eau trouble certains jours. Le service de nettoyage pourrait être plus régulier.",
        reviewDetails5: "Couple•USA",
        reviewPositive5: "Hôtel de luxe qui mérite ses étoiles. La propreté est irréprochable. Les installations sont magnifiques. Une expérience inoubliable que nous recommandons vivement.",
        reviewNegative5: "Attente trop longue au restaurant le soir. Service parfois débordé en haute saison. Nous avons dû patienter plus de 40 minutes avant d'être servis.",

        // Contenu - Localisation
        locationTitle: "Localisation de l'hotel",
        altLocationMap: "Localisation de l'hôtel Conrad Maldives Rangali Island",
        locationAddressTitle: "Adresse :",
        locationAddressValue: "RANGALI ISLAND, 20077, MALDIVES",
        locationPhone: "<i class='bi bi-telephone'></i> TELEPHONE: +960 668 0629",
        locationWhatsapp: "<i class='bi bi-whatsapp'></i> WHATSAPP: +960 799 4840",
        airportTitle: "<i class='bi bi-airplane'></i> Aéroport le plus proche :",
        airportValue: "Aéroport de Maamigili 19 km.",
        shuttleTitle: "<i class='bi bi-taxi-front'></i> Navette :",
        shuttleValue: "Possibilité de navette aéroport.",
        contactUsLink: "<i class='bi bi-at me-1'></i>Contactez nous",

        // Sidebar - Hotel Info
        hotelName: "Conrad Maldives Rangali Island",
        hotelLocation: "Rangali Island, Maldives",
        hotelRating: " 10/10",
        hotelShortDescription: "Le Conrad Maldives Rangali Island propose de luxueux séjours sur deux îles privées, avec des villas sur la plage et sur l'eau.",
        tagWellness: "Bien-être",
        tagLastMinute: "Dernière minute",
        tagMaldives: "Maldives",
        tagSPA: "SPA",
        tagRomantic: "Romantique",

        // Sidebar - Pourquoi réserver chez nous
        whyBookTitle: "Pourquoi réserver chez nous ?",
        whyBookLowPricesTitle: "Tarifs bas",
        whyBookLowPricesP1: "Obtenez les meilleurs prix ou soyez remboursé.",
        whyBookLowPricesP2: "Aucun frais de réservation.",
        whyBookLowPricesP3: "Économisez de l’argent !",
        whyBookLargestChoiceTitle: "Le plus grand choix",
        whyBookLargestChoiceP1: "Plus de 140 000 hôtels dans le monde",
        whyBookLargestChoiceP2: "Plus de 130 compagnies aériennes",
        whyBookLargestChoiceP3: "Plus de 3 millions d’avis clients",
        whyBookCustomerSupportTitle: "Toujours à votre écoute",
        whyBookCustomerSupportP1: "Appelez-nous ou envoyez-nous un e-mail à tout moment.",
        whyBookCustomerSupportP2: "Plus de 130 compagnies aériennes",
        whyBookCustomerSupportP3: "Service client disponible 24h/24, avant, pendant et après votre voyage.",

        // Sidebar - Hôtels populaires
        popularHotelsTitle: "Hôtels populaires dans la région",
        popularHotel1Name: "Gili Lankanfushi Maldives",
        popularHotel1Price: "à partir de 1250€/nuit",
        popularHotel1Rating: " 9.8/10",
        popularHotel2Name: "Soneva Fushi Resort",
        popularHotel2Price: "à partir de 1150€/nuit",
        popularHotel2Rating: " 9.6/10",
        popularHotel3Name: "Velaa Private Island",
        popularHotel3Price: "à partir de 2100€/nuit",
        popularHotel3Rating: " 10/10",
        popularHotel4Name: "Baros Maldives",
        popularHotel4Price: "à partir de 750€/nuit",
        popularHotel4Rating: " 9.4/10",

        // Sidebar - Offre du jour
        dealOfTheDayTitle: "Offre du jour !",
        altDealOfTheDay: "Baros Maldives - Offre du jour",
        dealOfTheDayName: "Baros Maldives",
        dealOfTheDayPrice: "À partir de 750€",
        dealOfTheDayPriceSuffix: "/ par nuit",
        dealOfTheDayRating: "9.4/10",

        // Accessibilité Modale
        modalClose: "Fermer",
        lightboxAlt: "Image agrandie de la chambre",
        previousImage: "Image précédente",
        nextImage: "Image suivante",
    },

    // Page Booking
    booking: {
        // Meta & Breadcrumb
        metaTitle: "Finaliser ma réservation - Book Your Travel",
        metaDescription: "Finalisez votre réservation d'hôtel en toute sécurité. Paiement sécurisé SSL, confirmation immédiate par email et meilleur prix garanti.",
        metaKeywords: "réservation hôtel, booking, paiement sécurisé, confirmation immédiate",
        metaOGTitle: "Réservation d'hôtel - Book Your Travel",
        metaOGDescription: "Finalisez votre réservation en toute sécurité. Paiement SSL et confirmation immédiate.",
        metaTwitterTitle: "Réservation d'hôtel - Book Your Travel",
        metaTwitterDescription: "Finalisez votre réservation en toute sécurité.",
        breadcrumbBooking: "Réservation",
        
        // Header
        title: "Finaliser votre réservation",
        subtitle: "Complétez les informations ci-dessous pour confirmer votre séjour",
        
        // Section 1: Vos informations
        section1Title: "Vos informations",
        firstNameLabel: "Prénom <span class='text-danger'>*</span>",
        lastNameLabel: "Nom <span class='text-danger'>*</span>",
        emailLabel: "Email <span class='text-danger'>*</span>",
        phoneLabel: "Téléphone <span class='text-danger'>*</span>",
        addressLabel: "Adresse",
        cityLabel: "Ville",
        postalCodeLabel: "Code postal",
        countryLabel: "Pays",
        countryFR: "France",
        countryBE: "Belgique",
        countryCH: "Suisse",
        countryCA: "Canada",
        countryUS: "États-Unis",
        guestsTitle: "<i class='bi bi-people-fill'></i> Nombre de voyageurs <span class='text-danger'>*</span>",
        adultsLabel: "Adultes (18 ans et +)",
        childrenLabel: "Enfants (0-17 ans)",
        guestsTotal: "<i class='bi bi-info-circle'></i> <strong>Total :</strong> <span id='totalGuests'>2</span> personne(s) - Maximum 3 personnes par chambre",
        guestsError: "<i class='bi bi-exclamation-triangle'></i> Le nombre maximum de personnes est de 3",

        // Section 2: Services additionnels
        section2Title: "Services additionnels",
        serviceParkingTitle: "Parking privé",
        serviceParkingDesc: "Place de parking sécurisée",
        serviceParkingPrice: "15€/nuit",
        serviceBreakfastTitle: "Petit-déjeuner",
        serviceBreakfastDesc: "Buffet continental par personne",
        serviceBreakfastPrice: "25€/pers/jour",
        serviceSpaTitle: "Accès spa",
        serviceSpaDesc: "Piscine, sauna et jacuzzi",
        serviceSpaPrice: "80€/séjour",
        serviceTransferTitle: "Transfert aéroport",
        serviceTransferDesc: "Aller simple depuis/vers l'aéroport",
        serviceTransferPrice: "50€/trajet",
        serviceLateCheckoutTitle: "Départ tardif",
        serviceLateCheckoutDesc: "Départ jusqu'à 16h au lieu de 11h",
        serviceLateCheckoutPrice: "30€",

        // Section 3: Demandes spéciales
        section3Title: "Demandes spéciales",
        specialRequestsLabel: "Avez-vous des demandes particulières ?",
        specialRequestsPlaceholder: "Ex : Chambre étage élevé, lit bébé, allergies alimentaires...",
        specialRequestsHint: "Ces demandes sont soumises à disponibilité",
        arrivalTimeLabel: "Heure d'arrivée estimée",
        arrivalTimePlaceholder: "Sélectionnez une plage horaire",
        arrivalTime1: "14h00 - 16h00",
        arrivalTime2: "16h00 - 18h00",
        arrivalTime3: "18h00 - 20h00",
        arrivalTime4: "20h00 - 22h00",
        arrivalTime5: "Après 22h00",

        // Section 4: Paiement
        section4Title: "Informations de paiement",
        paymentInfo: "Paiement sécurisé. Vos informations sont cryptées et protégées.",
        cardNameLabel: "Nom sur la carte <span class='text-danger'>*</span>",
        cardNumberLabel: "Numéro de carte <span class='text-danger'>*</span>",
        cardExpiryLabel: "Date d'expiration <span class='text-danger'>*</span>",
        cardCVVLabel: "CVV <span class='text-danger'>*</span>",

        // Section 5: Conditions
        section5Title: "Conditions de réservation",
        cancellationPolicyTitle: "Politique d'annulation",
        cancellationPolicyText: "Annulation gratuite jusqu'à 48h avant l'arrivée. Au-delà, la première nuit sera facturée.",
        generalConditionsTitle: "Conditions générales",
        conditionCheckIn: "Check-in : à partir de 15h00",
        conditionCheckOut: "Check-out : avant 11h00",
        conditionID: "Une pièce d'identité et une carte bancaire sont requises à l'arrivée",
        acceptTermsLabel: "J'accepte les <a href='#' target='_blank' data-i18n='booking.termsLink'>conditions générales de vente</a> et la <a href='#' target='_blank' data-i18n='booking.privacyLink'>politique de confidentialité</a> <span class='text-danger'>*</span>",
        termsLink: "conditions générales de vente",
        privacyLink: "politique de confidentialité",
        newsletterCheck: "Je souhaite recevoir les offres spéciales et actualités par email",
        submitButton: "Confirmer et payer",
        
        // Colonne Récapitulatif (Summary)
        summaryTitle: "Récapitulatif",
        summaryHotelLabel: "<i class='bi bi-building'></i> Hôtel",
        summaryRoomAlt: "Chambre",
        summaryAdults: "<i class='bi bi-people'></i> 2 adultes",
        summaryCheckInLabel: "Arrivée",
        summaryCheckInTime: "15:00",
        summaryNights: "-- nuits",
        summaryCheckOutLabel: "Départ",
        summaryCheckOutTime: "11:00",
        pricingDetailsTitle: "Détail du prix",
        priceLineRoom: "Chambre (<span id='priceNights'>--</span> nuits)",
        priceLineTotal: "Total",
        priceLineTax: "<i class='bi bi-info-circle'></i> Taxe de séjour incluse",
        benefitFreeCancellation: "Annulation gratuite",
        benefitImmediateConfirmation: "Confirmation immédiate",
        benefitSecurePayment: "Paiement sécurisé",
        summaryHelpTitle: "Besoin d'aide ?",
        summaryHelpPhone: "<i class='bi bi-telephone'></i> 1-555-555-5555",
    },

    // Page Contact (NOUVEAU)
    contact: {
        // Meta
        metaTitle: "Nous contacter - Book Your Travel",
        metaDescription: "Contactez Book Your Travel - Support client 24/7 au 1-555-555-5555 ou par email. Notre équipe répond à toutes vos questions sur vos réservations d'hôtel.",
        metaKeywords: "contact hôtel, service client, support 24/7, aide réservation",
        metaOGTitle: "Contact - Book Your Travel",
        metaOGDescription: "Contactez notre équipe 24/7 pour toute question sur vos réservations.",
        metaTwitterTitle: "Contact - Book Your Travel",
        metaTwitterDescription: "Support client 24/7 - Nous répondons à toutes vos questions.",

        // Header
        title: "Contactez-nous",
        subtitle: "Nous sommes là pour vous aider. N'hésitez pas à nous contacter !",
        
        // Colonne Info
        mapAriaLabel: "Localisation de notre bureau principal sur une carte Google Maps",
        phoneTitle: "Téléphone",
        phoneSubtitle: "Support 24/7",
        phoneNumber: "1-555-555-5555",
        emailTitle: "Email",
        emailSubtitle: "Réponse sous 24h",

        // Formulaire
        formTitle: "Envoyez-nous un message",
        nameLabel: "Votre nom <span class='text-danger'>*</span>",
        emailLabel: "Votre e-mail <span class='text-danger'>*</span>",
        phoneLabel: "Téléphone",
        subjectLabel: "Sujet <span class='text-danger'>*</span>",
        subjectPlaceholder: "Sélectionnez un sujet",
        subjectReservation: "Réservation",
        subjectInformation: "Demande d'information",
        subjectComplaint: "Réclamation",
        subjectOther: "Autre",
        messageLabel: "Votre message <span class='text-danger'>*</span>",
        submitButton: "Envoyer le message",
        successMessage: "<i class='bi bi-check-circle-fill me-2'></i> Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.",
    },

    // Page d'accueil - Critères de sélection
    criteria: {
      hotels: "Hôtels Sélectionnés",
      hotelsDesc: "Tous les hôtels Book Your Travel répondent à des critères de sélection stricts.<br>Chaque hôtel est choisi individuellement et son inclusion ne peut être achetée.",
      detailedDescriptions: "Descriptions Détaillées", 
      detailedDescriptionsDesc: "Afin de vous donner une impression précise de l'hôtel, nous nous efforçons de publier des descriptions transparentes, équilibrées et précises des hôtels.", 
      knowledge: "Connaissance Exclusive",
      knowledgeDesc: "Nous avons fait nos recherches.<br>Nos éclaireurs sont toujours occupés à en apprendre davantage sur nos hôtels, les environs et les activités proposées à proximité.",
      service: "Service Passionné",
      serviceDesc: "L'équipe de Book Your Travel répondra à vos demandes spéciales.<br>Nous offrons des conseils experts et passionnés pour trouver le bon hôtel.",
      bestPrice: "Meilleur Prix Garanti",
      bestPriceDesc: "Nous offrons les meilleurs hôtels aux meilleurs prix.<br>Si vous trouvez la même catégorie de chambre aux mêmes dates moins chère ailleurs, nous vous rembourserons la différence.<br>Garanti, et rapidement.",
      secureBooking: "Réservation Sécurisée",
      secureBookingDesc: "Le système de réservation de Book Your Travel est sécurisé et votre carte de crédit ainsi que vos informations personnelles sont cryptées.<br>Nous travaillons selon des normes élevées et garantissons votre confidentialité.",
      hotelBenefits: "Avantages pour les Hôteliers",
      hotelBenefitsDesc: "Nous fournissons un modèle rentable, un réseau de plus de 5000 partenaires et un service de gestion de compte personnalisé pour vous aider à optimiser vos revenus.",
      questions: "Des Questions ?",
      questionsDesc: "Appelez-nous au 1-555-555-555 pour des conseils personnalisés et sur mesure pour votre séjour parfait ou envoyez-nous un message avec votre demande de réservation d'hôtel."
    },
    
    // Footer
    footer: {
      company: "Book Your Travel",
      address: "1400 Pennsylvania Ave. Washington, DC",
      phone: "P: 24/7 customer support: 1-555-555-5555",
      email: "contact@bookyourtravel.com",
      customerSupport: "Support Client",
      faq: "FAQ",
      howToBook: "Comment puis-je faire une réservation ?",
      paymentOptions: "Options de paiement",
      bookingTips: "Conseils de réservation",
      followUs: "Suivez-Nous",
      newsletter: "Newsletter",
      newsletterText: "Inscrivez-vous pour recevoir nos offres exclusives !",
      emailPlaceholder: "Votre email",
      subscribeButton: "OK", 
      copyright: "Copyright 2025 Réservation d'hôtel Formation Ilaria",
      aboutUs: "À propos de nous",
      partners: "Partenaires",
      customerService: "Service client",
      careers: "Carrières",
      terms: "Termes & Conditions"
    }
  },

  // ==========================================================
  // ENGLISH (EN)
  // ==========================================================
  en: {
    // Metadata 
    metadata: {
        roomTitle: "Our Rooms - Book Your Travel",
        roomDescription: "Discover our luxurious hotel rooms with premium amenities. Free Wi-Fi, air conditioning, flat-screen TV. Secure online booking.",
        roomKeywords: "hotel room, luxury suite, hotel amenities, room booking",
        roomOGDescription: "Discover our luxurious rooms with premium amenities and services.",
        roomTwitterDescription: "Luxury rooms with premium amenities."
    },

    // Navigation principale
    nav: {
      home: "Home",
      templateHotel: "Hotel Template",
      templateBooking: "Booking Template",
      contact: "Contact",
      documentations: "Documentations",
      menu: "Menu"
    },
    
    // Header
    header: {
      supportNumber: "24/7 Support number",
      myAccount: "MY ACCOUNT",
      country: "COUNTRY",
      currency: "CURRENCY",
      searchPlaceholder: "Search",
      skipLink: "Skip to main content"
    },
    
    // Sélecteurs de langue
    languages: {
      french: "French (Fr)",
      english: "English (US)",
      italian: "Italian (It)"
    },
    
    // Sélecteurs de monnaie
    currencies: {
      euro: "€ Euro",
      dollar: "$ US Dollar",
      pound: "£ Pound"
    },
    
    // Page d'accueil - Hero & Recherche
    home: {
      // Formulaires
      hotelRadio: "Hotel",
      flightRadio: "Flight", 
      flightHotelRadio: "Flight & Hotel",
      studioRadio: "Studio", 
      cruiseRadio: "Cruise", 
      carRentalRadio: "Car Rental", 
      whatTitle: "What?",
      whereTitle: "Where?", 
      whenTitle: "When?", 
      whoTitle: "Who?", 
      destination: "Your Destination",
      destinationPlaceholder: "City, area, district or specific hotel",
      checkin: "Check-in",
      checkout: "Check-out",
      rooms: "Rooms",
      adults: "Adults",
      children: "Children",
      searchButton: "View Results",
      // Section Offres
      offersTitle: "Discover Our Latest Deals", 
      offersSubtitle: "Explore incredible offers for your next adventure", 
      offer1Title: "Winter Beach Getaways", 
      offer1Text: "Enjoy sunny beaches with exclusive winter discounts", 
      offer2Title: "Spend New Year's Eve in Paris", 
      offer2Text: "Experience the magic of Paris during the holidays", 
      offer3Title: "A Heavenly Wedding Night", 
      offer3Text: "Wedding night in the Maldives, total luxury facing the ocean", 
      offer4Title: "Our Best Deal of the Week: Tahiti", 
      offer4Text: "Discover paradise at unbeatable prices", 
      bookNowButton: "Book Now", 
      // Badges
      badge30off: "30% OFF", 
      badgePromo: "PROMO",
      badgeHotDeal: "HOT DEAL",
      badgeNew: "NEW",
      // Section Destinations 
      exploreTitle: "Best Destinations Around The World",
      exploreSubtitle: "Check out the most popular travel destinations",
      viewHotelsButton: "View Hotels",
      hotels: "Hotels", 
      startingFrom: "Starting from", 
    },

    // Page Room 
    room: {
        // Carrousel & Miniatures
        breadcrumbHotel: "Hotel",
        slideLabel: "Slide", 
        thumbnailAlt: "Thumbnail", 
        altHotelView1: "View of Conrad Maldives Rangali Island 1",
        altHotelView2: "View of Conrad Maldives Rangali Island 2",
        altHotelView3: "View of Conrad Maldives Rangali Island 3",
        altHotelView4: "View of Conrad Maldives Rangali Island 4",
        altHotelView5: "View of Conrad Maldives Rangali Island 5",
        altHotelView6: "View of Conrad Maldives Rangali Island 6",
        altHotelView7: "View of Conrad Maldives Rangali Island 7",
        altHotelView8: "View of Conrad Maldives Rangali Island 8",
        altHotelView9: "View of Conrad Maldives Rangali Island 9",
        previous: "Previous",
        next: "Next",
        scrollLeft: "Scroll thumbnails left",
        scrollRight: "Scroll thumbnails right",

        // Navigation secondaire (Tabs)
        tabDescription: "Description",
        tabAvailability: "Availability",
        tabAmenities: "Amenities",
        tabReviews: "Reviews",
        tabLocation: "Location",
        helpTitle: "Help & Contact",
        helpText: "Call our customer service at the number below to speak to one of our advisors, who will help you with all your holiday needs.",
        helpPhone: "<i class='bi bi-telephone-fill me-1'></i>24/7 Support<br>1-555-555-5555",

        // Content - Description
        descriptionHotelTitle: "Hotel Description",
        descP1: "Enjoy the high-end services of the Conrad Maldives Rangali Island establishment",
        descP2: "Located on 2 islands connected by a bridge, the luxurious Conrad Maldives Rangali Island offers spacious private villas. The establishment houses the all-glass underwater restaurant Ithaa and 2 award-winning spas.",
        descP3: "Extending up to 500 meters into the Indian Ocean, the villas at Conrad Rangali Island offer all the necessary comforts, including free Wi-Fi, a flat-screen TV and a DVD player. The wooden bay windows offer magnificent views of the sea or the beach.",
        descP4: "During your stay, you can enjoy relaxing moments at the Retreat Spa on the lagoon, or at the Over-Water Spa, which overlooks the sea. For an even more enriching stay, you can visit the on-site Italian boutique or discover the local culture during a day trip to one of the surrounding islands.",
        descP5: "World-renowned, the 12 bars and restaurants at Conrad Maldives serve a variety of international specialties, Mediterranean dishes and grilled food. The Wine Cellar offers more than 600 quality wine bottles.",
        descP6: "This resort offers experiences on two neighboring islands. The family island, Rangali-Finolhu, welcomes children of all ages. Children under 16 cannot stay in the overwater villas, nor access the pool in the peaceful area located on the secluded adult-only Rangali island. However, the 2-bedroom Rangali Pavilion with pool and ocean view can accommodate a family of 6, including children.",
        descP7: "The Conrad Maldives Rangali Island is accessible by seaplane, a picturesque 30-minute flight, from Malé International Airport.",
        descP8: "Couples particularly appreciate the location of this establishment. They give it a score of 10.0 for a stay for two.",

        // Content - Room Offer (Availability)
        altRoomView1: "Room view 1",
        altRoomView2: "Room view 2",
        altRoomView3: "Room view 3",
        altRoomView4: "Room view 4",
        altRoomView5: "Room view 5",
        altRoomView6: "Room view 6",
        altRoomView7: "Room view 7",
        roomOfferTitle: "Overwater Villa",
        pricePerNight: "Price per night",
        vatBadge: "VAT 20%",
        includedInPrice: "Included in the price",
        maxCapacity: "Max :",
        priceValue: "Price: 770 €",
        nonRefundable: "Non-refundable",
        breakfastPrice: "Full breakfast €24.80",
        bookNowButton: "BOOK NOW",
        offerDesc: "Rebuilt in 2011, the villas are set on stilts and spread over the waters of the Maldives. They include bathtubs overlooking the ocean and a private sun terrace with direct access to the lagoon. The accommodations also feature a small private pool with water jets. The villas are furnished with glass floor panels and recessed lighting.",
        roomTypeTitle: "Room Type",
        roomTypeValue: "Entire villa of 86 m<sup class='expo'>2</sup> with private terrace, jacuzzi and two king-size beds.",
        roomAmenitiesTitle: "Room Amenities:",
        roomAmenitiesList: "Balcony, Sea view, Private bathroom in the accommodation with shower and spa bath, Flat-screen TV, Minibar, Free Wi-Fi, Dryer, Toilet, Safe, Telephone.",

        // Content - Calendar
        availabilityTitle: "Check Availability",
        availabilitySubtitle: "Select your check-in and check-out dates and times",
        calendarPlaceholder: "Select your dates",
        checkInDateLabel: "Check-in Date",
        checkOutDateLabel: "Check-out Date",
        checkInTimeLabel: "Check-in Time",
        checkOutTimeLabel: "Check-out Time",
        nightsPlural: "night(s)",
        totalPrice: "Total price: <span id='totalPrice'>0€</span>",
        reserveButton: "Book now",
        resetButton: "Reset",

        // Content - Amenities
        amenitiesTitle: "Hotel services and amenities",
        amenitiesOutdoorsTitle: "Outdoors:",
        amenityPools: "✓ 3 swimming pools",
        amenityTerrace: "✓ Terrace",
        amenityGarden: "✓ Garden",
        amenityRestaurant: "✓ Restaurant",
        amenitySnack: "✓ Snack bar",
        amenityLoungers: "✓ Sun loungers or beach chairs",
        amenityParasols: "✓ Parasols",
        amenityPlayground: "✓ Outdoor play area",
        amenityPingPong: "✓ Table tennis",
        amenityWaterFacilities: "✓ Water sports facilities",
        amenityNightclub: "✓ Nightclub",
        amenityParking: "✓ Parking",
        amenitiesWellnessTitle: "Wellness:",
        amenitySpa: "✓ Spa and wellness center",
        amenitySauna: "✓ Sauna",
        amenityFitness: "✓ Fitness center",
        amenityFitnessClasses: "✓ Fitness classes",
        amenityYogaClasses: "✓ Yoga classes",
        amenityHairdressing: "✓ Hairdressing",
        amenitiesFoodTitle: "Food & Drink:",
        amenityWine: "✓ Wine/champagne",
        amenityKidsBuffet: "✓ Buffet with children's options",
        amenityKidsMenus: "✓ Children's menus",
        amenitySpecialDiets: "✓ Special diet menus",
        amenityTraditionalFood: "✓ Traditional cuisine",
        amenityVegetarianFood: "✓ Vegetarian cuisine",
        amenitySnacks24h: "✓ Snacks 24/7",
        amenityRoomBreakfast: "✓ Breakfast in room",
        amenityBar: "✓ Bar",

        // Content - Reviews
        reviewsTitle: "Customer Reviews",
        reviewAuthorAnonymous: "Anonymous",
        reviewDetails1: "Solo•Italy",
        reviewPositive1: "The hotel was warm and welcoming. Very well located with easy access to shops and transport. Very pleasant and helpful staff.",
        reviewNegative1: "The noise from neighbors spoiled the rather calm atmosphere of the establishment. Insufficient sound insulation between rooms.",
        reviewDetails2: "Couple•France",
        reviewPositive2: "Magnificent establishment with an exceptional view of the sea. The rooms are spacious and very well equipped. The staff was very attentive.",
        reviewNegative2: "The value for money is not optimal. The services do not quite correspond to the price charged. Disappointed with certain extra paid services.",
        reviewDetails3: "Couple•Switzerland",
        reviewPositive3: "Absolutely perfect stay! The private pool was a real plus. The breakfast was delicious with a wide choice. We loved our experience.",
        reviewNegative3: "Very unstable Wifi in the room. Recurring connection problems. Too bad for an establishment of this standing.",
        reviewDetails4: "Family•Spain",
        reviewPositive4: "Ideal location to enjoy the beach. The facilities are modern and quality. The spa was very relaxing. Impeccable service from start to finish.",
        reviewNegative4: "The pool maintenance left something to be desired during our stay. Cloudy water some days. The cleaning service could be more regular.",
        reviewDetails5: "Couple•USA",
        reviewPositive5: "Luxury hotel that deserves its stars. The cleanliness is impeccable. The facilities are magnificent. An unforgettable experience that we highly recommend.",
        reviewNegative5: "Too long wait at the restaurant in the evening. Service sometimes overwhelmed during high season. We had to wait more than 40 minutes before being served.",

        // Content - Location
        locationTitle: "Hotel Location",
        altLocationMap: "Location of Conrad Maldives Rangali Island Hotel",
        locationAddressTitle: "Address:",
        locationAddressValue: "RANGALI ISLAND, 20077, MALDIVES",
        locationPhone: "<i class='bi bi-telephone'></i> PHONE: +960 668 0629",
        locationWhatsapp: "<i class='bi bi-whatsapp'></i> WHATSAPP: +960 799 4840",
        airportTitle: "<i class='bi bi-airplane'></i> Nearest Airport:",
        airportValue: "Maamigili Airport 19 km.",
        shuttleTitle: "<i class='bi bi-taxi-front'></i> Shuttle:",
        shuttleValue: "Airport shuttle service available.",
        contactUsLink: "<i class='bi bi-at me-1'></i>Contact us",

        // Sidebar - Hotel Info
        hotelName: "Conrad Maldives Rangali Island",
        hotelLocation: "Rangali Island, Maldives",
        hotelRating: " 10/10",
        hotelShortDescription: "The Conrad Maldives Rangali Island offers luxurious stays on two private islands, with beach and overwater villas.",
        tagWellness: "Wellness",
        tagLastMinute: "Last minute",
        tagMaldives: "Maldives",
        tagSPA: "SPA",
        tagRomantic: "Romantic",

        // Sidebar - Why Book With Us
        whyBookTitle: "Why book with us?",
        whyBookLowPricesTitle: "Low prices",
        whyBookLowPricesP1: "Get the best prices or get a refund.",
        whyBookLowPricesP2: "No booking fees.",
        whyBookLowPricesP3: "Save money!",
        whyBookLargestChoiceTitle: "The largest selection",
        whyBookLargestChoiceP1: "Over 140,000 hotels worldwide",
        whyBookLargestChoiceP2: "Over 130 airlines",
        whyBookLargestChoiceP3: "Over 3 million customer reviews",
        whyBookCustomerSupportTitle: "Always listening",
        whyBookCustomerSupportP1: "Call or email us anytime.",
        whyBookCustomerSupportP2: "Over 130 airlines",
        whyBookCustomerSupportP3: "24/7 customer service, before, during and after your trip.",

        // Sidebar - Popular Hotels
        popularHotelsTitle: "Popular hotels in the region",
        popularHotel1Name: "Gili Lankanfushi Maldives",
        popularHotel1Price: "starting from €1250/night",
        popularHotel1Rating: " 9.8/10",
        popularHotel2Name: "Soneva Fushi Resort",
        popularHotel2Price: "starting from €1150/night",
        popularHotel2Rating: " 9.6/10",
        popularHotel3Name: "Velaa Private Island",
        popularHotel3Price: "starting from €2100/night",
        popularHotel3Rating: " 10/10",
        popularHotel4Name: "Baros Maldives",
        popularHotel4Price: "starting from €750/night",
        popularHotel4Rating: " 9.4/10",

        // Sidebar - Deal of the Day
        dealOfTheDayTitle: "Deal of the day!",
        altDealOfTheDay: "Baros Maldives - Deal of the day",
        dealOfTheDayName: "Baros Maldives",
        dealOfTheDayPrice: "Starting from €750",
        dealOfTheDayPriceSuffix: "/ per night",
        dealOfTheDayRating: "9.4/10",

        // Modale Accessibility
        modalClose: "Close",
        lightboxAlt: "Enlarged image of the room",
        previousImage: "Previous image",
        nextImage: "Next image",
    },

    // Page Booking
    booking: {
        // Meta & Breadcrumb
        metaTitle: "Finalize my booking - Book Your Travel",
        metaDescription: "Finalize your hotel booking securely. Secure SSL payment, immediate email confirmation and best price guaranteed.",
        metaKeywords: "hotel booking, booking, secure payment, immediate confirmation",
        metaOGTitle: "Hotel Booking - Book Your Travel",
        metaOGDescription: "Finalize your booking securely. SSL payment and immediate confirmation.",
        metaTwitterTitle: "Hotel Booking - Book Your Travel",
        metaTwitterDescription: "Finalize your booking securely.",
        breadcrumbBooking: "Booking",
        
        // Header
        title: "Finalize your booking",
        subtitle: "Complete the information below to confirm your stay",
        
        // Section 1: Vos informations
        section1Title: "Your information",
        firstNameLabel: "First Name <span class='text-danger'>*</span>",
        lastNameLabel: "Last Name <span class='text-danger'>*</span>",
        emailLabel: "Email <span class='text-danger'>*</span>",
        phoneLabel: "Phone <span class='text-danger'>*</span>",
        addressLabel: "Address",
        cityLabel: "City",
        postalCodeLabel: "Postal Code",
        countryLabel: "Country",
        countryFR: "France",
        countryBE: "Belgium",
        countryCH: "Switzerland",
        countryCA: "Canada",
        countryUS: "United States",
        guestsTitle: "<i class='bi bi-people-fill'></i> Number of guests <span class='text-danger'>*</span>",
        adultsLabel: "Adults (18+)",
        childrenLabel: "Children (0-17)",
        guestsTotal: "<i class='bi bi-info-circle'></i> <strong>Total:</strong> <span id='totalGuests'>2</span> guest(s) - Maximum 3 guests per room",
        guestsError: "<i class='bi bi-exclamation-triangle'></i> The maximum number of guests is 3",

        // Section 2: Services additionnels
        section2Title: "Additional services",
        serviceParkingTitle: "Private parking",
        serviceParkingDesc: "Secure parking space",
        serviceParkingPrice: "€15/night",
        serviceBreakfastTitle: "Breakfast",
        serviceBreakfastDesc: "Continental buffet per person",
        serviceBreakfastPrice: "€25/person/day",
        serviceSpaTitle: "Spa access",
        serviceSpaDesc: "Pool, sauna and jacuzzi",
        serviceSpaPrice: "€80/stay",
        serviceTransferTitle: "Airport transfer",
        serviceTransferDesc: "One-way from/to airport",
        serviceTransferPrice: "€50/trip",
        serviceLateCheckoutTitle: "Late check-out",
        serviceLateCheckoutDesc: "Departure until 4pm instead of 11am",
        serviceLateCheckoutPrice: "€30",

        // Section 3: Demandes spéciales
        section3Title: "Special requests",
        specialRequestsLabel: "Do you have any special requests?",
        specialRequestsPlaceholder: "Ex: High floor room, baby cot, food allergies...",
        specialRequestsHint: "These requests are subject to availability",
        arrivalTimeLabel: "Estimated arrival time",
        arrivalTimePlaceholder: "Select a time slot",
        arrivalTime1: "2:00 PM - 4:00 PM",
        arrivalTime2: "4:00 PM - 6:00 PM",
        arrivalTime3: "6:00 PM - 8:00 PM",
        arrivalTime4: "8:00 PM - 10:00 PM",
        arrivalTime5: "After 10:00 PM",

        // Section 4: Paiement
        section4Title: "Payment information",
        paymentInfo: "Secure payment. Your information is encrypted and protected.",
        cardNameLabel: "Name on card <span class='text-danger'>*</span>",
        cardNumberLabel: "Card number <span class='text-danger'>*</span>",
        cardExpiryLabel: "Expiry date <span class='text-danger'>*</span>",
        cardCVVLabel: "CVV <span class='text-danger'>*</span>",

        // Section 5: Conditions
        section5Title: "Booking conditions",
        cancellationPolicyTitle: "Cancellation policy",
        cancellationPolicyText: "Free cancellation up to 48 hours before arrival. Beyond that, the first night will be charged.",
        generalConditionsTitle: "General conditions",
        conditionCheckIn: "Check-in: from 3:00 PM",
        conditionCheckOut: "Check-out: before 11:00 AM",
        conditionID: "Photo ID and a bank card are required upon arrival",
        acceptTermsLabel: "I accept the <a href='#' target='_blank' data-i18n='booking.termsLink'>general terms and conditions</a> and the <a href='#' target='_blank' data-i18n='booking.privacyLink'>privacy policy</a> <span class='text-danger'>*</span>",
        termsLink: "general terms and conditions",
        privacyLink: "privacy policy",
        newsletterCheck: "I wish to receive special offers and news by email",
        submitButton: "Confirm and pay",
        
        // Colonne Récapitulatif (Summary)
        summaryTitle: "Summary",
        summaryHotelLabel: "<i class='bi bi-building'></i> Hotel",
        summaryRoomAlt: "Room",
        summaryAdults: "<i class='bi bi-people'></i> 2 adults",
        summaryCheckInLabel: "Check-in",
        summaryCheckInTime: "3:00 PM",
        summaryNights: "-- nights",
        summaryCheckOutLabel: "Check-out",
        summaryCheckOutTime: "11:00 AM",
        pricingDetailsTitle: "Pricing details",
        priceLineRoom: "Room (<span id='priceNights'>--</span> nights)",
        priceLineTotal: "Total",
        priceLineTax: "<i class='bi bi-info-circle'></i> Tourist tax included",
        benefitFreeCancellation: "Free cancellation",
        benefitImmediateConfirmation: "Immediate confirmation",
        benefitSecurePayment: "Secure payment",
        summaryHelpTitle: "Need help?",
        summaryHelpPhone: "<i class='bi bi-telephone'></i> 1-555-555-5555",
    },

    // Page Contact (NOUVEAU)
    contact: {
        // Meta
        metaTitle: "Contact Us - Book Your Travel",
        metaDescription: "Contact Book Your Travel - 24/7 Customer support at 1-555-555-5555 or by email. Our team answers all your questions about your hotel reservations.",
        metaKeywords: "hotel contact, customer service, 24/7 support, booking help",
        metaOGTitle: "Contact - Book Your Travel",
        metaOGDescription: "Contact our 24/7 team for any questions regarding your reservations.",
        metaTwitterTitle: "Contact - Book Your Travel",
        metaTwitterDescription: "24/7 Customer support - We answer all your questions.",

        // Header
        title: "Contact Us",
        subtitle: "We are here to help you. Do not hesitate to contact us!",
        
        // Colonne Info
        mapAriaLabel: "Location of our main office on a Google Maps map",
        phoneTitle: "Phone",
        phoneSubtitle: "24/7 Support",
        phoneNumber: "1-555-555-5555",
        emailTitle: "Email",
        emailSubtitle: "Response within 24 hours",

        // Formulaire
        formTitle: "Send us a message",
        nameLabel: "Your Name <span class='text-danger'>*</span>",
        emailLabel: "Your Email <span class='text-danger'>*</span>",
        phoneLabel: "Phone",
        subjectLabel: "Subject <span class='text-danger'>*</span>",
        subjectPlaceholder: "Select a subject",
        subjectReservation: "Reservation",
        subjectInformation: "Information Request",
        subjectComplaint: "Complaint",
        subjectOther: "Other",
        messageLabel: "Your Message <span class='text-danger'>*</span>",
        submitButton: "Send Message",
        successMessage: "<i class='bi bi-check-circle-fill me-2'></i> Your message has been sent successfully! We will reply to you as soon as possible.",
    },

    // Page d'accueil - Critères de sélection
    criteria: {
      hotels: "Handpicked Hotels",
      hotelsDesc: "All Book Your Travel hotels meet strict selection criteria.<br>Each hotel is individually chosen and inclusion cannot be purchased.",
      detailedDescriptions: "Detailed Descriptions", 
      detailedDescriptionsDesc: "In order to give you an accurate impression of the hotel, we strive to publish transparent, balanced and accurate hotel descriptions.", 
      knowledge: "Exclusive Knowledge",
      knowledgeDesc: "We've done our research.<br>Our scouts are always busy learning more about our hotels, the surroundings and nearby activities.",
      service: "Passionate Service",
      serviceDesc: "The Book Your Travel team will respond to your special requests.<br>We offer expert and passionate advice to find the right hotel.",
      bestPrice: "Best Price Guaranteed",
      bestPriceDesc: "We offer the best hotels at the best prices.<br>If you find the same room category on the same dates cheaper elsewhere, we will refund the difference.<br>Guaranteed, and fast.",
      secureBooking: "Secure Booking",
      secureBookingDesc: "Book Your Travel's reservation system is secure and your credit card and personal information are encrypted.<br>We work to high standards and guarantee your privacy.",
      hotelBenefits: "Benefits for Hoteliers",
      hotelBenefitsDesc: "We provide a profitable model, a network of more than 5000 partners and a personalized account management service to help you optimize your revenue.",
      questions: "Any Questions?",
      questionsDesc: "Call us on 1-555-555-555 for personalized and tailor-made advice for your perfect stay or send us a message with your hotel reservation request."
    },
    
    // Footer
    footer: {
      company: "Book Your Travel",
      address: "1400 Pennsylvania Ave. Washington, DC",
      phone: "P: 24/7 customer support: 1-555-555-5555",
      email: "contact@bookyourtravel.com",
      customerSupport: "Customer Support",
      faq: "FAQ",
      howToBook: "How do I make a reservation?",
      paymentOptions: "Payment options",
      bookingTips: "Booking tips",
      followUs: "Follow Us",
      newsletter: "Newsletter",
      newsletterText: "Sign up to receive our exclusive offers!",
      emailPlaceholder: "Your email address",
      subscribeButton: "OK", 
      copyright: "Copyright 2025 Hotel Booking Ilaria Training",
      aboutUs: "About us",
      partners: "Partners",
      customerService: "Customer service",
      careers: "Careers",
      terms: "Terms & Conditions"
    }
  },

  // ==========================================================
  // ITALIANO (IT)
  // ==========================================================
  it: {
    // Metadata 
    metadata: {
        roomTitle: "Le Nostre Camere - Book Your Travel",
        roomDescription: "Scopri le nostre lussuose camere d'albergo con servizi di alta gamma. Wi-Fi gratuito, aria condizionata, TV a schermo piatto. Prenotazione online sicura.",
        roomKeywords: "camera d'albergo, suite di lusso, servizi alberghieri, prenotazione camera",
        roomOGDescription: "Scopri le nostre camere lussuose con servizi e comfort premium.",
        roomTwitterDescription: "Camere di lusso con servizi premium."
    },

    // Navigation principale
    nav: {
      home: "Home",
      templateHotel: "Template Hotel",
      templateBooking: "Template Prenotazione",
      contact: "Contatto",
      documentations: "Documentazione",
      menu: "Menu"
    },
    
    // Header
    header: {
      supportNumber: "Numero di supporto 24/7",
      myAccount: "IL MIO ACCOUNT",
      country: "PAESE",
      currency: "VALUTA",
      searchPlaceholder: "Cerca",
      skipLink: "Vai al contenuto principale"
    },
    
    // Sélecteurs de monnaie
    currencies: {
      euro: "€ Euro",
      dollar: "$ Dollaro USA",
      pound: "£ Sterlina"
    },
    
    // Page d'accueil - Hero & Recherche
    home: {
      // Formulaires
      hotelRadio: "Hotel",
      flightRadio: "Volo", 
      flightHotelRadio: "Volo & Hotel",
      studioRadio: "Studio", 
      cruiseRadio: "Crociera", 
      carRentalRadio: "Noleggio auto", 
      whatTitle: "Cosa?",
      whereTitle: "Dove?", 
      whenTitle: "Quando?", 
      whoTitle: "Chi?", 
      destination: "La tua destinazione",
      destinationPlaceholder: "Città, regione, distretto o hotel specifico",
      checkin: "Check-in",
      checkout: "Check-out",
      rooms: "Camere",
      adults: "Adulti",
      children: "Bambini",
      searchButton: "Vedi i risultati",
      // Section Offres
      offersTitle: "Scopri le nostre ultime offerte", 
      offersSubtitle: "Esplora incredibili offerte per la tua prossima avventura", 
      offer1Title: "Fughe Invernali sulla Spiaggia", 
      offer1Text: "Goditi spiagge soleggiate con sconti invernali esclusivi", 
      offer2Title: "Trascorri il Capodanno a Parigi", 
      offer2Text: "Vivi la magia di Parigi durante le feste", 
      offer3Title: "Una Notte di Nozze Paradisiaca", 
      offer3Text: "Notte di nozze alle Maldive, lusso totale di fronte all'oceano", 
      offer4Title: "La Nostra Migliore Offerta della Settimaine: Tahiti", 
      offer4Text: "Scopri il paradiso a prezzi imbattibili", 
      bookNowButton: "Prenota ora", 
      // Badges
      badge30off: "30% OFF", 
      badgePromo: "PROMO",
      badgeHotDeal: "HOT DEAL",
      badgeNew: "NUOVO",
      // Section Destinations 
      exploreTitle: "Le Migliori Destinazioni del Mondo",
      exploreSubtitle: "Scopri le destinazioni de voyage le plus popolari",
      viewHotelsButton: "Vedi gli Hotel",
      hotels: "Hotel", 
      startingFrom: "A partire da", 
    },

    // Page Room 
    room: {
        // Carrousel & Miniatures
        breadcrumbHotel: "Hotel",
        slideLabel: "Diapositiva", 
        thumbnailAlt: "Miniatura", 
        altHotelView1: "Vista del Conrad Maldives Rangali Island 1",
        altHotelView2: "Vista del Conrad Maldives Rangali Island 2",
        altHotelView3: "Vista del Conrad Maldives Rangali Island 3",
        altHotelView4: "Vista del Conrad Maldives Rangali Island 4",
        altHotelView5: "Vista del Conrad Maldives Rangali Island 5",
        altHotelView6: "Vista del Conrad Maldives Rangali Island 6",
        altHotelView7: "Vista del Conrad Maldives Rangali Island 7",
        altHotelView8: "Vista del Conrad Maldives Rangali Island 8",
        altHotelView9: "Vista del Conrad Maldives Rangali Island 9",
        previous: "Precedente",
        next: "Successivo",
        scrollLeft: "Scorri le miniature a sinistra",
        scrollRight: "Scorri le miniature a destra",

        // Navigazione secondaria (Tabs)
        tabDescription: "Descrizione",
        tabAvailability: "Disponibilità",
        tabAmenities: "Servizi",
        tabReviews: "Recensioni",
        tabLocation: "Posizione",
        helpTitle: "Aiuto e Contatto",
        helpText: "Chiama il nostro servizio clienti al numero sottostante per parlare con uno dei nostri consulenti, che ti aiuterà con tutte le tue esigenze di vacanza.",
        helpPhone: "<i class='bi bi-telephone-fill me-1'></i>Assistenza 24/7<br>1-555-555-5555",

        // Contenuto - Descrizione
        descriptionHotelTitle: "Descrizione dell'hotel",
        descP1: "Goditi i servizi di alta gamma della struttura Conrad Maldives Rangali Island",
        descP2: "Situato su 2 isole collegate da un ponte, il lussuoso Conrad Maldives Rangali Island offre ampie ville private. La struttura ospita il ristorante sottomarino Ithaa tutto in vetro e 2 premiati centri benessere.",
        descP3: "Le ville del Conrad Rangali Island, che si estendono fino a 500 metri nell'Oceano Indiano, offrono tutti i comfort necessari, tra cui la connessione Wi-Fi gratuita, una TV a schermo piatto e un lettore DVD. Le vetrate in legno offrono magnifiche viste sul mare o sulla spiaggia.",
        descP4: "Durante il tuo soggiorno, potrai goderti momenti di relax presso la spa Retreat sulla laguna, o presso la spa Over-Water, che si affaccia sul mare. Per un soggiorno ancora più arricchente, puoi visitare la boutique italiana in loco o scoprire la cultura locale durante un'escursione di un giorno in una delle isole circostanti.",
        descP5: "Rinomati a livello mondiale, i 12 bar e ristoranti del Conrad Maldives servono una varietà di specialità internazionali, piatti mediterranei e grigliate. La Wine Cellar offre più di 600 bottiglie di vino di qualità.",
        descP6: "Questo complesso alberghiero offre esperienze su due isole vicine. L'isola per famiglie, Rangali-Finolhu, accoglie bambini di tutte le età. I bambini sotto i 16 anni non possono soggiorner dans les villas sur pilotis, ni accéder à la piscine dans l'area tranquila située sull'isola isolata di Rangali, riservata agli adulti. Il Padiglione Rangali con 2 camere da letto con piscina e vista sull'oceano può tuttavia ospitare una famiglia di 6 persone, inclusi i bambini.",
        descP7: "Il Conrad Maldives Rangali Island è accessibile in idrovolante, un volo panoramico della durata di 30 minuti, dall'aeroporto internazionale di Malé.",
        descP8: "Le coppie apprezzano particolarmente la posizione di questa struttura. Gli danno un punteggio di 10,0 per un soggiorno per due.",

        // Contenu - Offre de camera (Availability)
        altRoomView1: "Vista camera 1",
        altRoomView2: "Vista camera 2",
        altRoomView3: "Vista camera 3",
        altRoomView4: "Vista camera 4",
        altRoomView5: "Vista camera 5",
        altRoomView6: "Vista camera 6",
        altRoomView7: "Vista camera 7",
        roomOfferTitle: "Villa sull'acqua",
        pricePerNight: "Prezzo per notte",
        vatBadge: "IVA 20%",
        includedInPrice: "Incluso nel prezzo",
        maxCapacity: "Max :",
        priceValue: "Prezzo: 770 €",
        nonRefundable: "Non rimborsabile",
        breakfastPrice: "Colazione completa 24,80 €",
        bookNowButton: "PRENOTA ORA",
        offerDesc: "Ristrutturate nel 2011, le ville sono costruite su palafitte e distribuite sulle acque delle Maldive. Includono vasche da bagno con vista sull'oceano e una terrazza solarium privata con accesso diretto alla laguna. Gli alloggi dispongono anche di una piccola piscina privata con getti d'acqua. Le ville sono arredate con pannelli di vetro sul pavimento e illuminazione incassata.",
        roomTypeTitle: "Tipo di camera",
        roomTypeValue: "Intera villa di 86 m<sup class='expo'>2</sup> con terrazza privata, jacuzzi e due letti king-size.",
        roomAmenitiesTitle: "Servizi in camera:",
        roomAmenitiesList: "Balcone, Vista mare, Bagno privato nell'alloggio con doccia e vasca idromassaggio, TV a schermo piatto, Minibar, Wi-Fi Gratuito, Asciugatrice, Toilette, Cassaforte, Telefono.",

        // Contenuto - Calendrier
        availabilityTitle: "Verifica Disponibilità",
        availabilitySubtitle: "Seleziona le date e gli orari di arrivo e partenza",
        calendarPlaceholder: "Seleziona le tue date",
        checkInDateLabel: "Data di arrivo",
        checkOutDateLabel: "Data di partenza",
        checkInTimeLabel: "Ora di arrivo",
        checkOutTimeLabel: "Ora di partenza",
        nightsPlural: "notte(i)",
        totalPrice: "Prezzo totale: <span id='totalPrice'>0€</span>",
        reserveButton: "Prenota ora",
        resetButton: "Reimposta",

        // Contenuto - Servizi
        amenitiesTitle: "Servizi e dotazioni dell'hotel",
        amenitiesOutdoorsTitle: "All'aperto:",
        amenityPools: "✓ 3 piscine",
        amenityTerrace: "✓ Terrazza",
        amenityGarden: "✓ Giardino",
        amenityRestaurant: "✓ Ristorante",
        amenitySnack: "✓ Snack bar",
        amenityLoungers: "✓ Sedie a sdraio o da spiaggia",
        amenityParasols: "✓ Ombrelloni",
        amenityPlayground: "✓ Area giochi all'aperto",
        amenityPingPong: "✓ Tennis da tavolo",
        amenityWaterFacilities: "✓ Strutture per sport acquatici",
        amenityNightclub: "✓ Discoteca",
        amenityParking: "✓ Parcheggio",
        amenitiesWellnessTitle: "Benessere:",
        amenitySpa: "✓ Spa e centro benessere",
        amenitySauna: "✓ Sauna",
        amenityFitness: "✓ Centro fitness",
        amenityFitnessClasses: "✓ Corsi di fitness",
        amenityYogaClasses: "✓ Corsi di yoga",
        amenityHairdressing: "✓ Parrucchiere",
        amenitiesFoodTitle: "Ristorazione:",
        amenityWine: "✓ Vino/champagne",
        amenityKidsBuffet: "✓ Buffet con opzioni per bambini",
        amenityKidsMenus: "✓ Menu per bambini",
        amenitySpecialDiets: "✓ Menu per diete speciali",
        amenityTraditionalFood: "✓ Ristorazione tradizionale",
        amenityVegetarianFood: "✓ Ristorazione vegetariana",
        amenitySnacks24h: "✓ Snack 24/24",
        amenityRoomBreakfast: "✓ Colazione in camera",
        amenityBar: "✓ Bar",

        // Contenuto - Recensioni
        reviewsTitle: "Recensioni dei clienti",
        reviewAuthorAnonymous: "Anonimo",
        reviewDetails1: "Solo•Italie",
        reviewPositive1: "L'hotel era caldo e accogliente. Ottima posizione con facile accesso a negozi e trasporti. Personale molto gentile e disponibile.",
        reviewNegative1: "Il rumore dei vicini ha rovinato l'atmosfera piuttosto tranquilla della struttura. Isolamento acustico insufficiente tra le camere.",
        reviewDetails2: "Coppia•Francia",
        reviewPositive2: "Struttura magnifica con una vista eccezionale sul mare. Le camere sono spaziose e molto ben attrezzate. Il personale è stato molto attento.",
        reviewNegative2: "Il rapporto qualità-prezzo non è ottimale. I servizi non corrispondono del tutto al prezzo praticato. Deluso par certains services payants en supplément.",
        reviewDetails3: "Coppia•Svizzera",
        reviewPositive3: "Soggiorno assolutamente perfetto! La piscina privata era un vero vantaggio. La colazione era deliziosa con un'ampia scelta. Abbiamo adorato la nostra esperienza.",
        reviewNegative3: "Wifi très instable dans la chambre. Problèmes de connexion récurrents. Peccato per una struttura di questo livello.",
        reviewDetails4: "Famiglia•Spagna",
        reviewPositive4: "Posizione ideale per godersi la spiaggia. Le strutture sono moderne e di qualità. La spa era molto rilassante. Servizio impeccabile dall'inizio alla fine.",
        reviewNegative4: "La manutenzione della piscina lasciava a desiderare durante il nostro soggiorno. Acqua torbida alcuni giorni. Il servizio di pulizia potrebbe essere più regolare.",
        reviewDetails5: "Coppia•USA",
        reviewPositive5: "Hotel di lusso che merita le sue stelle. La pulizia è impeccabile. Le strutture sono magnifiche. Un'esperienza indimenticabile che consigliamo vivamente.",
        reviewNegative5: "Attesa troppo longue au restaurant le soir. Service a volte sopraffatto in alta stagione. Nous avons dû attendre plus de 40 minutes avant d'être servis.",

        // Contenuto - Posizione
        locationTitle: "Posizione dell'hotel",
        altLocationMap: "Posizione dell'hotel Conrad Maldives Rangali Island",
        locationAddressTitle: "Indirizzo:",
        locationAddressValue: "RANGALI ISLAND, 20077, MALDIVES",
        locationPhone: "<i class='bi bi-telephone'></i> TELEFONO: +960 668 0629",
        locationWhatsapp: "<i class='bi bi-whatsapp'></i> WHATSAPP: +960 799 4840",
        airportTitle: "<i class='bi bi-airplane'></i> Aeroporto più vicino:",
        airportValue: "Aeroporto di Maamigili 19 km.",
        shuttleTitle: "<i class='bi bi-taxi-front'></i> Navetta :",
        shuttleValue: "Servizio navetta aeroportuale disponibile.",
        contactUsLink: "<i class='bi bi-at me-1'></i>Contattaci",

        // Sidebar - Hotel Info
        hotelName: "Conrad Maldives Rangali Island",
        hotelLocation: "Rangali Island, Maldive",
        hotelRating: " 10/10",
        hotelShortDescription: "Il Conrad Maldives Rangali Island offre soggiorni di lusso su due isole private, con ville sulla spiaggia et sull'acqua.",
        tagWellness: "Benessere",
        tagLastMinute: "Ultimo minuto",
        tagMaldives: "Maldive",
        tagSPA: "SPA",
        tagRomantico: "Romantico",

        // Sidebar - Perché Prenotare con Noi
        whyBookTitle: "Perché prenotare con noi?",
        whyBookLowPricesTitle: "Prezzi bassi",
        whyBookLowPricesP1: "Ottieni i prezzi migliori o sarai rimborsato.",
        whyBookLowPricesP2: "Nessun costo di prenotazione.",
        whyBookLowPricesP3: "Risparmia denaro!",
        whyBookLargestChoiceTitle: "La più vasta selezione",
        whyBookLargestChoiceP1: "Oltre 140.000 hotel in tutto il mondo",
        whyBookLargestChoiceP2: "Oltre 130 compagnie aeree",
        whyBookLargestChoiceP3: "Oltre 3 milioni di recensioni dei clienti",
        whyBookCustomerSupportTitle: "Sempre in ascolto",
        whyBookCustomerSupportP1: "Chiamaci o inviaci un'email in qualsiasi momento.",
        whyBookCustomerSupportP2: "Oltre 130 compagnie aeree",
        whyBookCustomerSupportP3: "Servizio clienti disponibile 24 ore su 24, prima, durante e dopo il tuo viaggio.",

        // Sidebar - Hotel Popolari
        popularHotelsTitle: "Hotel popolari nella zona",
        popularHotel1Name: "Gili Lankanfushi Maldives",
        popularHotel1Price: "a partire da 1250€/notte",
        popularHotel1Rating: " 9.8/10",
        popularHotel2Name: "Soneva Fushi Resort",
        popularHotel2Price: "a partire da 1150€/notte",
        popularHotel2Rating: " 9.6/10",
        popularHotel3Name: "Velaa Private Island",
        popularHotel3Price: "a partire da 2100€/notte",
        popularHotel3Rating: " 10/10",
        popularHotel4Name: "Baros Maldives",
        popularHotel4Price: "a partire da 750€/notte",
        popularHotel4Rating: " 9.4/10",

        // Sidebar - Offre del Giorno
        dealOfTheDayTitle: "Offerta del giorno!",
        altDealOfTheDay: "Baros Maldives - Offerta del giorno",
        dealOfTheDayName: "Baros Maldives",
        dealOfTheDayPrice: "A partire da 750€",
        dealOfTheDayPriceSuffix: "/ per notte",
        dealOfTheDayRating: "9.4/10",

        // Accessibilité Modale
        modalClose: "Chiudi",
        lightboxAlt: "Immagine ingrandita della camera",
        previousImage: "Immagine precedente",
        nextImage: "Immagine successiva",
    },

    // Page Booking
    booking: {
        // Meta & Breadcrumb
        metaTitle: "Finalizza la mia prenotazione - Book Your Travel",
        metaDescription: "Finalizza la tua prenotazione alberghiera in sicurezza. Pagamento sicuro SSL, conferma immediata via email e miglior prezzo garantito.",
        metaKeywords: "prenotazione alberghiera, prenotazione, pagamento sicuro, conferma immediata",
        metaOGTitle: "Prenotazione Alberghiera - Book Your Travel",
        metaOGDescription: "Finalizza la tua prenotazione in sicurezza. Pagamento SSL e conferma immediata.",
        metaTwitterTitle: "Prenotazione Alberghiera - Book Your Travel",
        metaTwitterDescription: "Finalizza la tua prenotazione in sicurezza.",
        breadcrumbBooking: "Prenotazione",
        
        // Header
        title: "Finalizza la tua prenotazione",
        subtitle: "Completa le informazioni sottostanti per confermare il tuo soggiorno",
        
        // Section 1: Le tue informazioni
        section1Title: "Le tue informazioni",
        firstNameLabel: "Nome <span class='text-danger'>*</span>",
        lastNameLabel: "Cognome <span class='text-danger'>*</span>",
        emailLabel: "Email <span class='text-danger'>*</span>",
        phoneLabel: "Telefono <span class='text-danger'>*</span>",
        addressLabel: "Indirizzo",
        cityLabel: "Città",
        postalCodeLabel: "Codice postale",
        countryLabel: "Paese",
        countryFR: "Francia",
        countryBE: "Belgio",
        countryCH: "Svizzera",
        countryCA: "Canada",
        countryUS: "Stati Uniti",
        guestsTitle: "<i class='bi bi-people-fill'></i> Numero di viaggiatori <span class='text-danger'>*</span>",
        adultsLabel: "Adulti (18 anni e +)",
        childrenLabel: "Bambini (0-17 anni)",
        guestsTotal: "<i class='bi bi-info-circle'></i> <strong>Totale:</strong> <span id='totalGuests'>2</span> persona(e) - Massimo 3 persone per camera",
        guestsError: "<i class='bi bi-exclamation-triangle'></i> Il numero massimo de personnes est 3",

        // Section 2: Servizi aggiuntivi
        section2Title: "Servizi aggiuntivi",
        serviceParkingTitle: "Parcheggio privato",
        serviceParkingDesc: "Posto auto custodito",
        serviceParkingPrice: "15€/notte",
        serviceBreakfastTitle: "Colazione",
        serviceBreakfastDesc: "Buffet continentale a persona",
        serviceBreakfastPrice: "25€/pers/giorno",
        serviceSpaTitle: "Accesso spa",
        serviceSpaDesc: "Piscina, sauna e jacuzzi",
        serviceSpaPrice: "80€/soggiorno",
        serviceTransferTitle: "Trasferimento aeroporto",
        serviceTransferDesc: "Solo andata da/per l'aeroporto",
        serviceTransferPrice: "50€/tratta",
        serviceLateCheckoutTitle: "Check-out tardivo",
        serviceLateCheckoutDesc: "Partenza fino alle 16:00 invece delle 11:00",
        serviceLateCheckoutPrice: "30€",

        // Section 3: Richieste speciali
        section3Title: "Richieste speciali",
        specialRequestsLabel: "Hai richieste particolari?",
        specialRequestsPlaceholder: "Es: Camera piano alto, culla, allergie alimentari...",
        specialRequestsHint: "Queste richieste sono soggette a disponibilità",
        arrivalTimeLabel: "Orario di arrivo stimato",
        arrivalTimePlaceholder: "Seleziona una fascia oraria",
        arrivalTime1: "14:00 - 16:00",
        arrivalTime2: "16:00 - 18:00",
        arrivalTime3: "18:00 - 20:00",
        arrivalTime4: "20:00 - 22:00",
        arrivalTime5: "Dopo le 22:00",

        // Section 4: Pagamento
        section4Title: "Informazioni di pagamento",
        paymentInfo: "Pagamento sicuro. Le tue informazioni sono crittografate e protette.",
        cardNameLabel: "Nome sulla carta <span class='text-danger'>*</span>",
        cardNumberLabel: "Numero della carta <span class='text-danger'>*</span>",
        cardExpiryLabel: "Data di scadenza <span class='text-danger'>*</span>",
        cardCVVLabel: "CVV <span class='text-danger'>*</span>",

        // Section 5: Condizioni
        section5Title: "Condizioni di prenotazione",
        cancellationPolicyTitle: "Politica di cancellazione",
        cancellationPolicyText: "Cancellazione gratuita fino a 48 ore prima dell'arrivo. Oltre, la prima notte verrà addebitata.",
        generalConditionsTitle: "Condizioni generali",
        conditionCheckIn: "Check-in: dalle 15:00",
        conditionCheckOut: "Check-out: entro le 11:00",
        conditionID: "All'arrivo sono richiesti un documento d'identità e una carta bancaria",
        acceptTermsLabel: "Accetto i <a href='#' target='_blank' data-i18n='booking.termsLink'>termini e condizioni generali</a> e la <a href='#' target='_blank' data-i18n='booking.privacyLink'>politica sulla privacy</a> <span class='text-danger'>*</span>",
        termsLink: "termini e condizioni generali",
        privacyLink: "politica sulla privacy",
        newsletterCheck: "Desidero ricevere offerte speciali e novità via email",
        submitButton: "Conferma e paga",
        
        // Colonna Riepilogo (Summary)
        summaryTitle: "Riepilogo",
        summaryHotelLabel: "<i class='bi bi-building'></i> Hotel",
        summaryRoomAlt: "Camera",
        summaryAdults: "<i class='bi bi-people'></i> 2 adulti",
        summaryCheckInLabel: "Arrivo",
        summaryCheckInTime: "15:00",
        summaryNights: "-- notti",
        summaryCheckOutLabel: "Partenza",
        summaryCheckOutTime: "11:00",
        pricingDetailsTitle: "Dettagli prezzo",
        priceLineRoom: "Camera (<span id='priceNights'>--</span> notti)",
        priceLineTotal: "Totale",
        priceLineTax: "<i class='bi bi-info-circle'></i> Tassa di soggiorno inclusa",
        benefitFreeCancellation: "Cancellazione gratuita",
        benefitImmediateConfirmation: "Conferma immediata",
        benefitSecurePayment: "Pagamento sicuro",
        summaryHelpTitle: "Hai bisogno di aiuto?",
        summaryHelpPhone: "<i class='bi bi-telephone'></i> 1-555-555-5555",
    },

    // Page Contact (NOUVEAU)
    contact: {
        // Meta
        metaTitle: "Contattaci - Book Your Travel",
        metaDescription: "Contatta Book Your Travel - Assistenza clienti 24/7 al 1-555-555-5555 o via email. Il nostro team risponde a tutte le tue domande sulle prenotazioni alberghiere.",
        metaKeywords: "contatto hotel, servizio clienti, supporto 24/7, aiuto prenotazione",
        metaOGTitle: "Contatto - Book Your Travel",
        metaOGDescription: "Contatta il nostro team 24/7 per qualsiasi domanda sulle tue prenotazioni.",
        metaTwitterTitle: "Contatto - Book Your Travel",
        metaTwitterDescription: "Assistenza clienti 24/7 - Rispondiamo a tutte le tue domande.",

        // Header
        title: "Contattaci",
        subtitle: "Siamo qui per aiutarti. Non esitare a contattarci!",
        
        // Colonna Info
        mapAriaLabel: "Posizione del nostro ufficio principale su una mappa Google Maps",
        phoneTitle: "Telefono",
        phoneSubtitle: "Assistenza 24/7",
        phoneNumber: "1-555-555-5555",
        emailTitle: "Email",
        emailSubtitle: "Risposta entro 24 ore",

        // Formulario
        formTitle: "Inviaci un messaggio",
        nameLabel: "Il tuo nome <span class='text-danger'>*</span>",
        emailLabel: "La tua email <span class='text-danger'>*</span>",
        phoneLabel: "Telefono",
        subjectLabel: "Oggetto <span class='text-danger'>*</span>",
        subjectPlaceholder: "Seleziona un oggetto",
        subjectReservation: "Prenotazione",
        subjectInformation: "Richiesta di informazioni",
        subjectComplaint: "Reclamo",
        subjectOther: "Altro",
        messageLabel: "Il tuo messaggio <span class='text-danger'>*</span>",
        submitButton: "Invia messaggio",
        successMessage: "<i class='bi bi-check-circle-fill me-2'></i> Il tuo messaggio è stato inviato con successo! Ti risponderemo al più presto.",
    },

    // Page d'accueil - Critères de sélection
    criteria: {
      hotels: "Hotel Selezionati",
      hotelsDesc: "Tutti gli hotel Book Your Travel soddisfano rigorosi criteri di selezione.<br>Ogni hotel è scelto individualmente e l'inclusione non peut être achetée.",
      detailedDescriptions: "Descrizioni Dettagliate", 
      detailedDescriptionsDesc: "Al fine di darti un'impressione accurata dell'hotel, ci sforziamo di pubblicare descrizioni trasparentes, équilibrées et précises des hôtels.", 
      knowledge: "Conoscenza Esclusiva",
      knowledgeDesc: "Abbiamo fatto le nostre ricerche.<br>I nostri scout sono sempre impegnés à en apprendre davantage sur nos hôtels, les environs et les activités proposées à proximité.",
      service: "Servizio Appassionato",
      serviceDesc: "Il team di Book Your Travel risponderà alle tue richieste spéciales.<br>Offriamo consigli esperti e appassionati per trovare l'hotel giusto.",
      bestPrice: "Miglior Prezzo Garantito",
      bestPriceDesc: "Offriamo i migliori hotel ai migliori prezzi.<br>Se trovi la stessa categoria di camera nelle mêmes dates moins chère ailleurs, ti rimborseremo la différence.<br>Garantito e veloce.",
      secureBooking: "Prenotazione Sicura",
      secureBookingDesc: "Il sistema di prenotazione di Book Your Travel est sécurisé et votre carte de crédit et vos informations personnelles sont cryptées.<br>Lavoriamo secondo standard elevati e garantiamo la tua privacy.",
      hotelBenefits: "Vantaggi per gli Albergatori",
      hotelBenefitsDesc: "Forniamo un modello redditizio, una rete di più de 5000 partenaires et un servizio di gestione account personalizzato per aiutarti a ottimizzare le tue entrate.",
      questions: "Domande?",
      questionsDesc: "Chiamaci al 1-555-555-555 per una consulenza personalizzata e su misura per il tuo soggiorno perfetto o inviaci un messaggio con la tua richiesta di prenotazione alberghiera."
    },
    
    // Footer
    footer: {
      company: "Book Your Travel",
      address: "1400 Pennsylvania Ave. Washington, DC",
      phone: "P: supporto clienti 24/7: 1-555-555-5555",
      email: "contact@bookyourtravel.com",
      customerSupport: "Supporto Clienti",
      faq: "FAQ",
      howToBook: "Come posso effettuare una prenotazione?",
      paymentOptions: "Opzioni di pagamento",
      bookingTips: "Consigli per la prenotazione",
      followUs: "Seguici",
      newsletter: "Newsletter",
      newsletterText: "Iscriviti per ricevere le nostre offerte esclusive!",
      emailPlaceholder: "La tua email",
      subscribeButton: "OK", 
      copyright: "Copyright 2025 Prenotazione Hotel Formazione Ilaria",
      aboutUs: "Chi siamo",
      partners: "Partner",
      customerService: "Servizio clienti",
      careers: "Carriere",
      terms: "Termini e Condizioni"
    }
  }
};