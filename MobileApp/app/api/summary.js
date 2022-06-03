import client from "./clientSummary";
const endpoint = "/SummaryPost";   

const extractSummaryFromText = (inputData)=> {
    return client.post(endpoint, 
        inputData, 
        {headers: { 'Content-Type': 'application/json' }});
};

export default {
    extractSummaryFromText,
  };
  