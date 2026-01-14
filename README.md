# Visit Arewa 🇳🇬✨

![Project Status](https://img.shields.io/badge/Status-Live-green)
![Tech Stack](https://img.shields.io/badge/Built%20With-Next.js%20%7C%20Tailwind%20%7C%20Framer%20Motion-black)
![License](https://img.shields.io/badge/License-MIT-blue)

**Visit Arewa** is a digital storytelling and tourism platform documenting the places, people, food, and cultural events of Northern Nigeria.

This is not just a directory.  
It is a living archive—where history, culture, and modern Northern identity are preserved through design, code, and narrative.

🚀 **Live Platform:** https://visitarewa.com

---

## 🌍 What Visit Arewa Covers

The platform is structured around four core cultural pillars:

### 🗺️ Destinations
Iconic locations across Northern Nigeria, enriched with galleries, highlights, coordinates, and historical context.

Examples:
- **Abuja** — Capital city, Aso Rock, Zuma Rock  
- **Yankari Game Reserve** — Wildlife, Wikki Warm Springs  
- **Kajuru Castle** — Medieval hilltop architecture  
- **Mambilla Plateau** — Nigeria’s highest peaks & tea fields  

Each destination includes:
- Short & full descriptions
- Image galleries
- Key highlights
- Geographic coordinates
- Visitor appeal ratings

---

### 🎉 Events & Festivals
Cultural, artistic, sporting, and heritage events that define the Northern calendar.

Featured events include:
- **Kano Durbar Festival** — 500-year-old royal horse procession  
- **Argungu Fishing Festival** — Mass river fishing competition  
- **Dambe Warriors League** — Ancient Hausa boxing, modernized  
- **KABAFEST** — Kaduna Book & Arts Festival  

Event entries include:
- Categories (Culture, Sport, Art, Heritage)
- Dates & locations
- Highlight moments
- Image galleries
- Embedded video content

---

### 👑 People of Arewa
Profiles of influential Northern Nigerians shaping business, culture, arts, technology, and entertainment.

Featured profiles:
- **Aliko Dangote** — Titan of African industry  
- **Ali Nuhu** — King of Kannywood  
- **Rahama Sadau** — Global film icon  
- **Maryam Bukar (Alhanislam)** — Poet & storyteller  
- **Sabiqah Bello** — Youth leader & facilitator  
- **Usman Click** — Architect of Visit Arewa  

Each profile includes:
- Origin & category
- Short & full biographies
- Achievements
- Quotes
- Social & web links

---

### 🍲 Cuisine & Dishes
Northern Nigerian food as culture, memory, and identity.

Featured dishes:
- **Suya & Kilishi** — Street food ritual  
- **Tuwo Shinkafa & Miyan Taushe** — Home comfort  
- **Fura da Nono** — Fermented refreshment  
- **Masa (Waina)** — Morning staple  

Dish entries include:
- Cultural descriptions & quotes
- Ingredients
- Calories & food stats
- Embedded preparation videos

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React

---

## 🚀 Getting Started

### Clone the repository
```bash
git clone https://github.com/Veyrix-Technologies/visitarewa.git
cd visitarewa
```

### Install dependencies
```bash
npm install
# or
yarn install
```

### Run the development server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

---

## 🤝 Contributing

Visit Arewa is **community-driven**. Developers, designers, writers, historians, photographers, and cultural curators are welcome.

### Contribute Content
All major content lives in `lib/`:

- `destinations` → Places & landmarks  
- `events` → Festivals, sports, arts  
- `people` → Influential Northern figures  
- `dishes` → Food & culinary heritage  

Example:
```ts
{
  slug: "mambilla-plateau",
  name: "Mambilla",
  location: "Taraba, Nigeria",
  rating: 5,
}
```

### Contribution Flow
1. Fork the repository  
2. Create a feature branch  
   ```bash
   git checkout -b feature/add-new-destination
   ```
3. Commit your changes  
4. Open a Pull Request  

---

## 📂 Project Structure

```
/app         → Next.js App Router pages
/components  → Reusable UI components
/lib         → Cultural data (destinations, events, people, dishes)
/public      → Images & media assets
```

---

## 📜 License

This project is licensed under the **MIT License**.  
See the `LICENSE` file for details.

---

## 📬 Contact

**Maintained by:** Veyrix Technologies  

🌐 Website: https://veyrixtech.com  
📧 Email: devs@veyrixtech.com  
💻 GitHub: https://github.com/Veyrix-Technologies

---

> “We are not just writing code; we are archiving our culture and building our future.”
