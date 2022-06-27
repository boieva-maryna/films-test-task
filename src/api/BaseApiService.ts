import axios from "axios";
import { AxiosError } from "axios";

const BaseApiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

BaseApiService.interceptors.request.use(
  async (config) => {
    if (!config.params) {
      config.params = {};
    }
    config.params.form = "json";
    config.params.lang = "en";

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

BaseApiService.interceptors.response.use(function (response) {
  if (response.data.isException) {
    const { responseCode, description } = response.data;
    return Promise.reject(new AxiosError(description, responseCode));
  }
  return response;
});

export default BaseApiService;
