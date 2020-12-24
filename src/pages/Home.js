/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Todos from '../components/Todos';

import '../main.css';

const Home = ({ categories, setCategories, todos, setTodos, token }) => {
  const [user, setUser] = useState('');
  const [lastTodos, setLastTodos] = useState('');
  useEffect(() => {
    async function getTodos() {
      try {
        const resp = await fetch('https://luigidavidemicca.pythonanywhere.com/api/v1/todos/', {
          method: 'GET',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
        });
        const results = await resp.json();
        setTodos(results);
        setLastTodos(results.slice(0, 4));
      } catch (e) {
        console.log(e);
      }
    }
    async function getUsers() {
      try {
        const res = await fetch('https://luigidavidemicca.pythonanywhere.com/api-auth/user/ ', {
          method: 'GET',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
        });
        const result = await res.json();
        setUser(result);
      } catch (e) {
        console.log(e);
      }
    }
    async function getCategories() {
      try {
        const resp = await fetch('https://luigidavidemicca.pythonanywhere.com/api/v1/categories/', {
          method: 'GET',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
        });
        const results = await resp.json();
        setCategories(results);
      } catch (e) {
        console.log(e);
      }
    }
    getTodos();
    getUsers();
    getCategories();
  }, []);

  return (
    <div className="container">
      <div className="jumbotron my-4">
        <h1 className="display-3 home-title" style={{}}>
          Hello,
          {user && user.username}
        </h1>
        <p className="lead">You have created {todos && todos.length} todos for now</p>
        <hr className="my-4" />
        <p>There are {categories && categories.length} categories in your Todo Managery.</p>
      </div>
      {lastTodos.length > 0 && (
        <>
          <h3 className="display-5 py-5 mb-4 d-flex justify-content-center">
            Your Todos Expirig Soon
          </h3>
          <div className="row">
            {lastTodos.map(todo => (
              <div className="col-md-6 col-sm-12">
                <Todos
                  key={todo.id}
                  title={todo.title}
                  text={todo.text}
                  done_by={todo.done_by}
                  id={todo.id}
                  category={todo.category}
                />
              </div>
            ))}
          </div>
        </>
      )}
      {categories.length === 0 && (
        <>
          <div className="my-5 px-5 mx-auto">
            <h4>Start from Here</h4>
          </div>
          <div className="col-6 my-4 mx-auto">
            <Link className="btn btn-outline-primary" to="new-category">
              Add Your First Category
            </Link>
          </div>
        </>
      )}
      {categories.length > 0 && lastTodos.length === 0 && (
        <>
          <div className="py-4 px-5 mx-auto">
            <h4>Start from Here</h4>
          </div>
          <Link className="btn btn-outline-dark mx-5 my-4" to="/new-todo">
            Add Todo
          </Link>
          <Link className="btn btn-outline-primary mx-5 my-4" to="new-category">
            Add Another Category
          </Link>
        </>
      )}
    </div>
  );
};

export default Home;
