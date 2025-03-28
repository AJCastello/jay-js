# Form Management System

A comprehensive, type-safe form management system for JavaScript applications with built-in validation, state management, and DOM integration.

## Table of Contents

- [Installation](#installation)
- [Overview](#overview)
- [Basic Usage](#basic-usage)
- [API Reference](#api-reference)
  - [useForm](#useform)
  - [Validation](#validation)
    - [Zod Validation](#zod-validation)
    - [Yup Validation](#yup-validation)
    - [Custom Validation](#custom-validation)
  - [Form State](#form-state)
  - [Error Handling](#error-handling)
  - [Event Handling](#event-handling)
- [Advanced Usage](#advanced-usage)
  - [Dynamic Forms](#dynamic-forms)
  - [Form Arrays](#form-arrays)
  - [Nested Objects](#nested-objects)
  - [Conditional Validation](#conditional-validation)
- [Examples](#examples)
  - [Login Form](#login-form)
  - [Registration Form](#registration-form)
  - [Multi-step Form](#multi-step-form)
- [Performance Optimization](#performance-optimization)
- [Browser Compatibility](#browser-compatibility)
- [TypeScript Integration](#typescript-integration)

## Installation

```bash
npm install @jay-js/system
```

## Overview

The Form Management System is a powerful utility for handling forms in JavaScript applications. It provides:

- Type-safe form state management
- Integration with DOM elements
- Flexible validation with popular validation libraries
- Built-in error handling and display
- Event subscription for form changes and submissions

This system simplifies form handling while maintaining flexibility and performance, making it suitable for both simple and complex form requirements.

## Basic Usage

Here's a simple example of how to use the form system:

```javascript
import { useForm, zodResolver } from '@jay-js/system/forms';
import { z } from 'zod';

// Define your form validation schema
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

// Initialize the form with default values and a resolver
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

// Apply form registration to elements
Object.assign(emailInput, form.register('email'));
Object.assign(passwordInput, form.register('password'));

// Handle form errors
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

emailError.appendChild(form.formState.errors('email'));
passwordError.appendChild(form.formState.errors('password'));

// Handle form submission
loginForm.addEventListener('submit', form.onSubmit((event, data) => {
  console.log('Form submitted with:', data);
  // Submit data to server
}));
```

## API Reference

### useForm

The main entry point for creating a form instance.

```typescript
function useForm<T>({
  defaultValues,
  resolver
}: {
  defaultValues: T;
  resolver?: TResolver<T>;
}): IUseForm<T>
```

**Parameters:**
- `defaultValues`: Initial values for the form fields
- `resolver`: (Optional) A validation function to validate form values

**Returns:**
An object with the following properties:
- `register`: Function to register form elements
- `formState`: Object for managing form state
- `onChange`: Function to subscribe to form value changes
- `onSubmit`: Function to handle form submissions
- `onErrors`: Function to subscribe to validation errors

### Validation

The form system supports multiple validation approaches.

#### Zod Validation

```javascript
import { useForm, zodResolver } from '@jay-js/system/forms';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name is too short'),
  age: z.number().min(18, 'Must be at least 18 years old')
});

const form = useForm({
  defaultValues: { name: '', age: 0 },
  resolver: zodResolver(schema)
});
```

#### Yup Validation

```javascript
import { useForm, yupResolver } from '@jay-js/system/forms';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required')
});

const form = useForm({
  defaultValues: { name: '', email: '' },
  resolver: yupResolver(schema)
});
```

#### Custom Validation

You can also create custom validation logic:

```javascript
import { useForm } from '@jay-js/system/forms';

const customResolver = async (values) => {
  const errors = [];
  
  if (!values.username) {
    errors.push({ path: 'username', message: 'Username is required' });
  }
  
  if (values.password.length < 8) {
    errors.push({ path: 'password', message: 'Password is too short' });
  }
  
  return { errors };
};

const form = useForm({
  defaultValues: { username: '', password: '' },
  resolver: customResolver
});
```

### Form State

The `formState` object provides methods to interact with and manage the form state:

```javascript
// Get current value of a field
const currentEmail = form.formState.getValue('email');

// Get all current form values
const formData = form.formState.getValues();

// Set a single field value
form.formState.setValue('email', 'user@example.com');

// Set multiple field values
form.formState.setValues({
  email: 'user@example.com',
  name: 'John Doe'
});

// Check form or field validity
const isFormValid = await form.formState.isValid();
const isEmailValid = await form.formState.isValid('email');

// Set a specific error
form.formState.setError('email', 'This email is already registered');

// Get all current errors
const errors = form.formState.getErrors();
```

### Error Handling

The form system automatically manages error states and provides tools to handle and display errors:

```javascript
// Access field-specific errors for DOM integration
const emailErrorElement = form.formState.errors('email');
document.getElementById('email-error').appendChild(emailErrorElement);

// Set custom errors
form.formState.setError('username', 'This username is taken');

// Reset all errors
form.formState.setErrors({ errors: [] });

// Listen for validation errors
form.onErrors((errors) => {
  console.log('Validation errors:', errors);
});
```

### Event Handling

The form system provides event handlers for common form interactions:

```javascript
// Listen for form value changes
form.onChange((values) => {
  console.log('Form values changed:', values);
});

// Handle form submission with validation
const submitHandler = form.onSubmit((event, data) => {
  console.log('Valid form submitted:', data);
  // Submit to server
});

// Attach the submit handler to a form
document.getElementById('my-form').addEventListener('submit', submitHandler);
```

## Advanced Usage

### Dynamic Forms

For dynamic forms with fields that can be added or removed:

```javascript
// Add a new item to a dynamic list
const addListItem = () => {
  const currentItems = form.formState.getValue('items');
  form.formState.setValue('items', [...currentItems, { name: '', value: '' }]);
};

// Remove an item from a list
const removeItem = (index) => {
  const currentItems = form.formState.getValue('items');
  const newItems = currentItems.filter((_, i) => i !== index);
  form.formState.setValue('items', newItems);
};
```

### Form Arrays

Working with arrays of form fields:

```javascript
// Initial form with array values
const form = useForm({
  defaultValues: {
    users: [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 }
    ]
  }
});

// Register array fields (example with dynamic rendering)
users.forEach((user, index) => {
  const nameInput = document.getElementById(`user-${index}-name`);
  const ageInput = document.getElementById(`user-${index}-age`);
  
  // Register nested fields
  Object.assign(nameInput, form.register(`users.${index}.name`));
  Object.assign(ageInput, form.register(`users.${index}.age`));
});
```

### Nested Objects

Working with deeply nested form structures:

```javascript
const form = useForm({
  defaultValues: {
    user: {
      profile: {
        firstName: '',
        lastName: '',
        address: {
          street: '',
          city: '',
          zipCode: ''
        }
      }
    }
  }
});

// Register nested fields
Object.assign(
  document.getElementById('firstName'),
  form.register('user.profile.firstName')
);

Object.assign(
  document.getElementById('street'),
  form.register('user.profile.address.street')
);
```

### Conditional Validation

Implementing conditional validation rules:

```javascript
const signupSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  newsletter: z.boolean(),
  phoneNumber: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
}).refine((data) => {
  // If newsletter is checked, phone is required
  if (data.newsletter && !data.phoneNumber) {
    return false;
  }
  return true;
}, {
  message: 'Phone number is required for newsletter subscription',
  path: ['phoneNumber']
});
```

## Examples

### Login Form

```javascript
import { useForm, zodResolver } from '@jay-js/system/forms';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional()
});

function initLoginForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    resolver: zodResolver(loginSchema)
  });

  // Register form elements
  const elements = {
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    rememberMe: document.getElementById('remember-me')
  };

  Object.assign(elements.email, form.register('email'));
  Object.assign(elements.password, form.register('password'));
  Object.assign(elements.rememberMe, form.register('rememberMe'));

  // Show errors
  const errorElements = {
    email: document.getElementById('email-error'),
    password: document.getElementById('password-error')
  };

  errorElements.email.appendChild(form.formState.errors('email'));
  errorElements.password.appendChild(form.formState.errors('password'));

  // Form submission
  document.getElementById('login-form').addEventListener(
    'submit',
    form.onSubmit((_, data) => {
      // Submit login data to server
      console.log('Login data:', data);
    })
  );
}
```

### Registration Form

```javascript
// See the full API documentation for more complex examples
```

### Multi-step Form

```javascript
// See the full API documentation for more complex examples
```

## Performance Optimization

The form system is designed to be performant, but for large forms, consider:

- Only validating fields on blur or submit rather than on every input
- Using memoization for complex validation logic
- Breaking large forms into smaller, manageable subforms

## Browser Compatibility

The form system works in all modern browsers. For IE11 support, you may need to provide appropriate polyfills.

## TypeScript Integration

The form system is built with TypeScript and provides full type safety:

```typescript
interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const form = useForm<LoginForm>({
  defaultValues: {
    email: '',
    password: '',
    rememberMe: false
  }
});

// Type-safe access to form fields
const email = form.formState.getValue('email'); // string
form.formState.setValue('rememberMe', true); // boolean
```