import { View, StyleSheet, Dimensions, Image, Text, Pressable, SafeAreaView } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { DotsLoader } from './DotsLoader';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationComplete: () => void;
}

export function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const blueBackgroundOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const blackLogoOpacity = useSharedValue(1);
  const whiteLogoOpacity = useSharedValue(0);
  const [animationFinished, setAnimationFinished] = useState(false);
  const [dotsAnimating, setDotsAnimating] = useState(true);
  const [dotsColor, setDotsColor] = useState('#000');
  
  // Replace the single text opacity with individual letter opacities
  const letterS = useSharedValue(0);
  const letterO = useSharedValue(0);
  const letterC = useSharedValue(0);
  const letterH = useSharedValue(0);
  const letterA = useSharedValue(0);
  const letterI = useSharedValue(0);
  
  // Keep the shared translateX value for overall movement
  const sochAiTextTranslateX = useSharedValue(0);

  // Adjust the translation values to maintain 5px gap
  const logoTranslateX = -85; // Move logo less far left
  const textTranslateX = 55; // Set smaller separation with 5px gap

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value }
    ],
  }));

  const backgroundStyles = useAnimatedStyle(() => ({
    opacity: blueBackgroundOpacity.value,
  }));

  const textStyles = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const buttonStyles = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));

  const blackLogoStyles = useAnimatedStyle(() => ({
    opacity: blackLogoOpacity.value,
    position: 'absolute',
    width: '100%',
    height: '100%',
  }));

  const whiteLogoStyles = useAnimatedStyle(() => ({
    opacity: whiteLogoOpacity.value,
    position: 'absolute',
    width: '80%',
    height: '100%',
    // backgroundColor: '#007BFF'
    // backgroundColor: '#ffffff',
  }));

  // Create individual animated styles for each letter
  const letterSStyle = useAnimatedStyle(() => ({
    opacity: letterS.value,
    transform: [{ translateX: sochAiTextTranslateX.value }],
  }));
  
  const letterOStyle = useAnimatedStyle(() => ({
    opacity: letterO.value,
    transform: [{ translateX: sochAiTextTranslateX.value }],
  }));
  
  const letterCStyle = useAnimatedStyle(() => ({
    opacity: letterC.value,
    transform: [{ translateX: sochAiTextTranslateX.value }],
  }));
  
  const letterHStyle = useAnimatedStyle(() => ({
    opacity: letterH.value,
    transform: [{ translateX: sochAiTextTranslateX.value }],
  }));
  
  const letterAStyle = useAnimatedStyle(() => ({
    opacity: letterA.value,
    transform: [{ translateX: sochAiTextTranslateX.value }],
  }));
  
  const letterIStyle = useAnimatedStyle(() => ({
    opacity: letterI.value,
    transform: [{ translateX: sochAiTextTranslateX.value }],
  }));

  const handleNavigateToTabs = () => {
    onAnimationComplete();
  };

  const completeAnimation = () => {
    setAnimationFinished(true);
    textOpacity.value = withTiming(1, { duration: 600 });
    buttonOpacity.value = withTiming(1, { duration: 600 });
  };

  // const hideDots = () => {
  //   setShowDots(false);
  // };

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    const startAnimation = () => {
      scale.value = withTiming(0.8, { duration: 500 });

      timer1 = setTimeout(() => {
        runOnJS(setDotsAnimating)(false);
        scale.value = withTiming(0.527, { duration: 300 });

        timer2 = setTimeout(() => {
          // Move logo less far left and text less far right for a tighter gap
          translateX.value = withTiming(logoTranslateX, { duration: 1000 });
          
          // Fade in each letter with a slight stagger
          letterS.value = withTiming(1, { duration: 300 });
          setTimeout(() => letterO.value = withTiming(1, { duration: 300 }), 50);
          setTimeout(() => letterC.value = withTiming(1, { duration: 300 }), 100);
          setTimeout(() => letterH.value = withTiming(1, { duration: 300 }), 150);
          setTimeout(() => letterA.value = withTiming(1, { duration: 300 }), 200);
          setTimeout(() => letterI.value = withTiming(1, { duration: 300 }), 250);
          
          sochAiTextTranslateX.value = withTiming(textTranslateX, { duration: 1000 });

          setTimeout(() => {
            // Make text disappear before starting the return journey
            setTimeout(() => letterI.value = withTiming(0, { duration: 250 }), 0);
            setTimeout(() => letterA.value = withTiming(0, { duration: 250 }), 100);
            setTimeout(() => letterH.value = withTiming(0, { duration: 250 }), 200);
            setTimeout(() => letterC.value = withTiming(0, { duration: 250 }), 300);
            setTimeout(() => letterO.value = withTiming(0, { duration: 250 }), 400);
            setTimeout(() => letterS.value = withTiming(0, { duration: 250 }), 500);
            
            // Delay the return movement slightly to ensure text is mostly faded out
            setTimeout(() => {
              // When logo moves back to center, make "SochAi" text move back to center
              translateX.value = withTiming(0, { duration: 1000 });
              sochAiTextTranslateX.value = withTiming(0, { duration: 1000 });
              
              setTimeout(() => {
                translateY.value = withTiming(
                  -150,
                  { duration: 800 },
                  (finished) => {
                    if (finished) {
                      blueBackgroundOpacity.value = withTiming(1, { duration: 800 });
                      blackLogoOpacity.value = withTiming(0, { duration: 400 });
                      runOnJS(setDotsColor)('#fff');
                      whiteLogoOpacity.value = withTiming(1, { duration: 400 }, () => {
                        runOnJS(setAnimationFinished)(true);
                        textOpacity.value = withTiming(1, { duration: 600 });
                        buttonOpacity.value = withTiming(1, { duration: 600 });
                      });
                    }
                  }
                );
              }, 800);
            }, 600);
          }, 1500);
        }, 300);
      }, 500);
    };

    const timer = setTimeout(startAnimation, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.blueBackground, backgroundStyles]} />
      
      {/* Position the text container relative to the center of the screen */}
      <View style={styles.sochAiContainer}>
        <Animated.Text style={[styles.sochAiLetter, letterSStyle]}>S</Animated.Text>
        <Animated.Text style={[styles.sochAiLetter, letterOStyle]}>o</Animated.Text>
        <Animated.Text style={[styles.sochAiLetter, letterCStyle]}>c</Animated.Text>
        <Animated.Text style={[styles.sochAiLetter, letterHStyle]}>h</Animated.Text>
        <Animated.Text style={[styles.sochAiLetter, letterAStyle, styles.redLetter]}>A</Animated.Text>
        <Animated.Text style={[styles.sochAiLetter, letterIStyle, styles.redLetter]}>i</Animated.Text>
      </View>
      
      <Animated.View style={[styles.logoContainer, animatedStyles]}>
        <View style={styles.logoWrapper}>
          <Animated.Image
            source={require('../../assets/images/LogoSplash.png')}
            style={[styles.logo, blackLogoStyles]}
            resizeMode="contain"
          />
          <Animated.Image
            source={require('../../assets/images/LogoSplashWhite.png')}
            style={[styles.logo, whiteLogoStyles]}
            resizeMode="contain"
          />
          <DotsLoader isAnimating={dotsAnimating} dotsColor={dotsColor} />
        </View>
      </Animated.View>

      {animationFinished && (
        <>
          <Animated.Image
            source={require('../../assets/images/splashimage.png')}
            style={[styles.splashImage, { transform: [{ translateY: translateY.value }] }]}
            resizeMode="contain"
          />
          <View style={styles.textContainer}>
            <Text style={styles.textheading}>AI Meets Jugaar</Text>
            <Text style={styles.textsubheading}>For Smarter Living in Asia</Text>

            <Text style={styles.paragrapgh}>Find life hacks, wellness wisdom, and parenting support, all curated for your lifestyle.</Text>
          </View>
          <Animated.View style={[styles.buttonContainer, buttonStyles]}>
            <Pressable
              style={styles.button}
              onPress={handleNavigateToTabs}
            >
              <View style={{ display: 'flex', flexDirection: 'row', gap: '10' }}>
                <Text style={styles.buttonText}>Ask SochAi</Text>
                <Image source={require('../../assets/images/Group.png')} />
              </View>
            </Pressable>
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  blueBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#007BFF',
  },
  logoContainer: {
    width: 167,
    height: 167,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  splashImage: {
    position: 'absolute',
    top: '0%',
    width: '90%',
    height: '100%',
  },
  textContainer: {
    width: 370,
    height: 140,
    left: 30,
    top: 70,
  },
  textheading: {
    color: '#ffffff',
    fontSize: 38.96,
    fontWeight: 700,
    letterSpacing: 0
  },
  textsubheading: {
    fontSize: 27,
    letterSpacing: 0,
    fontWeight: 500,
    color: '#ffffff'
  },
  paragrapgh: {
    top: 25,
    width: 300,
    fontWeight: '400',
    fontSize: 18,
    color: '#ffffff'
  },
  welcomeText: {
    width: '80%',
    height: 140,
    position: 'absolute',
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'left',
    top: '65%',
    gap: 38,
    lineHeight: 32,
  },
  buttonContainer: {
    position: 'absolute',
    top: '85%',
    width: 330,
    bottom: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#007BFF',
    fontSize: 18,
    fontWeight: '600',
  },
  sochAiContainer: {
    position: 'absolute',
    flexDirection: 'row',
    zIndex: 10,
    // Position the container more precisely
    alignItems: 'center',
    justifyContent: 'center',
    // Add some height to ensure proper vertical alignment
    height: 40,
  },
  sochAiLetter: {
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  // New style for red letters
  redLetter: {
    color: '#FF0000',
  },
});

// import { View, StyleSheet, Dimensions, Image, Text, Pressable } from 'react-native';
// import Animated, {
//   useAnimatedStyle,
//   withTiming,
//   useSharedValue,
//   runOnJS,
// } from 'react-native-reanimated';
// import { useEffect, useState } from 'react';
// import { DotsLoader } from './DotsLoader';

// const { width, height } = Dimensions.get('window');

// interface SplashScreenProps {
//   onAnimationComplete: () => void;
// }

// export function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
//   const scale = useSharedValue(1);
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);
//   const blueBackgroundOpacity = useSharedValue(0);
//   const textOpacity = useSharedValue(0);
//   const buttonOpacity = useSharedValue(0);
//   const blackLogoOpacity = useSharedValue(1);
//   const whiteLogoOpacity = useSharedValue(0);
//   const [showDots, setShowDots] = useState(true);
//   const [animationFinished, setAnimationFinished] = useState(false);

