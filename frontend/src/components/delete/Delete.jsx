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
      alert("Erro ao remover item, tente novamente.");
    }
  };

  return (
    <div className="card">
      <h1 className="title">Remover Item</h1>
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
