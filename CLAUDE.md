# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript library monorepo for the Jay JS framework, consisting of multiple NPM packages that provide UI components, state management, routing, and development tools. The project is designed as a collection of publishable packages that work together to create modern web applications.

## Architecture

- **Monorepo Management**: NPM Workspaces with NX for build orchestration
- **Core Purpose**: TypeScript library packages published to NPM
- **Packages**: 6 main packages in `packages/`:
  - `system` - Core framework with state management, routing, and lazy loading
  - `ui` - UI components and utilities
  - `jsx` - JSX-like syntax support for Jay JS
  - `cli` - Command-line interface for project scaffolding
  - `static` - Static site generation utilities
  - `elements` - Custom web elements and components
- **Documentation**: Single web application in `docs/` using Vite, TypeScript, TailwindCSS with DaisyUI
- **Build Tools**: SWC for compilation, TypeScript for type checking, Jest for testing
- **No Backend**: This is a client-side framework - no server-side code

## Development Commands

### Build Commands
- `npm run build` - Build all packages
- `npm run build:system` - Build system package
- `npm run build:ui` - Build UI package
- `npm run build:cli` - Build CLI package
- `npm run build:jsx` - Build JSX package
- `npm run build:static` - Build static package

### Publish Commands
- `npm run pub:all` - Publish all packages to NPM
- `npm run pub:system` - Publish system package
- `npm run pub:ui` - Publish UI package
- Individual package publish: `npm run pub:[package-name]`

### Development Tools
- `npm run link:all` - Get local development paths for all packages
- Package-specific commands available in each `packages/[name]/package.json`
- Documentation dev server: `cd docs && npm run dev`

## Code Conventions

- **Types**: Prefix with `T`, e.g., `export type TPerson`
- **Enums**: UPPERCASE_SNAKE_CASE, e.g., `PERSON_GENDER { MALE = 'MALE' }`
- **Functions**: camelCase, e.g., `getPersonById`
- **Component Functions**: PascalCase, e.g., `PersonProfileComponent`
- **Properties for queries/filters**: Use enums
- **No "key" property** in components
- **No code comments** unless explicitly requested
- **Package Exports**: Each package must have clean exports in `dist/index.js`
- **Documentation**: All user-facing text in docs must use translation patterns for future i18n support

## Package Architecture

### CRITICAL: Package Structure

Each package in `packages/` follows a consistent structure:

```
packages/[package-name]/
├── src/                    ← Source TypeScript code
│   ├── index.ts           ← Main export file
│   ├── types/             ← Type definitions
│   ├── components/        ← UI components (for ui package)
│   ├── utils/             ← Utility functions
│   ├── core/              ← Core functionality
│   └── [feature-dirs]/    ← Feature-specific modules
├── dist/                  ← Build output (auto-generated)
├── package.json           ← Package configuration
├── README.md             ← Package documentation
└── tsconfig.json         ← TypeScript configuration
```

### Package Responsibilities

1. **@jay-js/system**: Core framework with state management, routing, lazy loading
2. **@jay-js/ui**: Reusable UI components and utilities
3. **@jay-js/jsx**: JSX-like syntax support for Jay JS framework
4. **@jay-js/cli**: Command-line tools for project scaffolding and development
5. **@jay-js/static**: Static site generation utilities
6. **@jay-js/elements**: Custom web elements and component definitions

### Documentation Application Structure

The `docs/` folder contains a single web application that demonstrates the packages:

```
docs/
├── src/
│   ├── pages/             ← Documentation pages
│   ├── components/        ← Doc-specific components
│   ├── styles/            ← Styling with Tailwind
│   └── examples/          ← Code examples
├── public/                ← Static assets
└── dist/                  ← Build output
```

### Package Development Guidelines

#### Type System Rules

- **Package Types**: Each package manages its own types in `src/types/`
- **Export Strategy**: Clean exports through `src/index.ts` with proper type definitions
- **Inter-package Types**: Shared types should be duplicated or use peer dependencies
- **Import Patterns**: Use relative imports within packages, package imports across packages

