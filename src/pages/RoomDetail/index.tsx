import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  faArrowUpFromBracket,
  faBed,
  faCircleCheck,
  faDumbbell,
  faElevator,
  faFan,
  faFire,
  faHeart,
  faKey,
  faKitchenSet,
  faKitMedical,
  faMap,
  faMessage,
  faSprayCanSparkles,
  faStar,
  faTag,
  faTv,
  faWifi,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Header } from '../../common/components/header/Header';
import { getRoom } from '../../data';
import './index.scss';

const getPhotoGrids = (room: API.RoomDetail) => {
  return (
    <div className="photo-grid-container">
      <img className="photo-1" src={room.xl_picture_url} />
      <img className="photo-2" src={room.xl_picture_url} />
      <img className="photo-3" src={room.xl_picture_url} />
      <img className="photo-4" src={room.xl_picture_url} />
      <img className="photo-5" src={room.xl_picture_url} />
    </div>
  );
};

const getAmenities = (amenities: string[] = []) => {
  const amenityIconMap: { [key: string]: IconDefinition } = {
    'Air conditioning': faFan,
    'Buzzer/wireless intercom': faWifi,
    'Elevator in building': faElevator,
    'First aid kit': faKitMedical,
    Gym: faDumbbell,
    Heating: faFire,
    Internet: faWifi,
    Kitchen: faKitchenSet,
    TV: faTv,
    'Wireless Internet': faWifi,
  };
  const DisplayCount = 8;
  // show the first 8 amenities
  const amenityItems = amenities.slice(0, DisplayCount).map((amenity) => (
    <div className="amenity" key={amenity}>
      <div>
        <FontAwesomeIcon className="fa-icon" icon={amenityIconMap[amenity]} />
      </div>
      <div className="amenity-name">{amenity}</div>
    </div>
  ));

  return (
    <>
      <div className="amenity-container">{amenityItems}</div>
      <div className="amenity-info-box">
        Show all {amenities.length} amenities
      </div>
    </>
  );
};

const ScoreBar = ({
  score,
  percentage,
}: {
  score: string;
  percentage: string;
}) => {
  const ratingBar = useRef<HTMLDivElement>(null);
  // const ratingBar = useRef<ElementRef<"div">>(null);

  if (ratingBar.current) {
    ratingBar.current.style.setProperty('--bar-width', percentage);
  }

  return (
    <div className="rating-item">
      <span>{score}</span>
      <span className="rating-bar">
        <div className="bar-body" ref={ratingBar} />
      </span>
    </div>
  );
};

const ReviewType = ({
  name,
  value,
  icon,
}: {
  name: string;
  value: number;
  icon: IconDefinition;
}) => {
  return (
    <div className="score-item">
      <div>
        <div>{name}</div>
        <div>{value}</div>
      </div>
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};

const getReview = (room: API.RoomDetail) => {
  const point = room.review_scores_rating / 20;
  const reviews = room.number_of_reviews;
  const reviewData = [
    {
      name: 'Cleanliness',
      value: room.review_scores_cleanliness / 2,
      icon: faSprayCanSparkles,
    },
    {
      name: 'Accuracy',
      value: room.review_scores_accuracy / 2,
      icon: faCircleCheck,
    },
    { name: 'Check-in', value: room.review_scores_checkin / 2, icon: faKey },
    {
      name: 'Communication',
      value: room.review_scores_communication / 2,
      icon: faMessage,
    },
    { name: 'Location', value: room.review_scores_location / 2, icon: faMap },
    { name: 'Value', value: room.review_scores_value / 2, icon: faTag },
  ];
  return (
    <div className="info-box">
      <h2 className="review-overall">
        <FontAwesomeIcon icon={faStar} />
        {point} {reviews} reviews
      </h2>
      <div className="review-container">
        <div className="score-item">
          <div>Overall rating</div>
          {room.ratings?.map((rating: API.Rating) => (
            <ScoreBar
              score={rating.label}
              percentage={rating.localized}
              key={rating.label}
            />
          ))}
        </div>
        {reviewData.map((review) => (
          <ReviewType
            name={review.name}
            value={review.value}
            icon={review.icon}
            key={review.name}
          />
        ))}
      </div>
    </div>
  );
};

export const RoomDetail = () => {
  const roomId = useParams().roomId!;
  const [room, setRoom] = useState<API.RoomDetail>({} as API.RoomDetail);

  useEffect(() => {
    const queryRoom = async () => {
      const roomData = await getRoom(roomId);
      setRoom(roomData);
    };
    queryRoom();
  }, []);

  const PhotoGrids = getPhotoGrids(room);
  const Amenities = getAmenities(room.amenities);
  const Review = getReview(room);

  const hostSince = new Date(room.host_since);
  const now = new Date();

  return (
    <>
      {Header}
      <div className="room-body">
        <div className="room-header">
          <h1>{room.name}</h1>
          <div className="room-action">
            <div>
              <FontAwesomeIcon icon={faArrowUpFromBracket} />
              Share
            </div>
            <div>
              <FontAwesomeIcon icon={faHeart} />
              Save
            </div>
          </div>
        </div>
        {PhotoGrids}
        <div className="general-info">
          <section>
            <h2>
              {room.room_type} in {room.host_location}
            </h2>
            <div>
              {room.accommodates} guests {room.bedrooms} bedrooms {room.beds}
            </div>
          </section>
        </div>
        <div className="room-info">
          <div className="info-box host-box ">
            <img className="host-pic" src={room.host_picture_url} />
            <div>
              <div>Hosted by {room.host_name}</div>
              <div className="host-info">
                {now.getFullYear() - hostSince.getFullYear()} years hosting
              </div>
            </div>
          </div>
          <div className="info-box">
            <div>
              <div>{room.summary}</div>
              <br />
              <h3>The space</h3>
              <div>{room.space}</div>
            </div>
          </div>
          <div className="info-box">
            <h2>Where you&apos;ll sleep</h2>
            <div className="room-info-box">
              <FontAwesomeIcon icon={faBed} />
              <div>Bedroom</div>
              <div>
                {room.beds} {room.bed_type}
              </div>
            </div>
          </div>

          <div className="info-box">
            <h2>What this place offers</h2>
            {Amenities}
          </div>
        </div>
        {Review}

        <div className="info-box">
          <h2>Neighborhood highlights</h2>
          <div>{room.neighborhood_overview}</div>
          <div>Show more </div>
        </div>
      </div>
    </>
  );
};
