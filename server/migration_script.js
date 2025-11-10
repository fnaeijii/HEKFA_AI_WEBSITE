// migration_script.js - FINAL VERSION

const mongoose = require('mongoose');
const dotenv = require('dotenv');
// مطمئن شوید مسیر مدل صحیح است
const Project = require('./src/models/ProjectModel');

dotenv.config();

// --- توابع کمکی (بدون تغییر) ---
const generateFakeOverview = (title, description) => `This document provides a comprehensive overview of the ${title} project...`;
const transformTechnologies = (techArray) => {
  const iconMap = {
    'NLP': 'BrainCircuit', 'YOLOv8': 'Eye', 'Transformers': 'Bot', 'Edge Computing': 'Cpu',
    'React': 'Atom', 'Deep Learning': 'Brain', 'GAN': 'Paintbrush', 'LangChain': 'Link',
    'Vector DB': 'Database', 'Diffusion Models': 'Layers', '3D Rendering': 'Cube',
    'OCR': 'ScanText', 'Medical Imaging': 'Scan'
  };
  return techArray.map(techName => ({ name: techName, icon: iconMap[techName] || 'Code' }));
};
const generateFakeKeyFeatures = () => { /* ... بدون تغییر ... */ };

// --- تابع اصلی اسکریپت ---
const migrateProjects = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) throw new Error('DATABASE_URI is not defined in .env');
    await mongoose.connect(dbUri);
    console.log('MongoDB Connected...');

    const validCategories = ['NLP', 'Computer Vision', 'Speech', 'IoT', 'Other'];
    const categoryMap = { 'Generative AI': 'NLP', 'Healthcare AI': 'NLP' };

    const projects = await Project.find({});
    if (projects.length === 0) {
      console.log('No projects found.');
      return;
    }
    console.log(`Found ${projects.length} projects to process...`);

    let updatedCount = 0;
    
    for (const project of projects) {
      const updatePayload = {};
      let needsUpdate = false;
      
      // 1. تبدیل دسته‌بندی‌ها
      if (!validCategories.includes(project.category)) {
        updatePayload.category = categoryMap[project.category] || 'Other';
        needsUpdate = true;
      }

      // 2. تبدیل ساختار Technologies (این بخش کلیدی است)
      if (project.technologies && project.technologies.length > 0 && typeof project.technologies[0] === 'string') {
        updatePayload.technologies = transformTechnologies(project.technologies);
        needsUpdate = true;
      }
      
      // 3. اضافه کردن فیلدهای دیگر اگر وجود ندارند
      if (!project.overview) {
        updatePayload.overview = generateFakeOverview(project.title, project.description);
        needsUpdate = true;
      }
      if (!project.keyFeatures || project.keyFeatures.length === 0) {
        updatePayload.keyFeatures = generateFakeKeyFeatures();
        needsUpdate = true;
      }
      if (!project.demoUrl) {
        updatePayload.demoUrl = `https://demo.example.com/${project.slug}`;
        needsUpdate = true;
      }
      // ▼▼▼ اضافه کردن ویدیو URL ساختگی برای تست ▼▼▼
      if (!project.videoUrl) {
        // از یک ویدیوی Placeholder یوتیوب استفاده می‌کنیم
        updatePayload.videoUrl = 'https://www.youtube.com/embed/f477_AYe0yE'; 
        needsUpdate = true;
      }
      
      if (needsUpdate) {
        await Project.findByIdAndUpdate(project._id, { $set: updatePayload });
        updatedCount++;
        console.log(`  -> Updated project: "${project.title}"`);
      } else {
        console.log(`  -> Skipping project (already up-to-date): "${project.title}"`);
      }
    }
    
    console.log(`\nMigration complete. ${updatedCount} projects were updated.`);

  } catch (error) {
    console.error('An error occurred during migration:', error.message || error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  }
};

migrateProjects();