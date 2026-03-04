const state = {
  pictures: []
};

const initStore = ({ pictures }) => {
  if(pictures) {
    state.pictures = pictures;
  }
};

const getPictures = () => state.pictures;

const getPictureById = (id) => {
  return state.pictures.find((item) => String(item.id) === String(id));
};

export {
  initStore,
  getPictures,
  getPictureById
};
