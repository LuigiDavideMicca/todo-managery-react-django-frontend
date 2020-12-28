/* eslint-disable no-undef */
/* eslint-disable no-inner-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
import { useEffect, useState } from 'react';
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
    <div className="container">
      <Spinner loading={loading} />
      <h3
        className="display-5 py-5 mb-4 d-flex justify-content-center"
        // eslint-disable-next-line react/jsx-closing-bracket-location
        style={{ visibility: `${visible}` }}>
        Your Todos
      </h3>
      <div className="row justify-content-center" style={{ visibility: `${visible}` }}>
        {allTodos.length > 0 &&
          allTodos.map(todo => (
            <div className="col-md-6 col-sm-7" key={todo.id}>
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
      </div>
      {allTodos.length === 0 && (
        <>
          <h3
            className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center"
            // eslint-disable-next-line react/jsx-closing-bracket-location
            style={{ visibility: `${visible}` }}>
            We are sorry
          </h3>
          <h3
            className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center"
            // eslint-disable-next-line react/jsx-closing-bracket-location
            style={{ visibility: `${visible}` }}>
            It looks like you have not created any todo
          </h3>
        </>
      )}
    </div>
  );
};

export default AllTodos;
