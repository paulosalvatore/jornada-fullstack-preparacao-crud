import { Api } from "../../api/api";

import "./Delete.css";
import { useNavigate } from "react-router-dom";

export default function Delete(props) {
  const id = props.match.params.id;

  const navigate = useNavigate();

  const handleDelete = async (event) => {
    event.preventDefault();

    await Api.buildApiDeleteRequest(Api.item.delete(id));

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
