import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';


const globalForGenkit = global as unknown as { ai: ReturnType<typeof genkit> | undefined };

export const ai = globalForGenkit.ai || genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});

if (process.env.NODE_ENV !== 'production') {
  globalForGenkit.ai = ai;
}
