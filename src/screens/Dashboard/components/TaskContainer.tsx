import { FC, useContext } from 'react';
import TaskItem from './TaskItem';
import { DashboardContext } from '../context/DashboardContext';
import { setCompletedTask } from '@api/services/task';
import { AxiosError } from 'axios';
import { TTask } from '@api/services/types';
import { toast } from 'react-toastify';

const TaskContainer: FC = () => {
  const { tasks, setTasks, handleDashboardModal } =
    useContext(DashboardContext);

  const handleCheckboxChange = async (task: TTask) => {
    try {
      const res = await setCompletedTask(task._id);

      if (res instanceof AxiosError) {
        throw new Error(res.data.message);
      }

      task.completed = !task.completed;

      const newTasks = tasks.map((t) =>
        t._id === task._id ? { ...t, completed: task.completed } : t
      );

      setTasks(newTasks);
    } catch (error) {
      toast.error('Error updating task');
      console.log(error);
    }
  };

  const handlerDeleteTask = async (task: TTask) => {
    handleDashboardModal({ open: true, type: 'delete', taskSelected: task });
  };

  const handlerEditTask = async (task: TTask) => {
    handleDashboardModal({ open: true, type: 'edit', taskSelected: task });
  };

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className='p-4 mt-40 mx-20'>
      {/* Incomplete Tasks Section */}
      <div className='mb-8'>
        <h2 className='text-xl font-bold mb-4'>Incomplete Tasks</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {incompleteTasks.length > 0 ? (
            incompleteTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onComplete={() => handleCheckboxChange(task)}
                onDelete={() => handlerDeleteTask(task)}
                onEdit={() => handlerEditTask(task)}
              />
            ))
          ) : (
            <p>No incomplete tasks.</p>
          )}
        </div>
      </div>

      {/* Completed Tasks Section */}
      <div>
        <h2 className='text-xl font-bold mb-4'>Completed Tasks</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {completedTasks.length > 0 ? (
            completedTasks.map((task) => (
              <TaskItem
                key={task._id}
                task={task}
                onComplete={() => handleCheckboxChange(task)}
                onDelete={() => handlerDeleteTask(task)}
                onEdit={() => handlerEditTask(task)}
              />
            ))
          ) : (
            <p>No completed tasks.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskContainer;
