import axios from "axios";

export const api = axios.create({
    baseURL: "https://djbnrrib9e.execute-api.us-east-2.amazonaws.com/v1"
})


