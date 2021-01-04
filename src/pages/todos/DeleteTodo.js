/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';

const DeleteTodo = ({ token }) => {
  const location = useLocation();
  const id = location.pathname.split('/delete-todo/').pop();
  const history = useHistory();
  const eraseTodo = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really wanna erase this todo?',
      icon: 'warning',
      confirmButtonText: 'Yes',
    }).then(
      async result =>
        result.isConfirmed &&
        // eslint-disable-next-line no-return-await
        (await fetch(`https://luigidavidemicca.pythonanywhere.com/api/v1/todos/${id}`, {
          method: 'DELETE',
          mode: 'cors',
          credentials: 'same-origin',
          headers: {
            Authorization: `Token ${token}`,
            'Content-Type': 'application/json',
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
        }),
        history.push('/'))
    );
  };

  return (
    <Container style={{ textAlign: 'center' }}>
      <Typography variant="h4">Erase your Todo number {id}?</Typography>
      <br />
      <br />
      <br />
      <br />
      <Button
        onClick={eraseTodo}
        variant="contained"
        style={{ backgroundColor: '#1f4068', color: 'whitesmoke' }}>
        Erase Todo!
      </Button>
      <br />
      <br />
    </Container>
  );
};

export default DeleteTodo;
