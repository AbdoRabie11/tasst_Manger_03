import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../store/allTasks/allTasksSlice";
import { deleteTask } from "../store/Task/taskSlice";
import Task from "../components/Task";
import Wrapper from "../assets/wrappers/JobsContainer";
import Loading from "../components/Loading";

const AllTasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state?.tasks);

  useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  if (tasks.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <Wrapper>
      {tasks?.map((item) => {
        return <Task key={item._id} {...item} />;
      })}
    </Wrapper>
  );
};

export default AllTasks;
