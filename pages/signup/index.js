import React, { Component } from 'react';
import { Button, Grid, Typography, MenuItem } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import { TextValidator, SelectValidator, ValidatorForm } from 'react-material-ui-form-validator';
import withLayout from '../../lib/withLayout';
import restClient from '../../lib/restClient';
import { Router } from '../../lib/routes';

const styles = theme => ({
  signupContainer: {
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
  signupButton: {
    float: 'right',
    marginTop: 30
  },
  signupIcon: {
    marginRight: 5
  },
  signupForm: {
    marginTop: 40
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      role: 'Student',
      confirmPassword: '',
      submitted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', value => {
      const { password } = this.state;
      if (value !== password) {
        return false;
      }
      return true;
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit() {
    const { firstName, lastName, email, password, role } = this.state;
    this.setState({ submitted: true });

    restClient()
      .post(`userprofile`, {
        Email: email,
        Password: password,
        FirstName: firstName,
        LastName: lastName,
        Role: role
      })
      .then(async () => {
        const response = await restClient().post('signin', { userName: email, password });

        const { token, role, uniqueId } = response.data;

        const { authenticate, updateUser } = this.props;
        localStorage.setItem('token', token);
        localStorage.setItem('uniqueId', uniqueId);
        authenticate(response.data);
        const profile = await restClient().get(`userprofile/${uniqueId}`);

        updateUser({ ...profile.data, role });
        Router.push('/');
      })
      .catch(() => {
        this.setState({ submitted: false });
      });
  }

  render() {
    const { classes } = this.props;
    const { submitted, firstName, lastName, email, role, password, confirmPassword } = this.state;
    return (
      <div className={classes.signupContainer}>
        <Typography className={classes.headline} variant="h4" component="h4">
          Sign up
        </Typography>

        <Grid container justify="center">
          <Grid item xs={12}>
            <ValidatorForm className={classes.signupForm} onSubmit={this.handleSubmit}>
              <TextValidator
                fullWidth
                required
                margin="normal"
                label="Firstname"
                onChange={this.handleChange}
                name="firstName"
                validators={['required', 'minStringLength:2', 'maxStringLength:32']}
                errorMessages={[
                  'This field is required',
                  'Firstname cannot be shortter than 2 characters!',
                  'Firstname cannot be longer than 32 characters!'
                ]}
                value={firstName}
              />

              <TextValidator
                fullWidth
                required
                margin="normal"
                label="Lastname"
                onChange={this.handleChange}
                name="lastName"
                validators={['required', 'minStringLength:2', 'maxStringLength:32']}
                errorMessages={[
                  'This field is required',
                  'Lastname cannot be shortter than 2 characters!',
                  'Lastname cannot be longer than 32 characters!'
                ]}
                value={lastName}
              />

              <TextValidator
                required
                fullWidth
                margin="normal"
                label="Email Address"
                onChange={this.handleChange}
                name="email"
                value={email}
                validators={['required', 'isEmail']}
                errorMessages={['This field is required!', 'Email address is not valid!']}
              />

              <SelectValidator
                required
                select
                fullWidth
                margin="normal"
                name="role"
                label="Role"
                onChange={this.handleChange}
                value={role}
                validators={['required']}
                errorMessages={['This field is required!']}
                helperText="Please select the role?"
              >
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Instructor">Instructor</MenuItem>
              </SelectValidator>

              <TextValidator
                fullWidth
                required
                margin="normal"
                label="Password"
                onChange={this.handleChange}
                name="password"
                type="password"
                validators={['required', 'minStringLength:8']}
                errorMessages={[
                  'This field is required',
                  'Password cannot be shorter than 8 characters!'
                ]}
                value={password}
              />

              <TextValidator
                fullWidth
                required
                margin="normal"
                label="Repeat password"
                onChange={this.handleChange}
                name="confirmPassword"
                type="password"
                validators={['isPasswordMatch', 'required']}
                errorMessages={['Password mismatch!', 'This field is required!']}
                value={confirmPassword}
              />

              <Button
                className={classes.signupButton}
                disabled={submitted}
                variant="contained"
                color="primary"
                type="submit"
              >
                <ArrowForward className={classes.signupIcon} />
                Sign up
              </Button>
              <div className="clear" />
            </ValidatorForm>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withLayout(withStyles(styles)(SignUp));
