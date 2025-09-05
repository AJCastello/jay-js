# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SaaS monorepo managed with NX, consisting of a TypeScript-based backend and multiple frontend applications. The project uses Google Firebase as its infrastructure (Auth, Firestore, Cloud Functions, Realtime DB, Messaging, Storage, Hosting).

## Architecture

- **Monorepo Management**: NX
- **Backend**: Node.js with TypeScript and ExpressJS (`apps/server`)
- **Packages**: 4 separate applications in `apps/web/`:
  - `site` - Landing pages and one-page sites
  - `blog` - Blog application
  - `app` - Public access application
  - `dashboard` - Administrative area
	- `support` - Support tutorials area
- **Frontend Stack**: Vite, TypeScript Vanilla, TailwindCSS with DaisyUI, Jay JS framework
- **Database**: Firebase Firestore (NoSQL) - All data modeling must follow NoSQL patterns
- **Shared Code**: `shared/` directory contains modules, components, types, and utilities

## Development Commands

## Code Conventions

- **Types**: Prefix with `T`, e.g., `export type TPerson`
- **Enums**: UPPERCASE_SNAKE_CASE, e.g., `PERSON_GENDER { MALE = 'MALE' }`
- **Functions**: camelCase, e.g., `getPersonById`
- **Component Functions**: PascalCase, e.g., `PersonProfileComponent`
- **Properties for queries/filters**: Use enums
- **No "key" property** in components
- **No code comments** unless explicitly requested
- **Internationalization**: All user-facing text in frontend must use the translation function `t("Text here")` where the text is in English and serves as the translation key

## Database/NoSQL Guidelines

- **Database Type**: Firebase Firestore (NoSQL document database)
- **Data Modeling**: Must follow NoSQL patterns and denormalization principles
- **Collections**: Use singular nouns (e.g., `user`, `product`, `order`)
- **Document Structure**: Flatten data structures when possible to avoid deep nesting
- **Relationships**: Use subcollections, document references, or denormalized data based on access patterns
- **Queries**: Design data structure around query requirements (query-driven modeling)
- **Security**: Use Firestore Security Rules for access control

## Frontend Architecture - Resource-Oriented Modules

### CRITICAL: Domain Layer Structure

All frontend applications follow a **resource-oriented modules architecture**:

```
src/
├── contexts/
├── pages/
├── components/
├── modules/          ← DOMAIN LOGIC LAYER (resource-oriented)
│   ├── user/
│   │   ├── user.types.ts      ← exports from @shared/types/user.types
│   │   ├── user.dto.ts        ← data transformation objects
│   │   ├── user.schemas.ts    ← validation schemas
│   │   ├── user.repository.ts ← data access layer (Firebase/API)
│   │   ├── user.service.ts    ← business logic layer
│   │   ├── user.store.ts      ← state management layer
│   │   └── user.utils.ts      ← resource-specific utilities
│   ├── order/
│   │   ├── order.types.ts     ← exports from @shared/types/order.types
│   │   ├── order.dto.ts
│   │   ├── order.schemas.ts
│   │   ├── order.repository.ts
│   │   ├── order.service.ts
│   │   ├── order.store.ts
│   │   └── order.utils.ts
│   └── [resource-name]/
└── other-folders/
```

### Module Layer Responsibilities

1. **[resource].types.ts**: Re-exports types from `@shared/types/[resource].types`
2. **[resource].dto.ts**: Data transformation objects for API/Firebase communication
3. **[resource].schemas.ts**: Zod validation schemas
4. **[resource].repository.ts**: Data access layer - Firebase SDK or API operations
5. **[resource].service.ts**: Business logic layer - orchestrates repository + store
6. **[resource].store.ts**: State management for the resource
7. **[resource].utils.ts**: Resource-specific utility functions and enum details

### CRITICAL: Data Access Architecture Decision

**Before implementing any resource, the tech-lead-orchestrator MUST determine the data access pattern:**

