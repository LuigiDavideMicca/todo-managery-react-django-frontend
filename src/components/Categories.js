/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';

const Categories = ({ title, id }) => (
  <>
    <div className="container">
      <div className="card text-white bg-dark border-secondary my-4" style={{ maxWidth: '20rem' }}>
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
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
              <Link className="dropdown-item" to={`/category-todos/${title}`}>
                See All Todos in this category
              </Link>
              <Link className="dropdown-item" to={`/edit-category/${id}`}>
                Change Category
              </Link>
              <Link className="dropdown-item" to={`/delete-category/${id}`}>
                Delete Category
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Categories;
