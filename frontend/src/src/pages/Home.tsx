import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header'
import { Post } from '../models/posts';
import config from '../config.json';
import { Buffer } from 'buffer';
import './Home.css'
import PicturePopup from '../components/PicturePopup/PicturePopup';

const Home = () => {
  const [pictures, setPictures] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleLike = async () => {
    try {
      const isLiked = selectedPost?.likes.includes('64f7818400e7dae66db86404');
      const isDisliked = selectedPost?.dislikes.includes('64f7818400e7dae66db86404');

      if (selectedPost) {
        let updatedLikes = [...selectedPost.likes];
        let updatedDislikes = [...selectedPost.dislikes];

        if (isLiked) {
          // Remove like
          updatedLikes = updatedLikes.filter(userId => userId !== '64f7818400e7dae66db86404');
        } else if (isDisliked) {
          // Remove dislike and add like
          updatedDislikes = updatedDislikes.filter(userId => userId !== '64f7818400e7dae66db86404');
          updatedLikes.push('64f7818400e7dae66db86404');
        } else {
          // Add like
          updatedLikes.push('64f7818400e7dae66db86404');
        }

        setSelectedPost((prevSelectedPost) => ({
          ...prevSelectedPost!,
          likes: updatedLikes,
          dislikes: updatedDislikes,
        }));
      }
  
      const url = `https://ztd82gntsi.eu-west-1.awsapprunner.com/media/posts/like`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: selectedPost?._id,
          userId: '64f7818400e7dae66db86404',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to like the post');
      }
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };
  
  const handleDislike = async () => {
    try {
      const isLiked = selectedPost?.likes.includes('64f7818400e7dae66db86404');
      const isDisliked = selectedPost?.dislikes.includes('64f7818400e7dae66db86404');
  
      if (selectedPost) {
        let updatedLikes = [...selectedPost.likes];
        let updatedDislikes = [...selectedPost.dislikes];

        if (isDisliked) {
          // Remove dislike
          updatedDislikes = updatedDislikes.filter(userId => userId !== '64f7818400e7dae66db86404');
        } else if (isLiked) {
          // Remove like and add dislike
          updatedLikes = updatedLikes.filter(userId => userId !== '64f7818400e7dae66db86404');
          updatedDislikes.push('64f7818400e7dae66db86404');
        } else {
          // Add dislike
          updatedDislikes.push('64f7818400e7dae66db86404');
        }

        setSelectedPost((prevSelectedPost) => ({
          ...prevSelectedPost!,
          likes: updatedLikes,
          dislikes: updatedDislikes,
        }));
      }

      const url = `https://ztd82gntsi.eu-west-1.awsapprunner.com/media/posts/dislike`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: selectedPost?._id,
          userId: '64f7818400e7dae66db86404',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to dislike the post');
      }

    } catch (error) {
      console.error('Error disliking the post:', error);
    }
  };

  const getData = async () => {
    try {
      const url = `https://ztd82gntsi.eu-west-1.awsapprunner.com/media/posts`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json()
      setPictures(data.mediaPosts);

    } catch(error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Header />
      <h1>All Posts</h1>
      <section className='gallery-container'>
        <section className='gallery'>
          {pictures.map((picture) => (
            <article className='image-frame' key={picture._id}>
              <img
                src={`data:image/png;base64,${Buffer.from(picture.image.data.data).toString('base64')}`}
                alt={`Post ${picture._id}`}
                className="image"
                onClick={() => handlePostClick(picture)} // Open modal on image click
              />
              <h5>{picture.description}</h5>
            </article>
          ))}
        </section>
        <PicturePopup 
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
          handleLike={handleLike}
          handleDislike={handleDislike}
        />
      </section>
    </>
  )
}

export default Home