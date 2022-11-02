import React, { useState } from "react";
import Editable from "./EditText";
import { editFilds } from "../store/greet";
import { useDispatch } from "react-redux";
export default function Edit(props) {
    const dispatch = useDispatch()
    const {name, value, id, type} = props
    const [task , setTask] = useState(value)
    return (
        <Editable text={task} placeholder="-" type="input">
        <input
          name={name}
          placeholder="-"
          value={task}
          type={type}
          onChange={(e) => {
            
            setTask(e.target.value)
            
        }}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              // Do code here
              ev.preventDefault();
              dispatch(editFilds({id:id, name:name, value: task}))
            }
          }}
        />
      </Editable>
    )
}