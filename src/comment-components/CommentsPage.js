import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
import { CommentCard } from './CommentCard';

import list from "../mock-data/data";
import {
  useParams
} from "react-router-dom";
import GiveComment from './GiveComment';
import { useState, useEffect } from 'react';

function CommentsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [showGiveCommentSection, setShowGiveCommentSection] = useState(() => false);
  const userId = sessionStorage.getItem('userId');
  const [commentedUsersList, setCommentedUsersList] = useState([]);

  useEffect(() => {
    // Fetch product data
    fetch(`http://localhost:8081/products/${id}`)
      .then((response) => response.json())
      .then((data) => { 
        setProduct(data) 
        //
          // Check if user is a buyer for current product
          if (isUserBuy( )) {
            setShowGiveCommentSection(true);
          } else {
            setShowGiveCommentSection(false);
          }

      })
      .catch((error) => console.error(error));
    // Fetch comments data by product 
    fetch(`http://localhost:8081/comments/product/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        if (response.status === 404) {
          console.log("there is no commnt for this product");
          return response.json();
        } 
        else {
          throw new Error('Failed to fetch comments');
        }
      })
      .then((data) => {
        if (data.length > 0) {
          setComments(data);
          // setShowGiveCommentSection(true);
          const users = data.map((comment) => comment.user._id);
          setCommentedUsersList(users);

          // // Check if user is a buyer for current product
          // if (isUserBuy( )) {
          //   setShowGiveCommentSection(true);
          // } else {
          //   setShowGiveCommentSection(false);
          // }
        }else{
          console.log("no one give a review for this product!")
        }
      })
      .catch((error) => console.error(error));
  }, [id]);

  function isUserBuy( ) {
    console.log("userId: "+userId);
    console.log("id: "+id);

      // check if userId is present in commentedUsersList
    const isCommented = commentedUsersList.includes(userId);

    //If userId and productId found in order + There is no comment given yet --> show give comment
    fetch(`http://localhost:8081/orders/userproduct/${userId}/${id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('order found');
          //if (!isCommented) {
          //   console.log('user has already commented');
          //   setShowGiveCommentSection(false);
          //   return false;
          // }else{
          //   console.log('user has not give a comment after bought');
          //   setShowGiveCommentSection(true);
          //   return true;
          // }
          setShowGiveCommentSection(true);
          return true;
        } else if (response.status === 404) {
          console.log('order not found');
          setShowGiveCommentSection(false);
          return false;
        } else {
          throw new Error('Failed to fetch comments');
        }
      })
      .catch((error) => console.error(error));
  }

  return (
    <Container>
      <h1>{product.description}</h1>
      <Row>
        <Col>
            <div className="details_image_box">
                <img src={product.image} alt={product.description} />
            </div>
        </Col>
        <Col>
          {showGiveCommentSection && <GiveComment product={product._id} />}
        </Col>
      </Row>
      <hr />
      <h3>Customer Reviews</h3>
      {comments.length === 0 ? (
         <p>There are no reviews.</p>
      ) : (
        comments.map((comment) => (
          <Row>
            <CommentCard data={comment} />
          </Row>
        ))
      )}
    </Container>
  );
}

export default CommentsPage;
