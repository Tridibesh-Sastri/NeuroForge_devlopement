import React, { useState } from 'react';
import { assessmentQuestions, likertScale, educationLevels, genderOptions } from '../../data/assessmentQuestions';
import { AssessmentService } from '../../services/assessmentService';
import Button from '../common/Button';
import Card from '../common/Card';
import { CheckCircle, AlertCircle, User, Calendar, GraduationCap } from 'lucide-react';
import type { Demographics, QuestionResponse } from '../../lib/supabase';

interface AssessmentFormProps {
  onComplete: (respondentId: string) => void;
}

const AssessmentForm: React.FC<AssessmentFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<'demographics' | 'questions' | 'submitting'>('demographics');
  const [demographics, setDemographics] = useState<Demographics>({
    age: 0,
    gender: '',
    education_level: ''
  });
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate progress
  const getProgress = () => {
    if (currentStep === 'demographics') return 0;
    if (currentStep === 'questions') {
      return Math.round((Object.keys(responses).length / assessmentQuestions.length) * 100);
    }
    return 100;
  };

  // Handle demographics form submission
  const handleDemographicsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (demographics.age > 0 && demographics.gender && demographics.education_level) {
      setCurrentStep('questions');
    }
  };

  // Handle question response
  const handleQuestionResponse = (questionId: number, value: number) => {
    const newResponses = { ...responses, [questionId]: value };
    setResponses(newResponses);

    // Auto-advance to next question
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    setCurrentStep('submitting');

    try {
      // Convert responses to required format
      const questionResponses: QuestionResponse[] = assessmentQuestions.map(question => {
        const rawResponse = responses[question.id] || 1;
        // Handle reverse scoring
        const finalResponse = question.reverse_scored ? (6 - rawResponse) : rawResponse;
        
        return {
          question_id: question.id,
          response: finalResponse,
          dimension: question.dimension
        };
      });

      const result = await AssessmentService.submitAssessment({
        demographics,
        responses: questionResponses
      });

      if (result.success && result.respondent_id) {
        onComplete(result.respondent_id);
      } else {
        setError(result.error || 'Failed to submit assessment');
        setCurrentStep('questions');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setCurrentStep('questions');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render demographics form
  const renderDemographicsForm = () => (
    <Card className="p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mx-auto mb-4">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Please provide some basic information to personalize your assessment</p>
      </div>

      <form onSubmit={handleDemographicsSubmit} className="space-y-6">
        {/* Age */}
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Age
          </label>
          <input
            type="number"
            id="age"
            min="13"
            max="120"
            value={demographics.age || ''}
            onChange={(e) => setDemographics({ ...demographics, age: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your age"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <User className="w-4 h-4 inline mr-2" />
            Gender
          </label>
          <div className="space-y-2">
            {genderOptions.map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value={option}
                  checked={demographics.gender === option}
                  onChange={(e) => setDemographics({ ...demographics, gender: e.target.value })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Education Level */}
        <div>
          <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
            <GraduationCap className="w-4 h-4 inline mr-2" />
            Education Level
          </label>
          <select
            id="education"
            value={demographics.education_level}
            onChange={(e) => setDemographics({ ...demographics, education_level: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select your education level</option>
            {educationLevels.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <Button
          type="submit"
          fullWidth
          size="lg"
          disabled={!demographics.age || !demographics.gender || !demographics.education_level}
        >
          Continue to Assessment
        </Button>
      </form>
    </Card>
  );

  // Render questions
  const renderQuestions = () => {
    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === assessmentQuestions.length - 1;
    const allQuestionsAnswered = Object.keys(responses).length === assessmentQuestions.length;

    return (
      <Card className="p-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
            </span>
            <span className="text-sm font-medium text-gray-600">
              {getProgress()}% Complete
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>

        {/* Current question */}
        <div className="mb-8">
          <div className="bg-gray-50 p-6 rounded-xl mb-6">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold mr-4 mt-1">
                {currentQuestion.id}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {currentQuestion.text}
                </h3>
                <p className="text-sm text-gray-600">
                  Dimension: {currentQuestion.dimension.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </p>
              </div>
            </div>
          </div>

          {/* Likert scale options */}
          <div className="space-y-3">
            {likertScale.map((option) => (
              <button
                key={option.value}
                onClick={() => handleQuestionResponse(currentQuestion.id, option.value)}
                className={`
                  w-full p-4 rounded-xl border-2 transition-all duration-200 text-left
                  ${responses[currentQuestion.id] === option.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }
                `}
              >
                <div className="flex items-center">
                  <div 
                    className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4
                      ${responses[currentQuestion.id] === option.value 
                        ? 'border-blue-500 bg-blue-500' 
                        : 'border-gray-400'
                      }
                    `}
                  >
                    {responses[currentQuestion.id] === option.value && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-500">Value: {option.value}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="secondary"
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>

          <div className="flex space-x-3">
            {!isLastQuestion ? (
              <Button
                onClick={() => setCurrentQuestionIndex(Math.min(assessmentQuestions.length - 1, currentQuestionIndex + 1))}
                disabled={!responses[currentQuestion.id]}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered}
                className="flex items-center"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Submit Assessment
              </Button>
            )}
          </div>
        </div>

        {/* Question navigation dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {assessmentQuestions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestionIndex(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-200
                ${responses[assessmentQuestions[index].id] 
                  ? 'bg-green-500' 
                  : index === currentQuestionIndex 
                    ? 'bg-blue-500' 
                    : 'bg-gray-300'
                }
              `}
            />
          ))}
        </div>
      </Card>
    );
  };

  // Render submitting state
  const renderSubmitting = () => (
    <Card className="p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white mx-auto mb-6">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Your Assessment</h2>
      <p className="text-gray-600 mb-6">
        We're analyzing your responses and calculating your personalized results...
      </p>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" />
      </div>
    </Card>
  );

  return (
    <div className="max-w-3xl mx-auto">
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center">
          <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {currentStep === 'demographics' && renderDemographicsForm()}
      {currentStep === 'questions' && renderQuestions()}
      {currentStep === 'submitting' && renderSubmitting()}
    </div>
  );
};

export default AssessmentForm;