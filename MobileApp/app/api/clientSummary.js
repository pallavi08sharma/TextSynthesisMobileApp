import { create } from "apisauce";

  const apiClient = create({
    baseURL: "https://extractivesummaryapi.azurewebsites.net/",
  });

export default apiClient;