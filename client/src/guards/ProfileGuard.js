import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
import { useSelector } from '../redux/store';
// routes
import { PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

ProfileGuard.propTypes = {
  children: PropTypes.node
};

export default function ProfileGuard({ children }) {
  const { isAuthenticated } = useAuth();

  const isProfileCompleted = useSelector((state) => state.profile.isProfileCompleted);

  if (isAuthenticated && !isProfileCompleted) {
    return <Navigate to={PATH_DASHBOARD.user.profile} />;
  }

  return <>{children}</>;
}
