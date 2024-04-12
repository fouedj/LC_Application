export function getGeneralInformationFromListing(
  wholeHtml: string,
): {string: string} | null | undefined {
  if (wholeHtml.includes('window.__PRELOADED_STATE_LISTING__ =')) {
    var mySubString = wholeHtml.substring(
      //take the whole webpage's source and substring the first key/data from 'keyToExtract'
      wholeHtml.indexOf('window.__PRELOADED_STATE_LISTING__ ='),
      wholeHtml.lastIndexOf(';'),
    );
    let mySubStringList = mySubString.split(';'); //convert the string to a array with all the datas from the webpage
    var dicString = mySubStringList[0];
    if (dicString != null && dicString.length > 0) {
      dicString = dicString.replace('window.__PRELOADED_STATE_LISTING__ =', '');
      var obj = JSON.parse(dicString);
      let totalAnnounceNumber =
        obj && obj?.search && obj?.search?.total && obj?.search?.total;
      return totalAnnounceNumber;
    }
  }
  return null;
}

export function getGeneralInformationFromDetail(
  wholeHtml: string,
): {string: string} | null | undefined {
  if (wholeHtml.includes('var GeneralInformationData = {')) {
    var mySubString = wholeHtml.substring(
      //take the whole webpage's source and substring the first key/data from 'keyToExtract'
      wholeHtml.indexOf('var GeneralInformationData = {'),
      wholeHtml.lastIndexOf('</script>'),
    );
    let mySubStringList = mySubString.split('</script>'); //convert the string to a array with all the datas from the webpage
    var dicString = mySubStringList[0];
    if (dicString != null && dicString.length > 0) {
      dicString = dicString.replace('var GeneralInformationData = ', '');
      var obj = JSON.parse(dicString);
      return obj;
    }
  }
  return null;
}

export function getSellerInformationFromDetail(wholeHtml: string): {
  string: string;
} {
  var mySubString = wholeHtml.substring(
    //take the whole webpage's source and substring the first key/data from 'keyToExtract'
    wholeHtml.indexOf('var SellerInformationData = {'),
    wholeHtml.lastIndexOf('</script>'),
  );
  let mySubStringList = mySubString.split('</script>'); //convert the string to a array with all the datas from the webpage
  var dicString = mySubStringList[0];
  dicString = dicString.replace('var SellerInformationData = ', '');

  var obj = JSON.parse(dicString);

  return obj;
}

export function tcVarsWebToTcVarsNative(tcvarsWeb: {[key: string]: any}): {
  [key: string]: any;
} {
  var tcVarsNative = {};
  Object.entries(tcvarsWeb).forEach(([key, value]) => {
    if (!key.includes('Piano_') && value !== null && value !== '') {
      tcVarsNative[key] = value;
    }
  });
  return tcVarsNative;
}
