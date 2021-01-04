/* eslint-disable no-undef */
/* eslint-disable no-inner-declarations */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Todos from '../../components/Todos';

const CategoriesTodo = ({ todos, token, setTodos }) => {
  let [categoryTodos, setCategoryTodos] = useState(todos);
  const location = useLocation();
  const title = location.pathname.split('/category-todos/').pop();
  useEffect(() => {
    if (todos.length === 0) {
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
          setCategoryTodos(results);
          setTodos(results);
        } catch (e) {
          console.log(e);
        }
      }
      getTodos();
    }
  }, []);
  categoryTodos =
    categoryTodos.length > 0 ? categoryTodos.filter(todo => todo.category === title) : [];
  return (
    <Container style={{ textAlign: 'center' }}>
      {categoryTodos.length > 0 ? (
        <>
          <Typography variant="h4">Your Todos in category:</Typography>
          <br />
          <Typography variant="h5">
            <strong>{title}</strong>
          </Typography>
          <br />
          <br />
          <Grid container>
            {categoryTodos.map(todo => (
              <div key={todo.id}>
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
          </Grid>
        </>
      ) : (
        <>
          <Typography variant="h4">We are sorry</Typography>
          <Typography variantt="h5">
            <strong>
              No todos found in category:
              {title}
            </strong>
          </Typography>
        </>
      )}
      <br />
      <br />
    </Container>
  );
};

export default CategoriesTodo;
