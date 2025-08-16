import  { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Star, Coffee, Music, Camera, MapPin, Calendar, Gift, Sparkles, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page load animation
      gsap.from('.fade-in', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        stagger: 0.3,
        ease: 'power3.out'
      });

      // Scroll-triggered animations
      gsap.utils.toArray('.scroll-reveal').forEach((element: any) => {
        gsap.from(element, {
          opacity: 0,
          y: 100,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom-=100',
            end: 'bottom center',
            toggleActions: 'play none none reverse'
          }
        });
      });

      // Floating animation for background elements
      gsap.to('.float', {
        y: -15,
        duration: 3,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.8
      });

      // Continuous heart creation
      const createFloatingHeart = () => {
        const hearts = ['💖', '💕', '💗', '💝', '🤍', '💜', '💙', '🧡', '💛'];
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.className = 'absolute text-2xl pointer-events-none select-none opacity-60';
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        heart.style.zIndex = '1';
        
        if (heartsRef.current) {
          heartsRef.current.appendChild(heart);
        }

        gsap.to(heart, {
          y: -window.innerHeight - 100,
          x: (Math.random() - 0.5) * 300,
          rotation: Math.random() * 360,
          opacity: 0,
          duration: 8 + Math.random() * 4,
          ease: 'none',
          onComplete: () => heart.remove()
        });
      };

      const heartInterval = setInterval(createFloatingHeart, 1200);
      
      return () => clearInterval(heartInterval);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleProposal = () => {
    setShowFinalMessage(true);
    
    // Create massive celebration effect
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      const particles = ['💖', '✨', '🎉', '🌟', '💕', '🥳', '🎊', '💜', '🧡'];
      particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
      particle.className = 'absolute text-2xl pointer-events-none z-50';
      particle.style.left = '50%';
      particle.style.top = '50%';
      document.body.appendChild(particle);

      gsap.to(particle, {
        x: (Math.random() - 0.5) * 800,
        y: (Math.random() - 0.5) * 800,
        rotation: Math.random() * 720,
        opacity: 0,
        duration: 3,
        ease: 'power2.out',
        delay: i * 0.03,
        onComplete: () => particle.remove()
      });
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ourMoments = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "The Day We First Met",
      date: "A day I'll never forget",
      description: "I still remember exactly how you looked, what you wore, and how my heart skipped when you smiled at me for the first time.",
      image: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Our First Coffee Together",
      date: "The beginning of everything",
      description: "That nervous excitement when we sat across from each other, talking for hours like we'd known each other forever.",
      image: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "When You Shared Your Favorite Song",
      date: "Now it's my favorite too",
      description: "The way your eyes lit up when you played that song for me - it became the soundtrack to my feelings for you.",
      image: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Late Night Conversations",
      date: "When time didn't matter",
      description: "Those endless talks under the stars, sharing dreams and secrets, when I realized you were becoming my everything.",
      image: "https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Every Photo We Took",
      date: "Captured happiness",
      description: "Each picture holds a memory, a laugh, a moment when I fell a little deeper in love with you.",
      image: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "All The Places We've Been",
      date: "Adventures together",
      description: "Every place becomes special when I'm with you. You make ordinary moments feel like magic.",
      image: "https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=800",
      color: "from-teal-500 to-blue-500"
    }
  ];

  const whyILoveYou = [
    {
      icon: "✨",
      title: "Your Beautiful Smile",
      description: "It lights up every room you enter and makes my heart race every single time."
    },
    {
      icon: "🌟",
      title: "Your Kind Heart",
      description: "The way you care for others and show compassion makes you absolutely incredible."
    },
    {
      icon: "💫",
      title: "Your Amazing Laugh",
      description: "It's the most beautiful sound in the world and I want to hear it every day."
    },
    {
      icon: "🌸",
      title: "Your Unique Personality",
      description: "Everything about you - your quirks, your dreams, your way of seeing the world - is perfect."
    },
    {
      icon: "🦋",
      title: "How You Make Me Feel",
      description: "With you, I feel like the best version of myself. You inspire me to be better every day."
    },
    {
      icon: "🌈",
      title: "Your Beautiful Soul",
      description: "You're not just beautiful on the outside - your soul is the most beautiful thing about you."
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 relative overflow-hidden">
      {/* Floating hearts container */}
      <div ref={heartsRef} className="fixed inset-0 pointer-events-none z-10" />
      
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="float absolute top-20 left-10 text-pink-300/30 text-8xl">💕</div>
        <div className="float absolute top-60 right-16 text-purple-300/30 text-6xl">✨</div>
        <div className="float absolute bottom-40 left-16 text-rose-400/30 text-7xl">💖</div>
        <div className="float absolute bottom-20 right-20 text-indigo-300/30 text-5xl">🌟</div>
        <div className="float absolute top-1/3 right-1/3 text-pink-200/20 text-9xl">💝</div>
        <div className="float absolute bottom-1/3 left-1/4 text-purple-200/25 text-6xl">🦋</div>
      </div>

      <div className="relative z-20">
        {!showFinalMessage ? (
          <>
            {/* Header */}
            <header className="fade-in bg-white/20 backdrop-blur-md border-b border-white/30 sticky top-0 z-40">
              <div className="container mx-auto px-6 py-6">
                <div className="flex items-center justify-center">
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl animate-pulse">💖</div>
                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent font-dancing">
                      For My Beautiful Anshika
                    </h1>
                    <div className="text-3xl animate-pulse">💖</div>
                  </div>
                </div>
              </div>
            </header>

            <main className="container mx-auto px-6 py-12">
              {/* Hero Section */}
              <section className="fade-in text-center mb-24">
                <div className="mb-12">
                  <div className="text-8xl mb-6 animate-bounce">💌</div>
                  <h2 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-8 font-dancing leading-tight">
                    Hey Anshika...
                  </h2>
                  <p className="text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
                    I made this entire website just for you because some feelings are too big for just words... 
                  </p>
                  <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    There's something I've been wanting to tell you for the longest time, and I hope this shows you just how much you mean to me. 💕
                  </p>
                </div>
              </section>

              {/* Why You're Special Section */}
              <section className="scroll-reveal mb-24">
                <div className="text-center mb-16">
                  <h3 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 font-dancing">
                    Why You're So Special, Anshika
                  </h3>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Let me tell you all the reasons why you make my heart skip a beat...
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                  {whyILoveYou.map((reason, index) => (
                    <div key={index} className="scroll-reveal bg-white/50 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/60">
                      <div className="text-center">
                        <div className="text-6xl mb-6">{reason.icon}</div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-4 font-dancing">{reason.title}</h4>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Our Journey Timeline */}
              <section className="scroll-reveal mb-24">
                <div className="text-center mb-16">
                  <h3 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 font-dancing">
                    Our Beautiful Journey Together
                  </h3>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Every moment with you has been a treasure, Anshika. Here are some of my favorites...
                  </p>
                </div>

                <div className="max-w-6xl mx-auto relative">
                  {/* Timeline line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-300 rounded-full opacity-40 hidden lg:block" />

                  {ourMoments.map((moment, index) => (
                    <div
                      key={index}
                      className={`scroll-reveal flex flex-col lg:flex-row items-center mb-20 ${
                        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                      }`}
                    >
                      <div className={`w-full lg:w-5/12 mb-8 lg:mb-0 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                        <div className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                          <div className="flex items-center mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${moment.color} rounded-full flex items-center justify-center text-white mr-4`}>
                              {moment.icon}
                            </div>
                            <div>
                              <h4 className="text-2xl font-bold text-gray-800 font-dancing">{moment.title}</h4>
                              <p className="text-pink-600 font-medium">{moment.date}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {moment.description}
                          </p>
                        </div>
                      </div>
                      
                      {/* Center icon for large screens */}
                      <div className="relative z-10 hidden lg:block">
                        <div className={`w-20 h-20 bg-gradient-to-r ${moment.color} rounded-full flex items-center justify-center text-white shadow-2xl border-4 border-white`}>
                          {moment.icon}
                        </div>
                      </div>
                      
                      <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pl-12' : 'lg:pr-12'}`}>
                        <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 hover:scale-105 transition-all duration-500">
                          <img 
                            src={moment.image} 
                            alt={moment.title}
                            className="w-full h-80 object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Photo Gallery */}
              <section className="scroll-reveal mb-24">
                <div className="text-center mb-16">
                  <h3 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 font-dancing">
                    Our Precious Memories
                  </h3>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Every photo tells a story of happiness, laughter, and the love growing in my heart...
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  {[
                    "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400",
                    "https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=400",
                    "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400",
                    "https://images.pexels.com/photos/1025469/pexels-photo-1025469.jpeg?auto=compress&cs=tinysrgb&w=400",
                    "https://images.pexels.com/photos/1024981/pexels-photo-1024981.jpeg?auto=compress&cs=tinysrgb&w=400",
                    "https://images.pexels.com/photos/1024975/pexels-photo-1024975.jpeg?auto=compress&cs=tinysrgb&w=400",
                    "https://images.pexels.com/photos/1024968/pexels-photo-1024968.jpeg?auto=compress&cs=tinysrgb&w=400",
                    "https://images.pexels.com/photos/1024970/pexels-photo-1024970.jpeg?auto=compress&cs=tinysrgb&w=400"
                  ].map((image, index) => (
                    <div key={index} className="scroll-reveal group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500">
                      <img 
                        src={image} 
                        alt={`Memory ${index + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <p className="text-white p-4 font-medium">Beautiful moment #{index + 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Love Letter Section */}
              <section className="scroll-reveal mb-24">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white/50 backdrop-blur-lg rounded-3xl p-12 md:p-16 shadow-2xl border border-white/40">
                    <div className="text-center mb-12">
                      <div className="text-7xl mb-6">💝</div>
                      <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 font-dancing">
                        A Letter to Your Heart
                      </h3>
                    </div>
                    
                    <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                      <p className="text-xl md:text-2xl font-medium text-center mb-8 text-gray-800">
                        Dearest Anshika,
                      </p>
                      
                      <p className="text-lg md:text-xl">
                        I've been carrying these feelings in my heart for so long, and today I finally found the courage to share them with you. You've become such an important part of my life, and I can't imagine my days without thinking about you.
                      </p>
                      
                      <p className="text-lg md:text-xl">
                        Every conversation we have, every moment we spend together, every time you laugh at something silly I say - these moments have become the highlights of my days. You have this incredible way of making everything better just by being yourself.
                      </p>
                      
                      <p className="text-lg md:text-xl">
                        I love how passionate you are about the things you care about. I love how you see the world with such wonder and kindness. I love how you make me want to be a better person just by being in your presence.
                      </p>
                      
                      <p className="text-lg md:text-xl">
                        Anshika, what I'm trying to say is... I've fallen completely and utterly in love with you. Not just with how beautiful you are (though you absolutely are), but with your heart, your mind, your soul - everything that makes you uniquely you.
                      </p>
                      
                      <p className="text-xl md:text-2xl font-bold text-center mt-12 text-gray-800">
                        I love you, Anshika. 💖
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* The Big Question */}
              <section className="scroll-reveal mb-24">
                <div className="max-w-3xl mx-auto text-center">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-12 md:p-16 shadow-2xl text-white">
                    <div className="text-8xl mb-8">💍</div>
                    <h3 className="text-4xl md:text-6xl font-bold mb-8 font-dancing">
                      Anshika, Will You Be Mine?
                    </h3>
                    <p className="text-xl md:text-2xl mb-12 leading-relaxed">
                      I want to create a million more beautiful memories with you. I want to be the reason you smile every day. I want to love you with all my heart, today and always.
                    </p>
                    
                    <button
                      onClick={handleProposal}
                      className="group bg-white text-pink-600 px-12 py-6 rounded-2xl text-2xl font-bold hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-pink-50"
                    >
                      <span className="flex items-center space-x-4">
                        <Heart className="w-8 h-8 group-hover:scale-125 transition-transform duration-300" />
                        <span>Click to See My Heart</span>
                        <Heart className="w-8 h-8 group-hover:scale-125 transition-transform duration-300" />
                      </span>
                    </button>
                  </div>
                </div>
              </section>

              {/* Promise Section */}
              <section className="scroll-reveal mb-24">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-6 font-dancing">
                      My Promises to You
                    </h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {[
                      {
                        icon: <Heart className="w-8 h-8" />,
                        title: "To Love You Unconditionally",
                        description: "Through every season of life, in every moment, with all that I am."
                      },
                      {
                        icon: <Star className="w-8 h-8" />,
                        title: "To Support Your Dreams",
                        description: "I'll be your biggest cheerleader and help you reach for the stars."
                      },
                      {
                        icon: <Sparkles className="w-8 h-8" />,
                        title: "To Make You Smile Daily",
                        description: "I promise to do everything I can to bring joy to your beautiful face."
                      },
                      {
                        icon: <Gift className="w-8 h-8" />,
                        title: "To Cherish Every Moment",
                        description: "Every second with you is a gift I'll treasure forever."
                      }
                    ].map((promise, index) => (
                      <div key={index} className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/40 hover:shadow-2xl transition-all duration-500 hover:scale-105">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                            {promise.icon}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-800 mb-3 font-dancing">{promise.title}</h4>
                            <p className="text-gray-600 leading-relaxed">{promise.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </main>
          </>
        ) : (
          /* Final Message */
          <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="bg-white/70 backdrop-blur-lg rounded-3xl p-12 md:p-20 shadow-2xl border border-white/50">
                <div className="text-9xl mb-8 animate-bounce">🎉</div>
                
                <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-8 font-dancing">
                  Thank You for Reading, Anshika! 💕
                </h2>
                
                <p className="text-2xl md:text-3xl text-gray-700 mb-8 leading-relaxed">
                  You've just experienced something I made entirely for you, with all my love and hope.
                </p>
                
                <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
                  No matter what your answer is, I want you to know that you're absolutely incredible, and I'm grateful for every moment we've shared. You deserve all the love and happiness in the world. ✨
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-6 border border-pink-200">
                    <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                    <p className="text-pink-800 font-medium">Made with Love</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl p-6 border border-purple-200">
                    <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <p className="text-purple-800 font-medium">Crafted with Hope</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-2xl p-6 border border-rose-200">
                    <Star className="w-12 h-12 text-rose-600 mx-auto mb-4" />
                    <p className="text-rose-800 font-medium">Delivered with Courage</p>
                  </div>
                </div>
                
                <div className="text-3xl md:text-4xl font-dancing text-gray-700">
                  Forever yours, with all my heart 💖
                </div>

                <button
                  onClick={() => setShowFinalMessage(false)}
                  className="mt-12 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-medium text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Read Again 💕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        {!showFinalMessage && (
          <footer className="fade-in text-center py-16">
            <div className="max-w-md mx-auto bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
              <p className="text-gray-700 font-dancing text-2xl mb-2">
                Made with 💖 just for Anshika
              </p>
              <p className="text-gray-500 text-lg">
                Because you deserve something as special as you are
              </p>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

export default App;