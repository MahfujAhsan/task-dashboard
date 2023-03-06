import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Spinner from '../Spinner/Spinner';


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <Spinner />
    }

    if (user) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
};

export default PrivateRoute;