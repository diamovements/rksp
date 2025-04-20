import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function AgreementForm() {
    const accepted = useSelector(state => state.accepted);
    const confirmed = useSelector(state => state.confirmed);
    const dispatch = useDispatch();

    const handleCheckbox = () => {
        dispatch({ type: 'TOGGLE_ACCEPT' });
    };

    const handleConfirm = () => {
        dispatch({ type: 'CONFIRM_AGREEMENT' });
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Пользовательское соглашение</h2>

            {!confirmed ? (
                <>
                    <label>
                        <input type="checkbox" checked={accepted} onChange={handleCheckbox} />
                        Я принимаю пользовательское соглашение
                    </label>
                    <br />
                    <button
                        disabled={!accepted}
                        style={{ marginTop: 10 }}
                        onClick={handleConfirm}
                    >
                        Подтвердить
                    </button>
                </>
            ) : (
                <p style={{ color: 'green', fontWeight: 'bold' }}>
                    Соглашение принято. Спасибо!
                </p>
            )}

            {!confirmed && (
                <p style={{ marginTop: 10 }}>
                    Пожалуйста, примите соглашение.
                </p>
            )}
        </div>
    );
}
