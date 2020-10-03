import * as React from 'react';
import { FC } from 'react';
import {
  Card as MaterialCard,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import ReactHtmlParser from 'react-html-parser';
import { gql, useMutation } from '@apollo/client';
import * as CardInterface from '../../interfaces/Card';
import * as styles from './Card.module.scss';
import { UserReducers } from '../../interfaces/Reducers';
import {
  openNotification,
  setNotificationMessage,
  setNotificationSeverity,
} from '../../store/notification/notificationActions';
import * as status from '../notification/Notification';

interface CardFavouriteMutationInput {
  userId: string;
  cardId: number;
}

interface AddCardToFavouriteInterface {
  addCardToFavourite: {
    success: boolean;
    message: string;
  };
}

interface DeleteCardFromFavouriteInterface {
  deleteCardFromFavourite: {
    success: boolean;
    message: string;
  };
}

interface CardProps extends CardInterface.Card {
  isFavouriteCardView?: boolean;
  refetchFavouriteCards?: () => void;
}

const ADD_CARD_TO_FAVOURITE = gql`
  mutation AddCardToFavourite($userId: ID, $cardId: ID) {
    addCardToFavourite(userId: $userId, cardId: $cardId) {
      success
      message
    }
  }
`;

const DELETE_CARD_FROM_FAVOURITE = gql`
  mutation DeleteCardFromFavourite($userId: ID, $cardId: ID) {
    deleteCardFromFavourite(userId: $userId, cardId: $cardId) {
      success
      message
    }
  }
`;

const ERROR_MESSAGE = 'Something went wrong.';

const Card: FC<CardProps> = ({
  isFavouriteCardView,
  refetchFavouriteCards,
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
}) => {
  const [showGoldImage, setShowGoldImage] = React.useState(false);

  const dispatch = useDispatch();

  const [addCardToFavourite] = useMutation<
    AddCardToFavouriteInterface,
    CardFavouriteMutationInput
  >(ADD_CARD_TO_FAVOURITE);

  const [deleteCardFromFavourite] = useMutation<
    DeleteCardFromFavouriteInterface,
    CardFavouriteMutationInput
  >(DELETE_CARD_FROM_FAVOURITE);

  const userId = useSelector<UserReducers, string>(
    (state) => state.userReducers.id
  );

  const formatClassName = (classname: CardInterface.ClassName) =>
    classname.toString().replace('_', ' ');

  const formatRarity = (rarityToFormat: CardInterface.Rarity) => {
    switch (rarityToFormat.toString()) {
      case 'COMMON':
        return <span style={{ color: '#909B99' }}>{rarityToFormat}</span>;
      case 'RARE':
        return <span style={{ color: '#467AB7' }}>{rarityToFormat}</span>;
      case 'EPIC':
        return <span style={{ color: '#943FAD' }}>{rarityToFormat}</span>;
      case 'LEGENDARY':
        return <span style={{ color: '#F1A832' }}>{rarityToFormat}</span>;
      case 'HERO':
        return <span style={{ color: '#A88854' }}>{rarityToFormat}</span>;
      default:
        return rarityToFormat;
    }
  };

  const showNotification = (message: string, severity: string) => {
    dispatch(setNotificationMessage(message));
    dispatch(setNotificationSeverity(severity));
    dispatch(openNotification());
  };

  const showSuccessNotification = (message: string) => {
    showNotification(message, status.SUCCESS_NOTIFICATION);
  };

  const showErrorNotification = (message: string) => {
    showNotification(message, status.ERROR_NOTIFICATION);
  };

  const handleAddToFavourite = async () => {
    try {
      const { data } = await addCardToFavourite({
        variables: { userId, cardId: id },
      });

      if (data?.addCardToFavourite?.success) {
        showSuccessNotification(data?.addCardToFavourite?.message);
      } else {
        showErrorNotification(data?.addCardToFavourite?.message);
      }
    } catch (error) {
      showErrorNotification(ERROR_MESSAGE);
      console.error(error);
    }
  };

  const handleDeleteFromFavourite = async () => {
    try {
      const { data } = await deleteCardFromFavourite({
        variables: { userId, cardId: id },
      });

      if (data?.deleteCardFromFavourite?.success) {
        showSuccessNotification(data?.deleteCardFromFavourite?.message);
        refetchFavouriteCards();
      } else {
        showErrorNotification(data?.deleteCardFromFavourite?.message);
      }
    } catch (error) {
      showErrorNotification(ERROR_MESSAGE);
      console.error(error);
    }
  };

  const handleImageChange = () => {
    if (imageGold) {
      setShowGoldImage(!showGoldImage);
    }
  };

  return (
    <MaterialCard className={styles.root}>
      <CardActionArea onClick={handleImageChange}>
        <CardMedia
          className={styles.media}
          image={showGoldImage ? imageGold : image}
          title={name}
        />
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
        {attack && health ? (
          <>
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
            {' '}
          </>
        ) : (
          <Typography variant="button" color="textPrimary" component="p">
            {rarity.toString() === 'HERO' ? 'Hero' : 'Spell'}
          </Typography>
        )}
        <Typography variant="body2" color="textPrimary" component="p">
          Mana: 
          {' '}
          <b>{manaCost}</b>
        </Typography>
        <Typography variant="body2" color="textPrimary" component="p">
          Rarity: 
          {' '}
          <b>{formatRarity(rarity)}</b>
        </Typography>
      </CardActions>
      <CardActions>
        <Button
          fullWidth
          size="small"
          variant="contained"
          color="secondary"
          startIcon={isFavouriteCardView ? <DeleteIcon /> : <FavoriteIcon />}
          onClick={
            isFavouriteCardView
              ? handleDeleteFromFavourite
              : handleAddToFavourite
          }
        >
          {isFavouriteCardView ? 'Delete from favourite' : 'Add to favourite'}
        </Button>
      </CardActions>
    </MaterialCard>
  );
};

export default Card;
