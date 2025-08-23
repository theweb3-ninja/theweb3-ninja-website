import { useEffect, useState } from 'react';
import { isDebug } from '../config';
import { convertRemToPixel } from '../lib';

export const useBreakpoint = () => {
  const [breakpoints, setBreakpoints] = useState({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: true,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const getBreakpointValues = () => {
      const styles = getComputedStyle(document.documentElement);
      const rawTablet = styles.getPropertyValue('--breakpoint-sm');
      const rawLaptop = styles.getPropertyValue('--breakpoint-md');
      const rawDesktop = styles.getPropertyValue('--breakpoint-lg');

      return {
        mobile: 0,
        tablet: convertRemToPixel(rawTablet),
        laptop: convertRemToPixel(rawLaptop),
        desktop: convertRemToPixel(rawDesktop),
      };
    };

    const calculate = () => {
      const width = window.innerWidth;
      const { mobile, tablet, laptop, desktop } = getBreakpointValues();

      if (isDebug) {
        console.log('useBreakpoint calculate', { width, mobile, tablet, laptop, desktop });
      }

      setBreakpoints({
        isMobile: width < mobile,
        isTablet: width >= mobile && width < tablet,
        isLaptop: width >= tablet && width < laptop,
        isDesktop: width >= laptop,
      });
    };

    calculate();

    window.addEventListener('resize', calculate);

    return () => window.removeEventListener('resize', calculate);
  }, []);

  return breakpoints;
};
