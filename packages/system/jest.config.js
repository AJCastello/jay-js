export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/*.spec.ts", "**/*.test.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", {
      tsconfig: "./tsconfig.json",
    }]
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^(.+)\\.js$": "$1"
  },
  // setupFilesAfterEnv: [
  //   "<rootDir>/src/draggable/__tests__/setup.ts"
  // ],
  globals: {
    "ts-jest": {
      tsconfig: "./tsconfig.json",
    },
  },
  // rootDir: "./src",
}