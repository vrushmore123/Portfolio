import { useState, useEffect, useRef } from "react";
import Heading from "../ui/Heading";

export default function Services() {
  const [activeSkill, setActiveSkill] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);



  const expertiseItems = [
    { name: "Strategic Consulting", level: 95, icon: "🎯", color: "#FFFFFF" },
    { name: "Project Management", level: 92, icon: "📊", color: "#E5E5E5" },
    { name: "Business Analysis", level: 88, icon: "📈", color: "#D4AF37" },
    { name: "Product Strategy", level: 90, icon: "🚀", color: "#C0C0C0" },
    { name: "Process Optimization", level: 85, icon: "⚡", color: "#F5F5F5" },
    { name: "Team Leadership", level: 93, icon: "👥", color: "#DAA520" },
    { name: "Agile Methodologies", level: 87, icon: "🔄", color: "#DCDCDC" },
    { name: "Revenue Growth", level: 89, icon: "💰", color: "#B8860B" },
  ];

  const toolBoxItems = [
    { name: "Strategic Planning", level: 94, icon: "🗺️", color: "#FFFFFF" },
    { name: "Agile & Scrum", level: 91, icon: "⚡", color: "#E5E5E5" },
    { name: "Risk Management", level: 86, icon: "🛡️", color: "#D4AF37" },
    { name: "Stakeholder Management", level: 88, icon: "🤝", color: "#C0C0C0" },
    { name: "Business Intelligence", level: 83, icon: "🧠", color: "#F5F5F5" },
    { name: "Process Improvement", level: 89, icon: "🔧", color: "#DAA520" },
    { name: "Change Management", level: 87, icon: "🔄", color: "#DCDCDC" },
    { name: "Performance Analytics", level: 92, icon: "📊", color: "#B8860B" },
  ];

  const SkillCard = ({ skill, index, isActive, onClick, section }) => (
    <div
      className={`group relative bg-black/60 backdrop-blur-sm border-2 border-white/10 hover:border-white/40 transition-all duration-700 cursor-pointer transform hover:scale-110 hover:-translate-y-4 ${
        isActive ? 'border-white/60 scale-105 -translate-y-2' : ''
      }`}
      onClick={onClick}
      style={{
        animationDelay: `${index * 0.1}s`,
        minHeight: '240px'
      }}
    >
      {/* Floating Particles Inside Card */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/60 rounded-full animate-card-particles"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Dynamic Accent Line with Glow */}
      <div 
        className="absolute top-0 left-0 w-full h-1 transition-all duration-500 group-hover:h-2 animate-glow-line"
        style={{ 
          backgroundColor: skill.color,
          boxShadow: `0 0 20px ${skill.color}60, 0 0 40px ${skill.color}30`
        }}
      ></div>

      {/* Corner Ornament */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-30 transition-all duration-500">
        <div className="w-8 h-8 border-2 border-r-0 border-b-0 transform rotate-45" style={{ borderColor: skill.color }}></div>
      </div>

      <div className="p-8 h-full flex flex-col relative z-10">
        <div className="flex items-center justify-between mb-6">
          <span className="text-4xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-icon-float">
            {skill.icon}
          </span>
          <span 
            className="text-2xl font-mono font-black group-hover:scale-110 transition-all duration-500 animate-percentage-glow" 
            style={{ 
              color: skill.color,
              textShadow: `0 0 20px ${skill.color}60`
            }}
          >
            {skill.level}%
          </span>
        </div>
        
        <h3 className="text-xl font-black text-white mb-6 flex-grow group-hover:text-gray-200 transition-colors duration-500 relative">
          {skill.name}
          <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-white to-transparent group-hover:w-full transition-all duration-700" style={{ backgroundColor: skill.color }}></div>
        </h3>
        
        {/* Enhanced Progress Bar */}
        <div className="relative h-3 bg-white/10 overflow-hidden rounded-full">
          <div 
            className="absolute top-0 left-0 h-full transition-all duration-1500 ease-out rounded-full"
            style={{ 
              width: isVisible ? `${skill.level}%` : '0%',
              backgroundColor: skill.color,
              boxShadow: `0 0 20px ${skill.color}60, inset 0 0 20px ${skill.color}40`
            }}
          />
          
          {/* Shimmer Effect */}
          <div 
            className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"
            style={{ 
              transform: isVisible ? 'translateX(300px)' : 'translateX(-50px)',
              transition: 'transform 2s ease-out 0.5s'
            }}
          />
        </div>

        {/* Glassmorphism Overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-lg"
          style={{ 
            background: `linear-gradient(135deg, ${skill.color}05 0%, transparent 50%, ${skill.color}05 100%)`
          }}
        ></div>
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="bg-black text-white py-20 px-6 lg:px-12 relative overflow-hidden" 
      aria-label="services"
    >
      {/* Optimized Interactive Cursor Glow */}
      <div 
        className="fixed pointer-events-none z-50 w-80 h-80 rounded-full opacity-6 transition-transform duration-150 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)',
          transform: `translate(${mousePosition.x - 160}px, ${mousePosition.y - 160}px) scale(0.7)`,
          willChange: 'transform'
        }}
      />

      {/* Fixed Animated Floating Particles - No mouse interaction */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${8 + (i % 4) * 2}s`,
              opacity: 0.3 + (i % 4) * 0.15
            }}
          />
        ))}
      </div>

      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute inset-0 animate-grid-pulse" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M0 0h1v80H0zm80 0v1H0V0h80zm0 80H0v-1h80v1zM0 40h80v1H0z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="text-white/40 text-sm uppercase tracking-[0.3em] mb-6 font-medium animate-fade-up">
            → Expertise & Skills
          </div>
          <h2 className="text-6xl md:text-8xl font-black mb-8 relative">
            <span className="animate-text-slide-in">What I</span>
            <br />
            <span className="text-transparent bg-gradient-to-r from-white via-gray-300 to-yellow-600 bg-clip-text animate-gradient-flow">
              Deliver
            </span>
            
            {/* Floating Geometric Shape */}
            <div className="absolute -right-16 top-4 w-24 h-24 opacity-15">
              <div className="w-full h-full bg-gradient-to-br from-white to-gray-400 animate-geometric-rotate"></div>
            </div>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-white via-gray-300 to-yellow-600 mx-auto animate-line-expand"></div>
        </div>
        
        <div className="space-y-32">
          {/* Strategic Expertise Section */}
          <div className="space-y-12">
            <div className="text-center max-w-4xl mx-auto relative">
              {/* Section Background Glow */}
              <div className="absolute -inset-20 bg-gradient-to-r from-transparent via-white/2 to-transparent rounded-full opacity-0 animate-section-glow"></div>
              
              <h3 className="text-4xl md:text-6xl font-black text-white mb-6 animate-text-reveal-up">
                Strategic Expertise
              </h3>
              <p className="text-xl text-white/80 leading-relaxed animate-fade-up" style={{ animationDelay: '0.3s' }}>
                Transforming business challenges into strategic opportunities through innovative consulting and proven methodologies.
              </p>
              
              {/* Decorative Elements */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/20 animate-pulse-line"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {expertiseItems.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  index={index}
                  isActive={activeSkill === `expertise-${index}`}
                  onClick={() => setActiveSkill(activeSkill === `expertise-${index}` ? null : `expertise-${index}`)}
                  section="expertise"
                />
              ))}
            </div>
          </div>

          {/* Consulting Toolkit Section */}
          <div className="space-y-12">
            <div className="text-center max-w-4xl mx-auto relative">
              {/* Section Background Glow */}
              <div className="absolute -inset-20 bg-gradient-to-r from-transparent via-white/2 to-transparent rounded-full opacity-0 animate-section-glow"></div>
              
              <h3 className="text-4xl md:text-6xl font-black text-white mb-6 animate-text-reveal-up">
                Consulting Toolkit
              </h3>
              <p className="text-xl text-white/80 leading-relaxed animate-fade-up" style={{ animationDelay: '0.3s' }}>
                Leveraging cutting-edge tools and methodologies to deliver exceptional results and drive sustainable growth.
              </p>
              
              {/* Decorative Elements */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-white/20 animate-pulse-line"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {toolBoxItems.map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  index={index}
                  isActive={activeSkill === `toolkit-${index}`}
                  onClick={() => setActiveSkill(activeSkill === `toolkit-${index}` ? null : `toolkit-${index}`)}
                  section="toolkit"
                />
              ))}
            </div>
          </div>

          {/* Enhanced Stats Section */}
          <div className="relative">
            {/* Stats Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 animate-pattern-flow" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M50 50c0 27.614-22.386 50-50 50v-100c27.614 0 50 22.386 50 50zM0 50c0-27.614 22.386-50 50-50v100c-27.614 0-50-22.386-50-50z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '100px 100px'
              }}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { label: "Projects Completed", value: "50+", color: "#FFFFFF" },
                { label: "Client Satisfaction", value: "98%", color: "#E5E5E5" },
                { label: "Years Experience", value: "5+", color: "#D4AF37" },
                { label: "Team Members Led", value: "25+", color: "#C0C0C0" }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="group text-center p-8 bg-black/60 backdrop-blur-sm border-2 border-white/10 hover:border-white/40 transition-all duration-700 transform hover:scale-110 hover:-translate-y-4 relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {/* Floating Mini Particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/40 rounded-full animate-mini-float"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${Math.random() * 2}s`,
                          animationDuration: `${2 + Math.random() * 2}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Top Accent Line */}
                  <div 
                    className="absolute top-0 left-0 w-full h-1 transition-all duration-500 group-hover:h-2"
                    style={{ 
                      backgroundColor: stat.color,
                      boxShadow: `0 0 15px ${stat.color}60`
                    }}
                  ></div>

                  <div 
                    className="text-5xl font-black mb-2 group-hover:scale-125 transition-all duration-500 animate-stat-glow" 
                    style={{ 
                      color: stat.color,
                      textShadow: `0 0 30px ${stat.color}50`
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-white/80 uppercase tracking-wide text-sm group-hover:text-white transition-colors duration-500">
                    {stat.label}
                  </div>

                  {/* Glassmorphism Overlay */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700"
                    style={{ 
                      background: `linear-gradient(135deg, ${stat.color}05 0%, transparent 50%, ${stat.color}05 100%)`
                    }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes card-particles {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          25% { transform: translate(-5px, -8px) scale(1.2); opacity: 1; }
          50% { transform: translate(8px, -5px) scale(0.8); opacity: 0.8; }
          75% { transform: translate(-3px, 5px) scale(1.1); opacity: 0.9; }
        }

        @keyframes glow-line {
          0%, 100% { box-shadow: 0 0 20px currentColor; }
          50% { box-shadow: 0 0 40px currentColor, 0 0 60px currentColor; }
        }

        @keyframes icon-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
        }

        @keyframes percentage-glow {
          0%, 100% { text-shadow: 0 0 20px currentColor; }
          50% { text-shadow: 0 0 40px currentColor, 0 0 60px currentColor; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100px); }
          100% { transform: translateX(400px); }
        }

        @keyframes particle-drift {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          25% { transform: translate(-15px, -20px) scale(1.3); opacity: 0.8; }
          50% { transform: translate(20px, -15px) scale(0.7); opacity: 0.6; }
          75% { transform: translate(-8px, 15px) scale(1.1); opacity: 0.7; }
        }

        @keyframes grid-pulse {
          0%, 100% { opacity: 0.03; transform: scale(1); }
          50% { opacity: 0.08; transform: scale(1.02); }
        }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes text-slide-in {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes gradient-flow {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }

        @keyframes geometric-rotate {
          0%, 100% { 
            transform: rotate(0deg); 
            border-radius: 20% 80% 30% 70% / 50% 60% 40% 50%; 
          }
          25% { 
            transform: rotate(90deg); 
            border-radius: 80% 20% 70% 30% / 40% 50% 60% 50%; 
          }
          50% { 
            transform: rotate(180deg); 
            border-radius: 40% 60% 50% 50% / 60% 30% 70% 40%; 
          }
          75% { 
            transform: rotate(270deg); 
            border-radius: 60% 40% 30% 70% / 50% 70% 30% 60%; 
          }
        }

        @keyframes line-expand {
          from { width: 0; opacity: 0; }
          to { width: 8rem; opacity: 1; }
        }

        @keyframes section-glow {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        @keyframes text-reveal-up {
          from { opacity: 0; transform: translateY(40px) rotateX(20deg); }
          to { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }

        @keyframes pulse-line {
          0%, 100% { width: 4rem; opacity: 0.2; }
          50% { width: 6rem; opacity: 0.6; }
        }

        @keyframes pattern-flow {
          0% { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(100px, 100px) rotate(360deg); }
        }

        @keyframes stat-glow {
          0%, 100% { text-shadow: 0 0 30px currentColor; }
          50% { text-shadow: 0 0 50px currentColor, 0 0 80px currentColor; }
        }

        @keyframes mini-float {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          50% { transform: translate(-5px, -8px) scale(1.3); opacity: 0.8; }
        }

        @keyframes particle-uniform {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          25% { transform: translate(-10px, -15px) scale(1.2); opacity: 0.8; }
          50% { transform: translate(15px, -10px) scale(0.8); opacity: 0.6; }
          75% { transform: translate(-5px, 12px) scale(1.1); opacity: 0.7; }
        }

        @keyframes particle-float {
          0% { transform: translate(0, 0); opacity: 0.3; }
          25% { transform: translate(-20px, -30px); opacity: 0.8; }
          50% { transform: translate(30px, -20px); opacity: 0.5; }
          75% { transform: translate(-15px, 25px); opacity: 0.7; }
          100% { transform: translate(0, 0); opacity: 0.3; }
        }

        .animate-card-particles { animation: card-particles 3s ease-in-out infinite; }
        .animate-glow-line { animation: glow-line 2s ease-in-out infinite; }
        .animate-icon-float { animation: icon-float 3s ease-in-out infinite; }
        .animate-percentage-glow { animation: percentage-glow 2.5s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s linear infinite; }
        .animate-particle-drift { animation: particle-drift 5s ease-in-out infinite; }
        .animate-grid-pulse { animation: grid-pulse 4s ease-in-out infinite; }
        .animate-fade-up { animation: fade-up 0.8s ease-out; }
        .animate-text-slide-in { animation: text-slide-in 0.8s ease-out; }
        .animate-gradient-flow { animation: gradient-flow 4s ease infinite; }
        .animate-geometric-rotate { animation: geometric-rotate 12s ease-in-out infinite; }
        .animate-line-expand { animation: line-expand 1s ease-out 0.8s both; }
        .animate-section-glow { animation: section-glow 6s ease-in-out infinite; }
        .animate-text-reveal-up { animation: text-reveal-up 0.8s ease-out; }
        .animate-pulse-line { animation: pulse-line 3s ease-in-out infinite; }
        .animate-pattern-flow { animation: pattern-flow 30s linear infinite; }
        .animate-stat-glow { animation: stat-glow 3s ease-in-out infinite; }
        .animate-mini-float { animation: mini-float 2.5s ease-in-out infinite; }
        .animate-particle-float { animation: particle-float ease-in-out infinite; }
        .animate-particle-uniform { animation: particle-uniform ease-in-out infinite; }
      `}</style>
    </section>
  );
}

