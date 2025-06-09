import React, { useState } from 'react';
import { PageType } from '../App';
import AssessmentForm from '../components/assessment/AssessmentForm';
import AssessmentResults from '../components/assessment/AssessmentResults';
import AssessmentAnalytics from '../components/assessment/AssessmentAnalytics';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Brain, BarChart3, FileText, ArrowLeft } from 'lucide-react';

interface PsychometricPageProps {
  navigate: (page: PageType) => void;
}

type ViewType = 'home' | 'assessment' | 'results' | 'analytics';

const PsychometricPage: React.FC<PsychometricPageProps> = ({ navigate }) => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [respondentId, setRespondentId] = useState<string | null>(null);

  const handleAssessmentComplete = (id: string) => {
    setRespondentId(id);
    setCurrentView('results');
  };

  const renderHome = () => (
    <div className="space-y-8">
      {/* Header */}
      <Card className="p-8">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mx-auto mb-6">
            <Brain className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Psychometric Assessment System</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete a comprehensive 20-question assessment to gain insights into your psychological dimensions
          </p>
        </div>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card hover className="p-8" onClick={() => setCurrentView('assessment')}>
          <div className="h-14 w-14 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mb-6">
            <FileText className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Take Assessment</h2>
          <p className="text-gray-600 mb-6">
            Complete our validated 20-question psychometric assessment using a 5-point Likert scale
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <div>• 4 psychological dimensions</div>
            <div>• 5-7 minutes to complete</div>
            <div>• Instant results</div>
          </div>
        </Card>

        <Card hover className="p-8" onClick={() => setCurrentView('analytics')}>
          <div className="h-14 w-14 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white mb-6">
            <BarChart3 className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">View Analytics</h2>
          <p className="text-gray-600 mb-6">
            Explore aggregate data and insights from all completed assessments
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <div>• Population statistics</div>
            <div>• Score distributions</div>
            <div>• Demographic breakdowns</div>
          </div>
        </Card>

        <Card className="p-8 border-2 border-dashed border-gray-300">
          <div className="h-14 w-14 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 mb-6">
            <Brain className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Advanced Features</h2>
          <p className="text-gray-600 mb-6">
            Additional assessment tools and features coming soon
          </p>
          <span className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-medium">
            Coming Soon
          </span>
        </Card>
      </div>

      {/* Assessment Dimensions */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Assessment Dimensions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Emotional Regulation</h3>
            <p className="text-sm text-gray-600">
              Ability to manage and control emotional responses
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Social Interaction</h3>
            <p className="text-sm text-gray-600">
              Comfort and skill in social situations and relationships
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Decision Making</h3>
            <p className="text-sm text-gray-600">
              Ability to make thoughtful and effective decisions
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Self Awareness</h3>
            <p className="text-sm text-gray-600">
              Understanding of personal strengths, weaknesses, and motivations
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <button 
              onClick={() => navigate('landing')}
              className="hover:text-blue-600"
            >
              Home
            </button>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li>
            <button 
              onClick={() => navigate('dashboard')}
              className="hover:text-blue-600"
            >
              Dashboard
            </button>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="font-medium text-gray-900">Psychometric Assessment</li>
        </ol>
      </nav>

      {/* Back button for sub-views */}
      {currentView !== 'home' && (
        <div className="mb-6">
          <Button
            variant="secondary"
            onClick={() => setCurrentView('home')}
            className="flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      )}

      {/* Render current view */}
      {currentView === 'home' && renderHome()}
      {currentView === 'assessment' && (
        <AssessmentForm onComplete={handleAssessmentComplete} />
      )}
      {currentView === 'results' && respondentId && (
        <AssessmentResults 
          respondentId={respondentId} 
          onBack={() => setCurrentView('home')} 
        />
      )}
      {currentView === 'analytics' && <AssessmentAnalytics />}
    </div>
  );
};

export default PsychometricPage;