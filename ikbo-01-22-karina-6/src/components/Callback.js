// components/Callback.js
import React, { useEffect } from 'react';
import userManager from '../auth/AuthService';
import { useNavigate } from 'react-router-dom';

export default function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        userManager.signinRedirectCallback().then(() => {
            navigate('/dashboard');
        });
    }, [navigate]);

    return <div>Загрузка...</div>;
}
