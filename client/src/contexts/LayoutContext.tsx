import React, { createContext, useState, useContext, ReactNode, ReactElement } from 'react';
import NeuralBackground from '@/components/effects/NeuralBackground'; // بک‌گراند پیش‌فرض

// تعریف نوع (Type) برای مقداری که Context نگهداری می‌کند
interface LayoutContextType {
  // setBackground یک تابع است که یک کامپوننت React (بک‌گراند) را می‌پذیرد
  setBackground: (backgroundComponent: ReactElement) => void;
}

// ایجاد Context
const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

// ایجاد Provider (که در App.tsx استفاده خواهد شد)
export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // این state، کامپوننت بک‌گراند فعلی را نگه می‌دارد
  const [background, setBackground] = useState<ReactElement>(<NeuralBackground />);

  // تابعی که فرزندان (صفحات) برای تغییر بک‌گراند صدا می‌زنند
  const handleSetBackground = (backgroundComponent: ReactElement) => {
    setBackground(backgroundComponent);
  };

  return (
    <LayoutContext.Provider value={{ setBackground: handleSetBackground }}>
      {/*         این بخش جالب است:
        ما خود بک‌گراند را در اینجا رندر می‌کنیم
        و {children} (که همان SiteLayout خواهد بود) را روی آن قرار می‌دهیم
      */}
      <div className="min-h-screen relative">
        {background}
        {children}
      </div>
    </LayoutContext.Provider>
  );
};

// ایجاد یک Hook سفارشی برای استفاده آسان‌تر در کامپوننت‌ها
export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};