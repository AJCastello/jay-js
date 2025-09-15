---
category: Form Management
categoryId: 3
articleId: 5
slug: useform-events
title: Form Event Handling
description: Learn how to handle form events like changes, submissions, and errors with the useForm system.
---

# Form Event Handling

## API Reference

### Event Handlers

```typescript
// Form change events
form.onChange((data: T, errors?: TFormValidateResult) => {
  // React to form value changes
});

// Form submission
form.onSubmit((event: Event, data: T) => {
  // Handle validated form submission
});

// Validation errors
form.onErrors((errors: TFormValidateResult) => {
  // Process validation errors
});
```

## Overview

The form management system provides a comprehensive set of event handlers that allow you to respond to various form events. These handlers make it easy to create interactive, responsive forms that provide immediate feedback to users.

## Change Events

The `onChange` handler is called whenever any form value changes:

```javascript
import { useForm } from '@jay-js/system';

const form = useForm({
  defaultValues: {
    firstName: '',
    lastName: '',
    email: ''
  }
});

// React to form value changes
form.onChange((data) => {
  console.log('Form values changed:', data);
  
  // Enable or disable the submit button based on form values
  const submitButton = document.getElementById('submit-button');
  submitButton.disabled = !data.firstName || !data.email;
  
  // Update a preview
  document.getElementById('fullname-preview').textContent = 
    `${data.firstName} ${data.lastName}`;
});
```

The `onChange` handler receives:
- The current form values object
- The current validation errors (optional)

### Use Cases for onChange

- Showing real-time previews
- Enabling/disabling submit buttons based on form completeness
- Triggering calculations (like a shopping cart total)
- Showing/hiding conditional form sections
- Displaying character counters for text fields

## Submission Events

The `onSubmit` handler processes form submissions:

```javascript
import { useForm, zodResolver } from '@jay-js/system';
import { z } from 'zod';

// Define validation schema
const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password too short')
});

const form = useForm({
  defaultValues: {
    email: '',
    password: ''
  },
  resolver: zodResolver(schema)
});

// Add the submit handler to the form element
document.getElementById('login-form').addEventListener(
  'submit',
  form.onSubmit((event, data) => {
    // This is only called if validation passes
    console.log('Form submitted with valid data:', data);
    
    // Call an API to log in
    loginUser(data.email, data.password)
      .then(response => {
        console.log('Login successful:', response);
        window.location.href = '/dashboard';
      })
      .catch(error => {
        console.error('Login failed:', error);
        showErrorMessage('Login failed: ' + error.message);
      });
  })
);
```

The `onSubmit` handler:
1. Prevents the default form submission behavior
2. Validates the form data (if a resolver is provided)
3. Calls your callback function only if validation passes
4. Provides the event object and validated form data

### Use Cases for onSubmit

- Submitting data to an API
- Client-side processing of form data
- Multi-step form transitions
- Form reset after successful submission

## Error Events

The `onErrors` handler is called when validation errors occur:

```javascript
import { useForm, zodResolver } from '@jay-js/system';
import { z } from 'zod';

const schema = z.object({
  username: z.string().min(3, 'Username too short'),
  password: z.string().min(8, 'Password too short')
});

const form = useForm({
  defaultValues: {
    username: '',
    password: ''
  },
  resolver: zodResolver(schema)
});

// Listen for validation errors
form.onErrors((errors) => {
  console.log('Validation errors:', errors);
  
  // Show a summary of all errors
  const errorSummary = document.getElementById('error-summary');
  errorSummary.innerHTML = '';
  
  if (errors.errors.length > 0) {
    errorSummary.classList.remove('hidden');
    
    const list = document.createElement('ul');
    errors.errors.forEach(error => {
      const item = document.createElement('li');
      item.textContent = error.message;
      list.appendChild(item);
    });
    
    errorSummary.appendChild(list);
  } else {
    errorSummary.classList.add('hidden');
  }
});
```

The `onErrors` handler receives a validation result object with an array of errors, each containing:
- `path`: The field name that has the error
- `message`: The error message

### Use Cases for onErrors

- Showing error summaries
- Logging validation issues
- Updating UI elements based on validation state
- Custom error handling for specific fields

## Combining Event Handlers

