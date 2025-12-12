import { NextRequest, NextResponse } from 'next/server';
import {
  evaluateCollegePrograms,
  EvaluateCollegeProgramsInput,
  EvaluateCollegeProgramsInputSchema,
} from '@/ai/flows/evaluate-college-programs';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as EvaluateCollegeProgramsInput;
    const parsed = EvaluateCollegeProgramsInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await evaluateCollegePrograms(parsed.data);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Error in /api/evaluate-college-programs:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Unexpected error' },
      { status: 500 }
    );
  }
}

