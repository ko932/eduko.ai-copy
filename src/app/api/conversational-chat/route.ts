import { NextRequest, NextResponse } from 'next/server';
import {
  ConversationalChatInput,
  ConversationalChatInputSchema,
  conversationalChat,
} from '@/ai/flows/conversational-chat';

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ConversationalChatInput;
    const parsed = ConversationalChatInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const result = await conversationalChat(parsed.data);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Error in /api/conversational-chat:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Unexpected error' },
      { status: 500 }
    );
  }
}

