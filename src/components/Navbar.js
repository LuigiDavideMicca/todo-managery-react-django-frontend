import {Link} from 'react-router-dom';
import '../images/pic.ico';

const Navbar = ({token}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">
            <img src="pic.ico" width="30" height="30" className="d-inline-block align-top mx-4" alt="" />
                Todo Managery
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor02">
                <ul className="navbar-nav mr-auto">
                    {token && (
                        <>
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home
                            <span className="sr-only">(current)</span>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Quick Actions</a>
                        <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/new-todo">Add Todo</Link>
                        <Link className="dropdown-item" to="/new-category">Add Category</Link>
                        <Link className="dropdown-item" to="/calendar">Calendar</Link>
                        </div>
                    </li>
                    </>
        
                        )}
                    {!token && (
                        <>
                        <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                        </li>
                        <li className="nav-item">
                        </li>
                        </>
                    )}    
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;