import { Box, Typography, Button } from '@jay-js/elements';
import { MyComponent } from './components/MyComponent';

function App() {
  return Box({
    className: 'app',
    style: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    },
    children: [
      Typography({
        tag: 'h1',
        children: 'Jay JS Inspector Example',
        style: { color: '#333', marginBottom: '20px' }
      }),
      
      Typography({
        tag: 'p',
        children: 'Press Shift+Cmd+I to enable inspector mode, then Shift+Click on components to open them in your editor.',
        style: { marginBottom: '20px', color: '#666' }
      }),
      
      Box({
        className: 'components-demo',
        style: {
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap'
        },
        children: [
          MyComponent(),
          
          Button({
            children: 'Click me!',
            style: {
              padding: '10px 20px',
              backgroundColor: '#41b883',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            },
            listeners: {
              click: () => alert('Button clicked!')
            }
          }),
          
          Box({
            className: 'info-card',
            style: {
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            },
            children: [
              Typography({
                tag: 'h3',
                children: 'How to use Inspector:',
                style: { margin: '0 0 10px 0' }
              }),
              Typography({
                tag: 'ol',
                children: [
                  Typography({ tag: 'li', children: 'Press Shift+Cmd+I to toggle inspector' }),
                  Typography({ tag: 'li', children: 'Hover over components to see highlight' }),
                  Typography({ tag: 'li', children: 'Shift+Click to open in editor' })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

// Render the app
const app = App();
document.getElementById('app')?.appendChild(app);