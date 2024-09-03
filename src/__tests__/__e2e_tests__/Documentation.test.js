/**
 * @jest-environment puppeteer
 */

describe("Documentation Component", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000");
  });

  test("should open and close the documentation slide-out panel", async () => {
    // Ensure slide-out button is present
    await page.waitForSelector("#documentation-slideout-button");

    const slideOutButton = await page.$("#documentation-slideout-button");
    expect(slideOutButton).toBeDefined();

    // Click the button to open the slide-out
    await slideOutButton.click();
    await page.waitForSelector("#documentation-slideout");

    const slideOutPanel = await page.$("#documentation-slideout");
    const slideOutPanelStyle = await page.evaluate((el) => {
      const computedStyle = window.getComputedStyle(el);
      return {
        width: computedStyle.width,
      };
    }, slideOutPanel);
    expect(slideOutPanelStyle.width).not.toBe("0px");

    // Close the slide-out panel
    const closeButton = await page.$("#documentation-close-icon");
    await closeButton.click();
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const slideOutPanelStyleAfterClose = await page.evaluate((el) => {
      const computedStyle = window.getComputedStyle(el);
      return {
        width: computedStyle.width,
      };
    }, slideOutPanel);
    expect(slideOutPanelStyleAfterClose.width).toBe("0px");
  }, 15000);

  test("should navigate to a specific documentation page", async () => {
    // Open the slide-out panel first
    await page.waitForSelector("#documentation-slideout-button");
    const slideOutButton = await page.$("#documentation-slideout-button");
    await slideOutButton.click();

    // Click on a documentation page button
    await page.waitForSelector("#doc-main-page-container button");
    const firstDocButton = await page.$("#doc-main-page-container button");
    await firstDocButton.click();

    // Ensure the content of the selected page is displayed
    const docPageContent = await page.$("#documentation-page-content");
    expect(docPageContent).toBeDefined();

    // Navigate back to the main page
    const backButton = await page.$("#documentation-page-back-button");
    await backButton.click();

    const mainPageContainer = await page.$("#doc-main-page-container");
    expect(mainPageContainer).toBeDefined();
  });

  test("should search for documentation pages", async () => {
    // Perform a search
    await page.waitForSelector("#doc-search-input-field");
    const searchInput = await page.$("#doc-search-input-field");
    await searchInput.click();
    await searchInput.type("introduction");

    const searchValue = await page.evaluate((el) => el.value, searchInput);
    expect(searchValue).toBe("introduction");

    // Ensure search results are displayed
    const searchResultsContainer = await page.$("#document-search-results-container");
    const searchResultsStyle = await page.evaluate((el) => {
      const computedStyle = window.getComputedStyle(el);
      return {
        opacity: computedStyle.opacity,
      };
    }, searchResultsContainer);
    expect(searchResultsStyle.opacity).toBe("1");
  });

  test("should open full documentation from search results", async () => {
    // Click on a search result
    await page.waitForSelector("#document-search-results-container #search-result-doc-item0");
    const searchResult = await page.$(
      "#document-search-results-container #search-result-doc-item0",
    );
    await searchResult.click();

    // Ensure the selected documentation page is opened
    const docPageContent = await page.$("#documentation-page-content");
    expect(docPageContent).toBeDefined();
  }, 10000);
});
