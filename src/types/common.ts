export type TUser = {
  id: string;
  _id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
};

export type TUserData = TUser & {
  createdAt: string;
  deletedAt: string | null;
  isDeleted: boolean;
  isSuspended: boolean;
  lastLogin: string;
  lastname: string;
  origin: string;
  password: string;
  reasonSuspended: string | null;
  __v: number;
};

export interface IModalHandler {
  open: boolean;
  type: 'create' | 'edit' | 'delete' | null;
}
