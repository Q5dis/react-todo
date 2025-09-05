import { useState } from 'react';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "watch a movie",
      completed: false
    },
    {
      id: 2,
      text: "walk the dog", 
      completed: false
    },
    {
      id: 3,
      text: "cook a meal",
      completed: false
    }
  ]);
  
  const [addInput, setAddInput] = useState(""); // 이미 빈 문자열로 초기화되어 있음
  
  const handleInputChange = (e) => {
    setAddInput(e.target.value);
    console.log("value:", e.target.value); //입력값을 받아오기
  }
  
  const handleAddTodo = () => {
    if (addInput.trim() === "") return; // 빈 입력 방지
    
    const todo = {
      id: todos.length > 0 ? todos.at(-1).id + 1 : 1,
      //todos길이 0보다크냐? > 그러면 마지막원소 아이디에서 하나 늘킨 값이 네 아이디.
      //todos길이가 0보다 낮다= 즉 암것도 없냐? 그럼 너는 id가 1이다.
      text: addInput,
      completed: false
    };
    
    console.log("add todo", todo);
    setTodos([...todos, todo]); 
    setAddInput("");
  }

  const handleDeleteTodo=(id)=>{
    setTodos(todos.filter((todo)=>todo.id !==id))
    //클릭한 아이디와 해당 투두수 아이디가 같은지 일치한가 체크
    //클릭한 아이디와 같지않은 아이디만 냄기고 나머지를 지운다
    //투두스 리스트를 재정의한다
  }

    const handleComplete = (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          onChange={handleInputChange} 
          value={addInput || ""} // undefined 방지를 위한 fallback
          className="add-input" 
          type="text"
        />
        <button className="add-btn" onClick={handleAddTodo}>add</button>
        <div className="big-box">
          <div className="todo-container">
            {todos.map((todo) => (
              <div key={todo.id} className="todo-item">
                <div style={{textDecoration:todo.completed?"line-through":"none", cursor:"pointer"}}
                onClick={()=>handleComplete(todo.id)}
                >{todo.text}</div>
                <button className="del-btn" onClick={()=>handleDeleteTodo(todo.id)}>delete</button>
              </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}