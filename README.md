# Visit Arewa 🇳🇬✨

![Project Status](https://img.shields.io/badge/Status-Live-green)
![Tech Stack](https://img.shields.io/badge/Built%20With-Next.js%20%7C%20Tailwind%20%7C%20Framer%20Motion-black)
![License](https://img.shields.io/badge/License-MIT-blue)

**Visit Arewa** is an open-source digital initiative dedicated to documenting, preserving, and showcasing the rich culture, heritage, and tourism potential of Northern Nigeria.

From the ancient walls of Kano to the lush plateaus of Taraba, Visit Arewa aims to become the definitive digital guide to Arewa culture, cuisine, destinations, and events.

🚀 **Live Demo:** https://visitarewa.com

---

## 🎯 Mission

Northern Nigeria is deeply rich in culture and history, yet the internet lacks a centralized, high-quality platform that represents its tourism and lifestyle accurately.

**Visit Arewa exists to change that.**

Maintained by **Veyrix Technologies**, this project is community-driven and open to everyone who wants to help preserve our stories—one commit at a time.

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

We welcome developers, designers, writers, photographers, and cultural curators.

### Add an Event or Festival 📅
Edit `lib/data.ts` and add a new object to the `events` array:

```ts
{
  id: 4,
  slug: "hawan-sallah",
  name: "Hawan Sallah",
  date: "Eid al-Fitr",
  location: "Katsina",
}
```

### Add a Local Dish 🍲
Update the food section in `lib/data.ts` with accurate descriptions and high-quality images.

### Fix Bugs or Improve UI 🐛
UX improvements, performance tweaks, and bug fixes are welcome.

### Contribution Flow
1. Fork the repository  
2. Create a branch  
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit your changes  
4. Open a Pull Request  

---

## 📂 Project Structure

```
/app         → Next.js App Router pages
/components  → Reusable UI components
/lib         → Static data (events, food, destinations)
/public      → Images and assets
```

---

## 📜 License

This project is licensed under the **MIT License**.  
See the `LICENSE` file for details.

---

## 📬 Contact

**Maintained by:** Veyrix Technologies  

📧 Email: devs@veyrixtech.com  
💻 GitHub: https://github.com/Veyrix-Technologies
