/* eslint-disable function-paren-newline */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import './calendar.css';

const Calendar = ({ todos, token, setTodos }) => {
  const [calendarTodos, setCalendarTodos] = useState(todos);
  const [loading, setLoading] = useState('inline');
  const [visible, setVisible] = useState('hidden');

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

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
          setCalendarTodos(results);
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
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getUTCFullYear();
  const getDaysInMonth = (month, year) =>
    new Array(31)
      .fill('')
      .map((v, i) => new Date(year, month - 1, i + 1))
      .filter(v => v.getMonth() === month - 1);
  const daysMonth = Object.values(getDaysInMonth(currentMonth + 1, currentYear));
  const daysInMonth = [];
  for (let i = 0; i < daysMonth.length; i++) {
    const dumb = [daysMonth[i]];
    calendarTodos && daysInMonth.push(...dumb);
  }
  const dayCheck = `${String(new Date().getUTCFullYear())}-${String(new Date().getUTCMonth()) + 1}`;
  const todoInMonth =
    calendarTodos.length > 0 &&
    calendarTodos.filter(todo => todo.done_by.split('T').shift().slice(0, 7) === dayCheck);
  return (
    <div className="container">
      <Spinner loading={loading} />
      <h3
        className="display-5 py-5 mb-4 d-flex justify-content-center"
        style={{ visibility: `${visible}` }}>
        Your Calendar
      </h3>
      {calendarTodos.length === 0 && (
        <>
          <h3
            className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center"
            style={{ visibility: `${visible}` }}>
            We are sorry
          </h3>
          <h3
            className="display-5 pt-5 pb-4 my-1 d-flex justify-content-center"
            style={{ visibility: `${visible}` }}>
            It looks like you have not created any todo
          </h3>
        </>
      )}
      <div className="container-fluid">
        <header>
          <h4 className="display-4 mb-4 text-center">
            {monthNames[currentMonth]} {currentYear}
          </h4>
          <div className="row d-none d-sm-flex p-2 bg-primary">
            {daysInMonth.slice(0, 7).map(day => (
              <h5 className="col-sm p-1 text-center text-white">
                {String(day).split(new Date().getUTCFullYear()).shift().split(' ').shift()}
              </h5>
            ))}
          </div>
        </header>
        <div className="row border border-right-0 border-bottom-0">
          {daysInMonth.slice(0, 7).map(day => (
            <div className="day col-sm p-2 border border-left-0 border-top-0 text-truncate d-none d-sm-inline-block bg-light text-muted">
              <h5 className="row align-items-center">
                <span className="date col-1">
                  {String(day).split(new Date().getUTCFullYear()).shift().slice(8)}
                </span>
                <span className="col-1" />
              </h5>
              {calendarTodos.length > 0 &&
                todoInMonth
                  .filter(
                    todo =>
                      todo.done_by.split('T').shift().slice(5, 7) ===
                      String(day).split(new Date().getUTCFullYear()).shift().slice(8)
                  )
                  .map(todo => (
                    <div
                      className="badge badge-warning"
                      key={todo.id}
                      style={{ visibility: `${visible}` }}>
                      <span>{todo.done_by.split('T').pop().replace('Z', '')}</span>
                      <h5 className="text-uppercase">
                        <strong>{todo.done_by.split('T').shift().slice(8)}</strong>
                      </h5>
                      <ul className="list-inline">
                        <i className="material-icons md-18">alarm</i>
                        Category: {todo.category}
                      </ul>
                      <p className="ml-5">{todo.text}</p>
                    </div>
                  ))}
            </div>
          ))}
        </div>
        <div className="row border border-right-0 border-bottom-0">
          {daysInMonth.slice(7, 14).map(day => (
            <div className="day col-sm p-2 border border-left-0 border-top-0 text-truncate d-none d-sm-inline-block bg-light text-muted">
              <h5 className="row align-items-center">
                <span className="date col-1">
                  {String(day).split(new Date().getUTCFullYear()).shift().slice(8)}
                </span>
                <span className="col-1" />
              </h5>
              {calendarTodos.length > 0 &&
                todoInMonth
                  .filter(
                    todo =>
                      todo.done_by.split('T').shift().slice(6, 7) ===
                      String(day).split(new Date().getUTCFullYear()).shift().slice(8)
                  )
                  .map(todo => (
                    <div
                      className="badge badge-warning"
                      key={todo.id}
                      style={{ visibility: `${visible}` }}>
                      <span>{todo.done_by.split('T').pop().replace('Z', '')}</span>
                      <h5 className="text-uppercase">
                        <strong>{todo.done_by.split('T').shift().slice(8)}</strong>
                      </h5>
                      <ul className="list-inline">
                        <i className="material-icons md-18">alarm</i>
                        Category: {todo.category}
                      </ul>
                      <p className="ml-5">{todo.text}</p>
                    </div>
                  ))}
            </div>
          ))}
        </div>
        <div className="row border border-right-0 border-bottom-0">
          {daysInMonth.slice(14, 21).map(day => (
            <div className="day col-sm p-2 border border-left-0 border-top-0 text-truncate d-none d-sm-inline-block bg-light text-muted">
              <h5 className="row align-items-center">
                <span className="date col-1">
                  {String(day).split(new Date().getUTCFullYear()).shift().slice(8)}
                </span>
                <span className="col-1" />
              </h5>
              {calendarTodos.length > 0 &&
                todoInMonth
                  .filter(
                    todo =>
                      todo.done_by.split('T').shift().slice(5, 7) ===
                      String(day).split(new Date().getUTCFullYear()).shift().slice(8)
                  )
                  .map(todo => (
                    <div
                      className="badge badge-warning"
                      key={todo.id}
                      style={{ visibility: `${visible}` }}>
                      <span>{todo.done_by.split('T').pop().replace('Z', '')}</span>
                      <h5 className="text-uppercase">
                        <strong>{todo.done_by.split('T').shift().slice(8)}</strong>
                      </h5>
                      <ul className="list-inline">
                        <i className="material-icons md-18">alarm</i>
                        Category: {todo.category}
                      </ul>
                      <p className="ml-5">{todo.text}</p>
                    </div>
                  ))}
            </div>
          ))}
        </div>
        <div className="row border border-right-0 border-bottom-0">
          {daysInMonth.slice(21, 28).map(day => (
            <div className="day col-sm p-2 border border-left-0 border-top-0 text-truncate d-none d-sm-inline-block bg-light text-muted">
              <h5 className="row align-items-center">
                <span className="date col-1">
                  {String(day).split(new Date().getUTCFullYear()).shift().slice(8)}
                </span>
                <span className="col-1" />
              </h5>
              {calendarTodos.length > 0 &&
                todoInMonth
                  .filter(
                    todo =>
                      todo.done_by.split('T').shift().slice(5, 7) ===
                      String(day).split(new Date().getUTCFullYear()).shift().slice(8)
                  )
                  .map(todo => (
                    <div
                      className="badge badge-warning"
                      key={todo.id}
                      style={{ visibility: `${visible}` }}>
                      <span>{todo.done_by.split('T').pop().replace('Z', '')}</span>
                      <h5 className="text-uppercase">
                        <strong>{todo.done_by.split('T').shift().slice(8)}</strong>
                      </h5>
                      <ul className="list-inline">
                        <i className="material-icons md-18">alarm</i>
                        Category: {todo.category}
                      </ul>
                      <p className="ml-5">{todo.text}</p>
                    </div>
                  ))}
            </div>
          ))}
        </div>
        <div className="row border border-right-0 border-bottom-0">
          {daysInMonth.slice(28).map(day => (
            <div className="day col-sm p-2 border border-left-0 border-top-0 text-truncate d-none d-sm-inline-block bg-light text-muted">
              <h5 className="row align-items-center">
                <span className="date col-1">
                  {String(day).split(new Date().getUTCFullYear()).shift().slice(8)}
                </span>
                <span className="col-1" />
              </h5>
              {calendarTodos.length > 0 &&
                todoInMonth
                  .filter(
                    todo =>
                      todo.done_by.split('T').shift().slice(5, 7) ===
                      String(day).split(new Date().getUTCFullYear()).shift().slice(8)
                  )
                  .map(todo => (
                    <div
                      className="badge badge-warning"
                      key={todo.id}
                      style={{ visibility: `${visible}` }}>
                      <span>{todo.done_by.split('T').pop().replace('Z', '')}</span>
                      <h5 className="text-uppercase">
                        <strong>{todo.done_by.split('T').shift().slice(8)}</strong>
                      </h5>
                      <ul className="list-inline">
                        <i className="material-icons md-18">alarm</i>
                        Category: {todo.category}
                      </ul>
                      <p className="ml-5">{todo.text}</p>
                    </div>
                  ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
