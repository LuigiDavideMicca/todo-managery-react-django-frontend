/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Swal from 'sweetalert2';

const EditCategory = ({ token }) => {
  const [title, setTitle] = useState('');

  const location = useLocation();
  const history = useHistory();
  const id = location.pathname.split('/edit-category/').pop();
  const updateCategory = async event => {
    event.preventDefault();
    try {
      await fetch(`https://luigidavidemicca.pythonanywhere.com/api/v1/categories/${id}/`, {
        method: 'PUT',
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
        title: 'Category Successfully Updated',
        text: 'Your cetgory is been modified',
        icon: 'success',
      }).then(history.push('/'));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Container style={{ textAlign: 'center' }}>
        <Typography variant="h4">Update your Category number {id}</Typography>
        <br />
        <br />
        <form onSubmit={updateCategory}>
          <FormControl>
            <TextField
              id="outlined-basic"
              label="Change Title"
              required
              value={title}
              variant="outlined"
              onChange={e => setTitle(e.target.value)}
            />
            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: '#1f4068', color: 'whitesmoke' }}>
              Update Category
            </Button>
          </FormControl>
        </form>
      </Container>
    </>
  );
};

export default EditCategory;
