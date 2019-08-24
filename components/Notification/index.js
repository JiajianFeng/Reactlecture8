import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';

const CloseButton = ({ closeToast }) => (
  <IconButton aria-label="close" onClick={closeToast} color="inherit">
    <Clear />
  </IconButton>
);
class Notification extends React.Component {
  render() {
    return (
      <Fragment>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          closeButton={<CloseButton />}
          draggable
          pauseOnHover={false}
        />
      </Fragment>
    );
  }
}

export default Notification;
