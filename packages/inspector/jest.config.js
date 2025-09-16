module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  testMatch: [
    "**/__tests__/**/*.(ts|tsx|js|jsx)",
    "**/*.(test|spec).(ts|tsx|js|jsx)"
  ],
  collectCoverageFrom: [
    "src/**/*.(ts|tsx)",
    "!src/**/*.d.ts"
  ]
};