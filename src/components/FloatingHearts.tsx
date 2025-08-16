import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingHearts: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hearts = ['💖', '💕', '💗', '💝', '🤍', '💜', '💙'];
    const container = containerRef.current;
    
    if (!container) return;

    const createHeart = () => {
      const heart = document.createElement('div');
      heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
      heart.className = 'absolute text-2xl pointer-events-none select-none';
      heart.style.left = Math.random() * window.innerWidth + 'px';
      heart.style.top = window.innerHeight + 'px';
      heart.style.zIndex = '1';
      
      container.appendChild(heart);

      gsap.to(heart, {
        y: -window.innerHeight - 100,
        x: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 360,
        opacity: 0,
        duration: 8 + Math.random() * 4,
        ease: 'none',
        onComplete: () => {
          if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
          }
        }
      });
    };

    // Create hearts periodically
    const interval = setInterval(createHeart, 2000);

    // Initial hearts
    for (let i = 0; i < 5; i++) {
      setTimeout(createHeart, i * 500);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none" />;
};

export default FloatingHearts;