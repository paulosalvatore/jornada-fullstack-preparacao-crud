import React from "react";
import Brand from "../../assets/brand.svg";

import "./Header.css";

export default function Header() {
  return (
    <header className="Header">
      <a href="/">
        <img src={Brand} width={32} height={32} alt="Samsung Ocean" />
      </a>

      <a href="/">Listar</a>
      <a href="/add">Adicionar</a>
    </header>
  );
}
