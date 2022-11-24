import { useState } from "react";
import { Api } from "../../api/api";

import "./Create.css";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [previewImage, setPreviewImage] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nome = event.target.nome.value;
    const imagemUrl = event.target.imagemUrl.value;

    const payload = {
      nome,
      imagemUrl,
    };

    const url = Api.item.create();
    const response = await Api.buildApiPostRequest(url, payload);
    const body = await response.json();

    navigate(`/view/${body._id}`);
  };

  const updatePreview = (event) => {
    setPreviewImage(event.target.value);
  };

  return (
    <div className="create">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome" className="form__label">
            Nome:
          </label>

          <input type="text" id="nome" name="nome" className="form__input" />
        </div>

        <div>
          <label htmlFor="imagemUrl" className="form__label">
            URL da Imagem:
          </label>

          <input
            type="text"
            id="imagemUrl"
            name="imagemUrl"
            className="form__input"
            onChange={updatePreview}
          />
        </div>

        {previewImage ? (
          <div>
            <div className="form__label">Prévia da imagem:</div>
            <img
              src={previewImage}
              className="preview-image"
              alt="Prévia da Imagem"
            />
          </div>
        ) : (
          ""
        )}

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
