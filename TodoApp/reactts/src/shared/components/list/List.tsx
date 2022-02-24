import React from "react";
import ListItem from "./ListItem";
import { getTodo } from "../../../services/Api";
import { setTodo } from "../../../redux-setup/action/ListActions";
import { useDispatch, useSelector } from "react-redux";
import {useAppDispatch, useAppSelector} from "../../../redux-setup/hook"

interface ListProps{
  filter:string
}
const List = (props:ListProps) => {
  console.log("re-render")
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    switch (props.filter) {
      case "all": {
        getTodo({}).then((res) => {
          dispatch(setTodo(res.data));
        });
        break;
      }
      case "completed": {
        getTodo({
          params: {
            completed: true,
          },
        }).then((res) => {
          dispatch(setTodo(res.data));
        });
        break;
      }
      default:
        console.log("Can't get API")
    }
  }, [props.filter]);

  const list = useAppSelector((reducers) => {
    return reducers.List.listTodo;
  });
  console.log(list);

  return (
    <div className="list">
      {list.map((value:any, index:number) => {
        return <ListItem value={value}/>;
      })}
    </div>
  );
};
export default React.memo(List);