//   const animatedStyles = useAnimatedStyle(() => ({
//     transform: [
//       { scale: scale.value },
//       { translateX: translateX.value },
//       { translateY: translateY.value }
//     ],
//   }));

//   const backgroundStyles = useAnimatedStyle(() => ({
//     opacity: blueBackgroundOpacity.value,
//   }));

//   const textStyles = useAnimatedStyle(() => ({
//     opacity: textOpacity.value,
//   }));

//   const buttonStyles = useAnimatedStyle(() => ({
//     opacity: buttonOpacity.value,
//   }));

//   const blackLogoStyles = useAnimatedStyle(() => ({
//     opacity: blackLogoOpacity.value,
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   }));

//   const whiteLogoStyles = useAnimatedStyle(() => ({
//     opacity: whiteLogoOpacity.value,
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   }));

//   const handleNavigateToTabs = () => {
//     onAnimationComplete();
//   };

//   const completeAnimation = () => {
//     setAnimationFinished(true);
//     textOpacity.value = withTiming(1, { duration: 600 });
//     buttonOpacity.value = withTiming(1, { duration: 600 });
//   };

//   const hideDots = () => {
//     setShowDots(false);
//   };

//   useEffect(() => {
//     let timer1: NodeJS.Timeout;
//     let timer2: NodeJS.Timeout;

