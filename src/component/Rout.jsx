import { Routes, Route } from "react-router-dom";
import Hero from "./Hero";
import About from "./About";
import Projec from "./Projec";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Home page with all sections */}
      <Route
        path="/"
        element={
          <>
            <Hero />
            <About />
            <Projec />
          </>
        }
      />
      {/* Individual pages */}
      <Route path="/about" element={<About /> } />
      <Route path="/home" element={<Hero />} />
      <Route path="/projects" element={<Projec />} />
    </Routes>
  );
}
