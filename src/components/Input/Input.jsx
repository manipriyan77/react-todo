import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { todoActions } from '../../store/todoSlice';

const Input = () => {
  const [enteredValue, setEnteredValue] = useState('');

  const dispatch = useDispatch();
  const todoArray = useSelector((state) => state.todo);
  // const [completeAll, setCompleteAll] = useState(false);
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
        <div className="px-4 w-[100%] mb-4 flex bg-white items-center">
          <input
            type="checkbox"
            name=""
            id="toggle-all"
            onChange={() => dispatch(todoActions.completeAllTodos())}
          />
          <label htmlFor="toggle-all" className="text-[0px] toggle_all_btn cursor-pointer">
            Toggle-all
          </label>
          <input
            type="text"
            placeholder="what task has to be done??"
            value={enteredValue}
            onChange={(e) => setEnteredValue(e.target.value)}
            className="px-4 py-3 w-[90%] bg-transparent"
          />
        </div>
      </form>
    </>
  );
};

export default Input;
