import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../screens/SignIn';
import Dashboard from '../screens/Dashboard';
import PrivateRoute from '../components/PrivateRoute';
import Layout from '../components/Layout';
import SignUp from '../screens/SignUp';
import Users from '@screens/Users';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Public routes */}
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/signin'
          element={<SignIn />}
        />

        {/* Redirect to Dashboard when path is "/" */}
        <Route
          path='/'
          element={
            <Navigate
              to='/dashboard'
              replace
            />
          }
        />

        {/* Private route using PrivateRoute component */}
        <Route
          path='/'
          element={<PrivateRoute />}
        >
          <Route
            path='/dashboard'
            element={<Dashboard />}
          />
          <Route
            path='/users'
            element={<Users />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
