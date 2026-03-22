import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFacebook,
  FaInstagram
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      {/* LEFT */}
      <div className="footer-left">
        <h3 className="footer-name">Ebirone Michael</h3>
        <p className="footer-role">Founder – Mike Industries</p>
        <p className="footer-tagline">
          Building AI-powered tools.
        </p>
      </div>

      {/* CENTER */}
      <div className="footer-center">
        © 2026 Mike Industries. All rights reserved.
      </div>

      {/* RIGHT */}
      <div className="footer-right">
        <a
          href="https://github.com/Ebirone06"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>

        <a
          href="https://www.linkedin.com/in/ebironemichael/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>

        <a
          href="mailto:ebirone4@gmail.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Email"
        >
          <FaEnvelope />
        </a>

        <a
          href="https://www.facebook.com/profile.php?id=61586200363374"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
        >
          <FaFacebook />
        </a>

        <a
          href="https://www.instagram.com/mike.industries_"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>
      </div>

    </footer>
  );
};

export default Footer;