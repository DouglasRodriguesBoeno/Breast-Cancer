# BreastCare AI V2 — Frontend Handoff

## 1. Objetivo

Este documento orienta agentes, Codex ou desenvolvedores na implementação frontend da V2 do BreastCare AI.

A V2 deve priorizar a Laudo Intelligence Layer como fluxo principal e manter o WDBC Prediction Engine como capacidade complementar.

## 2. Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui ou componentes base equivalentes

## 3. Fonte de verdade

Sempre consultar:

```txt
docs/design/01-design-system-v2.md
docs/design/02-user-flow-v2.md
docs/design/03-screen-specs-v2.md
docs/design/05-copy-safety-guidelines.md
docs/design/spec-router.json
docs/design/AGENT_DESIGN_INSTRUCTIONS.md
```

## 4. Regras obrigatórias

- Usar a identidade Clinical Calm AI.
- Não usar linguagem diagnóstica.
- Não colocar o usuário direto nas 30 features.
- Manter disclaimers educacionais visíveis.
- Não inventar funcionalidades médicas.
- Não usar imagens reais de pacientes, médicos ou exames.
- WDBC Prediction Engine é complementar.
- Laudo Intelligence Layer é o fluxo principal da V2.

## 5. Rotas sugeridas

```txt
/
/new-analysis
/new-analysis/report
/new-analysis/demo
/new-analysis/import
/new-analysis/advanced
/reports/[id]
/predictions/[id]
/history
/dashboard
/model
/system-status
```

## 6. Primeira tarefa recomendada

### Tarefa

Refatorar `/new-analysis` para exibir a tela **New Analysis — Mode Selection**.

### Fazer

- Criar tela de seleção de modo.
- Criar quatro cards:
  - Analyze medical report
  - Educational demo
  - Import structured data
  - Advanced manual input
- Destacar o card Analyze medical report como recomendado.
- Navegar para as rotas corretas.
- Manter notice/disclaimer educacional.

### Não fazer

- Não remover o fluxo WDBC atual.
- Não alterar endpoints existentes.
- Não implementar backend nesta tarefa.
- Não exibir diretamente o formulário das 30 features.

### Componentes sugeridos

- AnalysisModeSelection
- ModeSelectionCard
- SafetyNotice
- AppHeader
- PageShell

## 7. Segunda tarefa recomendada

### Tarefa

Criar `/new-analysis/report` com input de laudo.

### Fazer

- Criar textarea grande para o laudo.
- Criar seletor de idioma.
- Criar checkbox educacional obrigatório.
- Criar botão Analyze report.
- Criar cards laterais:
  - What this analysis does
  - What it does not do

### Estados

- Empty
- Typing
- Ready
- Submitting
- Error
- Success redirect

### Não fazer

- Não prometer diagnóstico.
- Não gerar features WDBC a partir do texto no frontend.
- Não fazer upload PDF obrigatório no MVP.

## 8. Terceira tarefa recomendada

### Tarefa

Criar resultado da Laudo Intelligence Layer em `/reports/[id]`.

### Cards

- SimpleExplanationCard
- StructuredFindingsCard
- ImportantTermsCard
- WdbcCompatibilityCard
- SafetyNotesCard

## 9. Critérios gerais de aceite

- [ ] Usa background `#F8FAFC`.
- [ ] Usa cards `#FFFFFF` com borda `#E2E8F0`.
- [ ] CTA principal usa `#E11D48`.
- [ ] Disclaimer educacional visível.
- [ ] Não usa linguagem diagnóstica.
- [ ] Responsivo em mobile.
- [ ] Não mostra 30 features como primeira experiência.
- [ ] WDBC aparece como caminho complementar.
- [ ] Mantém fluxo atual acessível por rota avançada/demo.

## 10. Prompt base para agente

```txt
Você é meu agente de desenvolvimento frontend do BreastCare AI V2.

Antes de implementar, leia obrigatoriamente os arquivos em /docs/design.

Tarefa:
[descrever tarefa aqui]

Regras:
- Preserve a identidade Clinical Calm AI.
- Não use linguagem diagnóstica.
- Não coloque o usuário direto nas 30 features.
- Mantenha disclaimers educacionais.
- Não invente funcionalidades médicas.
- WDBC Prediction Engine é complementar.
- Laudo Intelligence Layer é o fluxo principal da V2.

Antes de codar:
1. Identifique quais specs se aplicam.
2. Liste os arquivos que serão alterados.
3. Explique o plano curto.
4. Depois implemente.
5. Finalize com checklist de aceite.
```
