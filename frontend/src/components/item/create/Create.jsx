import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Api } from "../../../api/api.js";
import CreatableSelect from "react-select/creatable";

import "./Create.css";
import { toast } from "react-toastify";
import PreviewImage from "../../ui/PreviewImage/PreviewImage.jsx";

export default function Create() {
  const [imageUrl, setImageUrl] = useState();
  const [image, setImage] = useState();

  const navigate = useNavigate();

  const [categories, setCategories] = useState();
  const selectCategories = useRef();

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
      toast("Erro ao criar categoria, tente novamente.", { type: "error" });
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      toast("Insira uma imagem válida", { type: "error" });
      return;
    }

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
      toast("Item criado com sucesso", { type: "success" });
      navigate(`/view/${body._id}`);
    } else {
      toast("Erro ao criar item, tente novamente", { type: "error" });
    }
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
            onChange={(event) => setImageUrl(event.target.value)}
            required
          />
        </div>

        <PreviewImage imageUrl={imageUrl} onImageLoaded={setImage} />

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
            noOptionsMessage={() =>
              "Nenhuma categoria encontrada. Digite algo para criar."
            }
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
