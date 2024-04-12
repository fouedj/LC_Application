class TrackingInfoSingleton {
    constructor() {
        this._tcVars = {};
        this._previousEventPage = "";
        this._previousEventPageZone = "";
        this._isErrorPageDisplayed = false;
    }
  
    //getters
    get tcVars() {
      return this._tcVars;
    }
    get previousEventPage() {
      return this._previousEventPage;
    }
    get previousEventPageZone() {
      return this._previousEventPageZone;
    }
    get isErrorPageDisplayed() {
      return this._isErrorPageDisplayed;
    }
  
    //setters
    set tcVars(tcVars) {
      this._tcVars = tcVars;
    }
    set previousEventPage(previousEventPage) {
      this._previousEventPage = previousEventPage;
    }
    set previousEventPageZone(previousEventPageZone) {
      this._previousEventPageZone = previousEventPageZone;
    }
    set isErrorPageDisplayed(isErrorPageDisplayed) {
      this._isErrorPageDisplayed = isErrorPageDisplayed;
    }
  }
  
  export default new TrackingInfoSingleton();