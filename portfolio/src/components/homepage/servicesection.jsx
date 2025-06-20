import React, { useEffect, useRef, useState } from 'react';

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      // Check if section is in view
      const inView = sectionTop < windowHeight && sectionTop > -sectionHeight * 0.5;
      setIsInView(inView);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Continuous card cycling when in view
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveCardIndex(prev => (prev + 1) % 3);
    }, 4000); // Change card every 5 seconds

    return () => clearInterval(interval);
  }, [isInView]);

  const AnimatedText = ({ text, className = '', type = 'char' }) => {
    if (type === 'char') {
      return (
        <span className={className}>
          {text.split('').map((char, index) => (
            <span 
              key={index} 
              className="char inline-block animate-char-reveal"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </span>
      );
    }
    
    return (
      <span className={className}>
        {text.split(' ').map((word, index) => (
          <span key={index} className="word inline-block mr-2 animate-word-reveal" style={{ animationDelay: `${index * 0.08}s` }}>
            {word}
          </span>
        ))}
      </span>
    );
  };

  const services = [
    {
      id: 1,
      number: '01',
      title: 'Web Development',
      description: 'Building high-performance, scalable web applications with cutting-edge technologies. From concept to deployment, creating digital solutions that drive exponential growth.',
      items: [
        { name: 'Frontend Mastery', desc: 'React, Next.js, Vue.js with lightning performance' },
        { name: 'Backend Excellence', desc: 'Node.js, Python, advanced databases & APIs' },
        { name: 'DevOps Revolution', desc: 'CI/CD pipelines, cloud architecture, monitoring' }
      ],
      icon: '⚡',
      accentColor: '#00F5FF',
      shadowColor: 'rgba(0, 245, 255, 0.4)',
      gradientFrom: '#001a1f',
      gradientTo: '#003d4a'
    },
    {
      id: 2,
      number: '02',
      title: 'UI/UX Design',
      description: 'Crafting extraordinary user experiences that captivate and convert. Every pixel is strategically placed to maximize engagement and drive meaningful interactions.',
      items: [
        { name: 'User Psychology', desc: 'Deep behavioral analysis and user journey mapping' },
        { name: 'Visual Innovation', desc: 'Cutting-edge designs with micro-interactions' },
        { name: 'Prototype Mastery', desc: 'Interactive prototypes with real-time testing' }
      ],
      icon: '🎯',
      accentColor: '#FF0080',
      shadowColor: 'rgba(255, 0, 128, 0.4)',
      gradientFrom: '#1a0010',
      gradientTo: '#4a0030'
    },
    {
      id: 3,
      number: '03',
      title: 'Digital Strategy',
      description: 'Revolutionary digital transformation strategies that redefine industries. From disruption to domination, we architect the future of your digital presence.',
      items: [
        { name: 'Market Domination', desc: 'Competitive intelligence and market positioning' },
        { name: 'Tech Innovation', desc: 'Future-proof technology stack and architecture' },
        { name: 'Growth Hacking', desc: 'Exponential growth strategies and optimization' }
      ],
      icon: '🚀',
      accentColor: '#FFD700',
      shadowColor: 'rgba(255, 215, 0, 0.4)',
      gradientFrom: '#1f1a00',
      gradientTo: '#4a3d00'
    }
  ];

  const getCardStyle = (index) => {
    const isActive = index === activeCardIndex;
    const isPrevious = index < activeCardIndex;
    const isFuture = index > activeCardIndex;
    
    if (isFuture) {
      return {
        opacity: 0,
        transform: `translateY(100vh) scale(0.8)`,
        zIndex: 10 - index,
        filter: 'blur(10px)'
      };
    }
    
    if (isPrevious) {
      const offset = (activeCardIndex - index) * 50;
      return {
        opacity: Math.max(0.1, 1 - (activeCardIndex - index) * 0.3),
        transform: `translateY(-${offset}px) scale(${1 - (activeCardIndex - index) * 0.05})`,
        zIndex: 10 - (activeCardIndex - index),
        filter: `blur(${(activeCardIndex - index) * 2}px)`
      };
    }
    
    // Active card
    return {
      opacity: 1,
      transform: 'translateY(0px) scale(1)',
      zIndex: 20,
      filter: 'blur(0px)',
      transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
    };
  };

  return (
    <div className="bg-black text-white relative overflow-hidden">
      {/* Fixed Background Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-particle-float-fixed"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.15}s`,
              animationDuration: `${6 + (i % 4)}s`
            }}
          >
            <div 
              className="w-1 h-1 bg-gradient-to-r from-cyan-400 to-pink-400 rounded-full opacity-30 animate-pulse-glow"
              style={{
                boxShadow: '0 0 8px rgba(0,245,255,0.5)'
              }}
            />
          </div>
        ))}
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-3 pointer-events-none">
        <div 
          className="absolute inset-0 animate-grid-move" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300F5FF' fill-opacity='0.1'%3E%3Cpath d='M0 0h1v100H0zm100 0v1H0V0h100zm0 100H0v-1h100v1zM0 50h100v1H0z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative py-24 px-6 lg:px-12 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center">
            <div className="text-cyan-400 text-sm uppercase tracking-[0.4em] mb-6 font-medium animate-fade-in-up">
              → Extraordinary Solutions
            </div>
            
            <div className="relative mb-8">
              <h2 className="text-7xl sm:text-8xl md:text-9xl font-black leading-[0.85] relative z-10">
                <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
                  <AnimatedText text="SERVICES" type="char" />
                </span>
              </h2>
              
              {/* Glowing backdrop */}
              <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/20 via-pink-500/20 to-yellow-500/20 blur-3xl animate-pulse-slow -z-10"></div>
            </div>
            
            <div className="flex justify-center mb-8">
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-expand-line"></div>
            </div>
            
            <p className="text-xl sm:text-2xl leading-relaxed text-gray-300 font-light max-w-4xl mx-auto">
              <AnimatedText 
                text="Transforming visions into digital reality through innovative technology, strategic thinking, and exceptional craftsmanship."
                type="word"
              />
            </p>
          </div>
        </div>
      </section>

      {/* Services Cards Section with Continuous Animation */}
      <section 
        ref={sectionRef}
        className="relative py-20 px-6 lg:px-12"
      >
        <div 
          ref={cardsContainerRef}
          className="max-w-6xl mx-auto relative z-10"
        >
          {/* Progress Indicator */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-3">
              {services.map((_, index) => (
                <div
                  key={index}
                  className="w-3 h-3 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: index === activeCardIndex ? services[activeCardIndex].accentColor : 'rgba(255,255,255,0.3)',
                    boxShadow: index === activeCardIndex ? `0 0 15px ${services[activeCardIndex].shadowColor}` : 'none'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Cards Stack */}
          <div className="relative min-h-[80vh]">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="absolute inset-0 w-full"
                style={{
                  ...getCardStyle(index),
                  transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
                }}
              >
                {/* Card Container */}
                <div className="group relative backdrop-blur-xl border border-gray-700/50 hover:border-gray-500 transition-all duration-700 overflow-hidden rounded-2xl shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${service.gradientFrom} 0%, ${service.gradientTo} 50%, rgba(0,0,0,0.9) 100%)`,
                    boxShadow: `0 25px 50px -12px ${service.shadowColor}, inset 0 1px 0 rgba(255,255,255,0.1)`
                  }}
                >
                  
                  {/* Glowing Top Border */}
                  <div 
                    className="absolute top-0 left-0 w-full h-1 transition-all duration-500 group-hover:h-2"
                    style={{ 
                      background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)`,
                      boxShadow: `0 0 20px ${service.shadowColor}`
                    }}
                  ></div>

                  {/* Animated Border */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"
                    style={{
                      background: `linear-gradient(45deg, ${service.accentColor}20, transparent, ${service.accentColor}20)`,
                      backgroundSize: '200% 200%',
                      animation: 'gradient-shift 3s ease infinite'
                    }}
                  ></div>

                  {/* Card Content */}
                  <div className="relative z-10 p-8 lg:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      
                      {/* Left Side - Number & Icon */}
                      <div className="lg:col-span-3 text-center lg:text-left">
                        <div className="mb-6">
                          <span 
                            className="text-8xl lg:text-9xl font-black block transition-all duration-500 group-hover:scale-110"
                            style={{ 
                              background: `linear-gradient(135deg, ${service.accentColor}, ${service.accentColor}80)`,
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              textShadow: `0 0 30px ${service.shadowColor}`,
                              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))'
                            }}
                          >
                            {service.number}
                          </span>
                        </div>
                        <div 
                          className="text-6xl opacity-30 group-hover:opacity-60 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12"
                          style={{
                            filter: `drop-shadow(0 0 10px ${service.shadowColor})`
                          }}
                        >
                          {service.icon}
                        </div>
                      </div>

                      {/* Right Side - Content */}
                      <div className="lg:col-span-9">
                        
                        {/* Title */}
                        <h3 className="text-4xl lg:text-5xl font-black mb-6 text-white group-hover:text-gray-100 transition-all duration-500 relative">
                          <span style={{
                            background: `linear-gradient(135deg, #ffffff, ${service.accentColor}40)`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                          }}>
                            {service.title}
                          </span>
                          <div 
                            className="absolute -bottom-2 left-0 w-0 h-1 group-hover:w-full transition-all duration-700 rounded-full"
                            style={{ background: `linear-gradient(90deg, ${service.accentColor}, transparent)` }}
                          ></div>
                        </h3>

                        {/* Description */}
                        <p className="text-xl leading-relaxed text-gray-300 mb-8 group-hover:text-gray-200 transition-colors duration-500">
                          {service.description}
                        </p>

                        {/* Items Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                          {service.items.map((item, itemIndex) => (
                            <div key={itemIndex} className="group/item transform hover:translate-y-[-4px] transition-all duration-300">
                              <div className="p-4 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-gray-600/50 backdrop-blur-sm">
                                <div className="flex items-start space-x-3 mb-3">
                                  <div 
                                    className="w-3 h-3 rounded-full mt-2 flex-shrink-0 group-hover/item:scale-125 transition-all duration-300"
                                    style={{ 
                                      background: `linear-gradient(135deg, ${service.accentColor}, ${service.accentColor}80)`,
                                      boxShadow: `0 0 10px ${service.shadowColor}`
                                    }}
                                  ></div>
                                  <h4 className="text-white font-bold text-lg group-hover/item:text-gray-200 transition-colors duration-300">
                                    {item.name}
                                  </h4>
                                </div>
                                <p className="text-gray-400 text-sm group-hover/item:text-gray-300 transition-colors duration-300 pl-6">
                                  {item.desc}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-start">
                          <button 
                            className="group/btn flex items-center font-bold text-lg px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border transition-all duration-500 relative overflow-hidden backdrop-blur-sm"
                            style={{ 
                              color: service.accentColor,
                              borderColor: `${service.accentColor}40`,
                              boxShadow: `0 8px 32px ${service.shadowColor}`
                            }}
                          >
                            <span className="relative z-10">Explore Service</span>
                            <svg className="w-5 h-5 ml-3 group-hover/btn:translate-x-2 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            
                            {/* Button Hover Effect */}
                            <div 
                              className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-all duration-700"
                              style={{ background: `linear-gradient(90deg, transparent, ${service.accentColor}, transparent)` }}
                            ></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-all duration-700 pointer-events-none rounded-2xl"
                    style={{ 
                      background: `radial-gradient(circle at 50% 50%, ${service.accentColor} 0%, transparent 70%)`
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes char-reveal {
          from { opacity: 0; transform: translateY(20px) rotateX(45deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        
        @keyframes word-reveal {
          from { opacity: 0; transform: translateY(15px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes particle-float-fixed {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0.3; 
          }
          25% { 
            transform: translate(-20px, -25px) scale(1.3); 
            opacity: 0.7; 
          }
          50% { 
            transform: translate(25px, -20px) scale(0.8); 
            opacity: 0.4; 
          }
          75% { 
            transform: translate(-15px, 20px) scale(1.1); 
            opacity: 0.6; 
          }
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.8); }
        }

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(100px, 100px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }

        @keyframes expand-line {
          from { width: 0; opacity: 0; }
          to { width: 6rem; opacity: 1; }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-char-reveal { 
          animation: char-reveal 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-word-reveal { 
          animation: word-reveal 0.5s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up { 
          animation: fade-in-up 0.8s ease-out; 
        }
        
        .animate-particle-float-fixed { 
          animation: particle-float-fixed 6s ease-in-out infinite; 
        }
        
        .animate-pulse-glow { 
          animation: pulse-glow 3s ease-in-out infinite; 
        }
        
        .animate-grid-move { 
          animation: grid-move 30s linear infinite; 
        }
        
        .animate-pulse-slow { 
          animation: pulse-slow 4s ease-in-out infinite; 
        }
        
        .animate-expand-line { 
          animation: expand-line 1s ease-out 0.5s both; 
        }
      `}</style>
    </div>
  );
};

export default ServicesSection;