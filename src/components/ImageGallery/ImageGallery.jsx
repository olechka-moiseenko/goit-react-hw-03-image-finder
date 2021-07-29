import React from "react";
import s from "./ImageGallery.module.css";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem.jsx";

function ImageGallery({ imgArr, onSelect }) {
  return (
    <ul className={s.ImageGallery}>
      {imgArr.map((imgItem) => (
        <ImageGalleryItem
          key={imgItem.id}
          imgItem={imgItem}
          onSelect={() => onSelect(imgItem)}
        />
      ))}
    </ul>
  );
}
ImageGallery.prototype = {
  imgArr: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default ImageGallery;
