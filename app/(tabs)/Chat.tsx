import React, { useState, useEffect, useRef } from 'react';
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
    ActivityIndicator,
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
    ArrowUp,
} from 'lucide-react-native';
import Markdown from 'react-native-markdown-display';

const { width } = Dimensions.get('window');
const SIDEBAR_WIDTH = width * 0.75;

const ChatbotApp = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [conversations, setConversations] = useState([
        { id: 1, title: 'Help with parenting', date: '2 days ago', preview: 'How do I handle tantrums?' },
        { id: 2, title: 'Wellness tips', date: 'Yesterday', preview: 'How can I improve my sleep?' },
        { id: 3, title: 'DIY project help', date: 'Today', preview: 'How do I build a birdhouse?' },
        { id: 4, title: 'Health questions', date: 'Just now', preview: 'What are good exercises for beginners?' },
    ]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [chatVisible, setChatVisible] = useState(false);
    const scrollViewRef = useRef();

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

    const fetchResponse = async (text) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: text }]
                    }]
                })
            });

            const data = await response.json();
            const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no response.';

            setMessages(prevMessages => [
                ...prevMessages,
                { text: aiResponseText, type: 'bot' }
            ]);

            // Save to conversations if this is a new chat
            if (activeConversation === null) {
                const newConvoId = conversations.length + 1;
                const newConvo = {
                    id: newConvoId,
                    title: text.length > 20 ? `${text.substring(0, 20)}...` : text,
                    date: 'Just now',
                    preview: aiResponseText.length > 30 ? `${aiResponseText.substring(0, 30)}...` : aiResponseText
                };

                setConversations([newConvo, ...conversations]);
                setActiveConversation(newConvoId);
            }
        } catch (error) {
            console.error('Error fetching response:', error);
            setError('Failed to get a response. Please try again.');
        } finally {
            setLoading(false);
            // Scroll to bottom after response
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }
    };

    const handleSendMessage = () => {
        if (message.trim()) {
            // Add user message to chat
            const userMessage = { text: message, type: 'user' };
            setMessages([...messages, userMessage]);

            // Make chat visible if it's not already
            if (!chatVisible) {
                setChatVisible(true);
            }

            // Fetch AI response
            fetchResponse(message);

            // Clear input
            setMessage('');

            // Scroll to bottom
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        }
    };

    const handleNewChat = () => {
        setMessages([]);
        setActiveConversation(null);
        setChatVisible(false);
        toggleSidebar();
    };

    const handleSelectConversation = (convoId) => {
        // Here you would typically load messages for the selected conversation
        // For now we'll just set active conversation and close sidebar
        setActiveConversation(convoId);
        setChatVisible(true);
        toggleSidebar();
    };

    const handleCategorySelect = (categoryName) => {
        // Start a new chat with a prompt based on the category
        setChatVisible(true);
        const categoryPrompts = {
            'Parenting': 'I need help with parenting advice.',
            'Health / Wellness': 'I want to improve my health and wellness.',
            'DIY': 'I need help with a DIY project.',
            'Deep Jugaar': 'I need some creative solutions to a problem.'
        };

        const prompt = categoryPrompts[categoryName] || `Let's chat about ${categoryName}`;
        const userMessage = { text: prompt, type: 'user' };
        setMessages([userMessage]);
        fetchResponse(prompt);
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
        <TouchableOpacity
            style={[styles.categoryButton, { backgroundColor: color }]}
            onPress={() => handleCategorySelect(name)}
        >
            <Text style={styles.categoryIcon}>{icon}</Text>
            <Text style={styles.categoryText}>{name}</Text>
        </TouchableOpacity>
    );

    // Markdown styles
    const markdownStyles = {
        body: {
            ...styles.botMessage,
            padding: 0 // Remove padding since it's handled by the container
        },
        heading1: {
            ...styles.botMessage,
            fontWeight: 'bold',
            fontSize: 22,
            padding: 0,
            marginTop: 10,
            marginBottom: 8,
            color: '#333333'
        },
        heading2: {
            ...styles.botMessage,
            fontWeight: 'bold',
            fontSize: 20,
            padding: 0,
            marginTop: 8,
            marginBottom: 6,
            color: '#333333'
        },
        heading3: {
            ...styles.botMessage,
            fontWeight: 'bold',
            fontSize: 18,
            padding: 0,
            marginTop: 6,
            marginBottom: 4,
            color: '#333333'
        },
        paragraph: {
            ...styles.botMessage,
            padding: 0,
            marginTop: 0,
            marginBottom: 8,
        },
        bullet_list: {
            ...styles.botMessage,
            padding: 0,
        },
        ordered_list: {
            ...styles.botMessage,
            padding: 0,
        },
        list_item: {
            ...styles.botMessage,
            padding: 0,
            marginBottom: 4,
        },
        strong: {
            fontWeight: 'bold',
            color: '#333333',
        },
        em: {
            fontStyle: 'italic',
        },
        code_inline: {
            ...styles.botMessage,
            fontFamily: 'monospace',
            backgroundColor: '#f1f1f1',
            padding: 2,
            borderRadius: 3,
            color: '#333333',
        },
        code_block: {
            ...styles.botMessage,
            fontFamily: 'monospace',
            backgroundColor: '#f1f1f1',
            padding: 8,
            borderRadius: 5,
            color: '#333333',
        }
    };

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
                    <Image source={require('../../assets/images/comunity.png')} />
                </View>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
                {!chatVisible ? (
                    <>
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
                    </>
                ) : (
                    <ScrollView
                        ref={scrollViewRef}
                        style={styles.chatContainer}
                        contentContainerStyle={styles.chatContent}
                    >
                        {messages.map((msg, index) => (
                            <View key={index} style={[
                                styles.messageContainer,
                                msg.type === 'user' ? styles.userMessageContainer : styles.botMessageContainer
                            ]}>
                                {msg.type === 'user' ? (
                                    <Text style={[styles.message, styles.userMessage]}>
                                        {msg.text}
                                    </Text>
                                ) : (
                                    <View style={[styles.message, styles.botMessage]}>
                                        <Markdown style={markdownStyles}>
                                            {msg.text}
                                        </Markdown>
                                    </View>
                                )}
                            </View>
                        ))}
                        {loading && (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="small" color="#007BFF" />
                                <Text style={styles.loadingText}>AI is thinking...</Text>
                            </View>
                        )}
                        {error && <Text style={styles.errorText}>{error}</Text>}
                    </ScrollView>
                )}
            </View>

            {/* Input Area */}
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Let's Chat"
                        value={message}
                        onChangeText={setMessage}
                        onSubmitEditing={handleSendMessage}
                    />

                    <View style={styles.inputActions}>
                        <TouchableOpacity style={styles.inputButton}>
                            <Mic size={18} color="#4CAF50" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inputButton}>
                            <ImageIcon size={18} color="#2196F3" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inputButton}>
                            <Camera size={18} color="#9E9E9E" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.inputButton}>
                            <Video size={18} color="#FF5722" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Send Button */}
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={handleSendMessage}
                    disabled={loading || !message.trim()}
                >
                    <ArrowUp size={20} color="#FFFFFF" />
                </TouchableOpacity>
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
                                style={[
                                    styles.conversationItem,
                                    activeConversation === convo.id && styles.activeConversation
                                ]}
                                onPress={() => handleSelectConversation(convo.id)}
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

                    <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
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
        paddingVertical: 52,
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
        paddingTop: 10,
    },
    welcomeText: {
        marginVertical: 10,
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
    chatContainer: {
        flex: 1,
    },
    chatContent: {
        paddingBottom: 20,
    },
    messageContainer: {
        marginBottom: 12,
        maxWidth: '80%',
    },
    userMessageContainer: {
        alignSelf: 'flex-end',
    },
    botMessageContainer: {
        alignSelf: 'flex-start',
    },
    message: {
        padding: 12,
        borderRadius: 18,
        fontSize: 16,
    },
    userMessage: {
        backgroundColor: '#007BFF',
        color: '#FFFFFF',
        borderTopRightRadius: 4,
    },
    botMessage: {
        backgroundColor: '#F0F0F0',
        color: '#333333',
        borderTopLeftRadius: 4,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 12,
    },
    loadingText: {
        marginLeft: 8,
        color: '#666',
        fontSize: 14,
    },
    errorText: {
        color: '#E53935',
        alignSelf: 'center',
        marginVertical: 8,
    },
    inputContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderTopWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginRight: 8,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        padding: 0,
    },
    inputActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputButton: {
        marginLeft: 8,
    },
    sendButton: {
        backgroundColor: '#007BFF',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginTop: 40,
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
    activeConversation: {
        backgroundColor: '#E3F2FD',
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
        backgroundColor: '#007BFF',
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

// import React, { useState, useEffect, useRef } from 'react';
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
//     ActivityIndicator,
// } from 'react-native';
// import {
//     Menu,
//     X,
//     ChevronRight,
//     Plus,
//     Mic,
//     Image as ImageIcon,
//     Camera,
//     Video,
//     ArrowUp,
// } from 'lucide-react-native';

// const { width } = Dimensions.get('window');
// const SIDEBAR_WIDTH = width * 0.75;

// const ChatbotApp = () => {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [conversations, setConversations] = useState([
//         { id: 1, title: 'Help with parenting', date: '2 days ago', preview: 'How do I handle tantrums?' },
//         { id: 2, title: 'Wellness tips', date: 'Yesterday', preview: 'How can I improve my sleep?' },
//         { id: 3, title: 'DIY project help', date: 'Today', preview: 'How do I build a birdhouse?' },
//         { id: 4, title: 'Health questions', date: 'Just now', preview: 'What are good exercises for beginners?' },
//     ]);
//     const [activeConversation, setActiveConversation] = useState(null);
//     const [chatVisible, setChatVisible] = useState(false);
//     const scrollViewRef = useRef();

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

//     const fetchResponse = async (text) => {
//         setLoading(true);
//         setError(null);

//         try {
//             const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCOY0zrY76EVrW8TldTUkPCuXF5oec8Qv4', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     contents: [{
//                         parts: [{ text: text }]
//                     }]
//                 })
//             });

//             const data = await response.json();
//             const aiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, no response.';

//             setMessages(prevMessages => [
//                 ...prevMessages,
//                 { text: aiResponseText, type: 'bot' }
//             ]);

//             // Save to conversations if this is a new chat
//             if (activeConversation === null) {
//                 const newConvoId = conversations.length + 1;
//                 const newConvo = {
//                     id: newConvoId,
//                     title: text.length > 20 ? `${text.substring(0, 20)}...` : text,
//                     date: 'Just now',
//                     preview: aiResponseText.length > 30 ? `${aiResponseText.substring(0, 30)}...` : aiResponseText
//                 };

//                 setConversations([newConvo, ...conversations]);
//                 setActiveConversation(newConvoId);
//             }
//         } catch (error) {
//             console.error('Error fetching response:', error);
//             setError('Failed to get a response. Please try again.');
//         } finally {
//             setLoading(false);
//             // Scroll to bottom after response
//             scrollViewRef.current?.scrollToEnd({ animated: true });
//         }
//     };

//     const handleSendMessage = () => {
//         if (message.trim()) {
//             // Add user message to chat
//             const userMessage = { text: message, type: 'user' };
//             setMessages([...messages, userMessage]);

//             // Make chat visible if it's not already
//             if (!chatVisible) {
//                 setChatVisible(true);
//             }

//             // Fetch AI response
//             fetchResponse(message);

//             // Clear input
//             setMessage('');

//             // Scroll to bottom
//             setTimeout(() => {
//                 scrollViewRef.current?.scrollToEnd({ animated: true });
//             }, 100);
//         }
//     };

//     const handleNewChat = () => {
//         setMessages([]);
//         setActiveConversation(null);
//         setChatVisible(false);
//         toggleSidebar();
//     };

//     const handleSelectConversation = (convoId) => {
//         // Here you would typically load messages for the selected conversation
//         // For now we'll just set active conversation and close sidebar
//         setActiveConversation(convoId);
//         setChatVisible(true);
//         toggleSidebar();
//     };

//     const handleCategorySelect = (categoryName) => {
//         // Start a new chat with a prompt based on the category
//         setChatVisible(true);
//         const categoryPrompts = {
//             'Parenting': 'I need help with parenting advice.',
//             'Health / Wellness': 'I want to improve my health and wellness.',
//             'DIY': 'I need help with a DIY project.',
//             'Deep Jugaar': 'I need some creative solutions to a problem.'
//         };

//         const prompt = categoryPrompts[categoryName] || `Let's chat about ${categoryName}`;
//         const userMessage = { text: prompt, type: 'user' };
//         setMessages([userMessage]);
//         fetchResponse(prompt);
//     };

//     const categories = [
//         {
//             id: 1, name: 'Parenting', icon: <Image source={require('../../assets/images/parenting.png')} />,
//             color: '#FFF8E1'
//         },
//         {
//             id: 2, name: 'Health / Wellness', icon: <Image source={require('../../assets/images/heart.png')} />,
//             color: '#E3F2FD'
//         },
//         {
//             id: 3, name: 'DIY', icon: <Image source={require('../../assets/images/diy.png')} />,
//             color: '#E0F2F1'
//         },
//         {
//             id: 4, name: 'Deep Jugaar', icon: <Image source={require('../../assets/images/deepjugar.png')} />,
//             color: '#FCE4EC'
//         },
//     ];

//     const CategoryButton = ({ name, icon, color }) => (
//         <TouchableOpacity
//             style={[styles.categoryButton, { backgroundColor: color }]}
//             onPress={() => handleCategorySelect(name)}
//         >
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
//                     <Menu size={24} color="#333" />
//                 </TouchableOpacity>
//                 <View style={styles.headerRight}>
//                     <Text style={styles.headerTitle}>Explore In{'\n'}Community</Text>
//                     <Image source={require('../../assets/images/comunity.png')} />
//                 </View>
//             </View>

//             {/* Main Content */}
//             <View style={styles.mainContent}>
//                 {!chatVisible ? (
//                     <>
//                         <Text style={styles.welcomeText}>What can I help with ?</Text>

//                         {/* Categories */}
//                         <View style={styles.categoriesContainer}>
//                             <View style={styles.categoryRow}>
//                                 {categories.slice(0, 2).map(category => (
//                                     <CategoryButton
//                                         key={category.id}
//                                         name={category.name}
//                                         icon={category.icon}
//                                         color={category.color}
//                                     />
//                                 ))}
//                             </View>
//                             <View style={styles.categoryRow}>
//                                 {categories.slice(2, 4).map(category => (
//                                     <CategoryButton
//                                         key={category.id}
//                                         name={category.name}
//                                         icon={category.icon}
//                                         color={category.color}
//                                     />
//                                 ))}
//                             </View>
//                         </View>
//                     </>
//                 ) : (
//                     <ScrollView
//                         ref={scrollViewRef}
//                         style={styles.chatContainer}
//                         contentContainerStyle={styles.chatContent}
//                     >
//                         {messages.map((msg, index) => (
//                             <View key={index} style={[
//                                 styles.messageContainer,
//                                 msg.type === 'user' ? styles.userMessageContainer : styles.botMessageContainer
//                             ]}>
//                                 <Text style={[
//                                     styles.message,
//                                     msg.type === 'user' ? styles.userMessage : styles.botMessage
//                                 ]}>
//                                     {msg.text}
//                                 </Text>
//                             </View>
//                         ))}
//                         {loading && (
//                             <View style={styles.loadingContainer}>
//                                 <ActivityIndicator size="small" color="#007BFF" />
//                                 <Text style={styles.loadingText}>AI is thinking...</Text>
//                             </View>
//                         )}
//                         {error && <Text style={styles.errorText}>{error}</Text>}
//                     </ScrollView>
//                 )}
//             </View>

//             {/* Input Area */}
//             <View style={styles.inputContainer}>
//                 <View style={styles.inputWrapper}>
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder="Let's Chat"
//                         value={message}
//                         onChangeText={setMessage}
//                         onSubmitEditing={handleSendMessage}
//                     />

//                     <View style={styles.inputActions}>
//                         <TouchableOpacity style={styles.inputButton}>
//                             <Mic size={18} color="#4CAF50" />
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.inputButton}>
//                             <ImageIcon size={18} color="#2196F3" />
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.inputButton}>
//                             <Camera size={18} color="#9E9E9E" />
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.inputButton}>
//                             <Video size={18} color="#FF5722" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 {/* Send Button */}
//                 <TouchableOpacity
//                     style={styles.sendButton}
//                     onPress={handleSendMessage}
//                     disabled={loading || !message.trim()}
//                 >
//                     <ArrowUp size={20} color="#FFFFFF" />
//                 </TouchableOpacity>
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
//                             <X size={24} color="#333" />
//                         </TouchableOpacity>
//                     </View>

