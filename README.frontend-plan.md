# BreastCare AI — Frontend V1

BreastCare AI é uma aplicação web educacional de IA para análise preditiva baseada em Machine Learning sobre o dataset Wisconsin Diagnostic Breast Cancer.

> **Importante:** este projeto é estritamente educacional. Ele não realiza diagnóstico médico, não substitui avaliação médica, exames complementares ou acompanhamento profissional.

---

## Visão geral

A V1 do frontend tem como objetivo transformar a base técnica já construída em uma experiência visual clara, amigável e profissional.

O sistema será composto por:

- Frontend Web em Next.js;
- Backend API em Java Spring Boot;
- ML Service em Python/FastAPI;
- Banco de dados PostgreSQL;
- Persistência de análises;
- Histórico;
- Tela de detalhe;
- Resultado explicável;
- Avisos educacionais.

A experiência principal não será baseada em um formulário técnico com 30 campos. A V1 usará uma entrada guiada por cenários para facilitar o uso e melhorar a apresentação do produto.

---

## Nome visual

**BreastCare AI**

---

## Direção visual

O estilo aprovado para a V1 é:

**Clinical Calm AI**

Uma mistura entre:

- healthtech limpa e acolhedora;
- dashboard moderno de IA;
- produto SaaS premium;
- experiência educacional segura;
- visual claro, amigável e profissional.

A referência visual aprovada possui três telas principais:

1. Landing page / Home;
2. Nova análise guiada;
3. Resultado / detalhe da análise.

---

## Stack do frontend

A V1 será implementada com:

- Next.js;
- React;
- TypeScript;
- Tailwind CSS;
- shadcn/ui;
- lucide-react;
- TanStack Query;
- React Hook Form;
- Zod;
- Recharts.

---

## Motivos da escolha

### Next.js

Base moderna para aplicações React, boa estrutura por rotas e excelente para portfólio.

### TypeScript

Garante mais segurança no contrato entre frontend e backend.

### Tailwind CSS

Permite implementar o design com velocidade, consistência e alta fidelidade visual.

### shadcn/ui

Fornece componentes modernos, acessíveis e fáceis de customizar.

### lucide-react

Biblioteca de ícones minimalista e consistente com a proposta visual.

### TanStack Query

Responsável pelo controle profissional de loading, erro, cache e chamadas HTTP.

### React Hook Form + Zod

Será usado no modo avançado de features, com validação de formulário.

### Recharts

Será usado para gráficos simples de probabilidade, confiança e visualização do resultado.

---

## Paleta visual

### Base

```css
--background: #F8FAFC;
--surface: #FFFFFF;
--surface-muted: #F1F5F9;

--text-primary: #0F172A;
--text-secondary: #475569;
--text-muted: #64748B;

--border: #E2E8F0;