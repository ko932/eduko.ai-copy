import { NextRequest, NextResponse } from 'next/server';
import {
  generateProjectIdeas,
  GenerateProjectIdeasInput,
  GenerateProjectIdeasInputSchema,
} from '@/ai/flows/generate-project-ideas';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateProjectIdeasInput;
    const parsed = GenerateProjectIdeasInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await generateProjectIdeas(parsed.data);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Error in /api/generate-project-ideas:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Unexpected error' },
      { status: 500 }
    );
  }
}

