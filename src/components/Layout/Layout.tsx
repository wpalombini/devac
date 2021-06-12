import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { AnimatedSwitch, spring } from 'react-router-transition';
import './Layout.css';
import { BlockchainService } from '../../services/BlockchainService';
import DialogContainer from '../Dialog';
import About from '../pages/About';
import Home from '../pages/Home';
import NavBar from './NavBar';
import SideMenu from './SideMenu';
import { CardMembership, House, Info } from '@material-ui/icons';
import { Container } from '@material-ui/core';
import CreateCertificate from '../pages/CreateCertificate';
import CertificateList from '../pages/CertificateList';
import Certificate from '../pages/Certificate';

export class BlockchainStateModel {
  public accountAddress: string | null;
  public isConnected: boolean;
  public balance: string;
}

const blockchainService: BlockchainService = new BlockchainService();

const Layout: () => JSX.Element = (): JSX.Element => {
  const [blockchain, setBlockchain] = useState(new BlockchainStateModel());
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedDialogValue, setSelectedDialogValue] = useState('');
  const [dialogContent, setDialogContent] = useState(null);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([
    {
      title: 'Home',
      url: '/',
      icon: <House />,
    },
    {
      title: 'About',
      url: '/about',
      icon: <Info />,
    },
  ]);

  const handleConnect: () => Promise<void> = async (): Promise<void> => {
    try {
      await blockchainService.connect();

      const isOwner = await blockchainService.isOwner();

      const currentMenuItems = [...menuItems];
      const menuItem = isOwner
        ? { title: 'Create Certificate', url: '/certificates/create', icon: <CardMembership /> }
        : { title: 'My Certificates', url: '/certificates', icon: <CardMembership /> };

      currentMenuItems.splice(1, 0, menuItem);
      setMenuItems(currentMenuItems);

      setBlockchain({
        ...blockchain,
        accountAddress: blockchainService.getCurrentAccountAddress(),
        isConnected: true,
      });
    } catch (error) {
      console.log('onConnectHandler error: ', error);
    }
  };

  const handleGetBalance: () => Promise<void> = async (): Promise<void> => {
    const balance: string = await blockchainService.getBalance();

    setBlockchain({
      ...blockchain,
      balance: balance,
    });
  };

  const handleAccountAddressClick: (content: any) => void = (content: any) => {
    setDialogContent(content);
    setDialogOpen(true);
  };

  const handleToggleMenu: () => void = (): void => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleCloseDialog = (value: string) => {
    setDialogOpen(false);
    setSelectedDialogValue(value);
  };

  const slide = (val: any) => {
    return spring(val, {
      stiffness: 80,
      damping: 12,
    });
  };

  const pageTransitions = {
    atEnter: {
      offset: -100,
    },
    atLeave: {
      offset: 0,
    },
    atActive: {
      offset: slide(0),
    },
  };

  return (
    <Router>
      <NavBar
        onMenuClicked={handleToggleMenu}
        onAccountClicked={handleAccountAddressClick}
        onConnectClicked={handleConnect}
        onBalanceClicked={handleGetBalance}
        blockchain={blockchain}
      />
      <SideMenu listItems={menuItems} isSideMenuOpen={isSideMenuOpen} toggleSideMenu={handleToggleMenu}></SideMenu>
      <Container maxWidth="md" className="container">
        <AnimatedSwitch
          atEnter={pageTransitions.atEnter}
          atLeave={pageTransitions.atLeave}
          atActive={pageTransitions.atActive}
          mapStyles={(styles) => ({
            transform: `translateX(${styles.offset}%)`,
          })}
        >
          <Route exact path="/" component={Home} />
          <Route path="/about/" component={About} />
          <Route
            exact
            path="/certificates/create"
            render={(props) => <CreateCertificate {...props} blockchainService={blockchainService} />}
          />
          <Route
            path="/certificates/:id"
            render={(props) => <Certificate {...props} blockchainService={blockchainService} />}
          />
          <Route
            path="/certificates/"
            render={(props) => <CertificateList {...props} blockchainService={blockchainService} />}
          />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </AnimatedSwitch>
      </Container>
      <DialogContainer
        content={dialogContent}
        selectedValue={selectedDialogValue}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </Router>
  );
};

export default Layout;
