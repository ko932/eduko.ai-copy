import { NextRequest, NextResponse } from 'next/server';
import {
  generateFormFillingGuide,
  GenerateFormFillingGuideInput,
  GenerateFormFillingGuideInputSchema,
} from '@/ai/flows/generate-form-filling-guide';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateFormFillingGuideInput;
    const parsed = GenerateFormFillingGuideInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await generateFormFillingGuide(parsed.data);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Error in /api/generate-form-filling-guide:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Unexpected error' },
      { status: 500 }
    );
  }
}

