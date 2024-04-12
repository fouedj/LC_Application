import React from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import AnnouncementCard from '../AnnouncementCard';
import HeaderShortcuts from '../HeaderShortcuts';

interface Vehicle {
  item: any;
}

interface AdsNearbyProps {
  vehiculesAround: Vehicle[];
  onSelectCell: (f: any) => void;
  onSelectInfo: (f: any) => void;
  onSelectFav: (f: any) => void;
}

const renderSeparatorComponent = () => (
  <View style={styles.listSeparatorComponent} />
);

const AdsNearby: React.FC<AdsNearbyProps> = ({
  vehiculesAround,
  onSelectCell,
  onSelectInfo,
  onSelectFav,
  isLoading,
}) => {
  return (
    <>
      <HeaderShortcuts
        text="Les véhicules autour de vous"
        isLoading={isLoading}
      />
      <FlatList
        horizontal
        data={vehiculesAround}
        renderItem={({item}) => (
          <AnnouncementCard
            item={item}
            onSelectCell={onSelectCell}
            onSelectInfo={onSelectInfo}
            onSelectFav={onSelectFav}
          />
        )}
        keyExtractor={item => item?.item?.reference?.toString()}
        contentContainerStyle={styles.listContentContainerStyle}
        ItemSeparatorComponent={() => renderSeparatorComponent()}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  listContentContainerStyle: {
    paddingHorizontal: 20,
  },
  listSeparatorComponent: {
    width: 20,
  },
});

export default AdsNearby;
