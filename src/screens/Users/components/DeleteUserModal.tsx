import ModalBase from '@components/ModalBase';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import { setDeleteUser } from '@api/services/user';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const DeleteUserModal = () => {
  const { userModal, handleUserModal, fetchUsers } = useContext(UserContext);

  const closeModal = () => {
    handleUserModal({ open: false, type: null, userSelected: undefined });
  };

  const handlerDeleteUser = async (id: string) => {
    try {
      const res = await setDeleteUser(id);

      if (res instanceof AxiosError) {
        throw { message: res?.response?.data };
      }

      toast.success('User update to deleted');
      closeModal();
      fetchUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {userModal.open && userModal.type === 'delete' && (
        <ModalBase
          title='Delete User'
          open={userModal.open && userModal.type === 'delete'}
          successAction={() => handlerDeleteUser(userModal.userSelected._id)}
          successButton='Delete'
          closeModal={() => handleUserModal({ open: false, type: null })}
        >
          <h1>
            Are you sure you want to delete this user? (
            {userModal.userSelected?.name})
          </h1>
        </ModalBase>
      )}
    </>
  );
};

export default DeleteUserModal;
