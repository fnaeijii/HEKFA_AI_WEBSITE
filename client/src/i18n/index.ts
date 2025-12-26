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
        energy: "Energy Blog",
        creativity: "Creativity",
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
      home: {
        foundation: {
          badge: "Our Foundation",
          title: "Built on Innovation",
          subtitle: "At Hekfa, we believe artificial intelligence should amplify human potential, not replace it. Our mission is to create AI that inspires trust and drives meaningful change.",
          card1Title: "Innovation First",
          card1Description: "Pushing the boundaries of artificial intelligence to solve complex real-world challenges with cutting-edge research.",
          card2Title: "Trust & Security",
          card2Description: "Enterprise-grade security and ethical AI practices ensure your data and systems remain protected at all times.",
          card3Title: "Lightning Fast",
          card3Description: "Optimized algorithms and scalable infrastructure deliver real-time AI insights without compromise.",
          card4Title: "Global Impact",
          card4Description: "Serving organizations across 50+ countries with AI solutions that transform industries worldwide."
        },
        solutions: {
          badge: "AI Solutions",
          title: "Powered by Intelligence",
          subtitle: "Comprehensive AI products designed to transform every aspect of your business operations.",
          learnMore: "Learn more"
        },
        finalCta: {
          title: "Ready to Experience the Future?",
          subtitle: "Join hundreds of forward-thinking organizations already transforming their operations with Hekfa's AI solutions.",
          primary: "Start Your AI Journey",
          secondary: "View Case Studies",
          stat1: "500+ Clients Worldwide",
          stat2: "99.9% Uptime SLA",
          stat3: "24/7 Expert Support"
        }
      },
      about: {
        hero: {
          badge: "About Hekfa AI Division",
          title: "Pioneering the Future of Artificial Intelligence",
          subtitle: "We are Hekfa's specialized AI division, comprising visionary researchers, engineers, and innovators dedicated to pushing the boundaries of artificial intelligence and creating transformative solutions."
        }
      },
      energy: {
        hero: {
          badge: "Energy and environment",
          title: "Energy & Environment Blog",
          subtitle: "Exploring the intersection of technology, sustainability, and environmental innovation"
        },
        video: {
          watch: "Watch Video"
        },
        toc: {
          title: "Table of Contents"
        },
        article: {
          label: "Article"
        },
        state: {
          empty: "No entries available.",
          error: "Unable to load energy blog content. Please try again later."
        }
      },
      creativity: {
        hero: {
          badge: "Journey into the World of Creativity",
          title: "Child & Creativity",
          subtitle: "This is where small ideas create grand adventures. Join us on this treasure map."
        },
        cta: {
          text: "The adventure continues with you... 🚀"
        },
        viewCreation: "View Creation"
      },
      research: {
        hero: {
          badge: "Research & Innovation",
          title: "AI Research",
          subtitle: "Browse our latest discoveries the way you discover shows—curated rows, cinematic posters, and a depth-filled experience built on Swiper's coverflow engine."
        },
        search: {
          placeholder: "Search research papers, tutorials, or case studies...",
          empty: "No matches found for \"{{query}}\". Try another keyword."
        },
        section: {
          viewAll: "View all {{label}}"
        },
        cta: {
          title: "Collaborate with Our Research Team",
          subtitle: "Interested in contributing to these experiments or launching a bespoke initiative? Let's design the next breakthrough together.",
          primary: "Contact Research Team",
          secondary: "Meet the Scientists"
        }
      },
      researchDetail: {
        invalidSlug: "Invalid research slug.",
        fetchError: "Failed to fetch research paper. Please try again later.",
        notFound: "Research paper not found.",
        backToResearch: "Back to Research",
        contents: "Contents",
        references: "References",
        authors: "Authors",
        published: "Published",
        readTime: "Read time",
        journal: "Journal",
        doi: "DOI",
        back: "Back",
        previousArticle: "Previous Article",
        nextArticle: "Next Article",
        sections: {
          abstract: "Abstract",
          introduction: "Introduction",
          introductionContent: "{{title}} explores emerging advances in {{category}}. Expand this section with research motivation, the problem framing, and high-level objectives tailored to your study.",
          methodology: "Methodology",
          methodologyContent: "Detail experimental design choices, datasets, tooling, and evaluation metrics. Reference {{journal}} or related benchmarks for reproducibility.",
          results: "Results & Discussion",
          resultsContent: "Summarize key findings, performance improvements, limitations, and future directions. Mention how the current {{citations}} citations reflect ongoing adoption."
        }
      },
      researchCategory: {
        error: "Unable to load research articles. Please try again.",
        backToHub: "Back to Research Hub",
        badge: "Articles by Category",
        allArticlesIn: "All articles in",
        title: "Research Category",
        defaultDescription: "Explore all research articles in this stream, including foundational work, tutorials, and applied case studies.",
        unknownCategory: "Unknown category.",
        readArticle: "Read article",
        noArticles: "No articles available for this category yet."
      },
      caseStudy: {
        contents: "Contents",
        downloadPdf: "Download PDF",
        tableOfContents: "Table of Contents",
        keyResults: "Key Results",
        technologiesUsed: "Technologies Used",
        client: "Client",
        duration: "Duration",
        industry: "Industry",
        backToProjects: "Back to Projects",
        cta: {
          title: "Ready to Start Your Project?",
          subtitle: "Let's discuss how we can help transform your business with cutting-edge AI solutions.",
          primary: "Get Started",
          secondary: "View More Projects"
        }
      },
      contact: {
        hero: {
          badge: "Get in Touch",
          title: "Let's Build the Future of AI Together",
          subtitle: "Ready to transform your business with cutting-edge AI solutions? Our team of experts is here to help you navigate the future of artificial intelligence."
        },
        form: {
          title: "Send Us a Message",
          firstName: "First Name",
          lastName: "Last Name",
          email: "Email Address",
          company: "Company",
          inquiryType: "Inquiry Type",
          message: "Message",
          submit: "Send Message",
          submitting: "Sending...",
          inquiryGeneral: "General Inquiry",
          inquiryGeneralDesc: "Questions about our AI solutions and services",
          inquiryPartner: "Partnership",
          inquiryPartnerDesc: "Collaboration and business partnership opportunities",
          inquirySupport: "Technical Support",
          inquirySupportDesc: "Technical assistance and implementation support",
          inquiryCareers: "Careers",
          inquiryCareersDesc: "Join our team of AI innovators"
        },
        inquiry: {
          title: "How Can We Help?",
          description: "Choose the type of inquiry that best matches your needs, and we'll connect you with the right team member.",
          quickResponseTitle: "Quick Response",
          quickResponseBody: "We typically respond to inquiries within 24 hours. For urgent matters, please call us directly.",
          scheduleCall: "Schedule a Call"
        },
        offices: {
          title: "Our Global Presence",
          subtitle: "With offices around the world, we're positioned to serve clients across different time zones and regions."
        },
        cta: {
          title: "Ready to Start Your AI Journey?",
          subtitle: "Don't wait to revolutionize your business. Contact us today and discover how AI can transform your operations.",
          button: "Get Started Today"
        }
      },
      projectDetail: {
        breadcrumbProjects: "Projects",
        projectOverview: "Project Overview",
        systemInAction: "System in Action",
        technologiesUsed: "Technologies Used",
        keyFeatures: "Key Features & Results",
        backToProjects: "Back to All Projects",
        viewLiveDemo: "View Live Demo",
        loading: "Loading project...",
        notFound: "Project not found.",
        failedToLoad: "Failed to load project details."
      },
      projectTemplate: {
        nav: {
          title: "Navigation",
          overview: "Overview",
          projectInfo: "Project Info",
          story: "Story",
          demo: "Demo",
          features: "Features",
          architecture: "Architecture",
          challenges: "Challenges",
          performance: "Performance",
          results: "Results",
          useCases: "Use Cases",
          testimonials: "Testimonials",
          cta: "Get Started"
        },
        sections: {
          summary: "Project Summary",
          overview: "Project Overview",
          systemInAction: "System in Action",
          features: "Key Features",
          architecture: "System Architecture",
          challenges: "Challenges & Solutions",
          performance: "Performance Improvements",
          results: "Results & Achievements",
          useCases: "Use Cases",
          testimonials: "What Stakeholders Say"
        },
        labels: {
          goals: "Goals",
          challenge: "The Challenge",
          challengeTitle: "Challenge",
          solutionTitle: "Solution",
          demoPlaceholder: "Demo Video / Interactive Preview",
          videoNotSupported: "Your browser does not support the video tag.",
          architecturePlaceholder: "Architecture Diagram Placeholder",
          before: "Before",
          after: "After",
          initialState: "Initial State",
          optimizedState: "Optimized State"
        },
        categories: {
          NLP: "NLP",
          "Computer Vision": "Computer Vision",
          "Computer Vision & AI": "Computer Vision & AI",
          Speech: "Speech",
          IoT: "IoT",
          Other: "Other"
        }
      },
      intelligenceDetail: {
        backToHome: "Back to Home",
        notFound: "Intelligence information not found",
        comparison: {
          feature: "Feature",
          traditional: "Traditional Approach",
          withAI: "With AI"
        }
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
        allRights: "All rights reserved.",
        links: {
          solutions: {
            computerVision: "Computer Vision",
            naturalLanguage: "Natural Language AI",
            mLOps: "Machine Learning Ops",
            smartCities: "Smart Cities",
            healthcareAI: "Healthcare AI"
          },
          resources: {
            researchLibrary: "Research Library",
            caseStudies: "Case Studies",
            events: "Events & Summits",
            energy: "Energy & Environment",
            press: "Press & Media"
          },
          support: {
            contactSales: "Contact Sales",
            partnerProgram: "Partner Program",
            customerSuccess: "Customer Success",
            status: "Service Status",
            admin: "Admin Portal"
          },
          legal: {
            privacy: "Privacy Policy",
            terms: "Terms of Use",
            security: "Security",
            compliance: "Compliance"
          }
        },
        cta: {
          badge: "Hekfa AI Division",
          title: "Ready to deploy intelligence across your enterprise?",
          subtitle: "Collaborate with our researchers, engineers, and experience teams to bring trusted AI solutions to production—from computer vision at the edge to multilingual assistants for regulated industries.",
          primary: "Speak with our team",
          secondary: "Explore Energy Blog"
        },
        stats: {
          projects: "AI Projects",
          papers: "Research Papers",
          partners: "Global Partners"
        },
        headings: {
          explore: "Explore",
          solutionsResearch: "Solutions & Research",
          resources: "Resources",
          supportLegal: "Support & Legal"
        },
        bottom: {
          tagline: "Hekfa AI Division — Advancing Responsible Intelligence",
          trustLine: "Trusted AI • Secure Deployments • Human-Centered Design"
        }
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
        energy: "Blog de Energía",
        creativity: "Creatividad",
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
      home: {
        foundation: {
          badge: "Nuestra base",
          title: "Construido sobre la innovación",
          subtitle: "En Hekfa creemos que la inteligencia artificial debe amplificar el potencial humano, no reemplazarlo. Nuestra misión es crear IA que genere confianza e impulse un cambio significativo.",
          card1Title: "Innovación primero",
          card1Description: "Impulsamos los límites de la IA para resolver desafíos reales complejos con investigación de vanguardia.",
          card2Title: "Confianza y seguridad",
          card2Description: "Seguridad a nivel empresarial y prácticas éticas de IA garantizan que sus datos y sistemas estén siempre protegidos.",
          card3Title: "Velocidad relámpago",
          card3Description: "Algoritmos optimizados e infraestructura escalable ofrecen información de IA en tiempo real sin compromisos.",
          card4Title: "Impacto global",
          card4Description: "Atendemos organizaciones en más de 50 países con soluciones de IA que transforman industrias en todo el mundo."
        },
        solutions: {
          badge: "Soluciones de IA",
          title: "Impulsado por la inteligencia",
          subtitle: "Productos de IA integrales diseñados para transformar cada aspecto de sus operaciones.",
          learnMore: "Más información"
        },
        finalCta: {
          title: "¿Listo para experimentar el futuro?",
          subtitle: "Únase a cientos de organizaciones visionarias que ya están transformando sus operaciones con las soluciones de IA de Hekfa.",
          primary: "Comience su viaje de IA",
          secondary: "Ver casos de estudio",
          stat1: "500+ clientes en todo el mundo",
          stat2: "99,9% de disponibilidad",
          stat3: "Soporte experto 24/7"
        }
      },
      about: {
        hero: {
          badge: "Sobre Hekfa AI Division",
          title: "Liderando el futuro de la inteligencia artificial",
          subtitle: "Somos la división especializada de IA de Hekfa, formada por investigadores, ingenieros e innovadores dedicados a ampliar los límites de la IA y crear soluciones transformadoras."
        },
        mission: {
          title: "Nuestra misión",
          body1: "En Hekfa AI creemos que la inteligencia artificial debe ampliar las capacidades humanas, no reemplazarlas. Nuestra misión es desarrollar soluciones de IA éticas, transparentes y potentes que resuelvan problemas reales y generen impacto positivo en las industrias.",
          body2: "Desde diagnóstico sanitario hasta sistemas autónomos, pasando por análisis financiero y aplicaciones creativas, aprovechamos el poder de las redes neuronales, el aprendizaje automático y la visión por computador para construir los sistemas inteligentes del mañana.",
          expertiseTitle: "Nuestra experiencia",
          expertise1: "Arquitecturas de redes neuronales profundas",
          expertise2: "Visión por computador y procesamiento de imágenes",
          expertise3: "Procesamiento de lenguaje natural",
          expertise4: "Sistemas de aprendizaje por refuerzo",
          expertise5: "IA en el borde y procesamiento en tiempo real",
          expertise6: "Desarrollo de IA ética",
          expertise7: "MLOps y despliegue en producción",
          expertise8: "Diseño de soluciones de IA a medida",
          cta: "Explorar nuestro trabajo"
        },
        values: {
          title: "Nuestros valores",
          subtitle: "Los principios que guían nuestra investigación y desarrollo en IA"
        },
        team: {
          title: "Conoce a nuestro equipo",
          subtitle: "Investigadores e ingenieros de IA de clase mundial impulsando la innovación"
        },
        cta: {
          title: "Únete a nosotros para moldear el futuro",
          subtitle: "Tanto si desea colaborar, unirse a nuestro equipo o transformar su negocio con IA, nos encantará saber de usted.",
          primary: "Contactar",
          secondary: "Ver nuestra investigación"
        },
        events: {
          title: "Encuéntranos en próximos eventos",
          subtitle: "Participamos activamente en conferencias y talleres líderes del sector. Conéctese con nosotros y vea nuestra tecnología en acción.",
          dateLabel: "Fecha",
          locationLabel: "Ubicación",
          boothLabel: "Stand",
          empty: "Actualmente no hay eventos programados. Vuelva a consultar más adelante."
        }
      },
      energy: {
        hero: {
          badge: "Energía y medio ambiente",
          title: "Blog de Energía y Medio Ambiente",
          subtitle: "Explorando la intersección entre tecnología, sostenibilidad e innovación ambiental"
        },
        video: {
          watch: "Ver video"
        },
        toc: {
          title: "Tabla de contenidos"
        },
        article: {
          label: "Artículo"
        },
        state: {
          empty: "No hay entradas disponibles.",
          error: "No se pudo cargar el contenido del blog de energía. Inténtelo de nuevo más tarde."
        }
      },
      creativity: {
        hero: {
          badge: "Viaje al mundo de la creatividad",
          title: "Niñez y creatividad",
          subtitle: "Aquí es donde las ideas pequeñas crean grandes aventuras. Acompáñanos en este mapa del tesoro."
        },
        cta: {
          text: "La aventura continúa contigo... 🚀"
        },
        viewCreation: "Ver creación"
      },
      research: {
        hero: {
          badge: "Investigación e innovación",
          title: "Investigación en IA",
          subtitle: "Explore nuestros últimos descubrimientos como si fueran series: filas curadas, portadas cinemáticas y una experiencia inmersiva basada en el motor coverflow de Swiper."
        },
        search: {
          placeholder: "Busca artículos, tutoriales o casos de estudio...",
          empty: "No se encontraron resultados para \"{{query}}\". Pruebe con otra palabra clave."
        },
        section: {
          viewAll: "Ver todos los trabajos de {{label}}"
        },
        cta: {
          title: "Colabore con nuestro equipo de investigación",
          subtitle: "¿Quiere contribuir a estos experimentos o iniciar una iniciativa a medida? Diseñemos juntos el próximo gran avance.",
          primary: "Contactar al equipo de investigación",
          secondary: "Conocer a los científicos"
        }
      },
      caseStudy: {
        contents: "Contenido",
        downloadPdf: "Descargar PDF",
        tableOfContents: "Tabla de contenidos",
        keyResults: "Resultados clave",
        technologiesUsed: "Tecnologías utilizadas",
        client: "Cliente",
        duration: "Duración",
        industry: "Industria",
        backToProjects: "Volver a proyectos",
        cta: {
          title: "¿Listo para iniciar su proyecto?",
          subtitle: "Hablemos de cómo podemos ayudarle a transformar su negocio con soluciones de IA de vanguardia.",
          primary: "Comenzar",
          secondary: "Ver más proyectos"
        }
      },
      contact: {
        hero: {
          badge: "Ponte en contacto",
          title: "Construyamos juntos el futuro de la IA",
          subtitle: "¿Listo para transformar tu negocio con soluciones de IA de vanguardia? Nuestro equipo de expertos está aquí para ayudarte a navegar el futuro de la inteligencia artificial."
        },
        form: {
          title: "Envíanos un mensaje",
          firstName: "Nombre",
          lastName: "Apellidos",
          email: "Correo electrónico",
          company: "Empresa",
          inquiryType: "Tipo de consulta",
          message: "Mensaje",
          submit: "Enviar mensaje",
          submitting: "Enviando...",
          inquiryGeneral: "Consulta general",
          inquiryGeneralDesc: "Preguntas sobre nuestras soluciones y servicios de IA",
          inquiryPartner: "Alianzas",
          inquiryPartnerDesc: "Oportunidades de colaboración y asociación empresarial",
          inquirySupport: "Soporte técnico",
          inquirySupportDesc: "Asistencia técnica y soporte de implementación",
          inquiryCareers: "Carreras",
          inquiryCareersDesc: "Únete a nuestro equipo de innovadores en IA"
        },
        inquiry: {
          title: "¿Cómo podemos ayudarte?",
          description: "Elige el tipo de consulta que mejor se adapte a tus necesidades y te conectaremos con la persona adecuada.",
          quickResponseTitle: "Respuesta rápida",
          quickResponseBody: "Normalmente respondemos a las consultas en un plazo de 24 horas. Para asuntos urgentes, llámanos directamente.",
          scheduleCall: "Programar una llamada"
        },
        offices: {
          title: "Nuestra presencia global",
          subtitle: "Con oficinas en todo el mundo, estamos preparados para atender a clientes en diferentes zonas horarias y regiones."
        },
        cta: {
          title: "¿Listo para comenzar tu viaje de IA?",
          subtitle: "No esperes para revolucionar tu negocio. Contáctanos hoy y descubre cómo la IA puede transformar tus operaciones.",
          button: "Comenzar hoy"
        }
      },
      projectDetail: {
        breadcrumbProjects: "Proyectos",
        projectOverview: "Resumen del proyecto",
        systemInAction: "Sistema en acción",
        technologiesUsed: "Tecnologías utilizadas",
        keyFeatures: "Características y resultados clave",
        backToProjects: "Volver a todos los proyectos",
        viewLiveDemo: "Ver demostración en vivo",
        loading: "Cargando proyecto...",
        notFound: "Proyecto no encontrado.",
        failedToLoad: "Error al cargar los detalles del proyecto."
      },
      projectTemplate: {
        nav: {
          title: "Navegación",
          overview: "Resumen",
          projectInfo: "Información del proyecto",
          story: "Historia",
          demo: "Demostración",
          features: "Funcionalidades",
          architecture: "Arquitectura",
          challenges: "Desafíos",
          performance: "Rendimiento",
          results: "Resultados",
          useCases: "Casos de uso",
          testimonials: "Testimonios",
          cta: "Comenzar"
        },
        sections: {
          summary: "Resumen del proyecto",
          overview: "Descripción del proyecto",
          systemInAction: "Sistema en acción",
          features: "Características clave",
          architecture: "Arquitectura del sistema",
          challenges: "Desafíos y soluciones",
          performance: "Mejoras de rendimiento",
          results: "Resultados y logros",
          useCases: "Casos de uso",
          testimonials: "Lo que dicen los interesados"
        },
        labels: {
          goals: "Objetivos",
          challenge: "El desafío",
          challengeTitle: "Desafío",
          solutionTitle: "Solución",
          demoPlaceholder: "Video demo / vista previa interactiva",
          videoNotSupported: "Su navegador no soporta el elemento de video.",
          architecturePlaceholder: "Marcador de posición del diagrama de arquitectura",
          before: "Antes",
          after: "Después",
          initialState: "Estado inicial",
          optimizedState: "Estado optimizado"
        },
        categories: {
          NLP: "PLN",
          "Computer Vision": "Visión por computador",
          "Computer Vision & AI": "Visión por computador e IA",
          Speech: "Voz",
          IoT: "IoT",
          Other: "Otro"
        }
      },
      intelligenceDetail: {
        backToHome: "Volver al inicio",
        notFound: "Información de inteligencia no encontrada",
        comparison: {
          feature: "Característica",
          traditional: "Enfoque tradicional",
          withAI: "Con IA"
        }
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
        allRights: "Todos los derechos reservados.",
        cta: {
          badge: "Hekfa AI Division",
          title: "¿Listo para desplegar inteligencia en toda su empresa?",
          subtitle: "Colabore con nuestros investigadores, ingenieros y equipos de experiencia para llevar soluciones de IA confiables a producción, desde visión por computador en el borde hasta asistentes multilingües para industrias reguladas.",
          primary: "Hable con nuestro equipo",
          secondary: "Explorar el blog de energía"
        },
        stats: {
          projects: "Proyectos de IA",
          papers: "Artículos de investigación",
          partners: "Socios globales"
        },
        headings: {
          explore: "Explorar",
          solutionsResearch: "Soluciones e investigación",
          resources: "Recursos",
          supportLegal: "Soporte y legal"
        },
        bottom: {
          tagline: "Hekfa AI Division — Impulsando una IA responsable",
          trustLine: "IA confiable • Despliegues seguros • Diseño centrado en las personas"
        }
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
        energy: "بلاگ انرژی",
        creativity: "خلاقیت",
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
      home: {
        foundation: {
          badge: "زیربنای ما",
          title: "ساخته‌شده بر پایه نوآوری",
          subtitle: "در هکفا معتقدیم هوش مصنوعی باید توانمندی‌های انسان را تقویت کند، نه اینکه جایگزین آن شود. مأموریت ما خلق سامانه‌های هوشمندی است که اعتماد ایجاد کرده و تغییری معنادار رقم می‌زنند.",
          card1Title: "نوآوری در اولویت",
          card1Description: "با تحقیقات پیشرفته، مرزهای توانایی هوش مصنوعی را برای حل مسائل پیچیده دنیای واقعی جابه‌جا می‌کنیم.",
          card2Title: "اعتماد و امنیت",
          card2Description: "امنیت در سطح سازمانی و اصول اخلاقی در طراحی هوش مصنوعی تضمین می‌کند که داده‌ها و سامانه‌های شما همیشه در امان باشند.",
          card3Title: "سرعت خیره‌کننده",
          card3Description: "الگوریتم‌های بهینه و زیرساخت مقیاس‌پذیر، بینش‌های بلادرنگ مبتنی بر هوش مصنوعی را بدون مصالحه فراهم می‌کنند.",
          card4Title: "تأثیر جهانی",
          card4Description: "ارائه راه‌حل‌های هوش مصنوعی تحول‌آفرین برای سازمان‌ها در بیش از ۵۰ کشور جهان."
        },
        solutions: {
          badge: "راه‌حل‌های هوش مصنوعی",
          title: "توانمند شده با هوشمندی",
          subtitle: "محصولات جامع هوش مصنوعی که برای متحول کردن همه ابعاد عملیات کسب‌وکار شما طراحی شده‌اند.",
          learnMore: "بیشتر بدانید"
        },
        finalCta: {
          title: "آماده تجربه آینده هستید؟",
          subtitle: "به صدها سازمان پیشرو بپیوندید که همین حالا با راه‌حل‌های هوش مصنوعی هکفا در حال تحول عملیات خود هستند.",
          primary: "سفر هوش مصنوعی خود را آغاز کنید",
          secondary: "مشاهده مطالعات موردی",
          stat1: "بیش از ۵۰۰ مشتری در سراسر جهان",
          stat2: "۹۹.۹٪ دسترس‌پذیری سامانه",
          stat3: "پشتیبانی تخصصی ۲۴ ساعته"
        }
      },
      about: {
        hero: {
          badge: "درباره واحد هوش مصنوعی هکفا",
          title: "پیشگام آینده هوش مصنوعی",
          subtitle: "ما واحد تخصصی هوش مصنوعی هکفا هستیم؛ متشکل از پژوهشگران، مهندسان و نوآورانی که برای گسترش مرزهای هوش مصنوعی و خلق راه‌حل‌های تحول‌آفرین تلاش می‌کنند."
        },
        mission: {
          title: "ماموریت ما",
          body1: "در هکفا AI معتقدیم هوش مصنوعی باید توانمندی‌های انسان را تقویت کند، نه اینکه جایگزین او شود. ماموریت ما توسعه راه‌حل‌های هوش مصنوعی قدرتمند، شفاف و اخلاق‌محور است که مسائل واقعی را حل کرده و تأثیر مثبتی بر صنایع مختلف بگذارد.",
          body2: "از تشخیص در حوزه سلامت تا سامانه‌های خودران، از تحلیل مالی تا کاربردهای خلاقانه؛ ما با تکیه بر شبکه‌های عصبی، یادگیری ماشین و بینایی کامپیوتر، سامانه‌های هوشمند فردا را می‌سازیم.",
          expertiseTitle: "حوزه‌های تخصصی ما",
          expertise1: "معماری‌های عمیق شبکه‌های عصبی",
          expertise2: "بینایی کامپیوتر و پردازش تصویر",
          expertise3: "پردازش زبان طبیعی",
          expertise4: "سامانه‌های یادگیری تقویتی",
          expertise5: "هوش مصنوعی لبه شبکه و پردازش بلادرنگ",
          expertise6: "توسعه هوش مصنوعی مسئولانه و اخلاق‌محور",
          expertise7: "MLOps و استقرار در مقیاس سازمانی",
          expertise8: "طراحی راه‌حل‌های اختصاصی هوش مصنوعی",
          cta: "پروژه‌های ما را ببینید"
        },
        values: {
          title: "ارزش‌های ما",
          subtitle: "اصولی که پژوهش و توسعه هوش مصنوعی ما را هدایت می‌کنند"
        },
        team: {
          title: "آشنایی با تیم ما",
          subtitle: "پژوهشگران و مهندسان هوش مصنوعی در کلاس جهانی که نوآوری را پیش می‌برند"
        },
        cta: {
          title: "همراه ما آینده را بسازید",
          subtitle: "اگر به دنبال همکاری، پیوستن به تیم ما یا تحول کسب‌وکار خود با هوش مصنوعی هستید، خوشحال می‌شویم از شما بشنویم.",
          primary: "تماس با ما",
          secondary: "مشاهده تحقیقات ما"
        },
        events: {
          title: "همایش‌ها و رویدادهای پیش‌رو",
          subtitle: "ما در کنفرانس‌ها و کارگاه‌های پیشرو صنعت حضور فعالی داریم. با ما در تماس باشید و فناوری ما را از نزدیک ببینید.",
          dateLabel: "تاریخ",
          locationLabel: "مکان",
          boothLabel: "غرفه",
          empty: "در حال حاضر رویداد فعالی برنامه‌ریزی نشده است. لطفاً بعداً دوباره سر بزنید."
        }
      },
      energy: {
        hero: {
          badge: "انرژی و محیط‌ زیست",
          title: "بلاگ انرژی و محیط‌ زیست",
          subtitle: "کاوش در تلاقی فناوری، پایداری و نوآوری‌های زیست‌محیطی"
        },
        video: {
          watch: "تماشای ویدیو"
        },
        toc: {
          title: "فهرست مطالب"
        },
        article: {
          label: "مقاله"
        },
        state: {
          empty: "هیچ مطلبی در حال حاضر موجود نیست.",
          error: "بارگذاری محتوای بلاگ انرژی ناموفق بود. لطفاً بعداً دوباره تلاش کنید."
        }
      },
      creativity: {
        hero: {
          badge: "سفری به دنیای خلاقیت",
          title: "کودک و خلاقیت",
          subtitle: "اینجاست که ایده‌های کوچک، ماجراجویی‌های بزرگ می‌سازند. در این نقشه گنج همراه ما باشید."
        },
        cta: {
          text: "ماجراجویی با شما ادامه دارد... 🚀"
        },
        viewCreation: "مشاهده اثر"
      },
      research: {
        hero: {
          badge: "پژوهش و نوآوری",
          title: "تحقیقات هوش مصنوعی",
          subtitle: "دستاوردهای تازه ما را مانند یک پلتفرم استریم کشف کنید؛ ردیف‌های گزینش‌شده، پوسترهای سینمایی و تجربه‌ای عمیق مبتنی بر موتور کاورفلو Swiper."
        },
        search: {
          placeholder: "جستجوی مقالات پژوهشی، آموزش‌ها یا مطالعات موردی...",
          empty: "موردی برای «{{query}}» پیدا نشد. لطفاً عبارت دیگری را امتحان کنید."
        },
        section: {
          viewAll: "مشاهده همه موارد در {{label}}"
        },
        cta: {
          title: "همکاری با تیم تحقیقاتی ما",
          subtitle: "مایل به مشارکت در این آزمایش‌ها یا راه‌اندازی یک پروژه اختصاصی هستید؟ بیایید با هم نسل بعدی دستاوردها را طراحی کنیم.",
          primary: "ارتباط با تیم تحقیقاتی",
          secondary: "آشنایی با پژوهشگران"
        }
      },
      researchDetail: {
        invalidSlug: "شناسه تحقیق نامعتبر است.",
        fetchError: "بارگذاری مقاله پژوهشی ناموفق بود. لطفاً بعداً دوباره تلاش کنید.",
        notFound: "مقاله پژوهشی یافت نشد.",
        backToResearch: "بازگشت به تحقیقات",
        contents: "فهرست مطالب",
        references: "منابع",
        authors: "نویسندگان",
        published: "تاریخ انتشار",
        readTime: "زمان مطالعه",
        journal: "مجله",
        doi: "DOI",
        back: "بازگشت",
        previousArticle: "مقاله قبلی",
        nextArticle: "مقاله بعدی",
        sections: {
          abstract: "چکیده",
          introduction: "مقدمه",
          introductionContent: "{{title}} پیشرفت‌های نوظهور در {{category}} را بررسی می‌کند. این بخش را با انگیزه تحقیق، چارچوب مسئله و اهداف کلی متناسب با مطالعه خود گسترش دهید.",
          methodology: "روش‌شناسی",
          methodologyContent: "انتخاب‌های طراحی آزمایشی، مجموعه‌داده‌ها، ابزارها و معیارهای ارزیابی را شرح دهید. برای تکرارپذیری به {{journal}} یا معیارهای مرتبط ارجاع دهید.",
          results: "نتایج و بحث",
          resultsContent: "یافته‌های کلیدی، بهبودهای عملکرد، محدودیت‌ها و جهت‌گیری‌های آینده را خلاصه کنید. اشاره کنید که {{citations}} ارجاع فعلی نشان‌دهنده پذیرش مداوم است."
        }
      },
      researchCategory: {
        error: "بارگذاری مقالات پژوهشی ناموفق بود. لطفاً دوباره تلاش کنید.",
        backToHub: "بازگشت به مرکز تحقیقات",
        badge: "مقالات بر اساس دسته‌بندی",
        allArticlesIn: "همه مقالات در",
        title: "دسته‌بندی تحقیقات",
        defaultDescription: "همه مقالات پژوهشی در این دسته را بررسی کنید، شامل کارهای بنیادی، آموزش‌ها و مطالعات موردی کاربردی.",
        unknownCategory: "دسته‌بندی ناشناخته.",
        readArticle: "خواندن مقاله",
        noArticles: "هنوز مقاله‌ای برای این دسته‌بندی موجود نیست."
      },
      caseStudy: {
        contents: "فهرست مطالب",
        downloadPdf: "دانلود PDF",
        tableOfContents: "فهرست مطالب",
        keyResults: "نتایج کلیدی",
        technologiesUsed: "فناوری‌های استفاده شده",
        client: "مشتری",
        duration: "مدت زمان",
        industry: "صنعت",
        backToProjects: "بازگشت به پروژه‌ها",
        cta: {
          title: "آماده شروع پروژه خود هستید؟",
          subtitle: "بیایید درباره این‌که چگونه می‌توانیم با راه‌حل‌های پیشرفته هوش مصنوعی کسب‌وکار شما را متحول کنیم صحبت کنیم.",
          primary: "همین حالا شروع کنید",
          secondary: "مشاهده پروژه‌های بیشتر"
        }
      },
      contact: {
        hero: {
          badge: "با ما در ارتباط باشید",
          title: "بیایید آینده هوش مصنوعی را با هم بسازیم",
          subtitle: "آماده‌اید کسب‌وکار خود را با راه‌حل‌های پیشرفته هوش مصنوعی متحول کنید؟ تیم متخصص هکفا در کنار شماست تا مسیر آینده هوش مصنوعی را هموار کنید."
        },
        form: {
          title: "پیام خود را برای ما ارسال کنید",
          firstName: "نام",
          lastName: "نام خانوادگی",
          email: "آدرس ایمیل",
          company: "شرکت",
          inquiryType: "نوع درخواست",
          message: "متن پیام",
          submit: "ارسال پیام",
          submitting: "در حال ارسال...",
          inquiryGeneral: "درخواست عمومی",
          inquiryGeneralDesc: "سوالات کلی درباره راه‌حل‌ها و خدمات هوش مصنوعی ما",
          inquiryPartner: "همکاری و شراکت",
          inquiryPartnerDesc: "فرصت‌های همکاری تجاری و فناورانه",
          inquirySupport: "پشتیبانی فنی",
          inquirySupportDesc: "کمک فنی و پشتیبانی در پیاده‌سازی راه‌حل‌ها",
          inquiryCareers: "فرصت‌های شغلی",
          inquiryCareersDesc: "به تیم نوآوران هوش مصنوعی ما بپیوندید"
        },
        inquiry: {
          title: "چطور می‌توانیم کمک کنیم؟",
          description: "نوع درخواستی را که بیشترین تطابق را با نیاز شما دارد انتخاب کنید تا شما را به فرد مناسب متصل کنیم.",
          quickResponseTitle: "پاسخ‌گویی سریع",
          quickResponseBody: "معمولاً ظرف ۲۴ ساعت به درخواست‌ها پاسخ می‌دهیم. برای موارد فوری، لطفاً مستقیماً با ما تماس بگیرید.",
          scheduleCall: "تنظیم جلسه تماس"
        },
        offices: {
          title: "حضور جهانی ما",
          subtitle: "با دفاتری در نقاط مختلف جهان، می‌توانیم در مناطق و مناطق زمانی متفاوت در کنار شما باشیم."
        },
        cta: {
          title: "آماده شروع سفر هوش مصنوعی هستید؟",
          subtitle: "برای متحول کردن کسب‌وکار خود منتظر نمانید. همین امروز با ما تماس بگیرید و ببینید هوش مصنوعی چگونه می‌تواند عملیات شما را دگرگون کند.",
          button: "همین امروز شروع کنید"
        }
      },
      projectDetail: {
        breadcrumbProjects: "پروژه‌ها",
        projectOverview: "معرفی پروژه",
        systemInAction: "سیستم در عمل",
        technologiesUsed: "فناوری‌های استفاده شده",
        keyFeatures: "ویژگی‌ها و نتایج کلیدی",
        backToProjects: "بازگشت به همه پروژه‌ها",
        viewLiveDemo: "مشاهده دمو",
        loading: "در حال بارگذاری پروژه...",
        notFound: "پروژه یافت نشد.",
        failedToLoad: "خطا در بارگذاری جزئیات پروژه."
      },
      projectTemplate: {
        nav: {
          title: "ناوبری",
          overview: "نمای کلی",
          projectInfo: "اطلاعات پروژه",
          story: "داستان پروژه",
          demo: "دمو",
          features: "ویژگی‌ها",
          architecture: "معماری",
          challenges: "چالش‌ها",
          performance: "عملکرد",
          results: "نتایج",
          useCases: "موارد استفاده",
          testimonials: "نظرات",
          cta: "شروع کنید"
        },
        sections: {
          summary: "خلاصه پروژه",
          overview: "مرور پروژه",
          systemInAction: "سامانه در عمل",
          features: "ویژگی‌های کلیدی",
          architecture: "معماری سیستم",
          challenges: "چالش‌ها و راه‌حل‌ها",
          performance: "بهبودهای عملکرد",
          results: "دستاوردها و نتایج",
          useCases: "موارد استفاده",
          testimonials: "دیدگاه ذی‌نفعان"
        },
        labels: {
          goals: "اهداف",
          challenge: "چالش",
          challengeTitle: "چالش",
          solutionTitle: "راه‌حل",
          demoPlaceholder: "ویدیو دمو / پیش‌نمایش تعاملی",
          videoNotSupported: "مرورگر شما از پخش ویدیو پشتیبانی نمی‌کند.",
          architecturePlaceholder: "جای‌نگهدار نمودار معماری",
          before: "قبل",
          after: "بعد",
          initialState: "وضعیت اولیه",
          optimizedState: "وضعیت بهینه‌شده"
        },
        categories: {
          NLP: "پردازش زبان طبیعی",
          "Computer Vision": "بینایی کامپیوتر",
          "Computer Vision & AI": "بینایی کامپیوتر و هوش مصنوعی",
          Speech: "گفتار",
          IoT: "اینترنت اشیا",
          Other: "سایر"
        }
      },
      intelligenceDetail: {
        backToHome: "بازگشت به خانه",
        notFound: "اطلاعات هوش مصنوعی یافت نشد",
        comparison: {
          feature: "ویژگی",
          traditional: "رویکرد سنتی",
          withAI: "با هوش مصنوعی"
        }
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
        allRights: "تمام حقوق محفوظ است.",
        cta: {
          badge: "واحد هوش مصنوعی هکفا",
          title: "آماده استقرار هوش در سراسر سازمان خود هستید؟",
          subtitle: "با تیم‌های پژوهش، مهندسی و تجربه ما همکاری کنید تا راه‌حل‌های مطمئن هوش مصنوعی را—from بینایی کامپیوتر در لبه شبکه تا دستیارهای چندزبانه در صنایع تنظیم‌گری—به محیط عملیاتی بیاورید.",
          primary: "گفت‌وگو با تیم ما",
          secondary: "کاوش بلاگ انرژی"
        },
        stats: {
          projects: "پروژه‌های هوش مصنوعی",
          papers: "مقالات پژوهشی",
          partners: "همکاران جهانی"
        },
        headings: {
          explore: "کاوش",
          solutionsResearch: "راه‌حل‌ها و پژوهش",
          resources: "منابع",
          supportLegal: "پشتیبانی و حقوقی"
        },
        bottom: {
          tagline: "واحد هوش مصنوعی هکفا — پیش‌برنده هوش مسئولانه",
          trustLine: "هوش قابل‌اعتماد • استقرار امن • طراحی انسان‌محور"
        }
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