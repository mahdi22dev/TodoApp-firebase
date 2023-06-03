import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaEdit, FaPlus } from "react-icons/fa";

import { useGlobalContext } from "../context/Todo_context";
import Tasklist from "./Tasklist";
import Filters from "./Filters";

const TodoList = () => {
  const [value, setInputvalue] = useState("");
  // grabe states from coontext api
  const {
    addTaskTofirebase,
    data,
    isLoading,
    getdata,
    deleteTask,
    updateTask,
    user,
    logInMessage,
    Idholder,
    signOut,
    Handletaskcompleted,
  } = useGlobalContext();
  // use state
  const [isEdeting, setIsEdeting] = useState(false);
  const [IdEdit, isIdEdit] = useState("");

  // trigger task editing
  const editTask = ({ name, id }) => {
    if (user) {
      setIsEdeting(true);
      setInputvalue(name);
      isIdEdit(id);
    } else {
      console.log("9awed");
    }
  };

  const onsumbit = (e) => {
    // prevent page refresh
    e.preventDefault();

    // update the task in database
    if (isEdeting) {
      if (user) {
        updateTask(IdEdit, value);
        setInputvalue("");
        setIsEdeting(false);
      } else {
        console.log("9awed");
      }
    }

    // add task to database
    if (!isEdeting) {
      if (user) {
        addTaskTofirebase(value);
        setInputvalue("");
        getdata(Idholder.uid);
      } else {
        console.log("9awed");
      }
    }
  };
  return (
    <>
      <Wrapper className='todo-container'>
        {/*  form */}
        <form className='todo-form' onSubmit={onsumbit}>
          <input
            className='input'
            value={value}
            onChange={(e) => {
              setInputvalue(e.target.value);
            }}
            type='text'
            placeholder='add new todo'
          />

          <button className='btn btn-1' onClick={() => {}}>
            {isEdeting ? <FaEdit /> : <FaPlus />}
          </button>
        </form>
        {/* Loading animation */}
        {isLoading && <div class='load'></div>}
        {/*  warning for login */}
        {logInMessage && <div>Log in first</div>}
        {/* task list */}
        <div className='todos-container'>
          {!isLoading &&
            data.map((task) => {
              return <Tasklist task={task} key={task.id} editTask={editTask} />;
            })}
        </div>

        {/* //filter */}
        <Filters />
        <button className='custom-btn btn-15 singout' onClick={signOut}>
          Sign Out
        </button>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.section`
  background-color: rgb(255, 255, 255);
  color: #333;
  width: min(700px, 80%);
  min-height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 20px;
  padding-bottom: 10px;
  z-index: 11111111;
  border-radius: 5px;
  position: relative;
  .btn {
    cursor: pointer;
    border-radius: 3px;
  }
  .todo-form {
    width: 100%;
    margin-bottom: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 50px;
    padding-right: 50px;
  }
  .todos-container {
    max-height: 500px;
    overflow: auto;
  }
  .todos-container {
    width: 100%;
    ::-webkit-scrollbar {
      background-color: #b33beb;
      width: 10px;
    }
    ::-webkit-scrollbar:hover {
      background-color: #692986;
    }
  }
  .todo-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-left: 50px;
    padding-right: 50px;
  }
  .text {
    color: #333;
    max-width: fit-content;
    font-size: clamp(13px, 1vw, 17px);
    font-family: "Cherry Bomb One", cursive;
    font-weight: 400;
  }
  .completed {
    text-decoration: 2px line-through #333;
  }
  .btn-container {
    display: flex;
    gap: 1rem;
  }

  .input {
    margin: 0 auto;
    padding: 10px;
    padding-left: 5px;
    width: 80%;
    height: 50px;
    border: 0;
    border-bottom: 2px solid #b33beb;
    outline: 0;
    width: 100%;
    transition-property: border, background-color;
    transition: 0.3s ease;
    color: #b33beb;
    font-family: var(--font-family2);
    font-size: 20px;
  }
  .input:focus {
    border-bottom: 2px solid #692986;
    background-color: #f9f5f6;
  }

  .input::placeholder {
    font-size: 15px;
    font-family: var(--font-family2);
    color: #b33beb;
  }

  .btn-1 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 50px;
    padding: 10px;
    margin-left: 5px;
    margin-top: 5px;
    background-color: #b33beb;
    color: #692986;
    font-size: 20px;
    transition-property: color, background-color;
    transition: 0.3s;
  }
  .btn-1:hover {
    background-color: #692986;
    color: #b33beb;
  }
  .btn-2 {
    padding: 10px;
    width: 40px;
    height: 40px;
    background-color: #b33beb;
    color: #692986;
    transition-property: color, background-color;
    transition: 0.3s;
  }

  .btn-2:hover {
    background-color: #692986;
    color: #b33beb;
  }
  .singout {
    position: fixed;
    top: 5%;
    transform: translate(-50%, -50%);
    right: 5%;
    outline: 0;
    width: 120px;
    border-radius: 2px;
    font-family: var(--font-family);
    font-size: 18px;
    cursor: pointer;
  }
  .text-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
  .btn-check {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 25px;
    min-height: 25px;
    border-radius: 50%;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
    transition-property: color, background-color;
    transition: 0.3s;
  }

  .btn-check:hover {
    background-color: #692986;
    color: #b33beb;
  }
  .btn-checked {
    background-color: #b33beb;
    color: #692986;
  }
  /* Loading component */
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes rotate {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  .load {
    margin: 20px;
    width: 60px;
    height: 60px;
    border: solid 10px #b33beb;
    border-radius: 50%;
    border-right-color: transparent;
    border-bottom-color: transparent;
    -webkit-transition: all 0.5s ease-in;
    -webkit-animation-name: rotate;
    -webkit-animation-duration: 1s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-timing-function: linear;
    transition: all 0.5s ease-in;
    animation-name: rotate;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`;

export default TodoList;
