import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Grid,
  Typography,
  FormControl,
  Checkbox,
  FormControlLabel,
  TextField
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { ArrowForward } from '@material-ui/icons';
import restClient from '../../lib/restClient';
import withLayout from '../../lib/withLayout';
import { Router } from '../../lib/routes';

const styles = theme => ({
  profileContainer: {
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
  profileForm: {
    marginTop: 40
  },
  updateButton: {
    float: 'right',
    marginTop: 30
  },
  updateIcon: {
    marginRight: 5
  },
  checkBox: {
    display: 'block',
    textAlign: 'left',
    float: 'left'
  }
});

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    const {
      email,
      firstName,
      lastName,
      birthDate,
      mobileNumber,
      title,
      displayName,
      aboutMe,
      currentMe,
      allowDisplayRealName,
      allowProfilePublic,
      subscribeNewContentReleases,
      subscribeTeacherEmails,
      subscribeContentSuggestions
    } = props.user;
    this.state = {
      email,
      firstName,
      lastName,
      mobileNumber,
      title,
      displayName: displayName || '',
      aboutMe,
      currentMe,
      allowDisplayRealName,
      allowProfilePublic,
      subscribeNewContentReleases,
      subscribeTeacherEmails,
      subscribeContentSuggestions,
      birthDate: birthDate && moment(birthDate).format('YYYY-MM-DD'),
      submitted: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCheckBoxChange(event) {
    this.setState({ [event.target.name]: event.target.checked });
  }
  async handleSubmit() {
    const {
      firstName,
      lastName,
      email,
      birthDate,
      mobileNumber,
      title,
      displayName,
      aboutMe,
      currentMe,
      allowDisplayRealName,
      allowProfilePublic,
      subscribeNewContentReleases,
      subscribeTeacherEmails,
      subscribeContentSuggestions
    } = this.state;
    this.setState({ submitted: true });
    try {
      let newUser = {
        Email: email,
        FirstName: firstName,
        LastName: lastName,
        BirthDate: birthDate,
        MobileNumber: mobileNumber,
        Title: title,
        DisplayName: displayName,
        AboutMe: aboutMe,
        CurrentMe: currentMe,
        AllowDisplayRealName: allowDisplayRealName,
        AllowProfilePublic: allowProfilePublic,
        SubscribeNewContentReleases: subscribeNewContentReleases,
        SubscribeFeatureUpdates: null,
        SubscribeTeacherEmails: subscribeTeacherEmails,
        SubscribeContentSuggestions: subscribeContentSuggestions
      };
      const { user, updateUser } = this.props;
      await restClient().put(`userprofile/${user.uniqueId}`, newUser);

      newUser = _.assign({
        ...user,
        email,
        firstName,
        lastName,
        birthDate,
        mobileNumber,
        title,
        displayName,
        aboutMe,
        currentMe,
        allowDisplayRealName,
        allowProfilePublic,
        subscribeNewContentReleases,
        subscribeTeacherEmails,
        subscribeContentSuggestions
      });

      updateUser(newUser);

      Router.push('/profile');
    } catch (err) {
      this.setState({ submitted: false });
    }
  }

  render() {
    const { user } = this.props;
    if (!user) return null;
    const { classes } = this.props;

    const {
      email,
      firstName,
      lastName,
      birthDate,
      mobileNumber,
      title,
      displayName,
      aboutMe,
      currentMe,
      allowDisplayRealName,
      allowProfilePublic,
      subscribeNewContentReleases,
      subscribeTeacherEmails,
      subscribeContentSuggestions,
      submitted
    } = this.state;
    return (
      <div className={classes.profileContainer}>
        <Typography className={classes.headline} variant="h4" component="h4">
          Profile
        </Typography>

        <Grid container justify="center">
          <Grid item xs={12}>
            <ValidatorForm className={classes.profileForm} onSubmit={this.handleSubmit}>
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
                value={firstName || ''}
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
                value={lastName || ''}
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

              <TextValidator
                fullWidth
                margin="normal"
                label="Mobile number"
                onChange={this.handleChange}
                name="mobileNumber"
                value={mobileNumber}
                validators={['isNumber']}
                helperText="What is your mobile phone number?"
                errorMessages={['Mobile number must be a number!']}
              />

              <TextValidator
                fullWidth
                required
                margin="normal"
                label="Display name"
                onChange={this.handleChange}
                name="displayName"
                value={displayName}
              />

              <TextValidator
                fullWidth
                required
                margin="normal"
                label="Current me"
                onChange={this.handleChange}
                name="currentMe"
                helperText="Please describe your current state?"
                value={currentMe}
              />

              <TextField
                fullWidth
                required
                margin="normal"
                label="Birth date"
                onChange={this.handleChange}
                name="birthDate"
                value={birthDate || ''}
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
              />

              <TextValidator
                required
                fullWidth
                margin="normal"
                label="Title"
                onChange={this.handleChange}
                name="title"
                value={title}
                validators={['required', 'minStringLength:2']}
                errorMessages={['This field is required!', 'Title is shorter than 2 characters!']}
              />

              <TextValidator
                required
                fullWidth
                multiline
                rows={4}
                margin="normal"
                label="About me"
                onChange={this.handleChange}
                name="aboutMe"
                value={aboutMe}
                validators={['required']}
                errorMessages={['This field is required!']}
              />

              <FormControl className={classes.checkBox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={allowDisplayRealName}
                      onChange={this.handleCheckBoxChange}
                      name="allowDisplayRealName"
                    />
                  }
                  label="Allow display real name"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={allowProfilePublic}
                      onChange={this.handleCheckBoxChange}
                      name="allowProfilePublic"
                    />
                  }
                  label="Allow profile public"
                />
              </FormControl>

              <FormControl className={classes.checkBox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={subscribeNewContentReleases}
                      onChange={this.handleCheckBoxChange}
                      name="subscribeNewContentReleases"
                    />
                  }
                  label="Subscribe new content releases"
                />
              </FormControl>

              <FormControl className={classes.checkBox}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={subscribeTeacherEmails}
                      onChange={this.handleCheckBoxChange}
                      name="subscribeTeacherEmails"
                    />
                  }
                  label="Subscribe teacher emails"
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={subscribeContentSuggestions}
                      onChange={this.handleCheckBoxChange}
                      name="subscribeContentSuggestions"
                    />
                  }
                  label="Subscribe content suggestions"
                />
              </FormControl>

              <Button
                className={classes.updateButton}
                disabled={submitted}
                variant="contained"
                color="primary"
                type="submit"
              >
                <ArrowForward className={classes.updateIcon} />
                Update
              </Button>
              <div className="clear" />
            </ValidatorForm>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withLayout(withStyles(styles)(ProfileEdit));
