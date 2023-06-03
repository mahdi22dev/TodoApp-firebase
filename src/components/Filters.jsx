import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/Todo_context";
const Filters = () => {
  const { setData, dataHolder, clearCompleted } = useGlobalContext();
  const [highlightedButton, setHighlightedButton] = useState("");
  const handleButtonClick = (buttonName) => {
    if (highlightedButton === buttonName) {
      setHighlightedButton(""); // Remove highlight if already highlighted
    } else {
      setHighlightedButton(buttonName); // Highlight the clicked button
    }
  };
  const arrayLength = dataHolder.length;
  //  Filters
  const all = () => {
    setData(dataHolder);
  };
  const active = () => {
    const filter = dataHolder.filter((task) => task.completed == false);
    setData(filter);
  };
  const completed = () => {
    const newfilter = dataHolder.filter((task) => task.completed == true);
    setData(newfilter);
  };
  return (
    <Wrapper className='filtter-container'>
      <div className='filters'>
        <p className='items-lenght'>{`${arrayLength} Items left`}</p>
        <div className='filters-btns'>
          <button
            className={
              highlightedButton == "btn1"
                ? "btn filter-btn lighted"
                : "btn filter-btn"
            }
            onClick={(e) => {
              all();
              handleButtonClick("btn1");
            }}
          >
            All
          </button>
          <button
            className={
              highlightedButton == "btn2"
                ? "btn filter-btn lighted"
                : "btn filter-btn"
            }
            onClick={(e) => {
              active();
              handleButtonClick("btn2");
            }}
          >
            active
          </button>
          <button
            className={
              highlightedButton == "btn3"
                ? "btn filter-btn lighted"
                : "btn filter-btn"
            }
            onClick={(e) => {
              completed();
              handleButtonClick("btn3");
            }}
          >
            completed
          </button>
        </div>
        <button
          className='btn filter-btn completed-btn'
          onClick={clearCompleted}
        >
          clear completed
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 10px;
  padding-left: 0px;
  padding-right: 0px;

  font-family: var(--font-family2);
  button {
    display: block;
    font-family: var(--font-family2);
  }
  .filters {
    display: flex;
    justify-content: space-between;
  }
  .items-lenght {
    margin-right: 10px;
    margin-left: 10px;
  }
  .filters-btns {
    display: flex;
    gap: 15px;
  }
  .filter-btn {
    border: 0;
    outline: 0;
    background-color: transparent;
    color: #692986;
    text-transform: capitalize;
    transition: color 0.3s;
  }
  .filter-btn:hover {
    color: #b33beb;
  }
  .completed-btn {
    margin-right: 10px;
    margin-left: 10px;
  }
  .lighted {
    color: #b33beb;
  }
  .items-lenght {
    color: #b33beb;
  }
`;
export default Filters;
