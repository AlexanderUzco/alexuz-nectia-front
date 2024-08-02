import ElevatedHeader from '@components/ElevatedHeader';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';

const UserHeader = () => {
  const { handleUserModal } = useContext(UserContext);

  const handlerCreateUser = () => {
    handleUserModal({ open: true, type: 'create' });
  };

  return (
    <ElevatedHeader
      title='Users'
      actionButton={handlerCreateUser}
    />
  );
};

export default UserHeader;
