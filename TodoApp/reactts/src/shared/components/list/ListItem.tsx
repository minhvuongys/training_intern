import React from "react";
import { useRef } from "react";
import { getTodo, deleteTodo, editTodo } from "../../../services/Api";
import { setTodo } from "../../../redux-setup/action/ListActions";
import { useDispatch } from "react-redux";
import {useAppDispatch} from "../../../redux-setup/hook"
import {SetFilterContext} from "../../../App"

interface ListItemProps{
  value: any
}
const ListItem = (props:ListItemProps) => {
  const [ItemDetail, setItemDetail] = React.useState<any>({});
  React.useEffect(()=>{
    setItemDetail({...props.value})
  },[props.value])
  const [sttEdit, setSttEdit] = React.useState<boolean>(true);

  const inputRef = useRef<HTMLInputElement>(null!);
  const editClick = ():void => {
    setSttEdit(false);
    console.log(inputRef.current)
  };
  React.useEffect(() => {
    if(sttEdit===false){
      inputRef.current.focus();
    }
  },[sttEdit])

  const dispatch = useAppDispatch();

  const setDataTitle = (check:boolean):string => {
    if (check === true) {
      return "Mark as todo";
    } else {
      return "Mark as completed";
    }
  };

  const deleteClick = (index:number):void => {
    console.log(index);
    deleteTodo(index).then((res) => {
      console.log(res);
      if ((res.status = 200)) {
        alert("Delete job successfully!");
      }
      getTodo({}).then((res) => {
        console.log(res.data);
        dispatch(setTodo(res.data));
      });
    });
  };

  const fixValueCheckBox = (e:React.ChangeEvent<{
    name: string,
    checked: boolean
  }>):void => {
    const { name, checked } = e.target;
    setItemDetail({ ...ItemDetail, [name]: checked });
  };

  const fixValueInput = (e:React.ChangeEvent<{
    name:string,
    value: string
  }>):void => {
    const { name, value } = e.target;
    setItemDetail({ ...ItemDetail, [name]: value });
  };

  const {setFilter}=React.useContext(SetFilterContext)

  const SubmitEditTodo = (id:number) => {
    console.log(ItemDetail);
    editTodo(id, ItemDetail).then((res) => {
      console.log(res);
      if (res.status === 200) {
        alert("Edit job successfully!");
      }
      setSttEdit(true);
      (document.getElementById("filter")as HTMLInputElement).value="all"
      setFilter("all")
      getTodo({}).then((res) => {
        console.log(res.data);
        dispatch(setTodo(res.data));
      });
    });
  };

  return (
    <div className="list-item" key={ItemDetail.id}>
      <div className="list-item-left">
        <input
          type="checkbox"
          id={ItemDetail.id}
          name={"completed"}
          checked={ItemDetail.completed}
          data-title={setDataTitle(ItemDetail.completed)}
          onChange={fixValueCheckBox}
        />
        <input
          type="text"
          name="title"
          value={ItemDetail.title}
          className={"text-input"}
          id={ItemDetail.id}
          disabled={sttEdit}
          onChange={fixValueInput}
          ref={inputRef}
        />
      </div>
      <div className="list-item-right">
        <div className="edit-delete">
          <i
            className="fas fa-pencil-alt"
            data-title="Edit todo"
            onClick={() => editClick()}
          />
          <i
            className="fas fa-trash-alt trash-icon"
            data-title="Delete todo"
            onClick={() => deleteClick(ItemDetail.id)}
          />
          {
            sttEdit===false?(
              <button type="button" onClick={() => SubmitEditTodo(ItemDetail.id)}>
                Save
              </button>
            ):null
          }
        </div>
        <div className="info">
          <i className="fas fa-info-circle" data-title="Created date" />
          <label>19/02/2022</label>
        </div>
      </div>
    </div>
  );
};
export default ListItem;
