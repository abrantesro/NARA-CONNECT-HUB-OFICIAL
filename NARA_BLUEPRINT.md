# NARA_BLUEPRINT.md
## Arquitetura-Mestra da NARA

**Versão:** 0.2 — Arquitetura Modular e Executiva  
**Projeto:** NARA — Núcleo de Apoio à Recuperação Ambiental e Desenvolvimento Inteligente  
**Ecossistema:** Connect Hub | Azmtech | DECIDA AÍ

---

## 1. IDENTIDADE E MISSÃO

A NARA será uma agente de inteligência artificial multimodal, operacional, secretária executiva de última geração e mentora tecnológica autônoma sob supervisão. Foi concebida para compreender necessidades humanas, organizar conhecimentos, planejar soluções, utilizar ferramentas, guiar o usuário passo a passo e executar tarefas autorizadas.

Sua missão é transformar solicitações em resultados concretos, conectando pessoas, conhecimentos, projetos e tecnologias com clareza e segurança.

**Princípio de funcionamento:**

ESCUTAR → COMPREENDER → RACIOCINAR → PLANEJAR → AUTORIZAR → EXECUTAR → VERIFICAR → REGISTRAR → RETORNAR.

---

## 2. OS TRÊS PILARES FUNDAMENTAIS

### Pilar 1 — Inteligência
- Compreensão contextual.
- Raciocínio lógico e planejamento estratégico.
- Resolução de problemas e tomada de decisão fundamentada.

### Pilar 2 — Capacidade Operacional
- Utilização de ferramentas e navegação na internet.
- Manipulação autorizada de arquivos.
- Integração com serviços externos e automação de processos.

### Pilar 3 — Autocontrole
- Verificação dos resultados e identificação de erros.
- Avaliação de riscos, registro das operações e prestação de contas.
- Solicitação de autorização humana obrigatória antes de ações críticas.

---

## 3. OS 13 MODOS DE INTELIGÊNCIA

1. **Cheatsheet:** consultas rápidas, sínteses e orientações práticas.
2. **Blueprint:** planejamento e estruturação de projetos completos.
3. **Flashcards:** aprendizagem, memorização e revisão.
4. **Mind Map:** organização visual e conexão de ideias.
5. **Truth Mode:** diferenciação entre fatos, hipóteses e informações não verificadas.
6. **ELI10:** explicações acessíveis, sem termos técnicos difíceis.
7. **Red Team:** identificação de vulnerabilidades, falhas e riscos.
8. **Hormozi:** estratégia comercial, propostas de valor e construção de ofertas.
9. **Human:** comunicação empática, acolhedora e centrada nas pessoas.
10. **Future You:** análise de consequências e cenários futuros.
11. **Unlearn:** questionamento de práticas antigas e revisão de processos.
12. **80/20:** identificação de prioridades e ações de maior impacto.
13. **Socrates:** perguntas estratégicas para aprofundar a compreensão e melhorar decisões.

---

## 4. ARQUITETURA MODULAR (10 MÓDULOS)

- **NARA CORE:** Cérebro central, coordenação, raciocínio e planejamento.
- **NARA GUIDE:** Mentora tecnológica passo a passo (traduz termos técnicos, orienta tela por tela e garante autonomia ao usuário).
- **NARA VOICE:** Entrada e saída de voz, reconhecimento de fala e comunicação oral.
- **NARA VISION:** Interpretação de imagens, capturas de tela, documentos e fotografias.
- **NARA SKILLS:** Biblioteca de habilidades especializadas (Negócios e Engenharia) reutilizáveis.
- **NARA HANDS:** Execução autorizada de tarefas no computador, arquivos e navegador.
- **NARA CONNECT:** Integrações com WhatsApp, redes sociais, sites (Hostinger/Vercel) e serviços externos.
- **NARA MEMORY:** Memória contextual, histórico de projetos ativos, preferências e continuidade.
- **NARA GUARD:** Segurança, permissões, proteção de credenciais e aprovação humana.
- **NARA EVAL:** Testes, avaliação de desempenho, detecção de falhas e melhoria contínua.

---

## 5. BIBLIOTECA DE SKILLS (HABILIDADES)

### 5.1 Skills de Negócio e Rotina (Prioridade Fase 1)
- **skill-gestora-projetos:** Acompanhamento de tarefas, prazos e evolução dos projetos ativos (DECIDA AÍ, Azmtech, Connect Hub, Cursos).
- **skill-criadora-sites:** Estruturação de páginas, textos persuasivos e códigos simples prontos para Hostinger.
- **skill-redes-sociais:** Criação de roteiros curtos, legendas e calendários para Instagram, Facebook e LinkedIn.
- **skill-criadora-subagentes:** Geração de prompts completos para novos agentes de atendimento e vendas.

### 5.2 Skills de Engenharia (Fase 2 — Expansão Técnica)
- **prompt-engineer:** Construção, auditoria e segurança de prompts.
- **skill-creator:** Criação, validação e aperfeiçoamento de novas Skills.
- **mcp-builder:** Construção de integrações via MCP.
- **agentic-eval:** Avaliação e medição da qualidade dos agentes.
- **openai-docs:** Consulta à documentação técnica.

**Regra de incorporação:** Verificar origem, licença e compatibilidade antes de instalar qualquer Skill externa.

---

## 6. CÉREBRO MULTIMODAL E INDEPENDÊNCIA

A NARA trabalhará com **Texto, Voz, Áudio, Imagens, Documentos e Conteúdo Estruturado**, mantendo arquitetura aberta para permitir a substituição de provedores de IA sem dependência de um único fornecedor.

---

## 7. SISTEMA OPERACIONAL — NARA HANDS

Capacidades planejadas sob autorização:
1. Abrir e navegar em sites e pesquisar informações.
2. Preencher formulários autorizados e trabalhar com planilhas.
3. Criar, ler, editar e organizar arquivos e documentos.
4. Executar tarefas repetitivas, registrar operações e verificar resultados.

---

## 8. SEGURANÇA E AUTORIZAÇÕES (NARA GUARD)

- Nenhuma senha, token ou chave secreta de API poderá ser armazenada no código-fonte ou repositórios públicos.
- Operações externas, financeiras, destrutivas ou de publicação exigem aprovação humana explícita.

---

## 9. AVALIAÇÃO E QUALIDADE (NARA EVAL)

Cada tarefa possui um estado verificável:  
`PENDENTE → PLANEJADA → AGUARDANDO AUTORIZAÇÃO → EM EXECUÇÃO → CONCLUÍDA ou FALHOU.`

Uma tarefa somente é considerada concluída quando há evidência compatível com o resultado esperado.

---

## 10. ESTRATÉGIA DE CUSTOS

1. Priorizar ferramentas gratuitas, código aberto e serviços com cotas gratuitas.
2. Controlar consumo e limites de API antes de qualquer contratação paga.

---

## 11. PRIMEIRO PRODUTO FUNCIONAL — MVP

**Fluxo de demonstração:**  
Solicitação → Interpretação → Plano → Ferramentas → Permissões → Autorização → Execução simples → Verificação → Evidência.

**Critério de aprovação do MVP:**  
Uma tarefa simples deverá ser executada de ponta a ponta, com registro da operação, confirmação do resultado e tratamento de falhas. Somente após essa validação ampliaremos as integrações e a autonomia.

---

**DIRETRIZ FUNDAMENTAL**  
A NARA não será apenas uma interface de conversação. Será um sistema modular de inteligência, ferramentas, execução e verificação, construído para evoluir com segurança, independência tecnológica e capacidade de expansão.
