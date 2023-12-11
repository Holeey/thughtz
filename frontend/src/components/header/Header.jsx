import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaWindowClose,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice.js";
import { useState } from "react";

const Header = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <section className="header_section">
      <header className="header">
        <div>
          <Link to={"/"}>ThughtZ</Link>
        </div>
        <div className="signIn_register">
          {user ? (
            <div>
              <button onClick={handleLogout}>
                <FaSignOutAlt />
              </button>{" "}
              Log Out
            </div>
          ) : (
            <>
              <div>
                <Link to={"/login"}>
                  <FaSignInAlt size={18} /> Log In
                </Link>
              </div>
              <div>
                <Link to={"/register"}>
                  <FaUser size={18} /> Sign Up
                </Link>
              </div>
            </>
          )}
        </div>

        {!toggleMenu ? (
          <>
            <div className="menu_open-btn" onClick={() => setToggleMenu(true)}>
              <FaBars size={30} />
            </div>
          </>
        ) : (
          <div className={`mobile_menu  ${toggleMenu ? "active" : ""} `}>
            <div
              className="menu_close-btn"
              onClick={() => setToggleMenu(false)}
            >
              <FaWindowClose size={20} />
            </div>
            <ul>
              <Link to={"/login"}>
                <li> Log In</li>
              </Link>
              <Link to={"/"}>
                <li onClick={handleLogout}> Log Out</li>
              </Link>
            </ul>
          </div>
        )}
      </header>
    </section>
  );
};

export default Header;
