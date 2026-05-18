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