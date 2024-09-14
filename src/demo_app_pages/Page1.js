import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

const Page1 = () => {
  return (
    <Box id="page1" sx={{ height: "100%", width: "100%", overflow: "auto" }}>
      <Typography variant="h4" id="page1-title">
        Page 1
      </Typography>
      <Button variant="contained" id="button1">
        Button 1
      </Button>
      <TextField label="Input 1" variant="outlined" id="input1" />
      <Box sx={{ mt: 2 }}>
        <Typography id="text1">Some random text.</Typography>
      </Box>
    </Box>
  );
};

export default Page1;
