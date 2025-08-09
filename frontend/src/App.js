import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(newTask);
      setNewTask({ title: '', description: '' });
      fetchTasks();
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await updateTask(task.id, { completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={newTask.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Task description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <button type="submit">Add Task</button>
      </form>

      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div className="task-actions">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task)}
              />
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;