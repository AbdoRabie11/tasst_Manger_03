import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, toggleSidebar } from "../store/user/userSlice";
import { useNavigate } from "react-router";

const Navbar = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const toggle = () => {
    dispatch(toggleSidebar());
  };

  const logOut = () => {
    dispatch(logoutUser())
    setTimeout(() => {
      navigate('/register')
    },2000)
  }


  return (
    <Wrapper>
      <div className="nav-center">
        {/* <button type='button' className='toggle-btn' onClick={toggle}>
          <FaAlignLeft />
        </button> */}
        {user && (

        <ul className="nav-list">
          <li>
            <a style={{color:'black'}} href="/addTask">Add Task</a>
          </li>
          <li>
            <a style={{color:'black'}} href="allTasks">View All Tasks</a>
          </li>
        </ul>
        )}
        <div>
          {/* <Logo /> */}
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
               onClick={() =>logOut()}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
