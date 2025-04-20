import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Dashboard() {
    const { user, logout } = useAuth0();

    return (
        <div>
            <h2>Добро пожаловать, {user.name}</h2>
            <p>Email: {user.email}</p>
            <button onClick={() => logout({ returnTo: window.location.origin })}>
                Выйти
            </button>
        </div>
    );
}
