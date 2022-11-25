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
    const body = await response.json();
    navigate(`/view/${body._id}`);
  };

  const updatePreview = (event) => {
    setPreviewImage(event.target.value);
  };

  return (
    <div className="Update">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="form__label">
          Nome:
        </label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          className="form__input"
          defaultValue={item.name}
        />
        <br />
        <label htmlFor="imageUrl" className="form__label">
          URL da Imagem:
        </label>
        <br />
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          className="form__input"
          defaultValue={item.imageUrl}
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