//     const startAnimation = () => {
//       scale.value = withTiming(0.8, { duration: 500 });

//       timer1 = setTimeout(() => {
//         scale.value = withTiming(0.527, { duration: 300 });
//         setShowDots(false);

//         timer2 = setTimeout(() => {
//           translateX.value = withTiming(-80, { duration: 500 });

//           setTimeout(() => {
//             translateX.value = withTiming(0, { duration: 500 });

//             setTimeout(() => {
//               translateY.value = withTiming(-150, { duration: 800 });
//               blueBackgroundOpacity.value = withTiming(1, { duration: 800 });
//               blackLogoOpacity.value = withTiming(0, { duration: 400 });
//               whiteLogoOpacity.value = withTiming(1, { duration: 400 });

//               setTimeout(() => {
//                 setAnimationFinished(true);
//                 textOpacity.value = withTiming(1, { duration: 600 });
//                 buttonOpacity.value = withTiming(1, { duration: 600 });
//               }, 800);
//             }, 500);
//           }, 500);
//         }, 300);
//       }, 500);
//     };

//     const timer = setTimeout(startAnimation, 2000);

//     return () => {
//       clearTimeout(timer);
//       clearTimeout(timer1);
//       clearTimeout(timer2);
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[styles.blueBackground, backgroundStyles]} />
//       <Animated.View style={[styles.logoContainer, animatedStyles]}>
//         <View style={styles.logoWrapper}>
//           <Animated.Image
//             source={require('../../assets/images/LogoSplash.png')}
//             style={[styles.logo, blackLogoStyles]}
//             resizeMode="contain"
//           />
//           <Animated.Image
//             source={require('../../assets/images/LogoSplashWhite.png')}
//             style={[styles.logo, whiteLogoStyles]}
//             resizeMode="contain"
//           />
//           <DotsLoader />
//         </View>
//       </Animated.View>

