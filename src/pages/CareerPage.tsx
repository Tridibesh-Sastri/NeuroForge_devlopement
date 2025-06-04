import React, { useState } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { PageType } from '../App';

interface CareerPageProps {
  navigate: (page: PageType) => void;
  setResults: (results: any) => void;
}

// Career areas of interest
const areasOfInterest = [
  "Technology", "Healthcare", "Finance", "Education", 
  "Arts & Design", "Engineering", "Business", 
  "Science", "Social Work"
];

// Education levels
const educationLevels = [
  "High School", "Associate's Degree", "Bachelor's Degree", 
  "Master's Degree", "Doctorate", "Professional Certification"
];

const CareerPage: React.FC<CareerPageProps> = ({ navigate, setResults }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    academicGrade: '',
    educationLevel: '',
    interests: [] as string[],
    skills: '',
    careerGoals: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle checkbox changes
  const handleInterestChange = (interest: string) => {
    setFormData(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      
      return {
        ...prev,
        interests: newInterests
      };
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (
      !formData.fullName ||
      !formData.educationLevel ||
      formData.interests.length === 0 ||
      !formData.careerGoals
    ) {
      alert("Please fill out all required fields.");
      return;
    }
    
    // Show submitting state
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock result data
      const mockResults = {
        careerPaths: [
          {
            title: "UX/UI Designer",
            match: "92%",
            description: "Design user interfaces and experiences for web and mobile applications."
          },
          {
            title: "Frontend Developer",
            match: "87%",
            description: "Create interactive user interfaces using HTML, CSS, and JavaScript."
          },
          {
            title: "Creative Director",
            match: "79%",
            description: "Lead creative teams and oversee design projects from concept to completion."
          }
        ],
        videoUrl: "https://example.com/career-advice",
        nextSteps: [
          "Complete a UX/UI design certification",
          "Build a portfolio of design projects",
          "Network with professionals in the field",
          "Apply for entry-level positions or internships"
        ]
      };
      
      // Set results and navigate
      setResults(mockResults);
      navigate('results');
    }, 2000);
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
          <li className="font-medium text-gray-900">Career Guidance Assistant</li>
        </ol>
      </nav>

      {/* Main heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Career Guidance Assessment</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Complete the form below to receive personalized career recommendations and insights
        </p>
      </div>
      
      {/* Career Form */}
      <div className="max-w-3xl mx-auto">
        <Card className="p-8">
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-6">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            {/* Academic Grade */}
            <div className="mb-6">
              <label htmlFor="academicGrade" className="block text-sm font-medium text-gray-700 mb-1">
                Academic Grade/Percentage
              </label>
              <input
                type="text"
                id="academicGrade"
                name="academicGrade"
                value={formData.academicGrade}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., 3.8 GPA or 85%"
              />
            </div>
            
            {/* Education Level */}
            <div className="mb-6">
              <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700 mb-1">
                Education Level <span className="text-red-500">*</span>
              </label>
              <select
                id="educationLevel"
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select your education level</option>
                {educationLevels.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            {/* Areas of Interest */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Areas of Interest <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {areasOfInterest.map((interest) => (
                  <div key={interest} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`interest-${interest}`}
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestChange(interest)}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`interest-${interest}`} className="ml-2 text-gray-700">
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Skills & Strengths */}
            <div className="mb-6">
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
                Skills & Strengths
              </label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="List your key skills and strengths"
              />
            </div>
            
            {/* Career Goals */}
            <div className="mb-8">
              <label htmlFor="careerGoals" className="block text-sm font-medium text-gray-700 mb-1">
                Career Goals <span className="text-red-500">*</span>
              </label>
              <textarea
                id="careerGoals"
                name="careerGoals"
                value={formData.careerGoals}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe your career goals and aspirations"
                required
              />
            </div>
            
            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              gradientFrom="purple-400"
              gradientTo="pink-500"
              size="lg"
              fullWidth
              disabled={isSubmitting}
              className="flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                    <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Get Career Recommendations"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default CareerPage;