#### Development Workflow

**When implementing package functionality:**

1. **Package Scope**: Focus on single-responsibility principle per package
2. **Clean Exports**: Ensure all public APIs are exported through main index file
3. **Type Safety**: Maintain strict TypeScript configuration across all packages
4. **Testing**: Each package should have comprehensive unit tests
5. **Documentation**: Update package README and docs/ examples when adding features

#### Package Utilities Pattern

**Each package may include utilities specific to its domain:**

```typescript
// packages/ui/src/utils/component.utils.ts
export const componentUtils = {
  generateId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
  },
  
  mergeClasses(...classes: (string | undefined)[]): string {
    return classes.filter(Boolean).join(' ');
  },
};
```

#### Build and Distribution

1. **Build Process**: Each package uses SWC for fast compilation
2. **Type Generation**: TypeScript compiler generates .d.ts files
3. **Clean Package**: Removes devDependencies from distributed package.json
4. **NPM Publishing**: Automated through package scripts with public access

## Working with Agents

When creating or modifying agents:
1. Agents are Markdown files with YAML frontmatter
2. Most agents should omit the `tools` field to inherit all available tools
3. Use XML-style examples in descriptions for intelligent invocation
4. Agents return structured findings for main agent coordination

## Orchestration Pattern for Claude Code

Since sub-agents in Claude Code cannot directly invoke other sub-agents, orchestration follows this strict pattern:

### CRITICAL: Agent Routing Protocol

**When handling complex tasks, you MUST:**

1. **ALWAYS start with tech-lead-orchestrator** for any multi-step task
2. **FOLLOW the agent routing map** returned by tech-lead EXACTLY
3. **USE ONLY the agents** explicitly recommended by tech-lead
4. **NEVER select agents independently** - tech-lead knows which agents exist

### Example: Building a Feature with Agent Routing

```
User: "Build a user management system"

Main Claude Agent:
1. First, I'll use the tech-lead-orchestrator to analyze and get routing
   → Tech lead returns Agent Routing Map with SPECIFIC agents

2. I MUST use ONLY the agents listed in the routing map:
   - If tech-lead says "use nodejs-api-developer" → Use that EXACT agent
   - If tech-lead says "use firebase-architect" → Use that EXACT agent
   - DO NOT substitute with generic agents unless specified as fallback

3. Execute tasks in the order specified by tech-lead using TodoWrite
```

### Key Orchestration Rules

1. **Tech-Lead is Routing Authority**: Tech-lead determines which agents can handle each task
2. **Strict Agent Selection**: Use ONLY agents from tech-lead's "Available Agents" list
3. **No Improvisation**: Do NOT select agents based on your own judgment
4. **Deep Reasoning**: Apply careful thought when coordinating the recommended agents
5. **Structured Handoffs**: Extract and pass information between agent invocations

### Agent Selection Flow

```
CORRECT FLOW:
User Request → Tech-Lead Analysis → Agent Routing Map → Execute with Listed Agents

INCORRECT FLOW:
User Request → Main Agent Guesses → Wrong Agent Selected → Task Fails
```

### Example Tech-Lead Response You Must Follow

When tech-lead returns:
```
## Available Agents for This Project
- typescript-specialist: TypeScript library development
- npm-package-expert: NPM package management and publishing
- jayjs-framework-expert: Jay JS framework development
- documentation-specialist: Documentation and examples
```

You MUST use these specific agents, NOT generic alternatives like "backend-developer"

## High-Level Architecture

### Agent Organization
The project follows a hierarchical structure:

1. **Orchestrators** (`agents/orchestrators/`)
   - `tech-lead-orchestrator`: Coordinates complex projects through three-phase workflow (Research → Planning → Execution)
   - `project-analyst`: Detects technology stack and enables intelligent routing
   - `team-configurator`: Creates agent routing rules in CLAUDE.md files

2. **Core Agents** (`agents/core/`)
   - Cross-cutting concerns like code archaeology, reviews, performance, and documentation
   - These agents support all technology stacks

