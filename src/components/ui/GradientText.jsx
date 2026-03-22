const GradientText = ({
  children,
  gradient = "linear-gradient(90deg, #6366f1, #22c55e)",
  animate = true,
  className = ""
}) => {
  return (
    <span
      className={`gradient-text ${animate ? "gradient-animate" : ""} ${className}`}
      style={{
        background: gradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;