import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMenu,
  FiX,
  FiCode,
  FiZap,
} from "react-icons/fi";
import emailjs from "@emailjs/browser";
import profileImage from "../assets/image/one.png";
import { Link } from "react-router-dom";

const Header = () => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const form = useRef();

  // Toast
  const [toast, setToast] = useState(null);
  const showToast = (type, message, ttl = 3500) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), ttl);
  };

  // Send Email
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(serviceId, templateId, form.current, { publicKey }).then(
      () => {
        showToast("success", "Message sent successfully!");
        e.target.reset();
        closecontact();
      },
      (error) => {
        console.error("FAILED...", error.text);
        showToast("error", "Failed to send message. Try again!");
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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const MotionLink = motion(Link);

  // Nav items
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
          {/* Logo */}
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
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            >
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
              <span className="text-xl font-bold text-white">Full stack</span>
              <div className="flex items-center space-x-1 text-xs text-pink-500 dark:text-gray-400">
                <FiCode className="w-3 h-3" />
                <span>Developer</span>
                <FiZap className="w-3 h-3 text-yellow-500" />
              </div>
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
            <a
              href="https://github.com/jyotiranjansahooo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/jr.sahooo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/jyoti-ranjan-sahoo-80bb6a36a"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Contact Button */}
          <motion.button
            onClick={opencontact}
            className="hidden lg:block px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in touch
          </motion.button>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <motion.button
              whileTap={{ scale: 0.7 }}
              onClick={toggleMenu}
              className="text-gray-300"
            >
              {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* ===== MOBILE MENU (Paper Fold) ===== */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50 min-h-screen"
            >
              <motion.div
                initial={{ rotateX: -90, opacity: 0, scale: 0.95 }}
                animate={{ rotateX: 0, opacity: 1, scale: 1 }}
                exit={{ rotateX: 90, opacity: 0, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                  duration: 0.6,
                }}
                style={{ transformOrigin: "top center" }}
                className="relative w-[90%] max-w-md bg-black/90 rounded-2xl shadow-2xl p-8"
              >
                <button
                  onClick={toggleMenu}
                  className="absolute top-4 right-4 text-white text-2xl z-10"
                >
                  &#10005;
                </button>

                <nav className="flex flex-col items-center space-y-4">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.name}
                      onClick={() => {
                        if (item.onClick) item.onClick();
                        toggleMenu();
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="relative text-gray-200 hover:text-violet-400 font-medium py-3 text-xl w-full text-center group"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 group-hover:w-full transition-all duration-300"></span>
                    </motion.button>
                  ))}

                  <motion.button
                    onClick={() => {
                      opencontact();
                      toggleMenu();
                    }}
                    className="w-full mt-4 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white transition-all duration-300"
                  >
                    Get in touch
                  </motion.button>

                  <div className="flex items-center space-x-6 mt-4 text-gray-400">
                    <a
                      href="https://github.com/jyotiranjansahooo"
                      target="_blank"
                      className="hover:text-violet-400"
                    >
                      <FiGithub />
                    </a>
                    <a
                      href="https://www.instagram.com/jr.sahooo"
                      target="_blank"
                      className="hover:text-violet-400"
                    >
                      <FiInstagram />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/jyoti-ranjan-sahoo-80bb6a36a"
                      target="_blank"
                      className="hover:text-violet-400"
                    >
                      <FiLinkedin />
                    </a>
                  </div>
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== CONTACT FORM (Paper Fold) ===== */}
        <AnimatePresence>
          {contactopen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 min-h-screen"
            >
              <motion.div
                initial={{ rotateX: -90, opacity: 0, scale: 0.95 }}
                animate={{ rotateX: 0, opacity: 1, scale: 1 }}
                exit={{ rotateX: 90, opacity: 0, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                  duration: 0.6,
                }}
                style={{ transformOrigin: "top center" }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl font-serif text-purple-500">
                    Get in touch
                  </h1>
                  <button onClick={closecontact}>
                    <FiX className="w-5 h-5 text-gray-300 font-extrabold" />
                  </button>
                </div>

                <form ref={form} onSubmit={sendEmail} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your name"
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="msg"
                      className="block text-sm font-medium text-black mb-1"
                    >
                      How can I help you?
                    </label>
                    <textarea
                      name="message"
                      id="msg"
                      placeholder="Drop your message here"
                      className="bg-gray-700 text-white w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500"
                      required
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-violet-700 to-violet-400 hover:from-violet-400 hover:to-violet-700 transition-all duration-100 rounded-lg shadow-md hover:shadow-lg"
                  >
                    Send message
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ----- TOAST ----- */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="fixed right-4 top-16 z-[9999] w-auto max-w-xs"
              aria-live="polite"
            >
              <div
                className={`flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg border ${
                  toast.type === "success"
                    ? "bg-emerald-600/95 border-emerald-700 text-white"
                    : "bg-red-600/95 border-red-700 text-white"
                }`}
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {toast.type === "success" ? "Success" : "Error"}
                  </p>
                  <p className="text-xs mt-1 opacity-90">{toast.message}</p>
                </div>
                <button
                  onClick={() => setToast(null)}
                  className="text-white/90 ml-2 p-1 rounded hover:bg-white/10"
                  aria-label="Close toast"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-violet-600 origin-[0%] z-50"
          style={{ scaleX }}
        />
      </header>
    </>
  );
};

export default Header;
