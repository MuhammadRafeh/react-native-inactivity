import { PanResponder, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

const ReactNativeInactivity = ({
  timeForInactivity = 2000,
  isActive = true,
  children,
  onInactive,
  loop = true,
  restartTimerOnActivityAfterExpiration = false,
  style,
}: ReactNativeInactivityProps) => {
  /*
   * Using useRef to hold setTimeout. If it's null then it means that the timer is stopped.
   */
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  /*
   * We'll use this to call onInactive.
   */
  const [isInactivityTimeCompleted, setIsInactivityTimeCompleted] = useState<boolean>(false);
  /*
   * Use to stop timer.
   */
  const stopTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);
  /*
   * This method will be called whenever we start/reset our timer or detect any touches.
   */
  const resetTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setTimeout(() => setIsInactivityTimeCompleted(true), timeForInactivity);
  }, []);
  /*
   * In order not to steal any touches from the children components, this method
   * must return false.
   */
  const resetTimerForPanResponder = useCallback(() => {
    /*
     * If user don't want to restart timer if he/she interacts with the app after
     * the view is considered inactive and also loop is false then we simple want
     * to return from the function and will not restart/reset the timer
     */
    if (loop === false && !restartTimerOnActivityAfterExpiration && timerRef.current === null) return false;
    resetTimer();
    return false;
  }, [loop, restartTimerOnActivityAfterExpiration]);
  /*
   * PanResponder will never be updated
   */
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponderCapture: resetTimerForPanResponder,
        onMoveShouldSetPanResponderCapture: resetTimerForPanResponder,
        onPanResponderTerminationRequest: resetTimerForPanResponder,
      }),
    [loop, restartTimerOnActivityAfterExpiration]
  );
  /*
   * When inactivity time is complete, calling onInactive and based on loop managing the timer again.
   */
  useEffect(() => {
    if (!isInactivityTimeCompleted) return;
    onInactive();
    if (loop) resetTimer();
    else stopTimer();
    setIsInactivityTimeCompleted(false);
  }, [isInactivityTimeCompleted, onInactive]);
  /*
   * Managing the timer based on isActive.
   */
  useEffect(() => {
    if (isActive) resetTimer();
    else stopTimer();
  }, [isActive]);
  /*
   * Performing cleanup on component unmount, cleaning timeout.
   */
  useEffect(() => {
    return () => stopTimer();
  }, []);

  return (
    <View style={[styles.containerStyle, style]} collapsable={false} {...(isActive ? panResponder.panHandlers : null)}>
      {children}
    </View>
  );
};

export default ReactNativeInactivity;

const styles = StyleSheet.create({
  containerStyle: { flex: 1 },
});
