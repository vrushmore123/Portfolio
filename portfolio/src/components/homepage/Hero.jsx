import { gsap } from "gsap";
import { useRef, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const nameRef = useRef(null);
  const backgroundRef = useRef(null);
  const imageContainerRef = useRef(null);
  const largeTextRef = useRef([]);
  const availabilityRef = useRef(null);
  const ctaButtonsRef = useRef([]);
  const socialLinksRef = useRef([]);
  const availabilityBadgeRef = useRef(null);
  const arrowRef = useRef(null);
  const navLinksRef = useRef([]);
  const profileImageRef = useRef(null);
  const headerRef = useRef(null);
  const navRef = useRef([]);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    // Wait for next frame to ensure DOM elements are rendered
    const timer = setTimeout(() => {
      // Set initial states with null checks
      const elementsToAnimate = [titleRef.current, subtitleRef.current, nameRef.current].filter(Boolean);
      if (elementsToAnimate.length > 0) {
        gsap.set(elementsToAnimate, {
          y: 80,
          opacity: 0
        });
      }

      const largeTextElements = largeTextRef.current.filter(Boolean);
      if (largeTextElements.length > 0) {
        gsap.set(largeTextElements, {
          y: 100,
          opacity: 0
        });
      }

      const containerElements = [imageContainerRef.current, availabilityBadgeRef.current, profileImageRef.current].filter(Boolean);
      if (containerElements.length > 0) {
        gsap.set(containerElements, {
          opacity: 0,
          y: 50
        });
      }

      const socialElements = socialLinksRef.current.filter(Boolean);
      if (socialElements.length > 0) {
        gsap.set(socialElements, {
          x: -30,
          opacity: 0
        });
      }

      const navElements = [...navLinksRef.current, headerRef.current].filter(Boolean);
      if (navElements.length > 0) {
        gsap.set(navElements, {
          y: -20,
          opacity: 0
        });
      }

      const topElements = [availabilityRef.current, arrowRef.current].filter(Boolean);
      if (topElements.length > 0) {
        gsap.set(topElements, {
          y: 50,
          opacity: 0
        });
      }

      const buttonElements = ctaButtonsRef.current.filter(Boolean);
      if (buttonElements.length > 0) {
        gsap.set(buttonElements, {
          y: 50,
          opacity: 0,
          scale: 0.9
        });
      }

      // Main entrance animation sequence
      const tl = gsap.timeline({ delay: 0.3 });
      
      // Header and navigation
      if (headerRef.current) {
        tl.to(headerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out"
        });
      }

      if (navElements.length > 0) {
        tl.to(navRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power4.out"
        }, "-=0.6");
      }

      // Large name animation with character split effect
      if (largeTextElements.length > 0) {
        tl.to(largeTextElements, {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power4.out"
        }, "-=0.4");
      }

      // Profile image with scale effect
      if (profileImageRef.current) {
        tl.to(profileImageRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power4.out"
        }, "-=0.8");
      }

      // Arrow with bounce effect
      if (arrowRef.current) {
        tl.to(arrowRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, "-=0.6");
      }

      // Description text
      if (subtitleRef.current) {
        tl.to(subtitleRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out"
        }, "-=0.4");
      }

      // CTA Button with scale effect
      if (ctaButtonsRef.current[0]) {
        tl.to(ctaButtonsRef.current[0], {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)"
        }, "-=0.2");
      }

      // Availability badge
      if (availabilityBadgeRef.current) {
        tl.to(availabilityBadgeRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power4.out"
        }, "-=0.4");
      }

      // Text scroll animations
      if (heroRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            
            if (largeTextElements.length > 0) {
              gsap.to(largeTextElements, {
                y: progress * -80,
                opacity: Math.max(0, 1 - progress * 1.5),
                duration: 0.3
              });
            }

            const scrollElements = [subtitleRef.current, arrowRef.current].filter(Boolean);
            if (scrollElements.length > 0) {
              gsap.to(scrollElements, {
                y: progress * -50,
                opacity: Math.max(0, 1 - progress * 1.2),
                duration: 0.3
              });
            }

            const topScrollElements = [
              availabilityRef.current, 
              ...socialElements, 
              ctaButtonsRef.current[0],
              ...navElements
            ].filter(Boolean);
            
            if (topScrollElements.length > 0) {
              gsap.to(topScrollElements, {
                y: progress * -30,
                opacity: Math.max(0, 1 - progress * 1),
                duration: 0.3
              });
            }

            if (profileImageRef.current) {
              gsap.to(profileImageRef.current, {
                y: progress * -60,
                scale: 1 - progress * 0.1,
                duration: 0.3
              });
            }
          }
        });
      }

      // Mouse parallax effect
      const handleMouseMove = (e) => {
        if (!profileImageRef.current) return;
        
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX - innerWidth / 2) / innerWidth;
        const yPos = (clientY - innerHeight / 2) / innerHeight;
        
        gsap.to(profileImageRef.current, {
          rotationY: xPos * 8,
          rotationX: -yPos * 5,
          x: xPos * 20,
          y: yPos * 10,
          duration: 1.5,
          ease: "power2.out"
        });
      };

      // Button hover animations
      const setupButtonHover = () => {
        const button = ctaButtonsRef.current[0];
        if (button) {
          button.addEventListener('mouseenter', () => {
            gsap.to(button, {
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          button.addEventListener('mouseleave', () => {
            gsap.to(button, {
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      setupButtonHover();

      // Continuous floating animation for the image
      if (profileImageRef.current) {
        gsap.to(profileImageRef.current, {
          y: "+=10",
          duration: 3,
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut"
        });
      }

      // Arrow bounce animation
      if (arrowRef.current) {
        gsap.to(arrowRef.current, {
          x: 5,
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut"
        });
      }

      // Store cleanup function
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className=" min-h-screen bg-transparent ">
    
     
      {/* Hero Section */}
      <section 
        ref={heroRef}
        id="hero" 
        className="relative min-h-screen flex items-center justify-center pt-32 bg-transparent"
      >
        {/* Background */}
        <div ref={backgroundRef} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-transparent"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6">
            
            {/* Large Name */}
            <div className="text-center mb-16">
              <h1 
                ref={el => {
                  if (el && largeTextRef.current) {
                    largeTextRef.current[0] = el;
                  }
                }}
                className="text-[9rem] font-black text-white leading-[0.75] tracking-[-0.03em] select-none"
              >
                PRASHANT<span className="text-slate-400 text-[0.7em]">©</span>
              </h1>
             
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
              
              {/* Left Column - Arrow + Description + CTA */}
              <div className="lg:col-span-4 space-y-8 lg:pt-12">
                
                {/* Arrow */}
                <div 
                  ref={arrowRef}
                  className="hidden lg:block"
                >
                  <svg 
                    stroke="currentColor" 
                    fill="none" 
                    strokeWidth="1.5" 
                    viewBox="0 0 24 24" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-10 h-10 text-slate-400" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="7" y1="7" x2="17" y2="17"></line>
                    <polyline points="17 7 17 17 7 17"></polyline>
                  </svg>
                </div>

                {/* Description */}
                <p 
                  ref={subtitleRef}
                  className="text-xl text-slate-300 leading-relaxed font-medium max-w-sm"
                >
                  As a seasoned technology professional, I bring strategic acumen and creative thinking to empower teams in delivering innovative, market-leading solutions through strategic guidance and agile methodologies.
                </p>

                {/* CTA Button */}
                <div className="pt-6">
                  <button 
                    ref={el => {
                      if (el && ctaButtonsRef.current) {
                        ctaButtonsRef.current[0] = el;
                      }
                    }}
                    className="group relative flex items-center justify-center overflow-hidden rounded-full bg-white px-12 py-5 text-lg font-bold uppercase tracking-wide text-black hover:bg-gray-200 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    <span className="relative z-20 flex items-center gap-3">
                      SCHEDULE CONSULTATION 
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M7 17l10-10M7 7l10 10"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              {/* Center Column - Profile Image */}
              <div className="lg:col-span-4 flex justify-center">
                <div 
                  ref={profileImageRef}
                  className="relative"
                  style={{ transform: 'scale(0.9)' }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                    alt="Profile"
                    className="w-80 h-[480px] object-cover rounded-3xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/40 to-transparent"></div>
                  
            
                  
                 
                </div>
              </div>

              {/* Right Column - Availability */}
              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-start lg:pt-12">
                <div 
                  ref={availabilityBadgeRef}
                  className="text-left lg:text-right space-y-4"
                >
                  <div className="flex items-center gap-3 lg:justify-end">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="block text-lg font-mono font-medium uppercase tracking-wider text-slate-300">
                      AVAILABLE FOR STRATEGIC CONSULTING
                    </span>
                  </div>
                  <span className="block text-6xl lg:text-8xl font-black uppercase leading-none text-slate-700 tracking-tight">
                    JULY '25
                  </span>
                  
                  {/* Contact Info */}
                  <div className="pt-6 space-y-3 text-lg">
                    <div className="flex items-center gap-3 lg:justify-end">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-slate-300 font-medium">hello@prashant.dev</span>
                    </div>
                    <div className="flex items-center gap-3 lg:justify-end">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-slate-300 font-medium">Gothenburg, Sweden</span>
                    </div>
                    <div className="flex items-center gap-3 lg:justify-end">
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0v2a2 2 0 01-2 2H10a2 2 0 01-2-2V6" />
                      </svg>
                      <span className="text-slate-300 font-medium">Strategic Consultant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          
          </div>
        </div>
      </section>
    </div>
  );
}