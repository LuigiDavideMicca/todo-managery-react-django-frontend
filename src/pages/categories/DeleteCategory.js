/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';

const DeleteCategory = ({ token }) => {
  const location = useLocation();
  const id = location.pathname.split('/delete-category/').pop();
  const history = useHistory();
  const eraseCategory = async () => {
    confirm(`Are you sure you wanna erase category with id ${id}`);
    await fetch(`https://luigidavidemicca.pythonanywhere.com/api/v1/categories/${id}`, {
      method: 'DELETE',
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer',
    });

    history.push('/');
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
