import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// TypeScript interface for slide objects
interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

interface AnimatedSliderProps {
  slides: Slide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showPagination?: boolean;
}

const AnimatedSlider: React.FC<AnimatedSliderProps> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showNavigation = true,
  showPagination = true
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length]);

  // Navigation functions
  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (!slides.length) return null;

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Main slider container */}
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 }
            }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 lg:px-12">
                <div className="max-w-4xl">
                  {/* Title */}
                  <motion.h1
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
                  >
                    <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                      {slides[currentSlide].title}
                    </span>
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 max-w-3xl leading-relaxed"
                  >
                    {slides[currentSlide].description}
                  </motion.p>

                  {/* CTA Button */}
                  {slides[currentSlide].buttonText && (
                    <motion.div
                      variants={buttonVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold text-lg rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-2xl"
                      >
                        {slides[currentSlide].buttonText}
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      {showNavigation && slides.length > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToPrevious}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/20"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border border-white/20"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </motion.button>
        </>
      )}

      {/* Pagination Dots */}
      {showPagination && slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white shadow-lg'
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-20 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm font-medium">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default AnimatedSlider;
