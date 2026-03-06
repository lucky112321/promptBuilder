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
    <header className="sticky top-0 z-50 glass border-b-0 border-white/5 transition-all duration-300">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2 text-xl font-bold">
          <span className="text-2xl transition-transform group-hover:scale-110 group-active:scale-95">🔥</span>
          <span className="text-gradient transition-opacity hover:opacity-80">Prompt Builder</span>
        </Link>
        
        {/* Nav Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/pricing" className="transition-colors hover:text-white">Pricing</Link>
          
          {token ? (
            <>
              <Link to="/dashboard" className="transition-colors hover:text-white">Dashboard</Link>
              <div className="ml-2 flex items-center gap-3 border-l border-slate-800 pl-4">
                <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs uppercase tracking-wider text-brand-300 backdrop-blur-sm">
                  {user?.plan || 'free'}
                </span>
                <button 
                  onClick={handleLogout} 
                  className="rounded-lg border border-transparent px-3 py-1.5 text-zinc-400 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-300"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="ml-2 flex items-center gap-4">
              <Link to="/login" className="transition-colors hover:text-white">Login</Link>
              <Link 
                to="/register" 
                className="group relative overflow-hidden rounded-lg bg-brand px-5 py-2 text-white font-semibold transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-shimmer opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative">Start Free</span>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
