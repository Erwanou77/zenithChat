const BASE_URL = 'http://localhost:3000/api/v1';

const request = async (url, method = 'GET', data = null, customHeaders = {}) => {
  try {
    const options = {
      method,
      headers: { 
        'Content-Type': 'application/json',
        ...customHeaders
      },
    };

    if (data) options.body = JSON.stringify(data);

    const response = await fetch(`${BASE_URL}/${url}`, options);
    const responseData = await response.json();

    if (!response.ok) throw new Error(responseData.message || 'Une erreur est survenue.');

    return responseData;
  } catch (error) {
    throw error;
  }
};

const api = {
  get: (url, customHeaders) => request(url, 'GET', null, customHeaders),
  post: (url, data, customHeaders) => request(url, 'POST', data, customHeaders),
  patch: (url, data, customHeaders) => request(url, 'PATCH', data, customHeaders),
  delete: (url, customHeaders) => request(url, 'DELETE', null, customHeaders),
};

export default api;