import { Button, TextField } from '@material-ui/core';
import React, { Fragment } from 'react';
import CardContainer from '../Card';

const Certificate: () => JSX.Element = (): JSX.Element => {
  return (
    <Fragment>
      <h3>Certificate Page</h3>
      <CardContainer
        actions={
          <Button variant="contained" color="primary" size="small">
            Create Certificate
          </Button>
        }
        content={
          <form noValidate autoComplete="off">
            <TextField error={false} helperText="Please enter full name" label="Full name" variant="outlined" />
          </form>
        }
      />
    </Fragment>
  );
};

export default Certificate;
