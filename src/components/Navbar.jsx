// src/components/Navbar.jsx
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const linkClasses = ({ isActive }) =>
    isActive ? "link active" : "link";

  return (
    <nav>
      <div className="nav-container">
        <NavLink to="/" className={linkClasses}>
          Customers
        </NavLink>
        <NavLink to="/loans" className={linkClasses}>
          Loans
        </NavLink>
        <NavLink to="/payments" className={linkClasses}>
          Payments
        </NavLink>
        <NavLink to="/overview" className={linkClasses}>
          Customer Overview
        </NavLink>
        <NavLink to="/ledger" className={linkClasses}>
          Ledger
        </NavLink>
      </div>
    </nav>
  );
}
