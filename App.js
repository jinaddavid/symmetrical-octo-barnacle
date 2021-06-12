import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";

import AppNavigator from "./navigation/AppNavigator";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigationService from "./navigation/NavigationService";
let storage = new Storage({
  // maximum capacity, default 1000
  size: 10000,

  // Use AsyncStorage for RN, or window.localStorage for web.
  // If not set, data would be lost after reload.
  storageBackend: AsyncStorage,

  // expire time, default 1 day(1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  // defaultExpires: 1000 * 3600 * 24,
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired,
  // the corresponding sync method will be invoked and return
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});

global.storage = storage;

export default () => (
  <View style={styles.container}>
    {Platform.OS === "ios" && <StatusBar barStyle="default" />}
    <AppNavigator
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
