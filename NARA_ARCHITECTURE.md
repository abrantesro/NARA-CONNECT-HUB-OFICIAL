# NARA_ARCHITECTURE.md
## Arquitetura Técnica e Fluxo Operacional da NARA

**Versão:** 0.1 — Arquitetura Modular Conectada  
**Referência:** `NARA_BLUEPRINT.md` (v0.2)  
**Repositório:** `abrantesro/NARA-CONNECT-HUB-OFICIAL`

---

## 1. VISÃO GERAL DA COMUNICAÇÃO ENTRE MÓDULOS

A NARA opera como um sistema modular em camadas, onde o **NARA CORE** funciona como o maestro central que recebe pedidos, consulta a memória, aciona habilidades e pede permissão antes de agir.

```text
[ USUÁRIO (Texto / Voz / Imagem) ]
               │
               ▼
   ┌───────────────────────┐
   │  NARA VOICE & VISION  │  ← Entrada multimodal (ouve, lê telas e documentos)
   └───────────────────────┘
               │
               ▼
   ┌───────────────────────┐
   │       NARA CORE       │  ← Cérebro Central + 13 Modos + NARA GUIDE (Mentora)
   └───────────────────────┘
        │      │      │
        ▼      ▼      ▼
  [MEMORY] [SKILLS] [GUARD]   ← Consulta contexto, carrega Skill e checa permissão
               │
               ▼
   ┌───────────────────────┐
   │ NARA HANDS & CONNECT  │  ← Executa tarefas e integra (Site, WhatsApp, Redes)
   └───────────────────────┘
               │
               ▼
   ┌───────────────────────┐
   │       NARA EVAL       │  ← Verifica resultado, registra evidência e retorna
   └───────────────────────┘
```

---

## 2. PAPEL DE CADA CAMADA NA PRÁTICA

### Camada 1: Percepção (Entrada e Saída)
- **NARA VOICE:** Converte fala em texto e respostas em áudio natural.
- **NARA VISION:** Analisa capturas de tela (prints), documentos e fotos enviados pelo usuário para orientar passo a passo.

### Camada 2: Inteligência e Orientação
- **NARA CORE:** Interpreta a intenção do usuário, escolhe o **Modo de Inteligência** adequado (ex: *ELI10*, *Blueprint*, *Hormozi*, *80/20*) e monta o plano de execução.
- **NARA GUIDE:** Garante que toda orientação técnica seja entregue em linguagem simples, tela por tela, permitindo que o usuário evolua com autonomia.

### Camada 3: Conhecimento, Habilidades e Segurança
- **NARA MEMORY:** Separa e organiza três gavetas distintas:
  1. *Dados do Usuário e Preferências.*
  2. *Projetos Ativos* (`DECIDA AÍ`, `Azmtech`, `Connect Hub`, `Cursos de IA`).
  3. *Registros Operacionais* (histórico de tarefas executadas).
- **NARA SKILLS:** Carrega sob demanda apenas o bloco de instruções necessário para a tarefa atual, mantendo o sistema leve e rápido.
- **NARA GUARD:** Atua como barreira de proteção obrigatória antes de qualquer ação externa, publicação, envio de mensagem ou alteração de arquivo.

### Camada 4: Execução e Conexão
- **NARA HANDS:** Manipula arquivos, organiza documentos e executa fluxos autorizados.
- **NARA CONNECT:** Faz a ponte com o site (Vercel/Hostinger), WhatsApp, redes sociais e APIs externas.

### Camada 5: Auditoria
- **NARA EVAL:** Valida se a entrega corresponde ao pedido original e atualiza o status da tarefa (`PENDENTE → PLANEJADA → AGUARDANDO AUTORIZAÇÃO → EM EXECUÇÃO → CONCLUÍDA`).

---

## 3. ESTRUTURA DE PASTAS PLANEJADA NO REPOSITÓRIO

Para preservar a aplicação Next.js já em produção (`app/`), toda a expansão modular da NARA será organizada em pastas dedicadas:

```text
NARA-CONNECT-HUB-OFICIAL/
├── app/                      # Aplicação Web e API atual (Next.js / Vercel)
│   └── api/nara/route.ts     # Endpoint principal do cérebro da NARA
├── nara/                     # Novo núcleo modular da NARA
│   ├── prompts/              # Cérebro Base (SYSTEM_PROMPT_NARA.md)
│   ├── skills/               # Habilidades plug-and-play (.md)
│   └── memory/               # Modelos de organização de projetos
├── NARA_BLUEPRINT.md         # Planta-mestra e diretrizes (v0.2)
├── NARA_ARCHITECTURE.md      # Este documento (fluxo entre módulos)
└── README.md                 # Apresentação geral do repositório
```

---

## 4. PROTOCOLO DE ATIVAÇÃO DE SKILLS

1. **Identificação:** O `NARA CORE` detecta o tema da solicitação (ex: "criar página para Hostinger" ou "organizar tarefas do DECIDA AÍ").
2. **Carregamento:** O sistema lê apenas o arquivo `.md` correspondente dentro de `nara/skills/`.
3. **Execução Guiada:** A NARA segue o passo a passo da Skill, aplicando o filtro do `NARA GUIDE` (clareza) e do `NARA GUARD` (segurança).
4. **Encerramento:** O `NARA EVAL` confirma a entrega e sugere o próximo passo lógico.
