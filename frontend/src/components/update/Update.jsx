import { useEffect, useState } from "react";
import { Api } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";

import "./Update.css";

export default function Update() {
  const { id } = useParams();

  const [item, setItem] = useState(undefined);

  const [previewImage, setPreviewImage] = useState(undefined);

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
    setPreviewImage(body.imagemUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nome = event.target.nome.value;
    const imagemUrl = event.target.imagemUrl.value;

    const payload = {
      nome,
      imagemUrl,
    };

    const url = Api.item.update(id);
    const response = await Api.buildApiPutRequest(url, payload);
    const body = await response.json();
    navigate(`/view/${body._id}`);
  };

  const updatePreview = (event) => {
    setPreviewImage(event.target.value);
  };

  return (
    <div className="Update">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="nome" className="form__label">
          Nome:
        </label>
        <br />
        <input
          type="text"
          id="nome"
          name="nome"
          className="form__input"
          defaultValue={item.nome}
        />
        <br />
        <label htmlFor="imagemUrl" className="form__label">
          URL da Imagem:
        </label>
        <br />
        <input
          type="text"
          id="imagemUrl"
          name="imagemUrl"
          className="form__input"
          defaultValue={item.imagemUrl}
          onChange={updatePreview}
        />
        <br />
        <span className="form__label">Prévia da imagem:</span>
        <br />
        <img
          src={previewImage}
          className="preview-image"
          alt="Prévia da Imagem"
        />
        <br />
        <br />
        <input
          type="submit"
          value="Editar"
          className="button button--blue button--full"
        />
      </form>
    </div>
  );
}
