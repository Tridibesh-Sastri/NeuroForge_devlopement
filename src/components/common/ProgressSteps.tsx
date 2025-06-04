import React from 'react';

interface Step {
  label: string;
  completed: boolean;
  current: boolean;
}

interface ProgressStepsProps {
  steps: Step[];
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ steps }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step circle */}
            <div className={`relative flex items-center justify-center w-10 h-10 rounded-full 
              ${step.completed ? 'bg-blue-600' : step.current ? 'bg-blue-500' : 'bg-gray-300'}
              text-white font-medium transition-colors duration-300`}
            >
              {index + 1}
              
              {/* Label below */}
              <div className="absolute top-12 -left-1/2 w-24 text-center text-sm text-gray-600">
                {step.label}
              </div>
            </div>
            
            {/* Connecting line */}
            {index < steps.length - 1 && (
              <div 
                className={`flex-1 h-1 mx-2 
                  ${steps[index].completed ? 'bg-blue-600' : 'bg-gray-300'}
                  transition-colors duration-300`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;