import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {useStorageState} from "react-storage-hooks";
import {signInWithEmailAndPassword, signInAnonymously, createUserWithEmailAndPassword} from "firebase/auth";
import {ref, onValue, get, child, push, update, remove} from "firebase/database";
import {auth, database} from "./Firebase";
import UserContext from "./context/UserContext";
import Login from "./components/form/Login";
import Header from "./components/header/Header";
import Message from "./components/messages/Message";
import PersonalInfo from "./components/portfolio/PersonalInfo";
import Education from "./components/portfolio/Education";
import Experience from "./components/portfolio/Experience";
import Posts from "./components/posts/Posts";
import PostForm from "./components/form/PostForm";
import NotFound from "./components/errors/NotFound";

import "./App.css";

const App = (props) => {
  const [user, setUser] = useStorageState(localStorage, "state-user", {});
  const [posts, setPosts] = useStorageState(localStorage, `state-posts`, []);
  const [message, setMessage] = useState(null);
  const [personalInfo, setPersonalInfo] = useState(null);
  const [education, setEducation] = useState(null);
  const [experience, setExperience] = useState(null);
  const dbRef = ref(database);

  const setFlashMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 1600);
  };

  const getNewSlugFromTitle = (title) =>
    encodeURIComponent(title.toLowerCase().split(" ").join("-")
  );

  const onLogin = (email, password) => {
    if(!email) {
      signInAnonymously(auth)
        .then(response => setUser({
          email: "",
          username:  "Anonymous",
          isAuthenticated: true
        }))
        .catch(error => alert(error.message));
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then(response => setUser({
          email: response.user["email"],
          username:  response.user["email"].split("@")[0],
          isAuthenticated: true
        }))
        .catch(error => alert(error.message));
    }
  };

  const onSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => setUser({
        email: response.user["email"],
        username:  response.user["email"].split("@")[0],
        isAuthenticated: true
      }))
      .catch((error) => alert(error.message));
  };

  const onLogout = () => {
    auth.signOut()
      .then(() => setUser({isAuthenticated: false}))
      .catch(error => alert(error.message));
  };

  const addNewPost = (post) => {
    const postsRef = ref(database, "posts/");
    
    post.slug = getNewSlugFromTitle(post.title);
    delete post.key;
    push(postsRef, post);
    
    setFlashMessage(`saved`);
  };

  const updatePost = (post) => {
    const postsRef = ref(database, "posts/" + post.key);

    update(postsRef, {
      slug: getNewSlugFromTitle(post.title),
      title: post.title,
      content: post.content
    });

    setFlashMessage(`updated`);
  };

  const deletePost = (post) => {
    if(window.confirm("Delete this post?")) {
      const postsRef = ref(database, "posts/" + post.key);
      remove(postsRef);
      setFlashMessage(`deleted`);
    }
  };

  useEffect(() => {
    const postsRef = ref(database, "posts/");
    onValue(postsRef, (snapshot) => {
      const posts = snapshot.val();
      const newStatePosts = [];

      for(let post in posts) {
        newStatePosts.push({
          key: post,
          slug: posts[post].slug,
          title: posts[post].title,
          author: posts[post].author,
          date: posts[post].date,
          content: posts[post].content
        });
      }
      setPosts(newStatePosts);
    });
  }, [setPosts]);

  return (
    <Router>
      <UserContext.Provider value={{user, onLogin, onLogout, onSignUp}}>
        <div className="App">
          <Header />
          {message && <Message type={message} />}
          <Switch>

            <Route exact path="/login" render={() => 
              !user.isAuthenticated ? <Login /> : <Redirect to="/" />} 
            />

            <Route exact path="/" render={() => {
              get(child(dbRef, "personal/")).then(snapshot => setPersonalInfo(snapshot.val()));
              if(personalInfo) return <PersonalInfo data={personalInfo} />;
            }} />

            <Route exact path="/education" render={() => {
              get(child(dbRef, "education/")).then(snapshot => setEducation(snapshot.val()));
              if(education) return <Education data={education} />;
            }} />

            <Route exact path="/experience" render={() => {
              get(child(dbRef, "experience/")).then(snapshot => setExperience(snapshot.val()));
              if(experience) return <Experience data={experience} />;
            }} />

            <Route exact path="/posts"  render={() => <Posts posts={posts} deletePost={deletePost} />} />

            <Route exact path="/new" render={() => user.isAuthenticated ? (
                <PostForm
                  addNewPost={addNewPost}
                  post={{ id: null, slug: "", title: "", content: "" }}
                />
              ) : <Redirect to="/login" />
              }
            />

            <Route path="/edit/:postSlug" render={(props) => {
                const post = posts.find(
                  (post) => post.slug === props.match.params.postSlug
                );
                if (post) {
                  return user.isAuthenticated 
                    ? <PostForm updatePost={updatePost} post={post} /> 
                    : <Redirect to="/login" />
                } else {
                  return <Redirect to="/" />;
                }
              }}
            />

            <Route component={NotFound} />

          </Switch>
        <footer></footer>
        </div>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
