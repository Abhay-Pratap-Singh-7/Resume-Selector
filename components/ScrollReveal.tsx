import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = '', 
  direction = 'up', 
  delay = 0,
  duration = 0.8,
  distance = 30,
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, we can unobserve if we only want it to run once
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold]);

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0)';
    switch (direction) {
      case 'up': return `translate3d(0, ${distance}px, 0)`;
      case 'down': return `translate3d(0, -${distance}px, 0)`;
      case 'left': return `translate3d(-${distance}px, 0, 0)`;
      case 'right': return `translate3d(${distance}px, 0, 0)`;
      case 'none': return 'translate3d(0, 0, 0)';
      default: return `translate3d(0, ${distance}px, 0)`;
    }
  };

  const style: React.CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `opacity ${duration}s cubic-bezier(0.2, 0.8, 0.2, 1), transform ${duration}s cubic-bezier(0.2, 0.8, 0.2, 1)`,
    transitionDelay: `${delay}s`,
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

export default ScrollReveal;