import {WebViewUrlsHelpers} from '../config/constants';

export const goBackFunction = () => {
  return `const url = window.location.host;
    const search = window.location.search;
    const ref = window.location.hash;
     window.location.href="https://" + url +"/app-listing"+search+ref`;
};
