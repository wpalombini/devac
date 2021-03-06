import React, { Fragment, useContext, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { BlockchainStateModel } from './Layout';
import CardContainer from '../Card';
import { Link } from 'react-router-dom';
import { UXContext } from '../../providers/UXProvider';

export interface INavBarProps {
  blockchain: BlockchainStateModel;
  onBalanceClicked: () => Promise<void>;
  onAccountClicked: (content: JSX.Element) => void;
  onConnectClicked: () => Promise<void>;
  onDisconnectClicked: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const NavBar: (props: INavBarProps) => JSX.Element = (props: INavBarProps): JSX.Element => {
  const classes = useStyles();

  const uxContext = useContext(UXContext);

  useEffect(() => {
    const getBalance: () => Promise<void> = async (): Promise<void> => {
      if (props.blockchain.isConnected) {
        await props.onBalanceClicked();
      }
    };

    getBalance();
  }, [props.blockchain.isConnected]);

  const balanceContainer: JSX.Element = props.blockchain.isConnected ? (
    <Button
      onClick={() =>
        props.onAccountClicked(
          <CardContainer
            actions={
              <Button onClick={props.onDisconnectClicked} color="primary" size="small">
                Disconnect
              </Button>
            }
            content={
              <Fragment>
                <Typography color="textSecondary">Balance:</Typography>
                <Typography variant="h4" component="h4">
                  {props.blockchain.balance} ETH
                </Typography>
              </Fragment>
            }
          />,
        )
      }
      color="inherit"
    >
      {props.blockchain.accountAddress?.slice(0, 5)}(...)
      {props.blockchain.accountAddress?.slice(props.blockchain.accountAddress.length - 5)}
    </Button>
  ) : (
    <Button onClick={props.onConnectClicked} color="inherit" variant="outlined">
      Connect Wallet
    </Button>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => uxContext.setIsSideMenuOpen(!uxContext.isSideMenuOpen)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">deVac App</Link>
          </Typography>
          {balanceContainer}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
