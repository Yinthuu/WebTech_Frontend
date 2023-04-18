import React, { useState, useEffect } from "react";
import "../styles/itemcart.css";

const ItemCart = ({ handleChange }) => {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const userId = sessionStorage.getItem('userId'); // get user id from sessionStorage

  const handleRemove = (id) => {
    fetch(`http://localhost:8081/carts/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        // find the cart item with the given id
        const item = data.find((item) => item._id === id);
  
        // make DELETE request to remove the cart item with the given id
        fetch(`http://localhost:8081/carts/${id}`, {
          method: "DELETE",
        })
          .then(() => {
            const arr = cart.filter((item) => item._id !== id);
            setCart(arr);
            handlePrice();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += item.quantities * item.products.pricing));
    setPrice(ans);
  };

  useEffect(() => {
    if(!userId){
    // make GET request to API and update cart state
    fetch(`http://localhost:8081/guestcarts`) 
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        console.log("anynymous: "+data[0].products.title);
      })
      .catch((err) => console.log(err));
    }else{
    // make GET request to API and update cart state
    fetch(`http://localhost:8081/carts/user/${userId}`) // use userId in API URL
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
      })
      .catch((err) => console.log(err));
    }

  }, [userId]); // add userId as a dependency of the useEffect hook

  useEffect(() => {
    handlePrice();
  }, [cart]); // add cart as a dependency of the useEffect hook

  return (
    <article>
      {cart.map((item) => (
        <div className="cart_box" key={item._id}>
          <div className="cart_img">
            <img src={item.products.image} alt="" />
            <p>{item.products.title}</p>
          </div>
          <div>
            <button onClick={() => handleChange(item, 1)}>+</button>
            <button>{item.quantities}</button>
            <button onClick={() => handleChange(item, -1)}>-</button>
          </div>
          <div>
            <span>{item.products.pricing}</span>
            <button onClick={() => handleRemove(item._id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total Price of your Cart</span>
        <span>$ {price}</span>
      </div>
    </article>
  );
};

export default ItemCart;