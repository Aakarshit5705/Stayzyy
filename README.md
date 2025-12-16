# Stayzyy – Full‑Stack Booking Web Application

Stayzyy is a **full‑stack accommodation booking platform** inspired by modern rental services. It allows users to explore places, make and manage bookings, upload photos, receive email notifications, and interact with an AI-powered travel assistant. The project is built using the **MERN stack** and deployed on **Render**.

---

## 🌐 Live Links

* **Frontend (Live Website):** [https://stayzyy-frontend.onrender.com](https://stayzyy-frontend.onrender.com)
* **Backend (API):** [https://stayzyy.onrender.com](https://stayzyy.onrender.com)

> 🔹 Users visit the **frontend link** to use the website.
> 🔹 The **GitHub repository** contains only the source code.

---

## 🚀 Features

### 🔐 Authentication & User Sessions

* User registration and login
* Password hashing using **bcrypt**
* JWT-based authentication stored in **HTTP-only cookies**
* Secure logout
* Persistent login sessions

---

### 🏡 Places & Listings

* Create new place listings
* Update and manage owned places
* Upload multiple photos per place
* View all available places
* Search places by destination (title or address)

---

### 📅 Bookings Management

* Book places with check-in and check-out dates
* Prevent duplicate bookings for the same user and dates
* View all bookings under user account
* Cancel bookings securely

---

### 📧 Email Notifications

* Booking confirmation email to guests
* Booking notification email to hosts
* Booking cancellation emails to both guest and host
* Implemented using **Nodemailer (Gmail SMTP)**

---

### 🖼️ Image Upload & Handling

* Upload images using **Multer**
* Upload images via direct file upload or image URL
* Images served via backend `/uploads` route

> ⚠️ Note: On Render free tier, uploaded images are **not persistent** after redeploys.

---

### 🤖 AI Travel Assistant

* Integrated **Google Gemini AI**
* Chat endpoint that suggests places based on user queries
* AI responses are generated strictly from available listings

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* React Router DOM
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB & Mongoose
* JWT Authentication
* Multer (file uploads)
* Nodemailer (email service)
* Google Gemini AI API

### Deployment

* Render (Frontend as Static Site, Backend as Web Service)

---

## ⚙️ Environment Variables

### Backend (`api/.env`)

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend (Render Environment Variables)

```env
VITE_API_URL=https://stayzyy.onrender.com
```

---

## 🧪 API Overview (Backend)

| Method | Route           | Description             |
| ------ | --------------- | ----------------------- |
| POST   | /register       | Register new user       |
| POST   | /login          | User login              |
| GET    | /profile        | Get logged-in user      |
| POST   | /logout         | Logout user             |
| POST   | /upload         | Upload images           |
| POST   | /upload-by-link | Upload image via URL    |
| POST   | /places         | Create new place        |
| GET    | /places         | Get all places / search |
| GET    | /places/:id     | Get place by ID         |
| PUT    | /places         | Update place            |
| POST   | /bookings       | Create booking          |
| GET    | /bookings       | Get user bookings       |
| DELETE | /bookings/:id   | Cancel booking          |
| POST   | /chat           | AI travel assistant     |

---

## 🖥️ Running Locally

### Clone the repository

```bash
git clone https://github.com/Aakarshit5705/Stayzyy.git
cd Stayzyy
```

### Backend Setup

```bash
cd api
npm install
npm start
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 📂 Project Structure

```text
Stayzyy/
├── api/        # Backend (Node + Express)
│   ├── models/
│   ├── uploads/
│   ├── index.js
│   └── package.json
│
├── client/     # Frontend (React + Vite)
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## ⚠️ Important Notes

* Render free tier uses an **ephemeral filesystem**; uploaded images may be lost after redeploys.
* For production use, integrate **Cloudinary, AWS S3, or Firebase Storage**.

---

## 👨‍💻 Author

**Aakarshit Khajuria**
GitHub: [https://github.com/Aakarshit5705](https://github.com/Aakarshit5705)

---

⭐ If you find this project helpful, consider giving it a star on GitHub!
