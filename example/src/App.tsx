import * as React from "react";

import { StyleSheet, View, Text, Button } from "react-native";
import ReactNativeInactivity from "react-native-inactivity";

export default function App() {
  const [inactivityTimeoutCount, setInactivityTimeoutCount] = React.useState(0);
  const [isActive, setIsActive] = React.useState(true);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
        <Button title="Disable Timer" onPress={() => setIsActive(false)} />
        <Button title="Enable Timer" onPress={() => setIsActive(true)} />
      </View>

      <View>
        <Text>Is Active: {isActive.toString()}</Text>
      </View>

      <View style={styles.ReactNativeInactivityContainer}>
        <ReactNativeInactivity
          isActive={isActive}
          onInactive={() => setInactivityTimeoutCount(inactivityTimeoutCount + 1)}
          timeForInactivity={2000}>
          <Button title="User Inactivity Area" color={"white"} />
          <View>
            <Text>{inactivityTimeoutCount}</Text>
          </View>
        </ReactNativeInactivity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ReactNativeInactivityContainer: {
    height: 300,
    width: "100%",
    backgroundColor: "grey",
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
