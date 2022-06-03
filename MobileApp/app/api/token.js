import client from './clientToken'
import {API_TOKEN} from "@env"
import {API_ID} from "@env"

const endpoint = "/2c1c2d4d-3a60-43be-b78a-63fe651c00bb/oauth2/token";   

let formData= new FormData()
formData.append("grant_type","client_credentials")
formData.append("client_id",API_ID)
formData.append("client_secret",API_TOKEN)
formData.append("resource",API_ID)
const getToken = ()=> {
    return client.post(endpoint, 
        formData, 
        {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
};

export default {
    getToken,
  };
  