3. **Universal Agents** (`agents/universal/`)
   - Framework-agnostic specialists (API, backend, frontend, Tailwind)
   - Fallback when no framework-specific agent exists

4. **Specialized Agents** (`agents/specialized/`)
   - Framework-specific experts organized by technology
   - Subdirectories: nodejs/, firebase/, jayjs/, tailwind/

### Three-Phase Orchestration Workflow (Main Agent Coordinated)

The main Claude agent implements a human-in-the-loop workflow using the tech-lead-orchestrator:

1. **Research Phase**: Tech-lead analyzes requirements and returns structured findings
2. **Approval Gate**: Main agent presents findings and waits for human approval
3. **Planning Phase**: Main agent creates tasks with TodoWrite based on tech-lead's recommendations
4. **Execution Phase**: Main agent invokes specialists sequentially with filtered context

### Agent Communication Protocol

Since sub-agents cannot directly communicate or invoke each other:
- **Structured Returns**: Each agent returns findings in a parseable format
- **Context Passing**: Main agent extracts relevant information from returns
- **Sequential Coordination**: Main agent manages the execution flow
- **Handoff Information**: Agents include what the next specialist needs in their returns

Example return format:
```
## Task Completed: API Design
- Endpoints defined: GET/POST/PUT/DELETE /api/users
- Authentication: Bearer token required
- Next specialist needs: This API specification for implementation
```

### Intelligent Routing

The system automatically routes tasks based on:
1. Project context (detected by project-analyst)
2. Framework-specific routing when applicable
3. Universal fallback for unknown stacks
4. Task requirements and agent expertise

## Key Concepts

### Agent Definition Format
```yaml
---
name: agent-name
description: |
  Expertise description with XML examples
  Examples:
  - <example>
    Context: When to use
    user: "Request"
    assistant: "I'll use agent-name"
    <commentary>Why selected</commentary>
  </example>
# tools: omit for all tools, specify for restrictions
---

# Agent Name
System prompt content...
```

### Ambiguity Detection
- Project-analyst flags uncertainties in analysis
- Tech-lead presents research findings for approval before execution
- Agents should identify assumptions needing clarification

### Tool Inheritance
- Omitting `tools` field = inherit all tools (recommended)
- Specify tools only for security restrictions
- Includes WebFetch, MCP tools when available

## Development Guidelines

1. **Creating New Agents**:
   - Use templates/agent-template.md as starting point
   - Focus on single domain expertise
   - Include 2-3 XML examples
   - Define structured return format

2. **Agent Return Patterns**:
   - Always return findings in structured format
   - Include "Next Steps" or "Handoff Information"
   - Specify what context next specialist needs
   - Main agent will parse and coordinate

3. **Testing Agents**:
   - Test invocation patterns
   - Verify delegation works correctly
   - Ensure quality of output

## Important Files and Patterns

- `docs/orchestration-patterns.md`: Detailed three-phase workflow documentation
- `docs/creating-agents.md`: Guide for creating new agents
- `docs/best-practices.md`: Agent development best practices
- `examples/`: Real-world usage examples
- All agents support human-in-the-loop through the tech-lead's approval gate

## Complete Orchestration Example

Here's a full example showing proper agent routing:

### User Request:
"Help me add a new component to the UI package and update the documentation"

### Step 1: Tech-Lead Analysis
```
Main Agent: "I'll use the tech-lead-orchestrator to analyze this request and determine the best approach."

[Invokes tech-lead-orchestrator]
```

### Step 2: Tech-Lead Returns Routing Map
```
## Agent Routing Map

Task 1: Analyze Current Package Structure
- PRIMARY AGENT: project-analyst
- REASON: Need to understand current package organization

Task 2: Implement UI Component
- PRIMARY AGENT: jayjs-framework-expert
- FALLBACK AGENT: typescript-specialist
- REASON: Jay JS specific component patterns

Task 3: Update Package Exports
- PRIMARY AGENT: npm-package-expert
- REASON: Ensure proper package export structure

Task 4: Update Documentation
- PRIMARY AGENT: documentation-specialist
- REASON: Add examples and usage documentation

## Available Agents for This Project
- project-analyst
- jayjs-framework-expert
- typescript-specialist
- npm-package-expert
- documentation-specialist
- code-reviewer
- lint-specialist
- typecheck-specialist

## CRITICAL INSTRUCTION
Use ONLY the agents listed above. Do NOT use react, vue, angular, or other framework agents.
```

