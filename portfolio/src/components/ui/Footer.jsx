import { useState, useEffect } from 'react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function toTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const socialLinks = [
    { name: 'GitHub', icon: '⚡', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'Dribbble', icon: '🎨', url: '#' }
  ];

  const quickLinks = [
    'About', 'Projects', 'Experience', 'Contact', 'Blog', 'Resume'
  ];

  return (
    <footer className={`relative mt-20 bg-black text-white overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-pulse"
              style={{
                width: Math.random() * 4 + 1 + 'px',
                height: Math.random() * 4 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 2 + 's',
                animationDuration: (Math.random() * 3 + 2) + 's'
              }}
            />
          ))}
        </div>
      </div>

      {/* Gradient Border Top */}
      <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>

      <div className="relative z-10 px-6 py-12 max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="group">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-wider mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent group-hover:from-gray-400 group-hover:via-white group-hover:to-gray-400 transition-all duration-500">
                Huy Nguyen
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-white to-gray-600 group-hover:w-32 transition-all duration-300"></div>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Crafting digital experiences with passion and precision. 
              <span className="block mt-2 text-white font-semibold">
                Full-Stack Developer & UI/UX Designer
              </span>
            </p>

            {/* Live Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 hover:border-gray-600 transition-colors">
                <div className="text-2xl font-bold text-white">{currentTime.getFullYear()}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Current Year</div>
              </div>
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-800 hover:border-gray-600 transition-colors">
                <div className="text-2xl font-bold text-white">∞</div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Lines of Code</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-4">
              Navigate
            </h3>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={link}
                  href="#"
                  className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="group-hover:font-semibold">{link}</span>
                  <span className="opacity-0 group-hover:opacity-100 ml-2 transition-opacity duration-300">→</span>
                </a>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-wider text-white mb-4">
              Connect
            </h3>
            
            {/* Social Links */}
            <div className="space-y-3">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="flex items-center space-x-3 text-gray-400 hover:text-white transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </span>
                  <span className="group-hover:font-semibold">{social.name}</span>
                </a>
              ))}
            </div>

            {/* Contact Info */}
            <div className="pt-4 space-y-2 text-sm text-gray-400">
              <div className="hover:text-white transition-colors cursor-pointer">
                📧 hello@huynguyen.dev
              </div>
              <div className="hover:text-white transition-colors cursor-pointer">
                📍 Available worldwide
              </div>
              <div className="text-white font-mono text-xs">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          
          {/* Copyright & Credits */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-8 text-gray-400">
            <div className="flex items-center space-x-2">
              <span>&copy;</span>
              <span>{currentTime.getFullYear()}</span>
              <span className="font-bold uppercase text-white">Huy Nguyen</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span>Designed & Coded with</span>
              <span className="text-red-500 animate-pulse text-lg">❤️‍🔥</span>
              <span>& lots of</span>
              <span className="text-yellow-400">☕</span>
            </div>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={toTop}
            className="group relative flex items-center space-x-3 bg-white text-black px-6 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
          >
            <span className="group-hover:font-black transition-all duration-200">
              Back to Top
            </span>
            <div className="relative overflow-hidden">
              <svg
                className="w-6 h-6 -rotate-90 group-hover:-translate-y-8 transition-transform duration-500 ease-out"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.37114e-06 2.76541e-06L7.54022e-06 50L100 100L2.18557e-06 150L0 200L100 150L100 200L200 150V100V50L100 0V50L4.37114e-06 2.76541e-06ZM100 50L100 100L100 150L200 100L100 50Z"
                  fill="currentColor"
                />
              </svg>
              <svg
                className="w-6 h-6 -rotate-90 absolute top-8 left-0 group-hover:translate-y-0 translate-y-8 transition-transform duration-500 ease-out"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.37114e-06 2.76541e-06L7.54022e-06 50L100 100L2.18557e-06 150L0 200L100 150L100 200L200 150V100V50L100 0V50L4.37114e-06 2.76541e-06ZM100 50L100 100L100 150L200 100L100 50Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* Subtle Footer Message */}
        <div className="text-center mt-8 text-xs text-gray-600">
          <p>Built with React & Tailwind CSS • Optimized for performance • Always evolving</p>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
    </footer>
  );
}