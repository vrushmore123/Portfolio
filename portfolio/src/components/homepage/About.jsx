import { useEffect, useRef, useState } from "react";
import profileImg from "/src/assets/images/profile.webp";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import Heading from "../ui/Heading";

export default function About() {
  const profile = useRef(null);
  const aboutSection = useRef(null);
  const heading = useRef(null);
  const body = useRef(null);
  const imageContainer = useRef(null);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (aboutSection.current) {
      observer.observe(aboutSection.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Throttle mouse movement updates for better performance
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const timeline = [
    {
      year: "2019",
      title: "Journey Begins",
      description: "Started career in strategic consulting with focus on digital transformation",
      icon: "🚀",
      accentColor: "#FFFFFF",
      achievements: ["First consulting role", "Digital strategy certification", "Team collaboration"]
    },
    {
      year: "2020",
      title: "Major Breakthrough",
      description: "Led team of 8 in delivering $2M revenue optimization project",
      icon: "💼",
      accentColor: "#E5E5E5",
      achievements: ["Team leadership", "$2M project delivery", "Process optimization"]
    },
    {
      year: "2021",
      title: "Innovation Focus",
      description: "Specialized in emerging technologies and business applications",
      icon: "💡",
      accentColor: "#D4AF37",
      achievements: ["AI/ML integration", "Technology roadmaps", "Innovation workshops"]
    },
    {
      year: "2022",
      title: "Leadership Role",
      description: "Promoted to Senior Consultant, managing multiple portfolios",
      icon: "👑",
      accentColor: "#C0C0C0",
      achievements: ["Senior promotion", "Multi-client management", "Stakeholder relations"]
    },
    {
      year: "2023",
      title: "Global Recognition",
      description: "Recognized as Top Performer, awarded Excellence in Innovation",
      icon: "🏆",
      accentColor: "#F5F5F5",
      achievements: ["Excellence award", "Global recognition", "Industry speaking"]
    },
    {
      year: "2024",
      title: "Strategic Leader",
      description: "Leading transformational initiatives for Fortune 500 companies",
      icon: "⭐",
      accentColor: "#DAA520",
      achievements: ["Fortune 500 clients", "Digital transformation", "Strategic planning"]
    }
  ];

  const skills = [
    { name: "Strategic Thinking", percentage: 95, color: "#FFFFFF" },
    { name: "Project Management", percentage: 92, color: "#E5E5E5" },
    { name: "Business Analysis", percentage: 88, color: "#D4AF37" },
    { name: "Team Leadership", percentage: 90, color: "#C0C0C0" },
    { name: "Innovation", percentage: 87, color: "#F5F5F5" }
  ];

  const stats = [
    { label: "Years Experience", value: "5+", color: "#FFFFFF" },
    { label: "Projects Completed", value: "50+", color: "#E5E5E5" },
    { label: "Client Satisfaction", value: "98%", color: "#D4AF37" },
    { label: "Team Members Led", value: "25+", color: "#C0C0C0" }
  ];

  return (
    <section ref={aboutSection} className="bg-black text-white relative overflow-hidden">
      {/* Fixed Independent Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-float-independent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      {/* Cursor Glow - Lower Z-index to not affect particles */}
      <div 
        className="fixed pointer-events-none z-10 w-80 h-80 rounded-full opacity-8 transition-transform duration-150 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)',
          transform: `translate(${mousePosition.x - 160}px, ${mousePosition.y - 160}px) scale(0.8)`,
          willChange: 'transform'
        }}
      />

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center relative">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 animate-grid-move" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M0 0h1v60H0zm60 0v1H0V0h60zm0 60H0v-1h60v1zM0 30h60v1H0z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={`space-y-8 ${isVisible ? 'animate-slideInLeft' : 'opacity-0'}`}>
              <div className="space-y-4">
                <div className="text-white/40 text-sm uppercase tracking-[0.3em] font-medium animate-fadeInUp">
                  → About Me
                </div>
                <h1 className="text-5xl md:text-7xl font-black leading-[0.9] relative">
                  <span className="animate-text-reveal">Strategic</span>
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-white via-gray-300 to-yellow-600 bg-clip-text animate-gradient-x">
                    Consultant
                  </span>
                  
                  {/* Morphing Shape */}
                  <div className="absolute -right-20 top-0 w-32 h-32 opacity-20">
                    <div className="w-full h-full bg-gradient-to-r from-white to-gray-400 animate-morph-shape"></div>
                  </div>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-400 animate-width-expand"></div>
              </div>

              <p className="text-xl text-white/80 leading-relaxed max-w-lg animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
                Innovation catalyst transforming business challenges into strategic opportunities through data-driven solutions and cutting-edge technology.
              </p>

              {/* Glassmorphism Stats Grid */}
              <div className="grid grid-cols-2 gap-6 max-w-md">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 group animate-slideUp"
                    style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                  >
                    <div 
                      className="text-3xl font-black mb-1 group-hover:scale-110 transition-transform duration-300"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/60 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className={`relative ${isVisible ? 'animate-slideInRight' : 'opacity-0'}`}>
              <div className="relative overflow-hidden group">
                {/* Dynamic Geometric Frames */}
                <div className="absolute inset-0 border-4 border-white/20 transform rotate-3 group-hover:rotate-6 transition-transform duration-700"></div>
                <div className="absolute inset-0 border-4 border-gray-400/30 transform -rotate-3 group-hover:-rotate-6 transition-transform duration-700"></div>
                <div className="absolute inset-0 border-2 border-yellow-600/40 transform rotate-1 group-hover:rotate-2 transition-transform duration-500"></div>
                
                {/* Floating Badge */}
                <div className="absolute -top-8 -right-8 z-20 bg-black/80 backdrop-blur-sm border-2 border-white/30 px-6 py-3 transform rotate-12 hover:rotate-6 transition-all duration-500 opacity-0 animate-fadeInUp group-hover:scale-110" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
                  <div className="text-white text-sm font-bold">Strategic Consultant</div>
                  <div className="text-white/60 text-xs">Mumbai, India</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <img
                  ref={profile}
                  src={profileImg}
                  alt="Professional portrait"
                  className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  style={{ aspectRatio: '4/5' }}
                />

                {/* Dynamic Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Scanning Lines Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute w-full h-0.5 bg-white/60 animate-scan-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section with Independent Floating Cards */}
      <div className="py-20 px-6 lg:px-12 bg-gradient-to-b from-black via-gray-900 to-black relative">
        {/* Independent Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float-independent-small"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${5 + (i % 2)}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-black mb-16 text-center animate-text-glow">
            Core Competencies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="text-center group transform hover:scale-110 transition-all duration-500">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  {/* Glowing Ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 to-transparent animate-spin-slow group-hover:animate-pulse"></div>
                  
                  {/* Progress Circle */}
                  <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke={skill.color}
                      strokeWidth="8"
                      strokeDasharray={`${skill.percentage * 3.14} 314`}
                      className="transition-all duration-1000 ease-out animate-draw-circle"
                      strokeLinecap="round"
                      style={{ animationDelay: `${index * 0.2}s` }}
                    />
                  </svg>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-black group-hover:scale-125 transition-transform duration-300" style={{ color: skill.color }}>
                      {skill.percentage}%
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                  {skill.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Timeline Section */}
      <div className="py-20 px-6 lg:px-12 relative">
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 animate-pattern-shift" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20zM0 20c0-11.046 8.954-20 20-20v40c-11.046 0-20-8.954-20-20z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-black mb-16 text-center animate-text-glow">
            Professional Journey
          </h2>
          
          <div className="relative">
            {/* Enhanced Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-white via-gray-400 to-yellow-600 animate-pulse-glow"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`relative pl-20 cursor-pointer transition-all duration-500 group ${
                    currentExperience === index ? 'scale-105' : 'hover:scale-102'
                  }`}
                  onClick={() => setCurrentExperience(currentExperience === index ? -1 : index)}
                >
                  {/* Enhanced Timeline Dot */}
                  <div className="absolute left-6 w-6 h-6 rounded-full border-4 border-black transform -translate-x-1/2 group-hover:scale-125 transition-all duration-300 animate-pulse-dot"
                    style={{ backgroundColor: item.accentColor }}
                  >
                    <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: item.accentColor, opacity: 0.3 }}></div>
                  </div>
                  
                  <div className={`bg-black/50 backdrop-blur-sm border-2 border-white/10 hover:border-white/30 p-8 transition-all duration-500 rounded-xl group-hover:bg-white/5 ${
                    currentExperience === index ? 'border-white/50 bg-white/10' : ''
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                        <div>
                          <h3 className="text-2xl font-black text-white group-hover:text-gray-200 transition-colors duration-300">{item.title}</h3>
                          <span className="text-sm font-mono px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm" style={{ color: item.accentColor }}>
                            {item.year}
                          </span>
                        </div>
                      </div>
                      <svg 
                        className={`w-6 h-6 text-white/60 transition-all duration-300 ${
                          currentExperience === index ? 'rotate-180 text-white' : 'group-hover:text-white'
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    
                    <p className="text-white/80 mb-4 text-lg">{item.description}</p>
                    
                    {/* Enhanced Expandable Achievements */}
                    <div className={`overflow-hidden transition-all duration-700 ${
                      currentExperience === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="pt-4 border-t border-white/20">
                        <h6 className="text-sm font-bold text-white mb-3 uppercase tracking-wide">
                          Key Achievements:
                        </h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {item.achievements.map((achievement, achIndex) => (
                            <div key={achIndex} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 group/achievement">
                              <div 
                                className="w-3 h-3 rounded-full flex-shrink-0 group-hover/achievement:scale-125 transition-transform duration-300"
                                style={{ backgroundColor: item.accentColor }}
                              ></div>
                              <span className="text-sm text-white/70 group-hover/achievement:text-white transition-colors duration-300">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="py-20 px-6 lg:px-12 bg-gradient-to-r from-gray-900/20 via-black to-gray-900/20 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-white/5 to-transparent rounded-full animate-float-reverse"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-black mb-8 animate-text-glow">Let's Build Something Amazing</h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Ready to transform your vision into reality? Let's collaborate on your next strategic initiative.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://www.linkedin.com/in/prashant-sawant"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-gradient-to-r from-white to-gray-300 text-black font-bold border-2 border-transparent hover:from-transparent hover:to-transparent hover:text-white hover:border-white transition-all duration-500 transform hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10">Let's Connect →</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </a>
            <button className="group px-8 py-4 bg-transparent text-white font-bold border-2 border-white hover:bg-white hover:text-black transition-all duration-500 transform hover:scale-105 relative overflow-hidden">
              <span className="relative z-10">Download Resume</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes float-random {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-10px, -15px) scale(1.1); }
          50% { transform: translate(15px, -10px) scale(0.9); }
          75% { transform: translate(-5px, 10px) scale(1.05); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }

        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-180deg); }
        }

        @keyframes morph-shape {
          0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
          75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
        }

        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }

        @keyframes width-expand {
          from { width: 0; }
          to { width: 6rem; }
        }

        @keyframes text-reveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1, transform: translateY(0); }
        }

        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(255,255,255,0.3); }
          50% { text-shadow: 0 0 20px rgba(255,255,255,0.6), 0 0 30px rgba(255,255,255,0.4); }
        }

        @keyframes scan-line {
          0% { top: 0%; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        @keyframes pattern-shift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(255,255,255,0.3); }
          50% { box-shadow: 0 0 20px rgba(255,255,255,0.8), 0 0 30px rgba(255,255,255,0.6); }
        }

        @keyframes pulse-dot {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.2); }
        }

        @keyframes draw-circle {
          from { stroke-dasharray: 0 314; }
          to { stroke-dasharray: var(--dash-array) 314; }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes float-independent {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1); 
            opacity: 0.6; 
          }
          25% { 
            transform: translateY(-15px) translateX(5px) scale(1.1); 
            opacity: 1; 
          }
          50% { 
            transform: translateY(-8px) translateX(-8px) scale(0.9); 
            opacity: 0.8; 
          }
          75% { 
            transform: translateY(-20px) translateX(3px) scale(1.05); 
            opacity: 0.9; 
          }
        }

        @keyframes float-independent-small {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
            opacity: 0.3; 
          }
          33% { 
            transform: translate(-8px, -12px) scale(1.1); 
            opacity: 0.6; 
          }
          66% { 
            transform: translate(12px, -8px) scale(0.9); 
            opacity: 0.4; 
          }
        }

        .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
        .animate-slideInRight { animation: slideInRight 0.8s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.8s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-random { animation: float-random 4s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-reverse { animation: float-reverse 4s ease-in-out infinite reverse; }
        .animate-morph-shape { animation: morph-shape 8s ease-in-out infinite; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-width-expand { animation: width-expand 1s ease-out 0.5s both; }
        .animate-text-reveal { animation: text-reveal 0.8s ease-out 0.3s both; }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        .animate-scan-line { animation: scan-line 2s linear infinite; }
        .animate-grid-move { animation: grid-move 20s linear infinite; }
        .animate-pattern-shift { animation: pattern-shift 15s linear infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-pulse-dot { animation: pulse-dot 1.5s ease-in-out infinite; }
        .animate-draw-circle { animation: draw-circle 1s ease-out forwards; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-float-independent { animation: float-independent ease-in-out infinite; }
        .animate-float-independent-small { animation: float-independent-small ease-in-out infinite; }
      `}</style>
    </section>
  );
}