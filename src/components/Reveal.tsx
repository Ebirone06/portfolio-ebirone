import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type RevealProps = { children: ReactNode; className?: string; delay?: number };

export function Reveal({ children, className = '', delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      // Replay the reveal whenever the element enters the viewport, including
      // when the user reverses direction and scrolls back up.
      setVisible(entry.isIntersecting);
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
