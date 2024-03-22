import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
    canActive,
    redirectPath = '/'
}) => {

    if (!canActive) {
        return <Navigate to={redirectPath} replace />
    }
    return <Outlet />;
}

export default ProtectedRoute;