import Dock from "../ui/Dock";
import { VscHome, VscArchive, VscAccount } from "react-icons/vsc";
import { MdEmail } from "react-icons/md";

/* -------------------- SCROLL FUNCTION -------------------- */
const scrollToSection = (id) => {
  const el = document.getElementById(id);

  if (!el) {
    console.error("Section not found:", id);
    return;
  }

  const yOffset = -80; // adjust for navbar height
  const y =
    el.getBoundingClientRect().top + window.pageYOffset + yOffset;

  window.scrollTo({
    top: y,
    behavior: "smooth",
  });
};

/* -------------------- COMPONENT -------------------- */
const DockNavbar = () => {
  const items = [
    {
      icon: <VscHome size={20} />,
      label: "Home",
      onClick: () => scrollToSection("home"),
    },
    {
      icon: <VscArchive size={20} />,
      label: "Projects",
      onClick: () => scrollToSection("projects"),
    },
    {
      icon: <VscAccount size={20} />,
      label: "About",
      onClick: () => scrollToSection("about"),
    },
    {
      icon: <MdEmail size={20} />,
      label: "Contact",
      onClick: () => scrollToSection("contact"),
    },
  ];

  return (
    <div className="dock-navbar-wrapper">
      <Dock
        items={items}
        panelHeight={60}
        baseItemSize={45}
        magnification={65}
      />
    </div>
  );
};

export default DockNavbar;