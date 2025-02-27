import React from "react";

function UserList({ users, onEdit, onDelete }) {
    return (
        <div>
            <h2>Список пользователей</h2>
            {users.length === 0 ? (
                <p>Нет пользователей</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} - {user.email}
                            <button onClick={() => onEdit(user)}>✏️ Редактировать</button>
                            <button onClick={() => onDelete(user.id)}>🗑 Удалить</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserList;
