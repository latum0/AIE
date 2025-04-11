import React, { useState, useEffect, useRef } from 'react';

const FadeIn = ({ children }) => {
  const [isVisible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 } // Adjust when animation triggers (30% visible)
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-in ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </div>
  );
};

export default FadeIn;