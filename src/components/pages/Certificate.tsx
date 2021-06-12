import React from 'react';
import { BlockchainService } from '../../services/BlockchainService';

export interface ICertificateProps {
  blockchainService: BlockchainService;
}

const Certificate: (props: ICertificateProps) => JSX.Element = (props: ICertificateProps): JSX.Element => {
  return <h3>Certificate Page</h3>;
};

export default Certificate;
