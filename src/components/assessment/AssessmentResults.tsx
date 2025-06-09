import React, { useState, useEffect } from 'react';
import { AssessmentService } from '../../services/assessmentService';
import Button from '../common/Button';
import Card from '../common/Card';
import { 
  Download, 
  BarChart3, 
  TrendingUp, 
  User, 
  Calendar,
  Brain,
  Users,
  Target,
  Eye
} from 'lucide-react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import type { PsychometricResponse } from '../../lib/supabase';

interface AssessmentResultsProps {
  respondentId: string;
  onBack: () => void;
}

const AssessmentResults: React.FC<AssessmentResultsProps> = ({ respondentId, onBack }) => {
  const [results, setResults] = useState<PsychometricResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadResults();
  }, [respondentId]);

  const loadResults = async () => {
    try {
      const response = await AssessmentService.getResults(respondentId);
      if (response.success && response.data) {
        setResults(response.data);
      } else {
        setError(response.error || 'Failed to load results');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    if (!results) return;

    const reportData = {
      respondent_id: results.respondent_id,
      timestamp: results.timestamp,
      demographics: {
        age: results.age,
        gender: results.gender,
        education_level: results.education_level
      },
      scores: {
        total_score: results.total_score,
        dimension_scores: results.dimension_scores
      },
      interpretation: getScoreInterpretation(results.total_score),
      recommendations: getRecommendations(results.dimension_scores)
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `psychometric-assessment-${results.respondent_id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getScoreInterpretation = (totalScore: number) => {
    if (totalScore >= 80) return "Excellent psychological well-being";
    if (totalScore >= 65) return "Good psychological well-being";
    if (totalScore >= 50) return "Moderate psychological well-being";
    if (totalScore >= 35) return "Below average psychological well-being";
    return "Low psychological well-being - consider professional support";
  };

  const getRecommendations = (dimensionScores: any) => {
    const recommendations = [];
    
    if (dimensionScores.emotional_regulation < 15) {
      recommendations.push("Consider practicing mindfulness and emotional regulation techniques");
    }
    if (dimensionScores.social_interaction < 15) {
      recommendations.push("Engage in social activities to improve interpersonal skills");
    }
    if (dimensionScores.decision_making < 15) {
      recommendations.push("Practice structured decision-making frameworks");
    }
    if (dimensionScores.self_awareness < 15) {
      recommendations.push("Engage in self-reflection and journaling activities");
    }

    return recommendations.length > 0 ? recommendations : ["Continue maintaining your current positive psychological practices"];
  };

  if (loading) {
    return (
      <Card className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
        <p className="text-gray-600">Loading your results...</p>
      </Card>
    );
  }

  if (error || !results) {
    return (
      <Card className="p-8 text-center">
        <div className="text-red-500 mb-4">
          <BarChart3 className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Results</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={onBack}>Go Back</Button>
      </Card>
    );
  }

  // Prepare radar chart data
  const radarData = [
    {
      dimension: 'Emotional Regulation',
      score: results.dimension_scores.emotional_regulation,
      fullMark: 25
    },
    {
      dimension: 'Social Interaction',
      score: results.dimension_scores.social_interaction,
      fullMark: 25
    },
    {
      dimension: 'Decision Making',
      score: results.dimension_scores.decision_making,
      fullMark: 25
    },
    {
      dimension: 'Self Awareness',
      score: results.dimension_scores.self_awareness,
      fullMark: 25
    }
  ];

  // Prepare bar chart data
  const barData = radarData.map(item => ({
    dimension: item.dimension.replace(' ', '\n'),
    score: item.score,
    percentage: Math.round((item.score / item.fullMark) * 100)
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="p-8">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white mx-auto mb-6">
            <BarChart3 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Assessment Results</h1>
          <p className="text-gray-600">Completed on {new Date(results.timestamp).toLocaleDateString()}</p>
        </div>
      </Card>

      {/* Overall Score */}
      <Card className="p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overall Score</h2>
          <div className="flex items-center justify-center space-x-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {results.total_score}
              </div>
              <div className="text-lg text-gray-600">out of 100</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-gray-900 mb-2">
                {Math.round((results.total_score / 100) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Percentile</div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-blue-800 font-medium">
              {getScoreInterpretation(results.total_score)}
            </p>
          </div>
        </div>
      </Card>

      {/* Dimension Scores */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <Card className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Dimension Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dimension" />
              <PolarRadiusAxis angle={90} domain={[0, 25]} />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar Chart */}
        <Card className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Detailed Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dimension" />
              <YAxis domain={[0, 25]} />
              <Tooltip />
              <Bar dataKey="score" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Individual Dimension Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Brain className="w-8 h-8 text-blue-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Emotional Regulation</h3>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-blue-600">
              {results.dimension_scores.emotional_regulation}
            </span>
            <span className="text-sm text-gray-500">/ 25</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${(results.dimension_scores.emotional_regulation / 25) * 100}%` }}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Users className="w-8 h-8 text-green-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Social Interaction</h3>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-green-600">
              {results.dimension_scores.social_interaction}
            </span>
            <span className="text-sm text-gray-500">/ 25</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${(results.dimension_scores.social_interaction / 25) * 100}%` }}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Target className="w-8 h-8 text-purple-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Decision Making</h3>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-purple-600">
              {results.dimension_scores.decision_making}
            </span>
            <span className="text-sm text-gray-500">/ 25</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: `${(results.dimension_scores.decision_making / 25) * 100}%` }}
            />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center mb-4">
            <Eye className="w-8 h-8 text-orange-500 mr-3" />
            <h3 className="text-lg font-semibold text-gray-900">Self Awareness</h3>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-orange-600">
              {results.dimension_scores.self_awareness}
            </span>
            <span className="text-sm text-gray-500">/ 25</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${(results.dimension_scores.self_awareness / 25) * 100}%` }}
            />
          </div>
        </Card>
      </div>

      {/* Demographics */}
      <Card className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Assessment Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-gray-500 mr-3" />
            <div>
              <div className="text-sm text-gray-500">Age</div>
              <div className="font-semibold">{results.age} years</div>
            </div>
          </div>
          <div className="flex items-center">
            <User className="w-6 h-6 text-gray-500 mr-3" />
            <div>
              <div className="text-sm text-gray-500">Gender</div>
              <div className="font-semibold">{results.gender}</div>
            </div>
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-6 h-6 text-gray-500 mr-3" />
            <div>
              <div className="text-sm text-gray-500">Education</div>
              <div className="font-semibold">{results.education_level}</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Personalized Recommendations</h3>
        <div className="space-y-4">
          {getRecommendations(results.dimension_scores).map((recommendation, index) => (
            <div key={index} className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mr-4 mt-1">
                {index + 1}
              </div>
              <p className="text-gray-700">{recommendation}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={downloadReport}
          className="flex items-center justify-center"
          variant="primary"
        >
          <Download className="w-5 h-5 mr-2" />
          Download Report
        </Button>
        <Button
          onClick={onBack}
          variant="secondary"
          className="flex items-center justify-center"
        >
          Take Another Assessment
        </Button>
      </div>
    </div>
  );
};

export default AssessmentResults;