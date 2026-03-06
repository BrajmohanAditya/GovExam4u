import React from "react";
import "./todostyle.css";

function TodoList(props) {
  // receive props here
  return (
    <div>
      <li className="list-item">
        {props.item}
        <span className="icons">
          <button
            className="icon-delete"
            onClick={() => props.deleteItem(props.index)}
            aria-label="delete"
          >
            🗑️
          </button>
        </span>
      </li>
    </div>
  );
}

export default TodoList;
