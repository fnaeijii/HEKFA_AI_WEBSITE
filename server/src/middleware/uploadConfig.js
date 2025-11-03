const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = 'uploads/';

// اگر پوشه آپلود وجود نداشت، آن را بساز
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// تنظیمات محل ذخیره‌سازی فایل‌ها
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // فایل‌ها در پوشه 'uploads' در ریشه پروژه ذخیره می‌شوند
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // یک نام منحصر به فرد برای فایل ایجاد می‌کنیم تا با فایل‌های دیگر تداخل نداشته باشد
    // فرمت: fieldname-timestamp.extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// فیلتر برای پذیرش فقط فایل‌های تصویری
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const mimetype = allowedTypes.test(file.mimetype);
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: File type not supported! Only JPEG, PNG, GIF, WEBP are allowed.');
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // محدودیت حجم فایل: 5 مگابایت
  fileFilter: fileFilter,
});

module.exports = upload;