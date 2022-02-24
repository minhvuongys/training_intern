import React from "react";
import Title from "./shared/components/title/Title";
import AddNew from "./shared/components/add-new/AddNew";
import ViewOptions from "./shared/components/view-option/ViewOption";
import List from "./shared/components/list/List";
import {Provider} from "react-redux"
import store from "./redux-setup/store"

interface SetFilterContextValue{
  setFilter: (filter: string)=>void;
}
export const SetFilterContext=React.createContext<SetFilterContextValue>(null!)

function App() {
  const [TodoValue, setTodoValue] = React.useState<string>("");
  const changeTodoValue = (value:string) => {
    return setTodoValue(value);
  };

  const [filter, setFilter]=React.useState<string>("all")
  return (
    <Provider store={store}>
      <SetFilterContext.Provider value={{setFilter}}>
      <div className="container">
        <Title />
        <AddNew
          TodoValue={TodoValue}
          changeTodoValue={changeTodoValue}
          setFilter={setFilter}
        />
        <hr />
        <ViewOptions setFilter={setFilter}/>
        <List filter={filter}/>
      </div>
      </SetFilterContext.Provider>
    </Provider>
  );
}

export default App;
