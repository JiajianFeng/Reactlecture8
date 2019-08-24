import React, { Component } from 'react';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography, FormControl, Checkbox } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import withLayout from '../../lib/withLayout';
import { Router } from '../../lib/routes';

const styles = theme => ({
  headline: {
    marginTop: 20,
    marginBottom: 15,
    textAlign: 'center'
  },
  profileContainer: {
    width: 500,
    margin: '0 auto',
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 500
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  },
  profileBlock: {
    margin: 20,
    textAlign: 'left'
  },
  updateButton: {
    margin: '20 auto'
  },
  updateIcon: {
    marginRight: 5
  },
  checkBox: {
    display: 'block',
    float: 'left'
  },
  checkRoot: {
    padding: 8
  },
  clear: {
    clear: 'both'
  }
});

class Profile extends Component {
  render() {
    const { classes, user } = this.props;
    if (!user) return null;
    const {
      email,
      firstName,
      lastName,
      birthDate,
      mobileNumber,
      title,
      displayName,
      role,
      aboutMe,
      currentMe,
      allowDisplayRealName,
      allowProfilePublic,
      subscribeNewContentReleases,
      subscribeTeacherEmails,
      subscribeContentSuggestions
    } = user;

    return (
      <div className={classes.profileContainer}>
        <Typography className={classes.headline} variant="h4" component="h4">
          Profile
        </Typography>

        <Grid container justify="center">
          <Grid item md={10} xs={12}>
            <div className={classes.profileBlock}>
              <b>Full name: </b>&nbsp; {firstName} {lastName} ({role})
            </div>

            <div className={classes.profileBlock}>
              <b>Email: </b>&nbsp; {email}
            </div>
            <div className={classes.profileBlock}>
              <b>Mobile number: </b>&nbsp; {mobileNumber}
            </div>
            <div className={classes.profileBlock}>
              <b>Display name: </b>&nbsp; {displayName}
            </div>
            <div className={classes.profileBlock}>
              <b>Current me: </b>&nbsp; {currentMe}
            </div>
            <div className={classes.profileBlock}>
              <b>Birthday: </b>&nbsp; {moment(birthDate).format('YYYY-MM-DD')}
            </div>
            <div className={classes.profileBlock}>
              <b>Title: </b>&nbsp; {title}
            </div>
            <div className={classes.profileBlock}>
              <b>About me: </b>&nbsp; {aboutMe}
            </div>

            <FormControl className={classes.checkBox}>
              {Boolean(allowDisplayRealName) === true && (
                <div>
                  Allow display realname{' '}
                  <Checkbox checked disableRipple classes={{ root: classes.checkRoot }} />
                </div>
              )}
              {Boolean(allowProfilePublic) === true && (
                <div>
                  Allow profile public{' '}
                  <Checkbox checked disableRipple classes={{ root: classes.checkRoot }} />
                </div>
              )}
            </FormControl>

            <FormControl className={classes.checkBox}>
              {Boolean(subscribeNewContentReleases) === true && (
                <div>
                  Subscribe new content release{' '}
                  <Checkbox checked disableRipple classes={{ root: classes.checkRoot }} />
                </div>
              )}
            </FormControl>

            <FormControl className={classes.checkBox}>
              {Boolean(subscribeTeacherEmails) === true && (
                <div>
                  Subscribe teacher email{' '}
                  <Checkbox checked disableRipple classes={{ root: classes.checkRoot }} />
                </div>
              )}

              {Boolean(subscribeContentSuggestions) === true && (
                <div>
                  Subscribe content suggestions{' '}
                  <Checkbox checked disableRipple classes={{ root: classes.checkRoot }} />
                </div>
              )}
            </FormControl>
            <div className={classes.clear} />
            <br />
            <FormControl>
              <Button
                className={classes.updateButton}
                onClick={() => Router.push('/profile/edit')}
                variant="contained"
                color="primary"
                type="submit"
              >
                <ArrowForward className={classes.updateIcon} />
                Update
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withLayout(withStyles(styles)(Profile));
