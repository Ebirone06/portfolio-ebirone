import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Brand } from './Brand';

const navItems = [
  { label: 'About', href: '/#about' },
  { label: 'Selected work', href: '/#work' },
  { label: 'Contact', href: '/#contact' },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const close = () => setOpen(false);

  const jumpTo = (href: string) => {
    close();
    if (href.startsWith('/#') && location.pathname === '/') {
      const target = document.querySelector(href.slice(1));
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="site-header">
      <nav className="nav-shell" aria-label="Main navigation">
        <Brand />
        <div className={`nav-links ${open ? 'nav-links-open' : ''}`}>
          {navItems.map((item) => (
            <Link key={item.label} to={item.href} onClick={() => jumpTo(item.href)} className="nav-link">{item.label}</Link>
          ))}
          <Link className="nav-mobile-cta" to="/#contact" onClick={() => jumpTo('/#contact')}>Let's talk <ArrowUpRight size={15} /></Link>
        </div>
        <Link className="nav-cta" to="/#contact" onClick={() => jumpTo('/#contact')}>Let's talk <ArrowUpRight size={15} /></Link>
        <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>
    </header>
  );
}
