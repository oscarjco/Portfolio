import React, { useState, useEffect, useRef, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

import "react-quill/dist/quill.snow.css";
import "./forms.css";

const PostForm = ({ post: propsPost, addNewPost, updatePost }) => {
  const [post, setPost] = useState({ ...propsPost });
  const [saved, setSaved] = useState(false);
  const {user} = useContext(UserContext);

  const prevPostRef = useRef();
  useEffect(() => {
    prevPostRef.current = post;
  }, [post]);
  const prevPost = prevPostRef.current;

  const quillRef = React.useRef();
  useEffect(() => {
    if (prevPost && quillRef.current) {
      if (propsPost.key !== prevPost.key) {
        setPost({ ...propsPost });
        quillRef.current.getEditor().setContents(``);
      }
    }
  }, [prevPost, propsPost]);

  const handlePostForm = (event) => {
    event.preventDefault();
    if (post.title) {
      post.author = user.username;
      post.date = (new Date()).toLocaleDateString();
      if (updatePost) {
        updatePost(post);
      } else {
        addNewPost(post);
      }
      setSaved(true);
    } else {
      alert("Title required");
    }
  };

  if (saved === true) {
    return <Redirect to="/posts" />;
  }
  return (
    <form className="container" onSubmit={handlePostForm}>
      {addNewPost ? (<h1>Nuevo comentario</h1>) : (<h1>Editar comentario</h1>)}
      <p>
        <label htmlFor="form-title">Título:</label>
        <input
          type="text"
          defaultValue={post.title}
          id="form-title"
          onChange={(event) =>
            setPost({
              ...post,
              title: event.target.value,
            })
          }
        />
      </p>
      <p>
        <label htmlFor="form-content">Contenido:</label>
      </p>
      <p>
        <textarea
          defaultValue={post.content}
          onChange={(event) => {
            setPost({
              ...post,
              content: event.target.value,
            });
          }}
        />
      </p>
      <p>
        <button className="green-button" type="submit" disabled={!post.title}>Guardar</button>
      </p>
    </form>
  );
};

export default PostForm;
