import showMessage from './notification';

const errorHandler = err => {
  if (!err.response) {
    showMessage(err.message, 'warning');
    return;
  }
  const { data, status } = err.response;
  if (status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('persist:jike');

    showMessage('Please login first!', 'warning');

    setTimeout(() => {
      window.location.href = '/login';
    }, 4000);
  } else if (status === 404) {
    showMessage('Not found', 'warning');
  } else if (status === 422 || status === 403 || status === 400) {
    if (data) {
      let { value: errorMessages } = data.message;
      showMessage(errorMessages, 'error');
    } else {
      showMessage('Error caught up, please check the backend', 'error');
    }
  } else {
    showMessage(data.message, 'warning');
  }
};

export default errorHandler;
