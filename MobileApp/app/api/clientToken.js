import { create } from "apisauce";
import {API_URL} from "@env"

const apiClient = create({
    baseURL: "https://login.microsoftonline.com",
  });

  
export default apiClient;