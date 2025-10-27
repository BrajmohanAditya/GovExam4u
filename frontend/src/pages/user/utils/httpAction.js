/*
ye ek reusable helper function hai jo HTTP request (GET, POST, PUT, DELETE) bhejne ka kaam karta hai
*/
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
            throw new Error(result.message || 'HTTP request failed');
        }
    } catch (error) {
        console.error('Error during HTTP action:', error);
        throw error;
    }
}
export default httpAction; 