import React from "react";
import { createTodo, getTodo } from "../../../services/Api";
import { useDispatch } from "react-redux";
import {useAppDispatch} from "../../../redux-setup/hook"
import { setTodo } from "../../../redux-setup/action/ListActions";

interface AddNewProps{
  TodoValue:string,
  changeTodoValue: (value:string)=>void,
  setFilter: (filter:string)=>void
}
const AddNew = (props:AddNewProps) => {
  const onChangeTodoValue = (e: React.ChangeEvent<{
    value: string
  }>) => {
    return props.changeTodoValue(e.target.value);
  };

  const dispatch = useAppDispatch();

  const addToList = () => {
    createTodo({
      userId: 11,
      title: props.TodoValue,
      completed: false,
    }).then((res) => {
      console.log(res);
      if (res.status === 201) {
        props.changeTodoValue("");
        alert("Add job to list successfully!");
      }
      (document.getElementById("filter")as HTMLInputElement).value="all"
      props.setFilter("all")
      getTodo({}).then((res) => {
        console.log(res.data);
        dispatch(setTodo(res.data));
      });
    });
  };
  return (
    <div className="add-new">
      <input
        type="text"
        placeholder="Add new ..."
        value={props.TodoValue}
        onChange={onChangeTodoValue}
      />
      <i
      className="fas fa-calendar-alt"
      data-title="Set a Due Date"
    ></i>
      <button type="button" onClick={addToList}>
        Add
      </button>
    </div>
  );
};
export default AddNew;
