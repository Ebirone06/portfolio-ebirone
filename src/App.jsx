import DockNavbar from "./components/layout/DockNavbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import ProjectsSection from "./sections/ProjectsSection";
import Contact from "./sections/Contact";
import Footer from "./components/layout/Footer";


function App() {
  return (
    <>
      {/* Navigation */}
      <DockNavbar />

      {/* Sections */}
      <Hero />
      <About />
      <Skills />
      <ProjectsSection />
      <Contact />
      

      {/* Footer */}
      <Footer />

    </>
  );
}

export default App;