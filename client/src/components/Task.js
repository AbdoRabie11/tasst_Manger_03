import React from "react";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import { useDispatch } from "react-redux";
import { deleteTask, setEditJob } from "../store/Task/taskSlice";
import moment from "moment";

const Task = ({
  _id,
  title,
  description,
  createdAt,
  status,
}) => {

  const date = moment(createdAt).format('MMM Do, YYYY');
  const dispatch = useDispatch()
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{status.charAt(0)}</div>
        <div className="info">
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/addTask"
              className="btn edit-btn"
              onClick={() =>
                dispatch(
                  setEditJob({
                    editJobId: _id,
                   title,
                   description,
                   status
                  })
                )
              }
            >
              Edit
            </Link>
            <button
              type="button"
              className="btn delete-btn"
              onClick={() => dispatch(deleteTask(_id))}
            >
              delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Task;
