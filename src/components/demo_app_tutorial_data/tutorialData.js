// tutorialData.js

// tutorial information 1
// const tutorialData = [
//   {
//     stageName: "Basic Navigation",
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
//     test: [
//       {
//         text: "Open the menu sidebar",
//         clickElements: [
//           {
//             elementId: "#menu-sidebar",
//             textInputElements: [],
//           },
//         ],
//       },
//       {
//         text: "Navigate to the devices and dashboard page please",
//         clickElements: [
//           {
//             elementId: "#sidebar-devices-page",
//             textInputElements: [],
//           },
//           {
//             elementId: "#sidebar-dashboard-page",
//             textInputElements: [],
//           },
//         ],
//       },
//       {
//         text: "Click the testing remove button",
//         clickElements: [
//           {
//             elementId: "#el-remove-test-button",
//             textInputElements: [],
//           },
//         ],
//       },
//       {
//         text: "Create a new Mesh device with a MAC of 127:69:0:1",
//         clickElements: [
//           {
//             elementId: "#create-device-button",
//             textInputElements: [
//               {
//                 elementId: "#mac-address-inputbox",
//                 requiredInput: "127:69:0:1",
//               },
//               {
//                 elementId: "#device-type-inputbox",
//                 requiredInput: "Mesh type",
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     stageName: "Mapping Nodes",
//     tooltips: [
//       {
//         type: "informative",
//         targetElement: "#create-device-button",
//         targetAreaElement: "#create-device-button",
//         title: "Feature 4",
//         content: "This is the first feature of Stage 2.",
//       },
//       {
//         type: "informative",
//         targetElement: "#device-type-inputbox",
//         targetAreaElement: "#device-type-inputbox",
//         title: "Feature 5",
//         content: "This is the second feature of Stage 2.",
//       },
//     ],
//     test: [],
//   },
//   {
//     stageName: "Device Basics",
//     tooltips: [
//       {
//         type: "informative",
//         targetElement: "#element5",
//         targetAreaElement: "#element5",
//         title: "Feature 6",
//         content: "This is the first feature of Stage 3.",
//       },
//       {
//         type: "informative",
//         targetElement: "#element6",
//         targetAreaElement: "#element6",
//         title: "Feature 7",
//         content: "This is the second feature of Stage 3.",
//       },
//     ],
//     test: [],
//   },
//   {
//     stageName: "Deleting Devices",
//     tooltips: [
//       {
//         type: "informative",
//         targetElement: "#element7",
//         targetAreaElement: "#element7",
//         title: "Feature 8",
//         content: "This is the first feature of Stage 4.",
//       },
//       {
//         type: "informative",
//         targetElement: "#element0",
//         targetAreaElement: "#element0",
//         title: "Feature 9",
//         content: "This is the second feature of Stage 4.",
//       },
//     ],
//     test: [],
//   },
//   {
//     stageName: "Dealing with Alerts",
//     tooltips: [
//       {
//         type: "informative",
//         targetElement: "#element8",
//         targetAreaElement: "#element8",
//         title: "Feature 10",
//         content: "This is the first feature of Stage 4.",
//       },
//       {
//         type: "informative",
//         targetElement: "#element7",
//         targetAreaElement: "#element7",
//         title: "Feature 11",
//         content: "This is the second feature of Stage 4.",
//       },
//     ],
//     test: [],
//   },
//   // Add more stages as needed
// ];

