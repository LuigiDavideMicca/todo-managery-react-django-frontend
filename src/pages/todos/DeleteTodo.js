/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';

const DeleteTodo = ({ token }) => {
  const location = useLocation();
  const id = location.pathname.split('/delete-todo/').pop();
  const history = useHistory();
  const eraseTodo = async () => {
    confirm(`Are you sure you wanna erase todo with id ${id}`);
    await fetch(`https://luigidavidemicca.pythonanywhere.com/api/v1/todos/${id}`, {
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

    alert('todo succesfully erased');
    history.push('/');
  };

  return (
    <div className="container">
      <h3 className="py-5 mb-4 d-flex justify-content-center">Erase your Todo number {id}?</h3>
      <button className="btn btn-danger" onClick={eraseTodo}>
        Erase Todo!
      </button>
    </div>
  );
};

export default DeleteTodo;
