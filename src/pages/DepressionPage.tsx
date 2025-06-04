import React, { useState } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ProgressSteps from '../components/common/ProgressSteps';
import { Camera, Upload, CheckCircle } from 'lucide-react';
import { PageType } from '../App';

interface DepressionPageProps {
  navigate: (page: PageType) => void;
  step: number;
  setStep: (step: number) => void;
  setResults: (results: any) => void;
}

// PHQ-9 style questions
const questions = [
  {
    id: 1,
    text: "Little interest or pleasure in doing things?",
  },
  {
    id: 2,
    text: "Feeling down, depressed, or hopeless?",
  },
  {
    id: 3,
    text: "Trouble falling or staying asleep, or sleeping too much?",
  },
  {
    id: 4,
    text: "Feeling tired or having little energy?",
  },
  {
    id: 5,
    text: "Poor appetite or overeating?",
  }
];

const options = [
  { value: 0, label: "Not at all" },
  { value: 1, label: "Several days" },
  { value: 2, label: "More than half the days" },
  { value: 3, label: "Nearly every day" }
];

const DepressionPage: React.FC<DepressionPageProps> = ({ navigate, step, setStep, setResults }) => {
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [cameraStarted, setCameraStarted] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Get steps for progress indicator
  const getSteps = () => [
    { label: 'Questionnaire', completed: step > 1, current: step === 1 },
    { label: 'Facial Analysis', completed: step > 2, current: step === 2 },
    { label: 'Results', completed: false, current: step === 3 }
  ];

  // Handle questionnaire response
  const handleOptionSelect = (questionId: number, value: number) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });
  };

  // Handle continue to next step
  const handleContinue = () => {
    if (step === 1) {
      // Check if all questions are answered
      if (Object.keys(answers).length < questions.length) {
        alert("Please answer all questions before continuing.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Simulate processing
      setAnalyzing(true);
      
      // Simulate progress for camera analysis
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            
            // When complete, set results and navigate
            setTimeout(() => {
              const mockResult = {
                riskScore: 35,
                riskLevel: "Low-Medium Risk",
                confidence: 87,
                recommendations: [
                  "Consider maintaining a mood journal to track daily emotions",
                  "Practice mindfulness meditation for 10 minutes daily",
                  "Ensure regular physical activity and adequate sleep",
                  "Connect with friends or family regularly"
                ]
              };
              
              setResults(mockResult);
              navigate('results');
            }, 1000);
            
            return 100;
          }
          return prev + 5;
        });
      }, 200);
    }
  };

  // Render the appropriate step
  const renderStep = () => {
    switch (step) {
      case 1:
        return renderQuestionnaire();
      case 2:
        return renderFacialAnalysis();
      default:
        return renderQuestionnaire();
    }
  };

  // Questionnaire step
  const renderQuestionnaire = () => {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Mental Health Questionnaire</h2>
          <p className="text-gray-600 mb-8">
            Over the last 2 weeks, how often have you been bothered by any of the following problems?
          </p>
          
          <div className="space-y-8">
            {questions.map((question) => (
              <div key={question.id} className="bg-gray-50 p-6 rounded-xl">
                <p className="text-lg font-medium text-gray-800 mb-4">{question.text}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  {options.map((option) => (
                    <div 
                      key={option.value}
                      className={`
                        p-3 rounded-lg border-2 cursor-pointer transition-all duration-200
                        ${answers[question.id] === option.value 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                        }
                      `}
                      onClick={() => handleOptionSelect(question.id, option.value)}
                    >
                      <div className="flex items-center">
                        <div 
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                            ${answers[question.id] === option.value 
                              ? 'border-blue-500 bg-blue-500' 
                              : 'border-gray-400'
                            }
                          `}
                        >
                          {answers[question.id] === option.value && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <span className="ml-2 text-gray-700">{option.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button 
              onClick={handleContinue}
              size="lg"
            >
              Continue to Facial Analysis
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  // Facial analysis step
  const renderFacialAnalysis = () => {
    return (
      <div className="max-w-3xl mx-auto">
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Facial Expression Analysis</h2>
          <p className="text-gray-600 mb-8">
            Our AI will analyze your facial expressions to help detect signs of depression.
            This is completely private and data is not stored.
          </p>
          
          <div className="flex flex-col items-center">
            {/* Camera interface */}
            <div className={`
              w-72 h-72 md:w-96 md:h-96 rounded-full border-4 
              ${cameraStarted ? 'border-green-500' : 'border-gray-300 border-dashed'} 
              flex items-center justify-center mb-8 relative overflow-hidden
            `}>
              {cameraStarted ? (
                <>
                  {/* Mock camera feed */}
                  <div className="absolute inset-0 bg-gray-800"></div>
                  
                  {/* Face position guide */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-56 h-56 md:w-72 md:h-72 rounded-full border-2 border-white border-dashed opacity-50"></div>
                  </div>
                  
                  {/* Processing overlay */}
                  {analyzing && (
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center text-white">
                      <p className="text-lg font-medium mb-4">Analyzing expressions...</p>
                      <div className="w-56 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <p className="mt-2 text-sm">{progress}%</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-500">
                  <Camera className="w-16 h-16 mx-auto mb-4" />
                  <p>Position your face in the center</p>
                </div>
              )}
            </div>
            
            {/* Camera controls */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Button 
                variant={cameraStarted ? "success" : "primary"}
                fullWidth
                onClick={() => setCameraStarted(!cameraStarted)}
                className="flex items-center justify-center"
              >
                <Camera className="w-5 h-5 mr-2" />
                {cameraStarted ? "Stop Camera" : "Start Camera"}
              </Button>
              
              <Button 
                variant="secondary"
                fullWidth
                className="flex items-center justify-center"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload Photo
              </Button>
            </div>
            
            {/* Continue button */}
            <div className="mt-8 w-full">
              <Button 
                onClick={handleContinue}
                fullWidth
                disabled={!cameraStarted || analyzing}
                className="flex items-center justify-center"
                size="lg"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Complete Assessment
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  };

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
          <li className="font-medium text-gray-900">Mental Health Assistant</li>
        </ol>
      </nav>

      {/* Main heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mental Health Assessment</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Complete the following steps to receive your personalized mental health insights
        </p>
      </div>
      
      {/* Progress indicator */}
      <div className="mb-12 max-w-2xl mx-auto">
        <ProgressSteps steps={getSteps()} />
      </div>
      
      {/* Step content */}
      {renderStep()}
    </div>
  );
};

export default DepressionPage;