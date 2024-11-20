import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Navbar.css'; 

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Perfil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tasks"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Tareas
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
