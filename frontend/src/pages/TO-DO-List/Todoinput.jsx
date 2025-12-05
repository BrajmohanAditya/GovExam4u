import React, { useState } from "react";
import "./todostyle.css";
const Todoinput = (props) => {
  const [task, setTask] = useState("");
  return (
    <div className="input-container">
      <input
        type="text"
        placeholder="Add your task here..."
        value={task}
        className="input-box-todo"
        onChange={(e) => {
          setTask(e.target.value);
        }}
      />
      <button className="add-btn" onClick={()=>{
        props.addList(task)
        setTask("");
      }}>+</button>
    </div>
  );
};

export default Todoinput;
