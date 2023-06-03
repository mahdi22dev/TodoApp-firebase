import React, { useState, useContext, useEffect, useRef } from "react";
const AppContext = React.createContext();
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  onSnapshot,
  collection,
  getDocs,
  doc,
  deleteDoc,
  addDoc,
  serverTimestamp,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FaAward } from "react-icons/fa";

// firebase key
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
const db = getFirestore(app);
const auth = getAuth(app);

// query build using firestore query

// context provider
const AppProvider = ({ children }) => {
  // providor states
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(false);
  const [logInMessage, setLogInMessage] = useState(false);
  const [Idholder, setIdholder] = useState("");

  let result = "";
  const [dataHolder, setDataHolder] = useState([result]);
  // get data from database and set setData
  const getdata = async (uid) => {
    const UserRef = collection(db, `/Users/${uid}/UserTasks`);
    const q = query(UserRef, orderBy("createdAt"));
    onSnapshot(q, (snapshot) => {
      result = snapshot.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      });
      setData(result);
      setDataHolder(result);
      setIsLoading(false);
    });
  };

  // grab collection names
  const getTasks = async () => {
    // const UserRef = collection(db, `/Users/${Idholder.uid}/UserTasks`);
    // const q = query(UserRef, where("taskGroup", "==", "react"));
    // const querySnapshot = await getDocs(q);
    // querySnapshot.docs.map((doc) => {
    //   console.log(doc.data());
    //   console.log("done");
    // });
    // setUserCollections(data);
    // console.log(UserCollections);
  };
  // grab fields values
  // add a task to database
  const addTaskTofirebase = async (value) => {
    const UserRef = collection(db, `/Users/${Idholder.uid}/UserTasks`);
    if (value == "") {
      console.log("wrong shit");
    }
    await addDoc(UserRef, {
      name: value,
      completed: false,
      createdAt: serverTimestamp(),
      taskGroup: "react",
    });
  };

  // delete a task from database
  const deleteTask = async (id) => {
    const UserRef = collection(db, `/Users/${Idholder.uid}/UserTasks`);
    if (user) {
      const docref = doc(UserRef, id);
      await deleteDoc(docref);
    } else {
      setLogInMessage(true);
    }
  };
  const clearCompleted = async () => {
    const UserRef = collection(db, `/Users/${Idholder.uid}/UserTasks`);
    const q = query(UserRef, orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });

    const filter = data.map((task) => {
      if (task.completed == true) {
        const docref = doc(UserRef, task.id);
        deleteDoc(docref);
      }
      return task;
    });
    setData(filter);
  };
  // update a task
  const updateTask = async (IdEdit, value) => {
    const docupdatref = doc(db, `/Users/${Idholder.uid}/UserTasks`, IdEdit);
    await updateDoc(docupdatref, { name: value });
  };

  // task completed
  const Handletaskcompleted = async (id, completed) => {
    const docupdatref = doc(db, `/Users/${Idholder.uid}/UserTasks`, id);
    await updateDoc(docupdatref, { completed: !completed });
  };

  // user sing out
  const signOut = () => {
    auth.signOut();
    setUser(false);
  };

  return (
    <AppContext.Provider
      // conext values
      value={{
        addTaskTofirebase,
        data,
        setData,
        isLoading,
        setIsLoading,
        getdata,
        deleteTask,
        updateTask,
        user,
        setUser,
        logInMessage,
        setLogInMessage,
        Idholder,
        setIdholder,
        signOut,
        Handletaskcompleted,
        dataHolder,
        setDataHolder,
        clearCompleted,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
