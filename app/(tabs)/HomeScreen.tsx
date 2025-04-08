import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    FlatList,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { usePosts } from '../context/PostContext';

const HomeScreen = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const { posts, fetchPosts } = usePosts();
    // const [posts, setPosts] = useState([
    //     {
    //         id: 1,
    //         author: 'Tim Bakes',
    //         avatar: require('../../assets/images/tim.png'),
    //         timeAgo: '4:48 Medical',
    //         title: "What's The Best Way To Remove Dandruff Naturally?",
    //         likes: 5300,
    //         dislikes: 60,
    //         comments: 158,
    //         shares: 2,
    //         saved: true,
    //     },
    //     {
    //         id: 2,
    //         author: 'Adam Broke',
    //         avatar: require('../../assets/images/adam.png'),
    //         timeAgo: '5:58 Health',
    //         title: "This Mediterranean Bowl Is All You Need",
    //         description: "Nutrients - Chicken Breasts - Adds Lean Protein Sumac Marinade - Olive Oil Adds Healthy Fats Quinoa - Excellent Source of Fiber & Protein",
    //         images: [
    //             require('../../assets/images/bowl.png'),
    //             require('../../assets/images/bowl.png'),
    //             require('../../assets/images/bowl.png'),
    //             require('../../assets/images/bowl.png'),
    //         ],
    //         hashtags: '#PartyNight #UnleashThePartyAnimal #DanceTillDawn',
    //         likes: 0,
    //         dislikes: 0,
    //         comments: 0,
    //         shares: 0,
    //         saved: false,
    //     },
    //     {
    //         id: 3,
    //         author: 'Noorulain',
    //         avatar: require('../../assets/images/tim.png'),
    //         timeAgo: '2h ago DIY',
    //         description: "only recently discovered a love for frugality. This came when I started making my own laundry detergent. I was blown away by the cost savings. ( plus it smells good and great) I have made most of my own cleaning products but I am wondering what else you can save money one by making things yourself. What things do you make yourself that you will never buy from the store again?",
    //         hashtags: '#PartyNight #UnleashThePartyAnimal #DanceTillDawn',
    //         likes: 4300,
    //         dislikes: 40,
    //         comments: 258,
    //         shares: 22,
    //         saved: true,
    //     },
    // ]);



    // const fetchPosts = async () => {
    //     try {
    //         const response = await fetch('http://192.168.40.122:5000/api/posts');
    //         if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
    //         const data = await response.json();
    //         console.log('Fetched posts:', data); // Log fetched data
    //         setPosts([...data, ...posts]); // Combine API posts with boilerplate
    //     } catch (error) {
    //         console.error('Error fetching posts:', error);
    //     }
    // };

    useEffect(() => {
        fetchPosts();
    }, []);

    const categories = [
        { id: 1, name: 'All' },
        { id: 2, name: 'Do It Yourself DIY' },
        { id: 3, name: 'Health / Wellness' },
        { id: 4, name: 'Parenting' },
    ];

    const renderImageItem = ({ item }) => (
        <Image source={typeof item === 'string' ? { uri: item } : item} style={styles.postImage} />
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <Image source={require('../../assets/images/profile.png')} style={styles.smallAvatar} />
                <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.headerTitle}>Sheikh Usama</Text>
                    <Text style={{ color: 'gray', fontSize: 12 }}>@Usamaraees98</Text>
                </View>
                <Ionicons name="notifications-outline" size={24} color="#007AFF" />
            </View>

            <ScrollView style={styles.mainScrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.thoughtBox}>
                    <View style={styles.thoughtBoxContent}>
                        <Image source={require('../../assets/images/profile.png')} style={styles.smallAvatar2} />
                        <Text style={styles.thoughtBoxText} onPress={() => router.push('/AddPostScreen')}>
                            What's On Your Mind?
                        </Text>
                        <Ionicons name="image" size={24} color="#F9C54E" />
                    </View>
                </View>

                <View style={styles.categoriesSection}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.categoriesContainer}
                        contentContainerStyle={styles.categoriesContentContainer}
                    >
                        {categories.map(category => (
                            <TouchableOpacity
                                key={category.id}
                                style={[
                                    styles.categoryButton,
                                    selectedCategory === category.name && styles.categoryButtonActive,
                                ]}
                                onPress={() => setSelectedCategory(category.name)}
                            >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        selectedCategory === category.name && styles.categoryTextActive,
                                    ]}
                                >
                                    {category.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <View style={styles.filterWrapper}>
                        <TouchableOpacity style={styles.filterContainer}>
                            <Text style={styles.filterText}>Newest</Text>
                            <Ionicons name="chevron-down" size={16} color="#888" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.feed}>
                    {posts.map(post => (
                        <View key={post.id} style={styles.post}>
                            <View style={styles.postContainer}>
                                <View style={styles.avatarColumn}>
                                    <Image
                                        source={typeof post.avatar === 'string' ? { uri: post.avatar } : post.avatar}
                                        style={styles.avatar}
                                    />
                                </View>
                                <View style={styles.contentColumn}>
                                    <View style={styles.postHeaderText}>
                                        <Text style={styles.authorName}>{post.author}</Text>
                                        <Text style={styles.timeAgo}>{post.timeAgo}</Text>
                                    </View>
                                    <View style={styles.postContent}>
                                        <Text style={styles.postTitle}>{post.title}</Text>
                                        {post.description && (
                                            <Text style={styles.postDescription}>{post.description}</Text>
                                        )}
                                        {post.hashtags && (
                                            <Text style={styles.postHashtag}>{post.hashtags}</Text>
                                        )}
                                    </View>
                                </View>
                            </View>

                            {post.images && post.images.length > 0 && (
                                <View style={styles.imagesWrapper}>
                                    <FlatList
                                        data={post.images}
                                        renderItem={renderImageItem}
                                        horizontal
                                        showsHorizontalScrollIndicator={true}
                                        keyExtractor={(_, index) => index.toString()}
                                        style={styles.imageScrollContainer}
                                        contentContainerStyle={styles.imageContentContainer}
                                    />
                                </View>
                            )}

                            <View style={styles.postActions}>
                                <View style={styles.actionGroup}>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <FontAwesome name="thumbs-o-up" size={18} color="#333" />
                                        <Text style={styles.actionText}>{(post.likes / 1000).toFixed(1)}k</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <FontAwesome name="thumbs-o-down" size={18} color="#333" />
                                        <Text style={styles.actionText}>{post.dislikes}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <Ionicons name="chatbubble-outline" size={18} color="#333" />
                                        <Text style={styles.actionText}>{post.comments}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.actionButton}>
                                        <Ionicons name="share-outline" size={18} color="#333" />
                                        <Text style={styles.actionText}>{post.shares}</Text>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity>
                                    <Ionicons
                                        name={post.saved ? 'heart' : 'heart-outline'}
                                        size={22}
                                        color={post.saved ? '#FF3B30' : '#333'}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
                <View style={styles.bottomPadding} />
            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navButton} onPress={() => router.push('/')}>
                    <Ionicons name="home" size={24} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Ionicons name="search" size={24} color="#777" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navButton, styles.createButton]} onPress={() => router.push('/AddPostScreen')}>
                    <Ionicons name="add" size={24} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Ionicons name="heart-outline" size={24} color="#777" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navButton}>
                    <Ionicons name="person-outline" size={24} color="#777" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.messageButton}>
                <Image style={{ width: 26, height: 26, resizeMode: 'contain' }} source={require('../../assets/images/red_logo.png')} />
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        marginTop: 40,
        marginHorizontal: 5,
    },
    mainScrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#FFF',
        marginBottom: 13,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    thoughtBox: {
        backgroundColor: '#FFF',
        padding: 12,
        marginBottom: 8,
        marginHorizontal: 10,
    },
    thoughtBoxContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    smallAvatar: {
        width: 46,
        height: 46,
        borderRadius: 18,
    },
    smallAvatar2: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    thoughtBoxText: {
        flex: 1,
        marginLeft: 12,
        color: '#666',
    },
    categoriesSection: {
        backgroundColor: '#FFF',
        marginBottom: 8,
    },
    categoriesContainer: {
        paddingVertical: 10,
    },
    categoriesContentContainer: {
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    categoryButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginRight: 8,
        backgroundColor: '#F0F0F0',
        height: 32,
        justifyContent: 'center',
    },
    categoryButtonActive: {
        backgroundColor: '#E6F0FF',
    },
    categoryText: {
        fontSize: 13,
        color: '#333',
    },
    categoryTextActive: {
        color: '#007AFF',
        fontWeight: '500',
    },
    filterWrapper: {
        alignItems: 'flex-end',
        paddingRight: 16,
        paddingBottom: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
    },
    filterText: {
        fontSize: 14,
        color: '#C0C0C0',
        marginRight: 4,
    },
    feed: {
        flex: 1,
    },
    post: {
        backgroundColor: '#FFF',
        marginBottom: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    postContainer: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    avatarColumn: {
        width: 40,
        marginRight: 12,
    },
    contentColumn: {
        flex: 1,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 20,
    },
    postHeaderText: {
        marginBottom: 4,
    },
    authorName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
    },
    timeAgo: {
        fontSize: 13,
        color: '#C0C0C0',
        marginTop: 2,
    },
    postContent: {
        marginTop: 4,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#000',
    },
    postDescription: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
        marginBottom: 12,
    },
    postHashtag: {
        fontSize: 14,
        color: 'gray',
        lineHeight: 20,
        marginBottom: 12,
    },
    imagesWrapper: {
        marginBottom: 12,
        marginLeft: 52,
    },
    imageScrollContainer: {
        height: 150,
    },
    imageContentContainer: {
        paddingRight: 8,
    },
    postImage: {
        width: 180,
        height: 150,
        borderRadius: 8,
        marginRight: 8,
    },
    postActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
        marginLeft: 52,
    },
    actionGroup: {
        flexDirection: 'row',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    actionText: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFF',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    navButton: {
        padding: 8,
    },
    createButton: {
        backgroundColor: '#007AFF',
        borderRadius: 24,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
    },
    messageButton: {
        position: 'absolute',
        bottom: 80,
        right: 20,
        backgroundColor: '#007AFF',
        width: 54,
        height: 54,
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    bottomPadding: {
        height: 0,
    },
});

