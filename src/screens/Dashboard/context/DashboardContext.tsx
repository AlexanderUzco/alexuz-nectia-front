import { getTaskUser } from '@api/services/task';
import { TTask } from '@api/services/types';
import { AuthContext } from '@contexts/authContext';
import { AxiosError } from 'axios';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { IModalHandler } from 'src/types/common';

export interface IDasboardModal extends IModalHandler {
  taskSelected?: TTask;
}

export interface IDashboardContext {
  tasks: TTask[];
  loadingTasks: boolean;
  dashboardModal: IDasboardModal;
  handleDashboardModal: (data: IDasboardModal) => void;
  fetchTasks: () => void;
  setTasks: (tasks: TTask[]) => void;
}

const initialDashboardContext: IDashboardContext = {
  tasks: [],
  loadingTasks: false,
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
  const [loadingTasks, setLoadingTasks] = useState<boolean>(false);
  const [dashboardModal, setDashboardModal] = useState<IDasboardModal>(
    initialDashboardContext.dashboardModal
  );

  const { user } = useContext(AuthContext);

  console.log(user);

  const fetchTasks = async () => {
    try {
      setLoadingTasks(true);
      const res = await getTaskUser(user._id);

      if (res.data instanceof AxiosError) {
        throw new Error(res.data.message);
      }

      if (res.data.length === 0) {
        setTasks([]);
      } else {
        setTasks(res.data);
      }
      setLoadingTasks(false);
    } catch (error) {
      setLoadingTasks(false);
      toast.error('Error fetching tasks');
    }
  };

  const handleDashboardModal = (data: IDasboardModal) =>
    setDashboardModal(data);

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id]);

  return (
    <DashboardContext.Provider
      value={{
        tasks,
        loadingTasks,
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
