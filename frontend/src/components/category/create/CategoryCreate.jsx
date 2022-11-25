import { useNavigate } from "react-router-dom";
import { Api } from "../../../api/api";

import "./CategoryCreate.css";

export default function CategoryCreate() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;

    const payload = {
      name,
    };

    const url = Api.category.create();
    const response = await Api.buildApiPostRequest(url, payload);

    if (response.status === 201) {
      alert("Categoria criada com sucesso.");
      navigate(`/`);
    } else {
      alert("Erro ao criar categoria, tente novamente.");
    }
  };

  return (
    <div className="CategoryCreate">
      <h1 className="title">Criar Categoria</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="form__label">
            Nome*:
          </label>

          <input type="text" id="name" name="name" className="form__input" />
        </div>

        <div>
          <input
            type="submit"
            value="Adicionar"
            className="button button--green button--full"
          />
        </div>
      </form>
    </div>
  );
}
