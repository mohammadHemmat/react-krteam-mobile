// src/apis/configs/axiosConfigs.js

import axios from "axios"

var access_token= localStorage.getItem("access_token");
export const api = axios.create({
  baseURL: "https://api.karteam.app",
  headers: {
    "Authorization": `Bearer ${access_token?access_token:""}`,
    'Content-Type': 'application/json'
  },
})

// defining a custom error handler for all APIs
const errorHandler = (error) => {
  const statusCode = error.response?.status

  // logging only errors that are not 401
  if (statusCode && statusCode !== 401) {
    console.error(error)
  }

  return Promise.reject(error)
}

// registering the custom error handler to the
// "api" axios instance
api.interceptors.response.use(undefined, (error) => {
  return errorHandler(error)
})