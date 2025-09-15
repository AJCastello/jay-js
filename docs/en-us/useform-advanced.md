---
category: Form Management
categoryId: 3
articleId: 6
slug: useform-advanced
title: Advanced Form Usage
description: Learn advanced techniques for working with complex forms, including nested fields, arrays, and dynamic forms.
---

# Advanced Form Usage

## API Reference

### Working with Nested Fields

```typescript
// Nested object in default values
const form = useForm({
  defaultValues: {
    user: {
      name: {
        first: '',
        last: ''
      },
      contact: {
        email: '',
        phone: ''
      }
    }
  }
});

// Registering nested fields
Object.assign(firstNameInput, form.register('user.name.first'));
Object.assign(emailInput, form.register('user.contact.email'));

// Accessing nested values
const firstName = form.formState.getValue('user.name.first');

// Setting nested values
form.formState.setValue('user.contact.email', 'user@example.com');
```

### Working with Arrays

```typescript
// Array in default values
const form = useForm({
  defaultValues: {
    items: [
      { name: 'Item 1', quantity: 1 },
      { name: 'Item 2', quantity: 2 }
    ]
  }
});

// Registering array fields
Object.assign(itemNameInput, form.register('items.0.name'));
Object.assign(itemQuantityInput, form.register('items.0.quantity'));

// Adding items
const currentItems = form.formState.getValue('items');
form.formState.setValue('items', [
  ...currentItems,
  { name: '', quantity: 1 }
]);

// Removing items
const newItems = currentItems.filter((_, index) => index !== indexToRemove);
form.formState.setValue('items', newItems);
```

## Working with Nested Objects

The form system supports deeply nested object structures, allowing you to organize complex form data.

### Creating Forms with Nested Objects

```javascript
import { useForm, zodResolver } from '@jay-js/system';
import { z } from 'zod';

// Define schema with nested objects
const userSchema = z.object({
  profile: z.object({
    name: z.object({
      first: z.string().min(2, 'First name is too short'),
      last: z.string().min(2, 'Last name is too short')
    }),
    bio: z.string().max(500, 'Bio is too long')
  }),
  contact: z.object({
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    address: z.object({
      street: z.string(),
      city: z.string(),
      zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid ZIP code format')
    })
  })
});

// Create form with nested structure
const form = useForm({
  defaultValues: {
    profile: {
      name: {
        first: '',
        last: ''
      },
      bio: ''
    },
    contact: {
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        zipCode: ''
      }
    }
  },
  resolver: zodResolver(userSchema)
});
```

### Registering Nested Fields

When registering nested fields, use dot notation to specify the path:

```javascript
// Register profile fields
Object.assign(
  document.getElementById('first-name'),
  form.register('profile.name.first')
);

Object.assign(
  document.getElementById('last-name'),
  form.register('profile.name.last')
);

Object.assign(
  document.getElementById('bio'),
  form.register('profile.bio')
);

// Register contact fields
Object.assign(
  document.getElementById('email'),
  form.register('contact.email')
);

// Register address fields
Object.assign(
  document.getElementById('street'),
  form.register('contact.address.street')
);

Object.assign(
  document.getElementById('city'),
  form.register('contact.address.city')
);

Object.assign(
  document.getElementById('zip-code'),
  form.register('contact.address.zipCode')
);
```

### Accessing and Updating Nested Values

You can get and set nested values using the same dot notation:

```javascript
// Get a deeply nested value
const firstName = form.formState.getValue('profile.name.first');
const zipCode = form.formState.getValue('contact.address.zipCode');

// Set a deeply nested value
form.formState.setValue('contact.address.city', 'New York');

// Update a nested object
form.formState.setValue('profile.name', {
  first: 'John',
  last: 'Doe'
});

// Update multiple nested fields
form.formState.setValues({
  'profile.name.first': 'Jane',
  'contact.email': 'jane@example.com',
  'contact.address.city': 'Boston'
});
```

### Displaying Errors for Nested Fields

Error handling works the same way for nested fields:

```javascript
// Display errors for nested fields
document.getElementById('first-name-error')
  .appendChild(form.formState.errors('profile.name.first'));

document.getElementById('email-error')
  .appendChild(form.formState.errors('contact.email'));

document.getElementById('zip-code-error')
  .appendChild(form.formState.errors('contact.address.zipCode'));
```

## Working with Array Fields

The form system also supports arrays, which is useful for dynamic forms with repeating sections.

### Creating Forms with Arrays

```javascript
import { useForm, zodResolver } from '@jay-js/system';
import { z } from 'zod';

// Define schema with array
const orderSchema = z.object({
  customer: z.object({
    name: z.string().min(2, 'Name is too short'),
    email: z.string().email('Invalid email')
  }),
  items: z.array(
    z.object({
      productId: z.string().min(1, 'Product ID is required'),
      name: z.string().min(1, 'Product name is required'),
      quantity: z.number().min(1, 'Quantity must be at least 1'),
      price: z.number().min(0, 'Price cannot be negative')
    })
  ).min(1, 'Order must have at least one item')
});

// Create form with array of items
const form = useForm({
  defaultValues: {
    customer: {
      name: '',
      email: ''
    },
    items: [
      { productId: '', name: '', quantity: 1, price: 0 }
    ]
  },
  resolver: zodResolver(orderSchema)
});
```

