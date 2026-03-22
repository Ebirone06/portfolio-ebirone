import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import GradientText from "../components/ui/GradientText";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // ✅ Send message to YOU
    await emailjs.sendForm(
      "service_gl4aboh",
      "template_glsl3tc",
      form.current,
      "Ckn6_vRZvJO2rb4Tl"
    );

    // ✅ Try auto-reply separately (don’t break main flow)
    try {
      await emailjs.sendForm(
        "service_gl4aboh",
        "template_hwdqzde",
        form.current,
        "Ckn6_vRZvJO2rb4Tl"
      );
    } catch (autoError) {
      console.warn("Auto-reply failed:", autoError);
    }

    alert("Message sent successfully, thank you!");
    form.current.reset();

  } catch (error) {
    console.error("Main email failed:", error);
    alert("Failed to send message, please try again later.");
  } finally {
    setLoading(false);
  }
};

  return (
    <section className="contact-section" id="contact">

      <h2 className="contact-title">
        <GradientText>Let’s Work Together</GradientText>
      </h2>

      <p className="contact-subtitle">
  I'm always interested in new opportunities and exciting projects.
</p>

<p className="contact-subtitle">
  Whether you have a question or just want to say hi, I'll do my best to get back to you!
</p>

      <motion.form
        ref={form}
        onSubmit={sendEmail}
        className="contact-form"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          className="contact-input"
          required
        />

        <input
          type="email"
          name="from_email"
          placeholder="Your Email"
          className="contact-input"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          className="contact-input contact-textarea"
          required
        ></textarea>

        <button
          type="submit"
          className="contact-btn"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message "}
        </button>
      </motion.form>

    </section>
  );
};

export default Contact;