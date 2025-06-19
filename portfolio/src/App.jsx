import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import NavBar from "./components/ui/NavBar";
import Hero from "./components/homepage/Hero";
import Role from "./components/homepage/servicesection";
import About from "./components/homepage/About";
import Services from "./components/homepage/Services";
import Works from "./components/homepage/Works";
import Contact from "./components/homepage/Contact";
import Footer from "./components/ui/Footer";
// import Cursor from "./components/ui/Cursor";

const App = () => {
  gsap.registerPlugin(ScrollTrigger);

  const sectionRefs = useRef([]);
  const backgroundGridRef = useRef(null);
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
    // Interactive background grid
    const handleMouseMove = (e) => {
      if (!backgroundGridRef.current || isMobile) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth) - 0.5;
      const yPercent = (clientY / innerHeight) - 0.5;
      
      gsap.to(backgroundGridRef.current, {
        x: xPercent * -50,
        y: yPercent * -50,
        duration: 1,
        ease: "power2.out"
      });
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  // Custom debounce function since gsap.utils.debounce might not be available
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Enhanced ScrollTrigger setup with performance optimizations
  useEffect(() => {
    const sectionHeadings = document.querySelectorAll(".section-heading");

    sectionHeadings.forEach((heading) => {
      const headings = heading.querySelectorAll(".heading");

      headings.forEach((individualHeading) => {
        ScrollTrigger.create({
          trigger: heading,
          start: "top 550px",
          end: "bottom 550px",
          animation: gsap.to(individualHeading, {
            opacity: 1,
            y: 0,
            ease: "power4.out",
            duration: 1.2,
          }),
          toggleActions: "play none none none",
          once: true, // Performance optimization
        });
      });
    });

    // ScrollTrigger refresh with custom debouncing
    const debouncedRefresh = debounce(() => {
      ScrollTrigger.refresh();
    }, 250);

    window.addEventListener("resize", debouncedRefresh);

    return () => {
      window.removeEventListener("resize", debouncedRefresh);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-black text-white relative overflow-hidden smooth-scroll-container">
      <div
        ref={backgroundGridRef}
        className="fixed top-0 left-0 w-full h-full z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, white 0.5px, transparent 0.5px)`,
          backgroundSize: '40px 40px',
          width: 'calc(100% + 100px)',
          height: 'calc(100% + 100px)',
          top: '-50px',
          left: '-50px',
        }}
      ></div>
      <NavBar sectionRefs={sectionRefs.current} />{" "}
      {/* passing sectionRefs props to give access to Navbar, Navbar can then access the props which have access to the array of sectionRef and loop over it */}
      <Hero />
      <main className="px-5 md:px-10 xl:px-20 2xl:px-28">
        <Role forwardedRef={(el) => (sectionRefs.current[0] = el)} />{" "}
        {/* forwardedRef props to pass into the child component to access the ref, then this will go into the useRef array  */}
        <div id="about" className="scroll-anchor">
          <About />
        </div>
        <div id="services" className="scroll-anchor">
          <Services />
        </div>
        <div id="works" className="scroll-anchor">
          <Works forwardedRef={(el) => (sectionRefs.current[1] = el)} />
        </div>
        <div id="contact" className="scroll-anchor">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
