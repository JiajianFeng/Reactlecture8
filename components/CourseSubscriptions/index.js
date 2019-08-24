import React, { Component, Fragment } from 'react';
import { Chip, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import restClient from '../../lib/restClient';
import Loader from '../Loader';

const styles = theme => ({
  chip: {
    margin: theme.spacing.unit / 2
  }
});

class CourseSubscriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      subscriptions: []
    };
  }
  async componentDidMount() {
    try {
      const { id } = this.props;
      const response = await restClient().get(`coursesubscriptions/${id}`);
      this.setState({ subscriptions: response.data, loaded: true });
    } catch (err) {}
  }

  render() {
    const { classes } = this.props;
    const { subscriptions, loaded } = this.state;
    if (!loaded) return <Loader />;

    return (
      <Fragment>
        <Typography component="p">Subscriptions:</Typography>
        {subscriptions.length === 0 && <span>No one has subscribed yet!</span>}
        {subscriptions.map(sub => {
          return <Chip label={sub.FullName} key={sub.StudentId} className={classes.chip} />;
        })}
      </Fragment>
    );
  }
}

export default withStyles(styles)(CourseSubscriptions);
