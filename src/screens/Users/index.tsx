import { UserProvider } from './context/userContext';
import UsersTable from './components/UsersTable';
import CreateUserModal from './components/CreateUserModal';
import UserHeader from './components/UserHeader';
import DeleteUserModal from './components/DeleteUserModal';
import withAdminProtection from '../../hoc/withAdminProtection';

const UsersScreen = () => {
  return (
    <UserProvider>
      <UserHeader />
      <UsersTable />
      <CreateUserModal />
      <DeleteUserModal />
    </UserProvider>
  );
};

const Users = withAdminProtection(UsersScreen);

export default Users;
