import React, {useState} from "react";
import Todoinput from "./Todoinput";
import "./todostyle.css";
import TodoList from "./todoList";
const home = () => {
  const [listTodo, setListTodo] = useState([]);
  let addList = (inputText)=>{
    setListTodo([...listTodo, inputText]);
  }
  return (
    <div className="main-container">
      <div className="center-container">
        <Todoinput addList={addList} /> 
        <TodoList/>
      </div>
    </div>
  );
};   

export default home;
   