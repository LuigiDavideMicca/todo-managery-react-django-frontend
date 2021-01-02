/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Todos from '../components/Todos';
import Spinner from '../components/Spinner';

import '../main.css';
import '../images/pic.ico';

const Home = ({ categories, setCategories, todos, setTodos, token }) => {
  const [user, setUser] = useState('');
  const [lastTodos, setLastTodos] = useState('');
  const [loading, setLoading] = useState('inline');
  const [visible, setVisible] = useState('hidden');
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
        setLoading('none');
        setVisible('visible');
      } catch (e) {
        console.log(e);
      }
    }
    getTodos();
    getUsers();
    getCategories();
  }, []);

  return (
    <>
      <Container maxWidth="sm" style={{ textAlign: 'center' }}>
        <Spinner loading={loading} />
        <Card
          raised="true"
          style={{
            visibility: `${visible}`,
            paddingTop: '5rem',
            paddingBottom: '5rem',
            paddingLeft: '10rem',
            paddingRight: '10rem',
          }}>
          <CardContent>
            <Typography variant="h4" className="home-title">
              Hello,
              {user && user.username}
            </Typography>
            <br />
            <Typography variant="h6">
              You have created {todos && todos.length} todos for now
            </Typography>
            <br />
            <Divider />
            <br />
            <Typography variant="p">
              There are {categories && categories.length} categories in your Todo Managery.
            </Typography>
            <br />
          </CardContent>
        </Card>
        <br />
        <br />
        <br />
        {lastTodos.length > 0 && (
          <>
            <Typography
              variant="h5"
              // eslint-disable-next-line prettier/prettier
              style={{ visibility: `${visible}` }}
            >
              Your Todos Expirig Soon
            </Typography>
            <br />
            <br />
            <br />
            <div style={{ visibility: `${visible}` }}>
              {lastTodos.map(todo => (
                <div>
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
            <div style={{ visibility: `${visible}` }}>
              <h4>Start from Here</h4>
            </div>
            <div className="col-6 my-4 mx-auto" style={{ visibility: `${visible}` }}>
              <Link className="btn btn-outline-primary" to="new-category">
                Add Your First Category
              </Link>
            </div>
          </>
        )}
        {categories.length > 0 && lastTodos.length === 0 && (
          <>
            <div className="py-4 px-5 mx-auto" style={{ visibility: `${visible}` }}>
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
      </Container>
    </>
  );
};

export default Home;
