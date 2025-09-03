import { Link } from "react-router-dom";

import '../css/Nabar.css';

function Navbar(){
    return(
        <div>
            <nav className="navbar">
                <div className="navbar-brand">
                    <Link to="/">ExpenseOwl 🦉</Link> 
                </div>

                <div className="navbar-links">
                    <Link to="/">Dashboard</Link> 
                    <Link to="/my-expenses">My Expenses</Link> 
                    <Link to="/my-expense-categories">My Categories</Link> 
                </div>
            </nav>
        </div>
    ) ;
}

export default Navbar;