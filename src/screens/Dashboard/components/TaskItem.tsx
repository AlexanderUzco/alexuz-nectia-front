import { TTask } from '@api/services/types';
import { ChangeEvent, FC } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/20/solid';

type TaskItemProps = {
  task: TTask;
  onComplete: (event: ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  onEdit: () => void;
};

const TaskItem: FC<TaskItemProps> = ({
  task,
  onComplete,
  onDelete,
  onEdit,
}) => {
  return (
    <div className='bg-white p-4 rounded shadow-md mb-4'>
      <div className='flex items-center mb-2'>
        <input
          type='checkbox'
          checked={task.completed}
          onChange={onComplete}
          className='mr-2'
        />
        <h3 className='text-lg font-semibold'>{task.title}</h3>

        <div className='ml-auto flex'>
          <button
            onClick={onEdit}
            className='text-blue-500 hover:text-blue-700'
          >
            <PencilIcon className='w-6 h-6' />
          </button>
          <button
            onClick={onDelete}
            className='text-red-500 hover:text-red-700'
          >
            <TrashIcon className='w-6 h-6' />
          </button>
        </div>
      </div>
      <p className='text-gray-600'>{task.description}</p>
    </div>
  );
};

export default TaskItem;
