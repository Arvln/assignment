"use client";

import React, { useState } from 'react';

export const Carousel = ({
  width,
  images
}: {
  width: string,
  images: string[]
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative mx-auto" style={{ width: Number(width) }}>
      <div className="overflow-hidden rounded-lg shadow-lg">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-auto"
        />
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-300 focus:outline-none"
        onClick={prevImage}
      />
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-300 focus:outline-none"
        onClick={nextImage}
      />
      <div className="flex justify-center mt-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 mx-1 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
