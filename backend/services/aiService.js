import OpenAI from 'openai';

const SYSTEM_PROMPT =
  'You are a world-class prompt engineer and CRO expert. Generate a structured, high-converting, detailed AI prompt optimized for results based on the user\'s idea and category.';

const openaiClient = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const formatPromptOutput = (content) => {
  const cleaned = content.trim();
  if (cleaned.startsWith('```')) {
    return cleaned;
  }
  return `\`\`\`prompt\n${cleaned}\n\`\`\``;
};

export const generatePromptFromIdea = async ({ idea, category, plan }) => {
  if (!openaiClient) {
    return formatPromptOutput(
      `Goal: ${idea}\nCategory: ${category}\nTone: Persuasive, expert, conversion-focused\nStructure:\n1. Audience & intent\n2. Offer framing\n3. Step-by-step generation instructions\n4. Strong CTA\n5. Output format constraints\n\nPlan Tier Context: ${plan}`
    );
  }

  const completion = await openaiClient.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Idea: ${idea}\nCategory: ${category}\nUser plan: ${plan}\nReturn only the final prompt.`
      }
    ],
    temperature: 0.8
  });

  const output = completion.choices?.[0]?.message?.content || 'Unable to generate prompt.';
  return formatPromptOutput(output);
};
