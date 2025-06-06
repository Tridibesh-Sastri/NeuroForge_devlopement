import React from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Calendar, Download, Play, Phone } from 'lucide-react';
import { PageType, AgentType } from '../App';

interface ResultsPageProps {
  navigate: (page: PageType) => void;
  selectedAgent: AgentType;
  results: any;
}

const ResultsPage: React.FC<ResultsPageProps> = ({ navigate, selectedAgent, results }) => {
  if (!results) {
    navigate('dashboard');
    return null;
  }

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
          <li>
            <button 
              onClick={() => navigate(selectedAgent || 'dashboard')}
              className="hover:text-blue-600"
            >
              {selectedAgent === 'depression' ? 'Mental Health Assistant' : 'Career Guidance Assistant'}
            </button>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="font-medium text-gray-900">Results</li>
        </ol>
      </nav>

      {/* Main heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {selectedAgent === 'depression' ? 'Mental Health Assessment Results' : 'Career Guidance Results'}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {selectedAgent === 'depression' 
            ? 'Review your mental health insights and recommendations' 
            : 'Explore career paths and next steps based on your profile'}
        </p>
      </div>
      
      {/* Results content */}
      {selectedAgent === 'depression' ? renderDepressionResults() : renderCareerResults()}
    </div>
  );
  
  // Render depression assessment results
  function renderDepressionResults() {
    // Color based on risk score
    const getRiskColor = () => {
      const score = results?.riskScore || 0;
      if (score < 30) return 'text-green-500';
      if (score < 60) return 'text-yellow-500';
      return 'text-red-500';
    };
    
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="p-8 mb-8">
          <div className="flex flex-col md:flex-row">
            {/* Risk score */}
            <div className="md:w-1/3 mb-8 md:mb-0 flex flex-col items-center justify-center">
              <div className={`text-6xl font-bold ${getRiskColor()}`}>
                {results?.riskScore || 0}
              </div>
              <div className="text-lg font-medium text-gray-800 mt-2">
                {results?.riskLevel || 'N/A'}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {results?.confidence || 0}% confidence
              </div>
            </div>
            
            {/* Recommendations */}
            <div className="md:w-2/3 md:pl-8 md:border-l border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recommendations</h2>
              <ul className="space-y-3">
                {(results?.recommendations || []).map((rec: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
        
        {/* Action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="secondary"
            fullWidth
            className="flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Save Results
          </Button>
          
          <Button
            variant="success"
            gradientFrom="green-400"
            gradientTo="blue-500"
            fullWidth
            className="flex items-center justify-center"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Schedule Follow-up
          </Button>
        </div>
        
        {/* Note */}
        <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> This assessment provides general insights and is not a clinical diagnosis. 
            If you're experiencing severe symptoms, please consult with a healthcare professional.
          </p>
        </div>
      </div>
    );
  }
  
  // Render career guidance results
  function renderCareerResults() {
    const careerPaths = results?.careerPaths || [];
    const nextSteps = results?.nextSteps || [];

    return (
      <div className="max-w-3xl mx-auto">
        {/* Career paths */}
        <Card className="p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended Career Paths</h2>
          
          <div className="space-y-6">
            {careerPaths.map((career: any, index: number) => (
              <div 
                key={index} 
                className="p-6 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100"
              >
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900">{career.title}</h3>
                    <p className="text-gray-700 mt-2">{career.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-4">
                    <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                      Match: {career.match}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Video insights */}
        <Card className="p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Video Insights</h2>
          
          <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-xl overflow-hidden relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="primary"
                className="rounded-full w-16 h-16 flex items-center justify-center"
                onClick={() => navigate('mentor-call')}
              >
                <Play className="w-8 h-8" />
              </Button>
            </div>
          </div>
          
          <p className="mt-4 text-gray-600">
            Watch this video for expert advice on transitioning into your recommended career paths.
          </p>
        </Card>
        
        {/* Next steps */}
        <Card className="p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Next Steps</h2>
          
          <ol className="space-y-4">
            {nextSteps.map((step: string, index: number) => (
              <li key={index} className="flex">
                <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 text-white font-bold text-sm">
                  {index + 1}
                </div>
                <p className="ml-4 text-gray-700">{step}</p>
              </li>
            ))}
          </ol>
        </Card>
        
        {/* Action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="primary"
            gradientFrom="purple-400"
            gradientTo="pink-500"
            fullWidth
            className="flex items-center justify-center"
            onClick={() => navigate('mentor-call')}
          >
            <Phone className="w-5 h-5 mr-2" />
            Schedule Mentor Call
          </Button>
          
          <Button
            variant="secondary"
            fullWidth
            className="flex items-center justify-center"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Report
          </Button>
        </div>
      </div>
    );
  }
};

export default ResultsPage;