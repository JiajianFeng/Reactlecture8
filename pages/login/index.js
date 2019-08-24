import React, { Component, Fragment } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import withLayout from '../../lib/withLayout';
import restClient from '../../lib/restClient';
import errorHandler from '../../lib/errorHandler';
import { Router } from '../../lib/routes';

const styles = theme => ({
  loginContainer: {
    width: 500,
    margin: '0 auto',
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 500
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  loginButton: {
    float: 'right',
    marginTop: 40
  },
  loginForm: {
    marginTop: 40
  },
  clear: {
    clear: 'both'
  },
  headline: {
    marginTop: 30,
    textAlign: 'center'
  },
  signupSection: {
    textAlign: 'center',
    marginTop: 10
  },
  signupInLogin: {
    marginLeft: 10
  },
  hr: {
    border: 0,
    borderTop: '1px solid #f5f5f5'
  }
});

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      submitted: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit() {
    const { username, password } = this.state;

    this.setState({ submitted: true });
    try {
      const response = await restClient().post('signin', { userName: username, password });

      const { token, role, uniqueId } = response.data;

      const { authenticate, updateUser } = this.props;
      localStorage.setItem('token', token);
      localStorage.setItem('uniqueId', uniqueId);
      authenticate(response.data);
      const profile = await restClient().get(`userprofile/${uniqueId}`);

      updateUser({ ...profile.data, role });

      Router.push('/');
    } catch (err) {
      errorHandler(err);
      this.setState({ submitted: false });
    }
  }

  signup = () => {
    Router.push('/signup');
  };
  render() {
    const { classes } = this.props;
    const { submitted, username, password } = this.state;
    return (
      <Fragment>
        <div className={classes.loginContainer}>
          <Typography className={classes.headline} variant="h4" component="h4">
            Login
          </Typography>

          <Grid container justify="center">
            <Grid item xs={12}>
              <ValidatorForm className={classes.loginForm} onSubmit={this.handleSubmit}>
                <TextValidator
                  required
                  fullWidth
                  margin="normal"
                  label="Username"
                  onChange={e => this.setState({ username: e.target.value })}
                  name="userName"
                  disabled={submitted}
                  value={username}
                  validators={['required', 'minStringLength:5']}
                  errorMessages={[
                    'This field is required!',
                    'Username cannot be shorter than 5 characters!'
                  ]}
                />

                <TextValidator
                  required
                  fullWidth
                  margin="normal"
                  label="Password"
                  onChange={e => this.setState({ password: e.target.value })}
                  name="password"
                  type="password"
                  validators={['required', 'minStringLength:5']}
                  errorMessages={[
                    'This field is required',
                    'Password cannot be shorter than 8 characters!'
                  ]}
                  value={password}
                />

                <Button
                  className={classes.loginButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={submitted}
                >
                  Login
                </Button>
                <div className={classes.clear} />
                <hr className={classes.hr} />
              </ValidatorForm>
            </Grid>
          </Grid>
        </div>
        <div className={classes.signupSection}>
          Don’t have an account?
          <Button
            className={classes.signupInLogin}
            variant="text"
            color="primary"
            size="small"
            onClick={this.signup}
          >
            Sign up
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default withLayout(withStyles(styles)(LoginPage));
