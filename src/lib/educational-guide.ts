import type { UiLocale } from "@/i18n/translations";
import type {
  ReportAnalysis,
  ReportMeasurement,
  StructuredFindings,
} from "@/types/report-intelligence";
import { sanitizeSafetyCopy } from "@/lib/safety-copy";

export type EducationalGuideItem = {
  title: string;
  description?: string;
};

export type EducationalGuide = {
  title: string;
  subtitle: string;
  informedTitle: string;
  missingTitle: string;
  cannotConcludeTitle: string;
  questionsTitle: string;
  preventionTitle: string;
  glossaryTitle: string;
  disclaimer: string;
  informed: EducationalGuideItem[];
  missing: EducationalGuideItem[];
  cannotConclude: EducationalGuideItem[];
  questions: EducationalGuideItem[];
  prevention: EducationalGuideItem[];
  glossary: EducationalGuideItem[];
};

type GuideCopy = {
  title: string;
  subtitle: string;
  informedTitle: string;
  missingTitle: string;
  cannotConcludeTitle: string;
  questionsTitle: string;
  preventionTitle: string;
  glossaryTitle: string;
  disclaimer: string;
  fallbackInformed: string;
  informed: {
    reportType: string;
    birads: string;
    breastSide: string;
    location: string;
    measurements: string;
    findings: string;
    recommendations: string;
  };
  missing: {
    birads: string;
    size: string;
    margins: string;
    location: string;
    examType: string;
    recommendations: string;
    comparison: string;
  };
  cannotConclude: EducationalGuideItem[];
  questions: {
    birads: string;
    size: string;
    margins: string;
    recommendations: string;
    comparison: string;
    examType: string;
  };
  prevention: EducationalGuideItem[];
  glossary: EducationalGuideItem[];
};

