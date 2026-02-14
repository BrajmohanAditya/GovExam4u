/*
ye ek reusable helper function hai jo HTTP request (GET, POST, PUT, DELETE) bhejne ka kaam karta hai
*/
import { toast } from "react-hot-toast";

const httpAction = async (data) => {
  try {
    // Log the outgoing request for debugging (method + url)
    console.log(`HTTP ${data.method ? data.method : "GET"} ${data.url}`);
    const response = await fetch(data.url, {
      method: data.method ? data.method : "GET",
      body: data.body ? JSON.stringify(data.body) : null,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    // Safely parse JSON only when server returns JSON
    const contentType = response.headers.get("content-type") || "";
    let result;
    if (contentType.includes("application/json")) {
      result = await response.json();
    } else {
      // non-JSON (likely HTML/error page) — capture text for debugging
      const text = await response.text();
      // include a helpful message to diagnose misrouted requests
      const hint = `Non-JSON response (content-type: ${contentType}). First 1000 chars:\n${text.slice(0, 1000)}`;
      throw new Error(hint);
    }

    if (!response.ok) {
      throw new Error(result?.message || "Request failed");
    }

    return result;
  } catch (error) {
    console.log("Error during HTTP action:", error);
    toast.error(error.message);
    return { status: false, error: error.message };
  }
};
export default httpAction;
