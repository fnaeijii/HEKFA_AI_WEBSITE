import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        about: "About",
        projects: "Projects",
        research: "Research",
        contact: "Contact",
        getStarted: "Get Started"
      },
      hero: {
        badge: "Leading AI Innovation Worldwide",
        title: "The Future of Artificial Intelligence",
        subtitle: "Hekfa pioneers cutting-edge AI solutions in Neural Networks, Machine Learning, Computer Vision, and advanced technologies that transform industries.",
        exploreBtn: "Explore Our AI Solutions",
        demoBtn: "Watch Innovation Demo"
      },
      stats: {
        projects: "AI Projects Delivered",
        countries: "Countries Served",
        reliability: "System Reliability",
        models: "Neural Models"
      },
      footer: {
        description: "Pioneering the future of artificial intelligence through cutting-edge research in neural networks, machine learning, and computer vision technologies that transform industries worldwide.",
        company: "Company",
        solutions: "Solutions",
        resources: "Resources",
        legal: "Legal",
        stayUpdated: "Stay updated:",
        subscribe: "Subscribe",
        allRights: "All rights reserved."
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: "Inicio",
        about: "Acerca de",
        projects: "Proyectos",
        research: "Investigación",
        contact: "Contacto",
        getStarted: "Comenzar"
      },
      hero: {
        badge: "Liderando la Innovación en IA Globalmente",
        title: "El Futuro de la Inteligencia Artificial",
        subtitle: "Hekfa es pionera en soluciones de IA de vanguardia en Redes Neuronales, Aprendizaje Automático, Visión por Computadora y tecnologías avanzadas que transforman industrias.",
        exploreBtn: "Explorar Nuestras Soluciones de IA",
        demoBtn: "Ver Demo de Innovación"
      },
      stats: {
        projects: "Proyectos de IA Entregados",
        countries: "Países Servidos",
        reliability: "Confiabilidad del Sistema",
        models: "Modelos Neurales"
      },
      footer: {
        description: "Pioneros del futuro de la inteligencia artificial a través de investigación de vanguardia en redes neuronales, aprendizaje automático y tecnologías de visión por computadora que transforman industrias mundialmente.",
        company: "Empresa",
        solutions: "Soluciones",
        resources: "Recursos",
        legal: "Legal",
        stayUpdated: "Manténgase actualizado:",
        subscribe: "Suscribirse",
        allRights: "Todos los derechos reservados."
      }
    }
  },
  fa: {
    translation: {
      nav: {
        home: "خانه",
        about: "درباره ما",
        projects: "پروژه‌ها",
        research: "تحقیقات",
        contact: "تماس",
        getStarted: "شروع کنید"
      },
      hero: {
        badge: "رهبری نوآوری هوش مصنوعی در جهان",
        title: "آینده هوش مصنوعی",
        subtitle: "هکفا پیشگام در ارائه راه‌حل‌های پیشرفته هوش مصنوعی در شبکه‌های عصبی، یادگیری ماشین، بینایی کامپیوتر و فناوری‌های پیشرفته است که صنایع را متحول می‌کند.",
        exploreBtn: "راه‌حل‌های هوش مصنوعی ما را کاوش کنید",
        demoBtn: "تماشای نمایش نوآوری"
      },
      stats: {
        projects: "پروژه‌های هوش مصنوعی تحویل شده",
        countries: "کشورهای خدمات‌رسانی",
        reliability: "قابلیت اطمینان سیستم",
        models: "مدل‌های عصبی"
      },
      footer: {
        description: "پیشگام آینده هوش مصنوعی از طریق تحقیقات پیشرفته در شبکه‌های عصبی، یادگیری ماشین و فناوری‌های بینایی کامپیوتر که صنایع را در سراسر جهان متحول می‌کند.",
        company: "شرکت",
        solutions: "راه‌حل‌ها",
        resources: "منابع",
        legal: "قانونی",
        stayUpdated: "به‌روز بمانید:",
        subscribe: "اشتراک",
        allRights: "تمام حقوق محفوظ است."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;