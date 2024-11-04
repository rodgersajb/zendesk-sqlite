
import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api');
                console.log(data);
                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }
    , []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <main>
            <h1>Customer Support Dashboard</h1>
            <p>{data}</p>
        </main>
    
    )

}