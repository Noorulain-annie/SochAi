import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';

const AreaOfInterest = () => {
    const router = useRouter();
    const topicsList = [
        "Parenting",
        "Health & Fitness",
        "Education",
        "Travel",
        "DIY & Life Hacks",
        "Mental Health",
        "Nutrition & Diet",
        "Home Improvement",
        "Technology",
        "Relationships",
        "Personal Finance",
        "Beauty & Skincare",
    ];

    const [selectedTopics, setSelectedTopics] = useState([]);

    const toggleTopic = (topic) => {
        if (selectedTopics.includes(topic)) {
            setSelectedTopics(selectedTopics.filter((t) => t !== topic));
        } else if (selectedTopics.length < 5) {
            setSelectedTopics([...selectedTopics, topic]);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.wrapper}>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 60 }}>
                    <Image style={{ marginTop: 10 }} source={require('../../assets/images/red_logo.png')} />
                    <Image style={{ marginLeft: 160 }} source={require('../../assets/images/arrow_image.png')} />
                </View>

                <View style={styles.container}>
                    <Text style={styles.title}>What are 5 topics you enjoy talking about</Text>
                    <View style={styles.topicsContainer}>
                        {topicsList.map((topic, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.topic, selectedTopics.includes(topic) && styles.topicSelected]}
                                onPress={() => toggleTopic(topic)}
                            >
                                <Text style={[styles.topicText, selectedTopics.includes(topic) && styles.topicTextSelected]}>{topic}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity onPress={() => router.push('/Chat')} style={styles.button}>
                        <Text style={styles.buttonText}>Start Soch</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default AreaOfInterest;

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
        marginTop: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    topicsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5,
        marginBottom: 20,
    },
    topic: {
        borderWidth: 1,
        borderColor: '#007BFF',
        paddingVertical: 8,
        paddingHorizontal: 13,
        borderRadius: 20,
    },
    topicSelected: {
        backgroundColor: '#007BFF',
    },
    topicText: {
        color: '#007BFF',
        fontSize: 16,
    },
    topicTextSelected: {
        color: '#fff',
        fontWeight: '700',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 80,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});


// import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
// import React, { useState } from 'react'
// import { useRouter } from 'expo-router';

// const AreaOfInterest = () => {
//     const router = useRouter();
//     const topicsList = [
//         "Parenting",
//         "Health & Fitness",
//         "Education",
//         "Travel",
//         "DIY & Life Hacks",
//         "Mental Health",
//         "Nutrition & Diet",
//         "Home Improvement",
//         "Technology",
//         "Relationships",
//         "Personal Finance",
//         "Beauty & Skincare",
//     ];

//     const [selectedTopics, setSelectedTopics] = useState([]);

//     const toggleTopic = (topic) => {
//         if (selectedTopics.includes(topic)) {
//             setSelectedTopics(selectedTopics.filter((t) => t !== topic));
//         } else if (selectedTopics.length < 5) {
//             setSelectedTopics([...selectedTopics, topic]);
//         }
//     };



//     return (
//         <SafeAreaView style={styles.safeArea}>
//             <View style={styles.wrapper}>
//                 {/* Logo and Arrow Row */}
//                 <View style={{ display: 'flex', flexDirection: 'row', marginTop: 60 }}>
//                     <Image style={{ marginTop: 10 }} source={require('../../assets/images/red_logo.png')} />
//                     <Image style={{ marginLeft: 160 }} source={require('../../assets/images/arrow_image.png')} />
//                 </View>


//                 {/* Login Form */}
//                 <View style={styles.container}>
//                     <Text style={styles.title}>What are 5 topics you enjoy talking about</Text>


//                     <TouchableOpacity style={styles.button}>
//                         <Text style={styles.buttonText}>Start Soch</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </SafeAreaView>
//     )
// }

// export default AreaOfInterest

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
//         fontSize: 30,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     subtitle: {
//         fontSize: 16,
//         color: '#AEAEAE',
//         marginBottom: 30,
//     },
//     label: {
//         fontSize: 14,
//         fontWeight: '500',
//         marginBottom: 5,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 5,
//         padding: 13,
//         marginBottom: 20,
//     },
//     inputFocused: {
//         borderColor: '#007BFF', // Highlight color on focus
//         borderWidth: 2,
//     },
//     forgotPassword: {
//         color: '#007BFF',
//         textAlign: 'right',
//         marginBottom: 20,
//     },
//     button: {
//         backgroundColor: '#007BFF',
//         padding: 15,
//         borderRadius: 5,
//         alignItems: 'center',
//         marginTop: 150,
//     },
//     buttonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: '600',
//     },
// })
