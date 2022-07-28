import React, { useState } from "react";

const TodoFormAdd = () => {
  const [task, setTask] = useState("");
  const [newTask, setNewTask] = useState([]);

  const addTaskHandler = (e) => {
    e.preventDefault();

    if (task) {
      e.preventDefault();
      const item = {
        id: Math.floor(Math.random() * 1000),
        value: task,
      };
      setNewTask((oldTask) => [...oldTask, item]);
      setTask("");
    }
  };
  const deleteTaskHandler = (id) => {
    const newFilteredTask = newTask.filter((tasks) => tasks.id !== id);
    setNewTask(newFilteredTask);
  };

  const editTaskHandler = (id) => {
    const newFilteredTask = newTask.filter((tasks) => tasks.id !== id);
    setTask(newFilteredTask);
  };
  return (
    <div>
      <form action="">
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
        <button type="submit" onClick={addTaskHandler}>
          Submit
        </button>
      </form>
      <ul>
        {newTask.map((tasks) => {
          return (
            <li key={tasks.id}>
              {tasks.value} <button onClick={() => deleteTaskHandler(tasks.id)}>❌</button>
              <button onClick={editTaskHandler}>🖊️</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoFormAdd;
