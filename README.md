# 🚦 API Rate Limiter Dashboard (Full-Stack Project)

A **full-stack web application** to simulate and visualize **API rate limiting** using the **Token Bucket algorithm**.  
This project demonstrates **multi-user request handling**, **backend logic**, and an **interactive frontend dashboard**.  


🌐 **Live Demo:** [View Deployed App](https://api-rate-limiter-1-766a.onrender.com)
---

## ✨ Features

- ⚡ **Full-Stack:** Frontend built with **React**, Backend with **Node.js + Express**  
- 🛡️ **Token Bucket Algorithm:** Controls API request flow to prevent abuse  
- 👥 **Multi-User Support:** Each user (via IP) has independent rate limiting  
- 📊 **Interactive Dashboard:** Displays allowed ✅ and blocked ❌ requests in real time  
- 🚀 **Deployment Ready:** Fully deployed on Render for live access  

---

## 🗂️ Project Structure

<img width="984" height="834" alt="image" src="https://github.com/user-attachments/assets/bcf8d3a5-a614-481f-8b45-27592c3569de" />


---

# 🧠 How It Works

Each user has a bucket with a fixed number of tokens 🎟️

Sending an API request consumes 1 token 🔥

Tokens refill automatically over time ⏳ (1 token per second by default)

If no tokens remain → API returns HTTP 429 - Too Many Requests ❌

Frontend updates allowed vs blocked requests dynamically 📊

---

# 📈 Future Enhancements

🔑 Integrate login system for per-user request limits

🗄️ Store buckets in Redis for multi-server support

📊 Add analytics dashboard for multiple users

🏆 Implement different limits for Free vs Premium users

---

# 🛠️ Tech Stack

Frontend: React, Axios

Backend: Node.js, Express

Algorithm: Token Bucket

Deployment: Render (Frontend + Backend)

Optional: Redis for distributed setup

---

# 📄 License

This project is open-source and free to use. ❤️ 

---

## ⚙️ Installation & Run Locally

### Backend and Frontend
```bash
cd backend
npm install
npm start

cd frontend
npm install
npm start