#### Option 1: Firebase SDK Direct (Frontend Only)
- **Repository Layer**: Uses Firebase Modular SDK directly
- **No REST API**: All persistence handled by Firebase SDK in frontend
- **Agent Required**: firebase-architect (for Firestore modeling)
- **Agent NOT Required**: api-architect
- **Use Case**: Simple CRUD operations, real-time data, standard Firebase patterns

#### Option 2: Cloud Functions REST API (Hybrid)
- **Repository Layer**: Makes HTTP calls to Cloud Functions endpoints
- **REST API**: Custom endpoints in `apps/server` (Cloud Functions)
- **Agents Required**: firebase-architect + api-architect + nodejs-backend-expert
- **Use Case**: Complex business logic, data validation, integration with external services

#### Decision Criteria
The tech-lead MUST analyze:
1. **Business Logic Complexity**: Simple CRUD → Firebase SDK; Complex logic → Cloud Functions
2. **Data Validation Needs**: Client validation only → Firebase SDK; Server validation → Cloud Functions  
3. **External Integrations**: None → Firebase SDK; Required → Cloud Functions
4. **Real-time Requirements**: High → Firebase SDK; Standard → Either approach
5. **Security Rules Complexity**: Simple → Firebase SDK; Complex → Cloud Functions

#### Agent Routing Impact
```yaml
# Firebase SDK Direct Pattern
agents_required:
  - firebase-architect  # Firestore modeling + security rules
  - jayjs-domain-expert # Repository with Firebase SDK calls

# Cloud Functions REST API Pattern  
agents_required:
  - api-architect       # REST endpoint design
  - firebase-architect  # Firestore modeling
  - nodejs-backend-expert # Cloud Functions implementation
  - jayjs-domain-expert # Repository with HTTP calls
```

### Type System Rules

- **MANDATORY**: All types MUST be defined in `shared/types/[resource].types.ts`
- **Module types**: Each module's `[resource].types.ts` ONLY re-exports from shared
- **Single source of truth**: Types are centralized in the shared directory
- **Import pattern**: `export * from "@shared/types/[resource].types"`

### Implementation Requirements

**When implementing any module functionality:**

1. **Check shared types first**: Always read from `shared/types/` before creating types
2. **Follow layer separation**: Service orchestrates repository + store, repository handles data access
3. **Consistent naming**: Use `[resource].[layer].ts` pattern
4. **Resource-oriented**: Group by business domain/resource, not by technical layer
5. **Internationalization**: All user-facing text must be wrapped with `t("English text")` function for translation support

### Service Layer Pattern

Services follow dependency injection pattern:
```typescript
function create[Resource]Service(
  store: ReturnType<typeof create[Resource]Store>,
  repository: ReturnType<typeof create[Resource]Repository>,
) {
  return Object.assign(store, {
    // business logic methods here
  });
}
```

### Resource Utilities Pattern (CRITICAL)

**MANDATORY**: Resource-specific utilities must be created in `[resource].utils.ts` within each module.

#### When to Create Resource Utils

1. **Enum Details**: Functions that provide additional information about enum values
2. **Resource-Specific Calculations**: Math functions exclusive to the resource domain
3. **UI Helper Functions**: Resource-specific formatters, labels, icons, colors
4. **Business Logic Utilities**: Domain-specific pure functions

#### Implementation Rules

1. **Check Shared Utils First**: Always search `shared/utils/` before creating resource-specific utilities
2. **Resource-Exclusive Only**: Only create in resource utils if functionality is domain-specific
3. **Centralization**: All resource utilities in single `[resource].utils.ts` file
4. **Pure Functions**: Utils should be stateless and testable

#### Example Implementation

