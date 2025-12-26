// migration_script.js - FINAL AND SAFE VERSION

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./src/models/ProjectModel');

dotenv.config();

// توابع کمکی بدون تغییر هستند
const generateFakeOverview = (title, description) => `This document provides a comprehensive overview of the ${title} project...`;
const transformTechnologies = (techArray) => {
  const iconMap = {
    'NLP': 'BrainCircuit', 'YOLOv8': 'Eye', 'Transformers': 'Bot', 'Edge Computing': 'Cpu',
    'React': 'Atom', 'Deep Learning': 'Brain', 'GAN': 'Paintbrush', 'LangChain': 'Link',
    'Vector DB': 'Database', 'Diffusion Models': 'Layers', '3D Rendering': 'Cube',
    'OCR': 'ScanText', 'Medical Imaging': 'Scan'
  };
  // این تابع فقط برای آرایه‌ای از رشته‌ها طراحی شده است
  return techArray.map(techName => ({ name: techName, icon: iconMap[techName] || 'Code' }));
};
const generateFakeKeyFeatures = () => ([
  { icon: 'Shield', title: 'Enhanced Security', description: 'End-to-end encryption and compliance with modern security standards.' },
  { icon: 'Scaling', title: 'Scalable Architecture', description: 'Designed to handle millions of requests with a microservices-based approach.' }
]);


const migrateProjects = async () => {
  try {
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) throw new Error('MONGODB_URI is not defined in .env');
    await mongoose.connect(dbUri);
    console.log('MongoDB Connected...');

    const projects = await Project.find({});
    if (projects.length === 0) { console.log('No projects found.'); return; }
    console.log(`Found ${projects.length} projects to process...`);

    let updatedCount = 0;
    
    for (const project of projects) {
      const updatePayload = {};
      let needsUpdate = false;
      
      // ▼▼▼ شرط محافظ حیاتی: این شرط را برمی‌گردانیم ▼▼▼
      // این خط بررسی می‌کند که آیا technologies وجود دارد و آیا اولین عنصر آن یک رشته است یا خیر.
      // اگر یک رشته باشد، یعنی داده‌ها هنوز خام هستند و نیاز به تبدیل دارند.
      if (project.technologies && project.technologies.length > 0 && typeof project.technologies[0] === 'string') {
        console.log(`  -> Transforming technologies for "${project.title}"...`);
        updatePayload.technologies = transformTechnologies(project.technologies);
        needsUpdate = true;
      }
      // ▲▲▲ پایان شرط محافظ ▲▲▲
      
      // شرط برای اصلاح videoUrl (این شرط صحیح است و باقی می‌ماند)
      if (!project.videoUrl || project.videoUrl.includes('youtube.com')) {
        console.log(`  -> Correcting video URL for "${project.title}"...`);
        updatePayload.videoUrl = '/uploads/videos/Firefighter_RAG_Project_Video_Ad.mp4'; 
        needsUpdate = true;
      }

      // اضافه کردن فیلدهای دیگر
      if (!project.overview) { updatePayload.overview = generateFakeOverview(project.title, project.description); needsUpdate = true; }
      if (!project.keyFeatures || project.keyFeatures.length === 0) { updatePayload.keyFeatures = generateFakeKeyFeatures(); needsUpdate = true; }
      if (!project.demoUrl) { updatePayload.demoUrl = `https://demo.example.com/${project.slug}`; needsUpdate = true; }
      
      if (needsUpdate) {
        await Project.findByIdAndUpdate(project._id, { $set: updatePayload });
        updatedCount++;
        console.log(`  -> Successfully updated project: "${project.title}"`);
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