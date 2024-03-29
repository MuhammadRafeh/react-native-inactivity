<h1 align="center">react-native-inactivity</h1>

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger) ![npm](https://img.shields.io/npm/v/react-native-inactivity)

Component that alerts when the user is inactive (i.e. when the App surface hasn't been touched for X ms)

## Why this Module?

By utilizing this module, you can activate or deactivate the timer, loop, and access numerous other features. Most importantly, it remains updated.

## Installation

```sh
npm install react-native-inactivity
```

or

```sh
yarn add react-native-inactivity
```

## Usage

```tsx
import ReactNativeInactivity from "react-native-inactivity";

export default function InactivityTimer() {
  const [inactivityTimeoutCount, setInactivityTimeoutCount] = React.useState(0);
  const [isActive, __] = React.useState(true);
  const [loop, _] = React.useState(true);
  return (
    <View style={{ flex: 1 }}>
      <ReactNativeInactivity
        isActive={isActive}
        onInactive={() => setInactivityTimeoutCount(inactivityTimeoutCount + 1)}
        timeForInactivity={2000}
        restartTimerOnActivityAfterExpiration={false}
        loop={loop}
        style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "grey" }}>
        <Button title="User Inactivity Area" color={"white"} />
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
          <Text style={{ fontWeight: "bold", fontSize: 25, color: "white" }}>
            Timeout Count: {inactivityTimeoutCount}
          </Text>
        </View>
      </ReactNativeInactivity>
    </View>
  );
}
```

```typescript
interface ReactNativeInactivityProps {
  /**
   * Number of milliseconds after which the view is considered inactive.
   * It defaults to `2000`.
   */
  timeForInactivity?: number;
  /**
   * This is used to toggle the timer on or off.
   * When set to `false`, the timer will be stopped.
   * When set to `true`, the timer will be reset, restarted,
   * and after expiration, onInactive will be called.
   * It defaults to `true`.
   */
  isActive?: boolean;
  /**
   * Children components to embed inside ReactNativeInactivity's View. If the
   * user does not press the children component for timeForInactivity ms
   * and the timer is active, we will call the onInactive callback.
   */
  children: React.ReactNode;
  /**
   * Callback will trigger when ReactNativeInactivity's View isn't touched for more than
   * `timeForInactivity` milliseconds.
   * This function will only be called once every time after the timer expires.
   */
  onInactive: () => void;
  /**
   * If set to false then the timer will not restart
   * after the view is considered inactive.
   * It defaults to `true`.
   */
  loop?: boolean;
  /**
   * If set to true, the timer will restart when the user presses the
   * ReactNativeInactivity's View after it becomes inactive.
   * It will only work if the `loop` prop is set to `false`.
   * It defaults to `false`.
   */
  restartTimerOnActivityAfterExpiration?: boolean;
  /**
   * Optional custom style for ReactNativeInactivity's View.
   * It defaults to `{ flex: 1 }`.
   */
  style?: StyleProp<ViewStyle>;
}
```

## Difference b/w loop & restartTimerOnActivityAfterExpiration Props

### `loop`

- **Type**: Boolean
- **Default**: `true`
- **Description**: On `true`, the module will continuously loop the timer after it reaches expiration.

### `restartTimerOnActivityAfterExpiration`

- **Type**: Boolean
- **Default**: `false`
- **Description**: On `true`, the timer will restart upon detecting any activity after it has expired. This prop is useful in scenarios where you want the timer to reset if any activity occurs after it expires. To make this work, `loop` must be set to `false`.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

## 🦄 Show your support

Give a ⭐️ if this project helped or inspired you!
