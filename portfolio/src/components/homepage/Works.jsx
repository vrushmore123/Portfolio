import ibgroup from "/src/assets/images/ib-group-desktop.webp";
import memento from "/src/assets/images/memento-desktop.webp";
import acc from "/src/assets/images/acc-square.webp";
import daddy from "/src/assets/images/godaddy-desktop.webp";
import sunnyside from "/src/assets/images/sunnyside-desktop.webp";
import Projects from "../ui/Projects";
import Heading from "../ui/Heading";
import { useState, useRef, useEffect } from "react";

export default function Works({ forwardedRef }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      id: 1,
      link: "https://musical-stroopwafel-1c2327.netlify.app/landing.html",
      img: ibgroup,
      alt: "IBGroup vietnam website mockup",
      name: "IBGroup Vietnam",
      type: "Web Design • Frontend Development",
      year: "2024",
      tools: "React • TailwindCSS • GSAP • Figma",
      category: "web-design",
      featured: true,
      description: "A modern corporate website with interactive animations and responsive design for Vietnam's leading business group."
    },
    {
      id: 2,
      link: "https://mementostudio.netlify.app/",
      img: memento,
      alt: "memento landing page mockup",
      name: "Memento Studio",
      type: "Creative Direction • Development",
      year: "2024",
      tools: "Next.js • Three.js • Framer Motion",
      category: "creative",
      featured: false,
      description: "An immersive portfolio website for a creative studio featuring 3D elements and smooth animations."
    },
    {
      id: 3,
      link: "https://realbusinessaccountants.netlify.app",
      img: acc,
      alt: "real business accountant project mockup",
      name: "Real Business Accountants",
      type: "Web Design • Full Stack Development",
      year: "2024",
      tools: "Vue.js • Node.js • MongoDB • Figma",
      category: "web-design",
      featured: false,
      description: "Professional accounting firm website with client portal and automated booking system."
    },
    {
      id: 4,
      link: "https://godaddyuiclone.netlify.app",
      img: daddy,
      alt: "godaddy clone page mockup",
      name: "GoDaddy UI Clone",
      type: "Frontend Challenge • UI Recreation",
      year: "2023",
      tools: "HTML • TailwindCSS • JavaScript",
      category: "frontend",
      featured: true,
      description: "Pixel-perfect recreation of GoDaddy's landing page with enhanced animations and interactions."
    },
    {
      id: 5,
      link: "https://sunnysidechallenge.netlify.app",
      img: sunnyside,
      alt: "sunnyside project mockup",
      name: "Sunnyside Agency",
      type: "Frontend Challenge • Responsive Design",
      year: "2023",
      tools: "HTML • SCSS • JavaScript",
      category: "frontend",
      featured: false,
      description: "Creative agency landing page with stunning visuals and smooth scroll animations."
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'web-design', label: 'Web Design', count: projects.filter(p => p.category === 'web-design').length },
    { id: 'creative', label: 'Creative', count: projects.filter(p => p.category === 'creative').length },
    { id: 'frontend', label: 'Frontend', count: projects.filter(p => p.category === 'frontend').length }
  ];

  const filteredProjects = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <section
      ref={forwardedRef}
      id="works"
      className="nav-change overflow-hidden my-[10%] relative"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
            left: '10%',
            top: '20%'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
            right: '15%',
            bottom: '10%'
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
          <Heading title="Featured Works" />
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mt-8 md:mt-0">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {filter.label}
                <span className="ml-2 text-xs opacity-70">({filter.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 ${
                project.featured ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.img}
                  alt={project.alt}
                  className="w-full h-64 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white text-black font-bold rounded-full transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-gray-100"
                  >
                    View Project →
                  </a>
                </div>

                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
                    ✨ Featured
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-mono text-blue-400">{project.year}</span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">{project.type}</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                  {project.name}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tools */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tools.split(' • ').map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="px-3 py-1 bg-white/10 text-xs rounded-full text-gray-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                {/* Project Link */}
                <div className="pt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium group-hover:underline transition-colors duration-300"
                  >
                    Explore Project
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="group px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-bold rounded-full border border-white/20 hover:border-white/40 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 transform hover:scale-105">
            <span className="flex items-center">
              View All Projects
              <svg className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
