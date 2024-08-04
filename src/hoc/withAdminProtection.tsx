import { AuthContext } from '@contexts/authContext';
import { FC, useContext } from 'react';
import { Navigate } from 'react-router';

const withAdminProtection = (WrappedComponent: FC) => {
  const ProtectedComponent: FC = (props) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return (
        <Navigate
          to='/signin'
          replace
          state={{ from: location }}
        />
      );
    }

    if (user.role !== 'ADMIN') {
      return (
        <Navigate
          to='/'
          replace
        />
      );
    }

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default withAdminProtection;
