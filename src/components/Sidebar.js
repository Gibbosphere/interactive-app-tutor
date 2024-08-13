import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Sidebar = () => {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <Box
      id="sidebar"
      sx={{
        width: open ? "200px" : "100px",
        bgcolor: "background.paper",
        position: "fixed",
        left: 0,
        top: 0,
        height: "100%",
        overflowX: "hidden",
        transition: "width 0.3s", // Adjust the duration as needed
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <IconButton onClick={toggleSidebar} sx={{ position: "absolute", top: 4, right: 50 }}>
        {open ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
      <List sx={{ overflowY: "scroll", position: "relative", height: "200px" }}>
        <ListItem component={Link} to="/page1" id="nav-page1">
          <ListItemText primary="Page 1" />
        </ListItem>
        <ListItem component={Link} to="/page2" id="nav-page2">
          <ListItemText primary="Page 2" />
        </ListItem>
        <ListItem component={Link} to="/page3" id="nav-page3">
          <ListItemText primary="Page 3" />
        </ListItem>
        <ListItem component={Link} to="/page3" id="nav-page4">
          <ListItemText primary="Page 4" />
        </ListItem>
        <ListItem component={Link} to="/page3" id="nav-page5">
          <ListItemText primary="Page 5" />
        </ListItem>
        <ListItem component={Link} to="/page3" id="nav-page6">
          <ListItemText primary="Page 6" />
        </ListItem>
        <ListItem component={Link} to="/page3" id="nav-page7">
          <ListItemText primary="Page 7" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
