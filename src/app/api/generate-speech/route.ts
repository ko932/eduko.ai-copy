import { NextRequest, NextResponse } from 'next/server';
import {
  GenerateSpeechInput,
  GenerateSpeechInputSchema,
  generateSpeech,
} from '@/ai/flows/generate-speech';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateSpeechInput;
    const parsed = GenerateSpeechInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await generateSpeech(parsed.data);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Error in /api/generate-speech:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Unexpected error' },
      { status: 500 }
    );
  }
}

