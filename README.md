# BreastCare AI — Frontend V1

BreastCare AI é uma aplicação web educacional de IA aplicada à saúde, focada em análise preditiva baseada em Machine Learning sobre o dataset **Wisconsin Diagnostic Breast Cancer (WDBC)**.

> **Importante:** este projeto é estritamente educacional. Ele não realiza diagnóstico médico, não substitui avaliação médica, exames complementares ou acompanhamento profissional.

---

## Visão geral

A V1 do BreastCare AI transforma um fluxo técnico de Machine Learning em uma experiência visual clara, guiada e explicável.

O objetivo do projeto é demonstrar uma arquitetura full stack com integração entre:

- **Frontend Web** em Next.js;
- **Backend API** em Java Spring Boot;
- **ML Service** em Python/FastAPI;
- **Banco de dados** PostgreSQL;
- **Persistência de análises preditivas**;
- **Histórico com filtros**;
- **Resultado explicável** com probabilidades, threshold, faixa de risco e notas educacionais.

A aplicação foi construída como projeto educacional e de portfólio, com foco em IA aplicada, experiência de produto e integração entre serviços.

---

## Arquitetura

```txt
Frontend Next.js
        |
        | Next.js API Routes
        v
Backend Java Spring Boot
        |
        | HTTP
        v
ML Service Python/FastAPI
        |
        v
Modelo Machine Learning

Backend Java Spring Boot
        |
        v
PostgreSQL
```

### Fluxo principal

```txt
Home
  → New Analysis
  → Stepper guiado
  → Edição opcional das 30 features
  → Envio para API Java
  → Chamada ao ML Service
  → Persistência no PostgreSQL
  → Tela de resultado
  → Histórico de análises
```

---

## Features da V1

### Home

Landing page com apresentação do projeto, proposta educacional, status do modelo e atalhos para iniciar uma análise ou visualizar histórico.

### New Analysis

Fluxo guiado com stepper:

```txt
Sample → Review → Features → Run
```

O usuário pode:

- escolher um cenário base;
- revisar valores principais;
- editar manualmente as 30 features do modelo;
- validar campos numéricos;
- enviar a análise para o backend;
- ser redirecionado para o detalhe do resultado.

### Advanced Feature Editor

Editor técnico agrupado por categorias do dataset WDBC:

- Mean features;
- Standard error features;
- Worst features.

Cada cenário preenche automaticamente os valores, mas o usuário pode ajustar manualmente antes da predição.

### Prediction Detail

Tela explicável do resultado contendo:

- probabilidade maligna;
- probabilidade benigna;
- threshold utilizado;
- interpretação visual do threshold;
- faixa de risco;
- label predito;
- informações do modelo;
- notas de confiança;
- qualidade do input;
- features usadas;
- features imputadas;
- features ignoradas;
- warnings;
- aviso educacional.

### History

Histórico das análises persistidas com:

- cards de resumo;
- busca por ID, label, risco ou modelo;
- filtro por risk band;
- filtro por predicted label;
- tabela desktop;
- cards mobile;
- link para detalhe da análise.

### Model Overview

Página explicativa do modelo com:

- tipo do modelo;
- dataset utilizado;
- métricas principais;
- threshold;
- grupos de features;
- limitações educacionais;
- aviso de segurança.

### Mobile

A V1 possui layout responsivo e navegação mobile no header para:

```txt
New → History → Model
```

---

## Stack implementada

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui / Base UI**
- **lucide-react**
- **Next.js API Routes**

Dependências já presentes para evolução futura:

- **TanStack Query**
- **React Hook Form**
- **Zod**
- **Recharts**

---

## Estrutura principal

```txt
src
├── app
│   ├── api
│   │   └── predictions
│   │       ├── route.ts
│   │       └── [id]
│   │           └── route.ts
│   ├── analysis
│   │   ├── new
│   │   │   └── page.tsx
│   │   ├── history
│   │   │   └── page.tsx
│   │   └── [id]
│   │       └── page.tsx
│   ├── model
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
│
├── components
│   ├── analysis
│   │   └── scenario-selector.tsx
│   ├── history
│   │   └── history-list.tsx
│   ├── layout
│   │   ├── app-header.tsx
│   │   └── page-shell.tsx
│   ├── prediction
│   │   └── prediction-detail.tsx
│   ├── shared
│   │   └── educational-disclaimer.tsx
│   └── ui
│
├── data
│   └── prediction-samples.ts
│
├── services
│   └── prediction-service.ts
│
└── types
    └── prediction.ts
```

---

## Rotas da aplicação

```txt
/
```

Home/Landing page do BreastCare AI.

```txt
/analysis/new
```

Criação de uma nova análise educacional com stepper guiado.

```txt
/analysis/history
```

Histórico das análises criadas.

```txt
/analysis/[id]
```

Detalhe explicável de uma análise.

```txt
/model
```

