/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';
import '../images/pic.ico';

const Navbar = ({ token, setToken }) => {
  const removeToken = () => {
    setToken(null);
    sessionStorage.clear();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        <img
          src="pic.ico"
          width="30"
          height="30"
          className="d-inline-block align-top mx-4"
          alt=""
        />
        Todo Managery
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor03"
        aria-controls="navbarColor03"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarColor03">
        <ul className="navbar-nav mr-auto">
          {token && (
            <>
              <div className="d-md-none">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                    <span className="sr-only">(current)</span>
                  </Link>
                  <Link className="nav-link" to="/all-todos">
                    See all todos
                  </Link>
                  <Link className="nav-link" to="/all-categories">
                    See all categories
                  </Link>
                  <Link className="nav-link" to="/calendar">
                    See your Calendar
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false">
                    Quick Actions
                  </a>
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/new-todo">
                      Add Todo
                    </Link>
                    <Link className="dropdown-item" to="/new-category">
                      Add Category
                    </Link>
                    <Link className="dropdown-item" to="/calendar">
                      Calendar
                    </Link>
                    <Link
                      className="dropdown-item bg-danger text-white"
                      onClick={removeToken}
                      to="/">
                      Log Out
                    </Link>
                  </div>
                </li>
              </div>
              <div className="d-none d-lg-flex">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    Home
                    <span className="sr-only">(current)</span>
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false">
                    Quick Actions
                  </a>
                  <div className="dropdown-menu">
                    <Link className="dropdown-item" to="/new-todo">
                      Add Todo
                    </Link>
                    <Link className="dropdown-item" to="/new-category">
                      Add Category
                    </Link>
                    <Link className="dropdown-item" to="/calendar">
                      Calendar
                    </Link>
                  </div>
                </li>
              </div>
            </>
          )}

          {!token && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
