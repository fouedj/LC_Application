import * as React from 'react';
import {FavoriteState} from '../../recoil';
import RadioButton from '../Button/RadioButton';
import {RadioButtonIcon} from '../Icon';
import BottomModal from './CustomActionSheet';
import {sendClickFavoriteTri} from '../../utils/tagCommander';

type Props = {
  actionSheetRef: any;
  onClose: any;
};
const SORT_LIST: Array<{
  label: string;
  orderBy: 'asc' | 'desc';
  value: string;
  sort: any;
}> = [
  {
    label: 'Date de mise en favoris',
    value: 'addDate',
    orderBy: 'desc',
    sort: () => {},
  },
  {
    label: 'Prix croissant',
    value: 'price',
    orderBy: 'asc',
    sort: (a: any, b: any) =>
      a.classified.price > b.classified.price ? 1 : -1,
  },
  {
    label: 'Prix décroissant',
    value: 'price',
    orderBy: 'desc',
    sort: (a: any, b: any) =>
      a.classified.price > b.classified.price ? -1 : 1,
  },
  {
    label: 'Kilométrage croissant',
    value: 'vehicle_mileage',
    orderBy: 'asc',
    sort: (a: any, b: any) =>
      a.classified.vehicle_mileage > b.classified.vehicle_mileage ? 1 : -1,
  },
  {
    label: 'Kilométrage décroissant',
    value: 'vehicle_mileage',
    orderBy: 'desc',
    sort: (a: any, b: any) =>
      a.classified.vehicle_mileage < b.classified.vehicle_mileage ? 1 : -1,
  },
  {
    label: 'Année croissant',
    value: 'vehicle_year',
    orderBy: 'asc',
    sort: (a: any, b: any) =>
      a.classified.vehicle_year > b.classified.vehicle_year ? 1 : -1,
  },
  {
    label: 'Année décroissant',
    value: 'vehicle_year',
    orderBy: 'desc',
    sort: (a: any, b: any) =>
      a.classified.vehicle_year < b.classified.vehicle_year ? 1 : -1,
  },
];
export default function SortModal({actionSheetRef, onClose}: Props) {
  const setSort = FavoriteState.useSetSortFavorit();
  const selectedFavorit = FavoriteState.useGetSortFavorit();
  return (
    <BottomModal
      title="Trier"
      actionSheetRef={actionSheetRef}
      onClose={onClose}>
      {SORT_LIST.map(item => (
        <RadioButton
          key={item.label}
          icon={
            <RadioButtonIcon checked={selectedFavorit.label === item.label} />
          }
          label={item.label}
          onSelect={() => {
            setSort(item);
            var sortAndOrderTracking = '';
            switch (item.label) {
              case 'Date de mise en favoris':
                sortAndOrderTracking = 'DateMiseEnFavoris';
                break;
              case 'Prix croissant':
                sortAndOrderTracking = 'trierPrixCroissant';
                break;
              case 'Prix décroissant':
                sortAndOrderTracking = 'trierPrixDecroissant';
                break;
              case 'Kilométrage croissant':
                sortAndOrderTracking = 'trierKmCroissant';
                break;
              case 'Kilométrage décroissant':
                sortAndOrderTracking = 'trierKmDecroissant';
                break;
              case 'Année croissant':
                sortAndOrderTracking = 'trierVehiculesPlusAnciennes';
                break;
              case 'Année décroissant':
                sortAndOrderTracking = 'trierVehiculesPlusRecents';
                break;
            }
            sendClickFavoriteTri(sortAndOrderTracking);
            onClose();
          }}
        />
      ))}
    </BottomModal>
  );
}
