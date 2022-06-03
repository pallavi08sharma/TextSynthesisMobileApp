import { create } from "apisauce";

const apiClient = create({
    baseURL: "https://keywordsapi.azurewebsites.net/",
  });

  
export default apiClient;