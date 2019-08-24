import React, { Component, Fragment } from 'react';
import {
  Avatar,
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Work } from '@material-ui/icons';
import moment from 'moment';
import restClient from '../../lib/restClient';
import errorHandler from '../../lib/errorHandler';
import { Router } from '../../lib/routes';
import Loader from '../Loader';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2
  },
  listButton: {
    cursor: 'pointer'
  }
});

class SubscriptionCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      subscriptions: []
    };
  }
  async componentDidMount() {
    try {
      const response = await restClient().get(`subscriptioncourses`);
      this.setState({ subscriptions: response.data, loaded: true });
    } catch (err) {
      errorHandler(err);
    }
  }

  redirectCourse = id => {
    Router.push(`/courses/${id}`);
  };

  render() {
    const { classes } = this.props;
    const { subscriptions, loaded } = this.state;
    if (!loaded) return <Loader />;

    return (
      <Fragment>
        <Typography component="h3">Subscriptions:</Typography>
        {subscriptions.length === 0 && <span>The list is empty!</span>}
        <List className={classes.root} component="nav">
          {subscriptions.map(sub => {
            return (
              <ListItem
                key={sub.courseId}
                className={classes.listButton}
                button
                onClick={() => this.redirectCourse(sub.courseId)}
              >
                <ListItemAvatar>
                  <Avatar>
                    <Work />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={sub.courseName}
                  secondary={
                    <Fragment>
                      {sub.subscriptionStatusDesc}
                      <br />
                      {moment(sub.updateTime).format('YYYY-MMM-DD')}
                    </Fragment>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Fragment>
    );
  }
}

export default withStyles(styles)(SubscriptionCourses);
