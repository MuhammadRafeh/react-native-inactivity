import * as React from "react";

import { StyleSheet, View, Text, Button } from "react-native";
import ReactNativeInactivity from "react-native-inactivity";

interface Scenario2 {
  goBack: () => void;
}

export default function Scenario2({ goBack }: Scenario2) {
  const [inactivityTimeoutCount, setInactivityTimeoutCount] = React.useState(0);
  const [loop, setIsLoop] = React.useState(true);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 60 }}>
        <Button title="Go Back" onPress={goBack} />
        <View style={{ marginBottom: 40 }}>
          <Text style={{ fontSize: 16, marginHorizontal: 10, textAlign: "center" }}>
            if current timer is 71 and then we disable loop then the timer will become 72 and then it will stop and if
            we turn back it to true it will start running again and again
          </Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>Enable/Disable</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", width: "100%" }}>
          <View style={{ backgroundColor: loop ? undefined : "orange" }}>
            <Button title="Disable Loop" onPress={() => setIsLoop(false)} />
          </View>
          <View style={{ backgroundColor: !loop ? undefined : "orange" }}>
            <Button title="Enable Loop" onPress={() => setIsLoop(true)} />
          </View>
        </View>

        <View style={styles.ReactNativeInactivityContainer}>
          <ReactNativeInactivity
            isActive={true}
            onInactive={() => setInactivityTimeoutCount(inactivityTimeoutCount + 1)}
            timeForInactivity={1000}
            restartTimerOnActivityAfterExpiration={false}
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
