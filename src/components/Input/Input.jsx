import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { todoActions } from '../../store/todoSlice';

const Input = () => {
  const [enteredValue, setEnteredValue] = useState('');

  const dispatch = useDispatch();
  const todoArray = useSelector((state) => state.todo);
  function enterDataHandler(e) {
    e.preventDefault();
    if (enteredValue.length === 0) {
      alert('Please enter a todo to add');
    } else if (todoArray.todo.some((todoValue) => todoValue.value === enteredValue)) {
      alert('this task is already there');
      setEnteredValue('');
    } else {
      const newTask = {
        value: enteredValue,
        isCompleted: false,
        id: uuidv4(),
      };
      dispatch(todoActions.addTodo(newTask));
      setEnteredValue('');
    }
  }

  return (
    <>
      <form onSubmit={enterDataHandler}>
        <span></span>
        <input
          type="text"
          placeholder="what task has to be done??"
          value={enteredValue}
          onChange={(e) => setEnteredValue(e.target.value)}
          className="p-4 w-[100%] mb-4"
        />
      </form>
    </>
  );
};

export default Input;
