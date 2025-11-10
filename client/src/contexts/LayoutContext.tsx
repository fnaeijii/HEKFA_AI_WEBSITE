import React, { createContext, useState, useContext, ReactNode, ReactElement } from 'react';
import NeuralBackground from '@/components/effects/NeuralBackground'; // بک‌گراند پیش‌فرض

interface LayoutContextType {
  setBackground: (backgroundComponent: ReactElement) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);
export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [background, setBackground] = useState<ReactElement>(<NeuralBackground />);
  const handleSetBackground = (backgroundComponent: ReactElement) => {
    setBackground(backgroundComponent);
  };

  return (
    <LayoutContext.Provider value={{ setBackground: handleSetBackground }}>
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