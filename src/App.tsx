import { CssBaseline } from '@material-ui/core';
import React, { Fragment } from 'react';
import Layout from './components/Layout/Layout';
import { UXProvider } from './providers/UXProvider';

const App: () => JSX.Element = () => {
  return (
    <Fragment>
      <CssBaseline />
      <UXProvider>
        <Layout />
      </UXProvider>
    </Fragment>
  );
};

export default App;
