import React ,{useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom" ;
import httpAction from "./utils/httpAction";

const Super = () => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setisAuth] = useState(false);
    useEffect(() => {
        const getUserAccess = async () => {
            const data = {
                url:apis().getAccess,
            }
            setLoading(true);
            const result = await httpAction(data);
            setLoading(false);
            console.log("Access result:", result);
            if(result?.status){
                setisAuth(true);
            }
        }
        getUserAccess();
    }, []);

    if(loading){
        return <div>Loading...</div>;
    };
    if(!isAuth){
        return <Navigate to = "/login" />;
    }else{
        return <Outlet />;
    }

}       
export default Super;