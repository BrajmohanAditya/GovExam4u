import React from "react";
import "./todostyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function TodoList(props) {
  // receive props here
  return (
    <div>
      <li className="list-item">
        {props.item}
        <span className="icons">
          <FontAwesomeIcon className="icon-delete" icon={faTrash}  onClick={e=>{
            props.deleteItem(props.index)
          }}/>
        </span>
      </li>
    </div>
  );
}

export default TodoList;
