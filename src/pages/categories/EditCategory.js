/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { useState } from 'react';
import { useLocation } from 'react-router';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditCategory = ({ token }) => {
  const [title, setTitle] = useState('');

  const location = useLocation();
  const history = useHistory();
  const id = location.pathname.split('/edit-category/').pop();
  const updateCategory = async event => {
    event.preventDefault();
    try {
      await fetch(`https://luigidavidemicca.pythonanywhere.com/api/v1/categories/${id}/`, {
        method: 'PUT',
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
        title: 'Category Successfully Updated',
        text: 'Your cetgory is been modified',
        icon: 'success',
      }).then(history.push('/'));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="container">
        <h3 className="py-5 mb-4 d-flex justify-content-center">
          Update your Category number
          {id}
        </h3>
        <form className="form-group my-3" onSubmit={updateCategory}>
          <input
            type="text"
            required
            value={title}
            className="form-control"
            placeholder="New Title"
            onChange={e => setTitle(e.target.value)}
          />
          <button type="submit" className="btn btn-warning my-5">
            Update Category
          </button>
        </form>
      </div>
    </>
  );
};

export default EditCategory;
