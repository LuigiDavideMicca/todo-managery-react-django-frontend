/* eslint-disable no-unused-expressions */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './calendar.css';

const Calendar = ({ todos, token, setTodos }) => {
  const [calendarTodos, setCalendarTodos] = useState(todos);
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
          setCalendarTodos(results);
          setTodos(results)
        } catch (e) {
          console.log(e);
        }
      }
      getTodos();
    }
  }, []);
  return (
    <div className="container">
      <h3 className="display-5 py-5 mb-4 d-flex justify-content-center">Your Calendar</h3>
      {calendarTodos.length > 0 &&
        calendarTodos.map(todo => (
          <div className="row row-striped my-5" key={todo.id}>
            <div className="col-2 text-right">
              <h3 className="display-4">
                <span className="badge badge-primary">
                  {todo.done_by.split('T').pop().replace('Z', '')}
                </span>
              </h3>
              <h4>{todo.done_by.split('T').shift()}</h4>
            </div>
            <div className="col-10 pl-5">
              <h3 className="text-uppercase ml-5">
                <strong>{todo.title}</strong>
              </h3>
              <ul className="list-inline ml-5">
                <li className="list-inline-item">
                  <i className="fa fa-location-arrow" aria-hidden="true" />
                  Category: {todo.category}
                </li>
              </ul>
              <p className="ml-5">{todo.text}</p>
            </div>
          </div>
        ))}
      {calendarTodos.length === 0 && (
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

export default Calendar;
