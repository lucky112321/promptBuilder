import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { token, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-700 bg-[#0B0F14]/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="text-lg font-semibold text-slate-100">Prompt Builder</Link>
        <div className="flex items-center gap-2 text-sm text-slate-300 sm:gap-4">
          <Link to="/pricing" className="hover:text-white">Pricing</Link>
          {token ? (
            <>
              <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
              <span className="rounded-full border border-slate-600 px-2 py-1 text-xs uppercase">{user?.plan || 'free'}</span>
              <motion.button whileTap={{ scale: 0.97 }} onClick={handleLogout} className="rounded-lg border border-slate-600 px-3 py-1 text-xs hover:bg-slate-800">
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-white">Login</Link>
              <Link to="/register" className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 px-3 py-1.5 text-white">
                Start Free
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
