import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Menu, X, ChevronRight, Plus, Mic, Image as ImageIcon, Camera, Video, ArrowUp, ArrowDown, MoveUpRight } from 'lucide-react-native';
import { usePosts } from '../context/PostContext';

const AddPostScreen = () => {
    const { addPost } = usePosts();
    const [postText, setPostText] = useState('');
    const [title, setTitle] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const textInputRef = useRef(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImages([...selectedImages, result.assets[0].uri]);
        }
    };

    const handlePost = async () => {
        const postData = {
            author: 'Sheikh Usama',
            avatar: require('../../assets/images/profile.png'),
            title,
            description: postText,
            images: selectedImages,
            hashtags,
        };

        try {
            const response = await fetch('http://192.168.40.122:5000/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData),
            });
            if (response.ok) {
                const newPost = await response.json();
                addPost(newPost); // Add to global state
                Alert.alert('Success', 'Post created successfully!');
                router.back();
            } else {
                const errorText = await response.text();
                Alert.alert('Error', `Failed to create post: ${errorText}`);
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
        }
    };

    const focusTextInput = () => {
        textInputRef.current?.focus();
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={{ fontSize: 24 }}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create Post</Text>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.userInfo}>
                    <View style={styles.avatar}>
                        <Image source={require('../../assets/images/profile.png')} />
                    </View>
                    <View>
                        <Text style={styles.userName}>Sheikh Usama</Text>
                        <TouchableOpacity style={styles.categoryButton}>
                            <Menu size={16} color="#fff" />
                            <Text style={styles.categoryText}>Category</Text>
                            <ArrowDown size={16} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TextInput
                    style={styles.titleInput}
                    placeholder="Title (optional)"
                    value={title}
                    onChangeText={setTitle}
                />

                <TouchableOpacity style={styles.postTextContainer} onPress={focusTextInput}>
                    <TextInput
                        ref={textInputRef}
                        style={styles.postTextInput}
                        placeholder="What's on your mind?"
                        value={postText}
                        onChangeText={setPostText}
                        multiline
                        numberOfLines={5}
                    />
                </TouchableOpacity>

                {selectedImages.length > 0 && (
                    <ScrollView horizontal style={styles.imagePreviewContainer}>
                        {selectedImages.map((uri, index) => (
                            <Image key={index} source={{ uri }} style={styles.previewImage} />
                        ))}
                    </ScrollView>
                )}

                <TextInput
                    style={styles.hashtagsInput}
                    placeholder="#hashtag..."
                    value={hashtags}
                    onChangeText={setHashtags}
                />
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.mediaButtons}>
                    <TouchableOpacity onPress={pickImage} style={styles.iconButton}>
                        <ImageIcon size={18} color="#2196F3" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Mic size={18} color="#4CAF50" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Video size={18} color="#FF5722" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Camera size={18} color="#9E9E9E" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.postButton} onPress={handlePost}>
                    <Text style={styles.postButtonText}>Post</Text>
                    <MoveUpRight size={18} color="#fff" style={{ marginLeft: 5 }} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    backButton: {
        marginRight: 15,
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    scrollView: {
        flex: 1,
        padding: 15,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    avatar: {
        borderRadius: 30,
        marginRight: 10,
    },
    userName: {
        fontWeight: '600',
        fontSize: 16,
    },
    categoryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 15,
        marginTop: 5,
        gap: 3,
    },
    categoryText: {
        color: 'white',
        fontSize: 12,
    },
    titleInput: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
        padding: 5,
    },
    postTextContainer: {
        minHeight: 150,
    },
    postTextInput: {
        fontSize: 26,
        textAlignVertical: 'top',
        padding: 5,
    },
    hashtagsInput: {
        padding: 5,
        color: '#2196F3',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    mediaButtons: {
        flexDirection: 'row',
        width: '60%',
    },
    iconButton: {
        padding: 8,
    },
    postButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    postButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    imagePreviewContainer: {
        marginVertical: 10,
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 8,
    },
});

export default AddPostScreen;

// import React, { useState, useRef } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     Image,
//     StyleSheet,
//     Platform,
//     ScrollView,
//     KeyboardAvoidingView,
//     Alert,
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
//     ArrowDown,
//     MoveUpRight,
//     Move

// } from 'lucide-react-native';

// const CreatePostScreen = ({ navigation }) => {
//     const [postText, setPostText] = useState('');
//     const [title, setTitle] = useState('');
//     const [hashtags, setHashtags] = useState('');
//     const textInputRef = useRef(null);

