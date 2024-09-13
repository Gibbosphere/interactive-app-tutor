# interactive-app-tutor

An in-app tutorial system designed to guide users through your software application using a variety of UI elements such as tooltips, modals, progress bars, and checklists. Set up your own step-by-step tutorials with tests and other interactive elements for your application to help your users understand and navigate your software quickly and effectively.

Set up the InteractiveAppTutor frontend component in your app as follows:
/** Your other App imports **/
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InteractiveAppTutor from "./InteractiveAppTutor";

const App = () => {
const [tutorialActive, setTutorialActive] = React.useState(false);
const [documentationOpen, setDocumentationOpen] = React.useState(false);
const [documentationSideToolEnabled, setDocumentationSideToolEnabled] = React.useState(true);
const [resourceCircleEnabled, setResourceCircleEnabled] = React.useState(true);

    return (
        /** Be sure to use Router from react-router-dom **/
        <Router>
            /** All your other application content first **/
            /** Your InteractiveAppTutor last **/
            <InteractiveAppTutor
                tutorialActive={tutorialActive}
                exitTutorial={() => setTutorialActive(false)}
                tutorialLogoSrc="/images/iNethiLogoWhite.png"
                documentationOpen={documentationOpen}
                toggleDocumentationOpen={toggleDocumentationOpen}
                documentationSideToolEnabled={documentationSideToolEnabled}
                resourceCircleEnabled={resourceCircleEnabled}
                resourceCircleIconSrc="/images/iNethiLogoWhite.png"
                resourceCirclePos={{positionY: "bottom", positionX: "right",}}
                resourceCircleSize={resourceCircleInNavbar ? 55 : 60}
                resourceCircleDistFromOuter={resourceCircleInNavbar ? 5 : 20}
                resourceCircleBorder={resourceCircleInNavbar ? "2px solid white" : "none"}
                openDocumentation={() => setDocumentationOpen(true)}
            />
        </Router>
    )

}

For more details, view the User Manual.
