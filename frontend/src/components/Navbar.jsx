import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#2D3748] bg-[#0B0F19]/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 text-[#F9FAFB]">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30">⚡</span>
          <span className="text-sm font-semibold tracking-wide">PromptBuilder</span>
        </Link>

        <div className="flex items-center gap-2 text-sm text-gray-300 sm:gap-4">
          <Link to="/dashboard" className="rounded-lg px-2 py-1 hover:bg-white/5">Dashboard</Link>
          <Link to="/pricing" className="rounded-lg px-2 py-1 hover:bg-white/5">Pricing</Link>
          {token ? (
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={handleLogout}
              className="rounded-lg border border-gray-700 px-3 py-1.5 text-xs hover:bg-white/5"
            >
              Logout
            </motion.button>
          ) : (
            <Link to="/login" className="rounded-lg border border-gray-700 px-3 py-1.5 text-xs hover:bg-white/5">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
