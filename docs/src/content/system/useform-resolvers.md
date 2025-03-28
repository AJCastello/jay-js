---
category: Form Management
categoryId: 3
articleId: 4
slug: useform-resolvers
title: Form Validation Resolvers
description: Learn how to validate forms using Zod, Yup, and custom validation resolvers.
---

# Form Validation Resolvers

## API Reference

### Resolver Types

```typescript
// Resolver type definition
type TResolver<T> = (values: T, fieldName?: string) => Promise<TFormValidateResult>;

// Validation result format
type TFormValidateResult = {
  errors: Array<{ path: string; message: string }>;
};

// Using a resolver with useForm
const form = useForm({
  defaultValues: {...},
  resolver: zodResolver(schema) // or yupResolver or custom resolver
});
```

### Built-in Resolvers

```typescript
// Zod resolver
import { zodResolver } from '@jay-js/system';
import { z } from 'zod';

const schema = z.object({...});
const resolver = zodResolver(schema);

// Yup resolver
import { yupResolver } from '@jay-js/system';
import * as yup from 'yup';

const schema = yup.object({...});
const resolver = yupResolver(schema);
```

## Overview

Validation resolvers are functions that validate form data against a set of rules. They provide a flexible way to implement validation logic, with built-in support for popular validation libraries like Zod and Yup.

## How Resolvers Work

A resolver:
1. Receives the current form values and an optional field name
2. Validates the values against a schema or custom logic
3. Returns a validation result with errors (if any)

The form system uses resolvers to:
- Validate form fields when they change
- Validate the entire form on submission
- Provide error messages for invalid fields

## Using the Zod Resolver

