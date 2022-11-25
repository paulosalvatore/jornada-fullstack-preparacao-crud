import React, { useEffect, useState } from "react";
import { ItemCard } from "../item-card/ItemCard.jsx";
import { Api } from "../../api/api";

import "./ReadAll.css";

export default function ReadAll() {
  const [items, setItems] = useState();

  useEffect(() => {
    if (!items) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    const url = Api.item.readAll();
    const response = await Api.buildApiGetRequest(url);
    const body = await response.json();

    setItems(body);
  };

  if (!items) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="ReadAll">
      {items.map((item, index) => (
        <ItemCard item={item} key={index} />
      ))}
    </div>
  );
}
