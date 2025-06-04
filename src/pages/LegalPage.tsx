import React, { useState, useRef } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ProgressSteps from '../components/common/ProgressSteps';
import { PageType } from '../App';
import { 
  Mic, MicOff, Upload, Shield, FileText, Globe2, 
  AlertTriangle, Download, Languages
} from 'lucide-react';

interface LegalPageProps {
  navigate: (page: PageType) => void;
  step: number;
  setStep: (step: number) => void;
  setResults: (results: any) => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ 
  navigate, 
  step, 
  setStep, 
  setResults 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi'>('en');
  const [legalQuery, setLegalQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [jurisdiction, setJurisdiction] = useState({
    country: '',
    state: '',
    district: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get steps for progress indicator
  const getSteps = () => [
    { 
      label: selectedLanguage === 'en' ? 'Location' : 'स्थान', 
      completed: step > 1, 
      current: step === 1 
    },
    { 
      label: selectedLanguage === 'en' ? 'Consultation' : 'परामर्श', 
      completed: step > 2, 
      current: step === 2 
    },
    { 
      label: selectedLanguage === 'en' ? 'Documents' : 'दस्तावेज़', 
      completed: step > 3, 
      current: step === 3 
    }
  ];

  // Toggle voice recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement actual voice recording logic here
  };

  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Implement file processing logic here
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = {
        legalAdvice: {
          summary: "Based on your situation, this appears to be a workplace harassment case.",
          applicableLaws: [
            "Prevention of Sexual Harassment Act, 2013",
            "Industrial Disputes Act, 1947"
          ],
          immediateSteps: [
            "Document all incidents with dates and details",
            "Report to HR/Internal Complaints Committee",
            "File written complaint"
          ],
          longTermSteps: [
            "Seek legal representation",
            "Gather witness statements",
            "Maintain communication records"
          ]
        },
        mentalHealthSupport: {
          stressLevel: "Moderate",
          recommendedActions: [
            "Schedule counseling session",
            "Practice stress management techniques",
            "Join support group"
          ]
        },
        careerImpact: {
          recommendations: [
            "Document performance reviews",
            "Update professional network",
            "Research alternative opportunities"
          ]
        },
        documents: {
          templates: [
            "Workplace Harassment Complaint",
            "Legal Notice Draft",
            "Evidence Documentation Form"
          ]
        }
      };
      
      setResults(mockResults);
      navigate('results');
    }, 2000);
  };

  // Render location selection step
  const renderLocationStep = () => (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {selectedLanguage === 'en' 
          ? 'Select Your Jurisdiction' 
          : 'अपना क्षेत्राधिकार चुनें'}
      </h2>
      
      <div className="space-y-6">
        {/* Country selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {selectedLanguage === 'en' ? 'Country' : 'देश'}
          </label>
          <select
            value={jurisdiction.country}
            onChange={(e) => setJurisdiction({...jurisdiction, country: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select country</option>
            <option value="IN">India</option>
          </select>
        </div>

        {/* State selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {selectedLanguage === 'en' ? 'State' : 'राज्य'}
          </label>
          <select
            value={jurisdiction.state}
            onChange={(e) => setJurisdiction({...jurisdiction, state: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select state</option>
            <option value="DL">Delhi</option>
            <option value="MH">Maharashtra</option>
            <option value="KA">Karnataka</option>
          </select>
        </div>

        {/* District selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {selectedLanguage === 'en' ? 'District' : 'जिला'}
          </label>
          <select
            value={jurisdiction.district}
            onChange={(e) => setJurisdiction({...jurisdiction, district: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select district</option>
            <option value="central">Central</option>
            <option value="north">North</option>
            <option value="south">South</option>
          </select>
        </div>

        <Button
          onClick={() => setStep(2)}
          fullWidth
          disabled={!jurisdiction.country || !jurisdiction.state || !jurisdiction.district}
          size="lg"
          className="mt-4"
        >
          {selectedLanguage === 'en' ? 'Continue' : 'जारी रखें'}
        </Button>
      </div>
    </Card>
  );

  // Render consultation step
  const renderConsultationStep = () => (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {selectedLanguage === 'en' 
          ? 'Describe Your Legal Situation' 
          : 'अपनी कानूनी स्थिति का वर्णन करें'}
      </h2>
      
      <div className="space-y-6">
        {/* Text input */}
        <div>
          <textarea
            value={legalQuery}
            onChange={(e) => setLegalQuery(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={selectedLanguage === 'en' 
              ? "Describe your situation in detail..." 
              : "अपनी स्थिति का विस्तार से वर्णन करें..."
            }
          />
        </div>

        {/* Input options */}
        <div className="flex gap-4">
          <Button
            variant={isRecording ? "danger" : "secondary"}
            onClick={toggleRecording}
            className="flex items-center justify-center"
          >
            {isRecording ? <MicOff className="w-5 h-5 mr-2" /> : <Mic className="w-5 h-5 mr-2" />}
            {selectedLanguage === 'en' 
              ? (isRecording ? 'Stop Recording' : 'Start Recording')
              : (isRecording ? 'रिकॉर्डिंग बंद करें' : 'रिकॉर्डिंग शुरू करें')
            }
          </Button>
          
          <Button
            variant="secondary"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center"
          >
            <Upload className="w-5 h-5 mr-2" />
            {selectedLanguage === 'en' ? 'Upload Document' : 'दस्तावेज़ अपलोड करें'}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
        </div>

        {/* Emergency notice */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3" />
            <p className="text-sm text-red-800">
              {selectedLanguage === 'en'
                ? "If you're in immediate danger, please contact emergency services (112) or local police."
                : "यदि आप तत्काल खतरे में हैं, तो कृपया आपातकालीन सेवाओं (112) या स्थानीय पुलिस से संपर्क करें।"
              }
            </p>
          </div>
        </div>

        <Button
          onClick={() => setStep(3)}
          fullWidth
          disabled={!legalQuery.trim()}
          size="lg"
          className="mt-4"
        >
          {selectedLanguage === 'en' ? 'Continue' : 'जारी रखें'}
        </Button>
      </div>
    </Card>
  );

  // Render document generation step
  const renderDocumentStep = () => (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {selectedLanguage === 'en' 
          ? 'Generate Legal Documents' 
          : 'कानूनी दस्तावेज तैयार करें'}
      </h2>
      
      <div className="space-y-6">
        {/* Document preview */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedLanguage === 'en' ? 'Legal Notice Draft' : 'कानूनी नोटिस ड्राफ्ट'}
            </h3>
            <Button variant="secondary" className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              {selectedLanguage === 'en' ? 'Download' : 'डाउनलोड'}
            </Button>
          </div>
          
          <div className="prose max-w-none">
            {/* Document content preview */}
            <p className="text-gray-600">
              {selectedLanguage === 'en'
                ? "Based on your input, we've prepared a draft legal notice. Please review and modify as needed."
                : "आपके इनपुट के आधार पर, हमने एक मसौदा कानूनी नोटिस तैयार किया है। कृपया समीक्षा करें और आवश्यकतानुसार संशोधित करें।"
              }
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="secondary"
            className="flex items-center justify-center"
            onClick={() => setStep(2)}
          >
            {selectedLanguage === 'en' ? 'Back to Consultation' : 'परामर्श पर वापस जाएं'}
          </Button>
          
          <Button
            onClick={handleSubmit}
            className="flex items-center justify-center"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3" />
                {selectedLanguage === 'en' ? 'Processing...' : 'प्रोसेसिंग...'}
              </>
            ) : (
              selectedLanguage === 'en' ? 'Generate Final Report' : 'अंतिम रिपोर्ट तैयार करें'
            )}
          </Button>
        </div>
      </div>
    </Card>
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
              {selectedLanguage === 'en' ? 'Home' : 'होम'}
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
              {selectedLanguage === 'en' ? 'Dashboard' : 'डैशबोर्ड'}
            </button>
          </li>
          <li>
            <span className="mx-2">/</span>
          </li>
          <li className="font-medium text-gray-900">
            {selectedLanguage === 'en' ? 'Legal Assistant' : 'कानूनी सहायक'}
          </li>
        </ol>
      </nav>

      {/* Header section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {selectedLanguage === 'en' 
            ? 'Personal Legal Assistant' 
            : 'व्यक्तिगत कानूनी सहायक'}
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          {selectedLanguage === 'en'
            ? 'Confidential legal guidance tailored to your situation'
            : 'आपकी स्थिति के अनुरूप गोपनीय कानूनी मार्गदर्शन'
          }
        </p>
      </div>

      {/* Language and security indicators */}
      <div className="flex justify-center items-center space-x-6 mb-8">
        <button
          onClick={() => setSelectedLanguage(selectedLanguage === 'en' ? 'hi' : 'en')}
          className="flex items-center text-sm text-gray-600 hover:text-blue-600"
        >
          <Languages className="w-4 h-4 mr-2" />
          {selectedLanguage === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}
        </button>
        
        <div className="flex items-center text-sm text-gray-600">
          <Shield className="w-4 h-4 mr-2" />
          {selectedLanguage === 'en' 
            ? 'End-to-end encrypted' 
            : 'एंड-टू-एंड एन्क्रिप्टेड'
          }
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Globe2 className="w-4 h-4 mr-2" />
          {selectedLanguage === 'en' 
            ? 'Location-specific advice' 
            : 'स्थान-विशिष्ट सलाह'
          }
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mb-12 max-w-2xl mx-auto">
        <ProgressSteps steps={getSteps()} />
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto">
        {step === 1 && renderLocationStep()}
        {step === 2 && renderConsultationStep()}
        {step === 3 && renderDocumentStep()}
      </div>
    </div>
  );
};

export default LegalPage;