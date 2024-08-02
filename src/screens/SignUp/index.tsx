import { useForm, SubmitHandler } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/authContext';
import { useNavigate, Link } from 'react-router-dom';
import { deviceType } from 'react-device-detect';

type Inputs = {
  name: string;
  lastname: string;
  email: string;
  password: string;
};

const SignUp = () => {
  console.log(deviceType);
  const { signupContext, isPending, isAuthenticated } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) =>
    signupContext({ ...data, role: 'USER', origin: deviceType });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className='flex justify-center items-center h-full bg-gray-300'>
      <div className='w-full max-w-md p-8 rounded bg-white rounded'>
        <h1 className='text-3xl font-bold mb-4 text-center'>Sign Up</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Name
            </label>
            <input
              type='text'
              id='name'
              {...register('name', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            {errors.name && (
              <span className='text-red-500'>This field is required</span>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='username'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Last Name
            </label>
            <input
              type='text'
              id='lastname'
              {...register('lastname', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            {errors.lastname && (
              <span className='text-red-500'>This field is required</span>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              {...register('email', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            {errors.email && (
              <span className='text-red-500'>This field is required</span>
            )}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='password'
              className='block text-gray-700 text-sm font-bold mb-2'
            >
              Password
            </label>
            <input
              type='password'
              id='password'
              {...register('password', { required: true })}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            />
            {errors.password && (
              <span className='text-red-500'>This field is required</span>
            )}
          </div>
          {/* Nuevo select para el tipo de registro */}
          <div className='flex items-center justify-center'>
            <button
              type='submit'
              className={`hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                isPending ? 'cursor-not-allowed bg-blue-500' : 'bg-blue-500'
              }`}
              disabled={isPending}
            >
              Sign Up
            </button>
          </div>

          <p className='mt-4 text-sm text-center'>
            Already have an account?{' '}
            <Link
              to='/signin'
              className='text-blue-500'
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
