import React, { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Circle } from 'lucide-react';

export default function UbeTodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Add a new task
  const addTask = () => {
    if (newTask.trim() !== '') {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([task, ...tasks]);
      setNewTask('');
    }
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Get task counts
  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-violet-600 to-fuchsia-500">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <img 
              src="https://trinedykru.com/images/homepage-button.png" 
              alt="Logo" 
              className="mx-auto w-24 h-24 object-contain drop-shadow-2xl bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30"
            />
          </div>
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">
            Ube Bread Task List
          </h1>
          <p className="text-purple-100 text-lg drop-shadow-md">
            Sweet organization for your daily tasks
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-6 mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/30">
            <span className="text-2xl font-bold text-purple-700">{totalCount}</span>
            <p className="text-purple-600 text-sm">Total Tasks</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-white/30">
            <span className="text-2xl font-bold text-pink-500">{completedCount}</span>
            <p className="text-purple-600 text-sm">Completed</p>
          </div>
        </div>

        {/* Add Task Form */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 mb-8">
          <div className="flex space-x-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a new task..."
              className="flex-1 px-6 py-4 rounded-2xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none bg-white/90 text-gray-800 placeholder-purple-400 text-lg transition-all duration-300"
            />
            <button
              onClick={addTask}
              className="bg-gradient-to-r from-pink-500 to-fuchsia-600 hover:from-pink-600 hover:to-fuchsia-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Plus size={20} />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🌸</div>
              <p className="text-purple-100 text-xl drop-shadow-md">No tasks yet!</p>
              <p className="text-purple-200 drop-shadow-md">Add your first task above to get started.</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                  task.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      task.completed
                        ? 'bg-pink-500 border-pink-500 text-white'
                        : 'border-purple-400 hover:border-purple-500'
                    }`}
                  >
                    {task.completed ? (
                      <Check size={16} />
                    ) : (
                      <Circle size={16} className="text-purple-400" />
                    )}
                  </button>
                  
                  <span
                    className={`flex-1 text-lg transition-all duration-300 ${
                      task.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                    }`}
                  >
                    {task.text}
                  </span>
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition-all duration-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-purple-100 drop-shadow-md">
          <p>Made with 💜 in Santa Monica</p>
        </div>
      </div>
    </div>
  );
}