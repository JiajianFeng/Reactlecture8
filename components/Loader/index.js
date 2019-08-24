import React from 'react';
import { CircularProgress } from '@material-ui/core';

function Loader() {
  return (
    <div style={{ margin: 20 }}>
      <CircularProgress size={24} thickness={3} />
    </div>
  );
}

export default Loader;
