---
category: Form Management
categoryId: 3
articleId: 2
slug: useform-basic
title: Basic Form Usage
description: Learn how to create and use basic forms with the useForm system.
---

# Basic Form Usage

## API Reference

### Creating a Form

```typescript
// Import the necessary functions
import { useForm } from '@jay-js/system';

// Create a form with default values
const form = useForm({
  defaultValues: {
    username: '',
    password: '',
    rememberMe: false
  }
});
```

### Registering Form Elements

```typescript
// Register a text input
const textInput = form.register('username');
// { name: 'username', onchange: Function, oninput: Function, value: '' }

// Register a checkbox
const checkboxInput = form.register('rememberMe');
// { name: 'rememberMe', onchange: Function, oninput: Function, checked: false }

// Apply to HTML elements
Object.assign(document.getElementById('username'), form.register('username'));
Object.assign(document.getElementById('rememberMe'), form.register('rememberMe'));
```

### Handling Submission

```typescript
// Create a submit handler
const submitHandler = form.onSubmit((event, data) => {
  console.log('Form submitted with:', data);
});

// Apply to form element
document.getElementById('myForm').addEventListener('submit', submitHandler);
```

## Basic Form Creation

The `useForm` function is the entry point for creating a form management instance. At minimum, it requires a set of default values to initialize the form state.

```javascript
import { useForm } from '@jay-js/system';

// Create a simple form
const form = useForm({
  defaultValues: {
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    subscribe: false
  }
});
```

In this example, we create a form with five fields of different types: strings, a number, and a boolean.

## Connecting Form Elements

After creating a form instance, you need to connect HTML form elements to the form state. This is done using the `register` method:

```javascript
// Get references to form elements
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const ageInput = document.getElementById('age');
const subscribeCheckbox = document.getElementById('subscribe');

// Register the form elements
Object.assign(firstNameInput, form.register('firstName'));
Object.assign(lastNameInput, form.register('lastName'));
Object.assign(emailInput, form.register('email'));
Object.assign(ageInput, form.register('age'));
Object.assign(subscribeCheckbox, form.register('subscribe'));
```

The `register` method returns an object with properties that:
- Set the element's name attribute
- Add change and input event handlers
- Set the initial value or checked state

This creates a two-way binding between the form elements and the form state.

## Different Input Types

The form system automatically handles different types of form inputs:

### Text Inputs

```javascript
// Text inputs get a 'value' property
const emailInput = document.getElementById('email');
Object.assign(emailInput, form.register('email'));
```

### Checkboxes

```javascript
// Checkboxes get a 'checked' property
const subscribeCheckbox = document.getElementById('subscribe');
Object.assign(subscribeCheckbox, form.register('subscribe'));
```

### Radio Buttons

```javascript
// For radio buttons, register each one with the same field name
const radioMale = document.getElementById('genderMale');
const radioFemale = document.getElementById('genderFemale');

Object.assign(radioMale, form.register('gender'));
Object.assign(radioFemale, form.register('gender'));
```

### Select Elements

```javascript
// Select elements work with both single and multiple selections
const countrySelect = document.getElementById('country');
Object.assign(countrySelect, form.register('country'));

// For multi-select, the value will be an array
const interestsSelect = document.getElementById('interests');
Object.assign(interestsSelect, form.register('interests'));
```

## Handling Form Submission

To handle form submission, use the `onSubmit` method:

```javascript
// Create a form element reference
const formElement = document.getElementById('userForm');

// Add the submit handler
formElement.addEventListener('submit', form.onSubmit((event, data) => {
  // This callback is only called if validation passes
  console.log('Form submitted with data:', data);
  
  // Send data to server
  fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}));
```

The `onSubmit` method:
1. Prevents the default form submission behavior
2. Validates the form data (if a resolver is provided)
3. Calls your callback only if validation passes
4. Provides the event and validated form data

## Complete Basic Example

Here's a complete example of a simple registration form:

```javascript
import { useForm } from '@jay-js/system';

function initRegistrationForm() {
  // Create the form
  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      age: 18,
      newsletter: false
    }
  });
  
  // Register form elements
  const elements = {
    fullName: document.getElementById('fullName'),
    email: document.getElementById('email'),
    age: document.getElementById('age'),
    newsletter: document.getElementById('newsletter')
  };
  
  Object.assign(elements.fullName, form.register('fullName'));
  Object.assign(elements.email, form.register('email'));
  Object.assign(elements.age, form.register('age'));
  Object.assign(elements.newsletter, form.register('newsletter'));
  
  // Handle form submission
  const formElement = document.getElementById('registrationForm');
  formElement.addEventListener('submit', form.onSubmit((event, data) => {
    console.log('Registration data:', data);
    
    // Example server submission
    submitToServer(data)
      .then(() => {
        showSuccessMessage('Registration successful!');
        formElement.reset();
      })
      .catch(error => {
        showErrorMessage('Registration failed: ' + error.message);
      });
  }));
  
  // Optional: Track form changes
  form.onChange((data) => {
    console.log('Form values changed:', data);
    // You could enable/disable the submit button based on form values
    document.getElementById('submitButton').disabled = !data.fullName || !data.email;
  });
}

// Initialize the form when the DOM is loaded
document.addEventListener('DOMContentLoaded', initRegistrationForm);
```

This example demonstrates:
1. Creating a form with default values
2. Registering form elements of different types
3. Handling form submission
4. Tracking form value changes

Without adding validation yet, this provides a clean way to manage form state and handle submissions. In the next articles, we'll cover validation, error handling, and more advanced features. 