import React, { useState } from "react";
import Tooltip from "./Tooltip";
import { CssBaseline, Box } from "@mui/material";
import StageCompleteCard from "./StageCompleteTile";
import TutorialProgressTile from "./TutorialProgressTile";
import TutorialHeader from "./TutorialHeader";
import TooltipOverlay from "./TooltipOverlay";
import TestProgressTile from "./TestProgressTile";
import WalkthroughCompleteTile from "./WalkthroughCompleteTile";

// onActivte will handle the turning on and off of a tutorial
const Tutorial = ({ tut, onExit }) => {
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

  // change to const tutorial = tut; in the future
  const tutorial = [
    {
      stageName: "Basic Navigation",
      tooltips: [
        {
          type: "informative",
          targetElement: "#element0",
          targetAreaElement: "#element0",
          title: "Sidebar menu",
          content:
            "This is your side bar menu. From here, you can navigate to all the main pages in the application.\nYou can also access the application settings and your account details.",
        },
        {
          type: "informative",
          targetElement: "#element1",
          targetAreaElement: "#element1",
          title: "Feature 2",
          content: "This is the second feature of Stage 1.",
        },
        {
          type: "action",
          targetElement: "#element2",
          targetAreaElement: "#element2",
          title: "Feature 3",
          content: "Click on feature 2",
        },
        {
          type: "informative",
          targetElement: "#element2",
          targetAreaElement: "#element2",
          title: "Take a look",
          content: "Investigate all the search options by using this feature.",
        },
      ],
      test: {
        tasks: [
          {
            text: "Open the menu sidebar",
            clickElements: [
              {
                elementId: "#menu-sidebar",
                textInputElements: [],
              },
            ],
          },
          {
            text: "Navigate to the devices and dashboard page",
            clickElements: [
              {
                elementId: "#sidebar-devices-page",
                textInputElements: [],
              },
              {
                elementId: "#sidebar-dashboard-page",
                textInputElements: [],
              },
            ],
          },
          {
            text: "Create a new Mesh device with a MAC of 127:69:0:1",
            clickElements: [
              {
                elementId: "#create-device-button",
                textInputElements: [
                  {
                    elementId: "#mac-address-inputbox",
                    requiredInput: "127:69:0:1",
                  },
                  {
                    elementId: "#device-type-inputbox",
                    requiredInput: "Mesh type",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    {
      stageName: "Mapping Nodes",
      tooltips: [
        {
          type: "informative",
          targetElement: "#element4",
          targetAreaElement: "#element1",
          title: "Feature 4",
          content: "This is the first feature of Stage 2.",
        },
        {
          type: "informative",
          targetElement: "#element5",
          targetAreaElement: "#element2",
          title: "Feature 5",
          content: "This is the second feature of Stage 2.",
        },
      ],
    },
    {
      stageName: "Device Basics",
      tooltips: [
        {
          type: "informative",
          targetElement: "#element6",
          targetAreaElement: "#element2",
          title: "Feature 6",
          content: "This is the first feature of Stage 3.",
        },
        {
          type: "informative",
          targetElement: "#element7",
          targetAreaElement: "#element3",
          title: "Feature 7",
          content: "This is the second feature of Stage 3.",
        },
      ],
    },
    {
      stageName: "Deleting Devices",
      tooltips: [
        {
          type: "informative",
          targetElement: "#element8",
          targetAreaElement: "#element1",
          title: "Feature 8",
          content: "This is the first feature of Stage 4.",
        },
        {
          type: "informative",
          targetElement: "#element9",
          targetAreaElement: "#element3",
          title: "Feature 9",
          content: "This is the second feature of Stage 4.",
        },
      ],
    },
    {
      stageName: "Dealing with Alerts",
      tooltips: [
        {
          type: "informative",
          targetElement: "#element10",
          targetAreaElement: "#element4",
          title: "Feature 10",
          content: "This is the first feature of Stage 4.",
        },
        {
          type: "informative",
          targetElement: "#element11",
          targetAreaElement: "#element4",
          title: "Feature 11",
          content: "This is the second feature of Stage 4.",
        },
      ],
    },
    // Add more stages as needed
  ];

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
        setWalkthroughCompleteIntermission(true);
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
    const currentTasks = tutorial[currentStage].test.tasks;

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
    <Box overflow={"hidden"}>
      <CssBaseline />
      <TutorialHeader
        tutorialName={tutorialName}
        stages={tutorial.map((stage) => stage.stageName)}
        nextStageNo={currentStage + 1}
        onExit={handleExitTutorial}
        onRedoStage={handleRedoStage}
        onSkipStage={handleSkipStage}
      />

      <Box display="flex" justifyContent="center" alignItems="center">
        {stageCompleteIntermission1 && (
          <Box
            id="completion-screen-overlay"
            position="absolute"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            top="0"
            left="0"
            style={{ zIndex: 1007, backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            <StageCompleteCard
              stageNo={currentStage + 1}
              stageName={tutorial[currentStage].stageName}
              onContinue={handleStageContinue1}
            />
          </Box>
        )}
        {stageCompleteIntermission2 && (
          <Box
            id="completion-screen-overlay"
            position="absolute"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
            top="0"
            left="0"
            style={{ zIndex: 1007, backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            <TutorialProgressTile
              tutorialName={tutorialName}
              stages={tutorial.map((stage) => stage.stageName)}
              nextStageNo={currentStage + 1}
              onExit={handleExitTutorial}
              onContinue={handleStageContinue2}
              onRedoStage={handleRedoStage}
              onSkipStage={handleSkipStage}
            />
          </Box>
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
      </Box>
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
          taskNames={[
            "Open the menu sidebar",
            "Navigate to the devices page",
            "Navigate to the dashboard page",
            "Find Imhoff farm on the map",
            "Navigate to the alerts page",
          ]}
          currentTaskNo={currentTask}
          currentTask={tutorial[currentStage].test.tasks[currentTask]}
          onNext={nextTestStep}
          onExit={handleExitTutorial}
          onSkipTest={handleSkipTest}
        ></TestProgressTile>
      )}
      {walkthroughCompleteIntermission && (
        <Box
          id="completion-screen-overlay"
          position="absolute"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
          top="0"
          left="0"
          style={{ zIndex: 1007, backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          <WalkthroughCompleteTile
            stageNo={currentStage + 1}
            onTakeTest={handleTakeTest}
            onRedoWalkthrough={handleRedoWalkthrough}
            onSkip={handleSkipTest}
          ></WalkthroughCompleteTile>
        </Box>
      )}
    </Box>
  );
};

export default Tutorial;
