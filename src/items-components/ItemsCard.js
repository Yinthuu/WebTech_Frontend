import React from "react";
import { Link } from "react-router-dom";

const ItemCards = ({ item, handleClick }) => {
  const { _id, title, description, pricing, image } = item;

  const handleAddToCart = async () => {
    let user = sessionStorage.getItem('userId');

    const response = await fetch(`http://localhost:8081/products/${_id}`);
    const data = await response.json();
    const products = [data._id];
    const quantities = 1;

    if (!user) {
      //for anynomyous user
      console.log("guest users");
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ products, quantities })
        };
  
        fetch('http://localhost:8081/guestcarts', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          console.log('Guest Cart item added successfully!');
        });

    }else{

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products, quantities, user })
      };
  
      fetch('http://localhost:8081/carts', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        console.log('Cart item added successfully!');
    });
    }
}

  return (
    <div>
    <div className="cards">
    <Link to={`/comment/view/${_id}`}>
      <div className="image_box">
        <img src={image} alt={title} />
      </div>
    </Link>
    </div>
      <div className="details">
        <p>{title}</p>
        <p>{description}</p>
        <p>Price - {pricing}$</p>
        <button onClick={() => { handleClick(item); handleAddToCart(); }}>Add to Cart</button>
        <br />
        <Link className="plainLink" to={`/comment/view/${_id}`}>
          <a className="plainLink" >Details</a>
        </Link>
      </div>
      </div>
  );
};

export default ItemCards;