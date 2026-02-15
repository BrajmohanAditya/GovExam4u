/*
ye ek reusable helper function hai jo HTTP request (GET, POST, PUT, DELETE) bhejne ka kaam karta hai
*/
import { toast } from "react-hot-toast";

const httpAction = async (data) => {
  try {
    const response = await fetch(data.url, {
      method: data.method ? data.method : "GET",
      body: data.body ? JSON.stringify(data.body) : null,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.message);
    }
    return result;
  } catch (error) {
    console.log("Error during HTTP action:", error);
    const msg = (error.message || "").toString().trim();
    const display = msg || "Something went wrong";
    toast.error(display);
    return { status: false, error: msg };
  }
};
export default httpAction;
