/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const NewTodo = ({ token }) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [done_by, setDate] = useState('');
  const [titles, setTitles] = useState('');

  const history = useHistory();

  useEffect(() => {
    async function getCategories() {
      const resp = await fetch('https://luigidavidemicca.pythonanywhere.com/api/v1/categories/', {
        method: 'GET',
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
      const results = await resp.json();
      const res = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < results.length; i++) {
        res.push(results[i]);
      }
      setTitles(res);
    }
    getCategories();
  }, []);

  const createTodo = async event => {
    event.preventDefault();
    try {
      await fetch('https://luigidavidemicca.pythonanywhere.com/api/v1/todos/', {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ title, text, category, done_by }),
      });
      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container">
        <h3 className="py-5 mb-4 d-flex justify-content-center">Create a new Todo</h3>
        <form className="form-group my-3" onSubmit={createTodo}>
          <label>Title</label>
          <input
            type="text"
            required
            value={title}
            className="form-control"
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}
          />
          <br />
          <label>Text</label>
          <input
            type="text"
            required
            className="form-control"
            value={text}
            placeholder="Text"
            onChange={e => setText(e.target.value)}
          />
          <br />
          <label>Category</label>
          <select
            className="form-control"
            value={category}
            // eslint-disable-next-line react/jsx-closing-bracket-location
            onChange={e => setCategory(e.target.value)}>
            <option value="" />
            {titles.length > 0 &&
              titles.map(item => (
                <option key={item.id} value={item.title}>
                  {item.title}
                </option>
              ))}
          </select>
          <br />
          <label>Date and Time</label>
          <input
            required
            className="form-control"
            type="datetime-local"
            value={done_by}
            onChange={e => setDate(e.target.value)}
          />
          <button type="submit" className="btn btn-success my-5">
            Create Todo
          </button>
        </form>
      </div>
    </>
  );
};

export default NewTodo;
