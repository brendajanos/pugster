import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Map from '../Map.web';
import {useQueryClient} from 'react-query';

function getChunkId(lng: number, lat: number) {
  let chunkLng = Math.floor(lng);
  let chunkLat = Math.floor(lat);
  return {lng: chunkLng, lat: chunkLat};
}

const styles = StyleSheet.create({
  screen: {
    display: 'flex',
    flex: 1,
  },
  container: {
    left: 0,
    right: 0,
    position: 'absolute',
    top: 0,
    padding: 10,
  },
  map: {
    display: 'flex',
    flex: 1,
  },
  topNav: {
    width: '100%',
    height: 60,
    backgroundColor: 'white',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  avatarContainer: {
    flexDirection: 'row',
  },
  texts: {
    justifyContent: 'center',
    marginRight: 8,
  },
  nameText: {
    fontFamily: 'Kalam',
    fontSize: 18,
    lineHeight: 18,
    textAlign: 'right',
  },
  detailsText: {
    fontFamily: 'Kalam',
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'right',
  },
});

const HomeScreen = () => {
  const client = useQueryClient();
  return (
    <View style={styles.screen}>
      <View style={styles.map}>
        <Map
          initialLng={19.040528307070645}
          initialLat={47.50637626996388}
          initialZoom={16}
          onLocationChange={(lng, lat, _zoom) => {
            const {lng: chunkLng, lat: chunkLat} = getChunkId(lng, lat);
            client.fetchQuery(['chunk', chunkLng, chunkLat], () => {
              console.log(`loading chunk: ${chunkLng} ${chunkLat}`);
              return {
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: [19.040528307070645, 47.50637626996388],
                    },
                    properties: {
                      name: 'Luigi',
                      imageSrc: 'something',
                    },
                  },
                ],
              };
            });
          }}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.topNav}>
          <Branding />
          <Avatar />
        </View>
      </View>
    </View>
  );
};

const Avatar = () => {
  return (
    <View style={styles.avatarContainer}>
      <View style={styles.texts}>
        <Text style={styles.nameText}>Luigi</Text>
        <Text style={styles.detailsText}>Veteran</Text>
      </View>
      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1605366873371-6b8e5012c96e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=44&q=100',
        }}
        style={styles.avatar}
      />
    </View>
  );
};

const Branding = () => {
  return (
    <View>
      <Text>Pugster</Text>
    </View>
  );
};

export default HomeScreen;
