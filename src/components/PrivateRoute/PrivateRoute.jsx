import { Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { getUserRole } from '../../selectors';

const PrivateRoute = ({ children }) => {
	const role = useSelector(getUserRole);

	return role === 'admin' ? <>{children}</> : <Navigate to='/courses' />;
};

export default PrivateRoute;
