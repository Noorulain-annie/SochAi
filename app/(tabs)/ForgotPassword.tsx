import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';

const ForgotPassword = () => {
    const router = useRouter();
    const [isEmailFocused, setIsEmailFocused] = useState(false)

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
                    <Text style={styles.title}>Reset Password</Text>
                    <Text style={styles.subtitle}>
                        Please enter your email and we will send an OTP
                        code in the next step to reset your password
                    </Text>

                    <Text style={styles.label}>Username/email</Text>
                    <TextInput
                        style={[styles.input, isEmailFocused && styles.inputFocused]}
                        placeholder="anthony@gofetchst.com"
                        keyboardType="email-address"
                        onFocus={() => setIsEmailFocused(true)}
                        onBlur={() => setIsEmailFocused(false)}
                    />
                    <TouchableOpacity onPress={() => router.push('/OtpVerification')} style={styles.button}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ForgotPassword

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
        marginTop: 240,
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