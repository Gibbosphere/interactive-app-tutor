import React, { useState, useEffect } from "react";
import { Box, Button, CssBaseline, Container, Typography, TextField } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Tutorial from "./Tutorial";
import ResourceCircle from "./ResourceCircle";
import Documentation from "./Documentation";
import { usePersistantState } from "./hooks";
import axios from "axios";
import InteractiveAppTutor from "./InteractiveAppTutor";

// onActivte will handle the turning on and off of a tutorial
const App = () => {
  const [tutorialActive, setTutorialActive] = React.useState(false);
  const [documentationOpen, setDocumentationOpen] = React.useState(false);
  const [documentationSideToolEnabled, setDocumentationSideToolEnabled] = React.useState(true);
  const [resourceCircleEnabled, setResourceCircleEnabled] = React.useState(true);
  const [resourceCirclePos, setResourceCirclePos] = usePersistantState("resourceCirclePosition", {
    positionY: "bottom",
    positionX: "right",
  });

  let resourceCircleInNavbar =
    resourceCirclePos.positionY === "top" && resourceCirclePos.positionX === "right";

  const toggleDocumentationOpen = () => {
    setDocumentationOpen(!documentationOpen);
  };

  const handleExitTutorial = () => {
    setTutorialActive(false);
  };

  // API calls - should not have to be done in App.js, but rather in one big InteractiveAppTutor component
  const [tutorialData, setTutorialData] = useState([]);
  const [infoIconsData, setInfoIconsData] = useState([]);
  const [guidesData, setGuidesData] = useState([]);
  const [documentationData, setDocumentationData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8085/api/tutorial/")
      .then((response) => {
        setTutorialData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tutorial data!", error);
      });

    axios
      .get("http://127.0.0.1:8085/api/info-icons/")
      .then((response) => {
        setInfoIconsData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the info icons data!", error);
      });

    axios
      .get("http://127.0.0.1:8085/api/interactive-guides/")
      .then((response) => {
        setGuidesData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the interactive guides!", error);
      });

    axios
      .get("http://127.0.0.1:8085/api/documentation/")
      .then((response) => {
        setDocumentationData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the documentation!", error);
      });
  }, []);

  return (
    <>
      <Router>
        <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              position: "relative",
              p: 3,
              transition: "margin-left 0.3s", // Matches the sidebar transition
            }}
          >
            <Container>
              <Routes>
                <Route path="/page1" element={<Page1 />} />
                <Route path="/page2" element={<Page2 />} />
                <Route path="/page3" element={<Page3 />} />
              </Routes>
            </Container>
            {!tutorialActive && (
              <Button id="start-tutorial-button" onClick={() => setTutorialActive(true)}>
                Start Tutorial
              </Button>
            )}
          </Box>
        </Box>
        {/* <Box p={2}>
        <Typography id="element0" variant="h4">
          My Application
        </Typography>
        <Box id="element1" mt={3} p={2} border={1}>
          Feature 1
        </Box>
        <Box id="element2" mt={3} p={2} border={1}>
          Feature 2
        </Box>
        <Box id="element3" mt={2} p={2} border={1}>
          Feature 3
        </Box>
        <Box id="element4" mt={2} p={2} border={1}>
          Feature 4
        </Box>
        <Box id="menu-sidebar" mt={2} width={"20%"} border={1}>
          Side bar menu
        </Box>
        <Box id="sidebar-devices-page" mt={2} width={"20%"} border={1}>
          Devices page
        </Box>
        <Box id="sidebar-dashboard-page" mt={2} width={"20%"} border={1}>
          Dashboard page
        </Box>
        <Button
          id="create-device-button"
          mt={2}
          width={"20%"}
          backgroundColor={"grey"}
        >
          Create a new device
        </Button>
        <TextField
          id="mac-address-inputbox"
          label="Standard"
          variant="standard"
        />
        <TextField
          id="device-type-inputbox"
          label="Standard"
          variant="standard"
        />
      </Box>

      <Button
        id="el-move-test-button"
        onClick={() => setOnOffTest((prev) => !prev)}
        sx={{
          display: onOffTest ? "block" : "",
          position: "relative",
          marginLeft: "auto",
        }}
      >
        Testing when elements moved
      </Button>

      {onOffTest && (
        <Button
          id="el-remove-replace-test-button"
          onClick={() => setOnOffTest((prev) => !prev)}
        >
          Testing element removal and immediate replacement
        </Button>
      )}
      {!onOffTest && (
        <Button
          id="el-remove-replace-test-button"
          onClick={() => setOnOffTest((prev) => !prev)}
          sx={{ display: "block", position: "relative", marginLeft: "auto" }}
        >
          Testing element removal and immediate replacement
        </Button>
      )}

      {onOffTest && (
        <Button
          id="el-remove-test-button"
          onClick={() => setOnOffTest((prev) => !prev)}
          sx={{
            display: onOffTest ? "block" : "",
            position: "relative",
            marginLeft: "auto",
          }}
        >
          Testing when elements removed
        </Button>
      )}

      <Box id="element5" mt={2} p={2} border={1}>
        Feature 5
      </Box>
      <Box id="element6" mt={2} p={2} border={1}>
        Feature 6
      </Box>
      <Box id="element7" mt={2} p={2} border={1}>
        Feature 7
      </Box>
      <Box id="element8" mt={2} p={2} border={1}>
        Feature 8
      </Box> */}
        <InteractiveAppTutor
          tutorialActive={tutorialActive}
          exitTutorial={() => setTutorialActive(false)}
          tutorialLogoSrc="/images/iNethiLogoWhite.png"
          documentationOpen={documentationOpen}
          toggleDocumentationOpen={toggleDocumentationOpen}
          documentationSideToolEnabled={documentationSideToolEnabled}
          resourceCircleEnabled={resourceCircleEnabled}
          resourceCircleIconSrc="/images/iNethiLogoWhite.png"
          resourceCirclePos={resourceCirclePos}
          resourceCircleSize={resourceCircleInNavbar ? 55 : 60}
          resourceCircleDistFromOuter={resourceCircleInNavbar ? 5 : 20}
          resourceCircleBorder={resourceCircleInNavbar ? "2px solid white" : "none"}
          openDocumentation={() => setDocumentationOpen(true)}
        />
        {/* {tutorialActive && (
          <Tutorial
            logoSrc={"/images/iNethiLogoWhite.png"}
            tutorialContent={tutorialData}
            onExit={handleExitTutorial}
          ></Tutorial>
        )}
        <Documentation
          documentationData={documentationData}
          isOpen={documentationOpen}
          toggleIsOpen={toggleDocumentationOpen}
          canSlideOut={documentationSideToolEnabled}
        ></Documentation>
        {!tutorialActive && resourceCircleEnabled && (
          <ResourceCircle
            circleIconName={"/images/iNethiLogoWhite.png"}
            positionY={resourceCirclePos.positionY}
            positionX={resourceCirclePos.positionX}
            circleSize={resourceCircleInNavbar ? 55 : 60}
            circleDistFromOuter={resourceCircleInNavbar ? 5 : 20}
            circleBorder={resourceCircleInNavbar ? "2px solid white" : "none"}
            guides={guidesData}
            infoIcons={infoIconsData}
            documentationData={documentationData}
            openDocumentation={() => setDocumentationOpen(true)}
          ></ResourceCircle>
        )} */}
      </Router>
    </>
  );
};

export default App;
