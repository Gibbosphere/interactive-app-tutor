/**
 * @jest-environment puppeteer
 */

describe("Tutorial Component", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000");
  });

  test("should start the tutorial", async () => {
    await page.waitForSelector("#start-tutorial-button");
    const startButton = await page.$("#start-tutorial-button");
    await startButton.click();

    // Navigate through first intro screen
    await page.waitForSelector("#intro-tile-1-next-button");
    const introNextButton1 = await page.$("#intro-tile-1-next-button");
    await introNextButton1.click();

    // Start the tutorial
    await page.waitForSelector("#intro-tile-2-next-button"); // Wait for tutorial name to appear
    const introNextButton2 = await page.$("#intro-tile-2-next-button");
    await introNextButton2.click();
  }, 10000);

  test("should navigate through informative and action tooltips correctly", async () => {
    // Click next on first informative tooltip
    await page.waitForSelector("#tooltip-next-button");
    let nextButton = await page.$("#tooltip-next-button");
    await nextButton.click();

    await page.waitForSelector("#tooltip-next-button");
    nextButton = await page.$("#tooltip-next-button");
    await nextButton.click();

    await page.waitForSelector("#tooltip-next-button");
    nextButton = await page.$("#tooltip-next-button");
    await nextButton.click();
    // Test action tooltip click
    // await page.waitForSelector("#nav-page1");
    // const sidebarPage1 = await page.$("#nav-page1");
    // await sidebarPage1.click();

    // Has stage completed and showed the walkthrough complete tile
    await page.waitForSelector("#walkthrough-complete-tile");
    const walkthroughCompleteTile = await page.$("#walkthrough-complete-tile");
    expect(walkthroughCompleteTile).toBeDefined();
  }, 10000);

  // test("should start and complete a test succesfully", async () => {
  //   // Start the test
  //   await page.waitForSelector("#take-test-button");
  //   const startTestButton = await page.$("#take-test-button");
  //   await startTestButton.click();

  //   // Complete first task
  //   await page.waitForSelector("#nav-page1");
  //   await (await page.$("#nav-page1")).click();

  //   // View next stage
  //   await page.waitForSelector("#stage-complete-card-continue-button");
  //   const continueToTutProgressButton = await page.$("#stage-complete-card-continue-button");
  //   await continueToTutProgressButton.click();
  // }, 10000);

  test("should skip a test succesfully", async () => {
    // Skip the test
    await page.waitForSelector("#skip-test-button");
    const startTestButton = await page.$("#skip-test-button");
    await startTestButton.click();

    await page.waitForSelector("#confirmation-popup-confirm-button");
    let confirmSkipTestButton = await page.$("#confirmation-popup-confirm-button");
    await confirmSkipTestButton.click();
  }, 10000);

  test("should skip final stages succesfully and complete the tutorial", async () => {
    // Skip final two stages
    await page.waitForSelector("#skip-stage-button");
    const skipTestButton = await page.$("#skip-stage-button");
    await skipTestButton.click();

    await page.waitForSelector("#confirmation-popup-confirm-button");
    let confirmSkipTestButton = await page.$("#confirmation-popup-confirm-button");
    await confirmSkipTestButton.click();

    // await skipTestButton.click();
    // await page.waitForSelector("#confirmation-popup-confirm-button");
    // confirmSkipTestButton = await page.$("#confirmation-popup-confirm-button");
    // await confirmSkipTestButton.click();

    // Confirm tutorial complete card shows
    await page.waitForSelector("#tutorial-complete-tile");
    const tutorialCompleteTile = await page.$("#tutorial-complete-tile");
    expect(tutorialCompleteTile).toBeDefined();

    await page.waitForSelector("#finish-tutorial-button");
    let finishTutorialButton = await page.$("#finish-tutorial-button");
    await finishTutorialButton.click();
  }, 10000);
});
