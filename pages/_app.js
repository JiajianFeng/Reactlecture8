// pages/_app.js
import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import { PersistGate } from 'redux-persist/integration/react';
import withRedux from 'next-redux-wrapper';

import makeStore from '../lib/redux';
import actions from '../lib/redux/actions';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const init = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...init,
        query: ctx.query,
        host: (ctx.req && ctx.req.headers.host) || window.location.host,
        pathname: ctx.pathname
      }
    };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <PersistGate persistor={store.__persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore, actions)(MyApp);