export default HomeScreen;

// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     Image,
//     TouchableOpacity,
//     StyleSheet,
//     SafeAreaView,
//     StatusBar,
//     FlatList
// } from 'react-native';
// import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
// import { router } from 'expo-router';

// const SocialMediaApp = () => {
//     const [selectedCategory, setSelectedCategory] = useState('All');

//     const categories = [
//         { id: 1, name: 'All' },
//         { id: 2, name: 'Do It Yourself DIY' },
//         { id: 3, name: 'Health / Wellness' },
//         { id: 4, name: 'Parenting' },
//     ];

//     const posts = [
//         {
//             id: 1,
//             author: 'Tim Bakes',
//             avatar: require('../../assets/images/tim.png'),
//             timeAgo: '4:48 Medical',
//             title: "What's The Best Way To Remove Dandruff Naturally?",
//             likes: 5300,
//             dislikes: 60,
//             comments: 158,
//             shares: 2,
//             saved: true,
//         },
//         {
//             id: 2,
//             author: 'Adam Broke',
//             avatar: require('../../assets/images/adam.png'),
//             timeAgo: '5:58 Health',
//             title: "This Mediterranean Bowl Is All You Need",
//             description: "Nutrients - Chicken Breasts - Adds Lean Protein Sumac Marinade - Olive Oil Adds Healthy Fats Quinoa - Excellent Source of Fiber & Protein",
//             images: [
//                 require('../../assets/images/bowl.png'),
//                 require('../../assets/images/bowl.png'),
//                 require('../../assets/images/bowl.png'),
//                 require('../../assets/images/bowl.png'),
//             ],
//             hashtags: '#PartyNight #UnleashThePartyAnimal #DanceTillDawn',
//             likes: 0,
//             dislikes: 0,
//             comments: 0,
//             shares: 0,
//             saved: false,
//         },
//         {
//             id: 3,
//             author: 'Noorulain',
//             avatar: require('../../assets/images/tim.png'),
//             timeAgo: '2h ago DIY',
//             description: "only recently discovered a love for frugality. This came when I started making my own laundry detergent. I was blown away by the cost savings. ( plus it smells good and great) I have made most of my own cleaning products but I am wondering what else you can save money one by making things yourself. What things do you make yourself that you will never buy from the store again?",
//             hashtags: '#PartyNight #UnleashThePartyAnimal #DanceTillDawn',
//             likes: 4300,
//             dislikes: 40,
//             comments: 258,
//             shares: 22,
//             saved: true,
//         },
//     ];

