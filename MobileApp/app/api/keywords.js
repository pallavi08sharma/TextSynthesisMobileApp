import client from "./client";
import tokenApi from "../api/token"


let token;
async function tokenRefresh() {
    console.log("Inside Token Refresh.."); 
    token = await tokenApi.getToken();
};
// tokenRefresh();
const endpoint = "/keywordsPostNew";  
// client.setHeader('Authorization', token)
const extractKeywordsFromText = (inputData)=> {
    tokenRefresh();
    client.setHeader('Authorization', token)
    return client.post(endpoint, 
        inputData, 
        {headers: { 'Content-Type': 'application/json' }});
};

export default {
    extractKeywordsFromText,
  };
  
