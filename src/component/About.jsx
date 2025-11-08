import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import one from "../assets/image/one.png";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const starR = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Content section animation
      gsap.fromTo(
        contentRef.current,
        {
          y: 120,
          opacity: 0,
          filter: "blur(0px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          delay: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            scrub: false,
          },
        }
      );

      // Skills animation with stagger
      gsap.fromTo(
        ".skill-item",
        {
          x: -50,
          opacity: 0,
          scale: 0.8,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 1.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // OPTIMIZED Star animation
      starR.current.forEach((star) => {
        if (!star) return;
        // Gentle floating and pulsing animation, not tied to scroll
        gsap.to(star, {
          x: "+=20", // Move slightly on x-axis
          y: "+=30", // Move slightly on y-axis
          scale: 1.15,
          duration: 2 + Math.random() * 3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: Math.random() * 2, // Stagger the start times
        });
      });
    }, sectionRef); // scope the context

    // Cleanup function
    return () => {
      ctx.revert(); // revert all GSAP animations in the context
    };
  }, []);

  const addstar = (el) => {
    if (el && !starR.current.includes(el)) {
      starR.current.push(el);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-gradient-to-b from-black to-purple-500 relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden ">
        {[...Array(10)].map((_, i) => (
          <div
            ref={addstar}
            key={`star-${i}`}
            className="absolute star twinkle"
            style={{
              width: `${10 + i * 3}px`,
              height: `${10 + i * 3}px`,
              backgroundColor: "white",
              opacity: 0.2 + Math.random() * 0.4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              // randomize twinkle speed/intensity per star
              ['--twinkle-duration']: `${2.5 + Math.random() * 2}s`,
              ['--twinkle-min']: `${0.25 + Math.random() * 0.3}`,
              ['--twinkle-max']: `${0.8 + Math.random() * 0.2}`,
            }}
          ></div>
        ))}
      </div>
      {/* Main container with increased horizontal spacing for lg screens */}
      <div className="relative z-10 container mx-auto px-6 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 py-16 sm:py-20 lg:py-24">
        
        {/* Title Section */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400 leading-tight"
          >
            About Me
          </h1>
          <div className="title-line w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mt-6 rounded-full transform origin-left"></div>
        </div>

        {/* Content Section with increased spacing */}
        <div
          ref={contentRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-center"
        >
          
          {/* Text Content */}
          <div className="space-y-8 order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold text-white mb-6">
              Passionate Developer & Creative Thinker
            </h2>
            
            <div className="space-y-6">
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-100 leading-relaxed">
  Hey there! I'm a <span className="font-semibold text-pink-400">Full Stack Developer </span> 
  who loves turning complex ideas into smooth, responsive, and visually stunning web experiences. 
  My main toolkit includes <span className="text-pink-400">React, Next.js, TypeScript,</span> and 
  <span className="text-pink-400"> GSAP</span> for animations — with <span className="text-pink-400">MongoDB</span> 
  and <span className="text-pink-400">Node.js</span> powering the backend.
</p>

<p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-100 leading-relaxed">
  Whether it’s designing dynamic interfaces or managing robust APIs, I love building 
  web applications that feel alive. Collaboration, version control, and clean code 
  are second nature to me — thanks to my daily workflow with <span className="text-pink-400">Git and GitHub</span>.
  Every project is an opportunity to learn, innovate, and deliver something extraordinary.
</p>


            </div>

            {/* Skills/Features with enhanced styling and shine */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="skill-item flex items-center space-x-3 p-3 rounded-lg bg-white/8 backdrop-blur-sm border border-white/60 hover:bg-white/15 hover:border-white/80 transition-all duration-300 group/skill relative overflow-hidden">
                {/* Shine effect for skills */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/skill:translate-x-full transition-transform duration-700"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse relative z-10"></div>
                <span className="text-sm text-gray-300 font-medium group-hover/skill:font-bold transition-all duration-300 relative z-10">Web Development</span>
              </div>
              <div className="skill-item flex items-center space-x-3 p-3 rounded-lg bg-white/8 backdrop-blur-sm border border-white/60 hover:bg-white/15 hover:border-white/80 transition-all duration-300 group/skill relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/skill:translate-x-full transition-transform duration-700"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse relative z-10"></div>
                <span className="text-sm text-gray-300 font-medium group-hover/skill:font-bold transition-all duration-300 relative z-10">UI/UX Design</span>
              </div>
              <div className="skill-item flex items-center space-x-3 p-3 rounded-lg bg-white/8 backdrop-blur-sm border border-white/60 hover:bg-white/15 hover:border-white/80 transition-all duration-300 group/skill relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/skill:translate-x-full transition-transform duration-700"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse relative z-10"></div>
                <span className="text-sm text-gray-300 font-medium group-hover/skill:font-bold transition-all duration-300 relative z-10">Mobile Apps</span>
              </div>
              <div className="skill-item flex items-center space-x-3 p-3 rounded-lg bg-white/8 backdrop-blur-sm border border-white/60 hover:bg-white/15 hover:border-white/80 transition-all duration-300 group/skill relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/skill:translate-x-full transition-transform duration-700"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse relative z-10"></div>
                <span className="text-sm text-gray-300 font-medium group-hover/skill:font-bold transition-all duration-300 relative z-10">Cloud Solutions</span>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Enhanced gradient border with more shine */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl  opacity-15 group-hover:opacity-80 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
              
              {/* Additional shine effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-3xl blur-sm opacity-20 group-hover:opacity-40 transition duration-700"></div>
              
              <div className="relative shine">
                <img
                  ref={imageRef}
                  src={one}
                  alt="Profile"
                  className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] object-cover rounded-3xl shadow-2xl"
                />
                
                {/* Enhanced overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/40 via-transparent to-transparent rounded-3xl"></div>
                
                {/* Floating elements for visual interest */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/40 rounded-full  animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-500/40 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
