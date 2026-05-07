export type PredictionFeatures = Record<string, number>;

export type PredictionRequest = {
  features: PredictionFeatures;
};

export type PredictionResponse = {
  id: number;
  created_at: string;
  predicted_label: string;
  predicted_label_name: string;
  probability_malignant: number;
  probability_benign: number;
  used_threshold_malignant: number;
  model_type: string;
  risk_band: string;
  summary: string;
  confidence_note: string;
  input_quality_note: string;
  clinical_note: string;
  used_features: string[];
  ignored_features: string[];
  imputed_features: string[];
  warnings: string[];
};

export type PredictionListItem = {
  id: number;
  created_at: string;
  predicted_label: string;
  predicted_label_name: string;
  probability_malignant: number;
  risk_band: string;
  model_type: string;
};