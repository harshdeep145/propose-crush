import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Heart, Mail } from 'lucide-react';

const Header: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header slide in animation
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'bounce.out'
      });

      // Pulsing heart animation
      gsap.to(heartRef.current, {
        scale: 1.2,
        duration: 0.8,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={headerRef} className="bg-white/20 backdrop-blur-md border-b border-white/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div ref={heartRef} className="text-2xl">💖</div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent font-dancing">
              Tell Your Heart
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#confession" className="flex items-center text-gray-700 hover:text-pink-600 transition-colors duration-300">
              <Heart className="w-4 h-4 mr-2" />
              Confess
            </a>
            <a href="#timeline" className="flex items-center text-gray-700 hover:text-purple-600 transition-colors duration-300">
              <Mail className="w-4 h-4 mr-2" />
              Stories
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;