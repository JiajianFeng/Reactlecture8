import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  Card,
  Chip,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import restClient from '../../lib/restClient';
import { Router } from '../../lib/routes';
import Loader from '../Loader';
import CourseSubscriptions from '../CourseSubscriptions';
import CourseBannerEditor from '../CourseBannerEditor';

const styles = theme => ({
  courseCard: {
    cursor: 'pointer',
    height: '100%',
    position: 'relative',
    '& p': {
      margin: '10px 0px'
    }
  },
  chip: {
    margin: theme.spacing.unit / 2
  }
});
class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      course: {}
    };
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.hasSubscribed = this.hasSubscribed.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.finishUpload = this.finishUpload.bind(this);
  }

  async componentDidMount() {
    try {
      const { id } = this.props;
      const response = await restClient().get(`courses/${id}`);
      this.setState({ course: response.data, loaded: true });
    } catch (err) {}
  }

  finishUpload(coverImage) {
    this.setState(state => {
      const updated = state;
      // update course CoverImage
      updated.course.coverImage = `http://www.aistan.com.au/${coverImage}`;
      return updated;
    });
  }

  displayTag(tags) {
    if (!tags || !tags.length) return null;
    const { classes } = this.props;
    return tags.split(',').map(tag => {
      const label = tag.trim();
      return <Chip label={label} key={label} className={classes.chip} />;
    });
  }

  async subscribe() {
    try {
      const { course } = this.state;
      await restClient().post('subscriptioncourses', {
        StudentId: localStorage.getItem('uniqueId'),
        CourseId: course.courseId,
        SubscriptionStatus: true
      });
      window.location.reload();
    } catch (err) {}
  }

  hasSubscribed() {
    const { course } = this.state;
    const uid = localStorage.getItem('uniqueId');
    return course.StudentIds && course.StudentIds.includes(uid && uid.toUpperCase());
  }

  async unsubscribe() {
    try {
      const { course } = this.state;
      const uid = localStorage.getItem('uniqueId');
      await restClient().put(`subscriptioncourses/${uid && uid.toUpperCase()}`, {
        CourseId: course.courseId,
        SubscriptionStatus: false
      });
      window.location.reload();
    } catch (err) {}
  }

  async deleteCourse() {
    try {
      const { course } = this.state;
      await restClient().delete(`courses/${course.courseId}`);

      Router.push('/');
    } catch (err) {}
  }

  editCourse = () => {
    const { course } = this.state;
    Router.push(`/courses/${course.courseId}/edit`);
  };

  getActions(user) {
    if (_.isEmpty(user)) return null;

    if (user.role === 'Instructor') {
      return (
        <Fragment>
          <Button size="small" color="primary" onClick={this.deleteCourse}>
            Delete this course
          </Button>
          <Button size="small" color="primary" onClick={this.editCourse}>
            Edit this course
          </Button>
        </Fragment>
      );
    }

    if (this.hasSubscribed()) {
      return (
        <Button size="small" color="primary" onClick={this.unsubscribe}>
          Unsubscribe
        </Button>
      );
    }
    return (
      <Button size="small" color="primary" onClick={this.subscribe}>
        Subscribe
      </Button>
    );
  }

  redirectAllCourses = () => {
    Router.push('/');
  };

  render() {
    const { classes, user } = this.props;
    const { course, loaded } = this.state;
    if (!loaded) return <Loader />;
    const { coverImage } = course;
    const hasBanner = coverImage && coverImage !== 'http://www.aistan.com.au/';
    return (
      <div style={{ marginTop: 20, paddingTop: 30, maxWidth: 1000, margin: '0 auto' }}>
        <Card className={classes.courseCard}>
          {hasBanner && (
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="200"
              image={course.coverImage}
              title="Contemplative Reptile"
            />
          )}
          {user && user.role === 'Instructor' && (
            <CourseBannerEditor
              course={course}
              hasBanner={hasBanner}
              finishUpload={this.finishUpload}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {course.courseName}
            </Typography>
            <Typography gutterBottom variant="h4" component="h4">
              {course.subTitle}
            </Typography>

            <Typography component="p">Course Code: {course.courseCode}</Typography>
            <Typography component="p">Brief: {course.courseBrief}</Typography>

            <Typography component="p">Course Duration: {course.courseDuration} minutes</Typography>

            <Typography component="p">Target Audience: {course.targetAudiences}</Typography>

            <Typography component="p">Course Detail: {course.courseDetails}</Typography>

            <Typography component="p">Knowledge Points: {course.knowledgePoints}</Typography>

            <Typography component="p">
              Start Date: {moment(course.joinDate).format('YYYY-MM-DD')}
            </Typography>

            {this.displayTag(course.courseTags)}

            {!_.isEmpty(user) && this.hasSubscribed() && (
              <Typography>Subscribed already</Typography>
            )}
            {user && user.role === 'Instructor' && <CourseSubscriptions id={course.courseId} />}
          </CardContent>

          <CardActions>
            {this.getActions(user)}

            <Button size="small" color="primary" onClick={this.redirectAllCourses}>
              All Courses
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(CourseDetail);
