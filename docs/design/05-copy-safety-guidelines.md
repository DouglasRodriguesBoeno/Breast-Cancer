# BreastCare AI V2 — Copy & Safety Guidelines

## 1. Objetivo

Este documento define regras de linguagem para o BreastCare AI V2.

O sistema é educacional e não realiza diagnóstico médico real. A linguagem deve ser segura, clara, humana e não alarmista.

## 2. Posicionamento correto

O BreastCare AI V2 é uma plataforma educacional de IA aplicada à saúde, focada em transformar laudos mamários e dados estruturados em explicações claras, multilíngues e rastreáveis.

O sistema:

- Não realiza diagnóstico médico;
- Não substitui avaliação profissional;
- Não recomenda tratamento;
- Não define urgência médica;
- Não inventa features WDBC;
- Só roda o modelo WDBC quando dados compatíveis estão disponíveis.

## 3. Termos permitidos

Usar preferencialmente:

```txt
Educational only
Not a medical diagnosis
This system does not replace professional medical evaluation
The report mentions...
The system identified...
Compatible with...
Model prediction
Educational explanation
Structured findings
WDBC compatibility
Can run prediction? Yes/No
```

## 4. Termos a evitar

Não usar:

```txt
Você tem câncer
Diagnóstico confirmado
Resultado clínico definitivo
Tratamento recomendado
Urgência médica definida pela IA
Laudo definitivo
Avaliação clínica automática
```

## 5. Disclaimer base

Usar em telas principais, resultados, histórico e relatórios:

```txt
Educational only — BreastCare AI does not provide medical diagnosis and does not replace professional medical evaluation.
```

Versão em português:

```txt
Uso educacional — o BreastCare AI não realiza diagnóstico médico e não substitui avaliação profissional.
```

## 6. Linguagem para resultados de laudo

Preferir:

```txt
The report mentions...
The system identified the following terms...
In simple language, this report describes...
BI-RADS was mentioned in the provided text.
This explanation is educational and should be reviewed with a healthcare professional.
```

Evitar:

```txt
O paciente possui...
A IA diagnosticou...
O exame confirma...
O tratamento indicado é...
```

## 7. Linguagem para WDBC

Preferir:

```txt
Compatible with benign pattern
Compatible with malignant pattern
Malignant probability
Benign probability
Risk band
Model threshold
Educational model output
```

Evitar:

```txt
Diagnóstico maligno
Diagnóstico benigno
Você está saudável
Você tem câncer
Resultado clínico
```

## 8. Regras obrigatórias

- Toda tela de resultado deve ter disclaimer educacional.
- Toda tela que menciona WDBC deve explicar que é modelo educacional.
- Não transformar probabilidade em diagnóstico.
- Não gerar recomendação médica.
- Não indicar tratamento.
- Não usar copy alarmista.
- Não inventar dados ausentes.
