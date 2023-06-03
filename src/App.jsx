import TodoList from "./components/TodoList";
import styled from "styled-components";
import User from "./components/User";
import { AppProvider, useGlobalContext } from "./context/Todo_context";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import SingUp from "./components/Singup";
import { useState } from "react";
import image from "./assets/background.jpg";

function App() {
  const [background, setBackground] = useState();

  return (
    <AppProvider>
      <Wrapper
        className='container'
        style={{ backgroundImage: `url(${background ? background : image})` }}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path='/login'
              element={<User setBackground={setBackground} />}
            ></Route>
            <Route path='/singup' element={<SingUp />}></Route>

            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <TodoList />{" "}
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </AppProvider>
  );
}

const Wrapper = styled.section`
  :root {
    /** CSS PRIMARY COLORS */
    --color-primary-500: #b33beb;
    --color-primary-600: #8d32b7;
    --color-primary-700: #692986;
    --color-primary-800: #461f58;
    --color-primary-900: #26152e; /** EXAMPLES */
    --font-family: "Barlow Condensed", sans-serif;
  }
  /* background-color: {bac} var(--mainBG); */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  color: black;
  width: 100%;
  min-height: 100vh;
  font-family: "Barlow Condensed", sans-serif;
  letter-spacing: 1px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 111;
  position: relative;
`;
export default App;
