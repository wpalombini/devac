import React, { Fragment, useContext, useEffect, useState } from 'react';
import { UXContext } from '../../providers/UXProvider';
import { BlockchainService, IPFSModel } from '../../services/BlockchainService';

export interface ICertificateListProps {
  blockchainService: BlockchainService;
}

const CertificateList: (props: ICertificateListProps) => JSX.Element = (props: ICertificateListProps): JSX.Element => {
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
      {certificates.map((certificate: IPFSModel) => (
        <div key={certificate.fullName}>
          <span>{certificate.fullName}</span>
          <span>{certificate.grantedAt}</span>
          <span>{certificate.type}</span>
          <hr />
        </div>
      ))}
    </Fragment>
  );
};

export default CertificateList;
