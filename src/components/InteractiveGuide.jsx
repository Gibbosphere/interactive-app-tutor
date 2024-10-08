import React, { useState } from "react";
import Tooltip from "./Tooltip";
import { BrowserRouter as Router, useNavigate, useLocation } from "react-router-dom";

const InteractiveGuide = ({ guide, onExit, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { pathname: currentPath } = useLocation(); // Destructure pathname from useLocation

  const navigateToPage = (targetPage) => {
    if (navigate) {
      // Only navigate if the target page is different from the current path
      if (currentPath !== targetPage) {
        navigate(targetPage);
      }
    } else {
      console.warn(
        "Navigate function is not available. Are you sure you wrapped your <Tutorial> component in a <Router> component?",
      );
    }
  };

  const nextStep = () => {
    const tooltips = guide.tooltips;
    if (currentStep < tooltips.length - 1) {
      // Move to next tooltip
      navigateToPage(guide.tooltips[currentStep + 1].page);
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      // Guide completed
      console.log("Guide completed!");
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      navigateToPage(guide.tooltips[currentStep - 1].page);
      setCurrentStep((prevStep) => prevStep - 1);
    }
    console.log("previous step called");
  };

  return (
    <Tooltip
      type={guide.tooltips[currentStep].type}
      targetEl={guide.tooltips[currentStep].target_element_id}
      targetAreaEl={guide.tooltips[currentStep].target_area_element_id}
      title={guide.tooltips[currentStep].title}
      content={guide.tooltips[currentStep].content}
      onNext={nextStep}
      canGoBack={currentStep !== 0}
      onBack={prevStep}
      canExit={true}
      onExit={onExit}
      tooltipNo={currentStep + 1}
      totalTooltips={guide.tooltips.length}
    />
  );
};

export default InteractiveGuide;
