export const setTodo=(todo:any[]):object=>{
    return {
        type: "SET_TODO",
        payload: todo
    }
}
export const addTodo=(todo:any[]):object=>{
    return {
        type: "ADD_TODO",
        payload: todo
    }
}