// tutorial information 2
const demoTutorialData = [
  {
    stageName: "Navigate to Page 1",
    startingPage: "/page1",
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
    test: [
      {
        text: "Open the sidebar menu and navigate to Page 1",
        clickElements: [
          {
            elementId: "#nav-page1",
            textInputElements: [],
          },
        ],
      },
    ],
  },
  {
    stageName: "Interact with Page 1",
    startingPage: "/page1",
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
    test: [
      {
        text: "Click on Button 1",
        clickElements: [
          {
            elementId: "#button1",
            textInputElements: [],
          },
        ],
      },
      {
        text: 'Enter "Sample text" into Input 1, then click button 1',
        clickElements: [
          {
            elementId: "#button1",
            textInputElements: [
              {
                elementId: "#input1",
                requiredInput: "Sample text",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    stageName: "Interact with Page 2",
    startingPage: "/page2",
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
      {
        type: "informative",
        page: "/page2",
        targetElement: "#element4",
        targetAreaElement: "#element4",
        title: "Feature4",
        content: "This is Feature 4.\nIt is one of my favorite features ever.",
      },
      {
        type: "informative",
        page: "/page2",
        targetElement: "#nav-page7",
        targetAreaElement: "#nav-page7",
        title: "Sidebar 7",
        content: "This is Feature 4. It is one of my favorite features ever.",
      },
      {
        type: "informative",
        targetElement: "#create-device-button",
        targetAreaElement: "#create-device-button",
        title: "Feature 4",
        content: "This is the first feature of Stage 2.",
      },
      {
        type: "informative",
        targetElement: "#device-type-inputbox",
        targetAreaElement: "#device-type-inputbox",
        title: "Feature 5",
        content: "This is the second feature of Stage 2.",
      },
    ],
    test: [
      {
        text: "Open the sidebar menu and navigate to Page 2",
        clickElements: [
          {
            elementId: "#nav-page2",
            textInputElements: [],
          },
        ],
      },
      {
        text: "Click on Button 2",
        clickElements: [
          {
            elementId: "#button2",
            textInputElements: [],
          },
        ],
      },
      {
        text: "Enter text into Input 2",
        clickElements: [
          {
            elementId: "#input2",
            textInputElements: [
              {
                elementId: "#input2",
                requiredInput: "Another sample text",
              },
            ],
          },
        ],
      },
    ],
  },
  // {
  //   stageName: "Navigate to Page 1",
  //   startingPage: "/page1",
  //   tooltips: [
  //     {
  //       type: "informative",
  //       page: "/page1",
  //       targetElement: "#sidebar",
  //       targetAreaElement: "#sidebar",
  //       title: "Sidebar Menu",
  //       content:
  //         "This is your sidebar menu. From here, you can navigate to all the main pages in the application.",
  //     },
  //     {
  //       type: "action",
  //       page: "/page1",
  //       targetElement: "#nav-page1",
  //       targetAreaElement: "#nav-page1",
  //       title: "Page 1 Navigation",
  //       content: "Click here to navigate to Page 1.",
  //     },
  //   ],
  //   test: [
  //     {
  //       text: "Open the sidebar menu and navigate to Page 1",
  //       clickElements: [
  //         {
  //           elementId: "#nav-page1",
  //           textInputElements: [],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   stageName: "Navigate to Page 1",
  //   startingPage: "/page1",
  //   tooltips: [
  //     {
  //       type: "informative",
  //       page: "/page1",
  //       targetElement: "#sidebar",
  //       targetAreaElement: "#sidebar",
  //       title: "Sidebar Menu",
  //       content:
  //         "This is your sidebar menu. From here, you can navigate to all the main pages in the application.",
  //     },
  //     {
  //       type: "action",
  //       page: "/page1",
  //       targetElement: "#nav-page1",
  //       targetAreaElement: "#nav-page1",
  //       title: "Page 1 Navigation",
  //       content: "Click here to navigate to Page 1.",
  //     },
  //   ],
  //   test: [
  //     {
  //       text: "Open the sidebar menu and navigate to Page 1",
  //       clickElements: [
  //         {
  //           elementId: "#nav-page1",
  //           textInputElements: [],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   stageName: "Navigate to Page 1 pleeeesss",
  //   startingPage: "/page1",
  //   tooltips: [
  //     {
  //       type: "informative",
  //       page: "/page1",
  //       targetElement: "#sidebar",
  //       targetAreaElement: "#sidebar",
  //       title: "Sidebar Menu",
  //       content:
  //         "This is your sidebar menu. From here, you can navigate to all the main pages in the application.",
  //     },
  //     {
  //       type: "action",
  //       page: "/page1",
  //       targetElement: "#nav-page1",
  //       targetAreaElement: "#nav-page1",
  //       title: "Page 1 Navigation",
  //       content: "Click here to navigate to Page 1.",
  //     },
  //   ],
  //   test: [
  //     {
  //       text: "Open the sidebar menu and navigate to Page 1",
  //       clickElements: [
  //         {
  //           elementId: "#nav-page1",
  //           textInputElements: [],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   stageName: "Navigate to Page 1",
  //   startingPage: "/page1",
  //   tooltips: [
  //     {
  //       type: "informative",
  //       page: "/page1",
  //       targetElement: "#sidebar",
  //       targetAreaElement: "#sidebar",
  //       title: "Sidebar Menu",
  //       content:
  //         "This is your sidebar menu. From here, you can navigate to all the main pages in the application.",
  //     },
  //     {
  //       type: "action",
  //       page: "/page1",
  //       targetElement: "#nav-page1",
  //       targetAreaElement: "#nav-page1",
  //       title: "Page 1 Navigation",
  //       content: "Click here to navigate to Page 1.",
  //     },
  //   ],
  //   test: [
  //     {
  //       text: "Open the sidebar menu and navigate to Page 1",
  //       clickElements: [
  //         {
  //           elementId: "#nav-page1",
  //           textInputElements: [],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   stageName: "Navigate to Page 1",
  //   startingPage: "/page1",
  //   tooltips: [
  //     {
  //       type: "informative",
  //       page: "/page1",
  //       targetElement: "#sidebar",
  //       targetAreaElement: "#sidebar",
  //       title: "Sidebar Menu",
  //       content:
  //         "This is your sidebar menu. From here, you can navigate to all the main pages in the application.",
  //     },
  //     {
  //       type: "action",
  //       page: "/page1",
  //       targetElement: "#nav-page1",
  //       targetAreaElement: "#nav-page1",
  //       title: "Page 1 Navigation",
  //       content: "Click here to navigate to Page 1.",
  //     },
  //   ],
  //   test: [
  //     {
  //       text: "Open the sidebar menu and navigate to Page 1",
  //       clickElements: [
  //         {
  //           elementId: "#nav-page1",
  //           textInputElements: [],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   stageName: "Navigate to Page 1",
  //   startingPage: "/page1",
  //   tooltips: [
  //     {
  //       type: "informative",
  //       page: "/page1",
  //       targetElement: "#sidebar",
  //       targetAreaElement: "#sidebar",
  //       title: "Sidebar Menu",
  //       content:
  //         "This is your sidebar menu. From here, you can navigate to all the main pages in the application.",
  //     },
  //     {
  //       type: "action",
  //       page: "/page1",
  //       targetElement: "#nav-page1",
  //       targetAreaElement: "#nav-page1",
  //       title: "Page 1 Navigation",
  //       content: "Click here to navigate to Page 1.",
  //     },
  //   ],
  //   test: [
  //     {
  //       text: "Open the sidebar menu and navigate to Page 1",
  //       clickElements: [
  //         {
  //           elementId: "#nav-page1",
  //           textInputElements: [],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   stageName: "Navigate to Page 1",
  //   startingPage: "/page1",
  //   tooltips: [
  //     {
  //       type: "informative",
  //       page: "/page1",
  //       targetElement: "#sidebar",
  //       targetAreaElement: "#sidebar",
  //       title: "Sidebar Menu",
  //       content:
  //         "This is your sidebar menu. From here, you can navigate to all the main pages in the application.",
  //     },
  //     {
  //       type: "action",
  //       page: "/page1",
  //       targetElement: "#nav-page1",
  //       targetAreaElement: "#nav-page1",
  //       title: "Page 1 Navigation",
  //       content: "Click here to navigate to Page 1.",
  //     },
  //   ],
  //   test: [
  //     {
  //       text: "Open the sidebar menu and navigate to Page 1",
  //       clickElements: [
  //         {
  //           elementId: "#nav-page1",
  //           textInputElements: [],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   stageName: "Navigate to Page 1",
  //   startingPage: "/page1",
  //   tooltips: [
  //     {
  //       type: "informative",
  //       page: "/page1",
  //       targetElement: "#sidebar",
  //       targetAreaElement: "#sidebar",
  //       title: "Sidebar Menu",
  //       content:
  //         "This is your sidebar menu. From here, you can navigate to all the main pages in the application.",
  //     },
  //     {
  //       type: "action",
  //       page: "/page1",
  //       targetElement: "#nav-page1",
  //       targetAreaElement: "#nav-page1",
  //       title: "Page 1 Navigation",
  //       content: "Click here to navigate to Page 1.",
  //     },
  //   ],
  //   test: [
  //     {
  //       text: "Open the sidebar menu and navigate to Page 1",
  //       clickElements: [
  //         {
  //           elementId: "#nav-page1",
  //           textInputElements: [],
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default demoTutorialData;
