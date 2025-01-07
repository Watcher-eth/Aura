// @ts-nocheck

"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getAddress } from "viem";
import ReviewStepOne from "./steps/ReviewStepOne";
import ReviewStepTwo from "./steps/ReviewStepTwo";
import { ReviewProvider } from "./context/ReviewContext";
import ReusableDialog from "../ReusableDialog";
import { Address } from "viem";
import { Review } from "~~/__generated__/graphql";

interface ReviewModalProps {
  trigger: React.ReactNode;
  name: string;
  address: Address;
  onReviewSubmitted?: (review: Review) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ trigger, name, address, onReviewSubmitted }) => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const contractAddress = params?.address ? getAddress(params.address as string) : address;

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (review: Review) => {
    if (onReviewSubmitted) {
      onReviewSubmitted(review);
    }
    setIsOpen(false);
    setStep(1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ReviewStepOne onNext={handleNext} address={contractAddress} />;
      case 2:
        return <ReviewStepTwo onBack={handleBack} onSubmit={handleSubmit} address={contractAddress} />;
      default:
        return null;
    }
  };

  if (!contractAddress) {
    console.error("No contract address available");
    return null;
  }

  return (
    <ReviewProvider>
      <ReusableDialog
        trigger={trigger}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={step === 1 ? "How was your experience?" : "Write a review"}
        onClose={() => {
          setIsOpen(false);
          setStep(1);
        }}
      >
        {renderStep()}
      </ReusableDialog>
    </ReviewProvider>
  );
};

export default ReviewModal;
