import React from "react";
import Brand from "../../../public/brand.svg";
import { Link } from "react-router-dom";

import "./Header.css";

export default function Header() {
  return (
    <header className="Header">
      <Link to="/">
        <img src={Brand} width={32} height={32} alt="Samsung Ocean" />
      </Link>

      <Link to="/">Listar</Link>
      <Link to="/add">Adicionar</Link>
    </header>
  );
}
