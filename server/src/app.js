// src/app.js
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // تابع اتصال به دیتابیس را وارد کن

// Connect to Database
connectDB(); // اینجا تابع را فراخوانی کن

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// یک روت تستی
app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to Hekfa AI Backend API!" });
});

module.exports = app;