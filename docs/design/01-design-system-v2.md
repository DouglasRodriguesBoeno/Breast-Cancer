# BreastCare AI V2 — Design System

## 1. Identidade visual

**Nome:** Clinical Calm AI  
**Produto:** BreastCare AI V2 — Report Intelligence & Explainable AI

A V2 deve parecer uma aplicação SaaS B2B de IA em saúde: limpa, moderna, segura, educacional e confiável. A interface deve ser mais humana e guiada do que técnica, mantendo o WDBC Prediction Engine como camada complementar.

## 2. Princípios visuais

- Clean healthtech
- SaaS premium
- Clinical Calm AI
- Muito espaço em branco
- Cards brancos com bordas suaves
- Cantos arredondados
- Sombras leves
- Ícones discretos de saúde, IA, documento, escudo e gráfico
- Linguagem visual segura, sem alarmismo
- Não usar imagens reais de pacientes, médicos ou exames

## 3. Paleta oficial

| Token | Hex | Uso |
|---|---:|---|
| background | #F8FAFC | Fundo principal |
| surface | #FFFFFF | Cards, modais e containers |
| border | #E2E8F0 | Bordas suaves |
| text.primary | #0F172A | Títulos e texto principal |
| text.secondary | #475569 | Subtítulos e descrições |
| text.muted | #64748B | Labels, metadados e textos auxiliares |
| primary.rose | #E11D48 | CTA principal e destaque controlado |
| primary.rose.soft | #FFE4E6 | Badges e fundos suaves rose |
| secondary.teal | #0F766E | Segurança, confiança e status positivos |
| secondary.teal.soft | #CCFBF1 | Fundos suaves teal |
| accent.blue | #2563EB | Informação, IA, links e dados técnicos |
| accent.blue.soft | #DBEAFE | Fundos informativos suaves |
| risk.low | #16A34A | Baixa faixa de risco educacional |
| risk.low.soft | #DCFCE7 | Fundo de baixa faixa de risco |
| risk.medium | #D97706 | Faixa intermediária |
| risk.medium.soft | #FEF3C7 | Fundo de faixa intermediária |
| risk.high | #E11D48 | Alta faixa de risco educacional |
| risk.high.soft | #FFE4E6 | Fundo de alta faixa de risco |

## 4. Tipografia

Fonte recomendada: **Inter**.  
Alternativa: **Geist Sans**.

| Estilo | Tamanho | Peso | Line-height | Uso |
|---|---:|---:|---:|---|
| Display | 56px | 700 | 64px | Hero principal |
| H1 | 40px | 700 | 48px | Título de página |
| H2 | 32px | 700 | 40px | Título de seção |
| H3 | 24px | 650 | 32px | Título de card grande |
| H4 | 18px | 650 | 28px | Título de card |
| Body Large | 18px | 400 | 30px | Hero e textos de apoio |
| Body | 16px | 400 | 26px | Texto padrão |
| Body Small | 14px | 400 | 22px | Descrições |
| Caption | 12px | 500 | 18px | Badges e metadados |

## 5. Espaçamento

Base: 8px.

| Token | Valor |
|---|---:|
| space.1 | 4px |
| space.2 | 8px |
| space.3 | 12px |
| space.4 | 16px |
| space.5 | 20px |
| space.6 | 24px |
| space.8 | 32px |
| space.10 | 40px |
| space.12 | 48px |
| space.16 | 64px |

## 6. Radius

| Token | Valor | Uso |
|---|---:|---|
| radius.sm | 8px | Inputs pequenos e badges |
| radius.md | 12px | Botões e campos |
| radius.lg | 16px | Cards menores |
| radius.xl | 20px | Cards principais |
| radius.2xl | 24px | Containers grandes |
| radius.full | 999px | Pills e badges |

## 7. Sombras

Usar sombras muito suaves. Exemplo CSS:

```css
box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
```

## 8. Grid

### Desktop

- Frame Figma: 1440 x 1024
- Container max-width: 1200px
- Padding lateral: 32px
- Grid: 12 colunas
- Gutter: 24px

### Apresentação/mockups

- Frame: 1920 x 1080
- Ideal para mostrar 3 telas lado a lado

### Mobile

- Frame: 390 x 844
- Cards empilhados
- CTA em largura total quando fizer sentido

## 9. Componentes base

- AppHeader
- PageShell
- BentoCard
- ModeSelectionCard
- ButtonPrimary
- ButtonSecondary
- Badge
- SafetyNotice
- ReportTextarea
- LanguageSelect
- StepProgress
- StatusBadge
- MetricCard
- EmptyState
- LoadingState
- ErrorState

## 10. Regras visuais obrigatórias

- O background geral deve usar `#F8FAFC`.
- Cards devem usar `#FFFFFF` com borda `#E2E8F0`.
- CTA principal deve usar `#E11D48`.
- O rose deve ser usado com moderação.
- O sistema deve parecer educacional, não hospitalar antigo.
- Toda tela sensível deve ter disclaimer educacional visível.
- Não usar linguagem visual alarmista.
