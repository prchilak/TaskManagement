import Dashboard from '../pages/Dashboard/Dashboard';
import Layout from '../components/Layout/Layout';
import Login from '../pages/Login/Login';
import OuterLayout from '../components/OuterLayout/OuterLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import RouteNavigator from './RouteNavigator';
import SignUp from '../pages/SignUp/SignUp';
import { useRoutes } from 'react-router-dom';

export default function Router() {
  return useRoutes([
    {
      path: '',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [{ path: '/dashboard', element: <Dashboard /> }],
    },
    {
      path: '/',
      element: <OuterLayout />,
      children: [
        {
          path: '/',
          element: <RouteNavigator />,
        },
        {
          path: 'login',
          element: (
            <PublicRoute>
              <Login />
            </PublicRoute>
          ),
        },

        {
          path: 'signup',
          element: (
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          ),
        },
      ],
    },
  ]);
}
