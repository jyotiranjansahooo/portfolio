import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import DecryptedText from "../components/DecryptedText";

const Hero = () => {
  return (
    <section className="h-screen bg-gradient-to-b from-violet-600 to-black flex xl:flex-row flex-col-reverse items-center justify-between lg:px-24 px-10 relative overflow-hidden">
      
      {/* Left Side */}
      <div className="z-40 xl:mb-0 mb-[20%]">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 80, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 20,
            delay: 1.3,
            duration: 1.8,
          }}
          className="text-4xl md:text-7xl lg:text-8xl font-black z-10 mb-6 font-['Poppins'] tracking-tight"
        >
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 1.2 }}
            className="bg-gradient-to-r from-white via-purple-100 to-cyan-200 bg-clip-text text-transparent"
          >
            Myself
          </motion.span>
          <br />
          <motion.span
            id="name"
            className="font-['Playfair_Display'] font-bold bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1.5 }}
          >
            Jyoti ranjan sahoo
          </motion.span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, x: -100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 25,
            delay: 2.0,
            duration: 1.8,
          }}
          className="text-lg md:text-xl lg:text-2xl font-['Inter'] font-medium max-w-3xl leading-relaxed text-gray-300"
        >
          <DecryptedText
            text="Passionate Full Stack Developer crafting innovative web solutions with cutting-edge technologies. From frontend elegance to backend robustness, I transform ideas into seamless digital experiences."
            animateOn="view"
            revealDirection="center"
          />
        </motion.p>
      </div>

      {/* Right Section — Spline Scene */}
      <Spline
        className="absolute xl:right-[-28%] right-0 top-[-20%] lg:top-0"
        scene="https://prod.spline.design/EOweIu7Flmv4B28h/scene.splinecode"
      />
    </section>
  );
};

export default Hero;
