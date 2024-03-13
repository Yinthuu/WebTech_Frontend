import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import GiveCommentCard from './GiveCommentCard';

function GiveComment({product}) {
  return (
    <Container>
      <br></br>
      <h3>Give Review</h3>
    <GiveCommentCard product={product} />
    </Container>
  );
}
export default GiveComment;
