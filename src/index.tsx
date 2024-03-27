import { PanResponder, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface ReactNativeInactivityProps {
  timeForInactivity: number;
  isActive?: boolean;
  children: React.ReactNode;
  onInactive: () => void;
  style?: StyleProp<ViewStyle>;
}

const ReactNativeInactivity = ({
  children,
  isActive = true,
  onInactive,
  timeForInactivity,
  style,
}: ReactNativeInactivityProps) => {
  /*
   * Using useRef to hold setTimeout.
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
    /**
     * Don't want to start/reset the timer if it's not active.
     */
    if (!isActive) return;
    stopTimer();
    timerRef.current = setTimeout(() => setIsInactivityTimeCompleted(true), timeForInactivity);
  }, [isActive]);
  /*
   * In order not to steal any touches from the children components, this method
   * must return false.
   */
  const resetTimerForPanResponder = useCallback(() => {
    resetTimer();
    return false;
  }, [isActive]);
  /*
   * We will update the PanResponder every time isActive changes.
   */
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponderCapture: resetTimerForPanResponder,
        onMoveShouldSetPanResponderCapture: resetTimerForPanResponder,
        onPanResponderTerminationRequest: resetTimerForPanResponder,
      }),
    [isActive]
  );
  /*
   * When inactivity time is complete, calling onInactive.
   */
  useEffect(() => {
    if (!isInactivityTimeCompleted) return;
    onInactive();
    stopTimer();
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
    <View style={[styles.containerStyle, style]} collapsable={false} {...panResponder.panHandlers}>
      {children}
    </View>
  );
};

export default ReactNativeInactivity;

const styles = StyleSheet.create({
  containerStyle: { flex: 1 },
});
