import React, { useState } from 'react';

interface TodoListProps {}

const TodoList: React.FC<TodoListProps> = () => {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [editingTask, setEditingTask] = useState<number | null>(null);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const editTask = (index: number) => {
    setEditingTask(index);
    setNewTask(tasks[index]);
  };

  const updateTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [...tasks];
      if (editingTask !== null) {
        updatedTasks[editingTask] = newTask;
        setTasks(updatedTasks);
        setNewTask('');
        setEditingTask(null);
      }
    }
  };

  const deleteTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const completeTask = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = `${tasks[index]} (Completed)`;
    setTasks(updatedTasks);
  };

  const renderTaskItems = () => {
    return tasks.map((task, index) => (
      <li key={index}>
        {index === editingTask ? (
          <>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={updateTask}>Update</button>
          </>
        ) : (
          <>
            <div>{task}</div>
            <div>
              <button onClick={() => editTask(index)} style={{ marginRight: '10px' }}>Edit</button>
              <button onClick={() => deleteTask(index)} style={{ marginRight: '10px' }}>Delete</button>
              <button onClick={() => completeTask(index)} style={{ marginRight: '10px' }}>Complete</button>
            </div>
          </>
        )}
      </li>
    ));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>To-Do List</h2>
      <div>
        <input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {renderTaskItems()}
        <li>
          <button
            onClick={() => alert('Completed button clicked')}
            className="bg-gradient-to-r from-pink-300 via-purple-400 to-blue-500 hover:to-blue-700 text-white px-4 py-2 rounded mt-4"
          >
            Completed
          </button>
        </li>
      </ul>
    </div>
  );
};

export default TodoList;
