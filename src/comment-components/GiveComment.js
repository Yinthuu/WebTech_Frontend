import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import GiveCommentCard from './GiveCommentCard';

function GiveComment({product}) {
  return (
    <Container>
      <h3>Give Review</h3>
      <br></br>============= {product}
    <GiveCommentCard product={product} />
    </Container>
  );
}
export default GiveComment;
