import React from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Brain, GraduationCap, Sparkles } from 'lucide-react';
import { PageType, AgentType } from '../App';

interface LandingPageProps {
  navigate: (page: PageType, agent?: AgentType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ navigate }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-16 md:py-24 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                AI Agent Hub
              </span>
            </h1>
            <p className="mt-3 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Your Personal AI Assistant Ecosystem
            </p>
            <p className="mt-5 max-w-2xl mx-auto text-gray-500 dark:text-gray-400 md:text-lg">
              Discover multi-modal AI services that help you understand yourself better,
              guide your career path, and support your well-being.
            </p>
            <div className="mt-8">
              <Button 
                size="lg" 
                onClick={() => navigate('dashboard')}
              >
                Explore AI Services
              </Button>
            </div>
          </div>
        </div>
        
        {/* Abstract background shapes */}
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-blue-400 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-400 opacity-10 blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">AI-Powered Services</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Intelligent solutions designed to enhance your personal and professional life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mental Health Card */}
            <Card hover className="p-8">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white mb-6">
                <Brain className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Mental Health Support</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Advanced AI analysis combining facial expression recognition and psychometric assessment to help monitor and improve your mental well-being.
              </p>
              <Button 
                variant="success" 
                gradientFrom="green-400" 
                gradientTo="blue-500"
                onClick={() => navigate('depression', 'depression')}
              >
                Try Mental Health Assistant
              </Button>
            </Card>

            {/* Career Guidance Card */}
            <Card hover className="p-8">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white mb-6">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Career Guidance</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                AI-powered career counseling with personalized recommendations, video insights, and the opportunity to connect with live mentors in your field.
              </p>
              <Button 
                variant="primary" 
                gradientFrom="purple-400" 
                gradientTo="pink-500"
                onClick={() => navigate('career', 'career')}
              >
                Get Career Guidance
              </Button>
            </Card>

            {/* Future Services Card */}
            <Card hover className="p-8">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white mb-6">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Future Services</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                More AI agents coming soon, including productivity coach, health & fitness assistant, and personalized learning companion.
              </p>
              <Button 
                variant="secondary"
                onClick={() => navigate('dashboard')}
              >
                Explore All Services
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore our AI assistant ecosystem and discover new ways to enhance your life with intelligent guidance.
          </p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={() => navigate('dashboard')}
          >
            View All AI Agents
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;