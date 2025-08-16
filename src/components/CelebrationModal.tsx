import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Heart, Sparkles, Star } from 'lucide-react';

const CelebrationModal: React.FC = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Overlay fade in
      gsap.from(overlayRef.current, {
        opacity: 0,
        duration: 0.3
      });

      // Modal scale in
      gsap.from(modalRef.current, {
        scale: 0,
        rotation: 10,
        duration: 0.6,
        ease: 'back.out(1.7)'
      });

      // Create celebration particles
      const createParticles = () => {
        const particles = ['💖', '✨', '🌟', '💕', '💜', '🎉', '🥳'];
        
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement('div');
          particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
          particle.className = 'absolute text-2xl pointer-events-none select-none';
          particle.style.left = '50%';
          particle.style.top = '50%';
          particle.style.zIndex = '9999';
          
          document.body.appendChild(particle);

          gsap.to(particle, {
            x: (Math.random() - 0.5) * 800,
            y: (Math.random() - 0.5) * 800,
            rotation: Math.random() * 720,
            opacity: 0,
            duration: 3,
            ease: 'power2.out',
            delay: i * 0.05,
            onComplete: () => particle.remove()
          });
        }
      };

      createParticles();
    }, modalRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <div
        ref={modalRef}
        className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 md:p-12 max-w-md w-full shadow-2xl border border-white/50"
      >
        <div className="text-center">
          <div className="text-8xl mb-6">🎉</div>
          
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 font-dancing">
            Message Sent!
          </h2>
          
          <p className="text-gray-600 text-lg mb-6">
            Your heart has been delivered with love! ✨
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 text-pink-600">
              <Heart className="w-5 h-5" />
              <span className="font-medium">Wrapped with care</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-purple-600">
              <Sparkles className="w-5 h-5" />
              <span className="font-medium">Sprinkled with magic</span>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-indigo-600">
              <Star className="w-5 h-5" />
              <span className="font-medium">Delivered with hope</span>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl border border-pink-200">
            <p className="text-sm text-gray-600 italic">
              "The best things in life are worth waiting for, but even better when shared with courage." 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CelebrationModal;