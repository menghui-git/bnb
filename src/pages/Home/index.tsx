import { useEffect, useRef, useState } from 'react';

import { searchRooms } from '../../data';
import { Card } from './components/Card';
import './index.scss';

export const HomePage = () => {
  const pageCount = 12; // TODO: get the count depending on the screen size
  const [pageIndex, setPageIndex] = useState(0); // TODO: fix pageIndex=0 for the first 2 fetch
  const [totalPages, setTotalPages] = useState(0);
  const [rooms, setRooms] = useState([] as API.Room[]);
  const [isImageLoading, setImageLoading] = useState(true);
  const [loadNum, setLoadNum] = useState(0);
  const lastCardRef = useRef(null);
  const currency = 'TWD';

  const loadNewPage = () => {
    setPageIndex((prev) => (prev === totalPages - 1 ? prev : prev + 1));
    setLoadNum(0);
  };

  useEffect(() => {
    const getRooms = async () => {
      const roomData = await searchRooms(pageCount, pageIndex);
      const newRooms = roomData.rooms;

      setTotalPages(roomData.totalPages);
      setImageLoading(true);
      setRooms((prevRooms) => [...prevRooms, ...newRooms]);
    };
    getRooms();
  }, [pageIndex]);

  useEffect(() => {
    const lastCard = lastCardRef.current;

    if (!lastCard) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadNewPage();
      }
    });

    if (lastCard) {
      observer.observe(lastCard);
    }

    return () => {
      if (lastCard) {
        observer.unobserve(lastCard);
      }
    };
  }, [lastCardRef?.current]); // TODO: find a better trigger

  const onPictureLoad = () => {
    const newLoadNumber = loadNum + 1;
    setLoadNum(newLoadNumber);
    if (newLoadNumber === pageCount) {
      setImageLoading(false);
    }
  };

  return (
    <>
      <div className="grid-container result">
        {rooms.map((room, index) => (
          <Card
            key={room.id + index}
            ref={index === rooms.length - 1 ? lastCardRef : null}
            room={room}
            currency={currency}
            onPictureLoad={onPictureLoad}
            isLoading={
              isImageLoading && Math.trunc(index / pageCount) === pageIndex
            }
          />
        ))}
      </div>
    </>
  );
};
