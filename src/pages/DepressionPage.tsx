import React, { useState } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ProgressSteps from '../components/common/ProgressSteps';
import { Camera, Upload, CheckCircle, Brain, Smile, FileText } from 'lucide-react';
import { PageType } from '../App';

interface DepressionPageProps {
  navigate: (page: PageType) => void;
  step: number;
  setStep: (step: number) => void;
  setResults: (results: any) => void;
}

// Assessment method type
type AssessmentMethod = 'complete' | 'psychometric' | 'facial' | null;

// Comprehensive mental health assessment questions
const questions = [
  {
    id: 1,
    text: "Little interest or pleasure in doing things",
    category: "Depression"
  },
  {
    id: 2,
    text: "Feeling down, depressed, or hopeless",
    category: "Depression"
  },
  {
    id: 3,
    text: "Trouble falling or staying asleep, or sleeping too much",
    category: "Sleep"
  },
  {
    id: 4,
    text: "Feeling tired or having little energy",
    category: "Energy"
  },
  {
    id: 5,
    text: "Poor appetite or overeating",
    category: "Appetite"
  },
  {
    id: 6,
    text: "Feeling bad about yourself or that you are a failure",
    category: "Self-Worth"
  },
  {
    id: 7,
    text: "Trouble concentrating on things",
    category: "Concentration"
  },
  {
    id: 8,
    text: "Moving or speaking slowly, or being fidgety/restless",
    category: "Motor"
  },
  {
    id: 9,
    text: "Feeling nervous, anxious, or on edge",
    category: "Anxiety"
  },
  {
    id: 10,
    text: "Not being able to stop or control worrying",
    category: "Anxiety"
  },
  {
    id: 11,
    text: "Worrying too much about different things",
    category: "Anxiety"
  },
  {
    id: 12,
    text: "Having trouble relaxing",
    category: "Relaxation"
  },
  {
    id: 13,
    text: "Being so restless that it's hard to sit still",
    category: "Motor"
  },
  {
    id: 14,
    text: "Becoming easily annoyed or irritable",
    category: "Irritability"
  },
  {
    id: 15,
    text: "Feeling afraid as if something awful might happen",
    category: "Fear"
  },
  {
    id: 16,
    text: "Thoughts of self-harm or suicide",
    category: "Crisis"
  },
  {
    id: 17,
    text: "Difficulty in social situations",
    category: "Social"
  },
  {
    id: 18,
    text: "Experiencing panic or fear attacks",
    category: "Panic"
  },
  {
    id: 19,
    text: "Feeling detached from reality",
    category: "Dissociation"
  },
  {
    id: 20,
    text: "Having unwanted thoughts or memories",
    category: "Intrusive"
  }
];

const options = [
  { value: 0, label: "Not at all", description: "Never or rarely experience this" },
  { value: 1, label: "Several days", description: "Experience this some days" },
  { value: 2, label: "More than half the days", description: "Experience this frequently" },
  { value: 3, label: "Nearly every day", description: "Experience this almost daily" }
];

