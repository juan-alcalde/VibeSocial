
// import "../home/PostForm.css";
import React, { useState, useEffect } from 'react';

export const ComponentList = () => {
  const [posts, setPosts] = useState([]);
  const [activeClick, setActiveClick] = useState();
  
  useEffect(() => {
    fetch(`http://localhost:8088/posts`)
      .then(response => response.json())
      .then((postsArray) => {
        setPosts(postsArray);
      });
  }, []);
//   // const [tips, setTips] = useState([]);

  // useEffect(() => {
  //   fetch('https://api.chucknorris.io/jokes/random')
  //     .then((response) => response.json()
  //     )
  //     .then((data) => setTips(data));
  // }, [])
  const handleLikeClick = (postId) => {
    // Fetch the post with postId from the server
    fetch(`http://localhost:8088/posts/${postId}`)
      .then(response => response.json())
      .then(post => {
        // Update the likes property
        const updatedPost = { ...post, likes: post.likes + 1 };

        // Update the post on the server
        fetch(`http://localhost:8088/posts/${postId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPost),
        })
          .then(response => response.json())
          .then(updatedPost => {
            // Update the posts state with the updated post
            const updatedPosts = posts.map(p => (p.id === postId ? updatedPost : p));
            setPosts(updatedPosts);
          })
          
      })
     
  };

  return (
    <div>
      <h2>Fetch practice CHUCK NORIS FACTS </h2>
      <ul>
        {posts.map((post) => (
          <>
            <h3 className="postPreview-Title" key={post.id}>
              {post.title}
              <button
                id={post.id}
                className={activeClick === post.id ? "active" : ""}
                onClick={() => {
                  handleLikeClick(post.id);
                  setActiveClick(post.id);
                }}
              >
                <i className="fas fa-thumbs-up"></i>
              </button>
            </h3>
            <span>{post.likes}</span>
          </>
        ))}
      </ul>
    </div>
  );
};
// SECONDWAY
// return (
//     <div>
//       <h2>Fake To-Do List</h2>
//       <ul>
//         {tips.map((todo) => (
//           <li key={todo.id}>{todo.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };