import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Image,
    ScrollView,
    Animated,
    Dimensions,
} from 'react-native';
import {
    Menu,
    X,
    ChevronRight,
    Plus,
    Mic,
    Image as ImageIcon,
    Camera,
    Video,
    Send
} from 'lucide-react-native';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75;

const ChatbotApp = () => {
    const [message, setMessage] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [conversations, setConversations] = useState([
        { id: 1, title: 'Help with parenting', date: '2 days ago', preview: 'How do I handle tantrums?' },
        { id: 2, title: 'Wellness tips', date: 'Yesterday', preview: 'How can I improve my sleep?' },
        { id: 3, title: 'DIY project help', date: 'Today', preview: 'How do I build a birdhouse?' },
        { id: 4, title: 'Health questions', date: 'Just now', preview: 'What are good exercises for beginners?' },
    ]);

    // Animation value for sidebar
    const sidebarAnim = new Animated.Value(0);
    const overlayAnim = new Animated.Value(0);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(sidebarAnim, {
                toValue: sidebarOpen ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(overlayAnim, {
                toValue: sidebarOpen ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, [sidebarOpen]);

    const sidebarTranslate = sidebarAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [-SIDEBAR_WIDTH, 0],
    });

    const overlayOpacity = overlayAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
    });

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            console.log('Sending message:', message);
            // Here you would typically send the message to your chat service
            // and update the conversation state
            setMessage('');
        }
    };

    const categories = [
        {
            id: 1, name: 'Parenting', icon: <Image source={require('../../assets/images/parenting.png')} />,
            color: '#FFF8E1'
        },
        {
            id: 2, name: 'Health / Wellness', icon: <Image source={require('../../assets/images/heart.png')} />,
            color: '#E3F2FD'
        },
        {
            id: 3, name: 'DIY', icon: <Image source={require('../../assets/images/diy.png')} />,
            color: '#E0F2F1'
        },
        {
            id: 4, name: 'Deep Jugaar', icon: <Image source={require('../../assets/images/deepjugar.png')} />,
            color: '#FCE4EC'
        },
    ];

    const CategoryButton = ({ name, icon, color }) => (
        <TouchableOpacity style={[styles.categoryButton, { backgroundColor: color }]}>
            <Text style={styles.categoryIcon}>{icon}</Text>
            <Text style={styles.categoryText}>{name}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
                    <Menu size={24} color="#333" />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <Text style={styles.headerTitle}>Explore In{'\n'}Community</Text>
                    <Image
                        source={{ uri: 'https://placehold.co/30x30/png' }}
                        style={styles.avatar}
                    />
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
                <Text style={styles.welcomeText}>What can I help with ?</Text>

                {/* Categories */}
                <View style={styles.categoriesContainer}>
                    <View style={styles.categoryRow}>
                        {categories.slice(0, 2).map(category => (
                            <CategoryButton
                                key={category.id}
                                name={category.name}
                                icon={category.icon}
                                color={category.color}
                            />
                        ))}
                    </View>
                    <View style={styles.categoryRow}>
                        {categories.slice(2, 4).map(category => (
                            <CategoryButton
                                key={category.id}
                                name={category.name}
                                icon={category.icon}
                                color={category.color}
                            />
                        ))}
                    </View>
                </View>
            </View>

            {/* Input Area - Updated to match the reference image */}
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Let's Chat"
                        value={message}
                        onChangeText={setMessage}
                    />

                    <View style={styles.inputActions}>
                        <TouchableOpacity style={styles.inputButton}>
                            <Mic size={20} color="#4CAF50" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inputButton}>
                            <ImageIcon size={20} color="#2196F3" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inputButton}>
                            <Camera size={20} color="#9E9E9E" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inputButton}>
                            <Video size={20} color="#FF5722" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Sidebar Overlay */}
            {sidebarOpen && (
                <Animated.View
                    style={[
                        styles.overlay,
                        { opacity: overlayOpacity }
                    ]}
                    pointerEvents={sidebarOpen ? 'auto' : 'none'}
                    onTouchStart={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <Animated.View
                style={[
                    styles.sidebar,
                    { transform: [{ translateX: sidebarTranslate }] }
                ]}
            >
                <SafeAreaView style={styles.sidebarContent}>
                    <View style={styles.sidebarHeader}>
                        <Text style={styles.sidebarTitle}>Chat History</Text>
                        <TouchableOpacity onPress={toggleSidebar}>
                            <X size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.conversationsList}>
                        {conversations.map(convo => (
                            <TouchableOpacity
                                key={convo.id}
                                style={styles.conversationItem}
                                onPress={() => {
                                    console.log('Selected conversation:', convo.id);
                                    toggleSidebar();
                                }}
                            >
                                <View style={styles.conversationInfo}>
                                    <Text style={styles.conversationTitle}>{convo.title}</Text>
                                    <Text style={styles.conversationPreview}>{convo.preview}</Text>
                                </View>
                                <View style={styles.conversationMeta}>
                                    <Text style={styles.conversationDate}>{convo.date}</Text>
                                    <ChevronRight size={18} color="#BDBDBD" />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <TouchableOpacity style={styles.newChatButton}>
                        <Plus size={24} color="#FFFFFF" />
                        <Text style={styles.newChatText}>New Chat</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 16,
        paddingVertical: 42,
    },
    menuButton: {
        padding: 4,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'right',
        marginRight: 8,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    mainContent: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        marginBottom: 24,
        textAlign: 'center',
    },
    categoriesContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 12,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginHorizontal: 6,
    },
    categoryIcon: {
        marginRight: 6,
        fontSize: 16,
    },
    categoryText: {
        fontSize: 14,
        color: '#333',
    },
    inputContainer: {
        paddingHorizontal: 25,
        paddingVertical: 20,
        borderTopWidth: 0,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 16,
        paddingVertical: 15,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        padding: 0,
    },
    inputActions: {
        flexDirection: 'row',
        alignItems: 'center'


    },
    inputButton: {
        marginLeft: 15,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#000',
        zIndex: 1,
    },
    sidebar: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: SIDEBAR_WIDTH,
        backgroundColor: '#FFFFFF',
        zIndex: 2,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    sidebarContent: {
        flex: 1,
    },
    sidebarHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    sidebarTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    conversationsList: {
        flex: 1,
    },
    conversationItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    conversationInfo: {
        flex: 1,
    },
    conversationTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 4,
    },
    conversationPreview: {
        fontSize: 14,
        color: '#757575',
    },
    conversationMeta: {
        alignItems: 'flex-end',
    },
    conversationDate: {
        fontSize: 12,
        color: '#9E9E9E',
        marginBottom: 4,
    },
    newChatButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4CAF50',
        padding: 12,
        margin: 16,
        borderRadius: 24,
    },
    newChatText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 8,
    },
});

