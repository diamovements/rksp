import React, { useState, useEffect } from "react";

function UserForm({ onSave, selectedUser }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        if (selectedUser) {
            setName(selectedUser.name);
            setEmail(selectedUser.email);
        } else {
            setName("");
            setEmail("");
        }
    }, [selectedUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email) {
            onSave({ id: selectedUser?.id || Date.now(), name, email });
            setName("");
            setEmail("");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{selectedUser ? "Редактировать пользователя" : "Добавить пользователя"}</h2>
            <input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">{selectedUser ? "Сохранить изменения" : "Добавить"}</button>
        </form>
    );
}

export default UserForm;
