
import { useEffect, useState } from 'react';
import './App.css';
const LOCAL_STORAGE_KEY='todos.key'


function App() {

  const handleAddTodo=()=>{
  
    if(todo==='') return
    setTodos( [...todos,{id:Date.now(),text:todo,complete:false}])
    setTodo('')
    

  }
  const handleEditTodo =(id)=>{
    setedtingTodoId(id)
  }
  const handleUpdateTodo =(id)=>{
    setedtingTodoId(null);
  }
  const handleInputChange =(e,id)=>{
    const updatedTodo=todos.map((t)=>
      t.id===id && e.target.value!=='' ? {...t,text:e.target.value}:t
      )
      setTodos(updatedTodo)
  }

  const [todos,setTodos]=useState([])
  const [todo,setTodo]=useState('')
  const [edtingTodoId,setedtingTodoId]=useState(null)

  
  useEffect(()=>{
   const storedTodos=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
   if(storedTodos) setTodos(storedTodos)

  },[])
  useEffect(()=>{
    if(todos.length>0){
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
    }

  },[todos])
  
  return (
    <div className="app">
      <div className="mainHeading">
        <h1>TODO APP</h1>
      </div>
      <div className="input">
        <input value={todo} type="text"  onChange={(event)=>{setTodo(event.target.value)}}  placeholder="Add Todo..."  />
        <i onClick={handleAddTodo} className="fas fa-plus"></i>
      </div>
      
      <div className="todos">
      {
      todos.map((todo,key)=>
        
                <div className="todo" key={key}>
                <div className="left">
                  <input type="checkbox" onChange={(e)=>{
                    console.log(e.target.checked);
                    console.log(todo);
        
                    setTodos(todos.filter((obj)=>{
                      if(obj.id===todo.id){
                        obj.complete=e.target.checked
                      }
                      return obj
                    }))
                  }}  />
                  {
                  edtingTodoId===todo.id ? (
                    <input className='inputchange'
                    type="text"
                    value={todo.text}
                    onChange={(e) => handleInputChange(e, todo.id)}
                  />

                  ):<p>{todo.text}</p>
                  }
                </div>
                <div className="edit">
                 {
                    edtingTodoId===todo.id ? (
                      <i
                        className="fas fa-check"
                        onClick={() => handleUpdateTodo(todo.id)}
                      ></i>
                    ):(      
                      <p onClick={() => handleEditTodo(todo.id)}>🖊️</p>
                    )
                  }
                </div>
     
                <div className="right">
                  <i onClick={()=>setTodos(todos.filter((obj2=>obj2.id!==todo.id)))} className="fas fa-times"></i>
                </div>
     
              </div>

      )}
      </div>
      
    </div>
    
  );
                
}

export default App;