//     const pickImage = () => {
//         Alert.alert('Pick Image', 'This function would open your image picker');
//         // Here you would add your image selection logic
//     };

//     const handlePost = () => {
//         // Here you would typically send the data to your API
//         const postData = {
//             title,
//             text: postText,
//             hashtags: hashtags.split(' ').filter(tag => tag.startsWith('#')),
//         };

//         console.log('Post data:', postData);
//         Alert.alert('Success', 'Post created successfully!');
//         // navigation.goBack();
//     };

//     const focusTextInput = () => {
//         if (textInputRef.current) {
//             textInputRef.current.focus();
//         }
//     };

//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//             style={styles.container}
//         >
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack ? navigation.goBack() : null} style={styles.backButton}>
//                     <Text style={{ fontSize: 24 }}>←</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Create Post</Text>
//             </View>

//             <ScrollView style={styles.scrollView}>
//                 <View style={styles.userInfo}>
//                     <View style={styles.avatar}>
//                         <Image source={require('../../assets/images/profile.png')} />
//                     </View>
//                     <View>
//                         <Text style={styles.userName}>Sheikh Usama</Text>
//                         <TouchableOpacity style={styles.categoryButton}>
//                             <Menu size={16} color="#fff" />
//                             <Text style={styles.categoryText}>Category</Text>
//                             <ArrowDown size={16} color="#fff" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 <TextInput
//                     style={styles.titleInput}
//                     placeholder="Title (optional)"
//                     value={title}
//                     onChangeText={setTitle}
//                 />

//                 <TouchableOpacity
//                     style={styles.postTextContainer}
//                     onPress={focusTextInput}
//                 >
//                     <TextInput
//                         ref={textInputRef}
//                         style={styles.postTextInput}
//                         placeholder="What's on your mind?"
//                         value={postText}
//                         onChangeText={setPostText}
//                         multiline
//                         numberOfLines={5}
//                     />
//                 </TouchableOpacity>

//                 <TextInput
//                     style={styles.hashtagsInput}
//                     placeholder="#hashtag..."
//                     value={hashtags}
//                     onChangeText={setHashtags}
//                 />
//             </ScrollView>


//             <View style={styles.footer}>
//                 <View style={styles.mediaButtons}>
//                     <TouchableOpacity onPress={pickImage} style={styles.iconButton}>

//                         <ImageIcon size={18} color="#2196F3" />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.iconButton}>
//                         <Mic size={18} color="#4CAF50" />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.iconButton}>
//                         <Video size={18} color="#FF5722" />
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.iconButton}>
//                         <Camera size={18} color="#9E9E9E" />
//                     </TouchableOpacity>
//                 </View>

//                 <TouchableOpacity style={styles.postButton} onPress={handlePost}>
//                     <Text style={styles.postButtonText}>Post</Text>
//                     <MoveUpRight size={18} color="#fff" style={{ marginLeft: 5 }} />
//                 </TouchableOpacity>
//             </View>
//         </KeyboardAvoidingView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         marginTop: 20,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#e0e0e0',
//     },
//     backButton: {
//         marginRight: 15,
//         padding: 5,
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//     },
//     scrollView: {
//         flex: 1,
//         padding: 15,
//     },
//     userInfo: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 15,

//     },
//     avatar: {

//         borderRadius: 30,
//         marginRight: 10,
//     },
//     userName: {
//         fontWeight: '600',
//         fontSize: 16,
//     },
//     categoryButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#2196F3',
//         paddingHorizontal: 10,
//         paddingVertical: 3,
//         borderRadius: 15,
//         marginTop: 5,
//         gap: 3
//     },
//     categoryText: {
//         color: 'white',
//         fontSize: 12,
//     },
//     titleInput: {
//         fontSize: 16,
//         fontWeight: '500',
//         marginBottom: 10,
//         padding: 5,
//     },
//     postTextContainer: {
//         minHeight: 150,
//     },
//     postTextInput: {
//         fontSize: 26,
//         textAlignVertical: 'top',
//         padding: 5,
//     },
//     hashtagsInput: {

//         padding: 5,
//         color: '#2196F3',
//     },
//     footer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         padding: 15,
//         borderTopWidth: 1,
//         borderTopColor: '#e0e0e0',
//     },
//     mediaButtons: {
//         flexDirection: 'row',
//         width: '60%',
//     },
//     iconButton: {
//         padding: 8,
//     },
//     iconText: {
//         fontSize: 20,
//     },
//     postButton: {
//         display: 'flex',
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#2196F3',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//     },
//     postButtonText: {
//         color: 'white',
//         fontWeight: '600',
//     },
// });

// export default CreatePostScreen;