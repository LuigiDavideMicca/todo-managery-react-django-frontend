/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';

const Todos = ({ title, text, done_by, id, category }) => {
  // eslint-disable-next-line no-param-reassign
  done_by = done_by.replace('T', ' ').replace('Z', '');
  return (
    <>
      <div className="container">
        <div className="card text-white bg-dark my-4" style={{ maxWidth: '20rem' }}>
          <div className="card-header small">
            Category:
            {category}
          </div>
          <div className="card-body">
            <h4 className="card-title">{title}</h4>
            <p className="card-text">{text}</p>
          </div>
          <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" className="btn btn-danger">
              actions
            </button>
            <div className="btn-group" role="group">
              <button
                id="btnGroupDrop4"
                type="button"
                className="btn btn-danger dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              />
              <div className="dropdown-menu" aria-labelledby="btnGroupDrop4">
                <Link className="dropdown-item" to={`/update-todo/${id}`}>
                  Change Todo
                </Link>
                <Link className="dropdown-item" to={`/delete-todo/${id}`}>
                  Delete Todo
                </Link>
              </div>
            </div>
          </div>
          <div className="card-footer small">
            Done by:
            {done_by}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todos;
