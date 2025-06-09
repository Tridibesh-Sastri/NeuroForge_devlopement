import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface PsychometricResponse {
  id: string;
  respondent_id: string;
  timestamp: string;
  age: number;
  gender: string;
  education_level: string;
  responses: QuestionResponse[];
  total_score: number;
  dimension_scores: DimensionScores;
  created_at: string;
  updated_at: string;
}

export interface QuestionResponse {
  question_id: number;
  response: number;
  dimension: string;
}

export interface DimensionScores {
  emotional_regulation: number;
  social_interaction: number;
  decision_making: number;
  self_awareness: number;
}

export interface Demographics {
  age: number;
  gender: string;
  education_level: string;
}

export interface AssessmentData {
  demographics: Demographics;
  responses: QuestionResponse[];
}