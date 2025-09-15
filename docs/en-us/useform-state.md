---
category: Form Management
categoryId: 3
articleId: 3
slug: useform-state
title: Form State Management
description: Learn how to work with form state to access, update, and track form values and errors.
---

# Form State Management

## API Reference

### Form State Methods

```typescript
// Type definition of form state
interface TFormState<T> {
  // Access and update values
  getValue: <K extends keyof T>(path: K) => T[K];
  getValues: () => T;
  setValue: <K extends keyof T>(path: K, value: T[K]) => void;
  setValues: (values: Partial<T>) => void;
  
  // Error handling
  errors: (path: keyof T) => HTMLElement | Text;
  getErrors: () => TFormValidateResult;
  setError: (field: keyof T, message: string) => void;
  setErrors: (errors: TFormValidateResult) => void;
  
  // Validation
  isValid: (path?: keyof T) => Promise<boolean>;
}
```

### Accessing the Form State

```typescript
// Create a form
const form = useForm({
  defaultValues: {
    username: '',
    email: '',
    age: 0
  }
});

// Access the form state
const formState = form.formState;
```

## Overview

The form state is a central part of the form management system. It provides methods to:

1. Access current form values
2. Update form values programmatically
3. Handle and display validation errors
4. Check form validity

All these operations are performed through the `formState` property of the form object.

## Accessing Form Values

### Getting a Single Field Value

To get the current value of a single field:

```javascript
// Get a specific field value
const email = form.formState.getValue('email');
console.log('Current email:', email);

// For nested fields, use the full path
const city = form.formState.getValue('address.city');
```

### Getting All Form Values

To get all current form values as an object:

```javascript
// Get all form values
const formData = form.formState.getValues();
console.log('All form data:', formData);
```

## Updating Form Values

### Setting a Single Field Value

To update the value of a single field:

```javascript
// Set a specific field value
form.formState.setValue('email', 'user@example.com');

// For nested values
form.formState.setValue('address.city', 'New York');
```

This will:
1. Update the internal form state
2. Update the corresponding DOM element (if registered)
3. Trigger validation for the updated field (if a resolver is provided)

### Setting Multiple Field Values

To update multiple fields at once:

```javascript
// Set multiple values
form.formState.setValues({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com'
});
```

This is useful for:
- Initializing a form with data from an API
- Resetting a form to a specific state
- Applying saved or default values

## Error Handling

### Displaying Field Errors

The form state provides an easy way to display validation errors:

```javascript
// Get an element to display errors
const emailErrorContainer = document.getElementById('email-error');

// Append the error text node to the container
emailErrorContainer.appendChild(form.formState.errors('email'));
```

The `errors` method returns a DOM text node that:
- Is automatically updated when validation errors change
- Shows the error message when a field is invalid
- Shows nothing when the field is valid

### Getting All Errors

To get the current validation errors as an object:

```javascript
// Get all current errors
const errors = form.formState.getErrors();
console.log('Current errors:', errors);
// Example output: { errors: [{ path: 'email', message: 'Invalid email' }] }
```

### Setting Errors Manually

You can set validation errors manually:

```javascript
// Set a single error
form.formState.setError('username', 'This username is already taken');

// Set multiple errors
form.formState.setErrors({
  errors: [
    { path: 'email', message: 'This email is invalid' },
    { path: 'password', message: 'Password must be stronger' }
  ]
});
```

This is useful for:
- Displaying server-side validation errors
- Implementing custom validation logic
- Showing non-field errors (like form-level errors)

## Checking Validity

### Checking the Entire Form

To check if the entire form is valid:

```javascript
const isFormValid = await form.formState.isValid();
if (isFormValid) {
  // Proceed with submission
  submitForm(form.formState.getValues());
} else {
  // Show a general error message
  showErrorMessage('Please correct the errors in the form');
}
```

### Checking a Specific Field

To check if a specific field is valid:

```javascript
const isEmailValid = await form.formState.isValid('email');
if (isEmailValid) {
  // Field-specific logic
  verifyEmailAvailability(form.formState.getValue('email'));
}
```

## Practical Example

Here's an example of working with form state to create a dynamic form:

```javascript
import { useForm, zodResolver } from '@jay-js/system';
import { z } from 'zod';

// Define validation schema
const userSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

function initUserForm() {
  // Create form
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    resolver: zodResolver(userSchema)
  });
  
  // Register elements
  const elements = {
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword')
  };
  
  Object.assign(elements.email, form.register('email'));
  Object.assign(elements.password, form.register('password'));
  Object.assign(elements.confirmPassword, form.register('confirmPassword'));
  
  // Display errors
  const errorContainers = {
    email: document.getElementById('email-error'),
    password: document.getElementById('password-error'),
    confirmPassword: document.getElementById('confirm-password-error')
  };
  
  errorContainers.email.appendChild(form.formState.errors('email'));
  errorContainers.password.appendChild(form.formState.errors('password'));
  errorContainers.confirmPassword.appendChild(form.formState.errors('confirmPassword'));
  
  // Fill form with saved data
  const savedUser = localStorage.getItem('savedUser');
  if (savedUser) {
    try {
      const userData = JSON.parse(savedUser);
      // Don't fill password fields from saved data for security
      form.formState.setValue('email', userData.email || '');
    } catch (e) {
      console.error('Failed to parse saved user data', e);
    }
  }
  
  // Check password strength in real-time
  form.onChange(data => {
    const password = data.password;
    const strengthMeter = document.getElementById('password-strength');
    
    if (password.length === 0) {
      strengthMeter.textContent = '';
    } else if (password.length < 8) {
      strengthMeter.textContent = 'Weak';
      strengthMeter.className = 'strength-weak';
    } else if (password.length < 12) {
      strengthMeter.textContent = 'Medium';
      strengthMeter.className = 'strength-medium';
    } else {
      strengthMeter.textContent = 'Strong';
      strengthMeter.className = 'strength-strong';
    }
  });
  
  // Form submission
  document.getElementById('user-form').addEventListener('submit', 
    form.onSubmit(async (event, data) => {
      // Show loading state
      const submitButton = event.target.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Submitting...';
      submitButton.disabled = true;
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check for existing email (simulated)
        if (data.email === 'test@example.com') {
          form.formState.setError('email', 'This email is already registered');
          return;
        }
        
        // Success - save and redirect
        localStorage.setItem('savedUser', JSON.stringify({ email: data.email }));
        window.location.href = '/success';
      } catch (error) {
        // Show general error
        alert('Failed to create account: ' + error.message);
      } finally {
        // Restore button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    })
  );
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initUserForm);
```

This example demonstrates:
- Accessing and updating form values
- Displaying validation errors
- Setting custom errors based on server responses
- Checking field validity
- Real-time form state monitoring for UI updates

The form state provides a powerful API for building interactive, reactive forms with clean, maintainable code. 