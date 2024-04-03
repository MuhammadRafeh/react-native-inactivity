import * as React from "react";

import { StyleSheet, View, Text, Button } from "react-native";
import ReactNativeInactivity from "react-native-inactivity";

interface Scenario1 {
  goBack: () => void;
}

export default function Scenario1({ goBack }: Scenario1) {
  const [inactivityTimeoutCount, setInactivityTimeoutCount] = React.useState(0);
  const [isActive, setIsActive] = React.useState(true);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 60 }}>
        <Button title="Go Back" onPress={goBack} />
        <View style={{ marginBottom: 40 }}>
          <Text style={{ fontSize: 16, marginHorizontal: 10, textAlign: "center" }}>
            Please disable and enable the timer to check if it's working or not.
          </Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Enable/Disable</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
          <View style={{ backgroundColor: isActive ? undefined : "orange" }}>
            <Button title="Disable Timer" onPress={() => setIsActive(false)} />
          </View>
          <View style={{ backgroundColor: !isActive ? undefined : "orange" }}>
            <Button title="Enable Timer" onPress={() => setIsActive(true)} />
          </View>
        </View>

        <View style={styles.ReactNativeInactivityContainer}>
          <ReactNativeInactivity
            isActive={isActive}
            onInactive={() => setInactivityTimeoutCount(inactivityTimeoutCount + 1)}
            timeForInactivity={1000}
            restartTimerOnActivityAfterExpiration={false}
            loop={true}>
            <Button title="User Inactivity Area" color={"white"} />
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
              <Text style={{ fontWeight: "bold", fontSize: 25, color: "white" }}>
                Timeout Count: {inactivityTimeoutCount}
              </Text>
            </View>
          </ReactNativeInactivity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  ReactNativeInactivityContainer: {
    height: 300,
    width: "100%",
    backgroundColor: "grey",
    marginTop: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
