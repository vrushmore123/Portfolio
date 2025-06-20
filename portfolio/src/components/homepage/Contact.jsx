import { Icon } from "@iconify/react";
import { useEffect, useState, useRef } from "react";
import Heading from "../ui/Heading";

export default function Contact() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [isFormFocused, setIsFormFocused] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const heading = useRef(null);
  const body = useRef(null);
  const contactSection = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: 'mdi:linkedin', 
      url: 'https://www.linkedin.com/in/vrushank-sawant',
      color: '#00FF88'
    },
    { 
      name: 'GitHub', 
      icon: 'mdi:github', 
      url: 'https://github.com/vrushanksawant',
      color: '#FF0080'
    },
    { 
      name: 'Dribbble', 
      icon: 'mdi:dribbble', 
      url: 'https://dribbble.com/vrushank',
      color: '#FFFF00'
    },
    { 
      name: 'Twitter', 
      icon: 'mdi:twitter', 
      url: 'https://twitter.com/vrushansawant',
      color: '#FF4500'
    }
  ];

  return (
    <section
      id="contact"
      className="bg-black text-white relative overflow-hidden my-[10%]"
      aria-label="contact me"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h1v40H0zm40 0v1H0V0h40zm0 40H0v-1h40v1zM0 20h40v1H0z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <div className="text-white/60 text-sm uppercase tracking-[0.3em] mb-6 font-medium">
            → Get In Touch
          </div>
          <h2 className="text-6xl md:text-8xl font-black mb-8">
            Let's Create
            <br />
            <span className="text-transparent bg-gradient-to-r from-[#00FF88] to-[#FF0080] bg-clip-text">
              Together
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00FF88] to-[#FF0080] mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-white">
                Ready to Start Your Project?
              </h3>
              <p className="text-xl text-white/80 leading-relaxed">
                I'm currently available for new projects and collaborations. Let's discuss how we can bring your vision to life.
              </p>
            </div>

            <form
              name="contact"
              action="/contact"
              method="POST"
              className="space-y-8"
              onFocus={() => setIsFormFocused(true)}
              onBlur={() => setIsFormFocused(false)}
            >
              <input type="hidden" name="form-name" value="contact"/>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group relative">
                  <input
                    required
                    type="text"
                    id="name"
                    name="name"
                    className="peer w-full bg-transparent border-2 border-white/20 focus:border-[#00FF88] text-white px-4 py-4 text-lg placeholder-transparent focus:outline-none transition-all duration-300"
                    placeholder="Your name"
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                  />
                  <label
                    htmlFor="name"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      activeField === 'name' ? '-top-2 text-sm text-[#00FF88]' : 'top-4 text-base text-white/60'
                    }`}
                  >
                    Your Name
                  </label>
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-[#00FF88] transition-all duration-300 ${
                    activeField === 'name' ? 'w-full' : 'w-0'
                  }`}></div>
                </div>
                
                <div className="group relative">
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    className="peer w-full bg-transparent border-2 border-white/20 focus:border-[#FF0080] text-white px-4 py-4 text-lg placeholder-transparent focus:outline-none transition-all duration-300"
                    placeholder="Your email"
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                  />
                  <label
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                      activeField === 'email' ? '-top-2 text-sm text-[#FF0080]' : 'top-4 text-base text-white/60'
                    }`}
                  >
                    Your Email
                  </label>
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-[#FF0080] transition-all duration-300 ${
                    activeField === 'email' ? 'w-full' : 'w-0'
                  }`}></div>
                </div>
              </div>
              
              <div className="group relative">
                <textarea
                  required
                  id="message"
                  name="message"
                  rows="6"
                  className="peer w-full bg-transparent border-2 border-white/20 focus:border-[#FFFF00] text-white px-4 py-4 text-lg placeholder-transparent focus:outline-none resize-none transition-all duration-300"
                  placeholder="Your message"
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                ></textarea>
                <label
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    activeField === 'message' ? '-top-2 text-sm text-[#FFFF00]' : 'top-4 text-base text-white/60'
                  }`}
                >
                  Your Message
                </label>
                <div className={`absolute bottom-0 left-0 h-0.5 bg-[#FFFF00] transition-all duration-300 ${
                  activeField === 'message' ? 'w-full' : 'w-0'
                }`}></div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00FF88] to-[#FF0080] text-black font-black text-lg py-4 border-2 border-transparent hover:bg-transparent hover:text-white hover:border-white transition-all duration-300 transform hover:scale-105"
              >
                SEND MESSAGE →
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-12">
            {/* Contact Details */}
            <div className="space-y-6">
              <h4 className="text-2xl font-black text-white border-l-4 border-[#00FF88] pl-4">
                Contact Details
              </h4>
              <div className="space-y-6">
                <a
                  href="mailto:hello@vrushank.dev"
                  className="group flex items-center space-x-4 text-white/80 hover:text-white transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-black border-2 border-[#00FF88] flex items-center justify-center group-hover:bg-[#00FF88] group-hover:text-black transition-all duration-300">
                    <Icon icon="mdi:email" className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60 uppercase tracking-wide">Email</div>
                    <div className="text-lg font-bold">hello@vrushank.dev</div>
                  </div>
                </a>
                <a
                  href="tel:+919876543210"
                  className="group flex items-center space-x-4 text-white/80 hover:text-white transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-black border-2 border-[#FF0080] flex items-center justify-center group-hover:bg-[#FF0080] group-hover:text-black transition-all duration-300">
                    <Icon icon="mdi:phone" className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60 uppercase tracking-wide">Phone</div>
                    <div className="text-lg font-bold">+91 98765 43210</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-6">
              <h4 className="text-2xl font-black text-white border-l-4 border-[#FFFF00] pl-4">
                Connect Online
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group p-6 bg-black border-2 border-white/20 hover:border-white/60 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <Icon 
                        icon={social.icon} 
                        className="w-8 h-8 transition-colors duration-300" 
                        style={{ color: social.color }}
                      />
                      <span className="text-sm font-bold text-white">{social.name}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="space-y-6">
              <h4 className="text-2xl font-black text-white border-l-4 border-[#FF4500] pl-4">
                Location
              </h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black border-2 border-[#FF4500] flex items-center justify-center">
                    <Icon icon="mdi:map-marker" className="w-6 h-6" style={{ color: '#FF4500' }} />
                  </div>
                  <div>
                    <div className="text-sm text-white/60 uppercase tracking-wide">Based in</div>
                    <div className="text-lg font-bold text-white">Mumbai, India</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-black border-2 border-[#00BFFF] flex items-center justify-center">
                    <Icon icon="mdi:clock" className="w-6 h-6" style={{ color: '#00BFFF' }} />
                  </div>
                  <div>
                    <div className="text-sm text-white/60 uppercase tracking-wide">Local Time</div>
                    <div className="text-lg font-bold text-white font-mono">{time}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}