import React, { useEffect, useRef, useState } from 'react';

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const servicesRef = useRef([]);
  const subheadingRef = useRef(null);
  const descriptionRef = useRef(null);
  const [currentService, setCurrentService] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const loadGSAP = async () => {
      if (isMobile) return; // Skip GSAP on mobile for better performance

      const gsapScript = document.createElement('script');
      gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      gsapScript.async = true;
      document.head.appendChild(gsapScript);

      const scrollTriggerScript = document.createElement('script');
      scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
      scrollTriggerScript.async = true;
      document.head.appendChild(scrollTriggerScript);

      await new Promise((resolve) => {
        let loadedCount = 0;
        const checkLoaded = () => {
          loadedCount++;
          if (loadedCount === 2) resolve();
        };
        gsapScript.onload = checkLoaded;
        scrollTriggerScript.onload = checkLoaded;
      });

      if (window.gsap && window.ScrollTrigger) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        initAnimations();
      }
    };

    const initAnimations = () => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;

      gsap.registerEase("smoothInOut", "0.25, 0.46, 0.45, 0.94");
      gsap.registerEase("smoothOut", "0.16, 1, 0.3, 1");
      
      ScrollTrigger.refresh();

      const ctx = gsap.context((self) => {
        // Initial setup
        gsap.set(headingRef.current?.querySelectorAll('.char'), {
          y: 100,
          opacity: 0,
          rotationX: 90,
          scale: 0.9,
          transformOrigin: "bottom center"
        });
        
        gsap.set(subheadingRef.current, {
          y: 60,
          opacity: 0,
          scale: 0.95
        });
        
        gsap.set(descriptionRef.current?.querySelectorAll('.word'), {
          y: 40,
          opacity: 0,
          scale: 0.97
        });

        // Intro animations
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 15%',
            toggleActions: 'play none none reverse',
            scrub: false
          }
        });

        masterTl
          .to(headingRef.current?.querySelectorAll('.char'), {
            y: 0,
            opacity: 1,
            rotationX: 0,
            scale: 1,
            duration: 1.8,
            ease: "smoothOut",
            stagger: {
              amount: 1,
              from: "start",
              ease: "power2.out"
            }
          })
          .to(subheadingRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "smoothOut"
          }, '-=1.5')
          .to(descriptionRef.current?.querySelectorAll('.word'), {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "smoothOut",
            stagger: {
              amount: 0.6,
              ease: "power1.out"
            }
          }, '-=1');

        // Service transitions - cleaner and more precise
        const serviceScrollTrigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${services.length * 100}%`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const totalServices = services.length;
            const serviceProgress = progress * totalServices;
            const currentIndex = Math.floor(serviceProgress);
            const nextIndex = Math.min(currentIndex + 1, totalServices - 1);
            const localProgress = serviceProgress - currentIndex;
            
            setCurrentService(currentIndex);

            servicesRef.current.forEach((service, index) => {
              if (!service) return;

              let yPercent = 0;
              let opacity = 0;
              let scale = 1;
              let blur = 0;

              if (index === currentIndex) {
                // Current service
                yPercent = -localProgress * 30;
                opacity = 1 - localProgress * 0.5;
                scale = 1 - localProgress * 0.05;
                blur = localProgress * 2;
              } else if (index === nextIndex) {
                // Next service
                yPercent = (1 - localProgress) * 30;
                opacity = localProgress;
                scale = 0.95 + localProgress * 0.05;
                blur = (1 - localProgress) * 2;
              } else if (index < currentIndex) {
                // Previous services
                yPercent = -40;
                opacity = 0;
                scale = 0.95;
                blur = 3;
              } else {
                // Future services
                yPercent = 40;
                opacity = 0;
                scale = 0.95;
                blur = 3;
              }

              gsap.to(service, {
                yPercent: yPercent,
                opacity: opacity,
                scale: scale,
                filter: `blur(${blur}px)`,
                ease: "none",
                duration: 0.1
              });

              // Content visibility
              const contentElements = service.querySelectorAll('.service-content > *');
              const contentOpacity = opacity > 0.5 ? 1 : opacity * 2;
              const contentY = opacity > 0.5 ? 0 : (1 - opacity / 0.5) * 10;

              gsap.to(contentElements, {
                opacity: contentOpacity,
                y: contentY,
                ease: "none",
                duration: 0.5
              });
            });
          }
        });

        // Initialize service states
        servicesRef.current.forEach((service, index) => {
          if (!service) return;

          gsap.set(service, {
            yPercent: index === 0 ? 0 : 40,
            opacity: index === 0 ? 1 : 0,
            scale: index === 0 ? 1 : 0.95,
            filter: index === 0 ? 'blur(0px)' : 'blur(3px)'
          });

          if (index === 0) {
            gsap.set(service.querySelectorAll('.service-content > *'), {
              opacity: 1,
              y: 0
            });
          }
        });

        // Interactive background grid logic removed

      }, sectionRef);

      return () => ctx.revert();
    };

    if (!isMobile) {
      loadGSAP();
    }

    return () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, [isMobile]);

  // Mobile scroll handler
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const scrollPosition = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const scrollProgress = (scrollPosition - containerTop) / containerHeight;
      
      const serviceIndex = Math.min(
        Math.floor(scrollProgress * services.length),
        services.length - 1
      );
      
      setCurrentService(serviceIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const AnimatedText = ({ text, className = '', type = 'char' }) => {
    if (type === 'char') {
      return (
        <span className={className}>
          {text.split('').map((char, index) => (
            <span 
              key={index} 
              className="char inline-block will-change-transform" 
              style={{ 
                transformOrigin: 'bottom center',
                transformStyle: 'preserve-3d'
              }}
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
          <span key={index} className="word inline-block mr-2 will-change-transform">
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
      description: 'A website developed to captivate and convert can elevate your brand to new heights. My custom-coded sites are meticulously crafted to reflect your unique identity, delivering seamless experiences with a focus on animation—keeping your audience engaged and returning.',
      items: [
        { name: 'CMS Integration', desc: 'Seamless content management systems' },
        { name: 'Motion & Animations', desc: 'Engaging interactive experiences' },
        { name: '3D Development', desc: 'Immersive three-dimensional interfaces' }
      ],
      gradient: ''
    },
    {
      id: 2,
      number: '02',
      title: 'Web Design',
      description: 'Amplify your online presence with a website that truly connects with your audience\'s feelings and desires. I design stunning, high-converting sites that align with your business goals, helping you stand out and scale effectively.',
      items: [
        { name: 'Responsive Design', desc: 'Perfect on every device and screen' },
        { name: 'Wireframing', desc: 'Strategic layout and user flow planning' },
        { name: 'UX Writing', desc: 'Compelling copy that converts' }
      ],
      gradient: ''
    },
    {
      id: 3,
      number: '03',
      title: 'SEO Optimization',
      description: 'Your website deserves to be seen. I optimize your online presence to elevate your visibility in search results, helping your business attract the right audience and stand out in the digital landscape.',
      items: [
        { name: 'Technical SEO', desc: 'Behind-the-scenes optimization' },
        { name: 'On-Page Optimization', desc: 'Content and structure refinement' },
        { name: 'SEO Audits & Analysis', desc: 'Data-driven performance insights' }
      ],
      gradient: ''
    }
  ];

  return (
    <div className="bg-transparent text-white relative">
      {/* Intro Section */}
      <section 
        ref={sectionRef}
        className="bg-transparent py-20 px-6 lg:px-12 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <div className="lg:col-span-8">
              <h2 
                ref={headingRef}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-none text-white"
              >
                <AnimatedText text="Services" type="char" />
              </h2>
            </div>
            
            <div className="lg:col-span-4 flex flex-col justify-end">
              <div 
                ref={subheadingRef}
                className="text-gray-400 text-xs uppercase tracking-[0.3em] mb-6 font-medium"
              >
                What I Offer
              </div>
              
              <p 
                ref={descriptionRef}
                className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-300 font-light"
              >
                <AnimatedText 
                  text="Frustrated with websites that don't reflect your brand or drive growth? I craft premium web experiences that captivate and help you focus on growing your business."
                  type="word"
                />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Container */}
      <div 
        ref={containerRef} 
        className="relative bg-transparent w-full"
        style={{ minHeight: '100vh', height: '100vh' }} // Ensure full viewport height
      >
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={el => servicesRef.current[index] = el}
            className={`${isMobile ? 'relative min-h-screen py-20' : 'absolute top-0 left-0 w-full h-screen'} flex items-center bg-black`}
            style={{ 
              zIndex: services.length - index,
              display: isMobile ? (index === currentService ? 'flex' : 'none') : undefined
            }}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Service Header */}
                <div className="lg:col-span-5">
                  <div className="flex items-start mb-8 lg:mb-12">
                    <span className="service-number text-5xl sm:text-6xl lg:text-7xl font-black mr-4 lg:mr-6 text-white leading-none">
                      {service.number}
                    </span>
                    <div className="flex-1 service-content">
                      <h3 className="service-title text-2xl sm:text-3xl lg:text-5xl font-black leading-tight text-white mb-4">
                        {service.title}
                      </h3>
                      <div className="w-16 lg:w-20 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Service Content */}
                <div className="lg:col-span-7 service-content">
                  <div className="space-y-8">
                    <p className="service-description text-base sm:text-lg lg:text-xl leading-relaxed text-gray-200 font-light">
                      {service.description}
                    </p>
                    
                    <div className="space-y-4">
                      {service.items.map((item, itemIndex) => (
                        <div 
                          key={itemIndex}
                          className="service-item group"
                        >
                          <div className="flex items-start py-4 border-b border-gray-700/50 hover:border-gray-400/80 transition-colors duration-300">
                            <span className="text-xs sm:text-sm font-mono mr-4 sm:mr-6 mt-1 min-w-[2rem] sm:min-w-[2.5rem] text-white font-bold">
                              0{itemIndex + 1}
                            </span>
                            <div className="flex-1">
                              <h4 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-gray-100 transition-colors duration-300">
                                {item.name}
                              </h4>
                              <p className="text-gray-300 text-sm sm:text-base leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                                {item.desc}
                              </p>
                            </div>
                            <div className="w-0 group-hover:w-4 sm:group-hover:w-6 h-4 sm:h-6 bg-white rounded-full transition-all duration-300 ease-out ml-2 sm:ml-4"></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Call to Action */}
                    <div className="pt-4">
                      <button className="group px-5 sm:px-6 py-2 sm:py-3 bg-white text-black font-semibold text-sm sm:text-base rounded-full hover:shadow-lg hover:shadow-white/20 transition-all duration-300">
                        <span className="flex items-center">
                          Learn More
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50">
          <div className="flex space-x-3 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const container = containerRef.current;
                  if (!container) return;
                  
                  const scrollTo = container.offsetTop + (index / services.length) * container.offsetHeight;
                  window.scrollTo({
                    top: scrollTo,
                    behavior: 'smooth'
                  });
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentService === index 
                    ? 'bg-white scale-125' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
              ></button>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Progress Indicator */}
      {!isMobile && (
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
          <div className="flex flex-col space-y-3">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  const container = containerRef.current;
                  if (!container) return;
                  
                  const scrollTo = container.offsetTop + (index / services.length) * container.offsetHeight;
                  window.scrollTo({
                    top: scrollTo,
                    behavior: 'smooth'
                  });
                }}
                className={`w-1.5 h-6 rounded-full transition-all duration-300 ${
                  currentService === index 
                    ? 'bg-white scale-125' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
              ></button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesSection;