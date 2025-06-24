import React from 'react';
import { useState, useEffect } from 'react';

const TaskCard = ({ task, deleteTask, updateTask, reorderTask, tasks }) => {
  const [isEditing, setIsEditing] = useState(task.title === '');
  const [editedTitle, setEditedTitle] = useState(task.title);

  useEffect(() => {
    if (task.title === '') {
      setIsEditing(true);
    }
  }, [task.title]);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  const handleTouchStart = (e) => {
    // Store task ID for touch-based drag
    e.target.dataset.taskId = task.id;
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (editedTitle.trim()) {
      updateTask(task.id, editedTitle);
    } else {
      deleteTask(task.id);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (editedTitle.trim()) {
        updateTask(task.id, editedTitle);
      } else {
        deleteTask(task.id);
      }
      setIsEditing(false);
    }
  };

  const currentIndex = tasks.findIndex((t) => t.id === task.id);

  return (
    <div
      className="bg-gray-800 p-2 xs:p-2.5 sm:p-3 rounded shadow flex justify-between items-center text-xs xs:text-sm sm:text-base border-l-4 border-transparent hover:border-blue-500 transition-colors duration-200 touch-action-none"
      draggable
      onDragStart={handleDragStart}
      onTouchStart={handleTouchStart}
    >
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          autoFocus
          className="bg-gray-700 text-white border border-gray-600 rounded p-0.5 xs:p-1 sm:p-1.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs xs:text-sm sm:text-base"
        />
      ) : (
        <span className="text-white break-words flex-1 pr-2" onDoubleClick={handleDoubleClick}>
          {task.title || 'Untitled Task'}
        </span>
      )}
      <div className="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-2">
        <button
          onClick={() => reorderTask(task.id, 'up')}
          className="text-gray-400 hover:text-gray-200"
          disabled={currentIndex === 0}
        >
          <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8l-6 6h12l-6-6z" />
          </svg>
        </button>
        <button
          onClick={() => reorderTask(task.id, 'down')}
          className="text-gray-400 hover:text-gray-200"
          disabled={currentIndex === tasks.length - 1}
        >
          <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 16l6-6H6l6 6z" />
          </svg>
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="text-red-500 hover:text-red-400"
        >
          <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;