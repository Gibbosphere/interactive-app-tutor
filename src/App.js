import React, { useState } from "react";
import { Box, Button, CssBaseline, Container, Typography, TextField } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Tutorial from "./Tutorial";
import ResourceCircle from "./ResourceCircle";
import tutorialData from "./tutorialData/tutorialData";
import infoIconsData from "./tutorialData/infoIconsData";
import guidesData from "./tutorialData/interactiveGuidesData";

// onActivte will handle the turning on and off of a tutorial
const App = () => {
  const [tutorialActive, setTutorialActive] = useState(false);

  const handleExitTutorial = () => {
    setTutorialActive(false);
  };

  const [onOffTest, setOnOffTest] = useState(true);

  return (
    <>
      {/* {tutorialActive && <div style={{ height: "29.5px" }}></div>} */}
      <Router>
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box
            component="main"
            sx={{
              position: "relative",
              p: 3,
              marginLeft: "100px",
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
        {!tutorialActive && (
          <ResourceCircle
            positionX="right"
            positionY="bottom"
            guides={guidesData}
            infoIcons={infoIconsData}
          ></ResourceCircle>
        )}
        {tutorialActive && (
          <Tutorial
            tutorialName="CommuNethi"
            tutorialDescription="This interactive tutorial will walk you through the application, helping you to gain a clear understanding of how it works."
            tutorialContent={tutorialData}
            onExit={handleExitTutorial}
          ></Tutorial>
        )}
        {!tutorialActive && <Button onClick={() => setTutorialActive(true)}>Start Tutorial</Button>}
      </Router>
    </>
  );
};

export default App;
