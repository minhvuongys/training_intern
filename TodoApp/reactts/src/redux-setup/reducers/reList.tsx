const initialState = {
    listTodo: []
}
export default (state=initialState, action:any) => {
    switch (action.type){
        case "SET_TODO": return{listTodo: action.payload};
        case "ADD_TODO": return{listTodo: [...state.listTodo,action.payload]}
        default: return state
    }
}