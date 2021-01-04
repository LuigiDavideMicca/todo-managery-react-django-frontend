/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
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
import Container from '@material-ui/core/Container';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Spinner from '../components/Spinner';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const calendar = ({ todos, token, setTodos }) => {
  const [calendarTodos, setCalendarTodos] = useState(todos);
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
  // eslint-disable-next-line no-param-reassign
  const currentTodos =
    calendarTodos.length > 0 &&
    calendarTodos.map(todo => {
      todo.start = moment().format(todo.done_by);
      todo.end = moment().format(todo.done_by);
      todo.allDay = false;
      delete todo.owner;
      return todo;
    });
  return (
    <Container>
      <Spinner loading={loading} />
      <br />
      <br />
      <Calendar
        style={{ visibility: `${visible}`, height: 500 }}
        localizer={localizer}
        events={currentTodos || []}
        startAccessor="start"
        endAccessor="end"
      />
      <br />
      <br />
    </Container>
  );
};

export default calendar;
