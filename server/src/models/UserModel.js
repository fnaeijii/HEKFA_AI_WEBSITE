const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  // +++ اضافه شد +++
  isAdmin: {
    type: Boolean,
    required: true,
    default: false, // نکته امنیتی مهم: به طور پیش‌فرض هیچ کاربری ادمین نیست
  },
}, {
  timestamps: true // اضافه کردن این گزینه برای ثبت زمان ساخت و آپدیت خوب است
});

// Hash کردن پسورد قبل از ذخیره در دیتابیس
userSchema.pre('save', async function (next) {
  // فقط در صورتی که پسورد تغییر کرده باشد آن را هش کن
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// متدی برای مقایسه پسورد وارد شده با پسورد هش شده در دیتابیس
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;