import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export const maxDuration = 30; // Allow up to 30s on Vercel (Pro plan) or 10s (free)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = 'asst_KyYsohF9EIe6Mj23hfzUfJQX';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ response: 'Mensagem inválida.' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY not configured');
      return NextResponse.json(
        { response: '😔 Chatbot indisponível no momento.' },
        { status: 500 }
      );
    }

    const thread = await openai.beta.threads.create();

    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: message,
    });

    const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: ASSISTANT_ID,
    });

    if (run.status !== 'completed') {
      console.error('Run failed:', run.status, run.last_error);
      return NextResponse.json(
        { response: '😔 Erro ao processar sua mensagem.' },
        { status: 500 }
      );
    }

    const messages = await openai.beta.threads.messages.list(thread.id);
    const assistantMessage = messages.data.find((m) => m.role === 'assistant');
    const textContent = assistantMessage?.content.find((c) => c.type === 'text');
    const response =
      textContent?.type === 'text'
        ? textContent.text.value
        : 'Desculpe, não consegui gerar uma resposta.';

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { response: '😔 Erro ao processar sua mensagem.' },
      { status: 500 }
    );
  }
}
