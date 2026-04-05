import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
    const location = useLocation();

    // If not authenticated, only restrict admin routes (redirect to home/login)
    if (!isAuthenticated) {
        if (location.pathname.includes("/admin")) {
            return <Navigate to="/" replace />;
        }
        return children;
    }

    // If authenticated:
    if (isAuthenticated) {
        // Redirect admins to dashboard if they are not already there
        if (user?.role === "admin" && !location.pathname.includes("/admin")) {
            return <Navigate to="/admin/dashboard" replace />;
        }
        // Protect admin routes from non-admin users
        if (user?.role !== "admin" && location.pathname.includes("/admin")) {
            return <Navigate to="/" replace />;
        }
    }

    // Always return children by default so the app actually renders!
    return children;
}

export default CheckAuth;
