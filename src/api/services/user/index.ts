import { removeCookie } from 'typescript-cookie';
import { API } from '../../config';
import { TSigninData, TSignupData, TUpdatedByAdmin } from '../types';

const signin = async (body: TSigninData) => API.post(`users/signin`, body);

const signup = async (body: TSignupData) =>
  API.post(`users/signup`, { ...body, role: 'USER' });

const signout = async () => {
  removeCookie('jwt');
  return API.post(`users/signout`);
};

const authenticateUser = async () => API.get(`users/verify-token`);

const getUsers = async () => API.get(`users`);

const createFromAdmin = async (body: TSignupData) =>
  API.post(`users/create-from-admin`, body);

const updateByAdmin = async (body: TUpdatedByAdmin) =>
  API.post('users/update-by-admin', body);

const setDeleteUser = async (id: string) => API.post(`users/delete-user/${id}`);

export {
  signin,
  signup,
  signout,
  authenticateUser,
  getUsers,
  createFromAdmin,
  updateByAdmin,
  setDeleteUser,
};
