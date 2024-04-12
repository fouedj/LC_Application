//@ts-nocheck
const onMessage = (
  event: any,
  {
    setFavorites,
    setTitlePage,
    setTcVars,
    setOwnerCorrelationId,
    TrackingInfoSingleton,
    tcVarsWebToTcVarsNative,
  },
) => {
  //reading the page's source
  const response = event.nativeEvent.data;

  if (response.includes('Favoris')) {
    const object = JSON.parse(response);

    object.data &&
      setFavorites((prev: any) => ({
        ...prev,
        favoriteNotConnected: [...JSON.parse(object.data)],
        // favoriteConnected: [],
      }));
    return;
  }
  if (response.includes('{"vehicle":{"make":')) {
    const vehicleData = JSON.parse(response);
    setTitlePage(vehicleData.vehicle.make + ' ' + vehicleData.vehicle.model);
    return;
  }
  if (event.nativeEvent.data.includes('favoriesList')) {
    setFavorites(() => ({
      favoriteNotConnected: JSON.parse(event.nativeEvent.data)?.favoriesList,
      favoriteConnected: [],
    }));
    return;
  }
  if (response.includes('htmltcVars')) {
    //tc_vars datas
    const tcVars = JSON.parse(response);
    const nativeTcVars = tcVarsWebToTcVarsNative(tcVars);

    TrackingInfoSingleton.tcVars = tcVarsWebToTcVarsNative(tcVars);
    nativeTcVars &&
      setTcVars(prevVars => ({
        ...prevVars,
        ...nativeTcVars,
      }));
    return;
  }
  if (response.includes('htmlSummaryInfo')) {
    //get summary info
    const summaryInfo = JSON.parse(response);
    const ownerCorrelationId = summaryInfo?.htmlSummaryInfo?.ownerCorrelationId;
    ownerCorrelationId && setOwnerCorrelationId(ownerCorrelationId);
    return;
  }
};
export default onMessage;
