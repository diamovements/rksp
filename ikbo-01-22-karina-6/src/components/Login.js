import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Login() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    if (isAuthenticated) return <p>Вы уже вошли</p>;

    return (
        <div>
            <h2>Вход</h2>
            <button onClick={() => loginWithRedirect()}>Войти через Auth0</button>
        </div>
    );
}
