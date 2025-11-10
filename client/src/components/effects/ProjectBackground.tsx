// src/components/effects/ProjectBackground.tsx

import React from 'react';
// مسیرها به پوشه effects آپدیت شد
import NLPBackground from './NLPBackground';
import VisionBackground from './VisionBackground';
import SpeechBackground from './SpeechBackground';
import IOTBackground from './IOTBackground';

// یک کامپوننت پس‌زمینه ساده برای موارد دیگر
const OtherBackground = () => (
  <div className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 to-background" />
);


interface ProjectBackgroundProps {
  category?: string;
}

const ProjectBackground: React.FC<ProjectBackgroundProps> = ({ category }) => {
  // بر اساس مقادیر 'category' که در دیتابیس دارید، این switch case را تنظیم کنید
  switch (category) {
    case 'NLP':
    case 'Natural Language Processing':
      return <NLPBackground />;
    case 'Computer Vision':
      return <VisionBackground />;
    case 'Speech':
    case 'Audio AI':
      return <SpeechBackground />;
    case 'IoT':
    case 'IoT + AI':
      return <IOTBackground />;
    default:
      return <OtherBackground />;
  }
};

export default ProjectBackground;