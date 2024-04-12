export const removeBookmarkFromLocalStorage = (reference: any) => {
  return `window.ReactNativeWebView.postMessage(JSON.stringify({payload:window.localStorage.getItem('bookmarks')}))
      prevFavs=JSON.parse(window.localStorage.getItem('bookmarks')) || []
      prevFavs = prevFavs.filter(favorite => favorite.classifiedReference !== '${reference}');
     window.localStorage.setItem('bookmarks',JSON.stringify(prevFavs));
    window.ReactNativeWebView.postMessage(JSON.stringify({data:window.localStorage.getItem('bookmarks'),type:"Favoris"}));
     `;
};
