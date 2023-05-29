import { useRef } from "react";
import { useStore, actions } from "../store";
import style from "./Home.module.scss";
import { BsCheck2, BsPencilSquare, BsX, BsXLg } from "react-icons/bs";
// import { useState } from "react";
function Home() {
  const [state, dispatch] = useStore();
  // const [complete, setComplete] = useState(0);
  const { editIndex, editValue } = state;

  const inputRef = useRef();
  const handleAdd = () => {
    if (state.todoInput !== "") {
      dispatch(actions.addTodo(state.todoInput));
      dispatch(actions.setTodoInput(""));
      inputRef.current.focus();
    }
  };
  const handleDelete = (index) => {
    dispatch(actions.deleteTodo(index));
  };
  const handleDeleteAll = () => {
    dispatch(actions.deleteAllTodo(state.todos));
  };
  const handleEdit = (todo, index) => {
    dispatch(actions.editIndexTodo(index));
    dispatch(actions.editValueTodo(todo));
  };
  const handleSaveEdit = () => {
    dispatch(actions.saveEditTodo({ editIndex, editValue }));
    dispatch(actions.editIndexTodo(undefined));
    dispatch(actions.editValueTodo(""));
  };
  const handleCompete = (todo, index) => {
    dispatch(actions.completeTodo({todo, index}))
    // dispatch(actions.deleteTodo(index));
  
  }
  const handleCancelEdit = () => {
    dispatch(actions.editIndexTodo(undefined));
  };
  
  return (
    <div className={style.main}>
      <div className={style.para}>
        <h1>TODO LIST</h1>
        <p>Số việc cần làm: {state.todos.length} </p>
        <div className={style.present}>
          <progress max={state.todos.length} value= {state.todoCompete.length}></progress>
          <p>{state.todos.length > 0 ?
          Math.round(state.todoCompete.length/state.todos.length*100) : "0"}%</p>
        </div>
        <div className={style.add}>
          <input
            ref={inputRef}
            value={state.todoInput}
            placeholder="thêm việc"
            onChange={(e) => {
              dispatch(actions.setTodoInput(e.target.value));
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && handleAdd();
            }}
            autoFocus
          />
          <button onClick={handleAdd}>Add</button>
        </div>
        {/* edit */}
        <ul>
          {state.todos.map((todo, index) => (
             <li key={index} style={{display: state.todoCompete.includes(todo) ? "none" : " "} }>
            {state.editIndex === index ? (
             
               
                <>
                  <input
                    defaultValue={todo}
                    onChange={(e) => {
                      dispatch(actions.editValueTodo(e.target.value));
                    }}
                    onKeyDown={(e) => {
                      e.key === "Enter" && handleSaveEdit();
                    }}
                    autoFocus
                  />
                  <BsCheck2 onClick={handleSaveEdit} />
                  <BsX onClick={handleCancelEdit} />
                </>

            ) : (
              <>
                <p>{todo}</p>
                <BsPencilSquare
                  className={style.btnCheck}
                  onClick={() => handleEdit(todo, index)}
                />
                <BsCheck2 onClick={() => handleCompete(todo, index)}/>
                <BsXLg onClick={() => handleDelete(todo, index)}/>


              </>
            )}
            </li>
          ))}
        </ul>
        <button className={style.deleteAll} onClick={handleDeleteAll}>
          Xóa Tất Cả
        </button>
        <p>{state.todoCompete.length}</p>
        {state.todoCompete.length >0 ? (
         <>
         <h2>COMPLETE LIST</h2>
         
         <ul>
           {state.todoCompete.map((item, index) => (
             <li key={index}>{item}</li>
           ))}
         </ul>
       </>
        ):(<p></p>)}
      </div>
    </div>
  );
}

export default Home;
