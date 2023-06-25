import React from 'react';

const Rating = ({ rating, caption }) => {
  return (
    <div className="rating">
      <span>
        <i
          className={
            rating.rate >= 1
              ? 'fas fa-star'
              : rating.rate >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating.rate >= 2
              ? 'fas fa-star'
              : rating.rate >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating.rate >= 3
              ? 'fas fa-star'
              : rating.rate >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating.rate >= 4
              ? 'fas fa-star'
              : rating.rate >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      <span>
        <i
          className={
            rating.rate >= 5
              ? 'fas fa-star'
              : rating.rate >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
        ></i>
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{' ' + rating.count + ' reviews'}</span>
      )}
    </div>
  );
};

export default Rating;
