import React from "react";
import { useGlobalContext } from "../context/Todo_context";
import { FaTrash, FaEdit, FaCheck } from "react-icons/fa";
const Tasklist = ({ task, editTask }) => {
  const { deleteTask, Handletaskcompleted } = useGlobalContext();
  return (
    <>
      <div className='todo-list'>
        <div className='text-container'>
          <button
            className={task.completed ? "btn-check btn-checked" : "btn-check"}
            onClick={(e) => {
              const id = task.id;
              const completed = task.completed;
              Handletaskcompleted(id, completed);
            }}
          >
            {task.completed ? <FaCheck /> : ""}
          </button>

          <p className={task.completed ? "text completed" : "text"}>
            {task.name}
          </p>
        </div>
        {/* edit task */}
        <div className='btn-container'>
          <button
            className='btn btn-2'
            onClick={() => {
              editTask(task);
            }}
          >
            <FaEdit />
          </button>
          {/* delete task */}
          <button
            className='btn btn-2'
            onClick={() => {
              deleteTask(task.id);
            }}
          >
            <FaTrash />
          </button>
        </div>
      </div>
      <div
        className='line'
        style={{
          width: "100%",
          height: "2px",
          backgroundColor: "#8d32b7",
          marginTop: "5px",
          marginBottom: "8px",
        }}
      ></div>
    </>
  );
};

export default Tasklist;
