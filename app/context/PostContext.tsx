import React, { createContext, useContext, useState } from 'react';

const PostContext = createContext();

export const PostProvider = ({ children }) => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            author: 'Tim Bakes',
            avatar: require('../../assets/images/tim.png'), // Adjust path as needed
            timeAgo: '4:48 Medical',
            title: "What's The Best Way To Remove Dandruff Naturally?",
            likes: 5300,
            dislikes: 60,
            comments: 158,
            shares: 2,
            saved: true,
        },
        {
            id: 2,
            author: 'Adam Broke',
            avatar: require('../../assets/images/adam.png'),
            timeAgo: '5:58 Health',
            title: "This Mediterranean Bowl Is All You Need",
            description: "Nutrients - Chicken Breasts - Adds Lean Protein Sumac Marinade - Olive Oil Adds Healthy Fats Quinoa - Excellent Source of Fiber & Protein",
            images: [
                require('../../assets/images/bowl.png'),
                require('../../assets/images/bowl.png'),
                require('../../assets/images/bowl.png'),
                require('../../assets/images/bowl.png'),
            ],
            hashtags: '#PartyNight #UnleashThePartyAnimal #DanceTillDawn',
            likes: 0,
            dislikes: 0,
            comments: 0,
            shares: 0,
            saved: false,
        },
        {
            id: 3,
            author: 'Noorulain',
            avatar: require('../../assets/images/tim.png'), // Adjust path as needed
            timeAgo: '2h ago DIY',
            description: "only recently discovered a love for frugality. This came when I started making my own laundry detergent. I was blown away by the cost savings. ( plus it smells good and great) I have made most of my own cleaning products but I am wondering what else you can save money one by making things yourself. What things do you make yourself that you will never buy from the store again?",
            hashtags: '#PartyNight #UnleashThePartyAnimal #DanceTillDawn',
            likes: 4300,
            dislikes: 40,
            comments: 258,
            shares: 22,
            saved: true,
        },
    ]);

    const addPost = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://192.168.40.122:5000/api/posts');
            if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
            const data = await response.json();
            setPosts([...data, ...posts]);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return (
        <PostContext.Provider value={{ posts, addPost, fetchPosts }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => useContext(PostContext);