import * as React from "react";

import { StyleSheet, View, Text, Button } from "react-native";
import ReactNativeInactivity from "react-native-inactivity";

const SomeCom = () => {
  const [num, setNum] = React.useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setNum(v => v + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <View>
      <Text style={{ fontWeight: "bold", fontSize: 25, color: "white" }}>{num}</Text>
    </View>
  );
};

export default function App() {
  const [inactivityTimeoutCount, setInactivityTimeoutCount] = React.useState(0);
  const [isActive, setIsActive] = React.useState(true);
  const [loop, setLoop] = React.useState(true);

  return (
    <View style={styles.container}>
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

      <View style={styles.ReactNativeInactivityContainer}>
        <ReactNativeInactivity
          isActive={isActive}
          onInactive={() => setInactivityTimeoutCount(inactivityTimeoutCount + 1)}
          timeForInactivity={2000}
          restartTimerOnActivityAfterExpiration={false}
          loop={loop}>
          <Button title="User Inactivity Area" color={"white"} />
          <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <Text style={{ fontWeight: "bold", fontSize: 25, color: "white" }}>
              Timeout Count: {inactivityTimeoutCount}
            </Text>
          </View>
          <SomeCom />
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
    marginTop: 20,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
