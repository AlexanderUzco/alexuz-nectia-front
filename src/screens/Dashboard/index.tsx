import ElevatedHeader from '@components/ElevatedHeader';
import { DashboardProvider } from './context/DashboardContext';

const Dashboard = () => {
  return (
    <DashboardProvider>
      <ElevatedHeader title='Dashboard' />
    </DashboardProvider>
  );
};

export default Dashboard;
