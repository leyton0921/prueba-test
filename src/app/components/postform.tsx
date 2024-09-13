"use client";

import React, { useEffect, useState } from 'react';
import { getAllPosts, createPost, updatePost, deletePost } from '../controllers/posts.controller';
import { Datum, BodyRequestCreatePost, BodyrequestUpdatePost } from '../interface/post';
import PostCard from '../components/postcard';
import Input from '../../UI/input';
import styles from '../style/PostForm.module.css'


const PostForm: React.FC = () => {
  const [posts, setPosts] = useState<Datum[]>([]);
  const [selectedPost, setSelectedPost] = useState<Datum | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState<BodyRequestCreatePost>({
    title: '',
    description: '',
    user_id: ''
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getAllPosts();
      if (result) {
        setPosts(result.posts);
      } else {
        setError('Failed to load posts');
      }
    } catch (err) {
      setError('An error occurred while fetching posts');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const result = await createPost(formData);
      if (result) {
        setSuccess('Post created successfully');
        setFormData({
          title: '',
          description: '',
          user_id: ''
        });
        fetchPosts();
      } else {
        setError('Failed to create post');
      }
    } catch (err) {
      setError('An error occurred while creating the post');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedPost) {
      setError(null);
      setSuccess(null);
      setIsLoading(true);

      const updatedPostData: BodyrequestUpdatePost = {
        title: formData.title,
        description: formData.description,
        user_id: parseInt(formData.user_id)
      };

      try {
        const result = await updatePost(parseInt(selectedPost.id), updatedPostData);
        if (result) {
          setSuccess('Post updated successfully');
          setSelectedPost(null);
          setIsEditing(false);
          fetchPosts();
        } else {
          setError('Failed to update post');
        }
      } catch (err) {
        setError('An error occurred while updating the post');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeletePost = async (id: string) => {
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      const result = await deletePost(id);
      if (result) {
        setSuccess('Post deleted successfully');
        fetchPosts();
      } else {
        setError('Failed to delete post');
      }
    } catch (err) {
      setError('An error occurred while deleting the post');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPost = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      setSelectedPost(post);
      setFormData({
        title: post.title,
        description: post.description,
        user_id: post.user_id
      });
      setIsEditing(true);
    } else {
      setError('Post not found');
    }
  };

  return (
    <div className={styles['form-container']}>
      <form onSubmit={isEditing ? handleEditPost : handleCreatePost} className={styles['form-post']}>
        <h2 className={styles['form-header']}>{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
        <div className="mb-3">
          <label htmlFor="title" className={styles['form-label']}>Title:</label>
          <Input
            type="text"
            className={styles['form-control']}
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Ingrese el título del post"
            label="Title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className={styles['form-label']}>Description:</label>
          <textarea
            className={styles['form-textarea']}
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="user_id" className={styles['form-label']}>User ID:</label>
          <input
            type="text"
            className={styles['form-control']}
            id="user_id"
            name="user_id"
            value={formData.user_id}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <div className={`${styles['alert']} ${styles['alert-error']}`}>{error}</div>}
        {success && <div className={`${styles['alert']} ${styles['alert-success']}`}>{success}</div>}
        <button type="submit" className={styles['btn-primary']} disabled={isLoading}>
          {isLoading ? 'Processing...' : (isEditing ? 'Update Post' : 'Create Post')}
        </button>
        {isEditing && (
          <button type="button" className={styles['btn-secondary']} onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        )}
      </form>

     
      <h2>All Posts</h2>
      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <div className={`${styles['alert']} ${styles['alert-danger']}`}>{error}</div>
      ) : Array.isArray(posts) && posts.length === 0 ? ( 
        <p>No posts available</p>
      ) : (
        <div>
          {Array.isArray(posts) && posts.map((post) => (
            <PostCard
              key={post.id} 
              post={post}
              onEdit={handleSelectPost}
              onDelete={handleDeletePost}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostForm;