import { supabase } from '../lib/supabase';
import type { 
  PsychometricResponse, 
  AssessmentData, 
  DimensionScores,
  QuestionResponse 
} from '../lib/supabase';

export class AssessmentService {
  // Calculate dimension scores
  static calculateDimensionScores(responses: QuestionResponse[]): DimensionScores {
    const dimensions = {
      emotional_regulation: responses.filter(r => r.dimension === 'emotional_regulation'),
      social_interaction: responses.filter(r => r.dimension === 'social_interaction'),
      decision_making: responses.filter(r => r.dimension === 'decision_making'),
      self_awareness: responses.filter(r => r.dimension === 'self_awareness')
    };

    return {
      emotional_regulation: dimensions.emotional_regulation.reduce((sum, r) => sum + r.response, 0),
      social_interaction: dimensions.social_interaction.reduce((sum, r) => sum + r.response, 0),
      decision_making: dimensions.decision_making.reduce((sum, r) => sum + r.response, 0),
      self_awareness: dimensions.self_awareness.reduce((sum, r) => sum + r.response, 0)
    };
  }

  // Calculate total score
  static calculateTotalScore(responses: QuestionResponse[]): number {
    return responses.reduce((sum, response) => sum + response.response, 0);
  }

  // Submit assessment
  static async submitAssessment(data: AssessmentData): Promise<{ success: boolean; respondent_id?: string; error?: string }> {
    try {
      const totalScore = this.calculateTotalScore(data.responses);
      const dimensionScores = this.calculateDimensionScores(data.responses);
      const respondentId = crypto.randomUUID();

      const { data: result, error } = await supabase
        .from('psychometric_responses')
        .insert({
          respondent_id: respondentId,
          age: data.demographics.age,
          gender: data.demographics.gender,
          education_level: data.demographics.education_level,
          responses: data.responses,
          total_score: totalScore,
          dimension_scores: dimensionScores
        })
        .select()
        .single();

      if (error) {
        console.error('Error submitting assessment:', error);
        return { success: false, error: error.message };
      }

      return { success: true, respondent_id: respondentId };
    } catch (error) {
      console.error('Error submitting assessment:', error);
      return { success: false, error: 'Failed to submit assessment' };
    }
  }

  // Get individual results
  static async getResults(respondentId: string): Promise<{ success: boolean; data?: PsychometricResponse; error?: string }> {
    try {
      const { data, error } = await supabase
        .from('psychometric_responses')
        .select('*')
        .eq('respondent_id', respondentId)
        .single();

      if (error) {
        console.error('Error fetching results:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error fetching results:', error);
      return { success: false, error: 'Failed to fetch results' };
    }
  }

  // Get aggregate analytics
  static async getAggregateAnalytics(): Promise<{ 
    success: boolean; 
    data?: {
      totalResponses: number;
      averageScores: DimensionScores & { total: number };
      demographics: any;
      scoreDistribution: any[];
    }; 
    error?: string 
  }> {
    try {
      const { data: responses, error } = await supabase
        .from('psychometric_responses')
        .select('*');

      if (error) {
        console.error('Error fetching analytics:', error);
        return { success: false, error: error.message };
      }

      if (!responses || responses.length === 0) {
        return { 
          success: true, 
          data: {
            totalResponses: 0,
            averageScores: {
              emotional_regulation: 0,
              social_interaction: 0,
              decision_making: 0,
              self_awareness: 0,
              total: 0
            },
            demographics: {},
            scoreDistribution: []
          }
        };
      }

      // Calculate statistics
      const totalResponses = responses.length;
      
      // Average scores
      const avgEmotionalRegulation = responses.reduce((sum, r) => sum + r.dimension_scores.emotional_regulation, 0) / totalResponses;
      const avgSocialInteraction = responses.reduce((sum, r) => sum + r.dimension_scores.social_interaction, 0) / totalResponses;
      const avgDecisionMaking = responses.reduce((sum, r) => sum + r.dimension_scores.decision_making, 0) / totalResponses;
      const avgSelfAwareness = responses.reduce((sum, r) => sum + r.dimension_scores.self_awareness, 0) / totalResponses;
      const avgTotal = responses.reduce((sum, r) => sum + r.total_score, 0) / totalResponses;

      // Demographics breakdown
      const genderBreakdown = responses.reduce((acc, r) => {
        acc[r.gender] = (acc[r.gender] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const educationBreakdown = responses.reduce((acc, r) => {
        acc[r.education_level] = (acc[r.education_level] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Score distribution
      const scoreRanges = [
        { range: '20-35', min: 20, max: 35 },
        { range: '36-50', min: 36, max: 50 },
        { range: '51-65', min: 51, max: 65 },
        { range: '66-80', min: 66, max: 80 },
        { range: '81-100', min: 81, max: 100 }
      ];

      const scoreDistribution = scoreRanges.map(range => ({
        range: range.range,
        count: responses.filter(r => r.total_score >= range.min && r.total_score <= range.max).length
      }));

      return {
        success: true,
        data: {
          totalResponses,
          averageScores: {
            emotional_regulation: Math.round(avgEmotionalRegulation * 100) / 100,
            social_interaction: Math.round(avgSocialInteraction * 100) / 100,
            decision_making: Math.round(avgDecisionMaking * 100) / 100,
            self_awareness: Math.round(avgSelfAwareness * 100) / 100,
            total: Math.round(avgTotal * 100) / 100
          },
          demographics: {
            gender: genderBreakdown,
            education: educationBreakdown
          },
          scoreDistribution
        }
      };
    } catch (error) {
      console.error('Error fetching analytics:', error);
      return { success: false, error: 'Failed to fetch analytics' };
    }
  }
}