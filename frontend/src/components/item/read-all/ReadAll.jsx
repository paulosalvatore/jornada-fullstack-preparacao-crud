import React, { useEffect, useState } from "react";
import { ItemCard } from "../item-card/ItemCard.jsx";
import { Api } from "../../../api/api.js";

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
      <h1 className="title">Lista de Itens</h1>

      <div className="card-list">
        {items.map((item, index) => (
          <ItemCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
}
