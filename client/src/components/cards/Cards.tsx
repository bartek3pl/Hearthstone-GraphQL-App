import * as React from 'react';
import { Grid } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
// import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import * as CardInterface from '../../interfaces/Card';
import * as styles from './Cards.module.scss';
import Spinner from '../spinner/Spinner';

interface CardsInterface {
  cards: Array<CardInterface.Card>;
}

const GET_CARDS = gql`
  query GetCards {
    cards {
      name
      text
      image
      className
      attack
      health
      manaCost
      rarity
    }
  }
`;

const Cards = () => {
  // const dispatch = useDispatch();

  const { loading, error, data } = useQuery<CardsInterface>(GET_CARDS);

  if (loading) return <Spinner loading={loading} />;
  if (error)
    return (
      <p>
        Error!
        {error.message}
      </p>
    );

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="center"
      alignItems="center"
      className={styles.cardsGrid}
    >
      {data?.cards?.map(
        ({
          name,
          text,
          image,
          className,
          attack,
          health,
          manaCost,
          rarity,
        }) => (
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <Card
              name={name}
              text={text}
              image={image}
              className={className}
              attack={attack}
              health={health}
              manaCost={manaCost}
              rarity={rarity}
            />
          </Grid>
        )
      )}
    </Grid>
  );
};

export default Cards;
