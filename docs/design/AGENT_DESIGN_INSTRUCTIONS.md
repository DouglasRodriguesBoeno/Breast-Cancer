# Agent Design Instructions — BreastCare AI V2

## 1. Papel do agente

Você é um agente de implementação do BreastCare AI V2.

Antes de implementar qualquer tela, componente ou fluxo, leia as specs disponíveis em:

```txt
docs/design/
```

## 2. Ordem obrigatória de leitura

Para qualquer tarefa visual/frontend:

1. `01-design-system-v2.md`
2. `05-copy-safety-guidelines.md`
3. `02-user-flow-v2.md`, se a tarefa envolver fluxo
4. `03-screen-specs-v2.md`, para a tela específica
5. `04-frontend-handoff-v2.md`, para instruções de implementação
6. `spec-router.json`, para identificar specs por tarefa

## 3. Regras obrigatórias

Nunca:

- Inventar cores fora do design system sem justificar.
- Usar linguagem diagnóstica.
- Colocar o usuário direto nas 30 features na entrada principal.
- Remover disclaimers educacionais.
- Inventar features WDBC a partir de laudo.
- Usar imagens reais de pacientes, médicos ou exames.
- Posicionar o sistema como diagnóstico clínico.

Sempre:

- Usar background `#F8FAFC`.
- Usar cards `#FFFFFF` com borda `#E2E8F0`.
- Usar CTA principal em `#E11D48`.
- Manter tom educacional, claro e seguro.
- Preservar rotas existentes quando possível.
- Implementar responsividade.
- Manter o WDBC Prediction Engine como fluxo complementar.
- Priorizar a Laudo Intelligence Layer como fluxo principal da V2.

## 4. Como responder antes de implementar

Antes de codar, o agente deve informar:

```txt
Specs aplicadas:
Arquivos que serão alterados:
Plano curto:
Riscos/cuidados:
```

Depois da implementação, deve retornar:

```txt
O que foi alterado:
Como testar:
Checklist de aceite:
Pontos de atenção:
```

## 5. Checklist visual obrigatório

- [ ] Background principal `#F8FAFC`.
- [ ] Cards brancos `#FFFFFF`.
- [ ] Bordas suaves `#E2E8F0`.
- [ ] CTA principal rose `#E11D48`.
- [ ] Tipografia moderna e legível.
- [ ] Espaçamento generoso.
- [ ] Sem excesso de rosa.
- [ ] Sem visual hospitalar antigo.
- [ ] Sem linguagem alarmista.
- [ ] Sem imagens clínicas reais.

## 6. Checklist de segurança obrigatório

- [ ] Disclaimer educacional visível.
- [ ] Não usa a palavra diagnóstico como resultado do sistema.
- [ ] Não sugere tratamento.
- [ ] Não define urgência médica.
- [ ] Não substitui profissional de saúde.
- [ ] Não transforma probabilidade em conclusão clínica.

## 7. Checklist de fluxo obrigatório

- [ ] `/new-analysis` começa com escolha de modo.
- [ ] Analyze medical report é o caminho principal.
- [ ] Educational demo está disponível para usuários sem dados.
- [ ] Import structured data está disponível para usuários técnicos.
- [ ] Advanced manual input preserva as 30 features, mas não é protagonista.
- [ ] WDBC roda somente com dados compatíveis.

## 8. Prompt rápido para tarefas

```txt
Use as specs em docs/design para implementar a tarefa abaixo.

Tarefa:
[descrever tarefa]

Antes de implementar, identifique a chave adequada no spec-router.json e liste as specs aplicadas.
Siga obrigatoriamente o Design System Clinical Calm AI e as Copy & Safety Guidelines.
```
