import React, { useState, useEffect } from "react";
import ItemsPage from "./ItemsPage";
import ShoppingCartBar from "./shoppingcartbar";
import ItemCart from "./itemcart";

const Items = () => {
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartSize, setCartSize] = useState(0);
  const userId = sessionStorage.getItem('userId');

  const handleClick = (item) => {
    if (cart.indexOf(item) !== -1) return;//If item is alredy present it wont enter
    setCart([...cart, item]);//or else item will be added to the cart
  };

  // const handleChange = (item, d) => {
  //   const ind = cart.indexOf(item);
  //   const arr = cart;
  //   arr[ind].amount += d;//Adding item to the cart with +1 or -1

  //   if (arr[ind].amount === 0) arr[ind].amount = 1;
  //   setCart([...arr]);
  // };

  const handleChange = async (item, d) => {
    //const ind = cart.indexOf(item);
    const ind = item;
    const arr = cart;
    console.log(item)

    console.log(ind)
    console.log(arr)
    console.log(d)

    ind.quantities += d; // update item quantity in cart
  
    if (ind.quantities === 0) ind.quantities = 1;
    setCart([...arr]);
  
    // make PATCH request to update item quantity in database
    //const cartId = cart[0].cart;
    const cartId = ind._id;
    console.log("cartId.."+{cartId});
    try {
      const response = await fetch(`http://localhost:8081/carts/${cartId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          quantities: ind.quantities
        })
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  

  useEffect(() => {
    const fetchCartSize = async () => {
      try {
        const response = await fetch(`http://localhost:8081/carts/user/${userId}`);
        const data = await response.json();
        setCartSize(data.length);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartSize();
  }, [userId]);
  

  // useEffect(() => {
  //   console.log("cart change");
  // }, [cart]);

  return (
    <React.Fragment>
      {/* <ShoppingCartBar setShow={setShow} size={cart.length} /> */}
      <ShoppingCartBar setShow={setShow} size={cartSize} />

      {show ? (
        <ItemsPage handleClick={handleClick} />//Imported the navbar here 
      ) : (
        <ItemCart cart={cart} setCart={setCart} handleChange={handleChange} />
      )}
    </React.Fragment>
  );
};

export default Items;