# StyleHub — Your AI Fashion Stylist 👗✨

> Built for **Aavishkar 2026 Open Hackathon** | 8-Hour Build | 22nd April 2026

---

## 🚀 What is StyleHub?

StyleHub is an AI-powered fashion styling web app that gives expert advice on:
- **Color combinations** and palette matching
- **Occasion-based outfit recommendations**
- **Seasonal trend guidance**
- **Accessory pairing tips**

All wrapped in a cinematic, animated UI with a full auth system.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎬 Splash Screen | Animated golden bubble-letter intro with particles |
| 🔐 Auth System | Login & Sign Up with localStorage persistence |
| 👗 Fashion Categories | Kids, Mens & Boys, Girls, Womens, Accessories |
| 🎨 Color Theory | 6 curated color pairing rules with live swatches |
| 🔥 Seasonal Trends | Quiet Luxury, Dopamine Dressing, Eco Chic, Gorpcore |
| 🧠 AI Style Advisor | 18 rotating fashion tips widget |
| ❤️ Wishlist | Add/remove items with persistent state |
| 🔍 Search | Live search bar with clear functionality |
| 📱 Responsive | Mobile-first, works on all screen sizes |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Custom animations, gradients, glassmorphism, responsive grid
- **Vanilla JavaScript** — No frameworks, pure JS
- **localStorage** — Auth persistence across sessions
- **Google Fonts** — Outfit + Inter typography

---

## 📁 Project Structure

```
StyleHub/
├── index.html      # Main app — all sections, splash, auth
├── style.css       # All styles, animations, responsive rules
├── app.js          # All logic — auth, advisor, wishlist, scroll
└── README.md       # This file
```

---

## ⚡ Setup & Run

No installation needed. Just open in a browser:

```bash
# Option 1 — Direct
Double-click index.html

# Option 2 — VS Code Live Server
Right-click index.html → Open with Live Server

# Option 3 — Any local server
cd StyleHub
npx serve .
```

---

## 🔐 Auth Flow

1. First visit → Splash (5s) → Login / Sign Up screen
2. Sign up stores credentials in `localStorage`
3. Returning visit → Splash (5s) → Homepage directly (no auth prompt)
4. Logout button clears session

---

## 🎨 Design Highlights

- **Splash** — Dark `#0a0a0b` background, golden radial-gradient text, floating particles canvas, ambient glow orbs
- **Hero** — Full-viewport background image bleeding behind transparent header, same golden glow typography as splash
- **Cards** — Ken Burns zoom animation, palette mood swatches, occasion tags
- **Style Advisor** — Floating widget with 18 AI fashion tips

---

## 👨‍💻 Built With

- Amazon Q (AI Assistant) — for accelerated development
- All core logic, UI design, and architecture built during the hackathon

---

## 📸 Demo

Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).

---

## 📜 License

Built for Aavishkar 2026 Hackathon. All rights reserved.

---

*#Aavishkar2026 🚀*
