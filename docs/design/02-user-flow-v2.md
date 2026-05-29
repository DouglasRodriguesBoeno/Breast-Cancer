# BreastCare AI V2 — User Flow

## 1. Objetivo

Este documento define o novo fluxo intuitivo da V2 do BreastCare AI.

A principal mudança é transformar a experiência de entrada do usuário. Em vez de iniciar diretamente no preenchimento das 30 features técnicas do modelo WDBC, a V2 deve iniciar com escolha de modo e priorizar a **Laudo Intelligence Layer**.

## 2. Decisão central da V2

```txt
Laudo Intelligence Layer vira a porta de entrada do produto.
WDBC Prediction Engine continua existindo, mas como capacidade complementar.
```

## 3. Fluxo principal

```txt
Landing Page
→ New Analysis / Mode Selection
→ Analyze Medical Report
→ Report Processing
→ Report Intelligence Result
→ WDBC Compatibility Bridge
→ Optional WDBC Prediction
→ History / Detail / Export
```

## 4. Fluxo em linguagem de produto

1. Usuário entende a proposta na Landing Page.
2. Usuário inicia uma nova análise.
3. Sistema pergunta como ele deseja começar.
4. Usuário escolhe o modo principal: Analyze medical report.
5. Usuário cola o texto do laudo.
6. Sistema estrutura o conteúdo e gera explicação educacional.
7. Sistema verifica compatibilidade com WDBC.
8. Se compatível, usuário pode rodar a predição estruturada.
9. Se não compatível, usuário ainda recebe explicação educacional segura.
10. Resultado fica salvo no histórico.

## 5. Modos de entrada

A tela `/new-analysis` deve abrir com quatro caminhos.

### 5.1 Analyze Medical Report

Caminho principal da V2.

```txt
Usuário cola ou envia um texto de laudo mamário.
Sistema gera explicação educacional estruturada.
Sistema identifica termos, BI-RADS quando mencionado, achados, medidas, lateralidade, localização e compatibilidade com WDBC.
```

### 5.2 Educational Demo

Caminho educacional rápido.

```txt
Usuário seleciona exemplos guiados para entender como o sistema e o modelo se comportam.
```

### 5.3 Import Structured Data

Caminho para usuários técnicos.

```txt
Usuário importa CSV ou JSON com features compatíveis com o modelo WDBC.
Sistema valida completude e permite rodar predição.
```

### 5.4 Advanced Manual Input

Caminho avançado.

```txt
Usuário preenche manualmente as 30 features.
Deve continuar existindo, mas não deve ser protagonista.
```

## 6. Usuário sem dados técnicos

A V2 deve funcionar bem para usuários que não possuem as 30 features WDBC.

Se o usuário não possui dados estruturados:

- Ele pode colar um laudo;
- Ele pode usar uma demonstração educacional;
- Ele pode receber explicação educacional sem rodar o modelo WDBC;
- O sistema deve explicar que o modelo WDBC exige 30 features numéricas específicas;
- O sistema não deve inventar features a partir do laudo.

## 7. WDBC Compatibility Bridge

O sistema deve verificar se os dados recebidos são compatíveis com o WDBC Prediction Engine.

### Estado compatível

```txt
Structured model-compatible data detected.
```

Ação:

```txt
Run structured prediction
```

### Estado não compatível

```txt
This report can be explained, but cannot be used for WDBC prediction because it does not contain the required 30 numerical features.
```

Ação sugerida:

```txt
Explore educational demo
View required features
```

## 8. Rotas sugeridas

| Rota | Responsabilidade |
|---|---|
| `/` | Landing Page V2 |
| `/new-analysis` | Seleção do modo de entrada |
| `/new-analysis/report` | Entrada de texto de laudo |
| `/new-analysis/demo` | Presets educacionais |
| `/new-analysis/import` | Upload/validação de CSV ou JSON |
| `/new-analysis/advanced` | Formulário avançado das 30 features |
| `/reports/[id]` | Detalhe da análise de laudo |
| `/predictions/[id]` | Detalhe da predição WDBC |
| `/history` | Histórico unificado |
| `/dashboard` | Métricas da plataforma |
| `/model` | Informações do modelo WDBC |
| `/system-status` | Status técnico dos serviços |

## 9. Estados principais do fluxo

```ts
export type AnalysisFlowState =
  | "MODE_SELECTION"
  | "REPORT_INPUT"
  | "REPORT_SUBMITTING"
  | "REPORT_COMPLETED"
  | "REPORT_ERROR"
  | "WDBC_COMPATIBLE"
  | "WDBC_NOT_COMPATIBLE"
  | "PREDICTION_SUBMITTING"
  | "PREDICTION_COMPLETED";
```

## 10. Regra obrigatória

```txt
A tela New Analysis não deve exibir diretamente as 30 features como primeira experiência.
```

O fluxo antigo deve ser preservado em `/new-analysis/advanced` ou em uma área de demonstração educacional.
