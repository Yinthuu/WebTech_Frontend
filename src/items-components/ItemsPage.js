import React, { useState, useEffect } from "react";
import ItemCards from "./ItemsCard";
import "../styles/item.css";

const ItemsPage = ({ handleClick }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/products")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section>
      {items.map((item) => (
        <ItemCards key={item._id} item={item} handleClick={handleClick} />
      ))}
    </section>
  );
};

export default ItemsPage;
