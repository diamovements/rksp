// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App'; // <--- важно: путь должен быть к твоему App.js

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Auth0Provider
            domain="dev-mqipwcyufwxeain8.us.auth0.com"
            clientId="a2OtYxZEaz12PcHOI4cptuCKEtybmKIK"
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
        >
            <App />
        </Auth0Provider>
    </React.StrictMode>
);
