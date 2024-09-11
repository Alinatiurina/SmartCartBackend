import { typeList } from '../constants/goods-constants.js';

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;

  if (!['true', 'false'].includes(value)) return;

  return value === 'true';
};

const parseGoogFilterParams = ({ goodType, isFavourite }) => {
  const parsedType = typeList.includes(goodType) ? goodType : null;
  const parsedFavorite = parseBoolean(isFavourite);
  return {
    goodType: parsedType,
    isFavourite: parsedFavorite,
  };
};

export default parseGoogFilterParams;
