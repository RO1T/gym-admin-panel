import { defineBoot } from '#q-app/wrappers';
import axios, { type AxiosInstance } from 'axios';

declare module 'vue' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}


const api = axios.create({
  baseURL: String(process.env.QUASAR_API_URL),
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

export default defineBoot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});
api.defaults.withCredentials = false

export { api };