### Dynamic Array Field Registration

To work with dynamic arrays, you can generate the form elements and registrations based on the current array length:

```javascript
// Function to render all items
function renderItems() {
  const items = form.formState.getValue('items');
  const container = document.getElementById('items-container');
  
  // Clear container
  container.innerHTML = '';
  
  // Create elements for each item
  items.forEach((item, index) => {
    const itemRow = document.createElement('div');
    itemRow.className = 'item-row';
    
    // Create item fields
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = `item-${index}-name`;
    nameInput.placeholder = 'Product Name';
    
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.id = `item-${index}-quantity`;
    quantityInput.min = '1';
    
    const priceInput = document.createElement('input');
    priceInput.type = 'number';
    priceInput.id = `item-${index}-price`;
    priceInput.step = '0.01';
    
    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeItem(index));
    
    // Add error containers
    const nameError = document.createElement('div');
    nameError.className = 'error-message';
    nameError.id = `item-${index}-name-error`;
    
    const quantityError = document.createElement('div');
    quantityError.className = 'error-message';
    quantityError.id = `item-${index}-quantity-error`;
    
    // Add elements to row
    itemRow.appendChild(nameInput);
    itemRow.appendChild(nameError);
    itemRow.appendChild(quantityInput);
    itemRow.appendChild(quantityError);
    itemRow.appendChild(priceInput);
    itemRow.appendChild(removeButton);
    
    // Add row to container
    container.appendChild(itemRow);
    
    // Register form fields
    Object.assign(nameInput, form.register(`items.${index}.name`));
    Object.assign(quantityInput, form.register(`items.${index}.quantity`));
    Object.assign(priceInput, form.register(`items.${index}.price`));
    
    // Register error displays
    nameError.appendChild(form.formState.errors(`items.${index}.name`));
    quantityError.appendChild(form.formState.errors(`items.${index}.quantity`));
  });
}

// Function to add a new item
function addItem() {
  const items = form.formState.getValue('items');
  
  form.formState.setValue('items', [
    ...items,
    { productId: '', name: '', quantity: 1, price: 0 }
  ]);
  
  // Re-render the items
  renderItems();
}

// Function to remove an item
function removeItem(index) {
  const items = form.formState.getValue('items');
  
  // Filter out the item at the specified index
  const newItems = items.filter((_, i) => i !== index);
  
  form.formState.setValue('items', newItems);
  
  // Re-render the items
  renderItems();
}

// Add event listener to the "Add Item" button
document.getElementById('add-item-button').addEventListener('click', addItem);

// Initial render
renderItems();
```

### Calculating Derived Values from Arrays

You can use the `onChange` handler to calculate derived values from array fields:

```javascript
// Calculate order total whenever form values change
form.onChange((data) => {
  const items = data.items;
  
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  
  // Calculate tax (example: 8%)
  const tax = subtotal * 0.08;
  
  // Calculate total
  const total = subtotal + tax;
  
  // Update UI
  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
  document.getElementById('total').textContent = `$${total.toFixed(2)}`;
});
```

## Conditional Form Logic

You can implement conditional form behavior based on the current form values:

```javascript
// Show or hide sections based on values
form.onChange((data) => {
  const shippingAddressSection = document.getElementById('shipping-address-section');
  const billingAddressSection = document.getElementById('billing-address-section');
  
  // Show shipping options only for physical products
  if (data.productType === 'physical') {
    shippingAddressSection.classList.remove('hidden');
  } else {
    shippingAddressSection.classList.add('hidden');
  }
  
  // Show billing address section if "Same as shipping" is not checked
  if (!data.sameAsShipping) {
    billingAddressSection.classList.remove('hidden');
  } else {
    billingAddressSection.classList.add('hidden');
  }
});
```

## Multi-step Forms

You can use the form system for multi-step forms by sharing a single form instance across steps:

