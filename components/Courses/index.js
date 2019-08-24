import React, { Component } from 'react';
import {
  Grid,
  Card,
  CardActionArea,
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

const styles = {
  courseGrid: {
    padding: 10
  },
  courseCard: {
    cursor: 'pointer',
    height: '100%',
    maxHeight: 400,
    position: 'relative'
  }
};

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      courses: []
    };
    this.viewCourseDetail = this.viewCourseDetail.bind(this);
  }
  async componentDidMount() {
    try {
      const response = await restClient().get('courses');
      this.setState({ courses: response.data, loaded: true });
    } catch (err) {}
  }

  viewCourseDetail(id) {
    Router.push(`/courses/${id}`);
  }

  render() {
    const { classes } = this.props;
    const { courses, loaded } = this.state;
    if (!loaded) return <Loader />;

    return (
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignContent="stretch"
        alignItems="stretch"
      >
        {courses.map(course => (
          <Grid item md={4} sm={6} xs={12} className={classes.courseGrid} key={course.courseId}>
            <Card
              className={classes.courseCard}
              onClick={() => this.viewCourseDetail(course.courseId)}
            >
              <CardActionArea>
                {course.coverImage && course.coverImage !== 'http://www.aistan.com.au/' && (
                  <CardMedia
                    component="img"
                    alt={course.courseName}
                    height="140"
                    image={course.coverImage}
                    title={course.courseName}
                  />
                )}

                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {course.subTitle}
                  </Typography>
                  <Typography component="p">{course.courseBrief}</Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }
}

export default withStyles(styles)(Courses);
