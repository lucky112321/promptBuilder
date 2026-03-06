import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const SYSTEM_PROMPT =
  "You are a world-class prompt engineer and CRO expert. Generate a structured, high-converting, detailed AI prompt optimized for results based on the user's idea and category.";

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

const formatPromptOutput = (content) => {
  const cleaned = content.trim();
  if (cleaned.startsWith("```")) {
    return cleaned;
  }
  return `\`\`\`prompt\n${cleaned}\n\`\`\``;
};

export const generatePromptFromIdea = async ({ idea, category, plan }) => {
  if (!genAI) {
    return formatPromptOutput(
      `Goal: ${idea}\nCategory: ${category}\nTone: Persuasive, expert, conversion-focused\nStructure:\n1. Audience & intent\n2. Offer framing\n3. Step-by-step generation instructions\n4. Strong CTA\n5. Output format constraints\n\nPlan Tier Context: ${plan}`
    );
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const result = await model.generateContent(`
${SYSTEM_PROMPT}

Idea: ${idea}
Category: ${category}
User plan: ${plan}

Return ONLY the final prompt.
`);

  const output = result.response.text();

  return formatPromptOutput(output);
};