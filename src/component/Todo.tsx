import React, { useState, useEffect } from "react";
import { BiAddToQueue } from "react-icons/bi";
import { CiCircleRemove } from "react-icons/ci";

const Todo: React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<string[]>(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleClick = () => {
    if (task.trim()) {
      setTasks((prev) => [...prev, task.trim()]);
      setTask("");
    }
  };

  const handleRemove = (deletet:string) =>{
     const updateTasks= tasks.filter((t) =>t  !== deletet);
     setTasks(updateTasks);
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-4">
        <div className="text-xl w-56 text-blue-600 pl-2 border-4 border-green-700">
          <input
            type="text"
            value={task}
            onChange={handleChange}
            placeholder="Enter a message"
            className="w-full bg-transparent outline-none"
          />
        </div>
        <BiAddToQueue
          size={34}
          onClick={handleClick}
          className="ml-4 text-green-700 cursor-pointer hover:scale-110 transition-transform"
        />
      </div>
<table>
      <div className=" border-2 w-56 mt-4 text-center">
          <ol className="list-decimal list-inside">
            {tasks.map((t, index) => (
              <li key={index}>{t} < CiCircleRemove size={34}
              onClick={() =>handleRemove(t)}
              className="ml-4 text-green-700 cursor-pointer hover:scale-110 transition-transform" />{" "}</li>
            ))} 
          </ol>
          {" "}
      </div>
      </table>
    </div>
  );
};

export default Todo;
