import * as React from "react";

import { StyleSheet, View, Text, Button } from "react-native";
import ReactNativeInactivity from "react-native-inactivity";

interface Scenario4 {
  goBack: () => void;
}

export default function Scenario4({ goBack }: Scenario4) {
  const [inactivityTimeoutCount, setInactivityTimeoutCount] = React.useState(0);
  const [restartTimerOnActivityAfterExpiration, setRestartTimerOnActivityAfterExpiration] = React.useState(true);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 60 }}>
        <Button title="Go Back" onPress={goBack} />
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginHorizontal: 10, textAlign: "center" }}>
            In this scenario, when we enable restartTimerOnActivityAfterExpiration then after timer expires when we
            press the user inactivity area then the timeout count should increase by 1 and if it's disable then count
            must not increase
          </Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>restartTimerOnActivityAfterExpiration</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
          <View style={{ backgroundColor: restartTimerOnActivityAfterExpiration ? undefined : "orange" }}>
            <Button title="Disable" onPress={() => setRestartTimerOnActivityAfterExpiration(false)} />
          </View>
          <View style={{ backgroundColor: !restartTimerOnActivityAfterExpiration ? undefined : "orange" }}>
            <Button title="Enable" onPress={() => setRestartTimerOnActivityAfterExpiration(true)} />
          </View>
        </View>

        <View style={styles.ReactNativeInactivityContainer}>
          <ReactNativeInactivity
            isActive={true}
            onInactive={() => setInactivityTimeoutCount(inactivityTimeoutCount + 1)}
            timeForInactivity={1000}
            restartTimerOnActivityAfterExpiration={restartTimerOnActivityAfterExpiration}
            loop={false}>
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
