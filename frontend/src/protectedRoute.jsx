import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios
      .get("https://api.govexam4u.com/users/verify", {
        withCredentials: true,
      })
      .then((res) => {
        setAuth(res.data.loggedIn);
        setLoading(false);
      })
      .catch(() => {
        setAuth(false);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!auth) return <Navigate to="/login" />;

  return children;
}

export default ProtectedRoute;
