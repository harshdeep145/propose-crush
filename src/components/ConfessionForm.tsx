import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Send, Heart, User, MessageCircle } from 'lucide-react';

interface ConfessionFormProps {
  onSend: () => void;
}

const ConfessionForm: React.FC<ConfessionFormProps> = ({ onSend }) => {
  const [formData, setFormData] = useState({
    fromName: '',
    toName: '',
    message: ''
  });
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.form-step', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out'
      });
    }, formRef);

    return () => ctx.revert();
  }, [currentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSend = () => {
    if (!formData.fromName || !formData.toName || !formData.message) return;

    // Animate button
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });

    // Create floating hearts from button
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.className = 'absolute text-xl pointer-events-none z-50';
        heart.style.left = rect.left + rect.width / 2 + 'px';
        heart.style.top = rect.top + rect.height / 2 + 'px';
        document.body.appendChild(heart);

        gsap.to(heart, {
          x: (Math.random() - 0.5) * 200,
          y: -100 - Math.random() * 100,
          rotation: Math.random() * 360,
          opacity: 0,
          duration: 2,
          ease: 'power2.out',
          delay: i * 0.1,
          onComplete: () => heart.remove()
        });
      }
    }

    setTimeout(onSend, 500);
  };

  const steps = [
    {
      title: "What's your name?",
      icon: <User className="w-6 h-6" />,
      content: (
        <input
          type="text"
          name="fromName"
          value={formData.fromName}
          onChange={handleInputChange}
          placeholder="Your beautiful name..."
          className="w-full px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-pink-200 focus:border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all duration-300 text-lg"
        />
      )
    },
    {
      title: "Who's the lucky one?",
      icon: <Heart className="w-6 h-6" />,
      content: (
        <input
          type="text"
          name="toName"
          value={formData.toName}
          onChange={handleInputChange}
          placeholder="Their wonderful name..."
          className="w-full px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-purple-200 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-lg"
        />
      )
    },
    {
      title: "Share your heart",
      icon: <MessageCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-4">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Pour your heart out... Tell them how you feel, what they mean to you, and why they're special. Let your emotions flow freely."
            rows={6}
            className="w-full px-6 py-4 rounded-2xl bg-white/70 backdrop-blur-sm border border-indigo-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-lg resize-none"
          />
          <div className="text-right text-sm text-gray-500">
            {formData.message.length} characters
          </div>
        </div>
      )
    }
  ];

  return (
    <div ref={formRef} id="confession" className="max-w-2xl mx-auto">
      <div className="bg-white/40 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30">
        {/* Progress indicator */}
        <div className="form-step mb-8">
          <div className="flex justify-center space-x-4 mb-8">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-500 ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 scale-110'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Current step */}
        <div className="form-step space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white mb-4">
              {steps[currentStep].icon}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 font-dancing">
              {steps[currentStep].title}
            </h3>
          </div>
          
          {steps[currentStep].content}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
              }`}
            >
              Previous
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => {
                  const currentValue = Object.values(formData)[currentStep];
                  if (currentValue) {
                    setCurrentStep(currentStep + 1);
                  }
                }}
                disabled={!Object.values(formData)[currentStep]}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                  Object.values(formData)[currentStep]
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            ) : (
              <button
                ref={buttonRef}
                onClick={handleSend}
                disabled={!formData.fromName || !formData.toName || !formData.message}
                className={`group flex items-center space-x-3 px-8 py-4 rounded-xl font-medium text-lg transition-all duration-300 ${
                  formData.fromName && formData.toName && formData.message
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:shadow-xl transform hover:scale-105 hover:from-pink-600 hover:to-purple-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <span>Send with Love</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfessionForm;