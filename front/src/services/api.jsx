const BASE_URL = 'http://localhost:3000/api/v1';

const request = async (url, method = 'GET', data = null) => {
  try {
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
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
  get: (url) => request(url),
  post: (url, data) => request(url, 'POST', data),
  patch: (url, data) => request(url, 'PATCH', data),
  delete: (url) => request(url, 'DELETE'),
};

export default api;