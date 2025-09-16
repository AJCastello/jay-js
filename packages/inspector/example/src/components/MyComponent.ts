import { Box, Typography, Button } from '@jay-js/elements';

export function MyComponent() {
  return Box({
    className: 'my-component',
    style: {
      padding: '20px',
      border: '2px solid #41b883',
      borderRadius: '8px',
      backgroundColor: '#f0fff4',
      maxWidth: '400px'
    },
    children: [
      Typography({
        tag: 'h2',
        children: 'Custom Component',
        style: {
          color: '#41b883',
          margin: '0 0 10px 0'
        }
      }),
      
      Typography({
        tag: 'p',
        children: 'This is a custom component built with Jay JS elements. Try clicking on it with inspector mode enabled!',
        style: {
          margin: '0 0 15px 0',
          lineHeight: '1.5'
        }
      }),
      
      Button({
        children: 'Component Action',
        style: {
          padding: '8px 16px',
          backgroundColor: '#41b883',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        },
        listeners: {
          click: () => console.log('Custom component button clicked!')
        }
      })
    ]
  });
}