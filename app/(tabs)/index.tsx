
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const SignupScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={{ marginTop: 30, marginLeft: 220, }} source={require('../../assets/images/arrow_image.png')} />
      </View>
      {/* logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/images/LoginLogo.png')} />
        <Text style={styles.buttonText}>
          Soch
          <Text style={styles.redText}>Ai</Text>
        </Text>
      </View>

      {/* welcome text */}
      <View style={styles.welcomeTextContainer}>
        <Text style={styles.textheading}>Welcome Back!</Text>
        <Text style={styles.textsubheading}>Genius say Jugaar tak - Smarter Together</Text>
      </View>

      {/* login buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonWrapper}>
          <View style={styles.buttonRow}>
            <Image source={require('../../assets/images/logo_facebook.png')} />
            <Text style={{ color: '#383838' }}>Continue with Facebook</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonWrapper}>
          <View style={styles.buttonRow}>
            <Image source={require('../../assets/images/logo_google.png')} />
            <Text style={{ color: '#383838' }}>Continue with Google</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonWrapper}>
          <View style={styles.buttonRow}>
            <Image source={require('../../assets/images/logo_apple.png')} />
            <Text style={{ color: '#383838' }}>Continue with Apple</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        <Text style={{ color: '#AEAEAE' }}>or</Text>
      </View>

      <TouchableOpacity onPress={() => router.push('/LoginScreen')}>
        <View style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20, height: 50, paddingHorizontal: 10,
          paddingVertical: 7, backgroundColor: '#007BFF',
          marginHorizontal: 31, borderRadius: 12 // Add this line

        }}>
          <Text style={{ color: '#ffffff', fontWeight: 700 }}>Login with username</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 15 }}>
        <Text style={{ color: '#AEAEAE' }}>Create a </Text>
        <Text style={{ color: '#007BFF', fontWeight: 700 }}>Free Account</Text>
      </TouchableOpacity>



    </SafeAreaView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 5,
    flexDirection: 'row',
    gap: 5,
  },
  buttonText: {
    color: 'black',
    fontSize: 42.85,
    fontWeight: '700',
  },
  redText: {
    color: 'red',
  },
  welcomeTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 369,
    height: 63,
    marginTop: 35,
    marginHorizontal: 31,
    gap: 5,
  },
  textheading: {
    fontSize: 30.96,
    fontWeight: '700',
    color: 'black',
  },
  textsubheading: {
    color: '#AEAEAE',
    width: 309,
    height: 25,
    fontSize: 15.96,
    fontWeight: '400',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    marginTop: 40,
  },
  buttonWrapper: {
    width: 369,
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 7,
    justifyContent: 'center'
  },
});