[Zod](https://github.com/colinhacks/zod) is a TypeScript-first schema validation library. To use it:

```javascript
import { useForm, zodResolver } from '@jay-js/system';
import { z } from 'zod';

// Define your validation schema
const loginSchema = z.object({
  email: z.string()
    .email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  rememberMe: z.boolean().optional()
});

// Create a form with Zod validation
const form = useForm({
  defaultValues: {
    email: '',
    password: '',
    rememberMe: false
  },
  resolver: zodResolver(loginSchema)
});
```

### Zod Schema Features

Zod provides powerful validation features:

```javascript
// Advanced schema with relationships between fields
const signupSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password too short'),
  confirmPassword: z.string(),
  terms: z.boolean()
})
.refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'] // Path specifies which field shows the error
})
.refine(data => data.terms === true, {
  message: 'You must accept the terms',
  path: ['terms']
});
```

## Using the Yup Resolver

[Yup](https://github.com/jquense/yup) is another popular validation library:

```javascript
import { useForm, yupResolver } from '@jay-js/system';
import * as yup from 'yup';

// Define your validation schema
const contactSchema = yup.object({
  name: yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup.string()
    .required('Email is required')
    .email('Please enter a valid email'),
  message: yup.string()
    .required('Message is required')
    .min(10, 'Message is too short')
    .max(500, 'Message is too long')
});

// Create a form with Yup validation
const form = useForm({
  defaultValues: {
    name: '',
    email: '',
    message: ''
  },
  resolver: yupResolver(contactSchema)
});
```

### Yup Schema Features

Yup also supports complex validation rules:

```javascript
// Advanced Yup schema
const orderSchema = yup.object({
  items: yup.array().of(
    yup.object({
      productId: yup.string().required('Product ID is required'),
      quantity: yup.number()
        .required('Quantity is required')
        .positive('Quantity must be positive')
        .integer('Quantity must be a whole number')
    })
  ).min(1, 'Order must contain at least one item'),
  shipping: yup.object({
    address: yup.string().required('Address is required'),
    city: yup.string().required('City is required'),
    zipCode: yup.string().required('ZIP code is required')
  }),
  paymentMethod: yup.string()
    .required('Payment method is required')
    .oneOf(['credit', 'debit', 'paypal'], 'Invalid payment method')
});
```

## Creating a Custom Resolver

If Zod and Yup don't meet your needs, you can create a custom resolver:

```javascript
import { useForm } from '@jay-js/system';

// Custom resolver function
const customResolver = async (values, fieldName) => {
  const errors = [];
  
  // If a field name is provided, only validate that field
  if (fieldName) {
    if (fieldName === 'username') {
      if (!values.username) {
        errors.push({ path: 'username', message: 'Username is required' });
      } else if (values.username.length < 3) {
        errors.push({ path: 'username', message: 'Username must be at least 3 characters' });
      }
    }
    
    if (fieldName === 'password') {
      if (!values.password) {
        errors.push({ path: 'password', message: 'Password is required' });
      } else if (values.password.length < 6) {
        errors.push({ path: 'password', message: 'Password must be at least 6 characters' });
      }
    }
  } 
  // Otherwise validate all fields
  else {
    // Username validation
    if (!values.username) {
      errors.push({ path: 'username', message: 'Username is required' });
    } else if (values.username.length < 3) {
      errors.push({ path: 'username', message: 'Username must be at least 3 characters' });
    }
    
    // Password validation
    if (!values.password) {
      errors.push({ path: 'password', message: 'Password is required' });
    } else if (values.password.length < 6) {
      errors.push({ path: 'password', message: 'Password must be at least 6 characters' });
    }
  }
  
  return { errors };
};

// Use the custom resolver
const form = useForm({
  defaultValues: {
    username: '',
    password: ''
  },
  resolver: customResolver
});
```

### Custom Resolver with Async Validation

For validation that requires API calls:

```javascript
const asyncCustomResolver = async (values, fieldName) => {
  const errors = [];
  
  // Only check username if that field is specified or if validating all fields
  if (!fieldName || fieldName === 'username') {
    if (values.username) {
      try {
        // Check if username is available via API
        const response = await fetch(`/api/check-username?username=${values.username}`);
        const data = await response.json();
        
        if (!data.available) {
          errors.push({ 
            path: 'username', 
            message: 'This username is already taken' 
          });
        }
      } catch (error) {
        console.error('Username validation error:', error);
      }
    }
  }
  
  // More validations...
  
  return { errors };
};
```

## Validation Utilities

The form system provides validation utilities to help with common tasks:

```javascript
import { 
  isValidResult, 
  formatError, 
  combineValidationResults 
} from '@jay-js/system';

// Check if a validation result is valid (no errors)
const result = await form.formState.getErrors();
if (isValidResult(result)) {
  console.log('Form is valid!');
}

// Create a formatted error
const emailError = formatError('email', 'This email is invalid');
form.formState.setErrors(emailError);

// Combine multiple validation results
const basicValidation = validateBasicFields(values);
const addressValidation = validateAddress(values);

const combinedResult = combineValidationResults(
  basicValidation,
  addressValidation
);

form.formState.setErrors(combinedResult);
```

## Complete Example

Here's a complete example with Zod validation:

```javascript
import { useForm, zodResolver } from '@jay-js/system';
import { z } from 'zod';

// Define validation schema
const registerSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Include at least one uppercase letter')
    .regex(/[0-9]/, 'Include at least one number')
    .regex(/[^a-zA-Z0-9]/, 'Include at least one special character'),
  confirmPassword: z.string(),
  age: z.number()
    .min(18, 'You must be at least 18 years old')
    .max(120, 'Please enter a valid age'),
  terms: z.boolean()
})
.refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
})
.refine(data => data.terms === true, {
  message: 'You must accept the terms and conditions',
  path: ['terms']
});

function initRegistrationForm() {
  // Create form with validation
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: 18,
      terms: false
    },
    resolver: zodResolver(registerSchema)
  });
  
  // Register form elements
  const formElements = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    age: document.getElementById('age'),
    terms: document.getElementById('terms')
  };
  
  // Apply registration to elements
  Object.entries(formElements).forEach(([field, element]) => {
    Object.assign(element, form.register(field));
  });
  
  // Show validation errors
  const errorElements = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    password: document.getElementById('password-error'),
    confirmPassword: document.getElementById('confirm-password-error'),
    age: document.getElementById('age-error'),
    terms: document.getElementById('terms-error')
  };
  
  // Apply error elements
  Object.entries(errorElements).forEach(([field, element]) => {
    element.appendChild(form.formState.errors(field));
  });
  
  // Handle form submission
  document.getElementById('register-form').addEventListener(
    'submit',
    form.onSubmit(async (event, data) => {
      try {
        // Registration logic...
        console.log('Registration data:', data);
        
        // Show success message
        alert('Registration successful!');
      } catch (error) {
        console.error('Registration error:', error);
      }
    })
  );
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initRegistrationForm);
```

Validation resolvers make it easy to implement complex validation rules while keeping your form handling code clean and maintainable. 