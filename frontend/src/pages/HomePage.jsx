import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FeatureCard from '../components/FeatureCard';

const features = [
  {
    icon: '🧠',
    title: 'AI Prompt Intelligence',
    description: 'Generate structured prompts designed for better output quality and faster iteration.'
  },
  {
    icon: '⚡',
    title: 'Conversion-Focused Templates',
    description: 'Use starters built for creators, marketers, and SaaS operators with clear outcomes.'
  },
  {
    icon: '📊',
    title: 'Daily Usage Visibility',
    description: 'Track plan limits and usage in real time so your workflow always stays predictable.'
  }
];

export default function HomePage() {
  return (
    <div className="space-y-16 pb-6">
      <section className="relative overflow-hidden rounded-3xl border border-[#2D3748] bg-[#111827] px-6 py-16 text-center sm:px-10">
        <div className="pointer-events-none absolute left-1/2 top-6 h-44 w-44 -translate-x-1/2 rounded-full bg-purple-500/20 blur-3xl" />
        <p className="relative text-xs uppercase tracking-[0.25em] text-gray-400">AI Prompt Builder for Teams</p>
        <h1 className="relative mt-5 text-4xl font-bold tracking-tight text-[#F9FAFB] md:text-5xl">
          Generate <span className="bg-gradient-to-r from-indigo-300 via-indigo-500 to-purple-400 bg-clip-text text-transparent">High-Converting</span> AI Prompts
        </h1>
        <p className="relative mx-auto mt-5 max-w-2xl text-gray-400">
          A minimal, premium workspace inspired by ChatGPT and Notion to build, refine, and ship prompts faster.
        </p>

        <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/register" className="inline-flex rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/30">
              Start Building Free
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.03 }}>
            <Link to="/pricing" className="inline-flex rounded-xl border border-gray-700 px-6 py-3 font-semibold text-gray-200">
              View Pricing
            </Link>
          </motion.div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-[#F9FAFB]">Built for daily AI execution</h2>
        <p className="mt-2 text-gray-400">Everything you need for prompt quality, speed, and consistency.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>
    </div>
  );
}