Visão geral do modelo de Machine Learning.

---

## Integração com backend

O frontend não chama diretamente a API Java pelo client browser.

Ele usa rotas internas do Next.js como proxy:

```txt
Frontend Client
  → /api/predictions
  → Next.js API Route
  → Spring Boot API
```

### Endpoints internos do frontend

```txt
POST /api/predictions
GET  /api/predictions
GET  /api/predictions/[id]
```

### Endpoints esperados no backend Java

```txt
POST /api/predictions
GET  /api/predictions
GET  /api/predictions/{id}
```

---

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com base no `.env.example`.

```env
BREASTCARE_API_URL=http://localhost:8080
```

Para produção:

```env
BREASTCARE_API_URL=https://your-breastcare-api-domain.com
```

---

## Como rodar localmente

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar ambiente

```bash
cp .env.example .env.local
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

### 3. Rodar o frontend

```bash
npm run dev
```

A aplicação ficará disponível em:

```txt
http://localhost:3000
```

---

## Ambiente completo local

Para o fluxo completo funcionar, os serviços devem estar ativos:

```txt
1. PostgreSQL
2. ML Service Python/FastAPI
3. Backend Java Spring Boot
4. Frontend Next.js
```

Ordem recomendada:

```txt
PostgreSQL → ML Service → Spring Boot API → Frontend
```

URLs locais esperadas:

```txt
Frontend:    http://localhost:3000
Backend API: http://localhost:8080
ML Service:  http://localhost:8001
```

---

## Scripts disponíveis

```bash
npm run dev
```

Executa o frontend em modo desenvolvimento.

```bash
npm run build
```

Gera build de produção.

```bash
npm run start
```

Executa a versão de produção após o build.

```bash
npm run lint
```

Executa validação de lint.

---

## Validação da V1

Antes de fechar uma release, execute:

```bash
npm run lint
npm run build
```

Checklist manual:

```txt
Home abre corretamente
Header navega entre New, History e Model
New Analysis executa o stepper completo
Campos inválidos bloqueiam avanço/envio
Run analysis cria uma predição
Detail mostra resultado explicável
History mostra novo registro
Filtros do History funcionam
View detail pelo histórico funciona
Model page abre corretamente
Mobile mantém navegação e layout responsivo
```

---

## Modelo de Machine Learning

A V1 utiliza um modelo educacional baseado em features estruturadas do dataset **Wisconsin Diagnostic Breast Cancer (WDBC)**.

Modelo apresentado na aplicação:

```txt
ensemble_mean_logistic_random_forest
```

Métricas exibidas:

```txt
Test accuracy: 99.12%
ROC-AUC: 99.77%
Malignant recall: 97.62%
Threshold: 34.33%
Input features: 30
```

As features são agrupadas em:

```txt
Mean features
Standard error features
Worst features
```

---

## Aviso educacional

BreastCare AI é um projeto de estudo e portfólio.

A aplicação:

- não realiza diagnóstico médico;
- não substitui médicos ou exames;
- não deve ser usada para decisões clínicas;
- não analisa mamografias ou imagens médicas reais;
- apresenta apenas uma predição educacional baseada em dados tabulares.

Qualquer preocupação real sobre saúde deve ser avaliada por profissionais qualificados.

---

## Preparação para nuvem

A arquitetura já permite deploy separado dos serviços:

```txt
Frontend Next.js
  → Vercel, Cloud Run, Azure Static Web Apps ou similar

Backend Spring Boot
  → Render, Railway, Cloud Run, Azure App Service, EC2 ou similar

ML Service FastAPI
  → Cloud Run, Render, Railway, EC2 ou similar

PostgreSQL
  → Supabase, Neon, Railway, Render, RDS ou similar
```

Variáveis esperadas em produção:

```txt
Frontend:
BREASTCARE_API_URL

Backend:
DATABASE_URL
ML_BASE_URL

ML Service:
MODEL_PATH
ENVIRONMENT
```

---

## Roadmap V2

Possíveis evoluções futuras:

- autenticação;
- dashboard analítico;
- gráficos com Recharts;
- React Hook Form + Zod no editor avançado;
- TanStack Query para cache e controle de requests;
- deploy completo em nuvem;
- CI/CD;
- observabilidade;
- Docker Compose;
- integração com storage;
- comparação entre análises;
- exportação de relatório em PDF;
- camada de explicabilidade mais avançada;
- assistente educacional especializado, sem diagnóstico médico.

---

## Status da V1

```txt
Home ✅
New Analysis com stepper ✅
Advanced Feature Editor ✅
Prediction Detail explicável ✅
History com filtros ✅
Model Overview ✅
Mobile navigation ✅
Environment example ✅
Build/Lint ✅
```

---

## Autor

Projeto desenvolvido por Douglas Rodrigues como estudo de IA aplicada, arquitetura full stack e desenvolvimento de produtos com Machine Learning.