import axios from 'axios';
import { API } from './config';

const restClient = () => {
  // Create instance
  const instance = axios.create();
  const token = localStorage.getItem('token');
  // Set the AUTH token for any request
  instance.interceptors.request.use(axiosConfig => {
    const current = axiosConfig;
    const { url, method } = current;
    // course form and profile form are using form post not the json
    const isCourseForm =
      url.indexOf('courses') === 0 &&
      (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT');

    const isProfileForm = url.indexOf('userprofile') === 0 && method.toUpperCase() === 'PUT';

    if (isCourseForm || isProfileForm) {
      current.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      current.headers.Accept = '*/*';
      axiosConfig.transformRequest = data => {
        const str = [];
        Object.keys(data).forEach(key =>
          str.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        );
        return str.join('&');
      };
    }

    current.headers.Authorization = `Bearer ${token}`;
    current.url = `${API}/${axiosConfig.url}`;
    return current;
  });

  return instance;
};

export default restClient;
