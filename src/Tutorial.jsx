import React, { useEffect, useState } from "react";
import Tooltip from "./Tooltip";
import { CssBaseline, Box } from "@mui/material";
import StageCompleteCard from "./StageCompleteTile";
import TutorialProgressTile from "./TutorialProgressTile";
import TutorialHeader from "./TutorialHeader";
import TooltipOverlay from "./TooltipOverlay";
import TestProgressTile from "./TestProgressTile";
import WalkthroughCompleteTile from "./WalkthroughCompleteTile";
import BasicBackgroundOverlay from "./BasicBackgroundOverlay";

// onActivte will handle the turning on and off of a tutorial
const Tutorial = ({ tutorialContent, onExit }) => {
  const tutorial = tutorialContent;
  const tutorialName = "iNethi Manager Tutorial";
  const [currentStage, setCurrentStage] = useState(0);

  const [walkthroughActive, setWalkthroughActive] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipChanging, setTooltipChanging] = useState(false);
  const [walkthroughCompleteIntermission, setWalkthroughCompleteIntermission] =
    useState(false);

  const [testActive, setTestActive] = useState(false);
  const [currentTask, setCurrentTask] = useState(0);
  const [taskChanging, setTaskChanging] = useState(false);

  const [stageCompleteIntermission1, setStageCompleteIntermission1] =
    useState(false);
  const [stageCompleteIntermission2, setStageCompleteIntermission2] =
    useState(false);

  const [scrollHeight, setScrollHeight] = useState(0); // used to fade component onto screen

  // Fade progress tile in smoothly
  useEffect(() => {
    const setHeight = () => {
      setScrollHeight(document.documentElement.scrollHeight);
    };

    setHeight();
    window.addEventListener("click", setHeight);
    return () => window.removeEventListener("click", setHeight);
  }, []);

  const nextStep = () => {
    const currentTooltips = tutorial[currentStage].tooltips;
    if (currentStep < currentTooltips.length - 1) {
      // Move to next tooltip
      setTooltipChanging(true);
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      if (currentStage < tutorial.length - 1) {
        // Stage complete - Move to test
        setWalkthroughActive(false);
        tutorial[currentStage].test.length > 0
          ? setWalkthroughCompleteIntermission(true)
          : setStageCompleteIntermission1(true);
      } else {
        // Tutorial completed
        console.log("Tutorial completed!");
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      // set timeout is delaying transition to next tooltip for effect
      setTimeout(() => {
        setCurrentStep((prevStep) => prevStep - 1);
      }, 500);
    }
    console.log("previous step called");
  };

  // helps to rerender tooltip for animating new tooltip appearing
  const handleTootlipChange = () => {
    setTimeout(() => {
      console.log("setting it back it to false");
      setTooltipChanging(false);
    }, 5);
  };

  const nextTestStep = () => {
    const currentTasks = tutorial[currentStage].test;

    if (currentTask < currentTasks.length - 1) {
      // All click elements complete - Move to next task
      setTaskChanging(true);
      setCurrentTask((prevTask) => prevTask + 1);
    } else {
      // Finished all tasks - Test and stage completed
      console.log("Test completed!");
      setTestActive(false);
      setStageCompleteIntermission1(true);
    }
  };

  // helps to rerender test progress tile for animating when a task is completed
  const handleTaskChange = () => {
    setTimeout(() => {
      console.log("setting it back it to false");
      setTaskChanging(false);
    }, 5);
  };

  const handleTakeTest = () => {
    setWalkthroughCompleteIntermission(false);
    setTestActive(true);
  };

  const handleRedoWalkthrough = () => {
    setWalkthroughCompleteIntermission(false);
    setCurrentStep(0);
    setWalkthroughActive(true);
  };

  const handleSkipTest = () => {
    setWalkthroughCompleteIntermission(false);
    setStageCompleteIntermission2(true);
  };

  const handleStageContinue2 = () => {
    setStageCompleteIntermission2(false);
    setCurrentStep(0);
    setCurrentStage((prevStage) => prevStage + 1);
    setWalkthroughActive(true);
  };

  const handleStageContinue1 = () => {
    setStageCompleteIntermission1(false);
    setStageCompleteIntermission2(true);
  };

  const handleExitTutorial = () => {
    setStageCompleteIntermission1(false);
    setStageCompleteIntermission2(false);
    setCurrentStep(0);
    setCurrentStage(0);
    setCurrentTask(0);
    setTestActive(false);
    onExit();
  };

  const handleRedoStage = () => {
    setStageCompleteIntermission2(false);
    setCurrentStep(0);
    setWalkthroughActive(true);
    // and then not updating the stage
  };

  const handleSkipStage = () => {
    setCurrentStage((prevStage) => prevStage + 1);
    setCurrentStep(0);
    // note tutorial progress tile is still showing
  };

  return (
    <Box
      zIndex={1000}
      sx={{
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100%",
        height: `${scrollHeight}px`,
        pointerEvents: "none",
      }}
      //overflow={"hidden"}
    >
      <CssBaseline />
      <TutorialHeader
        tutorialName={tutorialName}
        stages={tutorial.map((stage) => stage.stageName)}
        nextStageNo={currentStage + 1}
        onExit={handleExitTutorial}
        onRedoStage={handleRedoStage}
        onSkipStage={handleSkipStage}
      />
      {/* <Box display="flex" justifyContent="center" alignItems="center"> */}
      {stageCompleteIntermission1 && (
        <BasicBackgroundOverlay
          focusElement={
            <StageCompleteCard
              stageNo={currentStage + 1}
              stageName={tutorial[currentStage].stageName}
              onContinue={handleStageContinue1}
            />
          }
        ></BasicBackgroundOverlay>
      )}
      {stageCompleteIntermission2 && (
        <BasicBackgroundOverlay
          focusElement={
            <TutorialProgressTile
              tutorialName={tutorialName}
              stages={tutorial.map((stage) => stage.stageName)}
              nextStageNo={currentStage + 1}
              onExit={handleExitTutorial}
              onContinue={handleStageContinue2}
              onRedoStage={handleRedoStage}
              onSkipStage={handleSkipStage}
            />
          }
        ></BasicBackgroundOverlay>
      )}
      {tooltipChanging && (
        <>
          {
            handleTootlipChange() // rerender tooltip for animation sake
          }
          <TooltipOverlay
            targetAreaEl={
              tutorial[currentStage].tooltips[currentStep].targetAreaElement
            }
          ></TooltipOverlay>
        </>
      )}
      {!tooltipChanging && walkthroughActive && (
        <>
          <TooltipOverlay
            targetAreaEl={
              tutorial[currentStage].tooltips[currentStep].targetAreaElement
            }
          ></TooltipOverlay>
          <Tooltip
            type={tutorial[currentStage].tooltips[currentStep].type}
            targetEl={
              tutorial[currentStage].tooltips[currentStep].targetElement
            }
            targetAreaEl={
              tutorial[currentStage].tooltips[currentStep].targetAreaElement
            }
            title={tutorial[currentStage].tooltips[currentStep].title}
            content={tutorial[currentStage].tooltips[currentStep].content}
            canGoBack={currentStep !== 0}
            onNext={nextStep}
            onBack={prevStep}
            tooltipNo={currentStep + 1}
            totalTooltips={tutorial[currentStage].tooltips.length}
          />
        </>
      )}
      {/* </Box> */}
      {taskChanging && (
        <>
          {
            handleTaskChange() // rerender test progress tile for animation sake
          }
        </>
      )}
      {!taskChanging && testActive && (
        <TestProgressTile
          stageName={tutorial[currentStage].stageName}
          stageNo={currentStage}
          taskNames={tutorial[currentStage].test.map((task) => task.text)}
          currentTaskNo={currentTask}
          currentTask={tutorial[currentStage].test[currentTask]}
          onNext={nextTestStep}
          onExit={handleExitTutorial}
          onSkipTest={handleSkipTest}
        ></TestProgressTile>
      )}
      {walkthroughCompleteIntermission && (
        <BasicBackgroundOverlay
          focusElement={
            <WalkthroughCompleteTile
              stageNo={currentStage + 1}
              onTakeTest={handleTakeTest}
              onRedoWalkthrough={handleRedoWalkthrough}
              onSkip={handleSkipTest}
            ></WalkthroughCompleteTile>
          }
        ></BasicBackgroundOverlay>
      )}
    </Box>
  );
};

export default Tutorial;
