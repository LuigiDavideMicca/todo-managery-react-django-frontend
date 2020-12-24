/* eslint-disable no-inner-declarations */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './sidebar.css';

const Sidebar = ({ token, setToken, categories, children, setCategories }) => {
  const [allCatgories, setAllCategories] = useState(categories);
  useEffect(() => {
    if (categories.length === 0) {
      async function getCategories() {
        try {
          const resp = await fetch(
            'https://luigidavidemicca.pythonanywhere.com/api/v1/categories/',
            {
              method: 'GET',
              mode: 'cors',
              credentials: 'same-origin',
              headers: {
                Authorization: `Token ${token}`,
                'Content-Type': 'application/json',
              },
              redirect: 'follow',
              referrerPolicy: 'no-referrer',
            }
          );
          const results = await resp.json();
          setCategories(results);
          setAllCategories(results);
        } catch (e) {
          console.log(e);
        }
      }
      getCategories();
    }
  }, []);
  const removeToken = () => {
    setToken(null);
    sessionStorage.clear();
  };
  return (
    <>
      {!token ? (
        <>{children}</>
      ) : (
        <div className="d-flex" id="wrapper">
          <div className="bg-dark text-white border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">All</div>
            <div className="list-group list-group-flush">
              <Link
                className="list-group-item list-group-item-action bg-dark text-white"
                to="/all-todos">
                See all todos
              </Link>
              <Link
                className="list-group-item list-group-item-action bg-dark text-white"
                to="/all-categories">
                See all categories
              </Link>
              <Link
                className="list-group-item list-group-item-action bg-dark text-white"
                to="/calendar">
                See your Calendar
              </Link>
            </div>
            <div className="sidebar-heading mt-3">Categories</div>
            <div className="list-group list-group-flush">
              {allCatgories.length > 0 ? (
                allCatgories.map(category => (
                  <Link
                    key={category.id}
                    to={`/category-todos/${category.title}`}
                    className="list-group-item list-group-item-action bg-dark text-white">
                    {category.title}
                  </Link>
                ))
              ) : (
                <div className="list-group-item list-group-item-action bg-dark text-white">
                  No categories created
                </div>
              )}
              <Link className="btn btn-danger btn-sm mt-5 py-3" onClick={removeToken} to="/">
                Log Out
              </Link>
            </div>
          </div>
          <div id="page-content-wrapper">
            <div className="container-fluid">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
