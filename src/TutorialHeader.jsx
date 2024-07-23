import React, { useState, useRef, useLayoutEffect } from "react";
import { Typography, IconButton, Paper, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import ReplayIcon from "@mui/icons-material/Replay";
import FastForwardIcon from "@mui/icons-material/FastForward";
import { Box, fontSize, maxWidth, padding, width } from "@mui/system";
import "./TutorialHeader.css";

const TutorialHeader = ({
  tutorialName,
  stages,
  nextStageNo,
  onExit,
  onRedoStage,
  onSkipStage,
}) => {
  const [isOpen, setIsOpen] = useState(null);
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const dropDownWidth = 400;

  const handleMenuOpen = () => {
    setIsOpen(true);
  };

  const handleMenuClose = () => {
    setIsOpen(false);
  };

  const handleOpenConfirmationPopup = (action) => {
    setConfirmationAction(action); // waiting to see whether this action (exit, redo, or skip) will be confirmed
    setConfirmationPopupOpen(true);
  };

  const handleCloseConfirmationPopup = (confirmed) => {
    setConfirmationPopupOpen(false);
    if (confirmed && confirmationAction) {
      confirmationAction === "Exit"
        ? onExit()
        : confirmationAction === "Redo"
        ? onRedoStage()
        : onSkipStage();
    }
    setConfirmationAction(null);
  };

  const dropDownStyle = {
    zIndex: 1001,
    width: dropDownWidth,
    boxShadow: "0 0 4px 2px rgba(63, 21, 177, 0.2)",
    borderBottomRightRadius: "5px",
    borderBottomLeftRadius: "5px",
    borderTopRightRadius: "0px",
    borderTopLeftRadius: "0px",
    overflow: "hidden",
  };

  const formattedStages = stages.map((stage, index) => {
    let stageStyle = {};
    if (index === nextStageNo) {
      stageStyle = {
        color: "green",
        fontSize: "1.6rem",
        backgroundColor: "#F1EDFD",
        width: "80%",
        textAlign: "center",
        borderRadius: "25px",
        margin: "7px 0",
      };
    } else if (index < nextStageNo) {
      stageStyle = {
        color: "#B4E5A2",
        textDecoration: "line-through",
        fontSize: "0.9rem",
        margin: "4.5px 0",
      };
    } else {
      stageStyle = { color: "#7F7F7F", fontSize: "0.9rem", margin: "4.5px 0" };
    }
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        key={stage}
      >
        <Typography
          variant="body2"
          style={stageStyle}
          fontWeight={"550"}
          height={"100%"}
        >
          {stage}
        </Typography>
      </Box>
    );
  });

  return (
    <Box>
      <Box
        id="tutorial-bar"
        position="relative"
        zIndex={1006}
        width={"100%"}
        sx={{
          color: "white",
          backgroundColor: "#3F15B1",
          padding: "3px 0 3px 10px",
        }}
      >
        <Box
          display="flex"
          justifyContent="left"
          alignItems="center"
          height={"100%"}
          width={"100%"}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={isOpen ? handleMenuClose : handleMenuOpen}
            disableRipple
            sx={{ padding: "0 0 0 10px" }}
          >
            {isOpen ? (
              <CloseIcon fontSize="small" />
            ) : (
              <MenuIcon fontSize="small" />
            )}
          </IconButton>
          <Typography
            variant="h8"
            sx={{
              // flexGrow: 1,
              marginLeft: 2,
              padding: "2.7px 0",
              fontSize: "0.75rem",
            }}
          >
            {tutorialName}
          </Typography>
          {isOpen && (
            <Button
              //variant="contained"
              size="small"
              height={"100%"}
              width="10px"
              endIcon={<ExitToAppIcon />}
              onClick={() => handleOpenConfirmationPopup("Exit")}
              sx={{
                fontSize: "0.7rem",
                color: "white",
                backgroundColor: "transparent",
                "&:hover": {
                  color: "#858585",
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none",
                },
                border: "none",
                boxShadow: "none",
                textTransform: "none",
                padding: "0px 10px 0px 125px",
              }}
            >
              Exit Tutorial
            </Button>
          )}
        </Box>
      </Box>
      <Box
        position={"absolute"}
        zIndex={1005}
        className={isOpen ? "menu-slide-down" : "menu-slide-up"}
      >
        <Paper style={dropDownStyle} elevation={3}>
          <Box padding={"16px"} marginBottom={"2px"}>
            {formattedStages}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            marginBottom="3px"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width={"95%"}
            >
              <Button
                size="small"
                startIcon={<ReplayIcon fontSize="0.7rem" />}
                onClick={() => handleOpenConfirmationPopup("Redo")}
                sx={{
                  color: "#BFBFBF",
                  fontSize: "0.7rem",
                  backgroundColor: "transparent",
                  "&:hover": {
                    color: "#858585",
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none",
                  },
                  border: "none",
                  boxShadow: "none",
                  textTransform: "none",
                }}
              >
                Redo stage
              </Button>
              <Button
                size="small"
                endIcon={<FastForwardIcon fontSize="0.7rem" />}
                onClick={() => handleOpenConfirmationPopup("Skip")}
                sx={{
                  color: "#BFBFBF",
                  fontSize: "0.7rem",
                  backgroundColor: "transparent",
                  "&:hover": {
                    color: "#858585",
                    backgroundColor: "transparent",
                    border: "none",
                    boxShadow: "none",
                  },
                  border: "none",
                  boxShadow: "none",
                  textTransform: "none",
                }}
              >
                Skip stage
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
      {/* Confirmation Popup */}
      {confirmationPopupOpen && (
        <Box
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
          <Box
            className="confirmation-container"
            backgroundColor="white"
            padding={"12px 18px"}
            borderRadius={"3px"}
          >
            <Typography variant="h6">Confirm {confirmationAction}</Typography>
            <Typography variant="body1" style={{ marginTop: "10px" }}>
              Are you sure you want to{" "}
              {confirmationAction === "Exit"
                ? "exit the tutorial?"
                : confirmationAction.toLowerCase() + " Stage "}{" "}
              {confirmationAction === "Skip"
                ? nextStageNo + 1
                : confirmationAction === "Skip"
                ? nextStageNo
                : ""}
            </Typography>
            <Box
              className="conformation-popup-actions"
              display="flex"
              justifyContent="flex-end"
              marginTop="20px"
            >
              <Button
                onClick={() => handleCloseConfirmationPopup(false)}
                color="primary"
                sx={{ padding: 0, marginRight: "20px" }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleCloseConfirmationPopup(true)}
                color="primary"
                sx={{ padding: 0 }}
              >
                Confirm
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TutorialHeader;
