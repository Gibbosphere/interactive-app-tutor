// interactiveGuidesData.js

const demoGuidesData = [
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
  // add more guides
];

// const guidesData = [
//   {
//     name: "Getting Started",
//     page: "/dashboard",
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
//     page: "/dashboard",
//     tooltips: [],
//   },
//   {
//     name: "Dealing with Devices",
//     page: "devices",
//     tooltips: [],
//   },
//   // add more guides
// ];

export default demoGuidesData;
