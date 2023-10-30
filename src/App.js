import { useState } from 'react';
import './App.css';

function App() {
  const [todo,setTodo] = useState('')
  const [todos,setTodos] = useState([])
  const [editID,setEditID] = useState(0)

  const addTodo = () => {
    if(todo?.length>0) {

      setTodos([...todos,{id:Date.now() , text:todo}])
      setTodo('')
    }
    if(editID)
    {
      //Editting the existing todo
      const editTodo = todos.find(item => item.id === editID)
      const updateTodo = todos.map(task => task.id === editTodo.id
      ? (task = {id : task.id , text : todo})
      : (task = {id : task.id , text : task.text}))
      setTodos(updateTodo)
      setEditID(0)
      setTodo('')
    }  
    
  }

  const handleDelete = (id) => {
    const deletedArray = todos.filter(item=>item.id !== id)
    setTodos(deletedArray)
  }

  const handleEdit = (id) => {
    const todoToEdit = todos.find(item=>item.id === id)
    setTodo(todoToEdit.text)
    setEditID(todoToEdit.id)
  } 

  const handleDeleteAll = () => {
    setTodos([])
  }

  return (
    <div className='h-screen flex flex-col  items-center'>
      <div className='p-2 rounded-full mt-8 mb-8 bg-white w-72'>
          <h1 className='text-3xl text-red-700 font-semibold text-center'>TODO LIST</h1>
      </div>
      <div className='flex items-center w-1/2 mb-3'> 
          <input value={todo} className="w-full p-4 text-xl font-medium rounded-full grid sm:grid-cols-12" type="text" onChange={(e)=>setTodo(e.target.value)}/>
          <i style={{marginLeft:'-56px'}} onClick={addTodo} class="bg-red-500 rounded-full p-4 text-white fa-solid fa-plus"></i>
      </div>
      <div className='flex justify-end w-1/2 px-5'>
        <i class="fa-solid fa-trash text-3xl text-red-800" title='DELETE ALL' onClick={handleDeleteAll}></i>
      </div>
      <div className='mt-3 w-1/2'>
        <ul>
          {
            todos?.length>0 ?
            todos.map((task,index) => (
              <li key={index} className='mt py-4 px-4 w-full bg-white rounded-md flex items-center justify-between font-semibold mb-3'>
                <span>{task.text}</span>
                <span className='flex items-center justify-between w-12'>
                  <i class="fa-solid fa-pen-to-square text-xl text-green-600" id='edit' title='EDIT' onClick={()=>handleEdit(task.id)}></i>
                  <i class="fa-solid fa-trash text-xl text-red-600" title='DELETE' id='delete' onClick={()=>handleDelete(task.id)}></i>
                </span>
              </li>
            )) : 
            <div className='p-3 bg-red-500 text-white text-center'>
              <p>Nothing To Do</p>
            </div>
          }
          
        </ul>
      </div>
    </div>
  );
}

export default App;