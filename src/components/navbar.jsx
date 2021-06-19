/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import cart from "../images/cart.png";

// stateless functional component
// snippet sfc
const NavBar = (props) => {
  // console.log("navBar render");
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        <img src={cart} width="50" height="50" alt="Chango"></img>
        Shopping
      </a>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">        
          <li className="nav-item">
            <a className="nav-link" href="#">
            Items:
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span className="badge badge-pill badge-secondary">
              {props.totalCounters}
              </span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Total:
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              <span className="badge badge-pill badge-secondary">
                $ {props.totalPrecio}
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

// class NavBar extends Component {

//   render() {
//     return (
//       <nav className="navbar navbar-light bg-light">
//           <a className="navbar-brand" href="#">
//             Navbar
//           </a>
//       </nav>
//     );
//   }
// }

export default NavBar;