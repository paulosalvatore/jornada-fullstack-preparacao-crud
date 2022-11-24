import React, { useEffect, useState } from "react";

import { Api } from "../../api/api";

import { ItemCard } from "../item-card/ItemCard.jsx";

import "./ReadAll.css";

export default function ReadAll() {
  // useState
  const [listaResultadoApi, atualizarListaResultadoApi] = useState(undefined);

  // useEffect
  useEffect(() => {
    if (!listaResultadoApi) {
      obterResultado();
    }
  }, []);

  const obterResultado = async () => {
    const resultado = await Api.buildApiGetRequest(Api.item.readAll());

    const dados = await resultado.json();

    atualizarListaResultadoApi(dados);
  };

  if (!listaResultadoApi) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="ReadAll">
      {listaResultadoApi.map((item, index) => (
        <ItemCard item={item} key={index} />
      ))}
    </div>
  );
}
