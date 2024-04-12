export const getBookMarksLocalStorage = (reference: string) => {
  return `window.ReactNativeWebView.postMessage(JSON.stringify({payload:window.localStorage.getItem('bookmarks')}))
    prevFavs=JSON.parse(window.localStorage.getItem('bookmarks')) || []
var find = prevFavs.some(fav=>fav.classifiedReference == '${reference}');
   if(find){
     prevFavs = prevFavs.filter(favorite => favorite.classifiedReference !== '${reference}');
  }else{
   prevFavs.unshift({classifiedReference:'${reference}',addDate:'${new Date().toISOString(
    'fr',
  )}'});
  }
   window.localStorage.setItem('bookmarks',JSON.stringify(prevFavs));
   window.ReactNativeWebView.postMessage(JSON.stringify({"Favoris":prevFavs}));
   `;
};
