import axios from "axios";
const PIXABAY_KEY = "21833182-c50b5ade5b44b638c37fcd74e";

export const fetchImages = async (imgName, pageNum) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${imgName}&page=${pageNum}&key=${PIXABAY_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};

export default fetchImages;