//       {/* <Animated.Text style={[styles.welcomeText, textStyles]}>
//         AI Meets Jugaar{'\n'}
//         We are thrilled for you to be here
//       </Animated.Text> */}

//       {animationFinished && (
//         <>
//           <View style={styles.textContainer}>
//             <Text style={styles.textheading}>AI Meets Jugaar</Text>
//             <Text style={styles.textsubheading}>For Smarter Living in Asia</Text>

//             <Text style={styles.paragrapgh}>Find life hacks, wellness wisdom, and parenting support, all curated for your lifestyle.</Text>
//           </View>
//           <Animated.View style={[styles.buttonContainer, buttonStyles]}>
//             <Pressable
//               style={styles.button}
//               onPress={handleNavigateToTabs}
//             >
//               <View style={{ display: 'flex', flexDirection: 'row', gap: '10' }}>
//                 <Text style={styles.buttonText}>Ask SochAi</Text>
//                 <Image source={require('../../assets/images/Group.png')} />
//               </View>
//             </Pressable>
//           </Animated.View>
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     width: width,
//     height: height,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 1000,
//   },
//   blueBackground: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#0066FF',
//   },
//   logoContainer: {
//     width: 167,
//     height: 167,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoWrapper: {
//     position: 'relative',
//     width: '100%',
//     height: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     width: '100%',
//     height: '100%',
//   },
//   textContainer: {
//     width: 370,
//     height: 140,
//     left: 30,

//   },
//   textheading: {
//     color: '#ffffff',
//     fontSize: 38.96,
//     fontWeight: 700,
//     // lineHeight: 100,
//     letterSpacing: 0
//   },
//   textsubheading: {
//     fontSize: 27,
//     // lineHeight: 100,
//     letterSpacing: 0,
//     fontWeight: 500,
//     color: '#ffffff'
//   },
//   paragrapgh: {
//     top: 25,
//     width: 300,
//     fontWeight: 400,
//     size: 18,
//     color: '#ffffff'
//   },
//   welcomeText: {
//     width: '80%',
//     height: 140,
//     position: 'absolute',
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: '600',
//     textAlign: 'left',
//     top: '65%',
//     gap: 38,
//     lineHeight: 32,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     top: '80%',
//     width: 330,
//     bottom: 20,
//   },
//   button: {
//     backgroundColor: '#fff',
//     paddingVertical: 20,
//     paddingHorizontal: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#007BFF',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
// import Animated, {
//   useAnimatedStyle,
//   withTiming,
//   useSharedValue,
//   runOnJS,
//   withSequence,
// } from 'react-native-reanimated';
// import { useEffect } from 'react';
// import { router } from 'expo-router';
// import { DotsLoader } from './DotsLoader';

