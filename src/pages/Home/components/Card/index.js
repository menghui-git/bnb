import React, { forwardRef, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "./index.css";
import { Skeleton } from "../Skeleton";

const ImageSlides = forwardRef(function ImageSlides(props, ref) {
  const { position, room, onPictureLoad } = props;
  const positionStyle = { transform: `translateX(${position}px)` };
  const getOnLoadHandler = (index) => (index === 0 ? onPictureLoad : () => {});

  return (
    <div className="image-container" ref={ref}>
      <div data-slider style={positionStyle}>
        {room.images.map((image, index) => (
          <img
            className="slide"
            src={image.url}
            onLoad={getOnLoadHandler(index)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
});

const Indicator = ({ roomImages, imgIndex }) => {
  const getClass = (index) =>
    `slide-dot ${index !== imgIndex ? "not-current" : ""}`;
  return (
    <div className="indicator-row">
      {roomImages.map((image, index) => (
        <div className={getClass(index)} key={index} />
      ))}
    </div>
  );
};

const RoomOverview = ({ room, currency }) => {
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

const LeftButton = ({ disabled, onClick }) => {
  const classes = "slider-btn slider-btn-left " + (disabled ? "hidden" : "");

  return (
    <div className={classes} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
};

const RightButton = ({ disabled, onClick }) => {
  const classes = "slider-btn slider-btn-right " + (disabled ? "hidden" : "");

  return (
    <div className={classes} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};

export const Card = ({ room, currency, onPictureLoad, isLoading }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const imageListRef = useRef(null);

  const cardStyle = "card " + (isLoading ? "not-display" : "");
  const roomLink = `/room/${room.id}`;
  const imgCount = room.images.length;

  const slideImage = (newIndex, e) => {
    e.stopPropagation();
    setImgIndex(newIndex);

    if (!imageListRef.current) return;
    const childWidth = imageListRef.current.offsetWidth;
    const newPosition = childWidth * newIndex * -1;
    setPosition(newPosition);
  };

  const isFirstImage = (imgIndex) => {
    return imgIndex === 0;
  };

  const isLastImage = (imgIndex, imgCount) => {
    return imgIndex === imgCount - 1;
  };

  const onLeftButtonClick = (e) => {
    if (!isFirstImage(imgIndex)) {
      slideImage(imgIndex - 1, e);
    }
  };

  const onRightButtonClick = (e) => {
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
              room={room}
              onPictureLoad={onPictureLoad}
            />
            <Indicator roomImages={room.images} imgIndex={imgIndex} />
          </div>
          <RoomOverview room={room} currency={currency} />
        </Link>
        <div className="card-label">Guest favorite</div>
        <FontAwesomeIcon icon={faHeart} className="like" />
        <div className="card-overlay-row">
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
