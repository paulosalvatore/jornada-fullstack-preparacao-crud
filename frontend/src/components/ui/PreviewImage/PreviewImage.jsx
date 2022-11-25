import { useState } from "react";

export default function PreviewImage(props) {
  if (!props) {
    throw new Error("Cannot render PreviewImage without props.");
  }

  const [previewImageVisibility, setPreviewImageVisibility] = useState(false);

  const onError = () => {
    setPreviewImageVisibility(false);

    if (props?.onImageLoaded) {
      props.onImageLoaded();
    }
  };

  const onSuccess = () => {
    setPreviewImageVisibility(true);

    if (props?.onImageLoaded) {
      props.onImageLoaded(props.imageUrl);
    }
  };

  return (
    <div
      style={{
        display: previewImageVisibility ? "block" : "none",
      }}
    >
      <div className="form__label">Prévia da imagem:</div>
      <img
        src={props.imageUrl}
        className="preview-image"
        alt="Prévia da Imagem"
        onError={onError}
        onLoad={onSuccess}
      />
    </div>
  );
}
