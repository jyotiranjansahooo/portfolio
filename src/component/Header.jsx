import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FiGithub, FiInstagram, FiLinkedin, FiMenu, FiX, FiCode, FiZap } from "react-icons/fi";
import emailjs from "@emailjs/browser";
import profileImage from "../assets/image/one.png";
import { Link } from "react-router-dom";

const Header = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          console.log("SUCCESS!");
          alert("Message sent successfully!");
          e.target.reset();
          closecontact();
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Failed to send message. Try again!");
        }
      );
  };

  const [open, setopen] = useState(false);
  const toggleMenu = () => setopen(!open);

  const [contactopen, setcontact] = useState(false);
  const opencontact = () => setcontact(true);
  const closecontact = () => setcontact(false);

  const [scrolled, setScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const MotionLink = motion(Link);

  // 🔹 Shared NavItem Component
  const NavItem = ({ name, path, onClick, delay }) => {
    const MotionComp = path ? MotionLink : motion.button;
    const props = path ? { to: path } : { onClick };

    return (
      <MotionComp
        {...props}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.7 + delay * 0.2,
          duration: 1.2,
        }}
        className="relative text-white dark:text-gray-200 hover:text-gray-400 font-medium transition-colors duration-300 group"
      >
        {name}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
      </MotionComp>
    );
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    {
      name: "Download CV",
      onClick: () => {
        const link = document.createElement("a");
        link.href = "/img/JYOTI RANJAN SAHOO (2).pdf";
        link.download = "JyotiranjanSahoo-CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
    },
  ];

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black/50 backdrop-blur-lg shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Animated Logo */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 25,
              delay: 0.3,
              duration: 1.2,
            }}
            className="flex items-center group cursor-pointer"
          >
            <motion.div
              className="relative h-10 w-10 md:h-12 md:w-12 rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-violet-500/30 overflow-hidden"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0],
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              whileHover={{
                scale: 1.1,
                rotate: [0, -8, 8, 0],
                y: [0, -12, 0],
                transition: {
                  duration: 0.8,
                  type: "spring",
                  stiffness: 300,
                  damping: 10,
                },
              }}
              whileTap={{
                scale: 0.9,
                rotate: [0, 5, -5, 0],
                transition: { duration: 0.2 },
              }}
            >
              {/* Animated Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-10"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute top-1 left-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-400 rounded-full z-20"
                animate={{
                  y: [0, -3, 0],
                  scale: [1, 1.3, 1],
                  opacity: [0.8, 1, 0.8],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute bottom-1 right-1 w-1 h-1 md:w-1.5 md:h-1.5 bg-cyan-400 rounded-full z-20"
                animate={{
                  y: [0, 3, 0],
                  scale: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              />
              <motion.img
                src={profileImage}
                alt="Logo"
                className="absolute inset-0 w-full h-full object-cover rounded-2xl z-0"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
            </motion.div>

            <motion.div
              className="ml-4 flex flex-col"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.span
                className="text-xl font-bold text-white drop-shadow-lg"
                animate={{ y: [0, -3, 0], scale: [1, 1.02, 1] }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { type: "spring", stiffness: 400, damping: 10 },
                }}
              >
                Full stack
              </motion.span>
              <motion.div
                className="flex items-center space-x-1 text-xs text-pink-500 dark:text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <FiCode className="w-3 h-3" />
                <motion.span
                  animate={{ x: [0, 1, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
                >
                  Developer
                </motion.span>
                <FiZap className="w-3 h-3 text-yellow-500" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Desktop Navbar */}
          <nav className="lg:flex hidden space-x-8">
            {menuItems.map((item, index) => (
              <NavItem key={item.name} {...item} delay={index} />
            ))}
          </nav>

          {/* Social Icons */}
          <div className="md:flex hidden items-center space-x-4">
            <a href="https://github.com/jyotiranjansahooo" target="_blank" rel="noopener noreferrer">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/jr.sahooo" target="_blank" rel="noopener noreferrer">
              <FiInstagram className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/jyoti-ranjan-sahoo-80bb6a36a" target="_blank" rel="noopener noreferrer">
              <FiLinkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Contact Button */}
          <motion.button
            onClick={opencontact}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 2,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className="hidden lg:block px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in touch
            <span className="absolute inset-0 w-[25%] h-full bg-white/30 -skew-x-[25deg] group-hover:animate-[shine_1s_ease-in-out_infinite]" />
          </motion.button>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center">
            <motion.button whileTap={{ scale: 0.7 }} onClick={toggleMenu} className="text-gray-300">
              {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden absolute top-full left-0 w-full bg-gray-900/80 backdrop-blur-md shadow-lg z-40"
            >
              <nav className="flex flex-col items-center space-y-2 p-6">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      if (item.onClick) item.onClick();
                      toggleMenu();
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, ease: "easeOut" }}
                    className="relative text-gray-200 hover:text-violet-400 font-medium py-3 text-xl w-full text-center group"
                  >
                    {item.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 group-hover:w-full transition-all duration-300"></span>
                  </motion.button>
                ))}

                {/* Add Get in touch button */}
                <motion.button
                  onClick={() => {
                    opencontact();
                    toggleMenu();
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + menuItems.length * 0.05, ease: "easeOut" }}
                  className="w-full mt-4 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get in touch
                  <span className="absolute inset-0 w-[25%] h-full bg-white/30 -skew-x-[25deg] group-hover:animate-[shine_1s_ease-in-out_infinite]" />
                </motion.button>

                {/* Social Icons for mobile */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + (menuItems.length + 1) * 0.05, ease: "easeOut" }}
                  className="flex items-center space-x-6 mt-4 text-gray-400"
                >
                  <a href="https://github.com/jyotiranjansahooo" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors">
                    <FiGithub className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/jr.sahooo" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors">
                    <FiInstagram className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/jyoti-ranjan-sahoo-80bb6a36a" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors">
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Form Modal */}
        <AnimatePresence>
          {contactopen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 30 }}
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 200,
                  duration: 0.8,
                }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-serif text-purple-500">Get in touch</h1>
                  <button onClick={closecontact}>
                    <FiX className="w-5 h-5 text-gray-300 font-extrabold" />
                  </button>
                </div>

                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      className="w-full px-4 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your email address"
                      className="w-full px-4 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="msg" className="block text-sm font-medium text-black mb-1">
                      How can I help you?
                    </label>
                    <textarea
                      name="message"
                      id="msg"
                      placeholder="Drop your message here"
                      className="bg-gray-700 w-full px-4 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                      required
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-violet-700 to-violet-400 hover:from-violet-400 hover:to-violet-700 transition-all duration-100 rounded-lg shadow-md hover:shadow-lg hover:shadow-violet-600/50"
                  >
                    Send message
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-violet-600 origin-[0%] z-50"
        style={{ scaleX }}
      />
      <style>{`
        @keyframes shine {
          from {
            transform: translateX(-100%) skewX(15deg);
          }
          to {
            transform: translateX(200%) skewX(15deg);
          }
        }
      `}</style>
    </>
  );
};

export default Header;
