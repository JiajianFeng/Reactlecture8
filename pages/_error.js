import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import withLayout from '../lib/withLayout';

const styles = {
  container: {
    width: '100%',
    color: 'RED',
    textAlign: 'center'
  },
  subtitle: {
    margin: '0',
    width: '100%',
    paddingTop: '80px',
    lineHeight: '1.15',
    fontSize: '48px'
  }
};

const Error = ({ classes }) => {
  return (
    <div className={classes.container}>
      <h1 className={classes.subtitle}>404! </h1>
      <p className="description">Sorry, but the page you were trying to view does not exist.</p>
    </div>
  );
};

export default withLayout(withStyles(styles)(Error));
