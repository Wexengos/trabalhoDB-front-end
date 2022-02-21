import axios from "axios";

export const api = axios.create({
  baseURL: "https://de21-177-104-80-182.ngrok.io/",
  headers: {
    "content-type": "application/json",
  },
});
