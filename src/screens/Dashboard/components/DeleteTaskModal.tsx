import ModalBase from '@components/ModalBase';
import { useContext } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { DashboardContext } from '../context/DashboardContext';
import { deleteTask } from '@api/services/task';

const DeleteTaskModal = () => {
  const { handleDashboardModal, setTasks, tasks, dashboardModal } =
    useContext(DashboardContext);

  const closeModal = () => {
    handleDashboardModal({ open: false, type: null, taskSelected: undefined });
  };

  const handlerDeleteTask = async (id: string) => {
    try {
      const res = await deleteTask(id);

      if (res instanceof AxiosError) {
        throw { message: res?.response?.data };
      }

      const newTasks = tasks.filter((task) => task._id !== id);

      setTasks(newTasks);

      toast.success('Task deleted');

      closeModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {dashboardModal.open && dashboardModal.type === 'delete' && (
        <ModalBase
          title='Delete Task'
          open={dashboardModal.open && dashboardModal.type === 'delete'}
          successAction={() =>
            handlerDeleteTask(dashboardModal.taskSelected._id)
          }
          successButton='Delete'
          closeModal={() =>
            handleDashboardModal({
              open: false,
              type: null,
              taskSelected: undefined,
            })
          }
        >
          <h1>
            Are you sure you want to delete this Task? (
            {dashboardModal.taskSelected?.title})
          </h1>
        </ModalBase>
      )}
    </>
  );
};

export default DeleteTaskModal;
