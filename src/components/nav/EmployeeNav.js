import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const EmployeeNavbar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <Link className="logo__link" to="/">
            <img className="logo__img" src ={require('./images/kklogo.png')}>               
            </img>
            </Link>

            <li className="navbar__item productsButton">
                <Link className="navbar__link" to="/products">
                    Products
                </Link>
            </li>

            <li className="navbar__item locationsButton">
                <Link className="navbar__link" to="/locations">
                    Locations
                </Link>
            </li>

            <li className="navbar__item employeeFormButton">
                <Link className="navbar__link" to="/employeeForm">
                    We're hiring!
                </Link>
            </li>

            <li className="navbar__item customersButton">
                <Link className="navbar__link" to="/customers">
                    Customers
                </Link>
            </li>

            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("kandy_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}