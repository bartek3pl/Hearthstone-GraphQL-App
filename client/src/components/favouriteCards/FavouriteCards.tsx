import * as React from 'react';
import { Grid } from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import Card from '../card/Card';
import * as CardInterface from '../../interfaces/Card';
import * as styles from './FavouriteCards.module.scss';
import Spinner from '../spinner/Spinner';
import { UserReducers } from '../../interfaces/Reducers';

interface FavouriteCardsInterface {
  userFavouriteCards: {
    favouriteCards: Array<CardInterface.Card>;
  };
}

interface LoadingProps {
  loading: boolean;
}

interface ErrorProps {
  errorMessage: string;
}

const Loading: React.FC<LoadingProps> = ({ loading }) => {
  const color = getComputedStyle(document.documentElement).getPropertyValue(
    '--blue'
  );

  return (
    <div className={styles.loadingWrapper}>
      <Spinner loading={loading} color={color} />
    </div>
  );
};

const Error: React.FC<ErrorProps> = ({ errorMessage }) => (
  <div className={styles.errorWrapper}>
    <p>
      Error!
      {errorMessage}
    </p>
  </div>
);

const GET_USER_FAVOURITE_CARDS = gql`
  query UserFavouriteCards($userId: ID!) {
    userFavouriteCards(userId: $userId) {
      success
      message
      favouriteCards {
        id
        name
        text
        image
        imageGold
        className
        attack
        health
        manaCost
        rarity
      }
    }
  }
`;

const Cards = () => {
  const userId = useSelector<UserReducers, string>(
    (state) => state.userReducers.id
  );

  const { loading, error, data, refetch } = useQuery<FavouriteCardsInterface>(
    GET_USER_FAVOURITE_CARDS,
    {
      variables: { userId },
      fetchPolicy: 'no-cache',
    }
  );

  if (loading) return <Loading loading={loading} />;
  if (error) return <Error errorMessage={error.message} />;

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="center"
      alignItems="center"
      className={styles.cardsGrid}
    >
      {data?.userFavouriteCards?.favouriteCards?.map(
        ({
          id,
          name,
          text,
          image,
          className,
          attack,
          health,
          manaCost,
          rarity,
        }) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={name}>
            <Card
              isFavouriteCardView
              refetchFavouriteCards={refetch}
              id={id}
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
