/**
 * @jest-environment puppeteer
 */

describe("Resource Circle Component", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000");
  });

  test("renders the ResourceCircle and opens the menu and popupboxes", async () => {
    await page.waitForSelector("#circle-resources");

    const circleElement = await page.$("#circle");
    expect(circleElement).toBeDefined();

    await circleElement.click(); // Open Resource Circle
    await page.waitForSelector("#circle-menu-transparent-container");

    const menuContainer = await page.$("#circle-menu-transparent-container");
    expect(menuContainer).toBeDefined();

    const popupGuidesContainer = await page.$("#popup-box-interactive-guides"); // Popup should start on interactive guides
    // Get the computed style of the popup element
    const popupGuidesStyle = await page.evaluate((el) => {
      const computedStyle = window.getComputedStyle(el);
      return {
        opacity: computedStyle.opacity,
      };
    }, popupGuidesContainer);
    expect(popupGuidesStyle.opacity).toBe("1");

    await page.click("#menu-item-search-tools-container");
    const popupSearchContainer = await page.$("#popup-box-search-tools");
    // Get the computed style of the popup element
    const popupSearchStyle = await page.evaluate((el) => {
      const computedStyle = window.getComputedStyle(el);
      return {
        opacity: computedStyle.opacity,
      };
    }, popupSearchContainer);
    expect(popupSearchStyle.opacity).toBe("1");

    await page.click("#menu-item-help-icons-container");
    const popupInfoIconContainer = await page.$("#popup-box-help-icons");
    // Get the computed style of the popup element
    const popupInfoIconsStyle = await page.evaluate((el) => {
      const computedStyle = window.getComputedStyle(el);
      return {
        opacity: computedStyle.opacity,
      };
    }, popupInfoIconContainer);
    expect(popupInfoIconsStyle.opacity).toBe("1");
  }, 10000);

  test("toggles help icons switch", async () => {
    await page.click("#menu-item-help-icons-container");
    await page.waitForSelector('input[type="checkbox"]');

    const switchInput = await page.$('input[type="checkbox"]');
    const isCheckedBefore = await switchInput.evaluate((node) => node.checked);
    expect(isCheckedBefore).toBe(false);

    await switchInput.click();
    const isCheckedAfter = await switchInput.evaluate((node) => node.checked);
    expect(isCheckedAfter).toBe(true);
  });

  test("opens and exits an interactive guide", async () => {
    await page.click("#menu-item-interactive-guides-container");
    await page.waitForSelector("#interactive-guides-container");

    const guideCard = await page.$("#interactive-guides-container div");
    expect(guideCard).toBeDefined();

    await guideCard.click();
    await page.waitForSelector("#tooltip");

    const tooltip = await page.$("#tooltip");
    expect(tooltip).toBeDefined();

    const tooltipExitButton = await page.$("#tooltip-exit-button");
    await tooltipExitButton.click();

    const tooltip2 = await page.$("#tooltip");
    expect(tooltip2).toBe(null);
  }, 10000);

  test("searches documentation and guides", async () => {
    await page.click("#menu-item-search-tools-container");
    await page.waitForSelector("#search-input-field");

    const searchInput = await page.$("#search-input-field");
    searchInput.click();
    await searchInput.type("introduction");

    const searchValue = await page.evaluate((el) => el.value, searchInput);
    expect(searchValue).toBe("introduction");

    await page.waitForSelector("#search-results-container");

    const searchResults = await page.$("#search-results-container");
    expect(searchResults).toBeDefined();
  }, 10000);

  test("opens full documentation from search results", async () => {
    // Click on a search result
    await page.waitForSelector("#search-results-container #search-result-doc-item0");
    const singularSearchResult = await page.$("#search-results-container #search-result-doc-item0");
    expect(singularSearchResult).toBeDefined();
    singularSearchResult.click();

    // Open full docs
    await page.waitForSelector("#open-full-docs-button");
    const openFullDocsButton = await page.$("#open-full-docs-button");
    openFullDocsButton.click();

    // Close docs
    await page.waitForSelector("#documentation-close-icon");
    const docsExitButton = await page.$("#documentation-close-icon");
    expect(docsExitButton).toBeDefined();
    docsExitButton.click();

    // Close Resource Circle
    const circleElement = await page.$("#circle");
    expect(circleElement).toBeDefined();
    await circleElement.click();
  }, 25000);
});
