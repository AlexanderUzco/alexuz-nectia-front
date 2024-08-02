import { useContext } from 'react';
import { UserContext } from '../context/userContext';
import Spinner from '@components/Spinner';

const UsersTable = () => {
  const { users, loadingUsers, handleUserModal } = useContext(UserContext);

  return (
    <>
      {loadingUsers ? (
        <Spinner />
      ) : (
        <div className='overflow-x-auto mt-40'>
          <table className='min-w-full bg-white'>
            <thead>
              <tr>
                <th className='py-2 px-4 border-b'>Created At</th>
                <th className='py-2 px-4 border-b'>Email</th>
                <th className='py-2 px-4 border-b'>Last Login</th>
                <th className='py-2 px-4 border-b'>Last Name</th>
                <th className='py-2 px-4 border-b'>Name</th>
                <th className='py-2 px-4 border-b'>Origin</th>
                <th className='py-2 px-4 border-b'>Role</th>
                <th className='py-2 px-4 border-b'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((item) => (
                <tr key={item._id}>
                  <td className='py-2 px-4 border-b'>
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className='py-2 px-4 border-b'>{item.email}</td>
                  <td className='py-2 px-4 border-b'>
                    {item.lastLogin
                      ? new Date(item.lastLogin).toLocaleString()
                      : 'No login'}
                  </td>
                  <td className='py-2 px-4 border-b'>{item.lastname}</td>
                  <td className='py-2 px-4 border-b'>{item.name}</td>
                  <td className='py-2 px-4 border-b'>{item.origin}</td>
                  <td className='py-2 px-4 border-b'>{item.role}</td>
                  <td className='py-2 px-4 border-b'>
                    <button
                      onClick={() => {
                        handleUserModal({
                          open: true,
                          type: 'edit',
                          userSelected: item,
                        });
                      }}
                      className='bg-blue-500 text-white px-2 py-1 mr-2 rounded'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleUserModal({
                          open: true,
                          type: 'delete',
                          userSelected: item,
                        });
                      }}
                      className='bg-red-500 text-white px-2 py-1 rounded'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default UsersTable;
