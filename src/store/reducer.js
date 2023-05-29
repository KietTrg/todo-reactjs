import {
  SET_TODO_INPUT,
  ADD_TODO,
  DELETE_TODO,
  DELETE_ALL_TODO,
  EDIT_INDEX_TODO,
  EDIT_VALUE_TODO,
  SAVE_EDIT_TODO,
  STORAGE_KEY,
  COMPLETE_TODO,
} from "./contants";
import storage from "./storage";

const initState = storage.get(STORAGE_KEY) ?? {
  todoInput: "",
  todos: [],
  todoCompete: [],
  editIndex: undefined,
  editValue: "",
};

function reducer(state, actions) {
  var tempTodo = {};
  switch (actions.type) {
    case SET_TODO_INPUT:
      tempTodo = { ...state, todoInput: actions.payload };
      break;
    case ADD_TODO:
      tempTodo = { ...state, todos: [...state.todos, actions.payload] };
      break;
    case COMPLETE_TODO:
      const newList = [...state.todos]
      let newListComplete = [...state.todoCompete]
      if(!state.todoCompete.includes(actions.payload.todo)){
        newListComplete = [...state.todoCompete, actions.payload.todo]
      }
      tempTodo = { ...state,todos: newList, todoCompete: newListComplete};
      break;
    case DELETE_TODO:
      const newTodoList = [...state.todos];
      newTodoList.splice(actions.payload, 1);
      tempTodo = { ...state, todos: newTodoList };
      break;
    case DELETE_ALL_TODO:
      tempTodo = { ...state, todos: [], todoCompete: [] };
      break;
    case EDIT_INDEX_TODO:
      tempTodo = { ...state, editIndex: actions.payload };
      break;
    case EDIT_VALUE_TODO:
      tempTodo = { ...state, editValue: actions.payload };
      break;
    case SAVE_EDIT_TODO:
      state.todos.splice(
        actions.payload.editIndex,
        1,
        actions.payload.editValue
      );
      tempTodo = { ...state };
      break;
    default:
      throw new Error("Lỗi chưa thêm action trong reducer");
  }
  storage.set(STORAGE_KEY, tempTodo);
  return tempTodo;
}

export { initState };
export default reducer;
