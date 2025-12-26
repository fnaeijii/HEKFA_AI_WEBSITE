// src/contexts/LayoutContext.tsx

import React, { createContext, useState, useContext, ReactNode, ReactElement } from 'react';
import NeuralBackground from '@/components/effects/NeuralBackground'; // بک‌گراند پیش‌فرض

// ▼▼▼ قدم ۱: اینترفیس را آپدیت می‌کنیم تا شامل state جدید هم بشود ▼▼▼
interface LayoutContextType {
  setBackground: (backgroundComponent: ReactElement) => void;
  isHeroVisible: boolean;
  setIsHeroVisible: (isVisible: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [background, setBackground] = useState<ReactElement>(<NeuralBackground />);
  
  // ▼▼▼ قدم ۲: state جدید را اینجا اضافه می‌کنیم ▼▼▼
  // مقدار اولیه true است چون وقتی صفحه لود می‌شود، hero section همیشه دیده می‌شود
  const [isHeroVisible, setIsHeroVisible] = useState(true);

  const handleSetBackground = (backgroundComponent: ReactElement) => {
    setBackground(backgroundComponent);
  };

  // ▼▼▼ قدم ۳: مقادیر جدید را به Provider پاس می‌دهیم ▼▼▼
  const value = {
    setBackground: handleSetBackground,
    isHeroVisible,
    setIsHeroVisible,
  };

  return (
    <LayoutContext.Provider value={value}>
      <div className="min-h-screen relative">
        {background}
        {children}
      </div>
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};