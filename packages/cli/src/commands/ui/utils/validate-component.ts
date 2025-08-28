const GITHUB_REPO = "AJCastello/jay-js";
const GITHUB_BRANCH = "development";
const COMPONENTS_PATH = "packages/ui/src/components";

export async function validateComponent(componentName: string): Promise<boolean> {
  try {
    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${COMPONENTS_PATH}/${componentName}?ref=${GITHUB_BRANCH}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    
    return Array.isArray(data) && data.length > 0;
  } catch (error) {
    return false;
  }
}