import { useRef } from 'react';
import {
  faCircleCheck,
  faKey,
  faMap,
  faMessage,
  faSprayCanSparkles,
  faStar,
  faTag,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './index.module.scss';

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
    <div className={styles['rating-item']}>
      <span>{score}</span>
      <span className={styles['rating-bar']}>
        <div className={styles['bar-body']} ref={ratingBar} />
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
    <div className={styles['score-item']}>
      <div>
        <div>{name}</div>
        <div className={styles['score-number']}>{value}</div>
      </div>
      <div className={styles['score-icon']}>
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
};

export const getReview = (room: API.RoomDetail) => {
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
    <>
      <h2 className={styles['review-overall']}>
        <FontAwesomeIcon icon={faStar} />
        {point} {reviews} reviews
      </h2>
      <div className={styles['review-container']}>
        <div className={styles['score-item']}>
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
    </>
  );
};
