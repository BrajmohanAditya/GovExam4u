/*
ye ek reusable helper function hai jo HTTP request (GET, POST, PUT, DELETE) bhejne ka kaam karta hai
*/
import { toast } from "react-hot-toast";

const httpAction = async (data) =>{
    try{
        const response = await fetch(data.url, {
            method: data.method ? data.method : 'GET',
            body: data.body ? JSON.stringify(data.body) : null,
            headers: {
                'Content-Type': 'application/json', 
            },
            credentials: 'include',
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result?.message);
        }
        return result;
    } catch (error) {
        console.log('Error during HTTP action:', error);
        toast.error(error.message);
        return { status: false, error: error.message };
    }
}
export default httpAction; 
