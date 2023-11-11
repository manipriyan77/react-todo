import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'Todo',
  initialState: {
    todo: [],
    completedTodos: [],
    activeTodos: [],
  },
  reducers: {
    addTodo(state, action) {
      state.todo.push(action.payload);
      state.activeTodos.push(action.payload);
      console.log(JSON.parse(JSON.stringify(state.activeTodos)));

      localStorage.setItem('todos', JSON.stringify(state.todo));
    },
    isCompleted(state, action) {
      // let getLocalStorage = localStorage.getItem('todos');
      let indexOfObjectToRemove = state.activeTodos.findIndex((obj) => obj.id === action.payload);
      if (indexOfObjectToRemove !== -1) {
        state.activeTodos.splice(indexOfObjectToRemove, 1);
        console.log(JSON.parse(JSON.stringify(state.activeTodos)));
      }
      const newTodo = state.todo.find((value) => {
        return value.id === action.payload;
      });
      if (newTodo) {
        newTodo.isCompleted = true;
        state.completedTodos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(state.todo));
      }
    },
    markIncomplete(state, action) {
      const index = state.completedTodos.findIndex((value) => value.id === action.payload);
      console.log(JSON.parse(JSON.stringify(state.todo)));
      const newTodo = state.todo.find((value) => {
        return value.id === action.payload;
      });
      if (newTodo) {
        newTodo.isCompleted = false;
        state.completedTodos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(state.todo));
      }
      if (index !== -1) {
        state.completedTodos.splice(index, 1);
      }
    },
  },
});

export default todoSlice;

export const todoActions = todoSlice.actions;
