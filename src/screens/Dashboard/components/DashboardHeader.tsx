import ElevatedHeader from '@components/ElevatedHeader';
import { useContext } from 'react';
import { DashboardContext } from '../context/DashboardContext';

const DashboardHeader = () => {
  const { handleDashboardModal } = useContext(DashboardContext);

  const handlerCreateUser = () => {
    handleDashboardModal({ open: true, type: 'create' });
  };

  return (
    <ElevatedHeader
      title='Dashboard'
      actionButton={handlerCreateUser}
    />
  );
};

export default DashboardHeader;
