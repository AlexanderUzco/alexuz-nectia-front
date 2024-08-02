import { UserProvider } from './context/userContext';
import UsersTable from './components/UsersTable';
import CreateUserModal from './components/CreateUserModal';
import UserHeader from './components/UserHeader';
import DeleteUserModal from './components/DeleteUserModal';

const Users = () => {
  return (
    <UserProvider>
      <UserHeader />
      <UsersTable />
      <CreateUserModal />
      <DeleteUserModal />
    </UserProvider>
  );
};

export default Users;
