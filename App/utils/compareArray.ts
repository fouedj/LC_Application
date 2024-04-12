//this function to compare two arrays if the same contain we dont must to do rerender else we do render
export const areEquals = (array1: string[], array2: string[]) => {
  if (array1.length !== array2.length) {
    return false;
  }
  if (array1.length === 0 && array2.length === 0) {
    return true;
  }
  return array1.every((item: string) => array2.includes(item));
};
