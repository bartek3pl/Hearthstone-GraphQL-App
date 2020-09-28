import * as React from 'react';
import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card as MaterialCard,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import { Card as CardInterface, ClassName } from '../../interfaces/Card';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Card: FC<CardInterface> = ({
  name,
  text,
  image,
  className,
  attack,
  health,
  manaCost,
  rarity,
}) => {
  const classes = useStyles();

  const formatClassName = (classname: ClassName) =>
    classname.toString().replace('_', ' ');

  return (
    <MaterialCard className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {ReactHtmlParser(text)}
          </Typography>
          <Typography variant="overline" color="textPrimary" component="p">
            Classname: 
            {' '}
            {formatClassName(className)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography variant="body2" color="textPrimary" component="p">
          Attack: 
          {' '}
          <b>{attack}</b>
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          Health: 
          {' '}
          <b>{health}</b>
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          Mana: 
          {' '}
          <b>{manaCost}</b>
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          Rarity: 
          {' '}
          <b>{rarity}</b>
        </Typography>
      </CardActions>
    </MaterialCard>
  );
};

export default Card;
