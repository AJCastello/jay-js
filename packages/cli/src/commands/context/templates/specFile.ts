export function specFileTemplate(contextName: string) {
  return `import { describe, it, expect } from "vitest";
import { ${contextName}Context } from "./${contextName}.context";

describe("validate actions methods", () => {
});

describe("validate states methods", () => {
});
`;
}

export function specFileTemplateFunction(methodName: string, description: string) {
  return `  it("${description}", () => {
    expect(${methodName}).toBe(void);
  });`
}
