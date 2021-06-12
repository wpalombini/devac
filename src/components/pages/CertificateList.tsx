import React from 'react';
import { BlockchainService } from '../../services/BlockchainService';

export interface ICertificateListProps {
  blockchainService: BlockchainService;
}

const CertificateList: (props: ICertificateListProps) => JSX.Element = (props: ICertificateListProps): JSX.Element => {
  return <h3>Certificate List Page</h3>;
};

export default CertificateList;
