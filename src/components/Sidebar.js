import React from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box sx={{ width: 200, bgcolor: "background.paper" }} id="sidebar">
      <List>
        <ListItem component={Link} to="/page1" id="nav-page1">
          <ListItemText primary="Page 1" />
        </ListItem>
        <ListItem component={Link} to="/page2" id="nav-page2">
          <ListItemText primary="Page 2" />
        </ListItem>
        <ListItem component={Link} to="/page3" id="nav-page3">
          <ListItemText primary="Page 3" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
