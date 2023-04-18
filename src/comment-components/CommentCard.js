import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';

export function CommentCard({ data }) {
  const imageUrl = `http://localhost:8081/image/${data.images}`;
  return (
    <div>
      <p>
        <strong>Name: </strong>
        {data.username}
      </p>
      <p>
        <strong>Rating: </strong>
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
        <strong>Image:  {imageUrl}</strong> <br></br>
        <img src={imageUrl} alt="comment-image" />
      </p>
      <br></br>
    </div>
  );
}
