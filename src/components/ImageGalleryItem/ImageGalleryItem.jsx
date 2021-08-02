import React from "react";
import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ imgItem, onSelect }) => {
  return (
    <li
      className={s.ImageGalleryItem}
      key={imgItem.id}
      onClick={() => onSelect(imgItem)}
    >
      <img
        src={imgItem.webformatURL}
        alt={imgItem.tags}
        className={s.ImageGalleryItemimage}
      />
    </li>
  );
};

ImageGalleryItem.prototype = {
  imgItem: PropTypes.objectOf({
    largeImageURL: PropTypes.string,
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
    id: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;
