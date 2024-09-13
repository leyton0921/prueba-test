import React, { useState, useEffect } from 'react';
import { Datum } from '../interface/post';
import styles from '../style/CardPost.module.css'


const PostCard: React.FC<{
  post: Datum;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ post, onEdit, onDelete }) => {

  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); 

  return (
    <figure className={styles['figure']}>
      <h2 className={styles["h2"]}>{post.title}</h2>
      <h4 className={styles["h4"]}>Author: </h4> 
      <figcaption className={styles["figcaption"]}>
        <h5 className={styles["h5"]}>{post.description}</h5>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => onEdit(post.id)}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(post.id)}
          >
            Delete
          </button>
        </div>
        {error && <p>{error}</p>}
      </figcaption>
    </figure>
  );
};

export default PostCard;
