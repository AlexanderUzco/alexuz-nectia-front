import { useContext, useEffect } from 'react';
import ModalBase from '@components/ModalBase';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserContext } from '../context/userContext';
import { createFromAdmin, updateByAdmin } from '@api/services/user';
import { AxiosError } from 'axios';
import { deviceType } from 'react-device-detect';
import { toast } from 'react-toastify';

type FormInputs = {
  name: string;
  lastname: string;
  email: string;
  password?: string;
  role: 'ADMIN' | 'USER';
};

const CreateUserModal = () => {
  const { userModal, handleUserModal, fetchUsers } = useContext(UserContext);
  const { userSelected } = userModal;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    if (userSelected) {
      setValue('name', userSelected.name);
      setValue('lastname', userSelected.lastname);
      setValue('email', userSelected.email);
      setValue('role', userSelected.role);
    }
  }, [userSelected, setValue]);

  const closeModal = () => {
    handleUserModal({ open: false, type: null, userSelected: undefined });
    reset();
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      if (userSelected) {
        const res = await updateByAdmin({
          ...data,
          id: userSelected._id,
        });

        if (res instanceof AxiosError) {
          throw { message: res?.response?.data };
        }

        toast.success('User updated successfully');
      } else {
        const res = await createFromAdmin({
          ...data,
          password: data.password,
          origin: deviceType,
        });

        if (res instanceof AxiosError) {
          throw { message: res?.response?.data };
        }

        toast.success('User created successfully');
      }
      fetchUsers();
      closeModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <ModalBase
      title={userSelected ? 'Edit User' : 'Create User'}
      successAction={handleSubmit(onSubmit)}
      successButton={userSelected ? 'Update' : 'Create'}
      open={
        (userModal.open && userModal.type === 'create') ||
        userModal.type === 'edit'
      }
      closeModal={closeModal}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Name</label>
          <input
            {...register('name', { required: true })}
            className='w-full px-3 py-2 border rounded'
          />
          {errors.name && (
            <span className='text-red-500'>Name is required</span>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Lastname</label>
          <input
            {...register('lastname', { required: true })}
            className='w-full px-3 py-2 border rounded'
          />
          {errors.lastname && (
            <span className='text-red-500'>Lastname is required</span>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Email</label>
          <input
            {...register('email', {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            })}
            className='w-full px-3 py-2 border rounded'
          />
          {errors.email && (
            <span className='text-red-500'>Valid email is required</span>
          )}
        </div>
        {!userSelected && (
          <div className='mb-4'>
            <label className='block text-gray-700'>Password</label>
            <input
              type='password'
              {...register('password', {
                required: false,
              })}
              className='w-full px-3 py-2 border rounded'
            />
            {errors.password && (
              <span className='text-red-500'>Password is required</span>
            )}
          </div>
        )}
        <div className='mb-4'>
          <label className='block text-gray-700'>Role</label>
          <select
            {...register('role', { required: true })}
            className='w-full px-3 py-2 border rounded'
          >
            <option value='USER'>User</option>
            <option value='ADMIN'>Admin</option>
          </select>
          {errors.role && (
            <span className='text-red-500'>Role is required</span>
          )}
        </div>
      </form>
    </ModalBase>
  );
};

export default CreateUserModal;
