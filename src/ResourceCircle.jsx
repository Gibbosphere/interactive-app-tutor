import {
  CssBaseline,
  Icon,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import { Box, display } from "@mui/system";
import React, { useLayoutEffect, useRef, useState } from "react";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from "@mui/icons-material/Help";
import CloseIcon from "@mui/icons-material/Close";
import InteractiveGuideCard from "./InteractiveGuideCard";

const ResourceCircle = ({ guides }) => {
  const circleSize = 60;
  const circlePos = { bottom: 20, right: 20 };
  const circleMenuHeight = circleSize * 0.85;
  const [circleMenuWidth, setCircleMenuWidth] = useState(500);
  const popupBoxHeight = 300;

  const [isOpen, setIsOpen] = useState(false);
  const [interactiveGuidesOpen, setInteractiveGuidesOpen] = useState(true);
  const [searchToolOpen, setSearchToolOpen] = useState(false);
  const [helpIconsOpen, setHelpIconsOpen] = useState(false);

  const circleMenuRef = useRef(null);

  const [helpIconsEnabled, setHelpIconsEnabled] = useState(false);
  const [guideActive, setGuideActive] = useState({
    active: false,
    guide: null,
  });

  const dummyData = [
    {
      name: "Getting Started",
      page: "dashboard",
      tooltips: [],
    },
    {
      name: "Navigation",
      page: "dashboard",
      tooltips: [],
    },
    {
      name: "Dealing with Devices",
      page: "devices",
      tooltips: [],
    },
  ];

  // to track progress of interactive guides - change to guides.map
  const interactiveGuides = dummyData.map((guide, index) => ({
    id: index,
    ...guide,
    progress: 0,
  }));

  const interactiveGuidesMenuDisplay = interactiveGuides.map((guide, index) => {
    return (
      <Box
        onClick={() => handleGuideClick(guide)}
        sx={{
          position: "relative",
          width: "100%",
          marginBottom: "15px",
        }}
      >
        <InteractiveGuideCard
          guideNo={index + 1}
          guideName={guide.name}
          progress={guide.progress}
        ></InteractiveGuideCard>
      </Box>
    );
  });

  // Get the width of the circle menu
  useLayoutEffect(() => {
    if (!circleMenuRef.current) {
      return;
    }

    const updateCircleMenuWidth = () => {
      setCircleMenuWidth(circleMenuRef.current.offsetWidth);
    };
    updateCircleMenuWidth();
    window.addEventListener("resize", updateCircleMenuWidth);

    return () => {
      window.removeEventListener("resize", updateCircleMenuWidth);
    };
  }, []);

  const handleCircleMenuClick = (menuItem) => {
    if (menuItem === "interactive-guides") {
      setInteractiveGuidesOpen(true);
      setSearchToolOpen(false);
      setHelpIconsOpen(false);
    } else if (menuItem === "search-tools") {
      setInteractiveGuidesOpen(false);
      setSearchToolOpen(true);
      setHelpIconsOpen(false);
    } else if (menuItem === "help-icons") {
      setInteractiveGuidesOpen(false);
      setSearchToolOpen(false);
      setHelpIconsOpen(true);
    }
  };

  const handleHelpIconChange = () => {
    setHelpIconsEnabled((prevValue) => !prevValue);
  };

  const handleGuideClick = (guide) => {
    //setIsOpen(false);
    setGuideActive({ active: true, guide: guide });
  };

  return (
    <Box
      zIndex={1000000000}
      sx={{
        position: "fixed",
      }}
    >
      <CssBaseline />
      {!guideActive.active && (
        <Box
          id="circle"
          zIndex={1000000003}
          onClick={() => setIsOpen(true)}
          sx={{
            position: "fixed",
            bottom: `${circlePos.bottom}px`,
            right: `${circlePos.right}px`,
            width: `${circleSize}px`,
            height: `${circleSize}px`,
            borderRadius: "50%",
            backgroundColor: "#3F15B1",
            cursor: "pointer",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
          <img></img>
          <Box
            id="circle-exit-overlay"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            sx={{
              position: "absolute",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "rgba(0, 0, 0, 0.45)",
              cursor: isOpen ? "pointer" : "none",
              pointerEvents: isOpen ? "all" : "none",
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.3s ease-out",
              color: "white",
              "&:hover": { color: "#d6d6d6" },
            }}
          >
            <CloseIcon
              sx={{
                padding: 0,
                margin: 0,
                transform: isOpen ? "rotate(0deg)" : "rotate(-45deg)",
                transition: "transform 0.3s ease-out",
              }}
            ></CloseIcon>
          </Box>
        </Box>
      )}
      {!guideActive.active && (
        <Box
          id="circle-menu-transparent-container"
          zIndex={1000000002}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "fixed",
            bottom: `${
              circlePos.bottom + (circleSize - circleMenuHeight) / 2
            }px`,
            right: circlePos.right + circleSize - circleMenuHeight / Math.PI,
            height: `${circleMenuHeight}px`,
            borderBottomLeftRadius: "100px",
            borderTopLeftRadius: "100px",
            padding: "0",
            backgroundColor: "transparent",
            pointerEvents: "none",
            overflow: "hidden",
            boxShadow: isOpen ? "0 4px 8px 0 rgba(0, 0, 0, 0.2)" : "none",
            transition: isOpen ? "box-shadow 0.25s 0.3s ease-out" : "none",
          }}
        >
          <Box
            id="circle-menu"
            ref={circleMenuRef}
            zIndex={1000000003}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "left",
              position: "relative",
              left: isOpen ? 0 : "100%",
              transition: "left 0.3s ease-out",
              height: `${circleMenuHeight}px`,
              borderBottomLeftRadius: "100px",
              borderTopLeftRadius: "100px",
              padding: `2px ${circleMenuHeight / Math.PI + 6}px 2px 2px`,
              backgroundColor: "white",
              pointerEvents: "all",
              overflow: "hidden",
            }}
          >
            <Box
              id="menu-item-interactive-guides-container"
              onClick={() => handleCircleMenuClick("interactive-guides")}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                padding: "0 12px",
                margin: "0 1px 0 0",
                backgroundColor: interactiveGuidesOpen
                  ? "#DFD6FA"
                  : "transparent",
                borderRadius: "100px",
                color: interactiveGuidesOpen ? "#3F15B1" : "#262626",
                border: interactiveGuidesOpen
                  ? "2px solid #3F15B1"
                  : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              <IconButton
                id="menu-item-interactive-guides"
                size="small"
                sx={{
                  color: interactiveGuidesOpen ? "#3F15B1" : "#262626",
                  "&:hover": {
                    backgroundColor: interactiveGuidesOpen ? "transparent" : "",
                  },
                }}
              >
                <ExploreIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box
              id="menu-item-search-tools-container"
              onClick={() => handleCircleMenuClick("search-tools")}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                padding: "0 12px",
                margin: "0 1px 0 1px",
                backgroundColor: searchToolOpen ? "#DFD6FA" : "transparent",
                borderRadius: "100px",
                color: searchToolOpen ? "#3F15B1" : "#262626",
                border: searchToolOpen
                  ? "2px solid #3F15B1"
                  : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              <IconButton
                id="menu-item-search-tools"
                size="small"
                sx={{
                  color: searchToolOpen ? "#3F15B1" : "#262626",
                  "&:hover": {
                    backgroundColor: searchToolOpen ? "transparent" : "",
                  },
                }}
              >
                <SearchIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box
              id="menu-item-help-icons-container"
              onClick={() => handleCircleMenuClick("help-icons")}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                padding: "0 12px",
                margin: "0 0 0 1px",
                backgroundColor: helpIconsOpen ? "#DFD6FA" : "transparent",
                borderRadius: "100px",
                color: helpIconsOpen ? "#3F15B1" : "#262626",
                border: helpIconsOpen
                  ? "2px solid #3F15B1"
                  : "2px solid transparent",
                cursor: "pointer",
              }}
            >
              <IconButton
                id="menu-item-help-icons"
                size="small"
                sx={{
                  color: helpIconsOpen ? "#3F15B1" : "#262626",
                  "&:hover": {
                    backgroundColor: helpIconsOpen ? "transparent" : "",
                  },
                }}
              >
                <HelpIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
      {!guideActive.active && (
        <Box
          id="popup-box-container"
          zIndex={1000000002}
          sx={{
            position: "fixed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bottom: isOpen
              ? `${circlePos.bottom + circleSize + 10}px`
              : `${circlePos.bottom + circleSize}px`,
            right: circlePos.right,
            height: `${popupBoxHeight}px`,
            width: circleMenuWidth + circleSize + 20,
            borderRadius: "10px",
            backgroundColor: "white",
            pointerEvents: isOpen ? "all" : "none",
            overflow: "hidden",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
            opacity: isOpen ? 1 : 0,
            transition: isOpen
              ? "bottom 0.25s 0.25s ease-out, opacity 0.25s 0.25s ease-out"
              : "none",
          }}
        >
          <Box
            id="popup-box-interactive-guides"
            sx={{
              position: interactiveGuidesOpen ? "relative" : "absolute",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "100%",
              width: "100%",
              borderRadius: "10px",
              padding: "18px",
              backgroundColor: "white",
              pointerEvents: interactiveGuidesOpen ? "all" : "none",
              opacity: interactiveGuidesOpen ? 1 : 0,
              transition: interactiveGuidesOpen
                ? "opacity 0.3s ease-out"
                : "none",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#220B61",
                fontSize: "1.1rem",
                fontWeight: "600",
                marginBottom: "5px",
              }}
            >
              Interactive Guides
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#7F7F7F",
                fontSize: "0.7rem",
                lineHeight: "1rem",
                marginBottom: "10px",
              }}
            >
              Learn how to use this application step by step
            </Typography>
            <Box
              id="interactive-guides-container"
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
                height: "100%",
                overflowY: "scroll",
                paddingRight: "5px",
                "&::-webkit-scrollbar": {
                  width: "5px", // width of the scrollbar
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "#f1f1f1", // track color
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#E1E3E7", // thumb color
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  backgroundColor: "#555", // thumb color on hover
                },
                "&::after": {
                  content: '""',
                  position: "absolute",
                  top: "0",
                  right: "-10px", // Move scrollbar outside the box
                  width: "10px",
                  height: "100%",
                  backgroundColor: "#f1f1f1",
                  borderRadius: "10px",
                  zIndex: 1,
                },
              }}
            >
              {interactiveGuidesMenuDisplay}
              {/* <InteractiveGuideCard></InteractiveGuideCard> */}
            </Box>
          </Box>
          <Box
            id="popup-box-search-tools"
            sx={{
              position: searchToolOpen ? "relative" : "absolute",
              height: "100%",
              width: "100%",
              borderRadius: "10px",
              padding: "18px",
              backgroundColor: "white",
              pointerEvents: searchToolOpen ? "all" : "none",
              opacity: searchToolOpen ? 1 : 0,
              transition: searchToolOpen ? "opacity 0.3s ease-out" : "none",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#220B61",
                fontSize: "1.1rem",
                fontWeight: "600",
                marginBottom: "5px",
              }}
            >
              Search Tools
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#7F7F7F", fontSize: "0.7rem", lineHeight: "1rem" }}
            >
              Search documentation and interactive guides
            </Typography>
          </Box>
          <Box
            id="popup-box-help-icons"
            sx={{
              position: helpIconsOpen ? "relative" : "absolute",
              height: "100%",
              width: "100%",
              borderRadius: "10px",
              padding: "18px",
              backgroundColor: "white",
              pointerEvents: helpIconsOpen ? "all" : "none",
              opacity: helpIconsOpen ? 1 : 0,
              transition: helpIconsOpen ? "opacity 0.3s ease-out" : "none",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#220B61",
                fontSize: "1.1rem",
                fontWeight: "600",
                marginBottom: "5px",
              }}
            >
              Help Icons
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#7F7F7F", fontSize: "0.7rem", lineHeight: "1rem" }}
            >
              Help icons provide details about different features and elements.
              Click on them for more information and insight into the
              application's functionality.
            </Typography>
            <Switch
              onChange={handleHelpIconChange}
              size="large"
              sx={{
                position: "absolute",
                bottom: 10,
                "& .Mui-checked": {
                  color: "#3F15B1", // switch thumb
                },
                "& .Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#3F15B1", // switch track
                },
              }}
            ></Switch>
          </Box>
        </Box>
      )}
      {guideActive.active && (
        <div
          onClick={() => setGuideActive(false)}
          style={{ position: "fixed", top: 200, left: 200 }}
        >
          Interactive guide baby
        </div>
      )}
    </Box>
  );
};

export default ResourceCircle;
