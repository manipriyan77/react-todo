import React, { useState } from "react";

const TodoFormAdd = () => {
  const [task, setTask] = useState("");
  const [newTask, setNewTask] = useState([]);
  const[editTask,setEditTask]=useState(null);

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
    debugger
    const newFilteredTask = newTask.filter((tasks) => tasks.id !== id);
    setNewTask(newFilteredTask);
  };

  const editTaskHandler = (id) => {
    debugger
    // const newFilteredTask = newTask.filter((tasks) => tasks.id !== id);
    // setTask(newFilteredTask);
    const newEditedTask=newTask.find((edited)=>edited.id===id)
    setTask(newEditedTask.value)
    const newFilteredTask = newTask.filter((tasks) => tasks.id !== id);
    setNewTask(newFilteredTask);
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
              <button onClick={(e)=>editTaskHandler(tasks.id)}>🖊️</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoFormAdd;
