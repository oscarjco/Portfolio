import React from "react";
import {Link} from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

import './Posts.css';

const Posts = ({posts, deletePost}) => {
    const {user} = useContext(UserContext);

    return (
        <article className="posts container">
            <h1>Comentarios</h1>
            <ul>
                {user.isAuthenticated && (
                    <li><Link to={"/new"} className="new">Nuevo</Link></li>
                )}
                
                {posts.map(post => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <div className="post-data">
                            <span className="author">by {post.author}</span>
                            <span className="date">{post.date}</span>
                        </div>

                        <div className="post-content">{post.content}</div>
                        
                        {user.isAuthenticated && (user.username === post.author) 
                            && (user.username !== "Anonymous") && (
                            <p>
                                <Link to={`/edit/${post.slug}`}>Editar</Link>
                                <button className="linkLike" onClick={() => deletePost(post)}>Eliminar</button>
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </article>
    );
};

export default Posts;