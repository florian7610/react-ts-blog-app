import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <div className="logo">MyBlog</div>
                <ul className="nav-links">
                    <li className="nav-link">Home</li>
                    <li className="nav-link">Categories</li>
                    <li className="nav-link">About</li>
                    <li className="nav-link">Contact</li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
