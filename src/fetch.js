import { useState, useEffect } from "react";

export default function fetch() {
    
    const URL = `https://benjamin-mccain-photography.local/wp-json/wp/v2/users`;

    useEffect( () => {
        const fetchData = async () => {
            const result = await fetch(URL)
            console.log(result);
        }
        fetchData()
    }, []);

    return (
        <div>
            Users: {}
        </div>
    )

}
