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
    </Box>
  );
};

export default Page2;
