import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface DotsLoaderProps {
  isAnimating?: boolean;
  dotsColor?: string;
}

export function DotsLoader({ isAnimating = true, dotsColor = '#000' }: DotsLoaderProps) {
  const dot1 = useSharedValue(0);
  const dot2 = useSharedValue(0);
  const dot3 = useSharedValue(0);

  useEffect(() => {
    const animationDuration = 400;

    if (isAnimating) {
      // Animate dots with a sequence and slight delay between each
      dot1.value = withRepeat(
        withSequence(
          withTiming(-6, { duration: animationDuration }),
          withTiming(0, { duration: animationDuration })
        ),
        -1
      );

      setTimeout(() => {
        dot2.value = withRepeat(
          withSequence(
            withTiming(-6, { duration: animationDuration }),
            withTiming(0, { duration: animationDuration })
          ),
          -1
        );
      }, animationDuration / 3);

      setTimeout(() => {
        dot3.value = withRepeat(
          withSequence(
            withTiming(-6, { duration: animationDuration }),
            withTiming(0, { duration: animationDuration })
          ),
          -1
        );
      }, (animationDuration / 3) * 2);
    } else {
      // Stop animation and reset dots to straight line
      dot1.value = withTiming(0, { duration: 300 });
      dot2.value = withTiming(0, { duration: 300 });
      dot3.value = withTiming(0, { duration: 300 });
    }
  }, [isAnimating]);

  const dot1Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot1.value }],
  }));

  const dot2Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot2.value }],
  }));

  const dot3Style = useAnimatedStyle(() => ({
    transform: [{ translateY: dot3.value }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.dot, dot1Style, { backgroundColor: dotsColor }]} />
      <Animated.View style={[styles.dot, dot2Style, { backgroundColor: dotsColor }]} />
      <Animated.View style={[styles.dot, dot3Style, { backgroundColor: dotsColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    left: '50%',
    top: '50%',
    gap: 7.5,
    width: 66.89,
    height: 17.29,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [
      { translateX: -33.445 },
      { translateY: -8.645 },
    ],
  },
  dot: {
    width: 17.29,
    height: 17.29,
    borderRadius: 10,
  },
});