//     // Render post image item
//     const renderImageItem = ({ item }) => (
//         <Image source={item} style={styles.postImage} />
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <StatusBar barStyle="dark-content" />

//             {/* Header - Outside ScrollView since it should be fixed */}
//             <View style={styles.header}>
//                 <Image source={require('../../assets/images/profile.png')} style={styles.smallAvatar} />
//                 <View style={{ flex: 1, marginLeft: 12 }}>
//                     <Text style={styles.headerTitle}>Sheikh Usama</Text>
//                     <Text style={{ color: 'gray', fontSize: 12 }}>@Usamaraees98</Text>
//                 </View>
//                 <Ionicons name="notifications-outline" size={24} color="#007AFF" />
//             </View>

//             {/* Main ScrollView for the entire content */}
//             <ScrollView
//                 style={styles.mainScrollView}
//                 showsVerticalScrollIndicator={false}
//             >
//                 {/* "What's On Your Mind" section */}
//                 <View style={styles.thoughtBox}>
//                     <View style={styles.thoughtBoxContent}>
//                         <Image source={require('../../assets/images/profile.png')} style={styles.smallAvatar2} />
//                         <Text style={styles.thoughtBoxText} onPress={() => router.push('/AddPostScreen')} >What's On Your Mind?</Text>
//                         <Ionicons name="image" size={24} color="#F9C54E" />
//                     </View>
//                 </View>

