export const destinations = [
    {
        id: 1,
        slug: "abuja-city",
        name: "Abuja",
        title: "ABUJA",
        location: "Abuja, Nigeria",
        rating: 5, // <--- Added
        shortDescription: "The capital city known for its stunning architecture and the monolithic Zuma Rock, the 'Gateway to Abuja' that rises majestically 725 meters above the surrounding countryside.",

        fullDescription: "Abuja is the capital city of Nigeria, located in the centre of the country. The skyline is dominated by the majestic Aso Rock and the monolithic Zuma Rock, the 'Gateway to Abuja' that rises 725 meters above the surroundings. It features stunning modern architecture like the National Mosque and the National Christian Centre.",
        image: "/images/abj.jpg",
        gallery: ["/images/abj.jpg", "/images/abj.jpg"],
        highlights: ["Zuma Rock", "Aso Rock", "National Mosque", "Arts & Crafts Village"],
        coordinates: "9.0765° N, 7.3986° E"
    },
    {
        id: 2,
        slug: "yankari-game-reserve",
        name: "Yankari",
        title: "YANKARI",
        location: "Bauchi, Nigeria",
        rating: 5, // <--- Added
        shortDescription: "A premier wildlife retreat featuring the Wikki Warm Springs and roaming elephants. It is Nigeria's richest wildlife oasis and a haven for eco-tourism in the West African savanna.",
        fullDescription: "Yankari Game Reserve is Nigeria's richest wildlife oasis. Located in the south-central part of Bauchi State, it is home to the largest remaining elephant population in Nigeria. The reserve also features the crystal clear Wikki Warm Springs, which stays at a constant 31°C all year round.",
        image: "/images/yankari.jpg",
        gallery: ["/images/yankari.jpg", "/images/yankari.jpg"],
        highlights: ["Wikki Warm Springs", "Safari Tours", "Elephant Sightings", "Marshall Caves"],
        coordinates: "9.7500° N, 10.5000° E"
    },
    {
        id: 3,
        slug: "kajuru-castle",
        name: "Kajuru",
        title: "KAJURU",
        location: "Kaduna, Nigeria",
        rating: 4, // <--- Added
        shortDescription: "A stunning medieval-style castle perched on a hill in Kaduna. This architectural masterpiece offers a fairytale escape with breathtaking views of the surrounding savannah.",

        fullDescription: "Perched atop the rocky hills of Kaduna, Kajuru Castle is a stunning piece of architecture that feels pulled straight from a European fairytale. Built by a German expatriate in the 1980s, it features armories, dungeons, and a rooftop pool with breathtaking views of the surrounding savannah.",
        image: "/images/kajuru.jpg",
        gallery: ["/images/kajuru.jpg", "/images/kajuru.jpg"],
        highlights: ["Medieval Architecture", "Rooftop Pool", "Sauna", "Private Hiking Trails"],
        coordinates: "10.3160° N, 7.6750° E"
    },
    {
        id: 4,
        slug: "mambilla-plateau",
        name: "Mambilla",
        title: "MAMBILLA",
        location: "Taraba, Nigeria",
        rating: 5, // <--- Added
        shortDescription: "The gem of Taraba, known for its cool climate, lush green rolling hills, and vast tea plantations. It offers some of the most scenic highland views in West Africa.",
        fullDescription: "Home to Chappal Waddi, the highest point in Nigeria, Mambilla Plateau offers a climate unlike anywhere else in West Africa. With rolling green hills, infinite tea plantations, and a temperate climate, it is often called the 'Europe of Nigeria'. Perfect for hiking, camping, and disconnecting from the world.",
        image: "/images/mambilla.jpg",
        gallery: ["/images/mambilla.jpg", "/images/mambilla.jpg"],
        highlights: ["Highest Peak in Nigeria", "Highland Tea Farms", "Cool Temperate Weather", "Waterfalls"],
        coordinates: "6.9160° N, 11.1750° E"
    }
];
export const er = [
    {
        id: 1,
        date: "March 20, 2026 (Eid-al-Fitr)",
        location: "Kano Palace Grounds",
        category: "CULTURE",
    },
    {
        id: 2,
        date: "Feb 25 - Mar 1, 2026",
        location: "Matan Fada River, Kebbi",
        category: "HERITAGE",
    },
    {
        id: 3,
        date: "Every Sunday @ 4:00 PM",
        location: "Gombe Stadium / Kano Pillars",
        category: "SPORT",
    },
    {
        id: 4,
        date: "Sept 16 - 19, 2026",
        location: "Kaduna City Hall",
        category: "ART",
    },
];


