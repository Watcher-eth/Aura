"use client";

import React, { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import ReviewStepOne from "./steps/ReviewStepOne";
import ReviewStepTwo from "./steps/ReviewStepTwo";
import { ReviewProvider } from "./context/ReviewContext";
import ReusableDialog from "../ReusableDialog";

interface ReviewModalProps {
  trigger: React.ReactNode;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ trigger }) => {
  const [open, setOpen] = useState(false);
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
    <ReviewProvider>
    <ReusableDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={trigger}
    >
      {renderStep()}
    </ReusableDialog>

   </ReviewProvider>

  );
};

export default ReviewModal;
