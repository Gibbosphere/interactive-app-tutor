# Interactive App Tutor - Frontend

An in-app tutorial system designed to guide users through your software application using a variety of UI elements such as tooltips, modals, progress bars, and checklists. Set up your own step-by-step tutorials with tests and other interactive elements for your application to help your users understand and navigate your software quickly and effectively.

To see the interactive-app-tutor in action, run `npm start`. This will run the interactive-app-tutor on a demo application
created simply for a quick demonstration of the interactive-app-tutor. Navigate to [localhost:3000](http://localhost:3000) to view the **interactive-app-tutor** in action running on the demo application.

To implement the **interactive-app-tutor** frontend in your own application, follow these steps:

1. Copy the entire [components folder](./src/components/) and paste it into your application root directory.

2. Import and insert the `InteractiveAppTutor` React component into your application code.

```javascript
/** Your other App.js imports **/
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { usePersistantState } from "./components/hooks";
import InteractiveAppTutor from "./components/InteractiveAppTutor";

const App = () => {
  const [tutorialActive, setTutorialActive] = React.useState(false);
  const [documentationOpen, setDocumentationOpen] = React.useState(false);
  const [documentationSideToolEnabled, setDocumentationSideToolEnabled] = React.useState(true);
  const [resourceCircleEnabled, setResourceCircleEnabled] = React.useState(true);

  return (
    /** Be sure to use Router from react-router-dom **/
    <Router>
      /** All your other application content first **/ /** Your InteractiveAppTutor last **/
      <InteractiveAppTutor
        tutorialActive={tutorialActive}
        exitTutorial={() => setTutorialActive(false)}
        tutorialLogoSrc="/images/iNethiLogoWhite.png"
        documentationOpen={documentationOpen}
        toggleDocumentationOpen={toggleDocumentationOpen}
        documentationSideToolEnabled={documentationSideToolEnabled}
        resourceCircleEnabled={resourceCircleEnabled}
        resourceCircleIconSrc="/images/iNethiLogoWhite.png"
        resourceCirclePos={{ positionY: "bottom", positionX: "right" }}
        resourceCircleSize={resourceCircleInNavbar ? 55 : 60}
        resourceCircleDistFromOuter={resourceCircleInNavbar ? 5 : 20}
        resourceCircleBorder={resourceCircleInNavbar ? "2px solid white" : "none"}
        openDocumentation={() => setDocumentationOpen(true)}
        demoMode={false}
      />
    </Router>
  );
};
```

3. In the previous step, ensure the demoMode prop is set to false. Rather than using the local [demo_app_tutorial_data](./src/demo_app_tutorial_data/), the frontend will then make API calls to the backend to recieve all tutorial and resource data.

4. Finally, start your React application using `npm start`. (There will initially be no tutorial data)

5. Add your own tutorial and resource data using the [interactive-app-tutor-backend](https://github.com/Gibbosphere/interactive-app-tutor-backend). Ensure you have it running.

6. For more details, view the [User Manual](./User_Manual.pdf).
