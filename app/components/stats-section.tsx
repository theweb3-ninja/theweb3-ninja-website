import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const AnimatedNumber = ({ endValue, duration = 2000 }: { endValue: string; duration?: number }) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Extract numeric value from string (e.g., "500+" -> 500, "98%" -> 98)
  const numericValue = parseInt(endValue.replace(/\D/g, ''));
  const suffix = endValue.replace(/\d/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Use easeOutCubic for smooth animation
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCurrentValue(Math.floor(easeProgress * numericValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, numericValue, duration]);

  return (
    <div ref={ref} className="text-5xl font-bold mb-2">
      {currentValue}
      {suffix}
    </div>
  );
};

export const StatsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto px-6 py-20 max-w-7xl">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white text-center">
        <h2 className="text-4xl font-bold mb-12">{t('stats.title')}</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <AnimatedNumber endValue="500+" />
            <div className="text-xl opacity-90">{t('stats.events')}</div>
          </div>
          <div>
            <AnimatedNumber endValue="200+" />
            <div className="text-xl opacity-90">{t('stats.suppliers')}</div>
          </div>
          <div>
            <AnimatedNumber endValue="50+" />
            <div className="text-xl opacity-90">{t('stats.categories')}</div>
          </div>
          <div>
            <AnimatedNumber endValue="98%" />
            <div className="text-xl opacity-90">{t('stats.successRate')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
