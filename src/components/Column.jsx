import React from 'react';
import { useState } from 'react';
import TaskCard from './TaskCard';

const Column = ({ status, tasks, addTask, deleteTask, moveTask, updateTask, deleteColumn, reorderTask }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle, status);
      setNewTaskTitle('');
    }
  };

  const handleAddEmptyTask = () => {
    addTask('', status);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (status !== 'Add Column') setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (status !== 'Add Column') {
      const taskId = e.dataTransfer.getData('taskId');
      moveTask(taskId, status);
      setIsDraggingOver(false);
    }
  };

  const handleTouchEnd = (e) => {
    if (status !== 'Add Column') {
      const taskId = e.target.dataset.taskId;
      if (taskId) {
        moveTask(taskId, status);
      }
    }
  };

  return (
    <div
      className={`p-2 xs:p-3 sm:p-4 rounded-lg h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)] ${
        status === 'Add Column'
          ? 'bg-gray-800 cursor-pointer hover:bg-gray-700'
          : isDraggingOver
            ? 'bg-gray-700 border-2 border-blue-500'
            : 'bg-gray-800'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex justify-between items-center mb-2 xs:mb-3 sm:mb-4">
        <h2 className="text-base xs:text-lg sm:text-xl font-semibold flex items-center">
          {status} <span className="ml-2 text-gray-400 text-xs xs:text-sm sm:text-base">({tasks.length})</span>
        </h2>
        {status !== 'Add Column' && tasks.length === 0 && (
          <button
            className="text-gray-400 hover:text-gray-300 text-xs xs:text-sm sm:text-base"
            onClick={() => deleteColumn(status)}
          >
            🗑️
          </button>
        )}
      </div>
      {status !== 'Add Column' && (
        <>
          <form onSubmit={handleAddTask} className="mb-2 xs:mb-3 sm:mb-4">
            <div className="flex">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="New task..."
                className="w-full p-1 xs:p-1.5 sm:p-2 bg-gray-700 rounded-l-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs xs:text-sm sm:text-base text-white"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white p-1 xs:p-1.5 sm:p-2 rounded-r-md hover:bg-blue-600 text-xs xs:text-sm sm:text-base"
              >
                +
              </button>
            </div>
          </form>
          <div
            className="space-y-1 xs:space-y-1.5 sm:space-y-2 overflow-y-auto pr-1"
            style={{
              maxHeight: 'calc(100vh - 280px)',
              scrollbarWidth: 'thin',
              scrollbarColor: '#4B5563 #1F2937',
            }}
          >
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
                reorderTask={(id, direction) => reorderTask(id, direction, tasks)}
                tasks={tasks}
              />
            ))}
          </div>
          <div className="mt-2 xs:mt-3 sm:mt-4">
            <button
              className="bg-gray-700 text-gray-400 w-full p-1 xs:p-1.5 sm:p-2 rounded hover:bg-gray-600 text-xs xs:text-sm sm:text-base flex items-center justify-center"
              onClick={handleAddEmptyTask}
            >
              <span>+ Add task</span>
            </button>
          </div>
        </>
      )}
      {status === 'Add Column' && (
        <div className="text-center text-gray-400 text-xs xs:text-sm sm:text-base">+ Add Column</div>
      )}
    </div>
  );
};

export default Column;