```typescript
// modules/fruit/fruit.utils.ts
import { FRUIT } from './fruit.types';

export const fruitUtils = {
  getFruitDetails(fruit: FRUIT) {
    switch (fruit) {
      case FRUIT.APPLE:
        return { label: 'Apple', color: 'red', icon: AppleIcon };
      case FRUIT.BANANA:
        return { label: 'Banana', color: 'yellow', icon: BananaIcon };
      default:
        return { label: 'Unknown', color: 'gray', icon: DefaultIcon };
    }
  },

  calculateFruitNutrition(fruit: FRUIT, quantity: number) {
    // Resource-specific calculation logic
  },

  getFruitSeasonality(fruit: FRUIT) {
    // Domain-specific business logic
  },
};
```

#### Usage Pattern

```typescript
// In components or other modules
import { fruitUtils } from '@dashboard/modules/fruit/fruit.utils';

const fruitDetails = fruitUtils.getFruitDetails(FRUIT.APPLE);
// Returns: { label: 'Apple', color: 'red', icon: AppleIcon }
```

#### Utility Organization Priority

1. **Global/Shared**: Use `shared/utils/` for generic, reusable functions
2. **Resource-Specific**: Use `modules/[resource]/[resource].utils.ts` for domain-exclusive functions
3. **Component-Local**: Only for single-use, component-specific helpers

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
- nodejs-backend-expert: Node.js/Express tasks
- firebase-architect: Firebase integration tasks
- jayjs-frontend-developer: Jay JS framework UI
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
"Help me build an authentication system for my Firebase web app"

### Step 1: Tech-Lead Analysis
```
Main Agent: "I'll use the tech-lead-orchestrator to analyze this request and determine the best approach."

[Invokes tech-lead-orchestrator]
```

### Step 2: Tech-Lead Returns Routing Map
```
## Agent Routing Map

Task 1: Detect Project Technology
- PRIMARY AGENT: project-analyst
- REASON: Need to identify framework for proper routing

Task 2: Design Authentication Schema
- PRIMARY AGENT: database-architect
- REASON: Framework-agnostic database design

Task 3: Implement Auth Backend
- PRIMARY AGENT: nodejs-backend-expert
- FALLBACK AGENT: backend-developer
- REASON: Node.js/Express detected in project

Task 4: Create Firebase Auth Integration
- PRIMARY AGENT: firebase-architect
- FALLBACK AGENT: api-architect
- REASON: Firebase Auth integration patterns

## Available Agents for This Project
- project-analyst
- firebase-architect
- nodejs-backend-expert
- jayjs-frontend-developer
- jayjs-domain-expert
- jayjs-context-expert
- code-reviewer

## CRITICAL INSTRUCTION
Use ONLY the agents listed above. Do NOT use django, laravel, rails, react, vue, or other framework agents.
```

### Step 3: Main Agent Executes Plan
```
Main Agent: "Based on the tech-lead's routing, I'll now coordinate the implementation:"

1. ✓ Using project-analyst to analyze the codebase
2. ✓ Using firebase-architect for auth design
3. ✓ Using nodejs-backend-expert for implementation
4. ✓ Using jayjs-frontend-developer for UI integration
5. ✓ Using code-reviewer for security audit

[Executes each step with the EXACT agents specified]
```

### What NOT to Do:
```
❌ "I'll use backend-developer" (when tech-lead specified nodejs-backend-expert)
❌ "I'll use nestjs-api-developer" (wrong framework)
❌ "I'll skip the tech-lead and choose agents myself" (bypasses routing)
```

## Code Quality Assurance Agents

### CRITICAL: Mandatory Code Quality Validation

The project includes specialized agents for ensuring code quality and type safety:

#### lint-specialist
- **Purpose**: Validates code against linting rules and fixes violations
- **Commands**: `npm run lint`, `nx run-many -t lint --parallel=3`  
- **Auto-fixes**: Applies `--fix` flags and manual corrections for lint violations
- **Usage**: 
  - **Mandatory**: After completing any coding task
  - **On-demand**: User can request lint validation at any time
  - **Orchestrated**: Tech-lead includes in development workflows

#### typecheck-specialist  
- **Purpose**: Validates TypeScript type safety using `tsc --noEmit`
- **Commands**: `tsc --noEmit` with appropriate configuration files
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