import React from "react";
import { Box, Button, Typography, TextField } from "@mui/material";

const Page3 = () => {
  return (
    <Box id="page3" sx={{ height: "100%", width: "100%", overflow: "auto" }}>
      <Typography variant="h4" id="page3-title">
        Page 3
      </Typography>
      <Button variant="contained" id="button3">
        Button 3
      </Button>
      <TextField label="Input 3" variant="outlined" id="input3" />
      <Box sx={{ mt: 2 }}>
        <Typography id="text3">Even more random text.</Typography>
      </Box>
    </Box>
  );
};

export default Page3;
