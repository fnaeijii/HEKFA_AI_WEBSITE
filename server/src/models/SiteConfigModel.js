const mongoose = require('mongoose');

// Schema برای هر آیتم آمار تحقیقاتی
const researchStatSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, required: true },
});

// <<-- ۱. این Schema جدید را اضافه کنید -->>
// Schema برای هر آیتم آمار شرکت (صفحه درباره ما)
const companyStatSchema = new mongoose.Schema({
    value: { type: String, required: true }, // e.g., "500+"
    label: { type: String, required: true }, // e.g., "AI Projects Completed"
});

// Schema برای هر آیتم اطلاعات تماس
const contactInfoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  value: { type: String, required: true },
  icon: { type: String, required: true },
});

// Schema برای هر دفتر
const officeSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String, enum: ['Headquarters', 'European Office', 'Asia Pacific Office', 'Branch'] },
});

// Schema اصلی تنظیمات سایت
const siteConfigSchema = new mongoose.Schema(
  {
    configName: {
      type: String,
      default: 'default',
      unique: true,
    },
    researchStats: [researchStatSchema],
    companyStats: [companyStatSchema], // <<-- ۲. این فیلد جدید را اینجا اضافه کنید
    contactInfo: [contactInfoSchema],
    globalOffices: [officeSchema],
  },
  {
    timestamps: true,
  }
);

const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);

module.exports = SiteConfig;