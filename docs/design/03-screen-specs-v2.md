# BreastCare AI V2 — Screen Specs

## 1. Nomenclatura de frames

```txt
01 / Landing Page V2
02 / New Analysis - Mode Selection
03 / Analyze Report - Input
04 / Report Analysis - Loading
05 / Report Intelligence - Result
06 / WDBC Compatibility Bridge
07 / Educational Demo
08 / Import Structured Data
09 / Advanced Manual Input
10 / Dashboard V2
11 / System Status
12 / Report History
```

---

# 01 / Landing Page V2

## Objetivo

Apresentar o novo posicionamento do BreastCare AI V2 como uma plataforma educacional de IA para transformar laudos mamários em explicações claras, multilíngues e rastreáveis.

## Hero

Título:

```txt
BreastCare AI
```

Headline:

```txt
Transform breast reports into clear, multilingual and educational AI insights.
```

Subtexto:

```txt
Analyze medical reports, understand key findings and run structured ML predictions when compatible data is available.
```

CTAs:

```txt
Analyze a report
Explore educational demo
```

## Seções/cards

- Report Intelligence
- Explainable ML
- Multilingual Experience
- Educational Safety
- Production-ready AI Architecture

## Disclaimer

```txt
Educational only — BreastCare AI does not provide medical diagnosis and does not replace professional medical evaluation.
```

---

# 02 / New Analysis - Mode Selection

## Rota

```txt
/new-analysis
```

## Objetivo

Permitir que o usuário escolha como deseja iniciar a análise, priorizando o fluxo de laudo como caminho principal da V2.

## Layout

- Header no topo
- Título e subtítulo da página
- Grid 2x2 com quatro cards de modo
- Card recomendado em destaque
- Painel ou notice de segurança educacional

## Título

```txt
How would you like to start?
```

## Subtítulo

```txt
Choose a guided path. You can analyze a report, explore educational examples or use structured WDBC data.
```

## Card 1 — recomendado

Título:

```txt
Analyze medical report
```

Badge:

```txt
Recommended
```

Descrição:

```txt
Paste or upload a breast report and receive a structured educational explanation.
```

Bullets:

```txt
Extract key findings
Identify BI-RADS when mentioned
Explain terms in simple language
Check WDBC compatibility
```

CTA:

```txt
Start with report
```

Rota:

```txt
/new-analysis/report
```

## Card 2

Título:

```txt
Educational demo
```

Descrição:

```txt
Use guided examples to understand how the model works.
```

Rota:

```txt
/new-analysis/demo
```

## Card 3

Título:

```txt
Import structured data
```

Descrição:

```txt
Upload WDBC-compatible CSV or JSON data.
```

Rota:

```txt
/new-analysis/import
```

## Card 4

Título:

```txt
Advanced manual input
```

Descrição:

```txt
Manually fill all 30 model features.
```

Rota:

```txt
/new-analysis/advanced
```

## Critérios de aceite

- A tela não deve exibir diretamente as 30 features.
- O card Analyze medical report deve ser o mais destacado.
- Deve existir disclaimer educacional visível.
- Deve preservar acesso ao fluxo WDBC avançado.

---

# 03 / Analyze Report - Input

## Rota

```txt
/new-analysis/report
```

## Objetivo

Permitir que o usuário cole o texto de um laudo mamário e execute a análise educacional da Laudo Intelligence Layer.

## Layout

- Header no topo
- Área principal em duas colunas
- Coluna esquerda: formulário de entrada do laudo
- Coluna direita: cards explicativos e segurança
- Notice educacional discreto

## Título

```txt
Analyze medical report
```

## Subtítulo

```txt
Paste a breast exam report and receive a structured educational explanation.
```

## Formulário

Campos:

- Report text
- Output language
- Report type optional
- Educational acknowledgement checkbox

Placeholder:

```txt
Paste the breast exam report text here...
```

Idiomas:

```txt
Portuguese
English
Spanish
```

Checkbox:

```txt
I understand this is educational and not a medical diagnosis.
```

CTA:

```txt
Analyze report
```

## Card lateral — What this analysis does

Itens:

```txt
Extracts key findings
Identifies BI-RADS when mentioned
Explains medical terms
Checks WDBC compatibility
Keeps safety notes visible
```

## Card lateral — What it does not do

Itens:

```txt
Does not diagnose
Does not replace a healthcare professional
Does not recommend treatment
Does not invent WDBC features
```

## Estados

- Empty
- Typing
- Ready to submit
- Submitting
- Error
- Success redirect

## Critérios de aceite

- Botão deve ficar desabilitado sem texto ou sem checkbox marcado.
- Deve ter disclaimer educacional.
- Não deve aceitar que a UI prometa diagnóstico.

