/* eslint-disable no-undef */
/* eslint-disable no-inner-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
import { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Todos from '../../components/Todos';
import Spinner from '../../components/Spinner';

const AllTodos = ({ todos, token, setTodos }) => {
  const [allTodos, setAllTodos] = useState(todos);
  const [loading, setLoading] = useState('inline');
  const [visible, setVisible] = useState('hidden');
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
          setAllTodos(results);
          setTodos(results);
          setLoading('none');
          setVisible('visible');
        } catch (e) {
          console.log(e);
        }
      }
      getTodos();
    } else {
      setLoading('none');
      setVisible('visible');
    }
  }, []);
  return (
    <Container style={{ textAlign: 'center' }}>
      <Spinner loading={loading} />
      <Typography
        variant="h4"
        // eslint-disable-next-line react/jsx-closing-bracket-location
        style={{ visibility: `${visible}` }}>
        Your Todos
      </Typography>
      <br />
      <br />
      <Grid container style={{ visibility: `${visible}` }} alignItems="center">
        {allTodos.length > 0 &&
          allTodos.map(todo => (
            <Grid item xs={12} key={todo.id}>
              <Todos
                key={todo.id}
                title={todo.title}
                text={todo.text}
                done_by={todo.done_by}
                id={todo.id}
                category={todo.category}
              />
            </Grid>
          ))}
      </Grid>
      {allTodos.length === 0 && (
        <>
          <Typography
            variant="h4"
            // eslint-disable-next-line react/jsx-closing-bracket-location
            style={{ visibility: `${visible}` }}>
            We are sorry
          </Typography>
          <Typography
            variant="h6"
            // eslint-disable-next-line react/jsx-closing-bracket-location
            style={{ visibility: `${visible}` }}>
            It looks like you have not created any todo
          </Typography>
        </>
      )}
    </Container>
  );
};

export default AllTodos;
