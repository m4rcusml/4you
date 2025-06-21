import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet } from 'react-native';

export default function Map({ initialRegion, markers }: any) {
  return (
    <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={initialRegion}>
      {markers.map((marker: any, index: number) => (
        <Marker
          key={index}
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});