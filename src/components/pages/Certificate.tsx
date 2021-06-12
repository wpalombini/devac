import { Button, Grid, TextField } from '@material-ui/core';
import React, { Fragment, useEffect, useState } from 'react';
import { BlockchainService } from '../../services/BlockchainService';
import CardContainer from '../Card';

export interface ICertificateProps {
  blockchainService: BlockchainService;
}

const Certificate: (props: ICertificateProps) => JSX.Element = (props: ICertificateProps): JSX.Element => {
  const [canGenerateCertificate, setCanGenerateCertificate] = useState(false);
  const [fullName, setFullName] = useState('');
  const [toAddress, setToAddress] = useState('');

  useEffect((): void => {
    setCanGenerateCertificate(fullName.length && toAddress.length ? true : false);
  }, [fullName, toAddress]);

  const handleGenerateCertificate: () => void = async (): Promise<void> => {
    if (fullName.length && toAddress.length) {
      await props.blockchainService.createCertificate(fullName, toAddress);
      setFullName('');
      setToAddress('');
    }
  };

  return (
    <Fragment>
      <h3>Certificate Page</h3>
      <CardContainer
        actions={
          <Button
            onClick={handleGenerateCertificate}
            disabled={!canGenerateCertificate}
            variant="contained"
            color="primary"
            size="small"
          >
            Create Certificate
          </Button>
        }
        content={
          <form noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  onChange={(e) => setFullName(e.target.value)}
                  value={fullName}
                  fullWidth
                  error={false}
                  helperText="Please enter full name"
                  label="Full name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  onChange={(e) => setToAddress(e.target.value)}
                  value={toAddress}
                  fullWidth
                  error={false}
                  helperText="Please enter the destination address"
                  label="Destination address"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </form>
        }
      />
    </Fragment>
  );
};

export default Certificate;
