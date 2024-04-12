import React from 'react';
import {Box, IconButton, Text} from '../components';
import {ChevronLeft, TrashIcon} from '../components/Icon';
import mainStyles from '../styles/styles';
import {useIsFocused} from '@react-navigation/native';
import {
  sendClickOnSavedSearchNofication,
  sendPageSavedSearch,
} from '../utils/tagCommander';
import {textBody} from '../config/constantString';
import {SavedSearch} from '../storage/savedSearch';
import SavedSearchItem from '../components/SavedSearchItem';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSetFiltersParam} from '../recoil/filtersParam';
import Button from '../components/Button';
import colors from '../styles/colors';
import {
  deleteSavedSearch,
  getSavedSearches,
  addNotifSavedSearch,
  removeNotifSavedSearch,
} from '../hooks';
import {getToken} from '../utils/getUserInformations';
import {generateAllFilterTagLabels} from '../utils/transformFilterTagsIntoLabels';
import styles from '../styles/styles';
import {transformSavedSearchApiToUrl} from '../utils/transformFilterTagsIntoLabels/serviceSearchModels';
import {cloneDeep} from 'lodash';
import {
  sendGoBackActionClick,
  sendClickOnSavedSearchPage,
  sendClickOnCancelDeleteSavedSearchPage,
  sendClickOnConfirmDeleteSavedSearchPage,
} from '../utils/tagCommander';

const TrashBtn = (
  toggleDeleteMode: () => void,
  isCurrentlyInDeleteMode: boolean,
) => (
  <Box className="flex-row items-center justify-center">
    <Box>
      <IconButton
        // eslint-disable-next-line react-native/no-inline-styles
        style={{padding: 10}}
        icon={<TrashIcon isCurrentlyInDeleteMode={isCurrentlyInDeleteMode} />}
        onPress={toggleDeleteMode}
      />
    </Box>
  </Box>
);

