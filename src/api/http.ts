import axios from 'axios';
import { notification } from 'antd';
axios.defaults.baseURL =
  'https://www.fastmock.site/mock/868f63b46c152f008ddea8a67574efcd/react_umi';
axios.defaults.timeout = 100000;

interface IHttpResponse {
  readonly code: number;
  data: any;
}

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    notification.error({
      message: 'Error',
      description: '发生错误，请联系管理员',
    });
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (data) => {
    return data;
  },
  (error) => {
    notification.error({
      message: 'Error',
      description: '发生错误，请联系管理员',
    });
    return Promise.reject(error);
  },
);

export const get = (url: string): Promise<IHttpResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        if (res.data.code === 200) {
          resolve(res.data);
        }
      })
      .catch((err) => reject(err));
  });
};

export const post = (url: string, params: object): Promise<IHttpResponse> => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, { ...params })
      .then((res) => {
        if (res.data.code === 200) {
          resolve(res.data);
        }
      })
      .catch((err) => reject(err));
  });
};
