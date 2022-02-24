
import Http from './Http'
export const getTodo=(config:any) =>{
    return Http.get("/todos",config)
}
export const deleteTodo=(id:number) =>{
    return Http.delete(`/todos/${id}`)
}
export const createTodo=(job:any)=>{
    return Http.post("/todos/",job)
}
export const editTodo=(id:number, job:any)=>{
    return Http.put(`/todos/${id}`, job)
}