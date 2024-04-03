import * as React from "react";

import { Button, StyleSheet, Text, View } from "react-native";
import Scenario1 from "./components/Scenario1";
import Scenario2 from "./components/Scenario2";
import Scenario3 from "./components/Scenario3";
import Scenario4 from "./components/Scenario4";

export default function App() {
  const [scenario, setScenario] = React.useState<null | number>(null);

  const goBack = () => setScenario(null);

  if (scenario) {
    if (scenario === 1) {
      return <Scenario1 goBack={goBack} />;
    } else if (scenario === 2) {
      return <Scenario2 goBack={goBack} />;
    } else if (scenario === 3) {
      return <Scenario3 goBack={goBack} />;
    } else if (scenario === 4) {
      return <Scenario4 goBack={goBack} />;
    }
  }
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20, textAlign: "center" }}>
          Please test all the Scenarios, all must should work
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.buttonsStyle}>
          <Button title="Scenario 1" onPress={() => setScenario(1)} />
          <Button title="Scenario 2" onPress={() => setScenario(2)} />
          <Button title="Scenario 3" onPress={() => setScenario(3)} />
          <Button title="Scenario 4" onPress={() => setScenario(4)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 90,
  },
  buttonsStyle: {
    marginHorizontal: 20,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
