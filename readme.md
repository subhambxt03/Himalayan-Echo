<div align="center">

# 🎵 GX Shubham MP3 Player

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![CSS](https://img.shields.io/badge/CSS-Custom-1572B6)
![License](https://img.shields.io/badge/License-MIT-28A745)

### 🎧 Where Pahad Meets the Beat

[Live Demo](https://gx-shubham-music.netlify.app/) · [GitHub](https://github.com/subhambxt03/Mountain-Melody) · [Report Issue](https://github.com/subhambxt03/Mountain-Melody/issues)

</div>

---

## 📋 Overview

A **premium, responsive music player** built with React.js – featuring custom audio controls, playlist management, dynamic album artwork, and Spotify integration. No backend, no database – just pure frontend.

---

## ✨ Features

- 🎵 Custom audio player (play/pause, next/prev, shuffle, repeat)
- 🖼️ Album artwork with live glow animation
- 📋 5 playlists with 10 songs each
- 🔗 Spotify embed per playlist
- 📱 Fully responsive (desktop + mobile)
- 🎛️ Background playback (Media Session API)
- 🎨 Premium dark UI with gradient accents

---

## 🛠️ Tech Stack

- **React 18** + **Vite**
- **CSS** (custom, no Tailwind)
- **React Icons** (Feather)
- **Media Session API** (background playback)

---

## 📁 Structure
src/
├── components/ (Header, Sidebar, MusicPlayer, Playlist, SongRow, Footer)
├── data/ (playlists.js – all songs & config)
├── styles/ (all CSS files)
├── App.jsx
└── main.jsx
public/
├── images/ (album covers)
├── audio/ (MP3 files)
└── *.png (favicon, header, photo)

text

---

## 🚀 Quick Start

```bash
git clone https://github.com/subhambxt03/Mountain-Melody.git
cd Mountain-Melody
npm install
npm run dev
⚙️ Customisation
Edit src/data/playlists.js to change:

Playlist names & songs

Song metadata (title, artist, duration, cover, audio URL)

Spotify playlist IDs

Portfolio & GitHub URLs

🌐 Deployment
bash
npm run build
Deploy the dist/ folder to Netlify, Vercel, or GitHub Pages.

📧 Contact
GitHub · Portfolio

<div align="center"> ⭐ Star this project if you enjoy it!<br> Made with ❤️ by <strong>GX Shubham</strong> </div> ```