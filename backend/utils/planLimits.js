export const PLAN_LIMITS = {
  free: 5,
  starter: 50,
  pro: Infinity,
  yearly: Infinity
};

export const PLAN_AMOUNTS = {
  starter: 4900,
  pro: 14900,
  yearly: 99900
};

export const PLAN_EXPIRY_DAYS = {
  starter: 30,
  pro: 30,
  yearly: 365
};

export const resetPromptUsageIfNeeded = (user) => {
  const now = new Date();
  const resetAt = new Date(user.promptsResetAt || now);

  if (resetAt.toDateString() !== now.toDateString()) {
    user.promptsUsedToday = 0;
    user.promptsResetAt = now;
  }
};

export const isPlanExpired = (user) => {
  if (!user.planExpiry) {
    return user.plan === 'free';
  }
  return new Date(user.planExpiry) < new Date();
};