```javascript
import { useForm, zodResolver } from '@jay-js/system';
import { z } from 'zod';

// Define schema for all steps
const registrationSchema = z.object({
  // Step 1: Personal Information
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  email: z.string().email('Invalid email address'),
  
  // Step 2: Account Details
  username: z.string().min(3, 'Username is too short'),
  password: z.string().min(8, 'Password is too short'),
  confirmPassword: z.string(),
  
  // Step 3: Preferences
  notifications: z.boolean(),
  theme: z.enum(['light', 'dark', 'system'])
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});

function initMultiStepForm() {
  // Create form with data for all steps
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      notifications: true,
      theme: 'system'
    },
    resolver: zodResolver(registrationSchema)
  });
  
  // Get step elements
  const steps = [
    document.getElementById('step-1'),
    document.getElementById('step-2'),
    document.getElementById('step-3')
  ];
  
  const nextButtons = document.querySelectorAll('.next-step');
  const prevButtons = document.querySelectorAll('.prev-step');
  
  let currentStep = 0;
  
  // Show a specific step
  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      if (index === stepIndex) {
        step.classList.remove('hidden');
      } else {
        step.classList.add('hidden');
      }
    });
    
    currentStep = stepIndex;
    updateProgressBar();
  }
  
  // Update progress indicator
  function updateProgressBar() {
    const progress = document.getElementById('progress-bar');
    progress.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
  }
  
  // Set up next button handlers
  nextButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const stepIndex = parseInt(button.getAttribute('data-step'));
      
      // Get fields for current step
      const fieldsForStep = getFieldsForStep(stepIndex);
      
      // Validate only the fields in the current step
      const isStepValid = await validateStepFields(fieldsForStep);
      
      if (isStepValid) {
        showStep(stepIndex + 1);
      }
    });
  });
  
  // Set up previous button handlers
  prevButtons.forEach(button => {
    button.addEventListener('click', () => {
      const stepIndex = parseInt(button.getAttribute('data-step'));
      showStep(stepIndex - 1);
    });
  });
  
  // Get fields for a specific step
  function getFieldsForStep(step) {
    switch (step) {
      case 0:
        return ['firstName', 'lastName', 'email'];
      case 1:
        return ['username', 'password', 'confirmPassword'];
      case 2:
        return ['notifications', 'theme'];
      default:
        return [];
    }
  }
  
  // Validate only specific fields
  async function validateStepFields(fields) {
    let isValid = true;
    
    for (const field of fields) {
      const fieldValid = await form.formState.isValid(field);
      if (!fieldValid) {
        isValid = false;
      }
    }
    
    return isValid;
  }
  
  // Register form elements for each step
  // Step 1: Personal Information
  Object.assign(document.getElementById('firstName'), form.register('firstName'));
  Object.assign(document.getElementById('lastName'), form.register('lastName'));
  Object.assign(document.getElementById('email'), form.register('email'));
  
  // Step 2: Account Details
  Object.assign(document.getElementById('username'), form.register('username'));
  Object.assign(document.getElementById('password'), form.register('password'));
  Object.assign(document.getElementById('confirmPassword'), form.register('confirmPassword'));
  
  // Step 3: Preferences
  Object.assign(document.getElementById('notifications'), form.register('notifications'));
  
  // For radio buttons, register each option
  const themeOptions = document.querySelectorAll('input[name="theme"]');
  themeOptions.forEach(option => {
    Object.assign(option, form.register('theme'));
  });
  
  // Add error displays for all fields
  document.getElementById('firstName-error')
    .appendChild(form.formState.errors('firstName'));
  document.getElementById('lastName-error')
    .appendChild(form.formState.errors('lastName'));
  document.getElementById('email-error')
    .appendChild(form.formState.errors('email'));
  document.getElementById('username-error')
    .appendChild(form.formState.errors('username'));
  document.getElementById('password-error')
    .appendChild(form.formState.errors('password'));
  document.getElementById('confirmPassword-error')
    .appendChild(form.formState.errors('confirmPassword'));
  
  // Final form submission
  document.getElementById('registration-form').addEventListener(
    'submit',
    form.onSubmit((event, data) => {
      console.log('Complete registration data:', data);
      
      // Submit to server, show success message, etc.
      document.getElementById('form-container').innerHTML = `
        <div class="success-message">
          <h2>Registration Complete!</h2>
          <p>Thank you for registering, ${data.firstName}!</p>
        </div>
      `;
    })
  );
  
  // Start at first step
  showStep(0);
}

// Initialize the form
document.addEventListener('DOMContentLoaded', initMultiStepForm);
```

## Complex Validation Relationships

For validation rules that depend on multiple fields:

```javascript
import { useForm, zodResolver } from '@jay-js/system';
import { z } from 'zod';

// Schema with inter-field dependencies
const paymentSchema = z.object({
  paymentMethod: z.enum(['creditCard', 'paypal', 'bankTransfer']),
  
  // Credit card fields
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  
  // PayPal fields
  paypalEmail: z.string().email('Invalid PayPal email').optional(),
  
  // Bank transfer fields
  accountName: z.string().optional(),
  accountNumber: z.string().optional(),
  routingNumber: z.string().optional()
})
.refine(data => {
  // If credit card is selected, require all credit card fields
  if (data.paymentMethod === 'creditCard') {
    return !!data.cardNumber && !!data.expiryDate && !!data.cvv;
  }
  return true;
}, {
  message: 'Credit card details are required',
  path: ['cardNumber']
})
.refine(data => {
  // If PayPal is selected, require PayPal email
  if (data.paymentMethod === 'paypal') {
    return !!data.paypalEmail;
  }
  return true;
}, {
  message: 'PayPal email is required',
  path: ['paypalEmail']
})
.refine(data => {
  // If bank transfer is selected, require all bank fields
  if (data.paymentMethod === 'bankTransfer') {
    return !!data.accountName && !!data.accountNumber && !!data.routingNumber;
  }
  return true;
}, {
  message: 'Bank account details are required',
  path: ['accountName']
});
```

These advanced techniques allow you to build sophisticated forms that can handle complex data structures and user interactions while maintaining clean, maintainable code. 