import axios from 'axios';

// 1. آدرس پایه سرور را از .env می‌خوانیم.
const serverBaseUrl = import.meta.env.VITE_API_URL; 

// 2. یک instance جدید از axios ایجاد می‌کنیم و پیشوند /api را به آن اضافه می‌کنیم.
//    حالا تمام درخواست‌های api به آدرس درست (مثلاً http://localhost:5001/api) ارسال می‌شوند.
const api = axios.create({
  baseURL: `${serverBaseUrl}/api`,
});

// 3. Interceptor شما برای اضافه کردن توکن به هدرها (بدون تغییر)
api.interceptors.request.use(
  (config) => {
    // اطلاعات کاربر را از localStorage بخوان
    const userInfoString = localStorage.getItem('userInfo');
    
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      const token = userInfo.token;

      // اگر توکن وجود داشت، آن را به هدر Authorization اضافه کن
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    
    return config; // درخواست را با هدر جدید برگردان تا ارسال شود
  },
  (error) => {
    // در صورت بروز خطا در تنظیم درخواست، آن را رد کن
    return Promise.reject(error);
  }
);

export default api;