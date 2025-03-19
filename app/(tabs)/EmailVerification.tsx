import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

const EmailVerification = () => {
    const router = useRouter();
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false)

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.wrapper}>
                {/* Logo and Arrow Row */}
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 60 }}>
                    <Image style={{ marginTop: 10 }} source={require('../../assets/images/red_logo.png')} />
                    <Image style={{ marginLeft: 160 }} source={require('../../assets/images/arrow_image.png')} />
                </View>

                {/* Login Form */}
                <View style={styles.container}>
                    <Text style={styles.title}>Credentials</Text>
                    <Text style={styles.subtitle}>
                        Genius say Jugaar tak - <Text style={{ fontWeight: '500' }}>Smarter Together</Text>
                    </Text>

                    <Text style={styles.label}>Username/email</Text>
                    <TextInput
                        style={[styles.input, isEmailFocused && styles.inputFocused]}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        onFocus={() => setIsEmailFocused(true)}
                        onBlur={() => setIsEmailFocused(false)}
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={[styles.input, isPasswordFocused && styles.inputFocused]}
                        placeholder="Enter your password"
                        secureTextEntry
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                    />

                    <Text style={styles.label}>Confirm Password</Text>
                    <TextInput
                        style={[styles.input, isConfirmPasswordFocused && styles.inputFocused]}
                        placeholder="Re-Enter your password"
                        secureTextEntry
                        onFocus={() => setIsConfirmPasswordFocused(true)}
                        onBlur={() => setIsConfirmPasswordFocused(false)}
                    />

                    <TouchableOpacity onPress={() => router.push('/LoginScreen')} style={styles.button}>
                        <Text style={styles.buttonText}>Start Soch</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default EmailVerification

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    wrapper: {
        marginLeft: 31,
        marginRight: 31,
    },
    container: {
        marginTop: 40,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#AEAEAE',
        marginBottom: 30,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 13,
        marginBottom: 20,
    },
    inputFocused: {
        borderColor: '#007BFF', // Highlight color on focus
        borderWidth: 2,
    },
    forgotPassword: {
        color: '#007BFF',
        textAlign: 'right',
        marginBottom: 20,
    },
    button: {
        marginTop: 90,
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})