### Step 3: Main Agent Executes Plan
```
Main Agent: "Based on the tech-lead's routing, I'll now coordinate the implementation:"

1. ✓ Using project-analyst to analyze package structure
2. ✓ Using jayjs-framework-expert for component implementation
3. ✓ Using npm-package-expert for export management
4. ✓ Using documentation-specialist for docs update
5. ✓ Using lint-specialist and typecheck-specialist for code quality

[Executes each step with the EXACT agents specified]
```

### What NOT to Do:
```
❌ "I'll use react-component-expert" (wrong framework)
❌ "I'll use backend-developer" (not relevant for this project)
❌ "I'll skip the tech-lead and choose agents myself" (bypasses routing)
```

## Code Quality Assurance Agents

### CRITICAL: Mandatory Code Quality Validation

The project includes specialized agents for ensuring code quality and type safety:

#### lint-specialist
- **Purpose**: Validates code against linting rules using Biome and fixes violations
- **Commands**: `npm run lint` (uses Biome in each package), `npm run build:system:lint` for individual packages
- **Auto-fixes**: Applies Biome auto-fixes and manual corrections for violations
- **Usage**: 
  - **Mandatory**: After completing any coding task
  - **On-demand**: User can request lint validation at any time
  - **Orchestrated**: Tech-lead includes in development workflows

#### typecheck-specialist  
- **Purpose**: Validates TypeScript type safety using `tsc --noEmit`
- **Commands**: `npm run typecheck` in individual packages, `tsc --noEmit --skipLibCheck`
- **Fixes**: Resolves type errors, import issues, and interface violations
- **Usage**:
  - **Mandatory**: MUST be invoked after task completion in orchestrated workflows
  - **On-demand**: Can be invoked manually for type validation
  - **Blocking**: Code should not proceed if critical type errors exist

### Quality Assurance Workflow

```markdown
## Standard Task Completion Flow
1. Complete implementation task
2. Run lint-specialist (automatically fixes most issues)
3. Run typecheck-specialist (validates type safety)
4. Only proceed when both agents report success

## On-Demand Validation
User: "Check code quality"
Assistant: Uses both lint-specialist and typecheck-specialist
```

### Integration with Orchestration

The tech-lead-orchestrator automatically includes these agents in task planning:

```yaml
# Example agent routing includes quality assurance
Task N-1: Implement Feature
- PRIMARY AGENT: [feature-specific-agent]

Task N: Validate Code Quality  
- PRIMARY AGENT: lint-specialist
- REASON: Ensure code passes linting standards

Task N+1: Validate Type Safety
- PRIMARY AGENT: typecheck-specialist  
- REASON: Mandatory type checking after implementation
```

### User Commands for Manual Validation

```bash
# Request linting validation
"Run lint check" → Invokes lint-specialist

# Request type checking
"Check TypeScript types" → Invokes typecheck-specialist

# Request both quality checks
"Validate code quality" → Invokes both specialists in sequence
```

## Critical Reminders

- ALWAYS use tech-lead-orchestrator for multi-step tasks to get proper agent routing
- FOLLOW the agent routing map exactly - do not improvise
- USE deep reasoning when coordinating the recommended agents
- TRUST the tech-lead's expertise in agent selection
- **MANDATORY**: Run lint-specialist and typecheck-specialist after completing coding tasks
- **PACKAGE FOCUS**: Prioritize package development over documentation - docs support the packages
- **NPM PUBLISHING**: Ensure all changes maintain proper package export structure
- **NO BACKEND**: This is a client-side framework - avoid server-side patterns