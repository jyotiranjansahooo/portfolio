import { useEffect, useRef } from "react";
import gsap from "gsap";

const Custom = () => {
  const curserRef = useRef(null);
  const curserBorder = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return; // Skip for mobile

    const curse = curserRef.current;
    const curserBord = curserBorder.current;

    gsap.set([curse, curserBord], {
      xPercent: -50,
      yPercent: -50,
    });

    const xTo = gsap.quickTo(curse, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(curse, "y", { duration: 0.2, ease: "power3.out" });
    const xbord = gsap.quickTo(curserBord, "x", { duration: 0.5, ease: "power3.out" });
    const ybord = gsap.quickTo(curserBord, "y", { duration: 0.5, ease: "power3.out" });

    const mousemove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xbord(e.clientX);
      ybord(e.clientY);
    };

    const mousedown = () => {
      gsap.to([curse, curserBord], { scale: 0.6, duration: 0.2 });
    };

    const mouseup = () => {
      gsap.to([curse, curserBord], { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", mousemove);
    document.addEventListener("mousedown", mousedown);
    document.addEventListener("mouseup", mouseup);

    return () => {
      window.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mousedown", mousedown);
      document.removeEventListener("mouseup", mouseup);
      gsap.killTweensOf([curse, curserBord]);
    };
  }, []);

  return (
    <>
      <div
        className="fixed top-0 left-0 w-[20px] h-[20px] bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        ref={curserRef}
      ></div>
      <div
        className="fixed top-0 left-0 w-[40px] h-[40px] border border-white rounded-full pointer-events-none z-[9999] mix-blend-difference opacity-50"
        ref={curserBorder}
      ></div>
    </>
  );
};

export default Custom;

