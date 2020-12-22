import {Link} from 'react-router-dom';

import './sidebar.css';

const Sidebar = ({token, setToken, categories, children}) => {
  const removeToken = () => {
    setToken(null);
    sessionStorage.clear()
  }
    return (
      <>
        {!token ? 
          <>
            {children}
          </>
        :
        <div className="d-flex" id="wrapper">
            <div className="bg-dark text-white border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">All</div>
            <div className="list-group list-group-flush">
            <Link className="list-group-item list-group-item-action bg-dark text-white" to="/all-todos">See all todos</Link>
             <Link className="list-group-item list-group-item-action bg-dark text-white" to="/all-categories">See all categories</Link>
             <Link className="list-group-item list-group-item-action bg-dark text-white" to="/calendar">See your Calendar</Link>
            </div>
          <div className="sidebar-heading mt-3">Categories</div>
          <div className="list-group list-group-flush">
            {categories.length > 0 ? categories.map( category =>
              <Link key={category.id} to={`/category-todos/${category.title}`} className="list-group-item list-group-item-action bg-dark text-white">
                {category.title}
              </Link>
            ) :
              <div className="list-group-item list-group-item-action bg-dark text-white">No categories created</div>
            }
            <Link className="btn btn-danger btn-sm mt-5 py-3" onClick={removeToken} to="/">
              Log Out
            </Link>
          </div>
        </div>
        <div id="page-content-wrapper">
          <div className="container-fluid">
              {children}
          </div>
        </div>
    
      </div>
    }
    </>
    )
}

export default Sidebar;