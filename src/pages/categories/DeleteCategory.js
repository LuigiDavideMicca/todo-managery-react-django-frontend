/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';

const DeleteCategory = ({ token }) => {
  const location = useLocation();
  const id = location.pathname.split('/delete-category/').pop();
  const history = useHistory();
  const eraseCategory = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text:
        'Do you really wanna erase this category? By erasing the category you will also erase all the todos associated',
      icon: 'warning',
      confirmButtonText: 'Yes',
    }).then(
      async result =>
        result.isConfirmed &&
        // eslint-disable-next-line no-return-await
        (await fetch(`https://luigidavidemicca.pythonanywhere.com/api/v1/categories/${id}`, {
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
      <Typography variant="h4">Erase your Category number {id}?</Typography>
      <br />
      <br />
      <Typography variant="p">
        By erasing the category you will also erase all the todos associated. Are you sure to
        continue?
      </Typography>
      <br />
      <br />
      <br />
      <br />
      <Button
        variant="contained"
        style={{ backgroundColor: '#1f4068', color: 'whitesmoke' }}
        onClick={eraseCategory}>
        Erase Category !
      </Button>
    </Container>
  );
};

export default DeleteCategory;
