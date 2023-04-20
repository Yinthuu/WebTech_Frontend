import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import profileIcon from '../icons/profileicon.png';

export function CommentCard({ data }) {
  const imageUrl = `http://localhost:8081/image/${data.images}`;
  return (
    <div>
      <p>
        <div className="comment_profile_image_box">
          <img src={profileIcon} alt='data.username'/>
          {data.username}
        </div>
      </p>
      <p>
        <StarRatingComponent
        name="rating"
        starCount={5}
        value={data.rating}
        editing={false}
        className={"Rating"}
      />
     </p>
      <p>{data.text}</p>
      <p>
        <div className="comment_image_box">
          <img src={imageUrl} alt="comment-image" />
        </div>
      </p>
      <br></br>
    </div>
  );
}
