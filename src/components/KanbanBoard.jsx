import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Column from './Column';

const KanbanBoard = () => {
  const [columns, setColumns] = useState(['To Do', 'Work in Progress', 'Done']);
  const [tasks, setTasks] = useState([
    { id: '1', title: 'List admin APIs for dashboard', status: 'To Do' },
    { id: '2', title: 'Develop user registration functionality', status: 'To Do' },
    { id: '3', title: 'Optimize application performance', status: 'To Do' },
    { id: '4', title: 'Conduct security testing', status: 'Work in Progress' },
    { id: '5', title: 'Analyze competitors', status: 'Work in Progress' },
    { id: '6', title: 'Implement error logging and monitoring', status: 'Work in Progress' },
    { id: '7', title: 'Create UI kit documentation', status: 'Done' },
    { id: '8', title: 'Dev meeting', status: 'Done' },
    { id: '9', title: 'Deliver dashboard prototype', status: 'Done' },
  ]);
  const boardRef = useRef(null);

  const addColumn = () => {
    const newColumnName = prompt('Enter new column name:');
    if (newColumnName && !columns.includes(newColumnName)) {
      setColumns([...columns, newColumnName]);
    }
  };

  useEffect(() => {
    if (boardRef.current) {
      boardRef.current.scrollTo({
        left: boardRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  }, [columns.length]);

  const addTask = (title, status) => {
    const newTask = { id: Date.now().toString(), title, status };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const moveTask = (id, newStatus) => {
    if (newStatus === 'Add Column') return;
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const updateTask = (id, newTitle) => {
    if (newTitle.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, title: newTitle } : task
        )
      );
    }
  };

  const deleteColumn = (columnName) => {
    if (tasks.filter((task) => task.status === columnName).length === 0) {
      setColumns(columns.filter((col) => col !== columnName));
    } else {
      alert('Cannot delete column with tasks. Remove all tasks first.');
    }
  };

  const reorderTask = (id, direction, columnTasks) => {
    const taskIndex = columnTasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) return;

    if ((direction === 'up' && taskIndex === 0) || (direction === 'down' && taskIndex === columnTasks.length - 1)) {
      return;
    }

    const newIndex = direction === 'up' ? taskIndex - 1 : taskIndex + 1;
    const reorderedTasks = [...tasks];
    const taskToSwap = columnTasks[newIndex];
    const currentTaskIndex = tasks.findIndex((task) => task.id === id);
    const swapTaskIndex = tasks.findIndex((task) => task.id === taskToSwap.id);

    reorderedTasks[currentTaskIndex] = taskToSwap;
    reorderedTasks[swapTaskIndex] = tasks[currentTaskIndex];

    setTasks(reorderedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-2 sm:p-4 md:p-6 text-white overflow-hidden">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 md:mb-8">
        Task Management Kanban Board
      </h1>
      <div
        className="flex flex-row gap-2 sm:gap-3 md:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
        ref={boardRef}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#4B5563 #1F2937',
        }}
      >
        {columns.map((status) => (
          <div key={status} className="flex-shrink-0 w-[80vw] xs:w-[70vw] sm:w-64 md:w-72 lg:w-80 snap-start">
            <Column
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
              addTask={addTask}
              deleteTask={deleteTask}
              moveTask={moveTask}
              updateTask={updateTask}
              deleteColumn={deleteColumn}
              reorderTask={reorderTask}
            />
          </div>
        ))}
        <div
          className="flex-shrink-0 w-[80vw] xs:w-[70vw] sm:w-64 md:w-72 lg:w-80 bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 text-center flex items-center justify-center snap-start"
          onClick={addColumn}
        >
          <span className="text-gray-400 text-sm sm:text-base">+ Add Column</span>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;