import {goBackFunction} from '../../utils/goBackFuction';
import {removeBookmarksFromLocalStorage} from '../../utils/removeBookMarksFromLocalStorage';
import * as Sentry from '@sentry/react-native';
import {getLocalFavorites, removeFavoriteBookmarks} from '../../hooks';
import {getToken} from '../../utils/getUserInformations';
export const _removeAllFavoritesNotConnected = ({
  favoriteNotConnected,
  setFavorites,
  setIsVisible,
  setIsLoadingButton,
  webViewRef,
  setFavorieStateChange,
}: {
  favoriteNotConnected: any;
  setFavorites: React.Dispatch<React.SetStateAction<any>>;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoadingButton: React.Dispatch<React.SetStateAction<boolean>>;
  webViewRef: any;
  setFavorieStateChange: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setIsLoadingButton(true);

    if (favoriteNotConnected && favoriteNotConnected.length) {
      setFavorites((prev: any) => ({
        ...prev,
        favoriteNotConnected: [],
      }));
      if (webViewRef && globalThis.isFilterLoaded) {
        webViewRef.current.injectJavaScript(removeBookmarksFromLocalStorage());
      }

      setFavorieStateChange(true);
      setIsLoadingButton(false);
      setIsVisible(false);
    }
  } catch (e: any) {
    Sentry.captureMessage(' Favorite:_removeAllFavoritesNotConnected', e);
    console.error(e);
  }
};
export const _removeAllFavoritesConnected = (
  favorites: any,
  setFavorites: React.Dispatch<React.SetStateAction<any>>,
  setIsLoadingButton: React.Dispatch<React.SetStateAction<boolean>>,
  webViewRef: any,
  webViewRefListing: any,
  setFavorieStateChange: React.Dispatch<React.SetStateAction<boolean>>,
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    if (favorites.length !== 0) {
      setIsLoadingButton(true);
      let firstExecuted = false;
      removeFavoriteBookmarks(
        {token: getToken(), data: favorites},
        (err: any, res: any) => {
          if (err) {
            alert('Une erreur servenue');
            return;
          }
          if (res?.success) {
            setFavorites(prev => ({
              ...prev,
              favoriteConnected: [],
            }));

            setIsLoadingButton(false);
            setIsVisible(false);
          }
        },
      );
      if (webViewRef && globalThis.isFilterLoaded) {
        webViewRef.reload();
        firstExecuted = true;
      }
      //to refresh listing Page with anchors
      if (webViewRefListing && globalThis.isFilterLoaded && !firstExecuted) {
        webViewRefListing.injectJavaScript(goBackFunction());
      }
      setFavorieStateChange(true);
    }
  } catch (e: any) {
    Sentry.captureMessage('Favorite:_removeAllFavoritesConnected', e);
    console.error(e);
  }
};
export const fetchLocalFavorites = ({
  setIsLoading,
  favoriteNotConnected,
  setFavorites,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  favoriteNotConnected: any;
  setFavorites: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const getAddDate = (array: any, ref: any) => {
    return (
      array &&
      array.length !== 0 &&
      array.find(fav => fav.classifiedReference === ref).addDate
    );
  };
  try {
    const references = favoriteNotConnected
      .map(({classifiedReference}: any) => {
        return classifiedReference;
      })
      .filter(Boolean) //to remove the empty reference to fix crash favorites list
      .join(',');
    if (references?.length === 0) {
      return;
    }
    setIsLoading(true);
    const orderByDate = favoriteNotConnected
      .map(({classifiedReference}: any) => {
        return classifiedReference;
      })
      .filter(Boolean); //to remove the empty reference to fix crash favorites list
    getLocalFavorites({references}, (favoritesLocaly: any) => {
      if (favoritesLocaly) {
        if (favoritesLocaly && favoritesLocaly?.data?.data?.length > 0) {
          const favoriteApiOrdred = favoritesLocaly?.data?.data.map(
            (item: any) => ({
              classified: item,
              addDate: getAddDate(favoriteNotConnected, item.reference),
            }),
          );

          const ordredFavorieApi = orderByDate.map((ref: any) =>
            favoriteApiOrdred.find(fav => fav?.classified?.reference === ref),
          );
          setFavorites(precedFav => ({
            ...precedFav,
            favoriteNotConnected: ordredFavorieApi,
          }));
          setIsLoading(false);
        }
      }
    });
  } catch (error: any) {
    Sentry.captureMessage('Favorites:loadFavoritesNotConnected', error);
    console.error(error);
  }
};
