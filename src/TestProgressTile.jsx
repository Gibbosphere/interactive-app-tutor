import React, { useState, useLayoutEffect, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import FastForwardIcon from "@mui/icons-material/FastForward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import "./TestProgressTile.css";

const TestProgressTile = ({
  stageName,
  stageNo,
  taskNames,
  currentTaskNo,
  currentTask,
  onNext,
  onExit,
  onSkipTest,
}) => {
  const [confirmationPopupOpen, setConfirmationPopupOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [tileHeight, setTileHeight] = useState(0);
  const testProgressTileRef = useRef(null);

  const [clickElementNo, setClickElementNo] = useState(0);
  const clickElements = currentTask.clickElements; // the element objects that need to be clicked to complete the round

  useLayoutEffect(() => {
    if (!testProgressTileRef.current) {
      return;
    }

    const updateTileHeight = () => {
      setTileHeight(testProgressTileRef.current.offsetHeight);
    };
    updateTileHeight();
    window.addEventListener("resize", updateTileHeight);

    return () => {
      window.removeEventListener("resize", updateTileHeight);
    };
  }, [isExpanded, currentTaskNo]);

  useLayoutEffect(() => {
    const elementToClickObject = clickElements[clickElementNo]; // the current element (entire object) that needs to be clicked next in the task
    const targetElementToClick = document.querySelector(
      elementToClickObject.elementId
    ); // the actual DOM element
    const textInputElements = elementToClickObject.textInputElements;

    const handleClick = () => {
      // Check to see if every input element has the correct input
      for (const textInputElement of textInputElements) {
        const inputElement = document.querySelector(textInputElement.elementId);

        if (inputElement.value !== textInputElement.requiredInput) {
          console.log("Not all required text inputs are correct");
          return;
        }
      }

      // Move onto next element that needs to be clicked
      if (clickElementNo < clickElements.length - 1) {
        console.log("Moving to the next element that must be clicked");
        setClickElementNo((prevElementNo) => prevElementNo + 1);
      } else {
        // Move onto next task
        console.log("All click elements complete. Moving to next task");
        onNext();
      }
    };

    targetElementToClick.addEventListener("click", handleClick);

    return () => {
      targetElementToClick.removeEventListener("click", handleClick);
    };
  }, [currentTaskNo, clickElementNo]);

  const handleOpenConfirmationPopup = (action) => {
    setConfirmationAction(action); // waiting to see whether this action (exit, skip) will be confirmed
    setConfirmationPopupOpen(true);
  };

  const handleCloseConfirmationPopup = (confirmed) => {
    setConfirmationPopupOpen(false);
    if (confirmed && confirmationAction) {
      confirmationAction === "Exit"
        ? onExit()
        : confirmationAction === "Skip"
        ? onSkipTest()
        : console.log("nope");
    }
    setConfirmationAction(null);
  };

  const style = {
    position: "fixed",
    top: window.innerHeight - tileHeight,
    left: "60%",
    zIndex: 1000,
    width: "380px",
    boxShadow: "0 0 4px 2px rgba(63, 21, 177, 0.2)",
    borderBottomRightRadius: "0px",
    borderBottomLeftRadius: "0px",
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px",
    overflow: "hidden",
    transition: "opacity 0.0s ease-in-out",
  };

  const formattedTasks = taskNames.map((task, index) => {
    // let taskStyle = {};
    // if (index === currentTaskNo - 1) {
    //   taskStyle = {
    //     // the style that the animation starts with
    //   };
    // } else if (index === currentTaskNo) {
    //   taskStyle = {
    //     // the style that the animation starts with
    //   };
    // } else if (index < stageNo) {
    //   taskStyle = {
    //     // style all the tasks that have been completed already
    //   };
    // } else {
    //   taskStyle = {
    //     // style all the tasks still to be completed
    //   };
    // }

    return (
      <ListItem
        key={index}
        disableGutters
        sx={{ margin: "0 0", padding: "3.5px 0" }}
      >
        <ListItemIcon>
          {index < currentTaskNo ? (
            <CheckCircleIcon sx={{ color: "#4CAF50" }} />
          ) : (
            <RadioButtonUncheckedIcon
              className={index === currentTaskNo ? "change-color" : ""}
              sx={{ color: "#BDBDBD" }}
            />
          )}
        </ListItemIcon>
        <ListItemText
          sx={{ overflow: "hidden" }}
          primary={
            <Typography
              className={
                index === currentTaskNo - 1 ? "strike-through-animate-task" : ""
              }
              sx={{
                textDecoration:
                  index < currentTaskNo - 1 ? "line-through" : "none",
                color:
                  index < currentTaskNo ? "rgba(0, 0, 0, 0.54)" : "inherit",
              }}
            >
              {task}
            </Typography>
          }
        />
      </ListItem>
    );
  });

  return (
    <>
      {!isExpanded && (
        <Box
          id="test-progress-tile-reduced"
          ref={testProgressTileRef}
          style={style}
          elevation={3}
        >
          <Box
            id="header"
            color={"white"}
            backgroundColor={"#3F15B1"}
            padding={"8px"}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: "1rem",
                  fontWeight: "300",
                  marginBottom: 0,
                  paddingBottom: 0,
                }}
              >
                Next Task:
              </Typography>
              <IconButton
                onClick={() => setIsExpanded(true)}
                sx={{ color: "white", padding: 0, margin: 0 }}
                size="medium"
              >
                <ExpandLessIcon fontSize="medium" />
              </IconButton>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                marginBottom: "0px",
                lineHeight: "1.2rem",
              }}
            >
              {taskNames[currentTaskNo]}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 400,
                fontSize: "0.7rem",
                lineHeight: "0.7rem",
                marginBottom: "0px",
                paddingRight: "5px",
                width: "100%",
                textAlign: "right",
              }}
            >
              Stage {stageNo + 1}
            </Typography>
          </Box>
        </Box>
      )}

      {isExpanded && (
        <Box
          id="test-progress-tile-expanded"
          ref={testProgressTileRef}
          style={style}
          elevation={3}
        >
          <Box
            id="header"
            color={"white"}
            backgroundColor={"#3F15B1"}
            padding={"12px"}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: "400",
                  marginBottom: "0px",
                  paddingBottom: 0,
                }}
              >
                Stage {stageNo + 1} Test
              </Typography>
              <IconButton
                onClick={() => setIsExpanded(false)}
                sx={{
                  color: "white",
                  padding: 0,
                  margin: 0,
                }}
                size="medium"
              >
                <ExpandMoreIcon fontSize="medium" />
              </IconButton>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                marginBottom: "5px",
                fontSize: "1.25rem",
                lineHeight: "1.25rem",
                marginBottom: "10px",
              }}
            >
              {stageName}
            </Typography>
            <Box
              id="progress-bar-container"
              display={"flex"}
              alignItems={"center"}
            >
              <Box
                id="progress-bar-outer"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"left"}
                sx={{
                  backgroundColor: "white",
                  width: "85%",
                  height: "13px",
                  borderRadius: "10px",
                  padding: "0 2px",
                  margin: "0 10px 0 0",
                }}
              >
                <Box
                  id="progress-bar-inner"
                  className="progress-grow"
                  width={`calc(${
                    (currentTaskNo / taskNames.length) * 100
                  }% - 4px)`}
                  sx={{
                    backgroundColor: "green",
                    height: "80%",
                    borderRadius: "10px",
                    transformOrigin: "0% 50%",
                  }}
                ></Box>
              </Box>
              <Typography variant="body2">
                {(currentTaskNo / taskNames.length) * 100}%
              </Typography>
            </Box>
          </Box>
          <Box id="test-expanded-data" backgroundColor="#F2F2F2">
            <Box id="test-stages" padding={"8px 16px"} marginBottom={"0px"}>
              <List>{formattedTasks}</List>
            </Box>
            <Box
              id="bottom-buttons"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width={"95%"}
              margin={"auto"}
              marginBottom={"2px"}
            >
              <Button
                size="small"
                startIcon={<ExitToAppIcon fontSize="0.7rem" />}
                onClick={() => handleOpenConfirmationPopup("Exit")}
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
                Exit tutorial
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
                Skip test
              </Button>
            </Box>
          </Box>
        </Box>
      )}

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
                : "skip the test and move to the next stage in the tutorial?"}
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

export default TestProgressTile;
