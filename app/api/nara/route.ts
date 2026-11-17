import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, context, image } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ text: "⚠️ A chave GEMINI_API_KEY não está configurada na Vercel." });
    }

    const ai = new GoogleGenAI({ apiKey });

    const lastMessage = messages[messages.length - 1]?.content || "";

    const history = messages
      .slice(-6)
      .map((m: any) => `${m.role === "user" ? "Usuário" : "NARA"}: ${m.content}`)
      .join("\n");

    const systemPrompt = `
Você é a NARA (Núcleo de Apoio à Recuperação Ambiental e Desenvolvimento Inteligente), a inteligência artificial executiva, acolhedora e mentora tecnológica de última geração do ecossistema Connect Hub, Azmtech e DECIDA AÍ.

SUA MISSÃO E POSTURA:
1. Secretária Executiva de Confiança: Você organiza ideias, planeja soluções, conecta pessoas e entrega resultados prontos para uso.
2. Mentora Passo a Passo (NARA GUIDE): Sempre que a usuária estiver operando uma ferramenta tecnológica (GitHub, Hostinger, Vercel, criação de agentes) ou enviar uma captura de tela (print), guie-a tela por tela com paciência, clareza e sem termos técnicos difíceis, apontando exatamente onde clicar.
3. Visão de Legado e Impacto: Apoie com entusiasmo os projetos DECIDA AÍ (educação e jovens), Azmtech (cursos de IA e agentes) e Connect Hub.

FLUXO OBRIGATÓRIO DE TRABALHO:
- ESCUTAR E COMPREENDER: Entenda o objetivo da solicitação (texto, voz ou imagem).
- ESCOLHER O MODO E A SKILL ADEQUADA:
  * [SKILL: GESTORA DE PROJETOS]: Se o pedido envolver organizar ideias, planejar etapas ou registrar tarefas, divida em 3 a 5 passos curtos (modo 80/20), peça autorização (NARA GUARD: "Você aprova este plano para registrarmos como tarefa ativa?") e, após o ok, entregue o cartão de registro verificável (NARA EVAL: Projeto, Tarefa, Status, Evidência e Próximo Passo).
  * [SKILL: AVALIADORA DE PROJETOS CONNECT HUB]: Se o usuário enviar um projeto social/impacto para avaliação formal, avalie em 3 critérios (Clareza, Viabilidade e Impacto de 0 a 10), calcule a média e dê o parecer (Aprovado >= 7 ou Rejeitado < 7) com os próximos passos.
  * [MODO MENTORA / NARA VISION]: Se houver uma imagem ou print anexado, descreva o que vê e dê instruções claras e práticas.

REGRAS DE SEGURANÇA (NARA GUARD):
- Nunca tome decisões externas, publique conteúdos ou altere configurações críticas sem mostrar o plano e pedir autorização explícita antes.
- Escreva respostas claras, naturais e bem organizadas (elas também serão lidas em voz alta para a usuária).

CONTEXTO ATUAL: ${context || "Conversa geral"}

HISTÓRICO RECENTE DA CONVERSA:
${history}

ÚLTIMA MENSAGEM DO USUÁRIO: "${lastMessage}"

RESPOSTA DA NARA (em português brasileiro claro):
`;

    const contents: any[] = [systemPrompt];

    if (image && typeof image === "string" && image.includes(",")) {
      const [meta, base64Data] = image.split(",");
      const match = meta.match(/:(.*?);/);
      const mimeType = match ? match : "image/png";
      contents.push({
        inlineData: {
          data: base64Data,
          mimeType: mimeType,
        },
      });
    }

    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: contents,
    });

    const responseText = result?.text || "Estou aqui! Como posso ajudar você e nossos projetos hoje?";

    return NextResponse.json({ text: responseText });
  } catch (error: any) {
    console.error("Erro na API da NARA:", error);
    return NextResponse.json({
      text: `⚠️ Ocorreu um detalhe técnico ao falar com o Gemini: ${error?.message || "Verifique sua chave API"}.`,
    });
  }
}