export const events = [
    {
        id: 1,
        slug: "kano-durbar",
        name: "Kano Durbar Festival",
        title: "Grand Durbar Festival",
        date: "Eid al-Fitr / Eid al-Adha",
        location: "Kano Emir's Palace",
        category: "Cultural",
        shortDescription: "A 500-year-old tradition involving thousands of horsemen in colorful regalia.",
        fullDescription: "The Kano Durbar is a magnificent equestrian parade that dates back over 500 years. Held during the two Muslim festivals (Eid al-Fitr and Eid al-Adha), it sees the Emir of Kano riding in a procession accompanied by thousands of horsemen dressed in vibrant, traditional regalia. It is a display of loyalty, war readiness, and cultural pride, attracting tourists from all over the globe.",
        image: "/images/hawa-3.jpg", // <--- Added thumbnail (Make sure this file exists)
        video: "https://www.youtube.com/watch?v=FepSLXg1Eiw", // YouTube (for Modal)
        gallery: [
            "/images/hawa-1.webp",
            "/images/hawa-2.webp",
            "/images/hawa-3.jpg",
            "/images/hawa-3.webp",
        ],
        highlights: ["Royal Procession", "Traditional Gun Salutes", "Horse Riding Skills", "Cultural Music & Dance"]
    },
    {
        id: 2,
        slug: "argungu-fishing",
        name: "Argungu Fishing Festival",
        title: "Argungu Fishing Fest",
        date: "February / March",
        location: "Kebbi State",
        category: "Competition",
        shortDescription: "Thousands of fishermen jump into the river to catch the biggest fish.",
        fullDescription: "The Argungu Fishing Festival is an annual four-day festival in the state of Kebbi, in the north-western part of Nigeria. The region is made up of fertile river areas. The main event is the fishing competition where thousands of fishermen line up and jump into the river at the sound of a gun, attempting to catch the largest fish using only traditional nets.",
        image: "/images/argungu-4.webp", // <--- Added thumbnail
        video: "https://www.youtube.com/watch?v=oKsRcD0fJCU",
        gallery: [
            "/images/argungu-2.webp",
            "/images/argungu-3.webp",
              "/images/argungu-4.webp",
            "/images/argungu-5.webp",
              "/images/argungu-6.jpg",
            "/images/argungu-7.jpg",
        ],
        highlights: ["Grand Fishing Competition", "Wild Duck Catching", "Local Wrestling", "Cultural Night"],
    },
    {
        id: 3,
        slug: "dambe-warriors",
        name: "Dambe Warriors League",
        title: "Dambe Warriors League",
        date: "October / November",
        location: "Murtala Square, Kaduna",
        category: "Sports",
        shortDescription: "Witness the raw power of the ancient Hausa martial art of boxing.",
        fullDescription: "The Dambe Warriors League has modernized the traditional art of Dambe boxing. Fighters wrap their 'spear' hand in cord and face off in three intense rounds. It is a test of bravery, skill, and endurance that has moved from village squares to global arenas, featuring weight classes and professional rankings.",
        image: "/images/dambe-3.jpg", // <--- Added thumbnail
        video: "https://www.youtube.com/watch?v=DPaTu8C3Xi8",
        loopVideo: "https://www.youtube.com/watch?v=DPaTu8C3Xi8",
        gallery: [
            "/images/dambe-1.webp",
            "/images/dambe-1.jpg",
            "/images/dambe-2.jpg",
            "/images/dambe-3.jpg",
            "/images/dambe-4.jpg",
        ],
        highlights: ["Lightweight & Heavyweight Bouts", "Traditional Drumming", "Knockout Highlights", "SuperFight Championships"],
    },
    {
        id: 4,
        slug: "kabafest",
        name: "KABAFEST",
        title: "Kaduna Arts (KABAFEST)",
        date: "Sept 16 - 19, 2026",
        location: "Kaduna City Hall",
        category: "Art & Literature",
        shortDescription: "The premier literary and arts festival in Northern Nigeria.",
        fullDescription: "KABAFEST (Kaduna Book and Arts Festival) is the first annual literary and arts event of its kind in Northern Nigeria. It brings together the finest writers, poets, artists, and thinkers to celebrate the region's rich heritage. The festival features stimulating booklogues, art exhibitions, film screenings, and poetry nights that challenge stereotypes and celebrate creativity.",
        image: "/images/kabafest-2.jpg", // <--- Added thumbnail
        video: "https://www.youtube.com/watch?v=_R9pZ8oWRv0",
        gallery: [
            "/images/kabafest-1.jpg",
            "/images/kabafest-2.jpg",
            "/images/kabafest-3.jpg"        ],
        highlights: ["Booklogues", "Art Exhibitions", "Poetry Nights", "Film Screenings"],
    }
];