import {
  CssBaseline,
  Icon,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ExploreIcon from "@mui/icons-material/Explore";
import SearchIcon from "@mui/icons-material/Search";
import HelpIcon from "@mui/icons-material/Help";
import CloseIcon from "@mui/icons-material/Close";
import InteractiveGuideCard from "./InteractiveGuideCard";
import InteractiveGuide from "./InteractiveGuide";
import InfoIcon from "./InfoIcon";
import {
  BrowserRouter as Router,
  useNavigate,
  useLocation,
} from "react-router-dom";

const ResourceCircle = ({ guides, infoIcons }) => {
  const circleSize = 60;
  const circlePos = { bottom: 20, right: 20 };
  const circleMenuHeight = circleSize * 0.85;
  const [circleMenuWidth, setCircleMenuWidth] = useState(500);
  const popupBoxHeight = 300;

  const [isOpen, setIsOpen] = useState(false);
  const [interactiveGuidesMenuOpen, setInteractiveGuidesMenuOpen] =
    useState(true);
  const [searchToolMenuOpen, setSearchToolMenuOpen] = useState(false);
  const [helpIconsMenuOpen, setHelpIconsMenuOpen] = useState(false);

  const circleMenuRef = useRef(null);

  const [helpIconsEnabled, setHelpIconsEnabled] = useState(false);
  const [guideActive, setGuideActive] = useState({
    active: false,
    guide: null,
  });

  // const navigate = useNavigate();
  const { pathname: currentPath } = useLocation(); // Destructure pathname from useLocation

  const [scrollHeight, setScrollHeight] = useState(
    document.documentElement.scrollHeight
  );
  const [scrollWidth, setScrollWidth] = useState(
    document.documentElement.scrollHeight
  );

  // Get height and width of entire page (including scroll)
  useEffect(() => {
    const setPageDimensions = () => {
      setScrollHeight(document.documentElement.scrollHeight);
      setScrollWidth(document.documentElement.scrollWidth);
    };
    setPageDimensions();

    window.addEventListener("click", setPageDimensions);
    window.addEventListener("resize", setPageDimensions);

    return () => {
      window.removeEventListener("click", setPageDimensions);
      window.removeEventListener("resize", setPageDimensions);
    };
  }, []);

  // const dummyData = [
  //   {
  //     name: "Getting Started",
  //     page: "dashboard",
  //     tooltips: [
  //       {
  //         type: "informative",
  //         targetElement: "#element0",
  //         targetAreaElement: "#element0",
  //         title: "Sidebar menu",
  //         content:
  //           "This is your side bar menu. From here, you can navigate to all the main pages in the application.\nYou can also access the application settings and your account details.",
  //       },
  //       {
  //         type: "informative",
  //         targetElement: "#element1",
  //         targetAreaElement: "#element1",
  //         title: "Feature 2",
  //         content: "This is the second feature of Stage 1.",
  //       },
  //       {
  //         type: "action",
  //         targetElement: "#element2",
  //         targetAreaElement: "#element2",
  //         title: "Feature 3",
  //         content: "Click on feature 2",
  //       },
  //       {
  //         type: "informative",
  //         targetElement: "#element4",
  //         targetAreaElement: "#element4",
  //         title: "Take a look",
  //         content: "Investigate all the search options by using this feature.",
  //       },
  //     ],
  //   },
  //   {
  //     name: "Navigation",
  //     page: "dashboard",
  //     tooltips: [],
  //   },
  //   {
  //     name: "Dealing with Devices",
  //     page: "devices",
  //     tooltips: [],
  //   },
  // ];

  const dummyData = [
    {
      name: "Navigate to Page 1",
      page: "/page1",
      tooltips: [
        {
          type: "informative",
          page: "/page1",
          targetElement: "#sidebar",
          targetAreaElement: "#sidebar",
          title: "Sidebar Menu",
          content:
            "This is your sidebar menu. From here, you can navigate to all the main pages in the application.",
        },
        {
          type: "action",
          page: "/page1",
          targetElement: "#nav-page1",
          targetAreaElement: "#nav-page1",
          title: "Page 1 Navigation",
          content: "Click here to navigate to Page 1.",
        },
      ],
    },
    {
      name: "Interact with Page 1",
      page: "/page1",
      tooltips: [
        {
          type: "informative",
          page: "/page1",
          targetElement: "#page1-title",
          targetAreaElement: "#page1-title",
          title: "Page 1 Title",
          content: "This is the title of Page 1.",
        },
        {
          type: "informative",
          page: "/page1",
          targetElement: "#button1",
          targetAreaElement: "#button1",
          title: "Button 1",
          content: "This is Button 1. Click on it to interact with it.",
        },
        {
          type: "informative",
          page: "/page1",
          targetElement: "#input1",
          targetAreaElement: "#input1",
          title: "Input 1",
          content: "This is Input 1. Enter some text to interact with it.",
        },
      ],
    },
    {
      name: "Interact with Page 2",
      page: "/page2",
      tooltips: [
        {
          type: "informative",
          page: "/page1",
          targetElement: "#nav-page2",
          targetAreaElement: "#nav-page2",
          title: "Page 2 Navigation",
          content: "Click here to navigate to Page 2.",
        },
        {
          type: "informative",
          page: "/page2",
          targetElement: "#page2-title",
          targetAreaElement: "#page2-title",
          title: "Page 2 Title",
          content: "This is the title of Page 2.",
        },
        {
          type: "informative",
          page: "/page2",
          targetElement: "#button2",
          targetAreaElement: "#button2",
          title: "Button 2",
          content: "This is Button 2. Click on it to interact with it.",
        },
        {
          type: "informative",
          page: "/page2",
          targetElement: "#input2",
          targetAreaElement: "#input2",
          title: "Input 2",
          content: "This is Input 2. Enter some text to interact with it.",
        },
      ],
    },
  ];

  const dummyDataInfoIcons = [
    {
      targetElement: "#el-move-test-button",
      title: "Dashboard",
      body: "This is where you find all the good info",
    },
    {
      targetElement: "#el-remove-test-button",
      title: "Reports",
      body: "Here you can view various reports and analytics.",
    },
    {
      targetElement: "#element2",
      title: "Settings",
      body: "Customize your preferences and system settings here.",
    },
    {
      targetElement: "#element3",
      title: "Notifications",
      body: "Check your notifications and alerts in this section.",
    },
    {
      targetElement: "#menu-sidebar",
      title: "User Profile",
      body: "View and edit your personal profile information.",
    },
    {
      targetElement: "#sidebar-dashboard-page",
      title: "Messages",
      body: "Send and receive messages from this area.",
    },
    {
      targetElement: "#mac-address-inputbox",
      title: "Help",
      body: "Find help articles and contact support here.",
    },
    {
      targetElement: "#element7",
      title: "Activity",
      body: "Review your recent activities and actions.",
    },
    {
      targetElement: "#element8",
      title: "Log Out",
      body: "Sign out of your account safely.",
    },
  ];

  const formattedInfoIcons = dummyDataInfoIcons.map((infoIcon, index) => {
    return (
      <InfoIcon
        targetEl={infoIcon.targetElement}
        title={infoIcon.title}
        body={infoIcon.body}
        transitionTime={Math.random() * (0.8 - 0.2) + 0.2}
        delayTime={Math.random() * 0.3}
      ></InfoIcon>
    );
  });

  // to track progress of interactive guides - change to guides.map
  const interactiveGuides = dummyData.map((guide, index) => ({
    id: index,
    ...guide,
    progress: 0,
  }));

  const interactiveGuidesMenuDisplay = interactiveGuides.reduce(
    (acc, guide) => {
      if (guide.page === currentPath) {
        acc.push(
          <Box
            key={guide.name}
            onClick={() => handleGuideClick(guide)}
            sx={{
              position: "relative",
              width: "100%",
              marginBottom: "15px",
            }}
          >
            <InteractiveGuideCard
              guideNo={acc.length + 1} // Sequential index
              guideName={guide.name}
              progress={guide.progress}
            />
          </Box>
        );
      }
      return acc;
    },
    []
  );

  const interactiveGuidesMenuDisplayOnOtherPages = interactiveGuides
    .filter((guide) => guide.page !== currentPath)
    .map((guide, index) => (
      <Box
        key={index}
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
        />
      </Box>
    ));

  // Get the width of the circle menu
  useLayoutEffect(() => {
    if (!circleMenuRef.current) {
      return;
    }

    const updateCircleMenuWidth = () => {
      if (!circleMenuRef.current) {
        return;
      }
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
      setInteractiveGuidesMenuOpen(true);
      setSearchToolMenuOpen(false);
      setHelpIconsMenuOpen(false);
    } else if (menuItem === "search-tools") {
      setInteractiveGuidesMenuOpen(false);
      setSearchToolMenuOpen(true);
      setHelpIconsMenuOpen(false);
    } else if (menuItem === "help-icons") {
      setInteractiveGuidesMenuOpen(false);
      setSearchToolMenuOpen(false);
      setHelpIconsMenuOpen(true);
    }
  };

  const handleHelpIconChange = () => {
    setHelpIconsEnabled((prevValue) => !prevValue);
  };

  const handleGuideClick = (guide) => {
    //setIsOpen(false);
    setGuideActive({ active: true, guide: guide });
  };

  const handleGuideExit = () => {
    setGuideActive({ active: false, guide: null });
  };

  const handleGuideComplete = () => {
    setGuideActive({ active: false, guide: null });
  };

  return (
    <Box
      zIndex={1000000000}
      sx={{
        position: "absolute",
        top: "0px",
        left: "0px",
        width: `${scrollWidth}px`,
        height: `${scrollHeight}px`,
        pointerEvents: "none",
      }}
    >
      <CssBaseline />
      {!guideActive.active && (
        <Box id="circle-resources" sx={{ pointerEvents: "all" }}>
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
                pointerEvents: isOpen ? "all" : "none",
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
                  backgroundColor: interactiveGuidesMenuOpen
                    ? "#DFD6FA"
                    : "transparent",
                  borderRadius: "100px",
                  color: interactiveGuidesMenuOpen ? "#3F15B1" : "#262626",
                  border: interactiveGuidesMenuOpen
                    ? "2px solid #3F15B1"
                    : "2px solid transparent",
                  cursor: "pointer",
                }}
              >
                <IconButton
                  id="menu-item-interactive-guides"
                  size="small"
                  sx={{
                    color: interactiveGuidesMenuOpen ? "#3F15B1" : "#262626",
                    "&:hover": {
                      backgroundColor: interactiveGuidesMenuOpen
                        ? "transparent"
                        : "",
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
                  backgroundColor: searchToolMenuOpen
                    ? "#DFD6FA"
                    : "transparent",
                  borderRadius: "100px",
                  color: searchToolMenuOpen ? "#3F15B1" : "#262626",
                  border: searchToolMenuOpen
                    ? "2px solid #3F15B1"
                    : "2px solid transparent",
                  cursor: "pointer",
                  pointerEvents: isOpen ? "all" : "none",
                }}
              >
                <IconButton
                  id="menu-item-search-tools"
                  size="small"
                  sx={{
                    color: searchToolMenuOpen ? "#3F15B1" : "#262626",
                    "&:hover": {
                      backgroundColor: searchToolMenuOpen ? "transparent" : "",
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
                  backgroundColor: helpIconsMenuOpen
                    ? "#DFD6FA"
                    : "transparent",
                  borderRadius: "100px",
                  color: helpIconsMenuOpen ? "#3F15B1" : "#262626",
                  border: helpIconsMenuOpen
                    ? "2px solid #3F15B1"
                    : "2px solid transparent",
                  cursor: "pointer",
                }}
              >
                <IconButton
                  id="menu-item-help-icons"
                  size="small"
                  sx={{
                    color: helpIconsMenuOpen ? "#3F15B1" : "#262626",
                    "&:hover": {
                      backgroundColor: helpIconsMenuOpen ? "transparent" : "",
                    },
                  }}
                >
                  <HelpIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
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
                position: interactiveGuidesMenuOpen ? "relative" : "absolute",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                height: "100%",
                width: "100%",
                borderRadius: "10px",
                padding: "18px",
                backgroundColor: "white",
                pointerEvents:
                  interactiveGuidesMenuOpen && isOpen ? "all" : "none",
                opacity: interactiveGuidesMenuOpen ? 1 : 0,
                transition: interactiveGuidesMenuOpen
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
                {interactiveGuidesMenuDisplayOnOtherPages.length !== 0 && (
                  <>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#cccccc",
                        fontSize: "0.65rem",
                        lineHeight: "1rem",
                        margin: "10px 0 5px 0",
                      }}
                    >
                      Guides on other pages
                    </Typography>
                    {interactiveGuidesMenuDisplayOnOtherPages}
                  </>
                )}
              </Box>
            </Box>
            <Box
              id="popup-box-search-tools"
              sx={{
                position: searchToolMenuOpen ? "relative" : "absolute",
                height: "100%",
                width: "100%",
                borderRadius: "10px",
                padding: "18px",
                backgroundColor: "white",
                pointerEvents: searchToolMenuOpen && isOpen ? "all" : "none",
                opacity: searchToolMenuOpen ? 1 : 0,
                transition: searchToolMenuOpen
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
                Search Tools
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#7F7F7F",
                  fontSize: "0.7rem",
                  lineHeight: "1rem",
                }}
              >
                Search documentation and interactive guides
              </Typography>
            </Box>
            <Box
              id="popup-box-help-icons"
              sx={{
                position: helpIconsMenuOpen ? "relative" : "absolute",
                height: "100%",
                width: "100%",
                borderRadius: "10px",
                padding: "18px",
                backgroundColor: "white",
                pointerEvents: helpIconsMenuOpen && isOpen ? "all" : "none",
                opacity: helpIconsMenuOpen ? 1 : 0,
                transition: helpIconsMenuOpen
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
                Help Icons
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#7F7F7F",
                  fontSize: "0.7rem",
                  lineHeight: "1rem",
                }}
              >
                Help icons provide details about different features and
                elements. Click on them for more information and insight into
                the application's functionality.
              </Typography>
              <Switch
                checked={helpIconsEnabled}
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
        </Box>
      )}
      {helpIconsEnabled && !guideActive.active && formattedInfoIcons}
      {guideActive.active && (
        <InteractiveGuide
          guide={guideActive.guide}
          onExit={handleGuideExit}
          onComplete={handleGuideComplete}
        ></InteractiveGuide>
      )}
    </Box>
  );
};

export default ResourceCircle;
