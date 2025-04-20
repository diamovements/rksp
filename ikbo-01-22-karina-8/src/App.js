import React, { useState } from 'react';
import axios from 'axios';
import ItemList from './components/ItemList';
import AdminItemActions from './components/AdminItemActions';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [items, setItems] = useState([]);
  const [token, setToken] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Стейт для переключения между регистрацией и входом

  // Функция для регистрации
  const register = async () => {
    try {
      await axios.post('http://localhost:5000/register', { username, password, role });
      setIsLogin(true); // После регистрации переключаем на форму входа
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  // Функция для входа
  const login = async () => {
    try {
      const res = await axios.post('http://localhost:5000/login', { username, password });
      setToken(res.data.token);
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  // Получение предметов
  const getItems = async () => {
    const res = await axios.get('http://localhost:5000/items', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setItems(res.data);
  };

  return (
      <div>
        <h1>Приложение с разделением ролей</h1>

        {/* Форма регистрации или входа */}
        <div>
          <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
          <input
              type="text"
              placeholder="Имя пользователя"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
          />
          <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
              <select onChange={(e) => setRole(e.target.value)} value={role}>
                <option value="user">Пользователь</option>
                <option value="admin">Админ</option>
              </select>
          )}
          <button onClick={isLogin ? login : register}>
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
          <p onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Нет аккаунта? Зарегистрируйтесь.' : 'Уже есть аккаунт? Войдите.'}
          </p>
        </div>

        {/* Получить предметы */}
        {token && (
            <div>
              <button onClick={getItems}>Получить предметы</button>
              <ItemList items={items} />
            </div>
        )}

        {/* Только для администраторов */}
        {token && role === 'admin' && (
            <AdminItemActions token={token} getItems={getItems} />
        )}
      </div>
  );
}

export default App;