//                 {/* Categories */}
//                 <View style={styles.categoriesSection}>
//                     <ScrollView
//                         horizontal
//                         showsHorizontalScrollIndicator={false}
//                         style={styles.categoriesContainer}
//                         contentContainerStyle={styles.categoriesContentContainer}
//                     >
//                         {categories.map(category => (
//                             <TouchableOpacity
//                                 key={category.id}
//                                 style={[
//                                     styles.categoryButton,
//                                     selectedCategory === category.name && styles.categoryButtonActive
//                                 ]}
//                                 onPress={() => setSelectedCategory(category.name)}
//                             >
//                                 <Text
//                                     style={[
//                                         styles.categoryText,
//                                         selectedCategory === category.name && styles.categoryTextActive
//                                     ]}
//                                 >
//                                     {category.name}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>

//                     {/* Filter now in bottom right */}
//                     <View style={styles.filterWrapper}>
//                         <TouchableOpacity style={styles.filterContainer}>
//                             <Text style={styles.filterText}>Newest</Text>
//                             <Ionicons name="chevron-down" size={16} color="#888" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 {/* Feed */}
//                 <View style={styles.feed}>
//                     {posts.map(post => (
//                         <View key={post.id} style={styles.post}>
//                             {/* Post Header and Content with aligned layout */}
//                             <View style={styles.postContainer}>
//                                 {/* Left column - Avatar */}
//                                 <View style={styles.avatarColumn}>
//                                     <Image source={post.avatar} style={styles.avatar} />
//                                 </View>

//                                 {/* Right column - Content */}
//                                 <View style={styles.contentColumn}>
//                                     {/* Author info */}
//                                     <View style={styles.postHeaderText}>
//                                         <Text style={styles.authorName}>{post.author}</Text>
//                                         <Text style={styles.timeAgo}>{post.timeAgo}</Text>
//                                     </View>

//                                     {/* Post content */}
//                                     <View style={styles.postContent}>
//                                         <Text style={styles.postTitle}>{post.title}</Text>
//                                         {post.description && (
//                                             <Text style={styles.postDescription}>{post.description}</Text>
//                                         )}
//                                         {post.hashtags && (
//                                             <Text style={styles.postHashtag}>{post.hashtags}</Text>
//                                         )}
//                                     </View>
//                                 </View>
//                             </View>

