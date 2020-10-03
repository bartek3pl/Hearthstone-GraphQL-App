import * as React from 'react';
import { Grid, TextField, InputAdornment, MenuItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { gql, useQuery } from '@apollo/client';
import Card from '../card/Card';
import * as CardInterface from '../../interfaces/Card';
import * as styles from './Cards.module.scss';
import Spinner from '../spinner/Spinner';

interface CardsInterface {
  cards: Array<CardInterface.Card>;
}

interface LoadingProps {
  loading: boolean;
}

interface ErrorProps {
  errorMessage: string;
}

interface SearchType {
  value: string;
  label: string;
}

const searchTypes = [
  {
    value: 'name',
    label: 'Name',
  },
  {
    value: 'text',
    label: 'Text',
  },
  {
    value: 'className',
    label: 'Class name',
  },
  {
    value: 'attack',
    label: 'Attack',
  },
  {
    value: 'health',
    label: 'Health',
  },
  {
    value: 'manaCost',
    label: 'Mana cost',
  },
  {
    value: 'rarity',
    label: 'Rarity',
  },
];

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

const GET_CARDS = gql`
  query GetCards {
    cards {
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
`;

const Cards = () => {
  const [searchTypeText, setSearchTypeText] = React.useState<string>('name');
  const [inputValue, setInputValue] = React.useState<string>('');

  const { loading, error, data } = useQuery<CardsInterface>(GET_CARDS);

  if (loading) return <Loading loading={loading} />;
  if (error) return <Error errorMessage={error.message} />;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTypeText(event.target.value);
  };

  const filterCards = (cards: Array<any>) =>
    cards.filter(
      (card: any) =>
        card?.props?.children?.props[searchTypeText]
          ?.toString()
          .toLowerCase()
          .indexOf(inputValue.toString().toLowerCase()) !== -1
    );

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={styles.searcherWrapper}>
          <TextField
            select
            value={searchTypeText}
            onChange={handleSearchTypeChange}
            label="Search type"
            variant="outlined"
            className={styles.selectInput}
          >
            {searchTypes.map((searchType: SearchType) => (
              <MenuItem key={searchType.value} value={searchType.value}>
                {searchType.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label={`Search card by ${searchTypeText}`}
            variant="outlined"
            value={inputValue}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </Grid>

      <Grid item xs={12}>
        <Grid
          container
          spacing={2}
          direction="row"
          justify="center"
          alignItems="center"
          className={styles.cardsGrid}
        >
          {filterCards(
            data?.cards?.map(
              ({
                id,
                name,
                text,
                image,
                imageGold,
                className,
                attack,
                health,
                manaCost,
                rarity,
              }) => (
                <Grid item lg={3} md={4} sm={6} xs={12} key={name}>
                  <Card
                    id={id}
                    name={name}
                    text={text}
                    image={image}
                    imageGold={imageGold}
                    className={className}
                    attack={attack}
                    health={health}
                    manaCost={manaCost}
                    rarity={rarity}
                  />
                </Grid>
              )
            )
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cards;
