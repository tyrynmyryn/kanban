import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    children: JSX.Element
}

const RequireAuth: React.FC<Props> = ({children}) => {
    if (!window.localStorage.getItem("token")) {
        return <Navigate to="/auth"/>
    }
    return (
        <>
            {children}
        </>
    );
};

export default RequireAuth;