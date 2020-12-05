import {Link} from 'react-router-dom';

import './sidebar.css';

const Sidebar = ({token, setToken, categories, children}) => {
    return (
      <>
        {!token ? 
          <>
            {children}
          </>
        :
        <div className="d-flex" id="wrapper">
            <div className="bg-light border-right" id="sidebar-wrapper">
            <div className="sidebar-heading">All</div>
            <div className="list-group list-group-flush">
            <Link className="list-group-item list-group-item-action bg-light" to="/all-todos">See all todos</Link>
             <Link className="list-group-item list-group-item-action bg-light" to="/all-categories">See all categories</Link>
            </div>
          <div classNamw="sidebar-heading mt-3">Categories</div>
          <div className="list-group list-group-flush">
            {categories.length > 0 ? categories.map( category =>
            <Link to={`/category-todos/${category.title}`} className="list-group-item list-group-item-action bg-light">{category.title}</Link>
            ) :
              <div className="list-group-item list-group-item-action bg-light">No categories created</div>
            }
            <Link className="btn btn-outline-danger btn-sm mt-5" onClick={() => setToken(null)} to="/">Log Out
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