const SavedSearches = ({navigation}: {navigation: any}) => {
  const isFocused = useIsFocused();
  const [savedSearches, setRetrievedSavedSearches] = React.useState<
    SavedSearch[]
  >([]);
  const [deleteMode, setDeleteMode] = React.useState<boolean>(false);
  const [shouldShowTrashBtn, setShouldShowTrashBtn] =
    React.useState<boolean>(false);
  const [selectedForDeletion, setSelectedForDeletion] = React.useState<
    boolean[]
  >([]);
  const [dataSearchSaved, setDataSearchSaved] = React.useState<[]>();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    function toggleDeleteMode() {
      setDeleteMode(!deleteMode);
    }

    navigation.setOptions({
      headerShown: true,
      headerBackTitle: 'ok',
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: (props: any) => {
        return <ChevronLeft {...props} showLeftTitle />;
      },
      headerRight: () => {
        return shouldShowTrashBtn ? TrashBtn(toggleDeleteMode, deleteMode) : '';
      },
    });
  }, [navigation, deleteMode, shouldShowTrashBtn]);

  React.useEffect(() => {
    const beforeRemove = navigation.addListener('beforeRemove', () => {
      //use to detect the goBack action
      sendGoBackActionClick('mesRecherchesEnregistrees', 'compte');
    });
  }, [navigation]);

  async function setupSavedSearches() {
    await getSavedSearches({token: getToken()}, (err: any, response: any) => {
      let {data, status} = response;
      if (err) {
        console.log(err);
        if (err.toString().includes('403')) {
          return;
        }
        //Handle err for front
      } else if (status === 200 || status === 201) {
        data = data.sort(
          (
            {creationDate: creationDateA}: {creationDate: string},
            {creationDate: creationDateB}: {creationDate: string},
          ) => {
            return (
              new Date(creationDateB).getTime() -
              new Date(creationDateA).getTime()
            );
          },
        );
        setDataSearchSaved(cloneDeep(data));

        const retrievedSavedSearch = data.map((savedSearch: any) => {
          savedSearch.criteria = generateAllFilterTagLabels(
            savedSearch.criteria,
          );
          return savedSearch;
        });
        setRetrievedSavedSearches(retrievedSavedSearch);
        setSelectedForDeletion(
          new Array(retrievedSavedSearch.length).fill(false),
        );
        setShouldShowTrashBtn(retrievedSavedSearch.length > 0);
        setIsLoading(false);
      }
    });
  }

  function deleteAllSelected() {
    sendClickOnConfirmDeleteSavedSearchPage();
    setIsLoading(true);
    selectedForDeletion.forEach(async (shouldDelete, index) => {
      if (shouldDelete) {
        await deleteSavedSearch(
          {
            token: getToken(),
            hash: savedSearches[index].hash,
          },
          (err: any, response: any) => {
            if (err) {
              //Handle delete error front
            } else {
              if ([200, 201].includes(response.status)) {
                //Handle success
              }
            }
          },
        );
      }
      if (selectedForDeletion.length - 1 === index) {
        setupSavedSearches();
        setDeleteMode(false);
        setIsLoading(false);
      }
    });
  }

  React.useEffect(() => {
    setupSavedSearches();
    sendPageSavedSearch();
  }, [isFocused, globalThis.refreshToken, globalThis.accessToken, isLoading]);

  function toggleSelectedForDeletion(toggledIndex: number) {
    setSelectedForDeletion(
      selectedForDeletion.map((value, index) => {
        return index === toggledIndex ? !value : value;
      }),
    );
  }

  const setFilters = useSetFiltersParam();
  function handlePressSavedSearch(item: SavedSearch, toggledIndex: number) {
    if (deleteMode) {
      toggleSelectedForDeletion(toggledIndex);
    } else {
      goToSaveSearchListing(toggledIndex);
    }
  }

  function handleToggleSavedSearch(isOn: boolean, hash: string) {
    sendClickOnSavedSearchNofication(isOn);
    if (isOn) {
      addNotifSavedSearch(
        {
          token: getToken(),
          hash: hash,
        },
        (err: any, response: any) => {
          if (err) {
            //Handle delete error front
          } else {
            if ([200, 201].includes(response)) {
              setupSavedSearches();
              setDeleteMode(false);
            }
          }
        },
      );
    } else {
      removeNotifSavedSearch(
        {
          token: getToken(),
          hash: hash,
        },
        (err: any, response: any) => {
          if (err) {
            //Handle delete error front
          } else {
            if ([200, 201].includes(response)) {
              setupSavedSearches();
              setDeleteMode(false);
            }
          }
        },
      );
    }
  }

  function goToSaveSearchListing(index: number) {
    sendClickOnSavedSearchPage();
    setFilters(transformSavedSearchApiToUrl(dataSearchSaved[index].criteria));
    navigation.navigate('Listing');
  }

  return (
    <>
      <ScrollView
        className="flex flex-col bg-white h-full pt-[10]"
        contentContainerStyle={
          (savedSearches as SavedSearch[]).length > 0
            ? {}
            : // eslint-disable-next-line react-native/no-inline-styles
              {
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }
        }>
        {(savedSearches as SavedSearch[]).length > 0 ? (
          savedSearches.map((item, index) => {
            return (
              <Box className="flex-row">
                {deleteMode ? (
                  selectedForDeletion[index] ? (
                    <TouchableOpacity
                      className="self-center rounded-full border-500 border-[#5057F4] border-2 bg-[#5057F4] h-5 w-5 ml-[10] transition"
                      onPress={() => {
                        toggleSelectedForDeletion(index);
                      }}>
                      <Box className="m-auto rounded-full w-[8] h-[8] bg-white"></Box>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      className="self-center rounded-full border-400 border-[#D9D9D9] border-2 h-5 w-5 ml-[10] transition"
                      onPress={() => {
                        toggleSelectedForDeletion(index);
                      }}
                    />
                  )
                ) : (
                  ''
                )}
                <SavedSearchItem
                  item={item.criteria}
                  onPress={handlePressSavedSearch}
                  index={index}
                  hash={item.hash}
                  key={item.hash[0]}
                  onToggle={handleToggleSavedSearch}
                  notificationDeviceToken={() => {
                    var notificationDeviceToken;
                    if (item.channels) {
                      item.channels.forEach((channel, index) => {
                        if (
                          channel['gateway'] ===
                          (Platform.OS === 'android' ? 'push_fcm' : 'push_ios')
                        ) {
                          if (
                            channel['target'] &&
                            channel['target'] ===
                              globalThis.notificationDeviceToken
                          )
                            notificationDeviceToken = channel['target'];
                        }
                      });
                    }
                    return notificationDeviceToken;
                  }}
                />
              </Box>
            );
          })
        ) : (
          <Text className="m-auto" style={mainStyles.discreetText14}>
            {textBody.noSavedSearch}
          </Text>
        )}
      </ScrollView>
      {deleteMode ? (
        <Box className="bg-white flex-row w-full px-[12] py-[16] border-t-0.5 border-[#D9D9D9]">
          <Button
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              ...styles?.genericButton,
              backgroundColor: colors.white,
              flex: 1,
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            textStyle={{
              ...styles?.textUnderline16Semi,
            }}
            title="Annuler"
            onPress={() => {
              sendClickOnCancelDeleteSavedSearchPage();
              setDeleteMode(false);
            }}
          />
          <Button
            title="Supprimer"
            onPress={deleteAllSelected}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              ...styles?.genericButton,
              backgroundColor:
                selectedForDeletion.filter(Boolean).length > 0
                  ? colors.lc_button_blue
                  : colors.lc_disabled_blue,
              flex: 1,
            }}
            textStyle={styles?.textRefreshButton}
          />
        </Box>
      ) : (
        ''
      )}
    </>
  );
};

export default SavedSearches;
