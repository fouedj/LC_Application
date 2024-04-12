import {
  atom,
  DefaultValue,
  selector,
  useRecoilValue,
  useSetRecoilState,
} from 'recoil';

type TFavorite = {
  favoriteConnected: Array<any>;
  favoriteNotConnected: Array<any>;
  changeState: boolean;
};
type TAnnoncePageInfo = {
  pageTitle: string;
  reference: string;
};

const favorite = atom<TFavorite>({
  key: 'favorite',
  default: {
    favoriteConnected: [],
    favoriteNotConnected: [],
    changeState: false,
  },
});
const webViewRef = atom<any>({
  key: 'webViewRef',
  default: {
    filterRef: null,
    listingRef: null,
    detailsRef: null,
    loginRef: null,
    logoutRef: null,
    messageRef: null,
  },
});
//i need it maybe when i will replace the globalThis by atom
const webViewState = atom<any>({
  key: 'webViewRefState',
  default: {
    filterRef: false,
    listingRef: false,
    detailsRef: false,
    loginRef: false,
    logoutRef: false,
    messageRef: false,
  },
});
const filterWebViewRefSelector = selector({
  key: 'filterWebViewRefSelector',
  get: ({get}) => {
    return get(webViewRef).filterRef;
  },
  set: ({set, get}, newValue) => {
    const prev = get(webViewRef);

    if (newValue instanceof DefaultValue) {
      set(webViewRef, newValue);
    } else {
      set(webViewRef, {...prev, filterRef: newValue});
    }
  },
});

const listingWebViewRefSelector = selector({
  key: 'listingWebViewRefSelector',
  get: ({get}) => {
    return get(webViewRef).listingRef;
  },
  set: ({set, get}, newValue) => {
    const prev = get(webViewRef);

    if (newValue instanceof DefaultValue) {
      set(webViewRef, newValue);
    } else {
      set(webViewRef, {...prev, listingRef: newValue});
    }
  },
});

const detailAnnounceTitle = selector({
  key: 'detail-announce-title',
  get: ({get}) => {
    return get(detailAnnoncePageInfo).pageTitle;
  },
});
const detailAnnoncePageInfo = atom<TAnnoncePageInfo>({
  key: 'detailAnnoncePageInfo',
  default: {
    pageTitle: '',
    reference: '',
  },
});

const SortFavorit = atom<{
  label: string;
  orderBy: 'asc' | 'desc';
  value: string;
  sort: any;
}>({
  key: 'orderedBy',
  default: {
    label: 'Date de mise en favoris',
    value: 'addDate',
    orderBy: 'desc',
    sort: () => {},
  },
});

const changeStateFavorieSelector = selector({
  key: 'changeStateFavorite',
  get: ({get}) => get(favorite).changeState,
  set: ({set, get}, value) => {
    const prev = get(favorite);
    if (value instanceof DefaultValue) {
      return set(favorite, value);
    }
    set(favorite, {
      ...prev,
      changeState: value,
    });
  },
});

const FavoriteState = {
  favorite,
  useGet: () => useRecoilValue(favorite),
  useSet: () => useSetRecoilState(favorite),
  useGetFavorieStateChange: () => useRecoilValue(changeStateFavorieSelector),
  useSetFavorieStateChange: () => useSetRecoilState(changeStateFavorieSelector),
  useGetDetailPageInfo: () => useRecoilValue(detailAnnoncePageInfo),
  useSetPageInfo: () => useSetRecoilState(detailAnnoncePageInfo),
  useGetPageTitle: () => useRecoilValue(detailAnnounceTitle),
  useGetWebRefStateChange: () => useRecoilValue(webViewState),
  useSetWebRefStateChange: () => useSetRecoilState(webViewState),
  useGetSortFavorit: () => useRecoilValue(SortFavorit),
  useSetSortFavorit: () => useSetRecoilState(SortFavorit),
  useSetWebViewRefFilter: () => useSetRecoilState(filterWebViewRefSelector),
  useGetWebViewRefFilter: () => useRecoilValue(filterWebViewRefSelector),
  useSetWebViewRefListing: () => useSetRecoilState(listingWebViewRefSelector),
  useGetWebViewRefListing: () => useRecoilValue(listingWebViewRefSelector),
};

export default FavoriteState;
