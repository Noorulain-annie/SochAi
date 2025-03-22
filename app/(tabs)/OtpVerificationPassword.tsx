import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'expo-router';

const OtpVerification = () => {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', ''])
    const inputs = useRef<(TextInput | null)[]>([])
    const [focusedIndex, setFocusedIndex] = useState(null)

    const handleChange = (value, index) => {
        let newOtp = [...otp]
        newOtp[index] = value

        // Move to the next input if a digit is entered
        if (value && index < 3) {
            inputs.current[index + 1].focus()
        }

        setOtp(newOtp)
    }

    const handleKeyPress = (e, index) => {
        // Handle backspace to go to previous input
        if (e.nativeEvent.key === 'Backspace' && index > 0) {
            inputs.current[index - 1].focus()
        }
    }

    const handleResend = () => {
        console.log('Resend OTP')
    }

    // Redirect to email verification screen when OTP is fully entered
    useEffect(() => {
        if (otp.every((digit) => digit !== '')) {
            router.push('/NewPassword')
            setOtp(['', '', '', '']);
        }
    }, [otp])

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.wrapper}>
                {/* Logo and Arrow Row */}
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 60 }}>
                    <Image style={{ marginTop: 10 }} source={require('../../assets/images/red_logo.png')} />
                    <Image style={{ marginLeft: 160 }} source={require('../../assets/images/arrow_image.png')} />
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>OTP Verification</Text>
                    <Text style={styles.subtitle}>
                        Enter the OTP code that we just sent to email
                        <Text style={{ color: 'black', fontWeight: '500' }}> anthony@gmail.com</Text>
                    </Text>
                </View>

                {/* OTP Input Fields */}
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputs.current[index] = ref)}
                            style={[
                                styles.input,
                                focusedIndex === index && styles.inputFocused,
                            ]}
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={(value) => handleChange(value, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                            onFocus={() => setFocusedIndex(index)} // Track focus
                            onBlur={() => setFocusedIndex(null)} // Reset focus on blur
                        />
                    ))}
                </View>

                {/* Resend Countdown */}
                <Text style={styles.resendText}>Didn’t receive email?</Text>
                <TouchableOpacity onPress={handleResend}>
                    <Text style={styles.resendLink}>
                        You can resend code in <Text style={{ color: '#007BFF' }}>55s</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default OtpVerification

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
        fontSize: 14,
        color: '#AEAEAE',
        marginBottom: 30,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 20,
        marginHorizontal: 5,
        color: '#000',
    },
    resendText: {
        color: '#AEAEAE',
        marginTop: 200,
        justifyContent: 'center',
        textAlign: 'center',
    },
    resendLink: {
        color: '#007BFF',
        fontWeight: '600',
        marginTop: 5,
        justifyContent: 'center',
        textAlign: 'center',
    },
    inputFocused: {
        borderColor: '#007BFF',
        borderWidth: 2,
    },
})


// import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
// import React, { useRef, useState } from 'react'
// import { useRouter } from 'expo-router';

// const OtpVerification = () => {
//     const router = useRouter();
//     const [otp, setOtp] = useState(['', '', '', ''])
//     const inputs = useRef<(TextInput | null)[]>([])
//     const [focusedIndex, setFocusedIndex] = useState(null)

//     const handleChange = (value, index) => {
//         let newOtp = [...otp]
//         newOtp[index] = value

//         // Move to next input if a digit is entered
//         if (value && index < 3) {
//             inputs.current[index + 1].focus()
//         }

//         setOtp(newOtp)
//     }

//     const handleKeyPress = (e, index) => {
//         // Handle backspace to go to previous input
//         if (e.nativeEvent.key === 'Backspace' && index > 0) {
//             inputs.current[index - 1].focus()
//         }
//     }

//     const handleResend = () => {
//         console.log('Resend OTP')
//     }


//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <View style={styles.wrapper}>
//                 {/* Logo and Arrow Row */}
//                 <View style={{ display: 'flex', flexDirection: 'row', marginTop: 60 }}>
//                     <Image style={{ marginTop: 10 }} source={require('../../assets/images/red_logo.png')} />
//                     <Image style={{ marginLeft: 160 }} source={require('../../assets/images/arrow_image.png')} />
//                 </View>

//                 <View style={styles.container}>
//                     <Text style={styles.title}>OTP Verification</Text>
//                     <Text style={styles.subtitle}>
//                         Enter the OTP code that we just sent to email
//                         <Text style={{ color: 'black', fontWeight: 500 }}> anthony@gmail.com</Text>
//                     </Text>
//                 </View>

//                 {/* otp */}

//                 {/* OTP Input Fields */}
//                 <View style={styles.otpContainer}>
//                     {otp.map((digit, index) => (
//                         <TextInput
//                             key={index}
//                             ref={(ref) => (inputs.current[index] = ref)}
//                             style={[styles.input,
//                             focusedIndex === index && styles.inputFocused,]
//                             }
//                             keyboardType="numeric"
//                             maxLength={1}
//                             value={digit}
//                             onChangeText={(value) => handleChange(value, index)}
//                             onKeyPress={(e) => handleKeyPress(e, index)}
//                             onFocus={() => setFocusedIndex(index)} // Track focus
//                             onBlur={() => setFocusedIndex(null)} // Reset focus on blur
//                         />
//                     ))}
//                 </View>

//                 {/* Resend Countdown */}
//                 <Text style={styles.resendText}>Didn’t receive email?</Text>
//                 <TouchableOpacity onPress={handleResend}>
//                     <Text style={styles.resendLink}>You can resend code in <Text style={{ color: '#007BFF' }}>55s</Text></Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     )
// }

// export default OtpVerification

// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     wrapper: {
//         marginLeft: 31,
//         marginRight: 31,
//     },
//     container: {
//         marginTop: 40,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     subtitle: {
//         fontSize: 14,
//         color: '#AEAEAE',
//         marginBottom: 30,
//     },
//     otpContainer: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         marginBottom: 20,
//     },
//     input: {
//         width: 50,
//         height: 50,
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 10,
//         textAlign: 'center',
//         fontSize: 20,
//         marginHorizontal: 5,
//         color: '#000',
//     },
//     resendText: {
//         color: '#AEAEAE',
//         marginTop: 200,
//         justifyContent: 'center',
//         textAlign: 'center',
//     },
//     resendLink: {
//         color: '#007BFF',
//         fontWeight: '600',
//         marginTop: 5,
//         justifyContent: 'center',
//         textAlign: 'center',
//     },
//     inputFocused: {
//         borderColor: '#007BFF',
//         borderWidth: 2,
//     },


// })