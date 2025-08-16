import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Star, Coffee, Music, Camera, Book } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Timeline: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.timeline-item');
      
      items.forEach((item: any, index) => {
        gsap.from(item, {
          opacity: 0,
          x: index % 2 === 0 ? -100 : 100,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  const moments = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "First Glance",
      description: "That moment when our eyes first met and time seemed to stop",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Coffee Conversations",
      description: "Those endless talks over warm cups that made my heart race",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <Music className="w-6 h-6" />,
      title: "Shared Songs",
      description: "When you shared that song and it became our melody",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Late Night Texts",
      description: "Those messages that lit up my phone and my entire world",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Captured Memories",
      description: "Every photo together holds a piece of my heart",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Book className="w-6 h-6" />,
      title: "This Moment",
      description: "Right now, as I gather courage to tell you how I feel",
      color: "from-pink-500 to-purple-500"
    }
  ];

  return (
    <section ref={timelineRef} id="timeline" className="py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4 font-dancing">
          Our Beautiful Journey
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Every moment with you has been a story worth telling
        </p>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-300 rounded-full opacity-30" />

        {moments.map((moment, index) => (
          <div
            key={index}
            className={`timeline-item flex items-center mb-16 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <h3 className="text-xl font-bold text-gray-800 mb-2 font-dancing">
                  {moment.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {moment.description}
                </p>
              </div>
            </div>
            
            {/* Center icon */}
            <div className="relative z-10">
              <div className={`w-16 h-16 bg-gradient-to-r ${moment.color} rounded-full flex items-center justify-center text-white shadow-xl border-4 border-white`}>
                {moment.icon}
              </div>
            </div>
            
            <div className="w-1/2" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;