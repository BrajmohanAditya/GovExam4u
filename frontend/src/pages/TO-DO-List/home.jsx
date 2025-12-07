import React, { useState , useEffect} from "react";
import Todoinput from "./Todoinput";
import "./todostyle.css";
import TodoList from "./todoList";
const home = () => {
  const [listTodo, setListTodo] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("todoList"));
    if (storedList) {
      setListTodo(storedList);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(listTodo));
  }, [listTodo]);


// function to add item in list
  let addList = (inputText) => {
    if (inputText !== "") setListTodo([...listTodo, inputText]);
  };
  const deleteListItem = (key) => {
    let newListTodo = [...listTodo];
    newListTodo.splice(key, 1);
    setListTodo(newListTodo);
  };


  return (
    <div className="main-container">
      <div className="center-container">
        <Todoinput addList={addList} /> {/* Todoinput component ko addList naam ka ek prop bhejo, */}
        <h2 className="app-heading">TODO</h2>
        <hr />
        {listTodo.map((listItem, i) => {
          return (
            <TodoList
              key={i}
              index={i}
              item={listItem}  
              deleteItem={deleteListItem}
            />
          );
          {
            /*yaha TodoList prop send kr raha hai*/
          }
        })}
      </div>
    </div>
  );
};

export default home;
