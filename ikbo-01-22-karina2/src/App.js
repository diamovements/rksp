import React, { useState } from "react";
import "./App.css";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSaveUser = (user) => {
    if (selectedUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      setSelectedUser(null);
    } else {
      setUsers([...users, user]);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
      <div className="container">
        <h1>User List</h1>
        <UserForm onSave={handleSaveUser} selectedUser={selectedUser} />
        <UserList users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      </div>
  );
}

export default App;