You can use multiple event handlers together to create a rich, interactive form experience:

```javascript
import { useForm, zodResolver } from '@jay-js/system';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(10, 'Message is too short')
});

function initContactForm() {
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: ''
    },
    resolver: zodResolver(contactSchema)
  });
  
  // Register form elements
  const elements = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    message: document.getElementById('message')
  };
  
  Object.entries(elements).forEach(([field, element]) => {
    Object.assign(element, form.register(field));
  });
  
  // Show validation errors
  const errorElements = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    message: document.getElementById('message-error')
  };
  
  Object.entries(errorElements).forEach(([field, element]) => {
    element.appendChild(form.formState.errors(field));
  });
  
  // Monitor form changes
  form.onChange((data) => {
    // Update character counter for message
    const messageLength = data.message.length;
    const counterElement = document.getElementById('message-counter');
    counterElement.textContent = `${messageLength} characters`;
    
    // Set counter color based on validation requirements
    if (messageLength < 10) {
      counterElement.className = 'counter-invalid';
    } else {
      counterElement.className = 'counter-valid';
    }
    
    // Enable submit button only when form is filled
    const submitButton = document.getElementById('submit-button');
    submitButton.disabled = !data.name || !data.email || !data.message;
  });
  
  // Track validation errors
  form.onErrors((errors) => {
    // Update form status indicator
    const statusElement = document.getElementById('form-status');
    
    if (errors.errors.length > 0) {
      statusElement.textContent = 'Form has errors';
      statusElement.className = 'status-error';
    } else {
      statusElement.textContent = 'Form is valid';
      statusElement.className = 'status-valid';
    }
  });
  
  // Handle form submission
  document.getElementById('contact-form').addEventListener(
    'submit',
    form.onSubmit(async (event, data) => {
      // Show loading state
      const submitButton = event.target.querySelector('button[type="submit"]');
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      try {
        // Send data to server
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        if (!response.ok) {
          throw new Error('Failed to send message');
        }
        
        // Show success message
        document.getElementById('form-container').innerHTML = `
          <div class="success-message">
            <h2>Thank you for your message!</h2>
            <p>We'll get back to you as soon as possible.</p>
            <button id="new-message">Send another message</button>
          </div>
        `;
        
        // Allow sending another message
        document.getElementById('new-message').addEventListener('click', () => {
          window.location.reload();
        });
        
      } catch (error) {
        console.error('Submission error:', error);
        
        // Show error message
        alert('Failed to send your message. Please try again later.');
        
        // Reset button
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
      }
    })
  );
}

// Initialize form when DOM is ready
document.addEventListener('DOMContentLoaded', initContactForm);
```

This example demonstrates how to use all three event handlers together to create a comprehensive form experience:

1. `onChange` updates UI elements in real-time as the user types
2. `onErrors` maintains a form-wide validation status indicator
3. `onSubmit` handles the actual data submission with loading states and success/error handling

## Handling Async Operations

Event handlers support asynchronous operations, making it easy to integrate with APIs:

```javascript
// Inside a form initialization function
const form = useForm({
  defaultValues: {
    username: ''
  }
});

// Check username availability as the user types
form.onChange(async (data) => {
  const usernameInput = document.getElementById('username');
  const availabilityIndicator = document.getElementById('username-availability');
  
  if (data.username.length >= 3) {
    // Show checking state
    availabilityIndicator.textContent = 'Checking...';
    availabilityIndicator.className = 'status-checking';
    
    try {
      // Add a small delay to prevent too many requests
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Check availability with API
      const response = await fetch(`/api/check-username?username=${data.username}`);
      const result = await response.json();
      
      if (result.available) {
        availabilityIndicator.textContent = 'Available!';
        availabilityIndicator.className = 'status-available';
      } else {
        availabilityIndicator.textContent = 'Already taken';
        availabilityIndicator.className = 'status-unavailable';
      }
    } catch (error) {
      console.error('Error checking username:', error);
      availabilityIndicator.textContent = 'Could not check';
      availabilityIndicator.className = 'status-error';
    }
  } else {
    availabilityIndicator.textContent = '';
  }
});
```

By leveraging these event handlers, you can create forms that are not only functional but also provide a great user experience with immediate feedback and intuitive interactions. 