import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

const Page2 = () => {
  return (
    <Box id="page2">
      <Typography variant="h4" id="page2-title">
        Page 2
      </Typography>
      <Button variant="contained" id="button2">
        Button 2
      </Button>
      <TextField label="Input 2" variant="outlined" id="input2" />
      <Box sx={{ mt: 2 }}>
        <Typography id="text2">Some more random text.</Typography>
      </Box>
      <Box p={2}>
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
        <Button id="create-device-button" mt={2} width={"20%"} backgroundColor={"grey"}>
          Create a new device
        </Button>
        <TextField id="mac-address-inputbox" label="Standard" variant="standard" />
        <TextField id="device-type-inputbox" label="Standard" variant="standard" />
      </Box>
      <Box sx={{ mt: 2, height: "400px", width: "400px", position: "relative" }}>
        <Typography id="textPoo">Some more random text.</Typography>
        <Box sx={{ mt: 2, height: "120px", width: "400px", overflow: "auto" }}>
          <Typography id="text2">Some more random text.</Typography>
          <Typography id="text2">Some more random text.</Typography>
          <Typography id="text2">Some more random text.</Typography>
          <Typography id="text2">Some more random text.</Typography>
          <Typography id="text2focus">Some more random text.</Typography>
          <Box sx={{ mt: 2, height: "80px", width: "250px", overflow: "auto" }}>
            <Typography id="text2">Some more random text.</Typography>
            <Typography id="text2">Some more random text.</Typography>
            <Typography id="text2">Some more random text.</Typography>
            <Typography id="text2">Some more random text.</Typography>
            <Typography id="text3focus">Some more random text.</Typography>
            <Typography id="text2">Some more random text.</Typography>
          </Box>
          <Typography id="text2">Some more random text.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Page2;
