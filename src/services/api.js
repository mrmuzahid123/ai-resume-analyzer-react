import axios from "axios";

const API = axios.create({
    baseURL: "https://ai-resume-analyzer-react-1.onrender.com",
});

export default API;