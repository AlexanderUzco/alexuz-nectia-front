//Users
export type TSignupData = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
  origin: string;
};

export type TSigninData = {
  email: string;
  password: string;
};

export type TUpdatedByAdmin = {
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: 'USER' | 'ADMIN';
};

//Task

export type TTask = {
  id: string;
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  userID: string;
  createdAt: Date;
  deletedAt: Date;
};

export type TCreateTask = {
  title: string;
  description: string;
  userID: string;
};

export type TUpdateTask = {
  title: string;
  description: string;
  completed: boolean;
};

export type TDeleteTask = {
  id: string;
};

export type TGetTasks = {
  userID: string;
};
