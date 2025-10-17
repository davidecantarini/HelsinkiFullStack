import {link } from 'react-router-dom';

function NavBar() {
    return (
        <nav className="navbar">
    <div className = "navbar-brand"> 
        <Link to = "/" > Movie App  </Link>
    </div>
    <div className = "navbar-links">
        <Link to = "/favorites" className = "nav-links"> Favorites </Link>
        <Link to = "/" className = "nav-links"> Home </Link>
    </div>
        </nav>
    )
}

export default NavBar