//                     <ScrollView style={styles.conversationsList}>
//                         {conversations.map(convo => (
//                             <TouchableOpacity
//                                 key={convo.id}
//                                 style={[
//                                     styles.conversationItem,
//                                     activeConversation === convo.id && styles.activeConversation
//                                 ]}
//                                 onPress={() => handleSelectConversation(convo.id)}
//                             >
//                                 <View style={styles.conversationInfo}>
//                                     <Text style={styles.conversationTitle}>{convo.title}</Text>
//                                     <Text style={styles.conversationPreview}>{convo.preview}</Text>
//                                 </View>
//                                 <View style={styles.conversationMeta}>
//                                     <Text style={styles.conversationDate}>{convo.date}</Text>
//                                     <ChevronRight size={18} color="#BDBDBD" />
//                                 </View>
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>

//                     <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
//                         <Plus size={24} color="#FFFFFF" />
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
//         paddingVertical: 52,
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
//         paddingTop: 10,
//     },
//     welcomeText: {
//         marginVertical: 140,
//         fontSize: 24,
//         fontWeight: '600',
//         color: '#333',
//         marginBottom: 24,
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
//     chatContainer: {
//         flex: 1,
//     },
//     chatContent: {
//         paddingBottom: 20,
//     },
//     messageContainer: {
//         marginBottom: 12,
//         maxWidth: '80%',
//     },
//     userMessageContainer: {
//         alignSelf: 'flex-end',
//     },
//     botMessageContainer: {
//         alignSelf: 'flex-start',
//     },
//     message: {
//         padding: 12,
//         borderRadius: 18,
//         fontSize: 16,
//     },
//     userMessage: {
//         backgroundColor: '#007BFF',
//         color: '#FFFFFF',
//         borderTopRightRadius: 4,
//     },
//     botMessage: {
//         backgroundColor: '#F0F0F0',
//         color: '#333333',
//         borderTopLeftRadius: 4,
//     },
//     loadingContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         alignSelf: 'flex-start',
//         marginLeft: 10,
//         marginBottom: 12,
//     },
//     loadingText: {
//         marginLeft: 8,
//         color: '#666',
//         fontSize: 14,
//     },
//     errorText: {
//         color: '#E53935',
//         alignSelf: 'center',
//         marginVertical: 8,
//     },
//     inputContainer: {
//         paddingHorizontal: 16,
//         paddingVertical: 16,
//         borderTopWidth: 0,
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     inputWrapper: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#FFFFFF',
//         borderRadius: 24,
//         borderWidth: 1,
//         borderColor: '#E0E0E0',
//         paddingHorizontal: 12,
//         paddingVertical: 10,
//         marginRight: 8,
//     },
//     textInput: {
//         flex: 1,
//         fontSize: 16,
//         padding: 0,
//     },
//     inputActions: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     inputButton: {
//         marginLeft: 8,
//     },
//     sendButton: {
//         backgroundColor: '#007BFF',
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
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
//         marginTop: 40,
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
//     activeConversation: {
//         backgroundColor: '#E3F2FD',
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
//         backgroundColor: '#007BFF',
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

