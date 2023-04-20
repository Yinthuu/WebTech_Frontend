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

function CommentsPage( ) {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [showCommentSection, setShowCommentSection] = useState(false);

  useEffect(() => {
    // Fetch product data
    fetch(`http://localhost:8081/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error(error));
    
    // Fetch comments data
    // fetch(`http://localhost:8081/comments/product/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => setComments(data))
    //   .catch((error) => console.error(error));
  // Fetch comments data
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
        setShowCommentSection(true);
        setComments(data);
      }
    })
    .catch((error) => console.error(error));
    
  }, [id]);

  useEffect(() => {
    // Extract list of users from comments
    const users = comments.map(comment => comment.user._id);
    // Set the users state variable
    setUsers(users);
    // Check if user is a buyer
    if (isUserBuy(users)) {
      setShowCommentSection(true);
    }
  }, [comments]);
  

  function isUserBuy(list) {
    return list.some((element) => element  === '643458986cb3c592fea2b271');
  }

  return (
    <Container>
      {/* Product info */}
      <h1>{product.title}</h1>
      <Row>
        <Col> 
          <div className="image_box">
            <img src={product.image} alt={product.title} />
          </div> 
        </Col>

        {/* All comments for a product/item */}
        <Col>
          {showCommentSection && <GiveComment  product={product._id} />}
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