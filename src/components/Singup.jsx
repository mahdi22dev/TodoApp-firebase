import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  updateDoc,
  setDoc,
} from "firebase/firestore";

import { useGlobalContext } from "../context/Todo_context";
import HomePage from "./HomePage";

// firebase
const firebaseConfig = {
  apiKey: "AIzaSyC9EDrZ3XA_dqHmrL5xqjXcvzy4vq4gqIY",
  authDomain: "to-do-app-aecce.firebaseapp.com",
  projectId: "to-do-app-aecce",
  storageBucket: "to-do-app-aecce.appspot.com",
  messagingSenderId: "406030133309",
  appId: "1:406030133309:web:4c8a24eaa1bc48f96b6254",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
// notes
// keep track of user using auth state

const SingUp = () => {
  // user states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {
    getdata,
    setUser,
    setIsLoading,
    setLogInMessage,
    setData,
    setIdholder,
    user,
  } = useGlobalContext();
  // prevent page refresh
  const onsumbit = (e) => {
    e.preventDefault();
  };

  // store user in local storage

  // sing in users

  // sing up users
  const singUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        await setDoc(doc(db, "Users", cred.user.uid.toString()), {
          name: "user",
          createdAt: serverTimestamp(),
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Wrapper className='user'>
      <HomePage />
      <div className='user-container'>
        {" "}
        <div className='user'>
          {" "}
          <p className='title'>Create New Account for Free</p>
          <form className='user-form' onSubmit={onsumbit}>
            {" "}
            <input
              type='text'
              value={email}
              placeholder='email'
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              required
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className='btn' onClick={singUp}>
              Sing Up
            </button>
            <div className='singup-link'>
              You Have an Account ? log in from
              <Link to={"/login"}>Here</Link>
            </div>
          </form>
          <ul className='background'>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  .user-container {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
  }
  .user {
    background-color: #fff;
    width: 500px;
    height: 500px;
    padding: 30px;
    padding-top: 50px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  .user-form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .title {
    font-size: 30px;
    margin-bottom: 30px;
  }
  .user-form input {
    width: 80%;
    margin-bottom: 20px;
    padding: 15px;
    padding-left: 0;
    margin: 10px auto;
    border: 0;
    border-bottom: 1px solid red;
    border-color: grey;
    outline: 0;
    font-size: 16px;
    margin-bottom: 30px;
    color: #333;
  }
  input::placeholder {
    text-transform: capitalize;
  }
  .forget {
    margin: 0;
    width: 88%;
    text-align: right;
  }
  .forget a {
    font-size: 15px;
    text-decoration: none;
    font-weight: 400;
    color: black;
    cursor: pointer;
    transition: color 0.4s;
  }

  .forget a:hover {
    color: var(--color-primary-500);
  }
  .btn {
    margin: 20px auto;
    margin-top: 40px;
    width: 80%;
    padding: 15px;
    cursor: pointer;
    border-radius: 2px;
    outline: 0;
    border: 2px solid rgba(255, 0, 0, 0);
    text-transform: capitalize;
    font-size: 18px;
    color: #fff;
    background-color: var(--color-primary-500);
    transition-property: color, background-color;
    transition: 0.2s;
  }
  .btn:hover {
    color: var(--color-primary-500);
    background-color: #fff;
    border: 2px solid var(--color-primary-500);
  }
  .singup-link {
    margin: 10px auto;
    width: 88%;
    text-align: center;
  }
  .singup-link a {
    font-weight: 400;
    color: #333;
    cursor: pointer;
    margin-left: 4px;
    transition: color 0.4s;
  }
  .singup-link a:hover {
    color: var(--color-primary-500);
  }
  @media (max-width: 600px) {
    flex-direction: column;
    width: 100%;
    .user-container {
      width: 80%;
      margin-bottom: 20px;
    }
  }
`;

export default SingUp;
