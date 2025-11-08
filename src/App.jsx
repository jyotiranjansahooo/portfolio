import { useState, useEffect } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import gsap from "gsap";
import { Routes, Route } from "react-router-dom";

import Header from "./component/Header";
import Rout from "./component/Rout";
import Custom from "./component/Custom";
import Loading from "./loading";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContentReady, setIsContentReady] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.refresh();
    Promise.all([
      new Promise((resolve) => setTimeout(resolve, 1000)), 
    ])
      .then(() => {
        setIsLoading(false);
        setTimeout(() => setIsContentReady(true), 100);
      })
      .catch((error) => {
        console.error("Loading error:", error);
        setIsLoading(false);
      });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <div
        className={`transition-opacity duration-500 ${
          isContentReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <Header />
        <Rout />
        <Custom />
      </div>
    </>
  );
}
