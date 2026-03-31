import React from 'react';

interface StepperProps {
  steps: string[];
  currentStep: number;
  onStepChange?: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepChange }: StepperProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center flex-1">
              <button
                onClick={() => onStepChange?.(idx)}
                className={`w-10 h-10 rounded-full border-2 font-semibold transition-all ${
                  idx < currentStep
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : idx === currentStep
                    ? 'border-neutral-900 text-neutral-900 bg-white'
                    : 'border-neutral-200 text-neutral-400'
                }`}
              >
                {idx < currentStep ? '✓' : idx + 1}
              </button>
              <p className="text-xs text-neutral-600 mt-2 text-center">{step}</p>
            </div>
            {idx < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mb-6 ${
                  idx < currentStep ? 'bg-neutral-900' : 'bg-neutral-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
