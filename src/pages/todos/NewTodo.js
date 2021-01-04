/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Swal from 'sweetalert2';
import { MenuItem } from '@material-ui/core';

const NewTodo = ({ token }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [done_by, setDate] = useState('');
  const [titles, setTitles] = useState('');

  const history = useHistory();

  useEffect(() => {
    async function getCategories() {
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
      const res = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < results.length; i++) {
        res.push(results[i]);
      }
      setTitles(res);
    }
    getCategories();
  }, []);

  const createTodo = async event => {
    event.preventDefault();
    try {
      await fetch('https://luigidavidemicca.pythonanywhere.com/api/v1/todos/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ title, text, category, done_by }),
      });
      Swal.fire({
        title: 'New Todo Created',
        text: 'Your todo is been successfully added',
        icon: 'success',
      }).then(history.push('/'));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container style={{ textAlign: 'center' }}>
        <Typography variant="h4">Create a new Todo</Typography>
        <br />
        <br />
        <form onSubmit={createTodo}>
          <FormControl>
            <TextField
              id="outlined-basic"
              type="text"
              required
              value={title}
              variant="outlined"
              label="Title"
              onChange={e => setTitle(e.target.value)}
            />
            <br />
            <TextField
              id="outlined-basic"
              type="text"
              required
              variant="outlined"
              value={text}
              label="Text"
              onChange={e => setText(e.target.value)}
            />
            <br />
            <Select
              variant="outlined"
              label="Category"
              value={category}
              id="outlined-basic"
              // eslint-disable-next-line react/jsx-closing-bracket-location
              onChange={e => setCategory(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              {titles.length > 0 &&
                titles.map(item => (
                  <MenuItem key={item.id} value={item.title}>
                    {item.title}
                  </MenuItem>
                ))}
            </Select>
            <br />
            <TextField
              required
              id="outlined-basic"
              variant="outlined"
              type="datetime-local"
              value={done_by}
              onChange={e => setDate(e.target.value)}
            />
            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#1f4068', color: 'whitesmoke' }}>
              Create Todo
            </Button>
          </FormControl>
        </form>
      </Container>
      <br />
      <br />
    </>
  );
};

export default NewTodo;
