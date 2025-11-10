const express = require('express');
const cors = require('cors');
const path = require('path'); // <<-- این خط را اضافه کنید
const connectDB = require('./config/db');

// Import Routes
const projectRoutes = require('./routes/projectRoutes');
const contactRoutes = require('./routes/contactRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const contentRoutes = require('./routes/contentRoutes');
const teamMemberRoutes = require('./routes/teamMemberRoutes');
const caseStudyRoutes = require('./routes/caseStudyRoutes');
const uploadRoutes = require('./routes/uploadRoutes'); // <<-- این خط را اضافه کنید
const eventRoutes = require('./routes/eventRoutes'); // <<-- 1. این خط را اضافه کنید
const siteConfigRoutes = require('./routes/siteConfigRoutes'); // <<-- 1. این خط را اضافه کنید

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// <<-- این خط مهم را اضافه کنید
// این کد پوشه uploads را به صورت عمومی در دسترس قرار می‌دهد
// تا بتوانیم تصاویر را از طریق URL مثل http://localhost:5000/uploads/image-123.png ببینیم
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


// Test Route
app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to Hekfa AI Backend API!" });
});

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/team', teamMemberRoutes);
app.use('/api/case-studies', caseStudyRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/config', siteConfigRoutes);

module.exports = app;