const copy: Record<UiLocale, GuideCopy> = {
  "pt-BR": {
    title: "Guia educacional",
    subtitle:
      "Organizamos o que foi informado, o que ainda falta e perguntas úteis para conversar com um profissional de saúde.",
    informedTitle: "O que foi informado",
    missingTitle: "O que ainda falta saber",
    cannotConcludeTitle: "O que não é possível concluir",
    questionsTitle: "Perguntas úteis para levar ao profissional",
    preventionTitle: "Cuidados gerais e prevenção",
    glossaryTitle: "Glossário simples",
    disclaimer:
      "Essas orientações são gerais e educacionais. Elas não substituem avaliação médica e não garantem prevenção.",
    fallbackInformed:
      "O texto enviado contém poucos dados estruturados. Ainda assim, ele pode ser usado para organizar dúvidas e próximos pontos de conversa.",
    informed: {
      reportType: "Tipo de exame informado",
      birads: "BI-RADS mencionado",
      breastSide: "Lado da mama mencionado",
      location: "Localização mencionada",
      measurements: "Medida mencionada",
      findings: "Achado mencionado",
      recommendations: "Recomendação mencionada",
    },
    missing: {
      birads: "Classificação BI-RADS",
      size: "Tamanho do nódulo ou achado",
      margins: "Descrição das margens",
      location: "Localização exata na mama",
      examType: "Tipo de exame",
      recommendations: "Recomendação do laudo",
      comparison: "Comparação com exames anteriores",
    },
    cannotConclude: [
      "Diagnóstico ou confirmação de doença.",
      "Nível de risco individual ou gravidade clínica.",
      "Urgência médica ou conduta de tratamento.",
      "Predição WDBC sem as 30 variáveis numéricas exigidas.",
    ].map((title) => ({ title })),
    questions: {
      birads: "O laudo informa uma categoria BI-RADS?",
      size: "Qual é o tamanho do nódulo ou achado?",
      margins: "As margens foram descritas como circunscritas, indistintas ou irregulares?",
      recommendations: "O exame recomenda acompanhamento, comparação ou exame complementar?",
      comparison: "Existe comparação com exames anteriores?",
      examType: "O achado foi descrito em mamografia, ultrassom, ressonância ou biópsia?",
    },
    prevention: [
      {
        title: "Manter peso saudável",
        description:
          "Hábitos de saúde podem contribuir para redução geral de risco ao longo da vida.",
      },
      {
        title: "Praticar atividade física",
        description:
          "Movimento regular é uma medida geral de saúde associada à redução de risco.",
      },
      {
        title: "Evitar ou limitar álcool",
        description:
          "O consumo de álcool é um fator de risco modificável descrito em orientações de saúde pública.",
      },
      {
        title: "Conhecer histórico familiar",
        description:
          "Histórico familiar pode indicar necessidade de conversa mais direcionada com profissional de saúde.",
      },
      {
        title: "Manter rastreamento orientado",
        description:
          "Mamografia e acompanhamento devem seguir idade, histórico e orientação profissional.",
      },
    ],
    glossary: [
      {
        title: "BI-RADS",
        description:
          "Sistema usado em laudos de imagem da mama para padronizar categorias e acompanhamento.",
      },
      {
        title: "Nódulo",
        description:
          "Achado localizado na mama. Seu significado depende de tamanho, margens, imagem e avaliação profissional.",
      },
      {
        title: "Margens",
        description:
          "Descrevem o contorno do achado no exame, como circunscrito, indistinto ou irregular.",
      },
      {
        title: "Acompanhamento",
        description:
          "Orientação para observar estabilidade ou mudança ao longo do tempo, conforme avaliação médica.",
      },
      {
        title: "WDBC",
        description:
          "Modelo educacional que só pode rodar quando as 30 variáveis numéricas específicas estão presentes.",
      },
    ],
  },
  en: {
    title: "Educational guide",
    subtitle:
      "We organize what was provided, what is still missing and useful questions for a healthcare professional.",
    informedTitle: "What was provided",
    missingTitle: "What is still missing",
    cannotConcludeTitle: "What cannot be concluded",
    questionsTitle: "Useful questions for a healthcare professional",
    preventionTitle: "General care and prevention",
    glossaryTitle: "Simple glossary",
    disclaimer:
      "These are general educational notes. They do not replace medical evaluation and do not guarantee prevention.",
    fallbackInformed:
      "The submitted text contains little structured information. It can still help organize questions and next discussion points.",
    informed: {
      reportType: "Report type provided",
      birads: "BI-RADS mentioned",
      breastSide: "Breast side mentioned",
      location: "Location mentioned",
      measurements: "Measurement mentioned",
      findings: "Finding mentioned",
      recommendations: "Recommendation mentioned",
    },
    missing: {
      birads: "BI-RADS category",
      size: "Nodule or finding size",
      margins: "Margin description",
      location: "Exact breast location",
      examType: "Exam type",
      recommendations: "Report recommendation",
      comparison: "Comparison with previous exams",
    },
    cannotConclude: [
      "Diagnosis or confirmation of disease.",
      "Individual risk level or clinical severity.",
      "Medical urgency or treatment decision.",
      "WDBC prediction without the 30 required numerical features.",
    ].map((title) => ({ title })),
    questions: {
      birads: "Does the report mention a BI-RADS category?",
      size: "What is the size of the nodule or finding?",
      margins:
        "Were the margins described as circumscribed, indistinct or irregular?",
      recommendations:
        "Does the exam recommend follow-up, comparison or another exam?",
      comparison: "Is there a comparison with previous exams?",
      examType:
        "Was the finding described in mammography, ultrasound, MRI or biopsy?",
    },
    prevention: [
      {
        title: "Maintain a healthy weight",
        description: "General health habits may help reduce lifetime risk.",
      },
      {
        title: "Practice physical activity",
        description:
          "Regular movement is a general health measure associated with risk reduction.",
      },
      {
        title: "Avoid or limit alcohol",
        description:
          "Alcohol use is a modifiable risk factor described in public health guidance.",
      },
      {
        title: "Know family history",
        description:
          "Family history may indicate the need for a more specific conversation with a professional.",
      },
      {
        title: "Keep screening guidance",
        description:
          "Mammography and follow-up should consider age, history and professional guidance.",
      },
    ],
    glossary: [
      {
        title: "BI-RADS",
        description:
          "A breast imaging reporting system used to standardize categories and follow-up.",
      },
      {
        title: "Nodule",
        description:
          "A localized breast finding. Its meaning depends on size, margins, imaging and professional review.",
      },
      {
        title: "Margins",
        description:
          "They describe the contour of a finding, such as circumscribed, indistinct or irregular.",
      },
      {
        title: "Follow-up",
        description:
          "A recommendation to observe stability or changes over time, according to medical evaluation.",
      },
      {
        title: "WDBC",
        description:
          "An educational model that only runs when the 30 specific numerical features are available.",
      },
    ],
  },
  es: {
    title: "Guía educativa",
    subtitle:
      "Organizamos lo informado, lo que falta y preguntas útiles para conversar con un profesional de salud.",
    informedTitle: "Lo que fue informado",
    missingTitle: "Lo que aún falta saber",
    cannotConcludeTitle: "Lo que no se puede concluir",
    questionsTitle: "Preguntas útiles para el profesional",
    preventionTitle: "Cuidados generales y prevención",
    glossaryTitle: "Glosario simple",
    disclaimer:
      "Estas orientaciones son generales y educativas. No sustituyen la evaluación médica y no garantizan prevención.",
    fallbackInformed:
      "El texto enviado contiene pocos datos estructurados. Aun así, puede ayudar a organizar dudas y próximos puntos de conversación.",
    informed: {
      reportType: "Tipo de examen informado",
      birads: "BI-RADS mencionado",
      breastSide: "Lado de la mama mencionado",
      location: "Ubicación mencionada",
      measurements: "Medida mencionada",
      findings: "Hallazgo mencionado",
      recommendations: "Recomendación mencionada",
    },
    missing: {
      birads: "Clasificación BI-RADS",
      size: "Tamaño del nódulo o hallazgo",
      margins: "Descripción de los márgenes",
      location: "Ubicación exacta en la mama",
      examType: "Tipo de examen",
      recommendations: "Recomendación del informe",
      comparison: "Comparación con exámenes anteriores",
    },
    cannotConclude: [
      "Diagnóstico o confirmación de enfermedad.",
      "Nivel de riesgo individual o gravedad clínica.",
      "Urgencia médica o decisión de tratamiento.",
      "Predicción WDBC sin las 30 variables numéricas requeridas.",
    ].map((title) => ({ title })),
    questions: {
      birads: "¿El informe menciona una categoría BI-RADS?",
      size: "¿Cuál es el tamaño del nódulo o hallazgo?",
      margins:
        "¿Los márgenes fueron descritos como circunscritos, indistintos o irregulares?",
      recommendations:
        "¿El examen recomienda seguimiento, comparación u otro examen?",
      comparison: "¿Existe comparación con exámenes anteriores?",
      examType:
        "¿El hallazgo fue descrito en mamografía, ecografía, resonancia o biopsia?",
    },
    prevention: [
      {
        title: "Mantener un peso saludable",
        description:
          "Los hábitos generales de salud pueden contribuir a reducir el riesgo a lo largo de la vida.",
      },
      {
        title: "Practicar actividad física",
        description:
          "El movimiento regular es una medida general de salud asociada con reducción de riesgo.",
      },
      {
        title: "Evitar o limitar alcohol",
        description:
          "El consumo de alcohol es un factor de riesgo modificable descrito en guías de salud pública.",
      },
      {
        title: "Conocer antecedentes familiares",
        description:
          "Los antecedentes familiares pueden indicar la necesidad de una conversación más específica.",
      },
      {
        title: "Mantener el rastreo indicado",
        description:
          "La mamografía y el seguimiento deben considerar edad, historia y orientación profesional.",
      },
    ],
    glossary: [
      {
        title: "BI-RADS",
        description:
          "Sistema usado en informes de imagen mamaria para estandarizar categorías y seguimiento.",
      },
      {
        title: "Nódulo",
        description:
          "Hallazgo localizado en la mama. Su significado depende de tamaño, márgenes, imagen y evaluación profesional.",
      },
      {
        title: "Márgenes",
        description:
          "Describen el contorno del hallazgo, como circunscrito, indistinto o irregular.",
      },
      {
        title: "Seguimiento",
        description:
          "Orientación para observar estabilidad o cambios a lo largo del tiempo, según evaluación médica.",
      },
      {
        title: "WDBC",
        description:
          "Modelo educativo que solo puede ejecutarse cuando están presentes las 30 variables numéricas específicas.",
      },
    ],
  },
};

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function formatMeasurement(measurement: Partial<ReportMeasurement>) {
  const value = measurement.value ?? "";
  const unit = measurement.unit ?? "";
  const context = measurement.context ?? "";

  return [String(value), unit, context].filter(Boolean).join(" - ");
}

