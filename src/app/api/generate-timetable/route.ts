import { NextRequest, NextResponse } from 'next/server';
import {
  generateTimetable,
  GenerateTimetableInput,
  GenerateTimetableInputSchema,
} from '@/ai/flows/generate-timetable';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateTimetableInput;
    const parsed = GenerateTimetableInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await generateTimetable(parsed.data);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Error in /api/generate-timetable:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Unexpected error' },
      { status: 500 }
    );
  }
}

