import clsx from "clsx"

export default function checkbox() {
    return <label className={clsx("flex items-center cursor-pointer transition-200", { "hidden": task.completed, "block": !task.completed })}><input id={task.id} type="checkbox" className="hidden peer" onChange={() => {handleCheckboxChange(task.id)}} /><span className="w-5 h-5 border-2 border-gray-300 rounded mr-2 flex items-center justify-center peer-checked:bg-green-300 peer-checked:border-green-500"><svg className="hidden w-3 h-3 text-white peer-checked:block" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l2 2 5-5-1.5-1.5L9 10.5 8 9.5z" /></svg></span></label>
}