import React, { useState, useEffect } from "react";

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    fetch("/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = () => {
    fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newTask }),
    })
      .then((res) => res.json())
      .then((task) => setTasks([...tasks, task]));
    setNewTask("");
  };

  const markAsComplete = (id: number) => {
    fetch(`/tasks/${id}`, { method: "PUT" }).then(() => {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      );
    });
  };

  const deleteTask = (id: number) => {
    fetch(`/tasks/${id}`, { method: "DELETE" }).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} {task.completed ? "(Completed)" : ""}
            <button onClick={() => markAsComplete(task.id)}>Mark Complete</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
