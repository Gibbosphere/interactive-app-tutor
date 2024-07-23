import React, { useState } from "react";
import Tutorial from "./Tutorial";
import { Box, Button, Typography, TextField } from "@mui/material";

// onActivte will handle the turning on and off of a tutorial
const App = () => {
  const [tutorialActive, setTutorialActive] = useState(false);

  const handleExitTutorial = () => {
    setTutorialActive(false);
  };

  return (
    <>
      {tutorialActive && <Tutorial onExit={handleExitTutorial}></Tutorial>}
      {!tutorialActive && (
        <Button onClick={() => setTutorialActive(true)}>Start Tutorial</Button>
      )}
      <Box p={2}>
        <Typography id="element0" variant="h4">
          My Application
        </Typography>
        <Box id="element1" mt={2} p={2} border={1}>
          Feature 1
        </Box>
        <Box id="element2" mt={2} p={2} border={1}>
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
    </>
  );
};

export default App;
