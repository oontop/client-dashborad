import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { MenuProvider } from './contexts/MenuContext.tsx';
import { router } from './routes/router.tsx';
import './index.css';

import { ClerkProvider, SignedIn, SignedOut, SignInButton, SignOutButton /*, useUser*/ } from "@clerk/chrome-extension";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider
          publishableKey={PUBLISHABLE_KEY}
          afterSignOutUrl="/"
        >
        <ThemeProvider>
          <MenuProvider>
            <RouterProvider router={router} />
          </MenuProvider>
        </ThemeProvider>
    </ClerkProvider>
  </React.StrictMode>
);
