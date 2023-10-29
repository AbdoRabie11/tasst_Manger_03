import React, { useEffect, useState } from "react";
import FormRow from "../components/FormRow";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../store/user/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

// allTasks

const Register = () => {
  // const [values, setValues] = useState(initialState);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    isMember: true,
  });
  const navigate = useNavigate();

  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    if(user) {
      setTimeout(() => {
        navigate('/allTasks')
      },2000)
    }
  })

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <>
      <Wrapper className="page full-page">
        <div className="container">
          <form className="form" onSubmit={onSubmit}>
            <h4>{values.isMember ? "Login" : "Register"}</h4>

            {!values.isMember && (
              <FormRow
                type="name"
                name="name"
                value={values.name}
                handleChange={handleChange}
              />
            )}

            <FormRow
              type="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
            />

            <FormRow
              type="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
            />
            {/* end of single form row */}
            <button
              type="submit"
              className="btn btn-block"
              disabled={isLoading}
            >
              {isLoading ? "Fetching User..." : "Submit"}
            </button>
            <p>
              {values.isMember ? "Not a member yet?" : "Already a member?"}

              <button
                type="button"
                onClick={toggleMember}
                className="member-btn"
              >
                {values.isMember ? "Register" : "Login"}
              </button>
            </p>
          </form>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400;
    border-top: 5px solid var(--primary-500);
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
`;

export default Register;
