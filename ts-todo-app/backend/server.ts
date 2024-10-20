import express, { Request, Response } from "express";

const app = express();
const port = 3001;

app.use(express.json());

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

let tasks: Task[] = [];

app.post("/tasks", (req: Request, res: Response) => {
  const { name } = req.body;
  const task: Task = { id: tasks.length + 1, name, completed: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.get("/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  task.completed = true;
  res.json(task);
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
