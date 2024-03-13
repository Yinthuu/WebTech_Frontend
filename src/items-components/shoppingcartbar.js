//Header component 
import React from "react";
import "../styles/shoppingcartbar.css";
import { FaShoppingCart } from 'react-icons/fa'

const shoppingcartbar = ({ setShow, size }) => {
  return (
    <nav>
      <div className="nav_box">
   
        <span className="my_shop" onClick={() => setShow(true)}>  
        
        </span>
        <br></br><br></br><br></br><br></br>
        <div className="cart" onClick={() => setShow(false)}> 
          <span>
            <FaShoppingCart/>
          </span>
          <span>{size}</span>

          
        </div>
      </div>
    </nav>
  );
};

export default shoppingcartbar;