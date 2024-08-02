import { useContext, useEffect } from 'react';
import ModalBase from '@components/ModalBase';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createTask, updateTask } from '@api/services/task';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { DashboardContext } from '../context/DashboardContext';
import { AuthContext } from '@contexts/authContext';

type FormInputs = {
  title: string;
  description: string;
  completed: boolean;
};

const CreateTaskModal = () => {
  const { user } = useContext(AuthContext);
  const { dashboardModal, handleDashboardModal, fetchTasks } =
    useContext(DashboardContext);
  const { taskSelected } = dashboardModal;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    if (taskSelected) {
      setValue('title', taskSelected.title);
      setValue('description', taskSelected.description);
      setValue('completed', taskSelected.completed);
    }
  }, [taskSelected, setValue]);

  const closeModal = () => {
    handleDashboardModal({ open: false, type: null, taskSelected: undefined });
    reset();
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      if (taskSelected) {
        const res = await updateTask({
          ...data,
          id: taskSelected._id,
          userID: user?._id,
        });

        if (res instanceof AxiosError) {
          throw { message: res?.response?.data };
        }

        toast.success('Task updated successfully');
      } else {
        const res = await createTask({ ...data, userID: user?._id });

        if (res instanceof AxiosError) {
          throw { message: res?.response?.data };
        }

        toast.success('Task created successfully');
      }
      fetchTasks();
      closeModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <ModalBase
      title={taskSelected ? 'Edit Task' : 'Create Task'}
      successAction={handleSubmit(onSubmit)}
      successButton={taskSelected ? 'Update' : 'Create'}
      open={
        dashboardModal.open &&
        (dashboardModal.type === 'create' || dashboardModal.type === 'edit')
      }
      closeModal={closeModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Title</label>
          <input
            {...register('title', { required: true })}
            className='w-full px-3 py-2 border rounded'
          />
          {errors.title && (
            <span className='text-red-500'>Title is required</span>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Description</label>
          <textarea
            {...register('description', { required: true })}
            className='w-full px-3 py-2 border rounded'
          />
          {errors.description && (
            <span className='text-red-500'>Description is required</span>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Completed</label>
          <input
            type='checkbox'
            {...register('completed')}
            className='mr-2'
          />
        </div>
      </form>
    </ModalBase>
  );
};

export default CreateTaskModal;
