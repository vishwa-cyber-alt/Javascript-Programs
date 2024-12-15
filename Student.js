import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [name, setTitle] = useState('');
  const [education, setDescription] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);

  // Fetch todos from the backend
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/students');
        setTodos(response.data);
      } catch (error) {
        console.error("There was an error fetching the todos!", error);
      }
    };
    fetchTodos();
  }, []);

  // Handle creating or updating a todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTodo) {
      // Update todo
      try {
        const response = await axios.put(`http://localhost:8000/students/${editingTodo._id}`, { name, education });
        setTodos(todos.map(todo => (todo._id === response.data._id ? response.data : todo)));
        setEditingTodo(null);
      } catch (error) {
        console.error("Error updating todo", error);
      }
    } else {
      // Create new todo
      try {
        const response = await axios.post('http://localhost:8000/students', { name,education });
        setTodos([...todos, response.data]);
      } catch (error) {
        console.error("Error adding todo", error);
      }
    }
    setTitle('');
    setDescription('');
  };

  // Handle editing a todo
  const handleEdit = (todo) => {
    setTitle(todo.name);
    setDescription(todo.education);
    setEditingTodo(todo);
  };

  // Handle deleting a todo
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/students/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo", error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={education}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">{editingTodo ? 'Update Todo' : 'Add Todo'}</button>
      </form>

      <h2>Todos</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo._id}>
              <td>{todo.name}</td>
              <td>{todo.education}</td>
              <td>
                <button onClick={() => handleEdit(todo)}>Edit</button>
                <button onClick={() => handleDelete(todo._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoApp;
