/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
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
    <div className="container">
      <h3 className="py-5 mb-4 d-flex justify-content-center">Erase your Category number {id}?</h3>
      <p className="lead my-5">
        By erasing the category you will also erase all the todos associated. Are you sure to
        continue?
      </p>
      <button className="btn btn-danger" onClick={eraseCategory}>
        Erase Category !
      </button>
    </div>
  );
};

export default DeleteCategory;