function pushIfText(items: EducationalGuideItem[], title: string, value: unknown) {
  if (hasText(value)) {
    items.push({ title, description: sanitizeSafetyCopy(value) });
  }
}

export function buildEducationalGuide(
  report: Partial<ReportAnalysis>,
  locale: UiLocale
): EducationalGuide {
  const guideCopy = copy[locale] ?? copy["pt-BR"];
  const findings: Partial<StructuredFindings> = report.structuredFindings ?? {};
  const measurements = Array.isArray(findings.measurements)
    ? findings.measurements
    : [];
  const mentionedFindings = Array.isArray(findings.mentionedFindings)
    ? findings.mentionedFindings
    : [];
  const recommendations = Array.isArray(findings.mentionedRecommendations)
    ? findings.mentionedRecommendations
    : [];

  const informed: EducationalGuideItem[] = [];

  pushIfText(informed, guideCopy.informed.reportType, report.reportType);
  pushIfText(informed, guideCopy.informed.birads, findings.birads);
  pushIfText(informed, guideCopy.informed.breastSide, findings.breastSide);
  pushIfText(informed, guideCopy.informed.location, findings.location);

  measurements.forEach((measurement) => {
    const formatted = formatMeasurement(measurement);
    pushIfText(informed, guideCopy.informed.measurements, formatted);
  });

  mentionedFindings.forEach((finding) => {
    pushIfText(informed, guideCopy.informed.findings, finding);
  });

  recommendations.forEach((recommendation) => {
    pushIfText(informed, guideCopy.informed.recommendations, recommendation);
  });

  const missing: EducationalGuideItem[] = [];
  const questions: EducationalGuideItem[] = [];

  if (!hasText(findings.birads)) {
    missing.push({ title: guideCopy.missing.birads });
    questions.push({ title: guideCopy.questions.birads });
  }

  if (measurements.length === 0) {
    missing.push({ title: guideCopy.missing.size });
    questions.push({ title: guideCopy.questions.size });
  }

  if (!mentionedFindings.some((item) => /margem|margin|margen/i.test(item))) {
    missing.push({ title: guideCopy.missing.margins });
    questions.push({ title: guideCopy.questions.margins });
  }

  if (!hasText(findings.location)) {
    missing.push({ title: guideCopy.missing.location });
  }

  if (!hasText(report.reportType) || report.reportType === "UNKNOWN") {
    missing.push({ title: guideCopy.missing.examType });
    questions.push({ title: guideCopy.questions.examType });
  }

  if (recommendations.length === 0) {
    missing.push({ title: guideCopy.missing.recommendations });
    questions.push({ title: guideCopy.questions.recommendations });
  }

  missing.push({ title: guideCopy.missing.comparison });
  questions.push({ title: guideCopy.questions.comparison });

  return {
    ...guideCopy,
    informed:
      informed.length > 0
        ? informed
        : [{ title: guideCopy.fallbackInformed }],
    missing,
    cannotConclude: guideCopy.cannotConclude,
    questions,
    prevention: guideCopy.prevention,
    glossary: guideCopy.glossary,
  };
}
