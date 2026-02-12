import React, { useState } from 'react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">MyBlog</div>
                <button className="burger-menu" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
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
