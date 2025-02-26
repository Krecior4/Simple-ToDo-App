"use client"
import { useState, useEffect } from 'react'
import clsx from 'clsx';

type Task = {
  id: number,
  text: string,
  completed: boolean
}

export default function Home() {
  const [tasks, setTasks] = useState(() => {
    // read data from localstorage
    if (typeof window != undefined) {
      const savedTasks = localStorage.getItem('tasks')
      return savedTasks ? JSON.parse(savedTasks) : []
    }
  })
  const [newTask, setNewTask] = useState("")

  useEffect(() => {
    // save data after every change of tasks state
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  // adding new tasks
  const addTask = (text: string) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTasks([...tasks, newTask])
    setNewTask("")
  };

  // removing all tasks
  const resetTasks = () => {
    setTasks([])
    localStorage.removeItem("tasks")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      addTask(newTask)
    }
  }

  const handleCheckboxChange = (id: number) => {
    setTasks(tasks.map((task: { id: number; completed: boolean; }) => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <>
      <div className="grid gap-8 md:gap-cols-2 flex justify-center mt-12">
        <div className="flex-col">
          <h2 className="text-4xl font-extrabold dark:text-white antialiased">ToDo list</h2>
          <div className='flex-row flex-nowrap justify-center space-x-1 p-1 mb-2 w-full'>
            <input type="text" className="text-black rounded-lg p-1 w-40 focus:outline-none" placeholder="Enter a task" name="task" id="task" value={newTask} onKeyDown={handleKeyDown} onChange={(e) => {setNewTask(e.target.value)}} />
            <button className='text-white bg-green-500 rounded-lg p-1 w-16' title="Adds a new task" type="button" onClick={() => addTask(newTask)}>Add</button>
            <button className='text-white bg-red-500 rounded-lg p-1 w-16' title="Resets whole list" type="button" onClick={resetTasks}>Reset</button>
          </div>
          <div className='max-h-96 overflow-y-auto bg-white rounded-lg '>
            <table border={1} className="p-1 border-separate table-fixed col-2 text-gray-900 grid-cols-8 " >
              <thead className='sticky top-0 bg-white'>
                <tr>
                  <th className='w-8'>#</th>
                  <th className='w-64'>Task</th>
                </tr>
              </thead>
              <tbody> 
                {
                
                tasks.map((task: Task) => (
                  <tr key={task.id}>
                    <td><label className={clsx("flex items-center cursor-pointer transition-200", { "hidden": task.completed, "block": !task.completed })}><input id={String(task.id)} type="checkbox" className="hidden peer" onChange={() => {handleCheckboxChange(task.id)}} /><span className="w-5 h-5 border-2 border-gray-300 rounded mr-2 flex items-center justify-center peer-checked:bg-green-300 peer-checked:border-green-500"><svg className="hidden w-3 h-3 text-white peer-checked:block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l2 2 5-5-1.5-1.5L9 10.5 8 9.5z" /></svg></span></label><label className={clsx("flex items-center cursor-pointer transition-200", { "hidden": !task.completed, "block": task.completed })}><input checked id={String(task.id)} type="checkbox" className="hidden peer" onChange={() => {handleCheckboxChange(task.id)}} /><span className="w-5 h-5 border-2 border-gray-300 rounded mr-2 flex items-center justify-center peer-checked:bg-green-300 peer-checked:border-green-500"><svg className="hidden w-3 h-3 text-white peer-checked:block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l2 2 5-5-1.5-1.5L9 10.5 8 9.5z" /></svg></span></label></td>
                    <td><label className={clsx("transition-all duration-200 break-words", { "line-through text-grey-500": task.completed })} htmlFor={String(task.id)}>{task.text}</label></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </div>
      </div>
    </>
  );
}