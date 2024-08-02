import { DashboardProvider } from './context/DashboardContext';
import TaskContainer from './components/TaskContainer';
import DashboardHeader from './components/DashboardHeader';
import DeleteTaskModal from './components/DeleteTaskModal';
import CreateTaskModal from './components/CreateTaskModal';

const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardHeader />
      <TaskContainer />
      <CreateTaskModal />
      <DeleteTaskModal />
    </DashboardProvider>
  );
};

export default Dashboard;
