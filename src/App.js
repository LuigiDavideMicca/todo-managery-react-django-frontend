/* eslint-disable no-undef */
import { useState } from 'react';
import Router from './routes/router';

const App = () => {
  const sessionToken = sessionStorage.getItem('token');

  const [token, setToken] = useState(sessionToken || null);
  const [username, setUsername] = useState('');
  const [categories, setCategories] = useState('');
  const [todos, setTodos] = useState('');
  return (
    <>
      <Router
        token={token}
        setToken={setToken}
        username={username}
        setUsername={setUsername}
        categories={categories}
        setCategories={setCategories}
        todos={todos}
        setTodos={setTodos}
      />
    </>
  );
};

export default App;
