const mongoose = require('mongoose');

const researchStatSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, required: true },
});

const companyStatSchema = new mongoose.Schema({
    value: { type: String, required: true },
    label: { type: String, required: true },
});

const contactInfoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  value: { type: String, required: true },
  icon: { type: String, required: true },
});

const officeSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  type: { type: String, enum: ['Headquarters', 'European Office', 'Asia Pacific Office', 'Branch'] },
});

const siteConfigSchema = new mongoose.Schema(
  {
    configName: {
      type: String,
      default: 'default',
      unique: true,
    },
    researchStats: [researchStatSchema],
    companyStats: [companyStatSchema],
    contactInfo: [contactInfoSchema],
    globalOffices: [officeSchema],
  },
  {
    timestamps: true,
  }
);

const SiteConfig = mongoose.model('SiteConfig', siteConfigSchema);

module.exports = SiteConfig;