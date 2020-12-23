/* eslint-disable no-undef */
/* eslint-disable no-inner-declarations */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default */
import { useEffect, useState } from 'react';
import Todos from '../../components/Todos';

const AllTodos = ({ todos, token, setTodos }) => {
  const [allTodos, setAllTodos] = useState(todos);
  useEffect(() => {
    if (todos.length === 0) {
      async function getTodos() {
        try {
          const resp = await fetch('http://127.0.0.1:8000/api/v1/todos/', {
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
        } catch (e) {
          console.log(e);
        }
      }
      getTodos();
    }
  }, []);
  return (
    <div className="container">
      <h3 className="display-5 py-5 mb-4 d-flex justify-content-center">Your Todos</h3>
      <div className="row">
        {allTodos.length > 0 &&
          allTodos.map(todo => (
            <div className="col-6" key={todo.id}>
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
          <h3 className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center">We are sorry</h3>
          <h3 className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center">
            It looks like you have not created any todo
          </h3>
        </>
      )}
    </div>
  );
};

export default AllTodos;
