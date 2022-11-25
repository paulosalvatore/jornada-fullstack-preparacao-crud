import { Link } from "react-router-dom";

import "./ItemCard.css";

export function ItemCard(props) {
  const item = props.item;

  return (
    <Link to={"/view/" + item._id}>
      <div className="card">
        <h1 className="card__title">{item.name}</h1>
        <img src={item.imageUrl} alt={item.name} width="200" />
      </div>
    </Link>
  );
}
