import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../../../api/api.js";

import "./Update.css";
import { toast } from "react-toastify";
import PreviewImage from "../../ui/PreviewImage/PreviewImage.jsx";
import CreatableSelect from "react-select/creatable";

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState();

  const [imageUrl, setImageUrl] = useState();
  const [image, setImage] = useState();

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
    setImageUrl(body.imageUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      toast("Insira uma imagem válida", { type: "error" });
      return;
    }

    const name = event.target.name.value;
    const imageUrl = event.target.imageUrl.value;

    const payload = {
      name,
      imageUrl,
    };

    const url = Api.item.update(id);
    const response = await Api.buildApiPutRequest(url, payload);

    if (response.status === 200) {
      toast("Item atualizado com sucesso.", { type: "success" });
      navigate(`/view/${id}`);
    } else {
      toast("Erro ao atualizar item, tente novamente.", { type: "error" });
    }
  };

  if (!item) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="Update">
      <h1 className="title">Editar Item</h1>

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
            onChange={(event) => setImageUrl(event.target.value)}
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
            defaultValue={categories?.find(
              (category) => category.value === item.category._id
            )}
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
            value="Editar"
            className="button button--blue button--full"
          />
        </div>
      </form>
    </div>
  );
}
