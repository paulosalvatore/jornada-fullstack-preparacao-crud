import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../api/api";

import "./Create.css";

export default function Create() {
  const [previewImage, setPreviewImage] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const imageUrl = event.target.imageUrl.value;

    const payload = {
      name,
      imageUrl,
    };

    const url = Api.item.create();
    const response = await Api.buildApiPostRequest(url, payload);
    const body = await response.json();

    if (response.status === 201) {
      alert("Item criado com sucesso.");
      navigate(`/view/${body._id}`);
    } else {
      alert("Erro ao criar item, tente novamente.");
    }
  };

  const updatePreview = (event) => {
    setPreviewImage(event.target.value);
  };

  return (
    <div className="create">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="form__label">
            Nome:
          </label>

          <input type="text" id="name" name="name" className="form__input" />
        </div>

        <div>
          <label htmlFor="imageUrl" className="form__label">
            URL da Imagem:
          </label>

          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
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
