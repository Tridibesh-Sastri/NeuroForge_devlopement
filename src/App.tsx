import React, { useState } from 'react';
import { Layout } from './components/common/Layout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import DepressionPage from './pages/DepressionPage';
import CareerPage from './pages/CareerPage';
import ResultsPage from './pages/ResultsPage';
import MentorCallPage from './pages/MentorCallPage';

// App state types
export type PageType = 'landing' | 'dashboard' | 'depression' | 'career' | 'results' | 'mentor-call';
export type AgentType = 'depression' | 'career' | null;

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [selectedAgent, setSelectedAgent] = useState<AgentType>(null);
  const [step, setStep] = useState(1);
  const [results, setResults] = useState<any>(null);

  // Navigation handler
  const navigate = (page: PageType, agent: AgentType = null) => {
    setCurrentPage(page);
    if (agent !== undefined) {
      setSelectedAgent(agent);
    }
    // Reset step when navigating to a new page
    if (page !== 'depression' && page !== 'career') {
      setStep(1);
    }
  };

  // Render the appropriate page based on current state
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage navigate={navigate} />;
      case 'dashboard':
        return <DashboardPage navigate={navigate} />;
      case 'depression':
        return (
          <DepressionPage 
            navigate={navigate} 
            step={step} 
            setStep={setStep} 
            setResults={setResults} 
          />
        );
      case 'career':
        return (
          <CareerPage 
            navigate={navigate} 
            setResults={setResults} 
          />
        );
      case 'results':
        return (
          <ResultsPage 
            navigate={navigate} 
            selectedAgent={selectedAgent}
            results={results} 
          />
        );
      case 'mentor-call':
        return <MentorCallPage navigate={navigate} />;
      default:
        return <LandingPage navigate={navigate} />;
    }
  };

  return (
    <Layout navigate={navigate} currentPage={currentPage}>
      {renderPage()}
    </Layout>
  );
}

export default App;