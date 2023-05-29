import { useReducer, useRef, useState } from "react";

//1. Init state: 0
const initState = {
  task: "",
  todoList: []
};

//2. Actions
const SET_TASK = "set_task";
const ADD_TASK = "add_task";
const DEL_TASK = "del_task";
const EDIT_TASK = "edit_task";
const CLEAR_LIST = "clear_list";

// convert actions to functions
const setTask = (payload) => {
  return {
    type: SET_TASK,
    payload
  };
};
const addTask = (payload) => {
  return {
    type: ADD_TASK,
    payload
  };
};
const delTask = (payload) => {
  return {
    type: DEL_TASK,
    payload
  };
};
const editTask = (payload) => {
  return {
    type: EDIT_TASK,
    payload
  };
};
const clearList = (payload) => {
  return {
    type: CLEAR_LIST,
    payload
  };
};

//3. Reducer (switch cases)
const reducer = (state, action) => {
  console.log("Action: ", action);
  console.log("Prev State: ", state);

  let newState;

  switch (action.type) {
    case SET_TASK:
      newState = {
        ...state,
        task: action.payload
      };
      break;

    case ADD_TASK:
      newState = {
        ...state,
        todoList: [...state.todoList, action.payload]
      };
      break;

    case DEL_TASK:
      {
        const newTodoList = [...state.todoList];
        newTodoList.splice(action.payload, 1);
        newState = {
          ...state,
          todoList: newTodoList
        };
      }
      break;

    case EDIT_TASK:
      {
        const updatedTask = [...state.todoList];
        updatedTask[action.payload.index] = action.payload.value;
        newState = {
          ...state,
          todoList: updatedTask
        };
      }
      break;

    case CLEAR_LIST:
      newState = {
        ...state,
        todoList: []
      };
      break;

    default:
      throw new Error("Invalid action type");
  }

  console.log("New State: ", newState);

  return newState;
};

//4. Dispatch (kích hoạt 1 action)

function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { task, todoList } = state;

  const [editIndex, setEditIndex] = useState(null);
  const [conpleteIndex, setconpleteIndex] = useState(0);
  console.log(conpleteIndex);
  const [editValue, setEditValue] = useState("");

  const inputRef = useRef();

  const handleSubmit = () => {
    if (task !== "") {
      dispatch(addTask(task));
      dispatch(setTask(""));

      inputRef.current.focus();
    }
  };

  const handleEdit = (index, value) => {
    dispatch(editTask({ index, value }));
    setEditIndex(null);
    setEditValue("");
  };

  const handleComplete = (index) => {    
    dispatch(delTask(index));
    setconpleteIndex(prev => prev + 1)
  };

  return (
    <div style={{ padding: 50 }}>
      <h1> Todo App </h1>
      <p>Complete: {conpleteIndex}</p>
      <input
        ref={inputRef}
        value={task}
        placeholder="Enter a task..."
        onChange={(e) => {
          dispatch(setTask(e.target.value));
        }}
        onKeyUp={(e) => e.code === "Enter" && handleSubmit()}
      />

      <button onClick={handleSubmit}> Add </button>

      <ul>
        {todoList.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  defaultValue={task}
                  onChange={(e) => {
                    setEditValue(e.target.value);
                  }}
                />

                <button onClick={() => handleEdit(index, editValue)}>
                  Save
                </button>
              </>
            ) : (
              <>
                {task}

                <button
                  onClick={() => {
                    dispatch(delTask(index));
                  }}
                >
                  X
                </button>

                <button onClick={() => setEditIndex(index)}>Edit</button>

                <button onClick={() => handleComplete(index)}>Complete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {todoList.length >= 1 && (
        <button onClick={() => dispatch(clearList())}>Clear all</button>
      )}
    </div>
  );
}

export default App;