import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../../api/api";

import "./Update.css";

export default function Update() {
  const { id } = useParams();

  const [item, setItem] = useState();

  const [previewImage, setPreviewImage] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!item) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    const url = Api.item.readById(id);
    const response = await Api.buildApiGetRequest(url);
    const body = await response.json();

    setItem(body);
    setPreviewImage(body.imageUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const imageUrl = event.target.imageUrl.value;

    const payload = {
      name,
      imageUrl,
    };

    const url = Api.item.update(id);
    const response = await Api.buildApiPutRequest(url, payload);

    if (response.status === 200) {
      alert("Item atualizado com sucesso.");
      navigate(`/view/${id}`);
    } else {
      alert("Erro ao atualizar item.");
    }
  };

  const updatePreview = (event) => {
    setPreviewImage(event.target.value);
  };

  if (!item) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="Update">
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="form__label">
            Nome:
          </label>

          <input
            type="text"
            id="name"
            name="name"
            className="form__input"
            defaultValue={item.name}
          />
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
            defaultValue={item.imageUrl}
            onChange={updatePreview}
          />
        </div>

        {previewImage && (
          <div>
            <div className="form__label">Prévia da imagem:</div>
            <img
              src={previewImage}
              className="preview-image"
              alt="Prévia da Imagem"
            />
          </div>
        )}

        <div>
          <input
            type="submit"
            value="Editar"
            className="button button--blue button--full"
          />
        </div>
      </form>
    </div>
  );
}
