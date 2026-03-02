import { motion } from 'framer-motion';
import CodeBlock from './CodeBlock';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-3xl ${isUser ? 'rounded-2xl bg-slate-800 px-5 py-3 text-slate-100' : 'w-full'}`}>
        {isUser ? <p className="whitespace-pre-wrap">{message.content}</p> : <CodeBlock content={message.content} />}
      </div>
    </motion.div>
  );
}
