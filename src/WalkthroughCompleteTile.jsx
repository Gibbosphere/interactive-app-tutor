import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import FastForwardIcon from "@mui/icons-material/FastForward";

const WalkthroughCompleteTile = ({
  stageNo,
  onTakeTest,
  onRedoWalkthrough,
  onSkip,
}) => {
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [isVisible, setIsVisible] = useState(false); // used to fade component onto screen

  // Fade progress tile in smoothly
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenConfirmationPopup = (action) => {
    setConfirmationAction(action); // waiting to see whether this action (redo or skip) will be confirmed
    setConfirmationPopupOpen(true);
  };

  const handleCloseConfirmationPopup = (confirmed) => {
    setConfirmationPopupOpen(false);
    if (confirmed && confirmationAction) {
      confirmationAction === "Skip" ? onSkip() : onRedoWalkthrough();
    }
    setConfirmationAction(null);
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          zIndex: 1000,
          pointerEvents: "all",
          width: "400px",
          padding: "16px",
          boxShadow: "0 0 4px 2px rgba(63, 21, 177, 0.2)",
          borderRadius: "5px",
          overflow: "hidden",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 2s ease-in-out",
          backgroundColor: "white",
        }}
      >
        <Typography
          variant="h7"
          sx={{
            display: "block",
            textAlign: "center",
            margin: "auto",
            marginBottom: "5px",
            color: "#3F15B1",
            fontSize: "1.1rem",
            fontWeight: 500,
          }}
        >
          You've completed the walkthrough !!
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.85rem",
            display: "block",
            textAlign: "center",
            margin: "auto",
            marginBottom: "18px",
            color: "#404040",
          }}
        >
          A test is ready for you to solidify the skills you've learned in the
          walkthrough.
        </Typography>

        <Button
          id="take-test-button"
          variant="contained"
          onClick={onTakeTest}
          sx={{
            display: "block",
            margin: "auto",
            marginBottom: "12px",
            fontSize: "1.1rem",
            lineHeight: "1.35rem",
            backgroundColor: "#3F15B1",
            "&:hover": { backgroundColor: "#31119F" },
            textTransform: "none",
          }}
        >
          Take the Stage {stageNo} Test
        </Button>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width={"100%"}
        >
          <Button
            size="small"
            startIcon={<ReplayIcon fontSize="0.6rem" />}
            onClick={() => handleOpenConfirmationPopup("Redo")}
            sx={{
              padding: 0,
              color: "#BFBFBF",
              fontSize: "0.625rem",
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
            Redo walkthrough
          </Button>
          <Button
            size="small"
            endIcon={<FastForwardIcon fontSize="0.6rem" />}
            onClick={() => handleOpenConfirmationPopup("Skip")}
            sx={{
              padding: 0,
              color: "#BFBFBF",
              fontSize: "0.625rem",
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
            Skip test
          </Button>
        </Box>
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
          style={{
            zIndex: 1007,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            pointerEvents: "all",
          }}
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
              {confirmationAction === "Skip"
                ? `skip the test and move to Stage ${stageNo + 1}?`
                : `redo the Stage ${stageNo} walkthrough?`}
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
    </>
  );
};

export default WalkthroughCompleteTile;
