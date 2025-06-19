import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function NavBar({ sectionRefs }) {
  const navBar = useRef(null);
  const logo = useRef(null);
  const menuItems = useRef([]);
  const menuToggle = useRef(null);
  const mobileMenu = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  gsap.registerPlugin(ScrollTrigger);

  // Initial animation with exact byhuy.com timing
  useEffect(() => {
    gsap.set(navBar.current, { opacity: 0 });
    gsap.set([logo.current, ...menuItems.current.filter(Boolean)], { 
      y: 20, 
      opacity: 0 
    });

    // Delayed entrance animation
    gsap.to(navBar.current, {
      opacity: 1,
      duration: 1,
      ease: "power4.out",
      delay: 2
    });

    gsap.to([logo.current, ...menuItems.current.filter(Boolean)], {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.08,
      ease: "power4.out",
      delay: 2.2
    });
  }, []);

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      gsap.set(mobileMenu.current, { display: "block" });
      gsap.fromTo(mobileMenu.current, 
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 0.4,
          ease: "power3.out"
        }
      );
    } else {
      gsap.to(mobileMenu.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => gsap.set(mobileMenu.current, { display: "none" })
      });
    }
  };

  return (
    <>
      <header
        ref={navBar}
        className="fixed top-0 left-0 right-0 z-[1000] py-5 md:py-8"
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6">
              <a 
                href="#hero" 
                ref={logo}
                className="text-base font-bold leading-snug tracking-[-0.02em] text-white"
              >
                By Prashant<sup className="text-xs">©</sup>
              </a>
              <span className="hidden sm:block text-base font-medium leading-snug text-slate-400 max-w-[14ch] lg:max-w-none">
                (Entrepreneur)
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center text-base text-slate-300">
              <ul className="flex items-center gap-1">
                {[
                  { name: 'Services', href: '#services' },
                  { name: 'Works', href: '#works' },
                  { name: 'About', href: '#about' },
                  { name: 'Testimonials', href: '#testimonials' },
                  { name: 'Contact', href: '#contact' }
                ].map((item, index) => (
                  <li key={item.name} className="flex items-center">
                    <a 
                      href={item.href}
                      ref={el => {
                        if (el) menuItems.current[index] = el;
                      }}
                      className="group relative block h-fit overflow-hidden font-medium px-2 py-1"
                    >
                      <span className="link1 block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                        {item.name}
                      </span>
                      <span className="link2 absolute top-full left-0 block px-2 py-1 transition-transform duration-300 ease-out group-hover:-translate-y-full">
                        {item.name}
                      </span>
                    </a>
                    {index < 4 && <span className="text-slate-400">,</span>}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              ref={menuToggle}
              onClick={toggleMobileMenu}
              className="lg:hidden flex flex-col justify-center items-center w-16 h-16 rounded-full bg-white/10 transition-transform duration-300 hover:scale-90"
              aria-label="Toggle mobile menu"
            >
              <span className={`w-7 h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
              <span className={`w-7 h-[2px] bg-white rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        ref={mobileMenu}
        className="fixed inset-0 z-[999] lg:hidden"
        style={{ display: 'none' }}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-xl">
          <div className="flex flex-col justify-center items-center h-full space-y-12">
            {['Services', 'Works', 'About', 'Testimonials', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={toggleMobileMenu}
                className="text-4xl font-light text-white hover:text-slate-300 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}