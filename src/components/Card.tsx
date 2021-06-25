import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

export interface ICardProps {
  actions: JSX.Element | null;
  content: JSX.Element | null;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  content: {
    '&:last-child': {
      paddingBottom: 16,
    },
  },
});

const CardContainer: (props: ICardProps) => JSX.Element = (props: ICardProps): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>{props.content}</CardContent>
      {props.actions ? <CardActions>{props.actions}</CardActions> : null}
    </Card>
  );
};

export default CardContainer;
