/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const NewCategory = ({ token }) => {
  const [title, setTitle] = useState('');

  const history = useHistory();

  const createCategory = async event => {
    event.preventDefault();
    try {
      await fetch('https://luigidavidemicca.pythonanywhere.com/api/v1/categories/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({ title }),
      });
      Swal.fire({
        title: 'New Category Created',
        text: 'Your category is been successfully added',
        icon: 'success',
      }).then(history.push('/'));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container">
        <h3 className="py-5 mb-4 d-flex justify-content-center">Create a new Catgory</h3>
        <form className="form-group my-3" onSubmit={createCategory}>
          <input
            type="text"
            required
            value={title}
            className="form-control"
            placeholder="Title"
            onChange={e => setTitle(e.target.value)}
          />
          <button type="submit" className="btn btn-success my-5">
            Create Category
          </button>
        </form>
      </div>
    </>
  );
};

export default NewCategory;
