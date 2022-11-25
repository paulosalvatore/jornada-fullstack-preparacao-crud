import { Api } from "../../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./Delete.css";

export default function Delete() {
  const { id } = useParams();

  const navigate = useNavigate();

  const handleDelete = async (event) => {
    event.preventDefault();

    const url = Api.item.delete(id);
    const response = await Api.buildApiDeleteRequest(url);

    if (response.status === 200) {
      alert("Item removido com sucesso.");
      navigate("/");
    } else {
      alert("Erro ao deletar item.");
    }
  };

  return (
    <div className="card">
      Tem certeza que deseja remover este registro?
      <br />
      <br />
      <button onClick={handleDelete} className="button button--red">
        Remover
      </button>
      <Link to={`/view/${id}`} className="button button--grey">
        Cancelar
      </Link>
    </div>
  );
}
