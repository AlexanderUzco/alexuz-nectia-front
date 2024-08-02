import { getUsers } from '@api/services/user';
import { AxiosError } from 'axios';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { IModalHandler, TUserData } from 'src/types/common';

export interface IUserModal extends IModalHandler {
  userSelected?: TUserData;
}

export interface IUserContext {
  userModal: IUserModal;
  users: TUserData[];
  loadingUsers: boolean;
  handleUserModal: (data: IUserModal) => void;
  fetchUsers: () => void;
}

const initialUserContext: IUserContext = {
  userModal: {
    open: false,
    type: null,
    userSelected: undefined,
  },
  users: [],
  loadingUsers: false,
  handleUserModal: () => {},
  fetchUsers: () => {},
};

export const UserContext = createContext<IUserContext>(initialUserContext);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<TUserData[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(false);
  const [userModal, setUserModal] = useState<IUserModal>(
    initialUserContext.userModal
  );

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await getUsers();

      if (res instanceof AxiosError) {
        throw { message: res?.response?.data };
      }

      setUsers(res.data);
      setLoadingUsers(false);
    } catch (error) {
      toast.error(error.message);
      setLoadingUsers(false);
    }
  };

  const handleUserModal = (data: IUserModal) => setUserModal(data);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{ users, loadingUsers, userModal, fetchUsers, handleUserModal }}
    >
      {children}
    </UserContext.Provider>
  );
};
