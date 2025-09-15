---
category: Form Management
categoryId: 3
articleId: 1
slug: useform-overview
title: Form Management Overview
description: Introduction to the useForm system for managing form state, validation, and DOM integration.
---

# Form Management

## API Reference

### Main Function

```typescript
// Basic usage
const form = useForm({
  defaultValues: {
    email: '',
    password: '',
    rememberMe: false
  },
  resolver?: zodResolver(schema) // Optional
});

// Return value
interface IUseForm<T> {
  register: (path: keyof T, options?: TRegisterOptions) => TRegister;
  formState: TFormState<T>;
  onChange: (callback: (data: T) => void) => void;
  onSubmit: (callback: (ev: Event, data: T) => void) => (ev: SubmitEvent) => void;
  onErrors: (callback: (errors: TFormValidateResult) => void) => void;
}
```

## Overview

The Form Management System is a comprehensive utility for handling forms in JavaScript applications. It provides a type-safe, reactive approach to managing form state, validation, and DOM integration.

## Key Features

- **Type-safe Form State**: Full TypeScript support for your form values
- **DOM Integration**: Easily connect form elements to your form state
- **Validation**: Integration with popular validation libraries like Zod and Yup
- **Error Handling**: Built-in error tracking and display
- **Event Subscriptions**: React to form changes and submissions
- **Flexible**: Works with simple and complex form structures, including nested objects and arrays

## Architecture

The form system is built around several key components:

1. **useForm**: The main function that creates a form management instance
2. **Form State**: Manages and tracks the values and errors in your form
3. **Validation Resolvers**: Connect with validation libraries to validate form data
4. **DOM Registration**: Links HTML form elements to the form state
5. **Event Handlers**: Process form events like submissions and value changes

## Basic Example

Here's a simple example of how to use the form system:

```javascript
import { useForm, zodResolver } from '@jay-js/system';
import { z } from 'zod';

// Define a validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

// Create a form instance
const form = useForm({
  defaultValues: {
    email: '',
    password: ''
  },
  resolver: zodResolver(loginSchema)
});

// Register form elements
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginForm = document.getElementById('login-form');

// Link form elements to form state
Object.assign(emailInput, form.register('email'));
Object.assign(passwordInput, form.register('password'));

// Display validation errors
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

emailError.appendChild(form.formState.errors('email'));
passwordError.appendChild(form.formState.errors('password'));

// Handle form submission
loginForm.addEventListener('submit', form.onSubmit((event, data) => {
  // Process the validated form data
  console.log('Form submitted:', data);
}));
```

This basic example demonstrates how to:
- Create a form with initial values and validation
- Register DOM elements with the form
- Display validation errors
- Handle form submission

The form system takes care of:
- Updating form state when inputs change
- Validating values when they change
- Showing validation errors to the user
- Ensuring only valid data is processed on submission 