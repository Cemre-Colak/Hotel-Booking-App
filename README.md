# Hotel Booking App – Quick Stay

🔗 **Live Demo:** [quick-stay-sigma-jet.vercel.app](https://quick-stay-sigma-jet.vercel.app)  


---

## 📌 Overview

**Quick Stay** is a MERN full-stack hotel booking web application.  
It allows travelers to search and book hotels, while hotel owners can list and manage their properties. The project demonstrates a real-world reservation workflow with authentication, hotel management, and a responsive UI.

---

## ✨ Features

- 🔑 **Authentication & Authorization** (powered by Clerk)  
- 🏨 Browse hotels with details (photos, description, amenities, location)  
- 🔍 Search & filter hotels by city, price, and availability  
- 📅 Make and manage reservations  
- 👨‍💼 Hotel owner dashboard: add, edit, and delete hotels  
- 📱 Responsive UI for desktop   

---

## 🛠️ Tech Stack

**Frontend (client):**
- React + Vite
- React Router
- Tailwind CSS
- Axios

**Backend (server):**
- Node.js + Express
- MongoDB with Mongoose
- Clerk (user management & authentication)
- Svix (webhook handling)
- Nodemailer (email service)

**Deployment:**
- Vercel (Frontend + Backend)

---

## 📂 Project Structure

```bash
Hotel-Booking-App/
│
├── client/                # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   └── ...
│   └── vite.config.js
│
├── server/                # Backend (Express + MongoDB)
│   ├── configs/           # DB connection, env config
│   ├── controllers/       # API controllers
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   └── ...
│
├── .gitignore
└── README.md
