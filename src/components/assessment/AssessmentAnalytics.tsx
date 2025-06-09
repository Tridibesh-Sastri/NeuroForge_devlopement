import React, { useState, useEffect } from 'react';
import { AssessmentService } from '../../services/assessmentService';
import Button from '../common/Button';
import Card from '../common/Card';
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  PieChart,
  RefreshCw
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Legend
} from 'recharts';

const AssessmentAnalytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const response = await AssessmentService.getAggregateAnalytics();
      if (response.success && response.data) {
        setAnalytics(response.data);
      } else {
        setError(response.error || 'Failed to load analytics');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
        <p className="text-gray-600">Loading analytics...</p>
      </Card>
    );
  }

  if (error || !analytics) {
    return (
      <Card className="p-8 text-center">
        <div className="text-red-500 mb-4">
          <BarChart3 className="w-12 h-12 mx-auto" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Analytics</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={loadAnalytics}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </Card>
    );
  }

  // Prepare data for charts
  const dimensionData = [
    {
      dimension: 'Emotional\nRegulation',
      average: analytics.averageScores.emotional_regulation
    },
    {
      dimension: 'Social\nInteraction',
      average: analytics.averageScores.social_interaction
    },
    {
      dimension: 'Decision\nMaking',
      average: analytics.averageScores.decision_making
    },
    {
      dimension: 'Self\nAwareness',
      average: analytics.averageScores.self_awareness
    }
  ];

  const genderData = Object.entries(analytics.demographics.gender || {}).map(([gender, count]) => ({
    name: gender,
    value: count as number
  }));

  const educationData = Object.entries(analytics.demographics.education || {}).map(([education, count]) => ({
    name: education,
    value: count as number
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="p-8">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mx-auto mb-6">
            <BarChart3 className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Analytics</h1>
          <p className="text-gray-600">Aggregate insights from all completed assessments</p>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {analytics.totalResponses}
              </div>
              <div className="text-sm text-gray-500">Total Responses</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {analytics.averageScores.total}
              </div>
              <div className="text-sm text-gray-500">Average Total Score</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <BarChart3 className="w-8 h-8 text-purple-500 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.max(...analytics.scoreDistribution.map((d: any) => d.count))}
              </div>
              <div className="text-sm text-gray-500">Most Common Range</div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <PieChart className="w-8 h-8 text-orange-500 mr-3" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Object.keys(analytics.demographics.gender || {}).length}
              </div>
              <div className="text-sm text-gray-500">Gender Categories</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Average Dimension Scores */}
      <Card className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Average Dimension Scores</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dimensionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="dimension" />
            <YAxis domain={[0, 25]} />
            <Tooltip />
            <Bar dataKey="average" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Score Distribution */}
      <Card className="p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Score Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analytics.scoreDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gender Distribution */}
        <Card className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Gender Distribution</h3>
          {genderData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500 py-12">
              No gender data available
            </div>
          )}
        </Card>

        {/* Education Distribution */}
        <Card className="p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Education Distribution</h3>
          {educationData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={educationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {educationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-500 py-12">
              No education data available
            </div>
          )}
        </Card>
      </div>

      {/* Refresh Button */}
      <div className="text-center">
        <Button onClick={loadAnalytics} className="flex items-center">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Analytics
        </Button>
      </div>
    </div>
  );
};

export default AssessmentAnalytics;