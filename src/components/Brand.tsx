import { Link } from 'react-router-dom';

export function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Ebirone Michael home">
      <span className="brand-mark">EM<span>.</span></span>
      <span className="brand-name">Ebirone Michael</span>
    </Link>
  );
}