//                             {/* Images - Full width, outside the columns */}
//                             {post.images && post.images.length > 0 && (
//                                 <View style={styles.imagesWrapper}>
//                                     <FlatList
//                                         data={post.images}
//                                         renderItem={renderImageItem}
//                                         horizontal
//                                         showsHorizontalScrollIndicator={true}
//                                         keyExtractor={(_, index) => index.toString()}
//                                         style={styles.imageScrollContainer}
//                                         contentContainerStyle={styles.imageContentContainer}
//                                     />
//                                 </View>
//                             )}

//                             {/* Post Actions */}
//                             <View style={styles.postActions}>
//                                 <View style={styles.actionGroup}>
//                                     <TouchableOpacity style={styles.actionButton}>
//                                         <FontAwesome name="thumbs-o-up" size={18} color="#333" />
//                                         <Text style={styles.actionText}>{(post.likes / 1000).toFixed(1)}k</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity style={styles.actionButton}>
//                                         <FontAwesome name="thumbs-o-down" size={18} color="#333" />
//                                         <Text style={styles.actionText}>{post.dislikes}</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity style={styles.actionButton}>
//                                         <Ionicons name="chatbubble-outline" size={18} color="#333" />
//                                         <Text style={styles.actionText}>{post.comments}</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity style={styles.actionButton}>
//                                         <Ionicons name="share-outline" size={18} color="#333" />
//                                         <Text style={styles.actionText}>{post.shares}</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                                 <TouchableOpacity>
//                                     <Ionicons
//                                         name={post.saved ? "heart" : "heart-outline"}
//                                         size={22}
//                                         color={post.saved ? "#FF3B30" : "#333"}
//                                     />
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     ))}
//                 </View>

//                 {/* Adding padding at the bottom to ensure content isn't covered by bottom nav */}
//                 <View style={styles.bottomPadding} />
//             </ScrollView>

//             {/* Bottom Navigation - Outside ScrollView since it should be fixed */}
//             <View style={styles.bottomNav}>
//                 <TouchableOpacity style={styles.navButton} onPress={() => router.push('/AddPostScreen')}>
//                     <Ionicons name="home" size={24} color="#007AFF" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.navButton}>
//                     <Ionicons name="search" size={24} color="#777" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={[styles.navButton, styles.createButton]}>
//                     <Ionicons name="add" size={24} color="#FFF" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.navButton}>
//                     <Ionicons name="heart-outline" size={24} color="#777" />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.navButton}>
//                     <Ionicons name="person-outline" size={24} color="#777" />
//                 </TouchableOpacity>
//             </View>

