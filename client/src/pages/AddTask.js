import React, { useState } from "react";
import FormRow from "../components/FormRow";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createTask, editTask } from "../store/Task/taskSlice";

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    desc: "",
  });
  const dispatch = useDispatch();
  const { editJobId, isEditing } = useSelector((state) => state.task);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setTask({ ...task, [name]: value });
  };

  const onSubmit = (e) => {
    const { title, desc } = task;
    e.preventDefault();
    if (!title || !desc) {
      toast.error("Please fill out the field");
      return;
    }
    if (isEditing) {
      dispatch(
        editTask({
          taskId: editJobId,
          task: { title, description: desc },
        })
      );
      return;
    }
    dispatch(createTask({ title: title, description: desc }));
    setTask({ title: "", desc: "" });
  };

  return (
    <Wrapper className="page full-page">
      <div className="container">
        <form className="form" onSubmit={onSubmit}>
          <FormRow
            type="text"
            name="title"
            value={task.title}
            handleChange={handleChange}
            placeholder={"Add your title"}
          />
          <FormRow
            type="text"
            name="desc"
            value={task.desc}
            handleChange={handleChange}
            placeholder={"Add your tasks"}
          />
          <button className="add-btn">
            {isEditing ? 'Edit' : 'Add'}
          </button>
        </form>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  display: grid;
  align-items: center;

  .form {
    max-width: 400;
    border-top: 5px solid var(--primary-500);
    /* display: flex;
    justify-content: space-between; */
  }

  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
  }
  .add-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
    border: 0;
    padding: 8px;
    width: 60px;
  }
`;

export default AddTask;
