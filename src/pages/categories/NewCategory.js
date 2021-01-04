/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Swal from 'sweetalert2';

const NewCategory = ({ token }) => {
  const [title, setTitle] = useState('');

  const history = useHistory();

  const createCategory = async event => {
    event.preventDefault();
    try {
      await fetch('https://luigidavidemicca.pythonanywhere.com/api/v1/categories/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ title }),
      });
      Swal.fire({
        title: 'New Category Created',
        text: 'Your category is been successfully added',
        icon: 'success',
      }).then(history.push('/'));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container style={{ textAlign: 'center' }}>
        <Typography variant="h4">Create a new Category</Typography>
        <br />
        <br />
        <form onSubmit={createCategory}>
          <FormControl>
            <TextField
              required
              value={title}
              id="outlined-basic"
              variant="outlined"
              label="Title"
              onChange={e => setTitle(e.target.value)}
            />
            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#1f4068', color: 'whitesmoke' }}>
              Create Category
            </Button>
          </FormControl>
        </form>
      </Container>
      <br />
      <br />
    </>
  );
};

export default NewCategory;
