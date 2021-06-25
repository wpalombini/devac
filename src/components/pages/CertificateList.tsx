import { Grid, makeStyles } from '@material-ui/core';
import { CardMembership } from '@material-ui/icons';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { UXContext } from '../../providers/UXProvider';
import { BlockchainService, IPFSModel } from '../../services/BlockchainService';
import CardContainer from '../Card';

export interface ICertificateListProps {
  blockchainService: BlockchainService;
}

const useStyles = makeStyles({
  root: {
    marginBottom: '5px',
  },
  icon: {
    fontSize: '4vw',
  },
});

const CertificateList: (props: ICertificateListProps) => JSX.Element = (props: ICertificateListProps): JSX.Element => {
  const classes = useStyles();

  const uxContext = useContext(UXContext);

  const [certificates, setCertificates] = useState(new Array<IPFSModel>());

  const getCertificates = async () => {
    uxContext.setIsLoading(true);
    const currentCertificates = await props.blockchainService.getCertificates();
    setCertificates([...currentCertificates]);
    uxContext.setIsLoading(false);
  };

  useEffect(() => {
    getCertificates();
  }, []);

  return (
    <Fragment>
      <h3>Certificate List Page</h3>
      {certificates.map((certificate: IPFSModel, index: number) => (
        <Fragment key={index}>
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <CardContainer
                actions={null}
                content={
                  <Grid container>
                    <Grid item xs={1}>
                      <CardMembership className={classes.icon} />
                    </Grid>
                    <Grid item xs={11}>
                      <Grid container>
                        <Grid item xs={2}>
                          <b>Name:</b>
                        </Grid>
                        <Grid item xs={10}>
                          <span>{certificate.fullName}</span>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={2}>
                          <b>Date issued:</b>
                        </Grid>
                        <Grid item xs={10}>
                          <span>{new Date(certificate.grantedAt).toLocaleString('en-AU')}</span>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid item xs={2}>
                          <b>Type:</b>
                        </Grid>
                        <Grid item xs={10}>
                          <span>{certificate.type}</span>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                }
              />
            </Grid>
          </Grid>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default CertificateList;
