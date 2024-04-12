//@ts-nocheck
const onShouldStartLoadWithRequest = (
  request: any,
  {
    PagesToOpenInBrowser,
    Linking,
    navigation,
    openInAppBrowser,
    PagesToOpenInInAppBrowser,
    WebViewUrlsHelpers,
  },
) => {
  const {url} = request;
  if (url.includes(WebViewUrlsHelpers?.technicalSheet)) {
    openInAppBrowser(url);
    return false;
  }
  if (url.slice(0, 3) === 'tel') {
    const callNumber = url.slice(-10);
    Linking.openURL(`tel:${callNumber}`);
    return false;
  }
  if (PagesToOpenInInAppBrowser.some(urlToCatch => url.includes(urlToCatch))) {
    openInAppBrowser(url);
    return false;
  }
  if (
    PagesToOpenInBrowser.some(urlToCatch => url.includes(urlToCatch)) ||
    (!url.includes(WebViewUrlsHelpers.baseUrl) &&
      !request.mainDocumentURL.includes(WebViewUrlsHelpers.baseUrl)) //check the url and mainDocumentURL to check if we need to open the phone's browser
  ) {
    Linking.openURL(url);
    return false;
  }
  if (url.includes(WebViewUrlsHelpers.webQuotationDetail2)) {
    const appQuotationDetailUrl = url.replace(/\/cote-/, '/app-cote-');
    navigation.navigate('QuotationDetails', {url: appQuotationDetailUrl});
    return false;
  }
  return true;
};
export default onShouldStartLoadWithRequest;