// const { width, height } = Dimensions.get('window');

// interface SplashScreenProps {
//   onAnimationComplete: () => void;
// }

// export function SplashScreen({ onAnimationComplete }: SplashScreenProps) {
//   const scale = useSharedValue(1);
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);
//   const blueBackgroundOpacity = useSharedValue(0);
//   const textOpacity = useSharedValue(0);
//   const blackLogoOpacity = useSharedValue(1);
//   const whiteLogoOpacity = useSharedValue(0);

//   const animatedStyles = useAnimatedStyle(() => ({
//     transform: [
//       { scale: scale.value },
//       { translateX: translateX.value },
//       { translateY: translateY.value }
//     ],
//   }));

//   const backgroundStyles = useAnimatedStyle(() => ({
//     opacity: blueBackgroundOpacity.value,
//   }));

//   const textStyles = useAnimatedStyle(() => ({
//     opacity: textOpacity.value,
//   }));

//   const blackLogoStyles = useAnimatedStyle(() => ({
//     opacity: blackLogoOpacity.value,
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   }));

//   const whiteLogoStyles = useAnimatedStyle(() => ({
//     opacity: whiteLogoOpacity.value,
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//   }));

//   const handleNavigate = () => {
//     onAnimationComplete();
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       scale.value = withTiming(0.8, { duration: 500 }, (finished) => {
//         if (finished) {
//           scale.value = withTiming(0.527, { duration: 300 }, (finished) => {
//             if (finished) {
//               translateX.value = withTiming(-80, { duration: 500 }, (finished) => {
//                 if (finished) {
//                   translateX.value = withTiming(0, { duration: 500 }, (finished) => {
//                     if (finished) {
//                       translateY.value = withTiming(-150, { duration: 800 });
//                       blueBackgroundOpacity.value = withTiming(1, { duration: 800 });
//                       blackLogoOpacity.value = withTiming(0, { duration: 400 });
//                       whiteLogoOpacity.value = withTiming(1, { duration: 400 });
//                       setTimeout(() => {
//                         textOpacity.value = withTiming(1, { duration: 600 }, (finished) => {
//                           if (finished) {
//                             setTimeout(() => {
//                               runOnJS(handleNavigate)();
//                             }, 1500);
//                           }
//                         });
//                       }, 400);
//                     }
//                   });
//                 }
//               });
//             }
//           });
//         }
//       });
//     }, 5000);

//     return () => clearTimeout(timer);
//   }, [5000]);

//   return (
//     <View style={styles.container}>
//       <Animated.View style={[styles.blueBackground, backgroundStyles]} />
//       <Animated.View style={[styles.logoContainer, animatedStyles]}>
//         <View style={styles.logoWrapper}>
//           <Animated.Image
//             source={require('../../assets/images/LogoSplash.png')}
//             style={[styles.logo, blackLogoStyles]}
//             resizeMode="contain"
//           />
//           <Animated.Image
//             source={require('../../assets/images/LogoSplashWhite.png')}
//             style={[styles.logo, whiteLogoStyles]}
//             resizeMode="contain"
//           />
//           <DotsLoader />
//         </View>
//       </Animated.View>
//       <Animated.Text style={[styles.welcomeText, textStyles]}>
//         Hello SochAI{'\n'}
//         We are thrilled for you to be here
//       </Animated.Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     width: width,
//     height: height,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     zIndex: 1000,
//   },
//   blueBackground: {
//     position: 'absolute',
//     width: '100%',
//     height: '100%',
//     backgroundColor: '#0066FF',
//   },
//   logoContainer: {
//     width: 167,
//     height: 167,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logoWrapper: {
//     position: 'relative',
//     width: '100%',
//     height: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   logo: {
//     width: '100%',
//     height: '100%',
//   },
//   welcomeText: {
//     position: 'absolute',
//     color: '#fff',
//     fontSize: 24,
//     fontWeight: '600',
//     textAlign: 'center',
//     top: '65%',
//     lineHeight: 32,
//   },
// });
