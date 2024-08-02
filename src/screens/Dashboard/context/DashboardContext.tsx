import { getTasks } from '@api/services/task';
import { TTask } from '@api/services/types';
import { AxiosError } from 'axios';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IModalHandler } from 'src/types/common';

export interface IDasboardModal extends IModalHandler {
  taskSelected?: TTask;
}

export interface IDashboardContext {
  tasks: TTask[];
  dashboardModal: IDasboardModal;
  handleDashboardModal: (data: IDasboardModal) => void;
  fetchTasks: () => void;
  setTasks: (tasks: TTask[]) => void;
}

const initialDashboardContext: IDashboardContext = {
  tasks: [],
  dashboardModal: {
    open: false,
    type: null,
    taskSelected: undefined,
  },
  fetchTasks: () => {},
  setTasks: () => {},
  handleDashboardModal: () => {},
};

export const DashboardContext = createContext<IDashboardContext>(
  initialDashboardContext
);

export const DashboardProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<TTask[]>([]);
  const [dashboardModal, setDashboardModal] = useState<IDasboardModal>(
    initialDashboardContext.dashboardModal
  );

  const fetchTasks = async () => {
    try {
      const res = await getTasks();

      if (res.data instanceof AxiosError) {
        throw new Error(res.data.message);
      }

      if (res.data.length === 0) {
        return setTasks([]);
      } else {
        setTasks(res.data);
      }
    } catch (error) {
      toast.error('Error fetching tasks');
    }
  };

  const handleDashboardModal = (data: IDasboardModal) =>
    setDashboardModal(data);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        tasks,
        dashboardModal,
        fetchTasks,
        handleDashboardModal,
        setTasks,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
