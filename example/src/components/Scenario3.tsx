import * as React from "react";

import { StyleSheet, View, Text, Button } from "react-native";
import ReactNativeInactivity from "react-native-inactivity";

interface Scenario3 {
  goBack: () => void;
}

export default function Scenario3({ goBack }: Scenario3) {
  const [inactivityTimeoutCount, setInactivityTimeoutCount] = React.useState(0);
  const [loop, setLoop] = React.useState(true);
  const [inactivityTime, setInactivityTime] = React.useState(2000);
  const [restartTimerOnActivityAfterExpiration, setRestartTimerOnActivityAfterExpiration] = React.useState(true);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 60 }}>
        <Button title="Go Back" onPress={goBack} />
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 16, marginHorizontal: 10, textAlign: "center" }}>
            In this scenario the timer is stop, changing below all the params should not lead to increase in timeout
            count
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
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Loop</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
          <View style={{ backgroundColor: loop ? undefined : "orange" }}>
            <Button title="Disable Loop" onPress={() => setLoop(false)} />
          </View>
          <View style={{ backgroundColor: !loop ? undefined : "orange" }}>
            <Button title="Enable Loop" onPress={() => setLoop(true)} />
          </View>
        </View>
        <View style={{ marginBottom: 10, marginTop: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Inactivity Time</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
          <View style={{ backgroundColor: inactivityTime === 5000 ? "orange" : undefined }}>
            <Button title="Set 5 sec" onPress={() => setInactivityTime(5000)} />
          </View>
          <View style={{ backgroundColor: inactivityTime === 2000 ? "orange" : undefined }}>
            <Button title="Set 2 sec" onPress={() => setInactivityTime(2000)} />
          </View>
        </View>

        <View style={styles.ReactNativeInactivityContainer}>
          <ReactNativeInactivity
            isActive={false}
            onInactive={() => setInactivityTimeoutCount(inactivityTimeoutCount + 1)}
            timeForInactivity={inactivityTime}
            restartTimerOnActivityAfterExpiration={restartTimerOnActivityAfterExpiration}
            loop={loop}>
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
