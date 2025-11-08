import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { SlShareAlt } from "react-icons/sl";

const Projec = () => {
  const secR = useRef(null);
  const titleR = useRef(null);
  const titleLineR = useRef(null);
  const triR = useRef(null);
  const hzR = useRef(null);
  const main = useRef();

  const projectimg = [
    { id: 1, title: "Book store", imgsrc: "../../public/img/book.jpg", link: "#" },
    { id: 2, title: "imagGify", imgsrc: "../../public/img/imagify.jpg", link: "#" },
    { id: 3, title: "upcoming", imgsrc: "", link: "#" },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      /** ✅ Title Animation */
      gsap.fromTo(
        titleR.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: secR.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /** ✅ Title Line Animation */
      gsap.fromTo(
        titleLineR.current,
        { width: "0%", opacity: 0 },
        {
          width: "8rem",
          opacity: 1,
          duration: 0.8,
          ease: "power3.inOut",
          delay: 0.3,
          scrollTrigger: {
            trigger: secR.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /** ✅ Horizontal Scroll with smaller gap */
      const panels = gsap.utils.toArray(".panel");
      const scrollTween = gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: triR.current,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.3, max: 0.6 },
            ease: "power1.inOut",
          },
          end: () => "+=" + triR.current.offsetWidth,
        },
      });

      /** ✅ Panel Image and Title Animations */
      panels.forEach((panel) => {
        const image = panel.querySelector(".project-image");
        const title = panel.querySelector(".project-title");

        gsap.fromTo(
          image,
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 85%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.fromTo(
          title,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, main);

    return () => ctx.revert();
  }, [projectimg.length]);

  return (
    <main ref={main}>
      <section
        className="relative py-20 bg-gradient-to-b from-purple-500 to-pink-500 overflow-hidden"
        ref={secR}
        id="hz"
      >
        
        {/* Title Section */}
        <div className="container mx-auto px-4 mb-16 relative z-10">
          <h2
            ref={titleR}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center mb-4 opacity-0"
          >
            Featured Projects
          </h2>
          <div ref={titleLineR} className="h-1 bg-black mx-auto opacity-0"></div>
        </div>

        {/* Horizontal Scroll */}
        <div ref={triR} className="h-screen w-full">
          <div
            ref={hzR}
            className="horizontal-section flex h-full gap-8" // ✅ small gap added
            style={{ width: `${projectimg.length * 98}%` }} // ✅ slightly reduced total width
          >
            {projectimg.map((proj) => (
              <div
                className="panel flex items-center justify-center w-full h-full"
                key={proj.id}
              >
                <div className="relative w-[85%] md:w-[65%] lg:w-[45%] flex flex-col items-center justify-center p-4 sm:p-6 bg-black/20 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
                  {/* ✅ Shine Effect */}
                  <div className="relative w-full rounded-2xl overflow-hidden group">
                    <img
                      className="project-image w-full h-auto rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                      src={proj.imgsrc}
                      alt={proj.title}
                      loading="lazy"
                    />
                    {/* Shine overlay */}
                    <div className="shine absolute top-0 left-[-75%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform rotate-12"></div>
                  </div>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-title flex items-center gap-3 text-white md:text-2xl text-xl mt-6 hover:text-purple-300 transition-colors duration-300"
                  >
                    {proj.title}
                    <SlShareAlt />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
};

export default Projec;