//             {/* Message Button - Outside ScrollView since it should be fixed */}
//             <TouchableOpacity style={styles.messageButton}>
//                 {/* <MaterialCommunityIcons name="message-reply-text" size={24} color="#FFF" /> */}
//                 <Image style={{ width: 26, height: 26, resizeMode: 'contain' }} source={require('../../assets/images/red_logo.png')} />
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFF',
//         marginTop: 40,
//         marginHorizontal: 5,
//     },
//     mainScrollView: {
//         flex: 1,
//     },
//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingHorizontal: 16,
//         paddingVertical: 10,
//         backgroundColor: '#FFF',
//         borderBottomWidth: 1,
//         borderBottomColor: '#FFF',
//         marginBottom: 13,
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#000',
//     },
//     thoughtBox: {
//         backgroundColor: '#FFF',
//         padding: 12,
//         marginBottom: 8,
//         marginHorizontal: 10
//     },
//     thoughtBoxContent: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },
//     smallAvatar: {
//         width: 46,
//         height: 46,
//         borderRadius: 18,
//     },
//     smallAvatar2: {
//         width: 36,
//         height: 36,
//         borderRadius: 18,
//     },
//     thoughtBoxText: {
//         flex: 1,
//         marginLeft: 12,
//         color: '#666',
//     },
//     categoriesSection: {
//         backgroundColor: '#FFF',
//         marginBottom: 8,
//     },
//     categoriesContainer: {
//         paddingVertical: 10,
//     },
//     categoriesContentContainer: {
//         paddingHorizontal: 16,
//         alignItems: 'center',
//     },
//     categoryButton: {
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 16,
//         marginRight: 8,
//         backgroundColor: '#F0F0F0',
//         height: 32,
//         justifyContent: 'center',
//     },
//     categoryButtonActive: {
//         backgroundColor: '#E6F0FF',
//     },
//     categoryText: {
//         fontSize: 13,
//         color: '#333',
//     },
//     categoryTextActive: {
//         color: '#007AFF',
//         fontWeight: '500',
//     },
//     filterWrapper: {
//         alignItems: 'flex-end',
//         paddingRight: 16,
//         paddingBottom: 10,
//     },
//     filterContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 4,
//         paddingHorizontal: 8,
//         borderRadius: 12,
//     },
//     filterText: {
//         fontSize: 14,
//         color: '#C0C0C0',
//         marginRight: 4,
//     },
//     feed: {
//         flex: 1,
//     },
//     post: {
//         backgroundColor: '#FFF',
//         marginBottom: 8,
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//     },
//     postContainer: {
//         flexDirection: 'row',
//         marginBottom: 12,
//     },
//     avatarColumn: {
//         width: 40,
//         marginRight: 12,
//     },
//     contentColumn: {
//         flex: 1,
//     },
//     avatar: {
//         width: 36,
//         height: 36,
//         borderRadius: 20,
//     },
//     postHeaderText: {
//         marginBottom: 4,
//     },
//     authorName: {
//         fontSize: 15,
//         fontWeight: '600',
//         color: '#000',
//     },
//     timeAgo: {
//         fontSize: 13,
//         color: '#C0C0C0',
//         marginTop: 2,
//     },
//     postContent: {
//         marginTop: 4,
//     },
//     postTitle: {
//         fontSize: 16,
//         fontWeight: '600',
//         marginBottom: 8,
//         color: '#000',
//     },
//     postDescription: {
//         fontSize: 14,
//         color: '#444',
//         lineHeight: 20,
//         marginBottom: 12,
//     },
//     postHashtag: {
//         fontSize: 14,
//         color: 'gray',
//         lineHeight: 20,
//         marginBottom: 12,
//     },
//     imagesWrapper: {
//         marginBottom: 12,
//         marginLeft: 52, // Align with post content (40px avatar + 12px margin)
//     },
//     imageScrollContainer: {
//         height: 150,
//     },
//     imageContentContainer: {
//         paddingRight: 8,
//     },
//     postImage: {
//         width: 180,
//         height: 150,
//         borderRadius: 8,
//         marginRight: 8,
//     },
//     postActions: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         paddingTop: 8,
//         borderTopWidth: 1,
//         borderTopColor: '#EEEEEE',
//         marginLeft: 52, // Align with post content
//     },
//     actionGroup: {
//         flexDirection: 'row',
//     },
//     actionButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginRight: 16,
//     },
//     actionText: {
//         fontSize: 14,
//         color: '#666',
//         marginLeft: 4,
//     },
//     bottomNav: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         backgroundColor: '#FFF',
//         paddingVertical: 8,
//         borderTopWidth: 1,
//         borderTopColor: '#EEEEEE',
//     },
//     navButton: {
//         padding: 8,
//     },
//     createButton: {
//         backgroundColor: '#007AFF',
//         borderRadius: 24,
//         width: 48,
//         height: 48,
//         justifyContent: 'center',
//         alignItems: 'center',
//         // marginTop: -12,
//     },
//     messageButton: {
//         position: 'absolute',
//         bottom: 80,
//         right: 20,
//         backgroundColor: '#007AFF',
//         width: 54,
//         height: 54,
//         borderRadius: 27,
//         justifyContent: 'center',
//         alignItems: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.2,
//         shadowRadius: 4,
//         elevation: 4,
//     },
//     bottomPadding: {
//         height: 0, // Add extra padding to ensure content isn't hidden behind bottom nav
//     },
// });

// export default SocialMediaApp;