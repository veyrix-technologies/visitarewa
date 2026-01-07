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
        gallery: ["/images/abj-2.jpg", "/images/abj.jpg", "/images/abj-3.jpg", "/images/abj-4.jpg", "/images/abj-5.jpg"],
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
        gallery: ["/images/yankari-2.jpg", "/images/yankari.jpg", "/images/yankari-3.jpg", "/images/yankari-4.jpg", "/images/yankari-5.jpg", "/images/yankari-6.jpg", "/images/yankari-7.jpg"],
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
        gallery: ["/images/kajuru-2.jpg", "/images/kajuru.jpg", "/images/kajuru-3.png", "/images/kajuru-4.jpg", "/images/kajuru-5.jpg", "/images/kajuru-6.jpg"],
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
            "/images/kabafest-3.jpg"],
        highlights: ["Booklogues", "Art Exhibitions", "Poetry Nights", "Film Screenings"],
    }
];

export const people = [
    {
        id: 1,
        slug: "aliko-dangote",
        name: "Aliko Dangote",
        title: "ALIKO DANGOTE",
        role: "TITAN OF INDUSTRY",
        origin: "Kano, Nigeria",
        category: "BUSINESS",
        shortDescription: "The wealthiest Black person in the world and a proud son of Kano. He transformed a small trading firm into a pan-African conglomerate.",
        fullDescription: "Aliko Dangote is not just a businessman; he is a visionary who transformed Nigeria's entrepreneurial landscape. Rising from a modest trading family in Kano, he built Dangote Group into Africa's largest industrial conglomerate. His success proves that with determination, innovation, and a commitment to excellence, an Arewa entrepreneur can build an empire that rivals global corporations.",
        image: "/images/dangote.jpg",
        gallery: ["/images/dangote.jpg",],
        achievements: [
            "Africa's Largest Industrial Conglomerate",
            "Wealthiest Black Person Globally",
            "Sugar & Cement Industry Leader",
            "Pan-African Business Icon"
        ],
        quote: "I came into business to change lives and create opportunities for millions of Africans.",
        highlights: ["Business Innovation", "Pan-African Growth", "Industrial Excellence", "Economic Impact"],
        socials: {
            twitter: "https://twitter.com/AlikoDangote",
            instagram: "https://www.instagram.com/aliko_dangotegcon", // Official Group/Personal
            website: "https://www.dangote.com"
        }
    },
    {
        id: 2,
        slug: "ali-nuhu",
        name: "Ali Nuhu",
        title: "ALI NUHU",
        role: "THE KING OF KANNYWOOD",
        origin: "Kano, Nigeria",
        category: "ENTERTAINMENT",
        shortDescription: "Known as 'Sarki,' the most decorated actor in Northern Nigeria with over 500 films. He bridged Kannywood and Nollywood.",
        fullDescription: "Ali Nuhu is not just an actor; he is the ambassador of Kannywood to the world. Known affectionately as 'Sarki' (The King), he has starred in over 500 films. His work has been instrumental in bringing Hausa storytelling and Northern Nigerian culture to both continental and global audiences. From Kannywood's humble beginnings to collaborations with Nollywood's finest, Ali Nuhu has shown that quality cinema knows no regional boundaries.",
        image: "/images/ali.jpg",
        gallery: ["/images/ali.jpg",],
        achievements: [
            "500+ Films Starring Role",
            "Multiple National & International Awards",
            "Kannywood-Nollywood Bridge Builder",
            "Cultural Ambassador"
        ],
        quote: "I tell stories that matter, that connect us to our heritage and show the world who we are.",
        highlights: ["Film Excellence", "Cultural Storytelling", "Acting Versatility", "Industry Influence"],
        socials: {
            instagram: "https://www.instagram.com/realalinuhu",
            twitter: "https://twitter.com/alinuhu",
            facebook: "https://www.facebook.com/AliNuhuOfficial"
        }
    },
    {
        id: 3,
        slug: "dj-abba",
        name: "DJ Abba",
        title: "DJ ABBA",
        role: "AREWA POP PIONEER",
        origin: "Kaduna, Nigeria",
        category: "MUSIC",
        shortDescription: "Multi-talented rapper, producer, and performer. The face of the modern Northern sound blending Hausa lyricism with high-energy beats.",
        fullDescription: "DJ Abba represents the new wave of Northern Nigerian music—a generation unafraid to innovate while respecting tradition. As a rapper, producer, and performer, he has crafted a unique sound that blends fierce Hausa lyricism with contemporary high-energy beats. His music resonates from the streets of Kaduna to the clubs of Lagos, proving that authentic Northern Nigerian artistry has a place on any stage.",
        image: "/images/ab.jpg",
        gallery: ["/images/ab.jpg", "/images/ab.jpg"],
        achievements: [
            "Northern Nigeria Music Pioneer",
            "Multiple Platinum Records",
            "Pan-African Collaborations",
            "Cultural Music Innovator"
        ],
        quote: "My music is my people's voice. Every beat is a story from the North.",
        highlights: ["Music Production", "Hausa Lyricism", "Cultural Innovation", "Pan-African Influence"],
        socials: {
            instagram: "https://www.instagram.com/dj_abba",
            twitter: "https://twitter.com/dj_abba",
            website: "https://www.youtube.com/channel/UC...DJABBA" // Mapping YouTube to website icon for now
        }
    },
    {
        id: 4,
        slug: "maryam-bukar",
        name: "Maryam Bukar",
        title: "MARYAM BUKAR",
        role: "POET & STORYTELLER",
        origin: "Kano, Nigeria",
        category: "ARTS & LITERATURE",
        shortDescription: "World-renowned spoken word artist professionally known as 'Alhanislam.' Her powerful verses weave heritage, faith, and the African experience.",
        fullDescription: "Maryam Bukar, known professionally as 'Alhanislam,' is a poet who speaks truth to power through carefully crafted verses. On stages from Lagos to London, she has delivered the Northern narrative with emotional depth and intellectual rigor. Her poetry weaves together heritage, faith, contemporary struggles, and hope, creating a powerful tapestry that resonates with audiences worldwide.",
        image: "/images/maryam.jpeg",
        gallery: ["/images/maryam.jpeg",],
        achievements: [
            "International Spoken Word Recognition",
            "Multiple Poetry Awards",
            "Global Stage Performances",
            "Cultural Voice of Arewa"
        ],
        quote: "Poetry is where I find my power. Every word is a revolution.",
        highlights: ["Spoken Word Excellence", "Global Performances", "Cultural Commentary", "Poetic Innovation"],
        socials: {
            instagram: "https://www.instagram.com/alhanislam",
            twitter: "https://twitter.com/alhanislam",
            linkedin: "https://www.linkedin.com/in/maryam-bukar-hassan"
        }
    },
    {
        id: 5,
        slug: "rahama-sadau",
        name: "Rahama Sadau",
        title: "RAHAMA SADAU",
        role: "GLOBAL ICON",
        origin: "Katsina, Nigeria",
        category: "ENTERTAINMENT",
        shortDescription: "Actress, producer, and entrepreneur who has defied boundaries from Northern Nigeria to Bollywood and beyond.",
        fullDescription: "Rahama Sadau is a boundary-breaker in the truest sense. From her roots in Northern Nigeria to starring roles in Bollywood productions and international platforms, she has demonstrated the global appeal of Arewa talent. As an actress, producer, and entrepreneur, she has not only achieved success but has also created pathways for others.",
        image: "/images/rahama.jpg",
        gallery: ["/images/rahama.jpg",],
        achievements: [
            "Nollywood & Bollywood Success",
            "International Film Recognition",
            "Producer & Entrepreneur",
            "Global Brand Ambassador"
        ],
        quote: "I am proof that where you come from doesn't define where you can go.",
        highlights: ["International Acting", "Film Production", "Entrepreneurship", "Global Influence"],
        socials: {
            instagram: "https://www.instagram.com/rahamasadau",
            twitter: "https://twitter.com/Rahma_sadau",
            facebook: "https://www.facebook.com/officialrahamasadau"
        }
    },
    {
        id: 6,
        slug: "sabiqah-bello",
        name: "Sabiqah Bello",
        title: "SABIQAH BELLO",
        role: "STORYTELLER & YOUTH LEADER",
        origin: "Gombe, Nigeria",
        category: "ARTS & LITERATURE",
        shortDescription: "A visionary storyteller and youth development facilitator empowering the next generation of leaders through workshops, media, and community engagement.",
        fullDescription: "Sabiqah Bello is a passionate storyteller and creative facilitator dedicated to empowering young people across Northern Nigeria. As the lead at Forerunners HQ, she designs and facilitates transformative workshops that combine design thinking, Islamic leadership, and creative development. Her work spans podcast production, journalism, and community-centered initiatives that highlight untold stories from Nigeria's crisis zones.",
        image: "/images/sabiqah.jpg",
        gallery: ["/images/sabiqah.jpg",],
        achievements: [
            "Founder of TeenLead Workshop",
            "Podcast Producer - Voices of the Vulnerable",
            "Youth Development Facilitator",
            "Community Storyteller & Journalist"
        ],
        quote: "When your intentions are sincere and you take that first step, Allah places barakah in it.",
        highlights: ["Youth Empowerment", "Storytelling", "Workshop Facilitation", "Community Leadership"],
        socials: {
            linkedin: "https://www.linkedin.com/in/sabiqah-bello-7a71891a7/",
            instagram: "https://www.instagram.com/sabiqahbello/"
        }
    },
    {
        id: 7,
        slug: "usman-haruna",
        name: "Usman Adamu",
        title: "USMAN ADAMU HARUNA",
        role: "SOFTWARE ENGINEER & DESIGNER",
        origin: "Gombe, Nigeria",
        category: "TECHNOLOGY",
        shortDescription: "The visionary architect behind Visit Arewa. A Full-Stack Developer and Product Designer building the digital future of the North.",
        fullDescription: "Usman Adamu Haruna (digitally known as Usman Click) is a multidisciplinary technologist bridging the gap between Arewa’s heritage and the digital age. As a Software Developer and Product Designer, he focuses on building scalable digital systems that blend culture, innovation, and human-centered design. He is the lead architect behind the Visit Arewa digital initiative, where technology is used as a tool for storytelling, preservation, and modern engagement.",
        image: "/images/usman.jpg",
        gallery: [
            "/images/usman.jpg",
            //  "/images/usman.jpg"
        ],
        achievements: [
            "Creator of Visit Arewa Platform",
            "Top-tier Software Engineer",
            "Top-tier Product Designer (UI/UX)",
            "Digital Innovation Lead"
        ],
        quote: "We are not just writing code; we are archiving our culture and building our future.",
        highlights: ["Full-Stack Engineering", "Mobile App Development", "UI/UX Design", "Tech Entrepreneurship"],
        socials: {
            linkedin: "https://www.linkedin.com/in/usman-click-70aa47247/",
            instagram: "https://www.instagram.com/usmaan_click/"
        }
    }
];