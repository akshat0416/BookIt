Perfect 👍 — here’s a **complete, ready-to-paste `README.md`** for your main project folder (root).
This version combines **frontend + backend + deployment** instructions — ideal for submission or GitHub.

---

```markdown
# 🌍 BookIt – Full Stack Booking Platform

## 🚀 Live Demo

- **Frontend (Vercel):** [https://book-fkqe5b1z8-akshats-projects-a071b71d.vercel.app/](https://book-fkqe5b1z8-akshats-projects-a071b71d.vercel.app/)
- **Backend (Render):** [https://bookit-mez6.onrender.com](https://bookit-mez6.onrender.com)
- **API Example Endpoint:** [https://bookit-mez6.onrender.com/api/experiences](https://bookit-mez6.onrender.com/api/experiences)

---

## 📖 Project Overview

**BookIt** is a full-stack web application for discovering and booking adventure experiences.  
Users can browse experiences, view details, check slot availability, and make bookings in real-time.

This project consists of:
- A **React + Vite** frontend hosted on **Vercel**
- A **Node.js + Express** backend hosted on **Render**
- A **PostgreSQL (Supabase)** database

---

## 🧩 Project Structure

```

bookit-project/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── config/
│   │   └── app.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
└── README.md

````

---

## ⚙️ Tech Stack

**Frontend:**
- React + TypeScript (Vite)
- Tailwind CSS
- Axios (API Calls)
- Vercel (Hosting)

**Backend:**
- Node.js + Express.js
- PostgreSQL (Supabase)
- dotenv, cors
- Render (Hosting)

---

## 🛠️ Setup Instructions (Local Development)

### 1️⃣ Clone the Repository

```bash
git clone <your-github-repo-url>
cd bookit-project
````

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the **backend/** folder:

```bash
PORT=5000
DATABASE_URL=your_supabase_connection_string
```

Run the backend server locally:

```bash
npm start
```

Backend will start at:

```
http://localhost:5000
```

### 🔹 Test API Endpoints

* `GET /api/experiences` → Fetch all experiences
* `GET /api/experiences/:id` → Fetch single experience
* `GET /api/experiences/:id/slots` → Fetch available slots
* `POST /api/bookings` → Create a new booking
* `POST /api/promo/validate` → Validate promo code

---

## 🎨 Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file inside **frontend/** folder:

```bash
VITE_API_BASE_URL=https://bookit-mez6.onrender.com/api
```

Run the frontend locally:

```bash
npm run dev
```

Now visit:

```
http://localhost:5173
```

---

## ☁️ Deployment Details

### 🟢 Backend Deployment (Render)

1. Push your backend code to GitHub.
2. Go to [https://render.com](https://render.com).
3. Create a **Web Service** → connect your backend repo.
4. Add environment variables:

   ```
   PORT=10000
   DATABASE_URL=your_supabase_connection_string
   ```
5. Set **Start Command:**

   ```
   npm start
   ```
6. Deploy 🚀

**Example deployed link:**
[https://bookit-mez6.onrender.com](https://bookit-mez6.onrender.com)

---

### 🔵 Frontend Deployment (Vercel)

1. Push your frontend code to GitHub.
2. Visit [https://vercel.com](https://vercel.com).
3. Import your repo and select the **frontend** folder.
4. Add environment variable:

   ```
   VITE_API_BASE_URL=https://bookit-mez6.onrender.com/api
   ```
5. Deploy 🎉

**Example deployed link:**
[https://book-fkqe5b1z8-akshats-projects-a071b71d.vercel.app/](https://book-fkqe5b1z8-akshats-projects-a071b71d.vercel.app/)

---

## ✨ Features

✅ Browse adventure experiences
✅ View detailed descriptions and prices
✅ Check available slots
✅ Book experiences with user details
✅ Validate promo codes
✅ Responsive and user-friendly UI
✅ Live connection with backend API

---

## 🧠 Health Check (Backend)

Test backend health endpoint:

```
https://bookit-mez6.onrender.com/health
```

Response:

```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

## 📦 Folder-Level READMEs

Each folder (`frontend/` and `backend/`) can optionally contain its own `README.md` file with setup instructions if needed, but this main README covers both parts together.

---

## 📄 License

This project is created for **educational and demonstration** purposes only.

---

## 👨‍💻 Developer

**Name:** Akshat Rana
**Role:** Full Stack Developer
**Tools:** React, Node.js, Express, Supabase, Vercel, Render

```

---

✅ You can directly copy the above text into your main `README.md` file.  
After that, commit and push it to your GitHub repository — your submission will be **complete and reviewer-ready**.

Would you like me to help you write the **short GitHub commit + submission message** (to paste on your submission form)?
```
