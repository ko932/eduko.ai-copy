import 'server-only';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const globalForGenkit = global as unknown as { ai: ReturnType<typeof genkit> | undefined };

const googleApiKey = process.env.GOOGLE_GENAI_API_KEY;

let aiInstance: ReturnType<typeof genkit> | undefined = globalForGenkit.ai;

export function getAI() {
  if (!googleApiKey) {
    throw new Error(
      'Missing GOOGLE_GENAI_API_KEY. Add it in your environment (e.g., .env.local or Vercel Project Settings) to enable Ko AI.'
    );
  }

  if (!aiInstance) {
    aiInstance = genkit({
      plugins: [googleAI({ apiKey: googleApiKey })],
      model: 'googleai/gemini-2.5-flash',
    });

    if (process.env.NODE_ENV !== 'production') {
      globalForGenkit.ai = aiInstance;
    }
  }

  return aiInstance;
}
