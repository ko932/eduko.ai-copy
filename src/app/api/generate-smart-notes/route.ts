import { NextRequest, NextResponse } from 'next/server';
import {
  generateSmartNotes,
  GenerateSmartNotesInput,
  GenerateSmartNotesInputSchema,
} from '@/ai/flows/generate-smart-notes';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateSmartNotesInput;
    const parsed = GenerateSmartNotesInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await generateSmartNotes(parsed.data);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Error in /api/generate-smart-notes:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Unexpected error' },
      { status: 500 }
    );
  }
}

