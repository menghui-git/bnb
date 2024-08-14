import { forwardRef, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LeftButton, RightButton } from 'common/components/buttons';
import { Skeleton } from '../Skeleton';
import styles from './index.module.scss';

type ImageSlideProps = {
  position: number;
  images: API.Image[];
  onPictureLoad: () => void;
};

const ImageSlides = forwardRef<HTMLDivElement, ImageSlideProps>(
  (props, ref) => {
    const { position, images, onPictureLoad } = props;
    const positionStyle = { transform: `translateX(${position}px)` };
    const getOnLoadHandler = (index: number) =>
      index === 0 ? onPictureLoad : () => {};

    return (
      <div className={styles['image-container']} ref={ref}>
        <div data-slider style={positionStyle}>
          {images.map((image, index) => (
            <img
              key={image.url}
              className={styles.slide}
              src={image.url}
              alt=""
              onLoad={getOnLoadHandler(index)}
            />
          ))}
        </div>
      </div>
    );
  },
);

const Indicator = ({
  images,
  imgIndex,
}: {
  images: API.Image[];
  imgIndex: number;
}) => {
  const getClass = (index: number) =>
    `${styles['slide-dot']} ${index !== imgIndex ? styles['not-current'] : ''}`;

  return (
    <div className={styles['indicator-row']}>
      {images.map((image, index) => (
        <div key={image.url} className={getClass(index)} />
      ))}
    </div>
  );
};

const RoomOverview = ({
  room,
  currency,
}: {
  room: API.Room;
  currency: string;
}) => {
  return (
    <>
      <div className={styles['room-overview']}>
        <div>{room.smart_location}</div>
        <div className={styles.rating}>
          <FontAwesomeIcon icon={faStar} />
          <div>{room.review_scores_rating / 20}</div>
        </div>
      </div>
      <div>
        ${room.price} {currency} night
      </div>
    </>
  );
};

type Props = {
  room: API.Room;
  currency: string;
  onPictureLoad: () => void;
  isLoading: boolean;
};

export const Card = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { room, currency, onPictureLoad, isLoading } = props;

  const [imgIndex, setImgIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const imageListRef = useRef<HTMLDivElement>(null);

  const cardStyle =
    styles.card + ' ' + (isLoading ? styles['not-display'] : '');
  const roomLink = `/room/${room.id}`;
  const imgCount = room.images.length;

  const slideImage = (newIndex: number, e: ReactEventClick) => {
    e.stopPropagation();
    setImgIndex(newIndex);

    if (!imageListRef.current) return;
    const childWidth = imageListRef.current.offsetWidth;
    const newPosition = childWidth * newIndex * -1;
    setPosition(newPosition);
  };

  const isFirstImage = (imgIndex: number) => {
    return imgIndex === 0;
  };

  const isLastImage = (imgIndex: number, imgCount: number) => {
    return imgIndex === imgCount - 1;
  };

  const onLeftButtonClick = (e: ReactEventClick) => {
    e.preventDefault();
    if (!isFirstImage(imgIndex)) {
      slideImage(imgIndex - 1, e);
    }
  };

  const onRightButtonClick = (e: ReactEventClick) => {
    e.preventDefault();
    if (!isLastImage(imgIndex, imgCount)) {
      slideImage(imgIndex + 1, e);
    }
  };

  // TODO: make each card manages its own isLoading state by itself
  return (
    <div className={styles['card-container']} ref={ref}>
      <Skeleton isLoading={isLoading} />
      <div className={cardStyle}>
        <Link to={roomLink} key={room.id}>
          <div className={styles['slide-container']}>
            <ImageSlides
              ref={imageListRef}
              position={position}
              images={room.images}
              onPictureLoad={onPictureLoad}
            />
            <Indicator images={room.images} imgIndex={imgIndex} />
            <div className={styles['card-overlay']}>
              <LeftButton
                className={isFirstImage(imgIndex) ? 'hidden' : ''}
                onClick={onLeftButtonClick}
              />
              <RightButton
                className={isLastImage(imgIndex, imgCount) ? 'hidden' : ''}
                onClick={onRightButtonClick}
              />
            </div>
          </div>
          <RoomOverview room={room} currency={currency} />
        </Link>
        <div className={styles['card-label']}>Guest favorite</div>
        <FontAwesomeIcon icon={faHeart} className={styles.like} />
      </div>
    </div>
  );
});
