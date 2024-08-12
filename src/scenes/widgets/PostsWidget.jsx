import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    
    // Filter out posts that have a creator tag (adjust this logic based on your requirements)
    const filteredPosts = data.filter(post => !post.creatorTag);
    
    dispatch(setPosts({ posts: filteredPosts }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();

    // Filter out posts that have a creator tag
    const filteredPosts = data.filter(post => !post.creatorTag);
    
    dispatch(setPosts({ posts: filteredPosts }));
  };

  useEffect(() => {
    if (isProfile) {
      console.log("getUserPosts")
      getUserPosts();
    } else {
      getPosts();
    }
  }, [isProfile]); // Make sure to include isProfile in the dependencies array

  return (
    <>
      {posts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
      <div>
        Hii
      </div>
    </>
  );
};

export default PostsWidget;
