import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();
    console.log("CheckAuth", isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    } else {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
        }
    }

}
export default CheckAuth;
