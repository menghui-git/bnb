import { forwardRef, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { LeftButton, RightButton } from 'common/components/buttons';
import { Skeleton } from '../Skeleton';
import './index.scss';

type Props = {
  position: number;
  images: API.Image[];
  onPictureLoad: () => void;
};

const ImageSlides = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { position, images, onPictureLoad } = props;
  const positionStyle = { transform: `translateX(${position}px)` };
  const getOnLoadHandler = (index: number) =>
    index === 0 ? onPictureLoad : () => {};

  return (
    <div className="image-container" ref={ref}>
      <div data-slider style={positionStyle}>
        {images.map((image, index) => (
          <img
            key={image.url}
            className="slide"
            src={image.url}
            alt=""
            onLoad={getOnLoadHandler(index)}
          />
        ))}
      </div>
    </div>
  );
});

const Indicator = ({
  images,
  imgIndex,
}: {
  images: API.Image[];
  imgIndex: number;
}) => {
  const getClass = (index: number) =>
    `slide-dot ${index !== imgIndex ? 'not-current' : ''}`;

  return (
    <div className="indicator-row">
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
      <div className="room-overview">
        <div>{room.smart_location}</div>
        <div className="rating">
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

export const Card = ({
  room,
  currency,
  onPictureLoad,
  isLoading,
}: {
  room: API.Room;
  currency: string;
  onPictureLoad: () => void;
  isLoading: boolean;
}) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const imageListRef = useRef<HTMLDivElement>(null);

  const cardStyle = 'card ' + (isLoading ? 'not-display' : '');
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
    if (!isFirstImage(imgIndex)) {
      slideImage(imgIndex - 1, e);
    }
  };

  const onRightButtonClick = (e: ReactEventClick) => {
    if (!isLastImage(imgIndex, imgCount)) {
      slideImage(imgIndex + 1, e);
    }
  };

  return (
    <div className="card-container">
      <Skeleton isLoading={isLoading} />
      <div className={cardStyle}>
        <Link to={roomLink} key={room.id}>
          <div className="slide-container">
            <ImageSlides
              ref={imageListRef}
              position={position}
              images={room.images}
              onPictureLoad={onPictureLoad}
            />
            <Indicator images={room.images} imgIndex={imgIndex} />
          </div>
          <RoomOverview room={room} currency={currency} />
        </Link>
        <div className="card-label">Guest favorite</div>
        <FontAwesomeIcon icon={faHeart} className="like" />
        <div className="card-overlay">
          <LeftButton
            disabled={isFirstImage(imgIndex)}
            onClick={onLeftButtonClick}
          />
          <RightButton
            disabled={isLastImage(imgIndex, imgCount)}
            onClick={onRightButtonClick}
          />
        </div>
      </div>
    </div>
  );
};