export default ChatbotApp;
// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     SafeAreaView,
//     StatusBar,
//     Image,
//     ScrollView,
//     Animated,
//     Dimensions,
// } from 'react-native';
// import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

// const { width } = Dimensions.get('window');
// const SIDEBAR_WIDTH = width * 0.75;

// const ChatbotApp = () => {
//     const [message, setMessage] = useState('');
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [conversations, setConversations] = useState([
//         { id: 1, title: 'Help with parenting', date: '2 days ago', preview: 'How do I handle tantrums?' },
//         { id: 2, title: 'Wellness tips', date: 'Yesterday', preview: 'How can I improve my sleep?' },
//         { id: 3, title: 'DIY project help', date: 'Today', preview: 'How do I build a birdhouse?' },
//         { id: 4, title: 'Health questions', date: 'Just now', preview: 'What are good exercises for beginners?' },
//     ]);

//     // Animation value for sidebar
//     const sidebarAnim = new Animated.Value(0);
//     const overlayAnim = new Animated.Value(0);

//     useEffect(() => {
//         Animated.parallel([
//             Animated.timing(sidebarAnim, {
//                 toValue: sidebarOpen ? 1 : 0,
//                 duration: 300,
//                 useNativeDriver: true,
//             }),
//             Animated.timing(overlayAnim, {
//                 toValue: sidebarOpen ? 1 : 0,
//                 duration: 300,
//                 useNativeDriver: true,
//             }),
//         ]).start();
//     }, [sidebarOpen]);

//     const sidebarTranslate = sidebarAnim.interpolate({
//         inputRange: [0, 1],
//         outputRange: [-SIDEBAR_WIDTH, 0],
//     });

//     const overlayOpacity = overlayAnim.interpolate({
//         inputRange: [0, 1],
//         outputRange: [0, 0.5],
//     });

//     const toggleSidebar = () => {
//         setSidebarOpen(!sidebarOpen);
//     };

//     const handleSendMessage = () => {
//         if (message.trim()) {
//             console.log('Sending message:', message);
//             // Here you would typically send the message to your chat service
//             // and update the conversation state
//             setMessage('');
//         }
//     };

// const categories = [
//     {
//         id: 1, name: 'Parenting', icon: <Image source={require('../../assets/images/parenting.png')} />,
//         color: '#FFF8E1'
//     },
//     {
//         id: 2, name: 'Health / Wellness', icon: <Image source={require('../../assets/images/heart.png')} />,
//         color: '#E3F2FD'
//     },
//     {
//         id: 3, name: 'DIY', icon: <Image source={require('../../assets/images/diy.png')} />,
//         color: '#E0F2F1'
//     },
//     {
//         id: 4, name: 'Deep Jugaar', icon: <Image source={require('../../assets/images/deepjugar.png')} />,
//         color: '#FCE4EC'
//     },
// ];

//     const CategoryButton = ({ name, icon, color }) => (
//         <TouchableOpacity style={[styles.categoryButton, { backgroundColor: color }]}>
//             <Text style={styles.categoryIcon}>{icon}</Text>
//             <Text style={styles.categoryText}>{name}</Text>
//         </TouchableOpacity>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <StatusBar barStyle="dark-content" />

//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
//                     <Ionicons name="menu-outline" size={24} color="#333" />
//                 </TouchableOpacity>
//                 <View style={styles.headerRight}>
//                     <Text style={styles.headerTitle}>Explore In{'\n'}Community</Text>
//                     <Image
//                         source={require('../../assets/images/comunity.png')}
//                     />
//                 </View>
//             </View>

//             {/* Main Content */}
//             <View style={styles.mainContent}>
//                 <Text style={styles.welcomeText}>What can I help with ?</Text>

//                 {/* Categories */}
//                 <View style={styles.categoriesContainer}>
//                     <View style={styles.categoryRow}>
//                         {categories.slice(0, 2).map(category => (
//                             <CategoryButton
//                                 key={category.id}
//                                 name={category.name}
//                                 icon={category.icon}
//                                 color={category.color}
//                             />
//                         ))}
//                     </View>
//                     <View style={styles.categoryRow}>
//                         {categories.slice(2, 4).map(category => (
//                             <CategoryButton
//                                 key={category.id}
//                                 name={category.name}
//                                 icon={category.icon}
//                                 color={category.color}
//                             />
//                         ))}
//                     </View>
//                 </View>
//             </View>

//             {/* Input Area */}
//             <View style={styles.inputContainer}>
//                 <View style={styles.inputRow}>
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder="Let's Chat"
//                         value={message}
//                         onChangeText={setMessage}
//                     />
//                     <TouchableOpacity
//                         style={styles.sendButton}
//                         onPress={handleSendMessage}
//                         disabled={!message.trim()}
//                     >
//                         <Ionicons
//                             name="send"
//                             size={22}
//                             color={message.trim() ? "#4CAF50" : "#BDBDBD"}
//                         />
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.inputActions}>
//                     <TouchableOpacity style={styles.inputButton}>
//                         <Ionicons name="mic-outline" size={22} color="#4CAF50" />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.inputButton}>
//                         <MaterialIcons name="image" size={22} color="#2196F3" />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.inputButton}>
//                         <MaterialCommunityIcons name="camera-outline" size={22} color="#9E9E9E" />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.inputButton}>
//                         <MaterialIcons name="videocam" size={22} color="#FF5722" />
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             {/* Sidebar Overlay */}
//             {sidebarOpen && (
//                 <Animated.View
//                     style={[
//                         styles.overlay,
//                         { opacity: overlayOpacity }
//                     ]}
//                     pointerEvents={sidebarOpen ? 'auto' : 'none'}
//                     onTouchStart={toggleSidebar}
//                 />
//             )}

//             {/* Sidebar */}
//             <Animated.View
//                 style={[
//                     styles.sidebar,
//                     { transform: [{ translateX: sidebarTranslate }] }
//                 ]}
//             >
//                 <SafeAreaView style={styles.sidebarContent}>
//                     <View style={styles.sidebarHeader}>
//                         <Text style={styles.sidebarTitle}>Chat History</Text>
//                         <TouchableOpacity onPress={toggleSidebar}>
//                             <Ionicons name="close" size={24} color="#333" />
//                         </TouchableOpacity>
//                     </View>

//                     <ScrollView style={styles.conversationsList}>
//                         {conversations.map(convo => (
//                             <TouchableOpacity
//                                 key={convo.id}
//                                 style={styles.conversationItem}
//                                 onPress={() => {
//                                     console.log('Selected conversation:', convo.id);
//                                     toggleSidebar();
//                                 }}
//                             >
//                                 <View style={styles.conversationInfo}>
//                                     <Text style={styles.conversationTitle}>{convo.title}</Text>
//                                     <Text style={styles.conversationPreview}>{convo.preview}</Text>
//                                 </View>
//                                 <View style={styles.conversationMeta}>
//                                     <Text style={styles.conversationDate}>{convo.date}</Text>
//                                     <Ionicons name="chevron-forward" size={18} color="#BDBDBD" />
//                                 </View>
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>

//                     <TouchableOpacity style={styles.newChatButton}>
//                         <Ionicons name="add" size={24} color="#FFFFFF" />
//                         <Text style={styles.newChatText}>New Chat</Text>
//                     </TouchableOpacity>
//                 </SafeAreaView>
//             </Animated.View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'flex-start',
//         paddingHorizontal: 16,
//         paddingVertical: 50,
//     },
//     menuButton: {
//         padding: 4,
//     },
//     headerRight: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     headerTitle: {
//         fontSize: 14,
//         fontWeight: '600',
//         textAlign: 'right',
//         marginRight: 8,
//     },
//     avatar: {
//         width: 30,
//         height: 30,
//         borderRadius: 15,
//     },
//     mainContent: {
//         flex: 1,
//         paddingHorizontal: 24,
//         paddingTop: 40,
//         justifyContent: 'center',
//     },
//     welcomeText: {
//         fontSize: 24,
//         fontWeight: '600',
//         color: '#333',
//         marginBottom: 10,
//         textAlign: 'center',
//     },
//     categoriesContainer: {
//         alignItems: 'center',
//         marginTop: 20,

//     },
//     categoryRow: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         marginBottom: 12,

//     },
//     categoryButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//         borderRadius: 20,
//         marginHorizontal: 6,
//     },
//     categoryIcon: {
//         marginRight: 6,
//         fontSize: 16,
//     },
//     categoryText: {
//         fontSize: 14,
//         color: '#333',
//     },
//     inputContainer: {
//         borderTopWidth: 1,
//         borderTopColor: '#F0F0F0',
//         padding: 12,
//     },
//     inputRow: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     textInput: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//         borderWidth: 1,
//         borderColor: '#E0E0E0',
//         borderRadius: 24,
//         paddingHorizontal: 16,
//         paddingVertical: 10,
//         fontSize: 16,
//     },
//     sendButton: {
//         backgroundColor: '#F5F5F5',
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginLeft: 8,
//     },
//     inputActions: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginTop: 12,
//     },
//     inputButton: {
//         padding: 8,
//     },
//     overlay: {
//         ...StyleSheet.absoluteFillObject,
//         backgroundColor: '#000',
//         zIndex: 1,
//     },
//     sidebar: {
//         position: 'absolute',
//         left: 0,
//         top: 0,
//         bottom: 0,
//         width: SIDEBAR_WIDTH,
//         backgroundColor: '#FFFFFF',
//         zIndex: 2,
//         shadowColor: '#000',
//         shadowOffset: { width: 2, height: 0 },
//         shadowOpacity: 0.2,
//         shadowRadius: 5,
//         elevation: 5,
//     },
//     sidebarContent: {
//         flex: 1,
//     },
//     sidebarHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 16,
//         borderBottomWidth: 1,
//         borderBottomColor: '#F0F0F0',
//     },
//     sidebarTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//     },
//     conversationsList: {
//         flex: 1,
//     },
//     conversationItem: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 16,
//         borderBottomWidth: 1,
//         borderBottomColor: '#F0F0F0',
//     },
//     conversationInfo: {
//         flex: 1,
//     },
//     conversationTitle: {
//         fontSize: 16,
//         fontWeight: '500',
//         marginBottom: 4,
//     },
//     conversationPreview: {
//         fontSize: 14,
//         color: '#757575',
//     },
//     conversationMeta: {
//         alignItems: 'flex-end',
//     },
//     conversationDate: {
//         fontSize: 12,
//         color: '#9E9E9E',
//         marginBottom: 4,
//     },
//     newChatButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#4CAF50',
//         padding: 12,
//         margin: 16,
//         borderRadius: 24,
//     },
//     newChatText: {
//         color: '#FFFFFF',
//         fontSize: 16,
//         fontWeight: '500',
//         marginLeft: 8,
//     },
// });

// export default ChatbotApp;



// don not delete

// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

// const ChatApp = () => {
//     const [input, setInput] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const fetchResponse = async () => {
//         if (!input.trim()) return;
//         const userMessage = { text: input, type: 'user' };
//         setMessages([...messages, userMessage]);
//         setInput('');
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCOY0zrY76EVrW8TldTUkPCuXF5oec8Qv4', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     contents: [{
//                         parts: [{ text: input }]
//                     }]
//                 })
//             });

//             const data = await response.json();
//             const aiMessage = { text: data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no response.', type: 'bot' };
//             setMessages([...messages, userMessage, aiMessage]);
//         } catch (error) {
//             console.error('Error fetching response:', error);
//             setError('Failed to get a response. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <ScrollView style={styles.chatContainer}>
//                 {messages.map((msg, index) => (
//                     <Text key={index} style={[styles.message, msg.type === 'user' ? styles.userMsg : styles.botMsg]}>
//                         {msg.text}
//                     </Text>
//                 ))}
//                 {loading && <ActivityIndicator size="large" color="#2196F3" />}
//                 {error && <Text style={styles.errorText}>{error}</Text>}
//             </ScrollView>
//             <TextInput
//                 style={styles.input}
//                 value={input}
//                 onChangeText={setInput}
//                 placeholder="Ask me anything..."
//             />
//             <TouchableOpacity style={styles.button} onPress={fetchResponse} disabled={loading}>
//                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Send'}</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 20, backgroundColor: '#f4f4f4' },
//     chatContainer: { flex: 1, marginBottom: 10 },
//     message: { padding: 10, borderRadius: 8, marginVertical: 4 },
//     userMsg: { backgroundColor: '#4caf50', alignSelf: 'flex-end', color: '#fff' },
//     botMsg: { backgroundColor: '#e0e0e0', alignSelf: 'flex-start' },
//     input: { height: 50, borderColor: '#ddd', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, marginBottom: 10 },
//     button: { backgroundColor: '#2196F3', padding: 15, borderRadius: 8, alignItems: 'center' },
//     buttonText: { color: '#fff', fontWeight: 'bold' },
//     errorText: { color: 'red', textAlign: 'center', marginVertical: 5 }
// });

// export default ChatApp;