---

# 04 / Report Analysis - Loading

## Objetivo

Mostrar processamento de forma calma, transparente e confiável.

## Título

```txt
Reading and structuring the report...
```

## Subtítulo

```txt
BreastCare AI is organizing the report into educational insights while keeping safety checks active.
```

## Steps visuais

```txt
1. Extracting report text
2. Identifying key findings
3. Building educational explanation
4. Checking model compatibility
```

## Visual

- Card central grande
- Progress bar suave
- Ícone abstrato de documento + IA
- Sem pessoas/médicos/imagens clínicas reais
- Sem linguagem alarmista

---

# 05 / Report Intelligence - Result

## Rota

```txt
/reports/[id]
```

## Objetivo

Exibir o resultado estruturado da análise de laudo com explicação simples, achados, termos importantes, compatibilidade WDBC e notas de segurança.

## Header da página

Título:

```txt
Report analysis completed
```

Badges:

```txt
Educational only
Detected language: Portuguese
Exam type: Mammography
```

## Cards principais

### Simple Explanation

Texto deve explicar em linguagem humana e segura o que o laudo menciona.

### Structured Findings

Campos:

```txt
Exam type
BI-RADS, if mentioned
Breast side
Location
Measurements
Mentioned findings
Recommendations mentioned in the report
```

### Important Terms

Termos possíveis:

```txt
Nódulo
Margens
Calcificações
Assimetria
BI-RADS
```

Cada termo deve conter breve explicação educacional.

### WDBC Compatibility

Estado não compatível:

```txt
Can run WDBC prediction? No
Missing features: 30
Reason: This report does not contain the 30 numerical features required by the current WDBC model.
```

Estado compatível:

```txt
Can run WDBC prediction? Yes
Structured model-compatible data detected.
```

### Safety Notes

```txt
This system is educational only.
It does not provide diagnosis.
It does not replace a healthcare professional.
```

---

# 06 / WDBC Compatibility Bridge

## Objetivo

Explicar a ponte entre Laudo Intelligence Layer e WDBC Prediction Engine.

## Fluxo visual

```txt
Report Intelligence Layer → Compatibility Check → WDBC Prediction Engine
```

## Estado não compatível

Título:

```txt
Report explained, prediction not available
```

Texto:

```txt
This report can be explained educationally, but it cannot be used for WDBC prediction because it does not contain the required 30 numerical features.
```

CTA:

```txt
Explore educational demo
```

## Estado compatível

Título:

```txt
Structured model-compatible data detected
```

Texto:

```txt
BreastCare AI identified structured numerical features compatible with the WDBC Prediction Engine.
```

CTA:

```txt
Run prediction
```

---

# 07 / Educational Demo

## Rota

```txt
/new-analysis/demo
```

## Objetivo

Permitir que o usuário use exemplos educacionais sem precisar fornecer dados próprios.

## Presets

- Benign pattern example
- Malignant pattern example
- Intermediate pattern example
- High confidence example
- Low confidence example

Cada card deve explicar:

```txt
Uses educational sample data to demonstrate how the model behaves.
```

---

# 08 / Import Structured Data

## Rota

```txt
/new-analysis/import
```

## Objetivo

Permitir upload/entrada de CSV ou JSON com dados compatíveis com WDBC.

## Elementos

- Upload area
- Preview table
- Feature completeness score
- Missing features list
- Button: Validate data
- Button: Run prediction

---

# 09 / Advanced Manual Input

## Rota

```txt
/new-analysis/advanced
```

## Objetivo

Manter o formulário das 30 features para uso técnico/avançado.

## Organização

Agrupar em accordions:

- Mean features
- Standard error features
- Worst features

## Regras

- Não deve ser a primeira experiência da nova análise.
- Deve ter tooltips e preview de completude.
- Deve manter disclaimer educacional.

---

# 10 / Dashboard V2

## Objetivo

Mostrar visão analítica do produto.

## Métricas

- Total report analyses
- Total WDBC predictions
- Reports by language
- Reports by exam type
- WDBC compatible reports
- Prediction risk distribution
- ML Service status
- Report Intelligence status
- Average processing time

---

# 11 / System Status

## Objetivo

Mostrar status técnico dos serviços.

## Cards

- Frontend status
- Backend status
- ML Service status
- Report Intelligence Service status
- Database status
- Model loaded
- Predict ready
- Last health check

---

# 12 / Report History

## Objetivo

Histórico unificado com dois tipos de registro.

Tipos:

- Report Intelligence analysis
- WDBC prediction

## Cards de histórico

- Tipo
- Data
- Idioma
- Status
- BI-RADS se encontrado
- WDBC compatible yes/no
- Botão View details
