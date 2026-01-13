import { useEffect, useState } from "react";
import apis from "../pages/loginLogout/utils/apisUsers";
import httpAction from "../pages/loginLogout/utils/httpAction";


export default function useUserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const data = {
        url: apis().userProfile,
      };
      const result = await httpAction(data);
      if (result?.status) {
        setUser(result?.user);
      }
    };
    getUser();
  }, []);
  return user;
}
