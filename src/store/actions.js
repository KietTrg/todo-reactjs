import {
  SET_TODO_INPUT,
  ADD_TODO,
  DELETE_TODO,
  DELETE_ALL_TODO,
  EDIT_INDEX_TODO,
  EDIT_VALUE_TODO,
  SAVE_EDIT_TODO,
  COMPLETE_TODO,
} from "./contants";

export const setTodoInput = (payload) => ({
  type: SET_TODO_INPUT,
  payload,
});
export const addTodo = (payload) => ({
  type: ADD_TODO,
  payload,
});
export const deleteTodo = (payload) => ({
  type: DELETE_TODO,
  payload,
});
export const deleteAllTodo = (payload) => ({
  type: DELETE_ALL_TODO,
  payload,
});
export const editIndexTodo = (payload) => ({
  type: EDIT_INDEX_TODO,
  payload,
});
export const editValueTodo = (payload) => ({
  type: EDIT_VALUE_TODO,
  payload,
});
export const saveEditTodo = (payload) => ({
  type: SAVE_EDIT_TODO,
  payload,
});
export const completeTodo = (payload) => ({
  type: COMPLETE_TODO,
  payload,
});