import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-white">🔥 Prompt Builder</Link>
        <div className="flex items-center gap-5 text-sm text-slate-300">
          <Link to="/pricing">Pricing</Link>
          {token ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <span className="rounded bg-slate-800 px-2 py-1">{user?.plan || 'free'}</span>
              <button onClick={handleLogout} className="rounded bg-red-500 px-3 py-1 text-white">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="rounded bg-brand px-3 py-1 text-white">Start Free</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
