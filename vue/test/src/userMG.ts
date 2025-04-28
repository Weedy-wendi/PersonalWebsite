import axios from 'axios';

// 正确：用 axios.create() 创建实例
export const testAxios = axios.create({
  baseURL: 'http://localhost:8080/api', // 例如 'http://localhost:3000/api'
  timeout: 5000, // 超时时间
});