# 🔐 PassOP - Mongo Version

A secure, simple password manager built using **Node.js**, **Express**, and **MongoDB**. This application allows users to store, manage, and retrieve passwords safely, all from a clean and responsive web interface.

---

## 📸 Preview

*(Add a screenshot of the app here, e.g., ./assets/screenshot.png)*

---

## 🚀 Features

- 🔐 Secure password storage using MongoDB
- ➕ Add, update, and delete credentials
- 🧠 Search functionality for quick access
- 🧾 Organized display of saved passwords
- 🧑 User-friendly and responsive interface
- 🗃 Built with MVC architecture for scalability

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Templating Engine**: EJS
- **Frontend**: HTML, CSS, Bootstrap
- **Tools**: dotenv, body-parser, express-session

---

## 📁 Project Structure

PassOP-Mongo/
├── models/
│ └── Password.js # Mongoose model for credentials
├── public/
│ └── css/ # CSS styling
├── routes/
│ └── index.js # App routes
├── views/
│ ├── index.ejs # Main dashboard
│ └── addPassword.ejs # Form for adding credentials
├── .env # Environment variables (Mongo URI)
├── app.js # Main server file
├── package.json # NPM dependencies

---

## 📦 Installation

### Prerequisites

- Node.js installed
- MongoDB database (local or Atlas)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/ssjamdade/PassOP-Mongo.git
   ```

2. Navigate to the project folder:

```bash
cd PassOP-Mongo
```

3. Install dependencies:

```bash
npm install
```

4. Create a .env file in the root directory and add your MongoDB connection string:
```
  MONGO_URI=your_mongodb_connection_string
```

5. Start the server:
```bash
npm start
```

6. Open your browser and navigate to:
```
http://localhost:3000
```
