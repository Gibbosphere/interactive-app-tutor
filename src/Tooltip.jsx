import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Box, Button, Typography, Paper, IconButton } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Tooltip = ({
  type,
  targetEl,
  targetAreaEl,
  title,
  content,
  canGoBack,
  onNext,
  onBack,
  tooltipNo,
  totalTooltips,
}) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [tooltipArrowPosition, setTooltipArrowPosition] = useState({
    top: 0,
    left: 0,
  });
  const [targetAreaPos, setTargetAreaPos] = useState({
    left: "0",
    top: "0",
    width: "0",
    height: "0",
  });
  const [isVisible, setIsVisible] = useState(false); // used to fade component onto screen
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    const targetElement = document.querySelector(targetEl);
    const targetAreaElement = document.querySelector(targetAreaEl);

    if (!targetElement || !targetAreaElement || !tooltipRef.current) {
      return;
    }

    const handleAction = () => {
      if (type === "action") {
        onNext();
      }
    };

    if (type === "action") {
      targetElement.addEventListener("click", handleAction);
    }

    // Position the target area highlight
    const updateTargetAreaPosition = () => {
      setTargetAreaPos({
        left: targetAreaElement.offsetLeft,
        top: targetAreaElement.offsetTop,
        width: targetAreaElement.offsetWidth,
        height: targetAreaElement.offsetHeight,
      });
    };

    // Position the tooltip (and tooltip arrow)
    const updateTooltipPosition = () => {
      const tooltipWidth = 270;
      const offset = 20; // Offset from the target area
      const tooltipHeight = tooltipRef.current.offsetHeight;
      const arrowSize = 30;

      // Default tooltip positioning: right of the target area and vertically centered
      let top =
        targetAreaElement.offsetTop +
        targetAreaElement.offsetHeight / 2 -
        tooltipHeight / 2;
      let left =
        targetAreaElement.offsetLeft + targetAreaElement.offsetWidth + offset;

      // Default arrow positioning: pointing left, centered vertically
      let arrowTop = top + tooltipHeight / 2 - arrowSize / 2;
      let arrowLeft = left - arrowSize / 2;

      // Check if tooltip goes out of viewport on the right
      if (left + tooltipWidth > window.innerWidth) {
        left = targetAreaElement.offsetLeft - tooltipWidth - offset; // Reposition to the left of the target area
        arrowLeft = left + tooltipWidth - (arrowSize + arrowSize / 2); // Arrow pointing right
      }

      // Check if tooltip goes out of viewport on the left
      if (left < 0) {
        left =
          (2 * targetAreaElement.offsetLeft + targetAreaElement.offsetWidth) /
            2 -
          tooltipWidth / 2; // Adjust to fit within the viewport
        arrowLeft = left + tooltipWidth / 2 - arrowSize / 2; // Arrow centered horizontally

        top = targetAreaElement.offsetTop - tooltipHeight - offset; // If tooltip cannot fit on both the left and right, try it on top
        arrowTop = top + tooltipHeight - arrowSize / 2; // Arrow pointing down
      }

      // Check if tooltip goes out of viewport vertically above
      if (top < 0) {
        top =
          targetAreaElement.offsetTop + targetAreaElement.offsetHeight + offset; // Place tooltip on bottom
        arrowTop = top - arrowSize / 2; // Arrow pointing up
      }

      setTooltipPosition({ top, left });
      setTooltipArrowPosition({ top: arrowTop, left: arrowLeft });
    };

    updateTooltipPosition();
    window.addEventListener("resize", updateTooltipPosition);
    updateTargetAreaPosition();
    window.addEventListener("resize", updateTargetAreaPosition);

    return () => {
      if (type === "action") {
        targetElement.removeEventListener("click", handleAction);
      }
      window.removeEventListener("resize", updateTooltipPosition);
      window.removeEventListener("resize", updateTargetAreaPosition);
    };
  }, [targetEl, targetAreaEl, type, onNext, tooltipNo]);

  // Fade tooltip in smoothly
  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, [tooltipNo]);

  // Replace \n with <br> for line breaks
  const formattedContent = content.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  const tooltipWidth = 270;
  const targetAreaElement = document.querySelector(targetAreaEl);

  const tooltipStyle = {
    position: "absolute",
    top: tooltipPosition.top,
    left: tooltipPosition.left,
    zIndex: 1000,
    padding: "16px",
    width: tooltipWidth,
    boxShadow: "0 0 4px 2px rgba(63, 21, 177, 0.2)",
  };

  if (type === "informative") {
    return (
      <Box
        key={tooltipNo}
        sx={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        <Box
          id="tooltip-arrow"
          top={tooltipArrowPosition.top}
          left={tooltipArrowPosition.left}
          sx={{
            position: "absolute",
            width: 30,
            height: 30,
            backgroundColor: "#3F15B1",
            transform: "rotate(45deg)",
            boxShadow: "0 0 4px 2px rgba(63, 21, 177, 0.2)",
          }}
        ></Box>
        <Paper ref={tooltipRef} style={tooltipStyle} elevation={3}>
          <Typography sx={{ marginBottom: "6px" }} variant="h6">
            {title}
          </Typography>
          <Typography variant="body2" paragraph>
            {formattedContent}
          </Typography>
          <Box
            display="flex"
            justifyContent={canGoBack ? "space-between" : "flex-end"}
            alignItems="center"
          >
            {canGoBack && (
              <IconButton
                onClick={onBack}
                size="small"
                sx={{ color: "#3F15B1" }}
              >
                <ArrowBackIcon fontSize="small" />
              </IconButton>
            )}
            <Button
              variant="contained"
              size="small"
              endIcon={<ArrowForwardIcon fontSize="small" />}
              onClick={onNext}
              sx={{
                backgroundColor: "#3F15B1",
                "&:hover": { backgroundColor: "#31119F" },
              }}
            >
              {tooltipNo === totalTooltips ? "Finish" : "Next"}
            </Button>
          </Box>
          <Box
            id="tooltip-progress-container"
            width={tooltipWidth}
            sx={{
              margin: "6px 0px 0px",
              transform: "translateX(-16px)",
              position: "relative",
              padding: 0,
            }}
          >
            <Typography
              align="right"
              id="tooltip-progress-numbers"
              sx={{
                padding: "0 3px 0 0",
                margin: 0,
                fontSize: "10px",
                color: "#BFBFBF",
              }}
            >
              {tooltipNo}/{totalTooltips}
            </Typography>
            <Box
              id="tooltip-progressbar-container"
              width="100%"
              height="2.5px"
              sx={{
                margin: "2px 0px 0px",
                position: "relative",
                padding: 0,
                border: "none",
              }}
            >
              <Box
                id="tooltip-progressbar-background"
                height="100%"
                width="100%"
                sx={{
                  backgroundColor: "#E8E8E8",
                  position: "absolute",
                  padding: 0,
                  margin: 0,
                }}
              ></Box>
              <Box
                id="tooltip-progressbar"
                height="100%"
                width={`${(tooltipNo / totalTooltips) * 100}%`}
                sx={{
                  backgroundColor: "#3F15B1",
                  position: "absolute",
                  padding: 0,
                  margin: 0,
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              ></Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  } else if (type === "action") {
    return (
      <Box
        key={tooltipNo}
        sx={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.25s ease-in-out",
        }}
      >
        <Box
          id="tooltip-arrow"
          top={tooltipArrowPosition.top}
          left={tooltipArrowPosition.left}
          sx={{
            position: "absolute",
            width: 30,
            height: 30,
            backgroundColor: "#3F15B1",
            transform: "rotate(45deg)",
            boxShadow: "0 0 4px 2px rgba(63, 21, 177, 0.2)",
          }}
        ></Box>
        <Paper ref={tooltipRef} style={tooltipStyle} elevation={3}>
          <Typography
            variant="body2"
            fontSize={"1.3rem"}
            fontWeight={550}
            textAlign={"center"}
          >
            {formattedContent}
          </Typography>
          <Box
            id="tooltip-progress-container"
            width={tooltipWidth}
            sx={{
              margin: "0px 0px 0px",
              transform: "translateX(-16px)",
              position: "relative",
              padding: 0,
            }}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"end"}
            >
              {canGoBack && (
                <IconButton
                  onClick={onBack}
                  size="small"
                  sx={{
                    color: "#3F15B1",
                    padding: 0,
                    marginLeft: "2px",
                  }}
                >
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
              )}
              <Typography
                align="right"
                id="tooltip-progress-numbers"
                sx={{
                  padding: "0 3px 0 0",
                  margin: 0,
                  fontSize: "10px",
                  color: "#BFBFBF",
                }}
              >
                {tooltipNo}/{totalTooltips}
              </Typography>
            </Box>
            <Box
              id="tooltip-progressbar-container"
              width="100%"
              height="2.5px"
              sx={{
                margin: "2px 0px 0px",
                position: "relative",
                padding: 0,
                border: "none",
              }}
            >
              <Box
                id="tooltip-progressbar-background"
                height="100%"
                width="100%"
                sx={{
                  backgroundColor: "#E8E8E8",
                  position: "absolute",
                  padding: 0,
                  margin: 0,
                }}
              ></Box>
              <Box
                id="tooltip-progressbar"
                height="100%"
                width={`${(tooltipNo / totalTooltips) * 100}%`}
                sx={{
                  backgroundColor: "#3F15B1",
                  position: "absolute",
                  padding: 0,
                  margin: 0,
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              ></Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    );
  }
};

export default Tooltip;