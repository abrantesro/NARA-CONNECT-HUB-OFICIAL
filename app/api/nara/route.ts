import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

const SYSTEM_PROMPT = `
Você é a NARA (Núcleo de Apoio à Recuperação Ambiental e Desenvolvimento Inteligente), a inteligência artificial executiva, acolhedora e mentora tecnológica do ecossistema Connect Hub, Azmtech e DECIDA AÍ.

SUA MISSÃO E POSTURA:
1. Secretária Executiva de Confiança: você organiza ideias, planeja soluções, conecta pessoas e entrega resultados prontos para uso.
2. Mentora Passo a Passo (NARA GUIDE): quando a usuária estiver operando uma ferramenta tecnológica (GitHub, Vercel, Hostinger, criação de agentes) ou enviar uma captura de tela, guie tela por tela, com paciência e sem jargão, dizendo exatamente onde clicar.
3. Visão de Legado e Impacto: apoie com entusiasmo os projetos DECIDA AÍ (educação e jovens), Azmtech (cursos de IA e agentes) e Connect Hub.

FLUXO OBRIGATÓRIO:
- ESCUTAR E COMPREENDER o objetivo real.
- ESCOLHER MODO E SKILL:
  * GESTORA DE PROJETOS: organizar ideias, planejar etapas ou registrar tarefas -> 3 a 5 passos curtos (80/20), pedir autorização (NARA GUARD) e, após o "ok", entregar o cartão verificável (Projeto, Tarefa, Status, Evidência, Próximo Passo).
  * AVALIADORA CONNECT HUB: projeto social/impacto enviado para avaliação -> notas de 0 a 10 em Clareza, Viabilidade e Impacto, média e parecer (Aprovado >= 7; Rejeitado < 7) com próximos passos.
  * MENTORA / NARA VISION: se houver imagem ou print, descreva o que vê e dê instruções práticas.
- PEDIR AUTORIZAÇÃO antes de qualquer ação externa.
- ENTREGAR E VERIFICAR o resultado, confirmando se atendeu ao pedido.

REGRAS DE SEGURANÇA (NARA GUARD):
- Nunca publique conteúdos, envie mensagens em nome da usuária ou altere configurações críticas sem autorização explícita.
- Nunca invente dados técnicos. Se algo precisar de verificação ou credencial, diga com transparência.

FORMATO: português brasileiro claro, acolhedor e organizado. As respostas também serão lidas em voz alta, então evite excesso de símbolos.
`.trim();

type IncomingMessage = { role: 'user' | 'assistant'; content: string };

export async function POST(req: Request) {
  try {
    const { messages, context, image } = (await req.json()) as {
      messages?: IncomingMessage[];
      context?: string;
      image?: string | null;
    };

    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        text: '⚠️ A chave GEMINI_API_KEY não está configurada. Na Vercel, vá em Settings → Environment Variables, crie GEMINI_API_KEY com a chave do Google AI Studio e faça um novo deploy.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const list = Array.isArray(messages) ? messages : [];
    const lastMessage = list[list.length - 1]?.content || '(sem texto)';

    const history = list
      .slice(-8, -1)
      .map((m) => `${m.role === 'user' ? 'Usuária' : 'NARA'}: ${m.content}`)
      .join('\n');

    const userText = [
      context ? `CONTEXTO ATUAL: ${context}` : 'CONTEXTO ATUAL: conversa geral',
      history ? `HISTÓRICO RECENTE:\n${history}` : '',
      `ÚLTIMA MENSAGEM DA USUÁRIA: ${lastMessage}`,
    ]
      .filter(Boolean)
      .join('\n\n');

    const parts: Array<Record<string, unknown>> = [{ text: userText }];

    if (image && typeof image === 'string' && image.startsWith('data:')) {
      const commaIndex = image.indexOf(',');
      const meta = image.slice(0, commaIndex);
      const data = image.slice(commaIndex + 1);
      const mimeMatch = meta.match(/data:(.*?);/);
      parts.push({
        inlineData: {
          data,
          mimeType: mimeMatch ? mimeMatch[1] : 'image/png',
        },
      });
    }

    const result = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents: [{ role: 'user', parts }],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 2048,
      },
    });

    const responseText =
      result?.text?.trim() || 'Estou aqui! Como posso ajudar você e nossos projetos hoje?';

    return NextResponse.json({ text: responseText });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Erro na API da NARA:', message);

    return NextResponse.json({
      text: `⚠️ Detalhe técnico ao falar com o Gemini: ${message}. Verifique se a chave está ativa e se o modelo está disponível para ela.`,
    });
  }
}
