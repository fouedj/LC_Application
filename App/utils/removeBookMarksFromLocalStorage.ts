import {WebViewUrlsHelpers} from '../config/constants';

export const removeBookmarksFromLocalStorage = () => {
  return `window.localStorage.setItem('bookmarks',JSON.stringify([]));
       window.ReactNativeWebView.postMessage(JSON.stringify({data:window.localStorage.getItem('bookmarks'),type:"Favoris"}));   
       `;
};
