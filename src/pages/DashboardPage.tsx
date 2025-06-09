import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Brain, GraduationCap, Activity, Dumbbell, BookOpen, Scale, FileText } from 'lucide-react';
import { PageType, AgentType } from '../App';

interface DashboardPageProps {
  navigate: (page: PageType, agent?: AgentType) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ navigate }) => {
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
          <li className="font-medium text-gray-900">Dashboard</li>
        </ol>
      </nav>

      {/* Main heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your AI Assistant</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Select from our collection of specialized AI agents designed to support different aspects of your life
        </p>
      </div>

      {/* Main Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {/* Mental Health Assistant Card */}
        <Card hover className="p-8">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white mb-6">
            <Brain className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Mental Health Assistant</h2>
          <p className="text-gray-600 mb-6">
            Advanced AI analysis combining facial expression recognition and psychometric assessment.
          </p>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Features:</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Facial expression analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Psychometric questionnaire</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Progress tracking</span>
              </li>
            </ul>
          </div>
          
          <Button 
            variant="success" 
            gradientFrom="green-400" 
            gradientTo="blue-500"
            fullWidth
            onClick={() => navigate('depression', 'depression')}
          >
            Start Assessment
          </Button>
        </Card>

        {/* Career Guidance Assistant Card */}
        <Card hover className="p-8">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white mb-6">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Career Guidance Assistant</h2>
          <p className="text-gray-600 mb-6">
            AI-powered career counseling with personalized recommendations and mentor connections.
          </p>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Features:</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span>Career matching</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span>Video insights</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 mr-2">✓</span>
                <span>Live mentor sessions</span>
              </li>
            </ul>
          </div>
          
          <Button 
            variant="primary" 
            gradientFrom="purple-400" 
            gradientTo="pink-500"
            fullWidth
            onClick={() => navigate('career', 'career')}
          >
            Get Career Guidance
          </Button>
        </Card>

        {/* Legal Assistant Card */}
        <Card hover className="p-8">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white mb-6">
            <Scale className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Legal Assistant</h2>
          <p className="text-gray-600 mb-6">
            Confidential legal guidance with jurisdiction-specific advice and document generation.
          </p>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Features:</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">✓</span>
                <span>Multi-language support</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">✓</span>
                <span>Document generation</span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">✓</span>
                <span>Location-specific advice</span>
              </li>
            </ul>
          </div>
          
          <Button 
            variant="primary" 
            gradientFrom="amber-400" 
            gradientTo="orange-500"
            fullWidth
            onClick={() => navigate('legal', 'legal')}
          >
            Get Legal Support
          </Button>
        </Card>

        {/* Psychometric Assessment Card */}
        <Card hover className="p-8">
          <div className="h-14 w-14 rounded-xl bg-gradient-to-r from-indigo-400 to-cyan-500 flex items-center justify-center text-white mb-6">
            <FileText className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-3">Psychometric Assessment</h2>
          <p className="text-gray-600 mb-6">
            Comprehensive psychological evaluation with detailed analytics and insights.
          </p>
          
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Features:</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">✓</span>
                <span>20-question assessment</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">✓</span>
                <span>4 psychological dimensions</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-500 mr-2">✓</span>
                <span>Detailed analytics</span>
              </li>
            </ul>
          </div>
          
          <Button 
            variant="primary" 
            gradientFrom="indigo-400" 
            gradientTo="cyan-500"
            fullWidth
            onClick={() => navigate('psychometric')}
          >
            Take Assessment
          </Button>
        </Card>
      </div>

      {/* Coming Soon Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Coming Soon</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Productivity Coach */}
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-white">
            <div className="h-12 w-12 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 mb-4">
              <Activity className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Productivity Coach</h3>
            <p className="text-gray-600 mb-4">
              AI-powered productivity analysis and personalized workflow optimization.
            </p>
            <span className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-medium">
              Coming Soon
            </span>
          </div>

          {/* Health & Fitness */}
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-white">
            <div className="h-12 w-12 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 mb-4">
              <Dumbbell className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Health & Fitness</h3>
            <p className="text-gray-600 mb-4">
              Personalized workout plans, nutrition guidance, and health tracking.
            </p>
            <span className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-medium">
              Coming Soon
            </span>
          </div>

          {/* Learning Assistant */}
          <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-white">
            <div className="h-12 w-12 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500 mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Learning Assistant</h3>
            <p className="text-gray-600 mb-4">
              Adaptive learning paths and personalized educational content.
            </p>
            <span className="inline-block px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-medium">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;