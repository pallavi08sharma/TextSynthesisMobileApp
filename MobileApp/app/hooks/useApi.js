// import { useState } from 'react';

// export default useApi = (apiFunc) => {

//     const [data, setData] = useState(null);
//     const [error, setError] = useState(false);  //new code
//     const [loading, setLoading] = useState(false);
    
//     const request = async(...args) => {
//         console.log("Here at 1")
//         setLoading(true);
//         const response = await apiFunc(...args);
//         console.log("Response in useAPI = ", response)
//         console.log("Here at 2")
//         setLoading(false);
//         console.log("Here at 3")

//         if(!response.ok) 
//             return setError(true);

//         setError(false);
//         console.log("Here at 4")
//         console.log("Response.data = ", response.data)
//         setData(response.data);
//         //return response;
//     };
//     console.log("data in useAPI = ", data);
//     return {data, error, loading, request};
// }