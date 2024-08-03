import { API } from '../../config';
import { TCreateTask, TUpdateTask } from '../types';

const getTasks = async () => API.get('tasks');

const getTaskUser = async (id: string) => API.get(`tasks/user/${id}`);

const createTask = async (body: TCreateTask) => API.post('tasks', body);

const updateTask = async (body: TUpdateTask) =>
  API.post(`tasks/update/${body.id}`, body);

const deleteTask = async (id: string) => API.delete(`tasks/${id}`);

const setCompletedTask = async (id: string) => API.put(`tasks/${id}/completed`);

export {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  setCompletedTask,
  getTaskUser,
};
