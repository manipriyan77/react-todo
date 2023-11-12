import { createSlice } from '@reduxjs/toolkit';
import { fromJSON } from 'postcss';
import { validate } from 'uuid';

const todoSlice = createSlice({
  name: 'Todo',
  initialState: {
    todo: [],
    completedTodos: [],
    activeTodos: [],
    currentState: 'all',
  },
  reducers: {
    addTodo(state, action) {
      state.todo.push(action.payload);
      state.activeTodos.push(action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todo));
    },
    initializeTodos(state, action) {
      state.todo = action.payload;
      state.activeTodos = action.payload.filter((todo) => !todo.isCompleted);
      state.completedTodos = action.payload.filter((todo) => todo.isCompleted);
    },
    isCompleted(state, action) {
      // let getLocalStorage = localStorage.getItem('todos');
      let indexOfObjectToRemove = state.activeTodos.findIndex((obj) => obj.id === action.payload);
      if (indexOfObjectToRemove !== -1) {
        state.activeTodos.splice(indexOfObjectToRemove, 1);
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
      const newTodo = state.todo.find((value) => value.id === action.payload);

      if (newTodo && newTodo.isCompleted) {
        newTodo.isCompleted = false;
        if (index !== -1) {
          state.completedTodos.splice(index, 1);
        }
        state.activeTodos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(state.todo));
      }
    },

    setCurrentState(state, action) {
      state.currentState = action.payload;
    },
    clearCompleted(state) {
      state.completedTodos = [];
      state.todo = state.activeTodos;
      localStorage.setItem('todos', JSON.stringify(state.todo));
    },
    deleteTodo(state, action) {
      const newTodos = state.todo.filter((value) => {
        return value.id !== action.payload;
      });
      state.activeTodos = newTodos.filter((value) => {
        if (value.isCompleted === false) {
          return value;
        }
      });

      state.completedTodos = newTodos.filter((value) => {
        if (value.isCompleted === true) {
          return value;
        }
      });
      state.todo = newTodos;
      localStorage.setItem('todos', JSON.stringify(state.todo));
    },
    completeAllTodos(state, action) {
      state.todo.forEach((value) => {
        if (value.isCompleted === false) {
          value.isCompleted = true;
          state.completedTodos = state.todo;
          state.activeTodos = [];
          localStorage.setItem('todos', JSON.stringify(state.todo));
        } else {
          value.isCompleted = false;
          state.completedTodos = [];
          state.activeTodos = state.todo;
          localStorage.setItem('todos', JSON.stringify(state.todo));
        }
      });

      console.log(JSON.parse(JSON.stringify(state.todo)), 'hapend');
    },
    editTodo(state, action) {
      state.todo.forEach((value) => {
        if (value.id === action.payload.id) {
          console.log('inside');

          value.value = action.payload.value;
        }
      });
      localStorage.setItem('todos', JSON.stringify(state.todo));
    },
  },
});

export default todoSlice;

export const todoActions = todoSlice.actions;
