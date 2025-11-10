// src/hooks/useLottie.ts
import { useState, useEffect } from 'react';

// تعریف تایپ برای window.lottie برای جلوگیری از خطاهای TypeScript
declare global {
  interface Window {
    lottie?: any;
  }
}

const SCRIPT_SRC = "https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js";
let isScriptLoaded = false;
let isScriptLoading = false;

export const useLottie = () => {
  const [lottie, setLottie] = useState<any>(window.lottie || null);

  useEffect(() => {
    if (isScriptLoaded) {
      setLottie(window.lottie);
      return;
    }

    if (isScriptLoading) {
      // اگر در حال لود شدن است، منتظر بمان
      const interval = setInterval(() => {
        if (window.lottie) {
          isScriptLoaded = true;
          setLottie(window.lottie);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
    
    isScriptLoading = true;
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;

    script.onload = () => {
      setLottie(window.lottie);
      isScriptLoaded = true;
      isScriptLoading = false;
    };

    script.onerror = () => {
      isScriptLoading = false;
    }

    document.body.appendChild(script);
    
    // ما دیگر اسکریپت را حذف نمی‌کنیم، چون ممکن است صفحات دیگر به آن نیاز داشته باشند.
    // این کار ایمن است چون اسکریپت فقط یک بار به DOM اضافه می‌شود.

  }, []);

  return lottie;
};