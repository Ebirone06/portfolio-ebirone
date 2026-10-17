import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return <main className="not-found section-wrap"><p className="eyebrow">404 / PAGE NOT FOUND</p><h1>This path leads<br />nowhere<span>.</span></h1><p>The page may have moved or may not exist yet. Let's get you back to the portfolio.</p><Link className="button button-light" to="/"><ArrowLeft size={16} /> Back home <ArrowUpRight size={16} /></Link></main>;
}
