import * as lodash from 'lodash';
export const removeDupliateFavorie = (array: Array<any>) => {
  return lodash.uniqBy(array, 'classifiedReference');
};
