import React from "react";
import styled from "styled-components";
import to_doback from "../assets/to-do-back.svg";
import logo from "../assets/logo.png";

const HomePage = () => {
  return (
    <Wrapper>
      <div className='logo'>
        <img src={logo} alt='' />
      </div>
      <h1 className='title-home'>Welcome to Your To-Do App</h1>
      <p className='text'>
        Manage your tasks efficiently with our easy to use to-do app.
      </p>
      <div className='img'>
        <img src={to_doback} alt='' />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  width: 50%;
  padding: 100px;
  padding-top: 150px;
  text-align: left;
  position: relative;

  .logo {
    position: fixed;
    top: 7%;
    transform: translate(-50%, -50%);
    left: 5%;
    width: 150px;
  }
  .title-home {
    font-size: clamp(45px, 8vw, 70px);
    text-align: left;
    color: #fff;
    margin-bottom: 20px;
  }
  .text {
    font-size: clamp(17px, 8vw, 22px);
    color: #fff;
  }

  .img {
    width: 500px;
    height: 500px;
    /* position: fixed;
    top: 60%;
    transform: translate(-50%, -50%);
    left: 40%; */
  }
  .img img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 1200px) {
    .img {
      display: none;
    }
    .logo {
      top: 7%;
      left: 10%;
    }
  }
  @media (max-width: 600px) {
    width: 80%;
    padding: 50px;
    padding-top: 50px;
    padding-right: 5px;
    padding-left: 5px;

    .title-home {
      margin: 0 auto;
      text-align: center;
      max-width: 300px;
      margin-bottom: 40px;
    }
    .text {
      margin: 0 auto;
      text-align: center;
      max-width: 300px;
    }
    .img {
      display: none;
    }
    .logo {
      position: fixed;
      top: 5%;
      transform: translate(-50%, -50%);
      left: 8%;
    }
    .logo {
      top: 7%;
      left: 10%;
    }
  }
`;
export default HomePage;
