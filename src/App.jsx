import { useSelector } from 'react-redux';
import Input from './components/Input/Input';
import ListTodos from './components/ListTodos/ListTodos';

import './index.css';

const App = () => {
  // const storedTodos = JSON.parse(localStorage.getItem('todos')) ?? [];
  const storedTodos = useSelector((data) => data.todo.todo);
  console.log(storedTodos);
  return (
    <div className="bg-[#F8F6F4] h-full main_section flex justify-center">
      <div className="w-[500px] text-center">
        <h1 className="text-[62px] font-bold underline">todos</h1>
        <Input />
        {storedTodos.length > 0 && <ListTodos />}
      </div>
    </div>
  );
};

export default App;
