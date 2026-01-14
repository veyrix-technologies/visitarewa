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

The platform is structured around four cultural pillars:

### 🗺️ Destinations
Landmarks and natural wonders across Northern Nigeria, presented with historical context, visuals, and visitor insight.

Examples:
- **Abuja** — Capital city, Zuma Rock, Aso Rock  
- **Yankari Game Reserve** — Wildlife & Wikki Warm Springs  
- **Kajuru Castle** — Medieval hilltop architecture  
- **Mambilla Plateau** — Highlands, tea farms & waterfalls  

Each destination includes:
- Short & full descriptions
- Image galleries
- Highlights
- Coordinates
- Visitor ratings

---

### 🎉 Events & Festivals
Cultural, artistic, sporting, and heritage events that shape Northern Nigeria’s calendar.

Examples:
- **Kano Durbar Festival**
- **Argungu Fishing Festival**
- **Dambe Warriors League**
- **KABAFEST (Kaduna Book & Arts Festival)**

Each event includes:
- Date & location
- Category
- Galleries & videos
- Cultural highlights

---

### 👑 People of Arewa
Profiles of influential Northern Nigerians shaping business, arts, culture, entertainment, and technology.

Categories include:
- Business & Industry
- Entertainment & Film
- Music
- Arts & Literature
- Technology & Innovation

Each profile includes:
- Biography (short & long)
- Origin & category
- Achievements
- Quotes
- Social links

---

### 🍲 Cuisine & Dishes
Food as memory, ritual, and identity.

Examples:
- **Suya & Kilishi**
- **Tuwo Shinkafa & Miyan Taushe**
- **Fura da Nono**
- **Masa (Waina)**

Each dish includes:
- Cultural description & quote
- Ingredients
- Calories & food stats
- Embedded preparation videos

---

## 🗺️ State Coverage & Progress

Visit Arewa is actively expanding across Northern Nigeria.

**Currently featured:**
- Abuja (FCT)
- Kaduna
- Bauchi
- Taraba

More states are added continuously as content is curated and verified.  
State coverage expands through community contributions from people who know these places best. **Contribute your knowledge, photos, and stories to help document every corner of Northern Nigeria.**

> Goal: Cover every Northern Nigerian state through community contributions—destinations, events, people, and cuisine.


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

Visit Arewa is **community-driven**.

We welcome:
- Developers
- Designers
- Writers & historians
- Photographers & videographers
- Cultural researchers

---

## 📋 Data Contribution Guidelines

All cultural data lives in the `/lib` directory.

### Content Principles
- Be **respectful**, **accurate**, and **culturally grounded**
- Avoid stereotypes or shallow descriptions
- Storytelling is encouraged—this is not Wikipedia

### Images & Media
- Use high-quality, properly credited images
- Avoid watermarked or copyrighted material
- Prefer original or permission-granted content

### Writing Style
- Clear, descriptive, and human
- Avoid marketing fluff
- Focus on cultural significance, not hype

### Data Files
- `destinations.ts` → Places & landmarks  
- `events.ts` → Festivals, sports & arts  
- `people.ts` → Influential figures  
- `dishes.ts` → Cuisine & food culture  

Example:
```ts
{
  slug: "yankari-game-reserve",
  name: "Yankari",
  location: "Bauchi, Nigeria",
  rating: 5,
}
```

---

## 🔁 Contribution Flow

1. Fork the repository  
2. Create a feature branch  
   ```bash
   git checkout -b feature/add-new-content
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

## 🙏 Credits & Acknowledgements

Visit Arewa is built on collective memory and shared knowledge.

Thanks to:
- Local historians & cultural custodians
- Photographers & filmmakers across the North
- Writers, artists, and storytellers
- Open-source contributors

If your content is featured and needs attribution updates, please reach out.

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
