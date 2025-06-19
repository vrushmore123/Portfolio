import { useEffect, useRef } from "react";
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

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Set initial states for animations
    const bodyParas = gsap.utils.toArray(body.current.children);
    gsap.set([heading.current, ...bodyParas], { 
      y: 30, 
      opacity: 0 
    });

    // Create a master timeline for all animations
    const masterTl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection.current,
        start: "top 20%",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing effect
        pin: imageContainer.current, // Pin the image container
        pinSpacing: false, // Don't add extra space
        anticipatePin: 1 // Improves pin performance
      }
    });

    // Heading animation
    masterTl.to(heading.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });

    // Staggered paragraph animations based on scroll position
    bodyParas.forEach((para, index) => {
      masterTl.to(para, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.1"); // Slight overlap for smoother transitions
    });

    // Add fade out animation for paragraphs as they scroll out of view
    bodyParas.forEach((para, index) => {
      ScrollTrigger.create({
        trigger: para,
        start: "top 20%",
        end: "bottom 10%",
        onLeave: () => {
          gsap.to(para, { 
            opacity: 0.3, 
            y: -20,
            duration: 0.5 
          });
        },
        onEnterBack: () => {
          gsap.to(para, { 
            opacity: 1, 
            y: 0,
            duration: 0.5 
          });
        }
      });
    });

    // Profile image animation - subtle zoom and shadow effect
    gsap.from(profile.current, {
      scale: 1.1,
      boxShadow: "0 20px 80px rgba(0,0,0,0.2)",
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: imageContainer.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Clean up all ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill(true));
    };
  }, []);

  return (
    <section ref={aboutSection} aria-label="about me" className="relative">
      <Heading title="about me" />
      <div className="mt-10 flex flex-col items-start gap-8 md:flex-row lg:gap-10">
        <div ref={imageContainer} className="top-28 overflow-hidden rounded-md md:sticky md:w-1/2 h-max">
          <img
            ref={profile}
            loading="lazy"
            className="aspect-square h-auto w-full rounded-md object-cover object-center md:aspect-auto will-change-transform grayscale hover:grayscale-0 transition-all duration-500"
            src={profileImg}
            width="600"
            height="800"
            alt="professional portrait"
          />
        </div>
        <div className="top-20 sm:sticky md:top-28 lg:top-32 md:w-1/2">
          <div className="w-full space-y-8 2xl:space-y-10">
            <h3
              ref={heading}
              className="text-heading-3 2xl:text-7xl font-semibold leading-tight text-white will-change-transform"
            >
              Strategic Technology Consultant & Innovation Catalyst
            </h3>
            <div ref={body} className="space-y-8">
              <p className="text-body-1 2xl:text-4xl text-gray-300">
                As a seasoned professional in the technology sphere, I bring to the forefront a unique blend of strategic acumen and creative thinking, fueled by robust negotiation skills, exceptional interpersonal abilities, and effective communication.
              </p>
              
              <p className="text-body-1 2xl:text-4xl text-gray-300">
                My role, as a strategic catalyst, is to empower product owners, project managers, and business stakeholders, enhancing their capacity to deliver innovative, market-leading solutions. I leverage extensive industry experience and technological trend awareness to guide teams through modern project landscapes.
              </p>
              
              <p className="text-body-1 2xl:text-4xl text-gray-300">
                From orchestrating resource allocation and optimizing processes to aligning goals and driving revenue growth, my approach is holistic and pivots on the principle of 'best fit'. I tailor solutions to match unique project requirements while integrating agile methodologies for flexibility and timely delivery.
              </p>
              
              <p className="text-body-1 2xl:text-4xl text-gray-300">
                My creative acuity enables me to synthesize diverse information into compelling strategic visions that drive decision-making and successful outcomes. I thrive in devising innovative solutions to complex problems, contributing to both visionary and execution aspects of business strategies.
              </p>
              
              <p className="text-body-1 2xl:text-4xl text-gray-300">
                For product owners, I assist in defining vision and strategic goals while navigating product lifecycles. For project managers, I establish efficient workflows, manage risks, and foster continuous improvement. My ability to identify opportunities and harness resources translates into substantial organizational value.
              </p>
              
              <p className="text-body-1 2xl:text-4xl text-gray-300">
                My understanding of business dynamics and relationship-building skills transform potential conflicts into win-win situations. I nurture environments that encourage open communication, bridging gaps and fostering collaborative synergy toward common goals.
              </p>
              
              <p className="text-body-1 2xl:text-4xl text-gray-300">
                In essence, I harmonize creativity, strategy, negotiation, collaboration, vision, and execution to transform visions into tangible realities that drive businesses to new heights. 🚀
              </p>
              
              <p className="text-body-1 2xl:text-4xl text-gray-300">
                Connect with me on {" "}
                <a
                  className="underline duration-300 ease-in-out hover:text-primary-300"
                  href="https://www.linkedin.com/in/prashant-sawant"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>{" "}
                to discuss how we can collaborate on your next strategic initiative.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}