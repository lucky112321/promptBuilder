import User from '../models/User.js';
import { generatePromptFromIdea } from '../services/aiService.js';
import { PLAN_LIMITS, isPlanExpired, resetPromptUsageIfNeeded } from '../utils/planLimits.js';

export const generatePrompt = async (req, res) => {
  const { idea, category = 'general' } = req.body;

  if (!idea) {
    return res.status(400).json({ message: 'Idea is required' });
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (user.plan !== 'free' && isPlanExpired(user)) {
    user.plan = 'free';
    user.planExpiry = null;
  }

  resetPromptUsageIfNeeded(user);

  const limit = PLAN_LIMITS[user.plan];
  if (Number.isFinite(limit) && user.promptsUsedToday >= limit) {
    await user.save();
    return res.status(403).json({ message: `Daily limit reached for ${user.plan} plan` });
  }

  const generatedPrompt = await generatePromptFromIdea({
    idea,
    category,
    plan: user.plan
  });

  user.promptsUsedToday += 1;
  await user.save();

  return res.json({
    prompt: generatedPrompt,
    usage: {
      plan: user.plan,
      promptsUsedToday: user.promptsUsedToday,
      dailyLimit: Number.isFinite(limit) ? limit : 'unlimited'
    }
  });
};
