# Form Management System

A comprehensive, type-safe form management system for JavaScript applications with built-in validation, state management, and DOM integration.

> **Note:** Previously named `useForm`, now `handleForm` following the framework's naming convention.

## Table of Contents

- [Installation](#installation)
- [Overview](#overview)
- [Basic Usage](#basic-usage)
- [API Reference](#api-reference)
  - [handleForm](#handleform)
  - [Validation](#validation)
    - [Zod Validation](#zod-validation)
    - [Yup Validation](#yup-validation)
    - [Universal Resolver](#universal-resolver)
    - [Standard Schema](#standard-schema)
    - [Custom Validation](#custom-validation)
  - [Form State](#form-state)
  - [Error Handling](#error-handling)
  - [Event Handling](#event-handling)
  - [Validation Utilities](#validation-utilities)
- [Advanced Usage](#advanced-usage)
  - [Dynamic Forms](#dynamic-forms)
  - [Form Arrays](#form-arrays)
  - [Nested Objects](#nested-objects)
  - [Conditional Validation](#conditional-validation)
- [Examples](#examples)
  - [Login Form](#login-form)
  - [Registration Form](#registration-form)
  - [JSX Integration](#jsx-integration)
- [Performance Optimization](#performance-optimization)
- [TypeScript Integration](#typescript-integration)

## Installation

```bash
npm install @jay-js/system
```

## Overview

The Form Management System is a powerful utility for handling forms in JavaScript applications. It provides:

- Type-safe form state management
- Integration with DOM elements
- Flexible validation with popular validation libraries (Yup, Zod, Standard Schema)
- Built-in error handling and display
- Event subscription for form changes and submissions
- Automatic debounced validation
- MutationObserver-based cleanup for removed elements

## Basic Usage

Here's a simple example of how to use the form system:

```typescript
import { handleForm } from "@jay-js/system";

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const form = handleForm<LoginForm>({
  defaultValues: {
    email: "",
    password: "",
    remember: false
  }
});

// Register fields
const emailInput = document.querySelector("#email");
Object.assign(emailInput, form.register("email"));

// Handle submission
const loginForm = document.querySelector("#login-form");
loginForm.onsubmit = form.onSubmit((data, ev) => {
  console.log("Form data:", data);
});
```

## API Reference

### handleForm

The main entry point for creating a form instance.

```typescript
function handleForm<T>(options: TUseFormOptions<T>): TUseForm<T>

type TUseFormOptions<T> = {
  defaultValues: T;
  resolver?: TResolver<T>;
  debounceMs?: number; // Default: 300ms
};
```

**Parameters:**
- `defaultValues`: Initial values for the form fields
- `resolver`: (Optional) A validation function to validate form values
- `debounceMs`: (Optional) Debounce time for validation in milliseconds (default: 300)

**Returns:**
An object with the following properties:
- `register`: Function to register form elements
- `formState`: Object for managing form state
- `onChange`: Function to subscribe to form value changes
- `onSubmit`: Function to handle form submissions
- `onErrors`: Function to subscribe to validation errors
- `destroy`: Function to cleanup resources

### Validation

The form system supports multiple validation approaches.

#### Zod Validation

```typescript
import { handleForm, zodResolver } from "@jay-js/system";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters")
});

const form = handleForm({
  defaultValues: { email: "", password: "" },
  resolver: zodResolver(schema)
});
```

#### Yup Validation

```typescript
import { handleForm, yupResolver } from "@jay-js/system";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(8, "Minimum 8 characters").required("Password is required")
});

const form = handleForm({
  defaultValues: { email: "", password: "" },
  resolver: yupResolver(schema),
  debounceMs: 300 // Validation debounce (default: 300ms)
});
```

#### Universal Resolver

Automatically detects schema type (Yup, Zod, or Standard Schema):

```typescript
import { handleForm, resolver } from "@jay-js/system";

const form = handleForm({
  defaultValues: { email: "" },
  resolver: resolver(anySchema) // Auto-detects schema type
});
```

The universal resolver checks for:
- Standard Schema (`~standard` property)
- Zod (`_def` property and `parseAsync` method)
- Yup (`validate` method)

#### Standard Schema

Support for Standard Schema v1 compatible libraries:

```typescript
import { handleForm, standardSchemaResolver } from "@jay-js/system";

const form = handleForm({
  defaultValues: { email: "" },
  resolver: standardSchemaResolver(standardSchemaCompatibleSchema)
});
```

#### Custom Validation

You can also create custom validation logic:

```typescript
import { handleForm } from "@jay-js/system";
import type { TResolver } from "@jay-js/system";

const customResolver: TResolver<{ username: string; password: string }> = async (values, fieldName?) => {
  const errors = [];

  if (!values.username) {
    errors.push({ path: "username", message: "Username is required" });
  }

  if (values.password.length < 8) {
    errors.push({ path: "password", message: "Password is too short" });
  }

  // Filter by fieldName if provided (for single-field validation)
  if (fieldName) {
    return { errors: errors.filter(e => e.path === fieldName) };
  }

  return { errors };
};

const form = handleForm({
  defaultValues: { username: "", password: "" },
  resolver: customResolver
});
```

### Form State

The `formState` object provides methods to interact with and manage the form state:

```typescript
const form = handleForm({ defaultValues: { name: "", age: 0 } });

// Get/Set values
form.formState.getValue("name");           // Get single value
form.formState.getValues();                // Get all values
form.formState.setValue("name", "John");   // Set single value
form.formState.setValues({ name: "John" }); // Set multiple values

// Error handling
form.formState.errors("email");            // Returns reactive Text node
form.formState.getErrors();                // Get all errors
form.formState.setError("email", "Invalid"); // Set single error
form.formState.setErrors({ errors: [...] }); // Set multiple errors

// Validation
await form.formState.isValid();            // Validate all fields
await form.formState.isValid("email");     // Validate single field

// Reset form
form.formState.reset();                    // Reset to default values
```

### Error Handling

The form system automatically manages error states and provides tools to handle and display errors:

```typescript
// Access field-specific errors for DOM integration
// Returns a reactive Text node that updates automatically
const emailErrorElement = form.formState.errors("email");
document.getElementById("email-error").appendChild(emailErrorElement);

// Set custom errors
form.formState.setError("username", "This username is taken");

// Set multiple errors at once
form.formState.setErrors({
  errors: [
    { path: "email", message: "Invalid email" },
    { path: "password", message: "Too weak" }
  ]
});

// Get all current errors
const errors = form.formState.getErrors();

// Listen for validation errors
form.onErrors((errors) => {
  console.log("Validation errors:", errors);
});
```

### Event Handling

The form system provides event handlers for common form interactions:

```typescript
// Subscribe to value changes
form.onChange((data, errors) => {
  console.log("Values changed:", data);
  if (errors) console.log("Current errors:", errors);
});

// Subscribe to validation errors
form.onErrors((errors) => {
  console.log("Validation errors:", errors);
});

// Handle form submission with validation
loginForm.onsubmit = form.onSubmit((data, event) => {
  console.log("Valid form submitted:", data);
  // Submit to server
});

// Cleanup when done
form.destroy();
```

### Validation Utilities

Helper functions for working with validation results:

```typescript
import { isValidResult, formatError, combineValidationResults } from "@jay-js/system";

// Check if result is valid
if (isValidResult(validationResult)) {
  submitForm(data);
}

// Format a single error
const error = formatError("email", "Invalid email address");
// Returns: { errors: [{ path: "email", message: "Invalid email address" }] }

// Combine multiple validation results
const combined = combineValidationResults(result1, result2, result3);
// Merges all errors arrays into one
```

## Advanced Usage

### Dynamic Forms

For dynamic forms with fields that can be added or removed:

```typescript
// Add a new item to a dynamic list
const addListItem = () => {
  const currentItems = form.formState.getValue("items");
  form.formState.setValue("items", [...currentItems, { name: "", value: "" }]);
};

// Remove an item from a list
const removeItem = (index: number) => {
  const currentItems = form.formState.getValue("items");
  const newItems = currentItems.filter((_, i) => i !== index);
  form.formState.setValue("items", newItems);
};
```

### Form Arrays

Working with arrays of form fields:

```typescript
interface UserForm {
  users: Array<{ name: string; age: number }>;
}

const form = handleForm<UserForm>({
  defaultValues: {
    users: [
      { name: "John", age: 30 },
      { name: "Jane", age: 25 }
    ]
  }
});

// Register array fields (example with dynamic rendering)
users.forEach((user, index) => {
  const nameInput = document.getElementById(`user-${index}-name`);
  const ageInput = document.getElementById(`user-${index}-age`);

  // Register nested fields using dot notation
  Object.assign(nameInput, form.register(`users.${index}.name` as keyof UserForm));
  Object.assign(ageInput, form.register(`users.${index}.age` as keyof UserForm));
});
```

### Nested Objects

Working with deeply nested form structures:

```typescript
interface ProfileForm {
  user: {
    profile: {
      firstName: string;
      lastName: string;
      address: {
        street: string;
        city: string;
        zipCode: string;
      };
    };
  };
}

const form = handleForm<ProfileForm>({
  defaultValues: {
    user: {
      profile: {
        firstName: "",
        lastName: "",
        address: {
          street: "",
          city: "",
          zipCode: ""
        }
      }
    }
  }
});
```

### Conditional Validation

Implementing conditional validation rules with Zod:

```typescript
const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  newsletter: z.boolean(),
  phoneNumber: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
}).refine((data) => {
  // If newsletter is checked, phone is required
  if (data.newsletter && !data.phoneNumber) {
    return false;
  }
  return true;
}, {
  message: "Phone number is required for newsletter subscription",
  path: ["phoneNumber"]
});
```

## Examples

### Login Form

```typescript
import { handleForm, zodResolver } from "@jay-js/system";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional()
});

function initLoginForm() {
  const form = handleForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false
    },
    resolver: zodResolver(loginSchema)
  });

  // Register form elements
  const elements = {
    email: document.getElementById("email"),
    password: document.getElementById("password"),
    rememberMe: document.getElementById("remember-me")
  };

  Object.assign(elements.email, form.register("email"));
  Object.assign(elements.password, form.register("password"));
  Object.assign(elements.rememberMe, form.register("rememberMe"));

  // Show errors
  document.getElementById("email-error").appendChild(form.formState.errors("email"));
  document.getElementById("password-error").appendChild(form.formState.errors("password"));

  // Form submission
  document.getElementById("login-form").onsubmit = form.onSubmit((data, _) => {
    console.log("Login data:", data);
    // Submit to server
  });

  // Cleanup on component unmount
  return () => form.destroy();
}
```

### Registration Form

```typescript
import { handleForm, yupResolver } from "@jay-js/system";
import * as yup from "yup";

const registrationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string()
    .min(8, "Minimum 8 characters")
    .matches(/[A-Z]/, "Must contain uppercase")
    .matches(/[0-9]/, "Must contain number")
    .required("Password is required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  terms: yup.boolean().oneOf([true], "You must accept the terms")
});

const form = handleForm({
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false
  },
  resolver: yupResolver(registrationSchema)
});
```

### JSX Integration

```tsx
import { handleForm, zodResolver } from "@jay-js/system";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters")
});

const LoginForm = () => {
  const form = handleForm({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(loginSchema)
  });

  return (
    <form onsubmit={form.onSubmit((data) => login(data))}>
      <div>
        <label for="email">Email</label>
        <input {...form.register("email")} type="email" id="email" />
        <span class="error">{form.formState.errors("email")}</span>
      </div>

      <div>
        <label for="password">Password</label>
        <input {...form.register("password")} type="password" id="password" />
        <span class="error">{form.formState.errors("password")}</span>
      </div>

      <button type="submit">Login</button>
    </form>
  );
};
```

## Performance Optimization

The form system includes built-in optimizations:

- **Debounced validation**: Validation is debounced to prevent excessive calls (configurable via `debounceMs`)
- **Element caching**: DOM elements are cached for faster access
- **MutationObserver**: Automatically cleans up removed elements
- **WeakMap-based cleanup**: Automatic garbage collection for element references

For additional optimization:

- Use field-level validation (`isValid("fieldName")`) instead of full form validation when possible
- Increase `debounceMs` for complex validation schemas
- Call `destroy()` when the form is no longer needed

## TypeScript Integration

The form system is built with TypeScript and provides full type safety:

```typescript
interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const form = handleForm<LoginForm>({
  defaultValues: {
    email: "",
    password: "",
    rememberMe: false
  }
});

// Type-safe access to form fields
const email = form.formState.getValue("email"); // string
form.formState.setValue("rememberMe", true); // boolean

// Type error: Argument of type '"invalidField"' is not assignable
// form.formState.getValue("invalidField");

// Type error: Argument of type 'string' is not assignable to parameter of type 'boolean'
// form.formState.setValue("rememberMe", "true");
```

### Type Definitions

```typescript
type TResolver<T> = (values: T, fieldName?: string) => Promise<TFormValidateResult>;

type TUseFormOptions<T> = {
  defaultValues: T;
  resolver?: TResolver<T>;
  debounceMs?: number;
};

type TFormValidateResult = {
  errors: Array<{ path: string; message: string }>;
};

type TFormState<T> = {
  errors: (path: keyof T) => HTMLElement | Text;
  setValue: <K extends keyof T>(path: K, value: T[K]) => void;
  setValues: (values: Partial<T>) => void;
  getValue: <K extends keyof T>(path: K) => T[K];
  getValues: () => T;
  isValid: (path?: keyof T) => Promise<boolean>;
  getErrors: () => TFormValidateResult;
  setError: (field: keyof T, message: string) => void;
  setErrors: (errors: TFormValidateResult) => void;
  reset: () => void;
};

type TUseForm<T> = {
  register: (path: keyof T, options?: TRegisterOptions) => TRegister;
  formState: TFormState<T>;
  onChange: (callback: (data: T) => void) => void;
  onSubmit: (callback: (data: T, ev: Event) => void) => (ev: SubmitEvent) => void;
  onErrors: (callback: (errors: TFormValidateResult) => void) => void;
  destroy: () => void;
};
```
