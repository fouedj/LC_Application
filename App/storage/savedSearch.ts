import AsyncStorage from '@react-native-async-storage/async-storage';

// export type SavedSearch = {
//   categories: string[];
//   makesModelsCommercialNames: string[];
//   energies: string[];
//   yearMin: string[];
//   [key: string]: string[];
// };

export type SavedSearch = {
  [key: string]: string[];
};

const getSavedSearches = async (): Promise<SavedSearch[]> => {
  let savedSearches;
  try {
    savedSearches = (await AsyncStorage.getItem('savedSearches')) || '[]';
  } catch (e) {
    // error reading value
  }
  return savedSearches && JSON.parse(savedSearches);
};

const deleteSavedSearch = async (savedSearchToDelete: SavedSearch) => {
  const previousSavedSearches = await getSavedSearches();
  const newListOfSavedSearches = previousSavedSearches.filter(
    savedSearch => savedSearch != savedSearchToDelete,
  );
  try {
    await AsyncStorage.setItem(
      'savedSearches',
      JSON.stringify(newListOfSavedSearches),
    );
  } catch (e) {
    // saving error
  }
};

const setNewSavedSearch = async (newSearchToSave: SavedSearch) => {
  const previousSavedSearches = await getSavedSearches();
  const newListOfSavedSearches = [...previousSavedSearches, newSearchToSave];
  try {
    await AsyncStorage.setItem(
      'savedSearches',
      JSON.stringify(newListOfSavedSearches),
    );
  } catch (e) {
    // saving error
  }
};

export default {getSavedSearches, setNewSavedSearch, deleteSavedSearch};
