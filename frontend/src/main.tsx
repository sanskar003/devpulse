import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloProvider } from '@apollo/client/react';
import { client } from './apollo/client.ts';
import { applySavedTheme } from './utils/theme.ts';


// Apply saved theme once before rendering
applySavedTheme();

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
