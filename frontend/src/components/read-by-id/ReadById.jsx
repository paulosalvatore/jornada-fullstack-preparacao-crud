import React, { useEffect, useState } from "react";
import { Api } from "../../api/api";
import { useParams } from "react-router-dom";

import "./ReadById.css";

export default function ReadById() {
  const { id } = useParams();

  const [item, setItem] = useState();

  useEffect(() => {
    if (!item) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    const url = Api.item.readById(id);
    const response = await Api.buildApiGetRequest(url);
    const body = await response.json();

    setItem(body);
  };

  if (!item) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="read-by-id">
      <a href={`/update/${id}`} className="button button--blue">
        Editar
      </a>

      <a href={`/delete/${id}`} className="button button--red">
        Remover
      </a>

      <br />
      <div className="card">
        <div className="card__label">{item.category.name}</div>

        <h1 className="card__title">{item.name}</h1>
        <img src={item.imageUrl} alt={item.name} width="200" />
      </div>
    </div>
  );
}
