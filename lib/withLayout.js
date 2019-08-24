import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Notification from '../components/Notification';
import theme from './theme';
import actions from './redux/actions';
import 'react-toastify/dist/ReactToastify.css';

const mapStateToProps = state => {
  return {
    user: state.user,
    authentication: state.authentication
  };
};

const withLayout = BaseComponent => {
  class App extends React.Component {
    componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side');
      if (jssStyles) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    }

    isProtected(pathname) {
      return (
        pathname.indexOf('profile') >= 0 ||
        pathname.indexOf('subscriptions') >= 0 ||
        pathname.indexOf('create-a-course') >= 0
      );
    }
    render() {
      const { pathname, authentication } = this.props;

      if (this.isProtected(pathname)) {
        if (!authentication.isLoggedIn) {
          window.location.href = '/login';
          return null;
        }
      }
      return (
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Header {...this.props} />
          <div
            style={{
              marginTop: 20,
              padding: 30,
              maxWidth: 1000,
              minHeight: '72vh',
              margin: '0 auto'
            }}
          >
            <BaseComponent {...this.props} />
          </div>
          <Notification />
          <Footer />
        </ThemeProvider>
      );
    }
  }

  App.propTypes = {
    pageContext: PropTypes.object // eslint-disable-line
  };

  App.defaultProps = {
    pageContext: null
  };

  return connect(
    mapStateToProps,
    actions
  )(App);
};

export default withLayout;
