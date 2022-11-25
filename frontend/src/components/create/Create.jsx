import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../api/api";
import CreatableSelect from "react-select/creatable";

import "./Create.css";

export default function Create() {
  const [categories, setCategories] = useState();

  const [previewImage, setPreviewImage] = useState();
  const [previewImageVisibility, setPreviewImageVisibility] = useState(false);

  const selectCategories = useRef();

  const navigate = useNavigate();

  const loadCategories = async () => {
    const url = Api.category.readAll();
    const response = await Api.buildApiGetRequest(url);
    const body = await response.json();

    setCategories(
      body.map((category) => ({ value: category._id, label: category.name }))
    );
  };

  const createCategory = async (name) => {
    const payload = {
      name,
    };

    const url = Api.category.create();
    const response = await Api.buildApiPostRequest(url, payload);

    if (response.status === 201) {
      // Reload categories
      setCategories(undefined);
      await loadCategories();

      // Select the new category
      const body = await response.json();
      selectCategories.current.setValue({
        value: body._id,
        label: body.name,
      });
    } else {
      alert("Erro ao criar categoria, tente novamente.");
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const imageUrl = event.target.imageUrl.value;
    const category = event.target.category.value;

    const payload = {
      name,
      imageUrl,
      category,
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
    <div className="Create">
      <h1 className="title">Criar Item</h1>

      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="form__label">
            Nome*:
          </label>

          <input
            type="text"
            id="name"
            name="name"
            className="form__input"
            required
            onInvalid={(event) => {
              event.target.setCustomValidity("Preencha o campo corretamente.");
            }}
            onInput={(event) => {
              event.target.setCustomValidity("");
            }}
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="form__label">
            URL da Imagem*:
          </label>

          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="form__input"
            onChange={updatePreview}
            required
            onInvalid={(event) => {
              event.target.setCustomValidity("Preencha o campo corretamente.");
            }}
          />
        </div>

        <div
          style={{
            display: previewImageVisibility ? "block" : "none",
          }}
        >
          <div className="form__label">Prévia da imagem:</div>
          <img
            src={previewImage}
            className="preview-image"
            alt="Prévia da Imagem"
            onKeyDown={() => setPreviewImageVisibility(false)}
            onError={() => {
              setPreviewImage(undefined);
              setPreviewImageVisibility(false);
            }}
            onLoad={() => setPreviewImageVisibility(true)}
          />
        </div>

        <div>
          <label htmlFor="category" className="form__label">
            Categoria*:
          </label>

          <CreatableSelect
            ref={selectCategories}
            className="form__select"
            id="category"
            name="category"
            placeholder={"Selecione uma categoria"}
            isLoading={categories === undefined}
            options={categories}
            allowCreateWhileLoading={false}
            formatCreateLabel={(inputValue) =>
              `Criar categoria "${inputValue}"`
            }
            onCreateOption={createCategory}
            required
          />
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
