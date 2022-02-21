import axios from "axios";

export const api = axios.create({
  baseURL: "https://ce97-177-104-80-182.ngrok.io/",
  headers: {
    "content-type": "application/json",
  },
});
