import { GoogleGenAI } from '@google/genai';

export function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey === 'your_gemini_api_key_here') {
    return null;
  }
  return new GoogleGenAI({ apiKey: apiKey.trim() });
}

export const GEMINI_MODEL = 'gemini-3.5-flash';
export const GEMINI_MODELS = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.6-flash'];

export async function generateGeminiContent(ai: GoogleGenAI, contents: string) {
  let lastError: unknown = null;
  for (const model of GEMINI_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config: {
          responseMimeType: 'application/json',
        },
      });
      return response;
    } catch (err) {
      console.warn(`Model ${model} attempt failed, trying next:`, err);
      lastError = err;
    }
  }
  throw lastError;
}