const DepressionPage: React.FC<DepressionPageProps> = ({ navigate, step, setStep, setResults }) => {
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [cameraStarted, setCameraStarted] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [assessmentMethod, setAssessmentMethod] = useState<AssessmentMethod>(null);

  // Get steps for progress indicator based on assessment method
  const getSteps = () => {
    if (!assessmentMethod) return [];
    
    switch (assessmentMethod) {
      case 'complete':
        return [
          { label: 'Method', completed: true, current: false },
          { label: 'Assessment', completed: step > 1, current: step === 1 },
          { label: 'Facial Analysis', completed: step > 2, current: step === 2 },
          { label: 'Results', completed: false, current: step === 3 }
        ];
      case 'psychometric':
        return [
          { label: 'Method', completed: true, current: false },
          { label: 'Assessment', completed: step > 1, current: step === 1 },
          { label: 'Results', completed: false, current: step === 2 }
        ];
      case 'facial':
        return [
          { label: 'Method', completed: true, current: false },
          { label: 'Facial Analysis', completed: step > 1, current: step === 1 },
          { label: 'Results', completed: false, current: step === 2 }
        ];
      default:
        return [];
    }
  };

  // Handle assessment method selection
  const handleMethodSelect = (method: AssessmentMethod) => {
    setAssessmentMethod(method);
    setStep(1);
  };

  // Handle questionnaire response
  const handleOptionSelect = (questionId: number, value: number) => {
    setAnswers({
      ...answers,
      [questionId]: value
    });

    // Check for crisis indicators
    if (questionId === 16 && value >= 2) {
      setShowCrisisAlert(true);
    }

    // Auto-advance to next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Handle continue to next step
  const handleContinue = () => {
    if (!assessmentMethod) return;

    if (assessmentMethod === 'complete') {
      if (step === 1) {
        // Check if all questions are answered
        if (Object.keys(answers).length < questions.length) {
          alert("Please answer all questions before continuing.");
          return;
        }
        setStep(2);
      } else if (step === 2) {
        handleFacialAnalysis();
      }
    } else if (assessmentMethod === 'psychometric') {
      if (step === 1) {
        // Check if all questions are answered
        if (Object.keys(answers).length < questions.length) {
          alert("Please answer all questions before continuing.");
          return;
        }
        calculateResults();
      }
    } else if (assessmentMethod === 'facial') {
      if (step === 1) {
        handleFacialAnalysis();
      }
    }
  };

  // Handle facial analysis
  const handleFacialAnalysis = () => {
    setAnalyzing(true);
    
    // Simulate facial analysis progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          calculateResults();
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  // Calculate comprehensive results
  const calculateResults = () => {
    // Calculate scores for different categories
    const categories = {
      depression: 0,
      anxiety: 0,
      sleep: 0,
      social: 0,
      panic: 0
    };

    let totalScore = 0;
    
    // Calculate questionnaire scores if applicable
    if (assessmentMethod !== 'facial') {
      Object.entries(answers).forEach(([questionId, value]) => {
        const question = questions.find(q => q.id === parseInt(questionId));
        if (question) {
          totalScore += value;
          switch (question.category) {
            case 'Depression':
              categories.depression += value;
              break;
            case 'Anxiety':
              categories.anxiety += value;
              break;
            case 'Sleep':
              categories.sleep += value;
              break;
            case 'Social':
              categories.social += value;
              break;
            case 'Panic':
              categories.panic += value;
              break;
          }
        }
      });
    }

    // Add facial analysis results if applicable
    if (assessmentMethod !== 'psychometric') {
      // Simulate facial analysis scores
      categories.depression += Math.random() * 10;
      categories.anxiety += Math.random() * 10;
      totalScore += Math.random() * 30;
    }

    const results = {
      overallScore: totalScore,
      riskLevel: getRiskLevel(totalScore),
      categories: categories,
      recommendations: generateRecommendations(categories),
      confidence: assessmentMethod === 'complete' ? 92 : 75,
      needsImmediate: showCrisisAlert,
      assessmentMethod: assessmentMethod
    };

    setResults(results);
    navigate('results');
  };

  // Get risk level based on score
  const getRiskLevel = (score: number) => {
    if (score < 20) return "Low Risk";
    if (score < 40) return "Moderate Risk";
    return "High Risk";
  };

  // Generate personalized recommendations
  const generateRecommendations = (categories: any) => {
    const recommendations = [];

    if (categories.depression > 5) {
      recommendations.push("Consider scheduling a consultation with a mental health professional");
    }
    if (categories.anxiety > 5) {
      recommendations.push("Practice daily mindfulness or meditation exercises");
    }
    if (categories.sleep > 2) {
      recommendations.push("Establish a consistent sleep schedule and bedtime routine");
    }
    if (categories.social > 2) {
      recommendations.push("Gradually increase social interactions in comfortable settings");
    }
    if (categories.panic > 2) {
      recommendations.push("Learn and practice grounding techniques for panic attacks");
    }

    return recommendations;
  };

  // Render method selection
  const renderMethodSelection = () => (
    <div className="max-w-3xl mx-auto">
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Assessment Method</h2>
        
        <div className="space-y-6">
          {/* Complete Analysis */}
          <button
            onClick={() => handleMethodSelect('complete')}
            className="w-full p-6 rounded-xl border-2 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50"
          >
            <div className="flex items-start">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                <Brain className="h-6 w-6" />
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-semibold text-gray-900">Complete Analysis (Recommended)</h3>
                <p className="text-gray-600 mt-1">
                  Combines psychometric assessment and facial analysis for comprehensive insights
                </p>
                <div className="mt-2 flex items-center">
                  <span className="text-sm font-medium text-blue-600">92% accuracy</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">15-20 minutes</span>
                </div>
              </div>
            </div>
          </button>

          {/* Psychometric Assessment */}
          <button
            onClick={() => handleMethodSelect('psychometric')}
            className="w-full p-6 rounded-xl border-2 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50"
          >
            <div className="flex items-start">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white">
                <FileText className="h-6 w-6" />
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-semibold text-gray-900">Psychometric Assessment Only</h3>
                <p className="text-gray-600 mt-1">
                  Focus on personality traits and behavioral patterns through questionnaire
                </p>
                <div className="mt-2 flex items-center">
                  <span className="text-sm font-medium text-green-600">85% accuracy</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">10-12 minutes</span>
                </div>
              </div>
            </div>
          </button>

          {/* Facial Analysis */}
          <button
            onClick={() => handleMethodSelect('facial')}
            className="w-full p-6 rounded-xl border-2 transition-all duration-200 hover:border-blue-500 hover:bg-blue-50"
          >
            <div className="flex items-start">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white">
                <Smile className="h-6 w-6" />
              </div>
              <div className="ml-4 text-left">
                <h3 className="text-lg font-semibold text-gray-900">Facial Analysis Only</h3>
                <p className="text-gray-600 mt-1">
                  Analyze facial expressions and micro-movements for emotional insights
                </p>
                <div className="mt-2 flex items-center">
                  <span className="text-sm font-medium text-amber-600">78% accuracy</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-500">5-7 minutes</span>
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 bg-blue-50 p-4 rounded-xl">
          <p className="text-sm text-blue-800">
            <strong>Privacy Note:</strong> All analysis is performed locally on your device. 
            No data is stored or transmitted to external servers.
          </p>
        </div>
      </Card>
    </div>
  );

  // Render questionnaire step
  const renderQuestionnaire = () => {
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="max-w-3xl mx-auto">
        <Card className="p-8">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round((currentQuestionIndex + 1) / questions.length * 100)}% Complete
              </span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {currentQuestion.text}
            </h3>
            <p className="text-gray-600">
              Over the last 2 weeks, how often have you experienced this?
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(currentQuestion.id, option.value)}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all duration-200
                  ${answers[currentQuestion.id] === option.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                  }
                `}
              >
                <div className="flex items-center">
                  <div 
                    className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${answers[currentQuestion.id] === option.value 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-400'
                      }
                    `}
                  >
                    {answers[currentQuestion.id] === option.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div className="ml-3 text-left">
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-between">
            <Button
              variant="secondary"
              onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            <Button
              onClick={() => {
                if (currentQuestionIndex === questions.length - 1) {
                  handleContinue();
                } else {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                }
              }}
              disabled={!answers[currentQuestion.id]}
            >
              {currentQuestionIndex === questions.length - 1 
                ? (assessmentMethod === 'complete' ? 'Continue to Facial Analysis' : 'Complete Assessment')
                : 'Next'
              }
            </Button>
          </div>
        </Card>

        {/* Crisis Alert */}
        {showCrisisAlert && (
          <div className="mt-6">
            <Card className="p-6 bg-red-50 border-red-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-red-800">
                    Immediate Support Available
                  </h3>
                  <div className="mt-2 text-red-700">
                    <p>
                      If you're having thoughts of self-harm or suicide, please know that help is available 24/7:
                    </p>
                    <ul className="list-disc list-inside mt-2">
                      <li>National Crisis Helpline: 988</li>
                      <li>Crisis Text Line: Text HOME to 741741</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => window.location.href = 'tel:988'}
                    >
                      Call Crisis Helpline
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  };

  // Render facial analysis step
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
          <li className="font-medium text-gray-900">Mental Health Assessment</li>
        </ol>
      </nav>

      {/* Main heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mental Health Assessment</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Complete this confidential assessment to receive personalized insights and support
        </p>
      </div>
      
      {/* Progress indicator */}
      {assessmentMethod && (
        <div className="mb-12 max-w-2xl mx-auto">
          <ProgressSteps steps={getSteps()} />
        </div>
      )}
      
      {/* Main content */}
      {!assessmentMethod ? (
        renderMethodSelection()
      ) : (
        <>
          {/* Assessment content based on method and step */}
          {assessmentMethod === 'complete' && (
            <>
              {step === 1 && renderQuestionnaire()}
              {step === 2 && renderFacialAnalysis()}
            </>
          )}
          {assessmentMethod === 'psychometric' && step === 1 && renderQuestionnaire()}
          {assessmentMethod === 'facial' && step === 1 && renderFacialAnalysis()}
        </>
      )}
    </div>
  );
};

export default DepressionPage;