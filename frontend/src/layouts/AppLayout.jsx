import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function AppLayout() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-brand/30 selection:text-brand-100">
      {/* Modern animated background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full bg-brand/20 mix-blend-screen opacity-50 blur-[120px] animate-blob" />
        <div 
          className="absolute top-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-brandAccent/20 mix-blend-screen opacity-50 blur-[120px] animate-blob" 
          style={{ animationDelay: '2s' }} 
        />
        <div 
          className="absolute -bottom-[20%] left-[20%] h-[50%] w-[50%] rounded-full bg-brandGlow/20 mix-blend-screen opacity-50 blur-[120px] animate-blob" 
          style={{ animationDelay: '4s' }} 
        />
      </div>

      {/* Main content wrapper with grid pattern overlay */}
      <div className="relative z-10 flex min-h-screen flex-col bg-grid-pattern">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
