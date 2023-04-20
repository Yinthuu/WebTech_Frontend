import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import { CommentCard } from './CommentCard';

import list from "../mock-data/data";
import {
  useParams
} from "react-router-dom";
import GiveComment from './GiveComment';
import NavbarMenu from '../navbar-components/NavbarMenu';
import { useState, useEffect } from 'react';

function CommentsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    // Fetch product data
    fetch(`http://localhost:8081/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error(error));
    // Fetch comments data by product 
    fetch(`http://localhost:8081/comments/product/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to fetch comments');
        }
      })
      .then((data) => {
        if (data.length > 0) {
          setComments(data);
          setShowCommentSection(true);
          //const users = data.map((comment) => comment.user._id);

          // Check if user is a buyer for current product
          if (isUserBuy( )) {
            setShowCommentSection(true);
          } else {
            setShowCommentSection(false);
          }
        }
      })
      .catch((error) => console.error(error));
  }, [id]);

  function isUserBuy( ) {
    //If userId and product Id found in order --> show give comment
    fetch(`http://localhost:8081/orders/userproduct/${userId}/${id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('order found');
          setShowCommentSection(true);
          return true;
        } else if (response.status === 404) {
          console.log('order not found');
          setShowCommentSection(false);
          return false;
        } else {
          throw new Error('Failed to fetch comments');
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <Container>
      <h1>{product.title}</h1>
      <Row>
        <Col>
          <div className="image_box">
            <img src={product.image} alt={product.title} />
          </div>
        </Col>
        <Col>
          {showCommentSection && <GiveComment product={product._id} />}
        </Col>
      </Row>
      <hr />
      <h3>Customer Reviews</h3>
      {comments.map((comment) => (
        <Row>
          <CommentCard data={comment} />
        </Row>
      ))}
    </Container>
  );
}

export default CommentsPage;
