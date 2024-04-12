type TFav = {
  favNotConnected: any;
  favConnectedany: any;
  isConnected: any;
};

export const getFavoriteNumber = (
  favNotConnected,
  favConnected,
  isConnected,
): string => {
  if (isConnected) {
    if (favConnected && favConnected.length !== 0) {
      return `(${favConnected.length})`;
    } else {
      return '';
    }
  }
  if (!isConnected) {
    if (favNotConnected && favNotConnected.length !== 0) {
      return `(${favNotConnected.length})`;
    } else {
      return '';
    }
  }
};
