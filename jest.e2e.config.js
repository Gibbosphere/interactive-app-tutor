module.exports = {
  preset: "jest-puppeteer",
  testMatch: ["<rootDir>/src/__tests__/__e2e_tests__/**/*.test.js"],
  setupFilesAfterEnv: ["expect-puppeteer"], // Optional: Adds extra assertions for Puppeteer
  maxWorkers: 1,
};
