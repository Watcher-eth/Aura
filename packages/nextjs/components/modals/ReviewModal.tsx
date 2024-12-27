"use client"

import React, { useState } from 'react';
import ReusableDialog from '../ReusableDialog';
import ReviewStepOne from './steps/ReviewStepOne';
import ReviewStepTwo from './steps/ReviewStepTwo';

interface ReviewModalProps {
  trigger: React.ReactNode;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ trigger }) => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = () => {
    // Add your submission logic here
    setIsOpen(false);
    setStep(1); // Reset to first step
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ReviewStepOne onNext={handleNext} />;
      case 2:
        return <ReviewStepTwo onBack={handleBack} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <ReusableDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={trigger}
    >
      {renderStep()}
    </ReusableDialog>
  );
};

export default ReviewModal;
