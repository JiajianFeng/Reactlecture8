import { toast, Zoom } from 'react-toastify';

const showMessage = (message, level = 'info') => {
  switch (level) {
    case 'error':
      toast.error(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        transition: Zoom
      });

      break;
    case 'success':
      toast.success(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        transition: Zoom
      });
      break;
    case 'warning':
      toast.warn(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        transition: Zoom
      });
      break;
    default:
      toast.info(message, {
        position: toast.POSITION.BOTTOM_CENTER,
        transition: Zoom
      });
  }
};
export default showMessage;
