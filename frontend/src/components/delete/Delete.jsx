import { Api } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";

import "./Delete.css";

export default function Delete() {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleDelete = async (event) => {
    event.preventDefault();

    const url = Api.item.delete(id);
    await Api.buildApiDeleteRequest(url);

    navigate("/");
  };

  return (
    <div className="card">
      Tem certeza que deseja remover este registro?
      <br />
      <br />
      <button onClick={handleDelete} className="button button--red">
        Remover
      </button>
      <a href={`/view/${id}`} className="button button--grey">
        Cancelar
      </a>
    </div>
  );
}
